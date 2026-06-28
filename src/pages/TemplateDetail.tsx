import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, ArrowLeft, CheckCircle, PlayCircle } from 'lucide-react';
import { useData } from '../hooks/useData';

const TemplateDetail: React.FC = () => {
  const { id } = useParams();
  const { templates } = useData();
  const template = templates.find((t) => t.id === id);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">Template not found</h2>
          <Link to="/templates" className="text-primary hover:text-primary-dark font-semibold">
            Browse templates
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/templates"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-primary mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Templates</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img
                src={template.thumbnail}
                alt={template.title}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="flex gap-3 mt-4">
              {template.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 border-2 border-transparent hover:border-primary"
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary font-semibold">{template.category}</span>
              <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                {template.difficulty}
              </span>
              {template.isPremium && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 text-sm font-semibold rounded-full">
                  Premium
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-heading">
              {template.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {template.description}
            </p>

            <button className="btn-primary text-lg py-4 px-8 mb-8 flex items-center gap-3">
              <Download className="w-6 h-6" />
              <span>Download Template</span>
            </button>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Features</h2>
              <div className="grid grid-cols-1 gap-4">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {template.tutorialVideo && (
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <PlayCircle className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-900 font-heading">Tutorial</h2>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Video tutorial available</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
