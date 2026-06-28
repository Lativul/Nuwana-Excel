import React, { useState } from 'react';
import { Play, Image as ImageIcon, X } from 'lucide-react';

interface MediaFile {
  id: number | string;
  name: string;
  type: 'image' | 'video';
  format: string;
  size: string;
  duration?: string;
  url: string;
  thumbnail: string;
  category: string;
  alt?: string;
  published: boolean;
  isNew?: boolean;
}

interface MediaCardProps {
  media: MediaFile;
}

const MediaCard: React.FC<MediaCardProps> = ({ media }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="card overflow-hidden group cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className="relative">
          {media.type === 'image' ? (
            <img
              src={media.url}
              alt={media.alt || media.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 relative">
              <img
                src={media.thumbnail}
                alt={media.alt || media.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-7 h-7 text-primary ml-1" />
                </div>
              </div>
              {media.duration && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {media.duration}
                </div>
              )}
            </div>
          )}
          
          {media.isNew && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              New!
            </div>
          )}
          
          <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            {media.type === 'image' ? (
              <ImageIcon className="w-3 h-3 text-primary" />
            ) : (
              <Play className="w-3 h-3 text-primary" />
            )}
            <span className="capitalize">{media.type}</span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-primary">{media.category}</span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              {media.format}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading group-hover:text-primary transition-colors">
            {media.name}
          </h3>
          <p className="text-gray-600 text-sm">
            {media.size}
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {media.type === 'image' ? (
                <img
                  src={media.url}
                  alt={media.alt || media.name}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              ) : (
                <div className="aspect-video bg-gray-900">
                  <video
                    src={media.url}
                    poster={media.thumbnail}
                    controls
                    playsInline
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{media.name}</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{media.format}</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{media.size}</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{media.category}</span>
                </div>
                {media.alt && (
                  <p className="mt-3 text-gray-600 text-sm"><strong>Alt Text:</strong> {media.alt}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaCard;
