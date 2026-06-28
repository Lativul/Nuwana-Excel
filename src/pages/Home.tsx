import React from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, Video, BookOpen, ArrowRight, CheckCircle, DollarSign, GraduationCap, Briefcase, BarChart3, Package, CheckSquare } from 'lucide-react';
import TemplateCard from '../components/templates/TemplateCard';
import MediaCard from '../components/media/MediaCard';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { getPublishedTemplates, getPublishedVideos, getPublishedMedia } = useData();
  const templates = getPublishedTemplates();
  const videos = getPublishedVideos();
  const mediaFiles = getPublishedMedia();
  const featuredTemplates = templates.slice(0, 4);
  const featuredMedia = mediaFiles.slice(0, 6);
  const categoriesList = ['Finance', 'Student', 'Personal', 'Business', 'Dashboard', 'Inventory'];
  const categoryIcons = [DollarSign, GraduationCap, Briefcase, BarChart3, Package, CheckSquare];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/5 via-white to-primary/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 font-heading leading-tight">
                Master Excel with
                <span className="text-primary"> Professional Templates</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Download ready-to-use Excel templates, follow video tutorials, and transform your productivity today.
                Learn while doing with our comprehensive learning platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/templates" className="btn-primary text-lg py-4 px-8">
                  Browse Templates
                </Link>
                <Link to="/videos" className="btn-secondary text-lg py-4 px-8">
                  Watch Tutorials
                </Link>
              </div>
              <div className="flex items-center space-x-6 mt-10">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">100+ Templates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-gray-700">50+ Tutorials</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                  alt="Excel Dashboard"
                  className="rounded-xl w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">10K+</p>
                      <p className="text-sm text-gray-600">Downloads</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FileSpreadsheet, title: 'Premium Templates', desc: 'Professional, ready-to-use Excel templates for every need' },
              { icon: Video, title: 'Video Tutorials', desc: 'Step-by-step video guides to master Excel features' },
              { icon: BookOpen, title: 'Learning Guides', desc: 'Comprehensive written guides and documentation' },
            ].map((feature, index) => (
              <div key={index} className="card p-8 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-heading">Explore Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect template for your needs</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesList.map((category, index) => {
              const IconComponent = categoryIcons[index];
              return (
                <Link
                  key={category}
                  to="/templates"
                  className="card p-6 text-center hover:border-primary/50 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary group-hover:to-primary-dark transition-all">
                    <IconComponent className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category}</h3>
                  <p className="text-sm text-gray-500">{Math.max(1, Math.floor(templates.length / 2))} templates</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 font-heading">Featured Templates</h2>
              <p className="text-gray-600">Discover our most popular Excel templates</p>
            </div>
            <Link to="/templates" className="flex items-center space-x-2 text-primary font-semibold hover:text-primary-dark transition-colors">
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">Featured Video Courses</h2>
            <p className="text-white/80 max-w-2xl mx-auto">Learn Excel with our comprehensive video tutorials</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{video.lessons.length} lessons</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/videos" className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Browse All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      {featuredMedia.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 font-heading">Media Gallery</h2>
                <p className="text-gray-600">Photos and videos from our Excel tutorials</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMedia.map((media) => (
                <MediaCard key={media.id} media={media} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-heading">Ready to Excel?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of students and professionals who have transformed their productivity with Nuwana Excel.
          </p>
          <Link to="/register" className="btn-primary text-lg py-4 px-10">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
