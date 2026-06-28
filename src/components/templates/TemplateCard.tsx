import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye, Crown } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  isPremium: boolean;
  thumbnail: string;
  screenshots: string[];
  features: string[];
  tutorialVideo: string | null;
  published: boolean;
}

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="card overflow-hidden group">
      <div className="relative">
        <img
          src={template.thumbnail}
          alt={template.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {template.isPremium && (
          <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Crown className="w-3 h-3" />
            <span>Premium</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <Link
            to={`/templates/${template.id}`}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </Link>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary">{template.category}</span>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
            {template.difficulty}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading group-hover:text-primary transition-colors">
          {template.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {template.description}
        </p>
        <div className="flex items-center justify-between">
          <Link
            to={`/templates/${template.id}`}
            className="btn-primary text-sm py-2 px-4 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
