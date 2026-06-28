import React from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, PlayCircle, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { templates, videoCourses } = useData();

  const recentTemplates = templates.slice(0, 3);
  const recentVideos = videoCourses.slice(0, 2);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-lg text-gray-600">Continue your Excel learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileSpreadsheet className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{templates.length}</p>
                <p className="text-gray-600">Templates</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <PlayCircle className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{videoCourses.length}</p>
                <p className="text-gray-600">Courses</p>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-yellow-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-gray-600">Lessons Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Recent Templates</h2>
            <Link to="/templates" className="text-primary font-semibold hover:text-primary-dark">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentTemplates.map((template) => (
              <Link key={template.id} to={`/templates/${template.id}`} className="card overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{template.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-heading">Continue Learning</h2>
            <Link to="/videos" className="text-primary font-semibold hover:text-primary-dark">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentVideos.map((video) => (
              <div key={video.id} className="card overflow-hidden">
                <div className="flex gap-6">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-48 h-36 object-cover"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                    </div>
                    <div className="text-sm text-primary font-medium">Continue watching</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
