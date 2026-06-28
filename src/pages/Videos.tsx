import React from 'react';
import { PlayCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Videos: React.FC = () => {
  const { getPublishedVideos } = useData();
  const videos = getPublishedVideos();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-heading">
            Video Tutorials
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn Excel step-by-step with our comprehensive video courses
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {videos.map((video) => (
            <div key={video.id} className="card overflow-hidden">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <PlayCircle className="w-10 h-10 text-primary ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 font-heading">{video.title}</h2>
                <p className="text-gray-600 mb-6">{video.description}</p>
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Course Content</h3>
                  <div className="space-y-3">
                    {video.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                        <span className="flex-1 text-gray-700">{lesson.title}</span>
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
