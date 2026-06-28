import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Video, 
  Image, 
  Users, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Folder,
  X,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'videos' | 'media' | 'users' | 'settings'>('templates');
  const [mediaSubTab, setMediaSubTab] = useState<'all' | 'images' | 'videos'>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [templateForm, setTemplateForm] = useState({
    title: '',
    description: '',
    category: 'Finance',
    difficulty: 'Beginner',
    isPremium: false,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    features: ['Customizable', 'Easy to use', 'Professional design'],
  });
  
  const [videoForm, setVideoForm] = useState({
    title: '',
    description: '',
    category: 'Excel Basics',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    duration: '30 min',
    isPremium: false,
    lessons: [
      { id: '1', title: 'Introduction', duration: '5 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
    ],
  });
  
  const { 
  templates,
  videoCourses,
  mediaFiles,
  addMediaFile,
  updateMediaFile,
    deleteMediaFile,
    addTemplate,
    deleteTemplate,
    addVideoCourse,
    deleteVideoCourse
  } = useData();

  // Get all media
  const allMedia = mediaFiles;
  
  // Filter media
  const filteredMedia = allMedia.filter(media => {
    const matchesSearch = 
      media.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      media.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = 
      mediaSubTab === 'all' || 
      (mediaSubTab === 'images' && media.type === 'image') || 
      (mediaSubTab === 'videos' && media.type === 'video');
    return matchesSearch && matchesType;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const openPreview = (media: any) => {
    setPreviewFile(media);
    setIsPreviewModalOpen(true);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress
    for (let i = 1; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // Add new media to the library
    const newMedia = selectedFiles.map((file, index) => {
      const isImage = file.type.startsWith('image/');
      const fileExt = file.name.split('.').pop()?.toUpperCase() || (isImage ? 'JPG' : 'MP4');
      const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      const previewUrl = URL.createObjectURL(file);
      
      const mediaItem = {
        id: Date.now() + index,
        name: file.name.replace(/\.[^/.]+$/, ''),
        type: isImage ? 'image' : 'video',
        format: fileExt,
        size: fileSize,
        duration: isImage ? undefined : '00:30',
        url: previewUrl,
        thumbnail: isImage ? previewUrl : 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
        category: 'Uploads',
        alt: file.name,
        published: true,
        isNew: true
      };
      

      return mediaItem;
    });

    setSelectedFiles([]);
    setIsUploading(false);
    setIsUploadModalOpen(false);
    setActiveTab('media');
  };

  const handleAddTemplate = () => {
    if (!templateForm.title || !templateForm.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newTemplate = {
      id: Date.now().toString(),
      ...templateForm,
      screenshots: [templateForm.thumbnail],
      tutorialVideo: null,
      published: true,
    };
    
    addTemplate(newTemplate);
    
    // Reset form
    setTemplateForm({
      title: '',
      description: '',
      category: 'Finance',
      difficulty: 'Beginner',
      isPremium: false,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      features: ['Customizable', 'Easy to use', 'Professional design'],
    });
    
    setIsTemplateModalOpen(false);
  };

  const handleAddVideo = () => {
    if (!videoForm.title || !videoForm.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newVideo = {
      id: Date.now().toString(),
      ...videoForm,
      published: true,
    };
    
    addVideoCourse(newVideo);
    
    // Reset form
    setVideoForm({
      title: '',
      description: '',
      category: 'Excel Basics',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      duration: '30 min',
      isPremium: false,
      lessons: [
        { id: '1', title: 'Introduction', duration: '5 min', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
      ],
    });
    
    setIsVideoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src="https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=NUWANA%20EXCEL%20logo%20with%20Indonesian%20wayang%20puppet%20character%20and%20Excel%20spreadsheet%20icon%2C%20elegant%20gold%20and%20green%20design&image_size=square_hd" 
              alt="Nuwana Excel Logo" 
              className="h-16 w-auto"
            />
            <h1 className="text-3xl font-bold text-gray-900 font-heading">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage all content, users, and settings for Nuwana Excel</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Templates</p>
                <p className="text-2xl font-bold text-gray-900">{templates.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Video Courses</p>
                <p className="text-2xl font-bold text-gray-900">{videoCourses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Image className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Media Files</p>
                <p className="text-2xl font-bold text-gray-900">{mediaFiles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Folder className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Premium Content</p>
                <p className="text-2xl font-bold text-gray-900">
                  {templates.filter(t => t.isPremium).length + videoCourses.filter(v => v.isPremium).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex space-x-0">
              {[
                { id: 'templates', label: 'Templates', icon: FileSpreadsheet },
                { id: 'videos', label: 'Videos', icon: Video },
                { id: 'media', label: 'Media Library', icon: Image },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      isActive
                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'templates' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 font-heading">Manage Templates</h2>
                  <button 
                    onClick={() => setIsTemplateModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Template
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Template</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Difficulty</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templates.map((template) => (
                        <tr key={template.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img src={template.thumbnail} alt={template.title} className="w-12 h-12 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium text-gray-900">{template.title}</p>
                                <p className="text-sm text-gray-500">{template.description.slice(0, 50)}...</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">{template.category}</td>
                          <td className="py-4 px-4">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              template.difficulty === 'Beginner'
                                ? 'bg-green-100 text-green-700'
                                : template.difficulty === 'Intermediate'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {template.difficulty}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {template.published && (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                                  Published
                                </span>
                              )}
                              {template.isPremium ? (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                  Premium
                                </span>
                              ) : (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  Free
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteTemplate(template.id)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 font-heading">Manage Videos</h2>
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Video
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Video</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Lessons</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videoCourses.map((video) => (
                        <tr key={video.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img src={video.thumbnail} alt={video.title} className="w-24 h-14 rounded-lg object-cover" />
                              <div>
                                <p className="font-medium text-gray-900">{video.title}</p>
                                <p className="text-sm text-gray-500">{video.description.slice(0, 60)}...</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">{video.category}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{video.lessons.length} lessons</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {video.published && (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-700">
                                  Published
                                </span>
                              )}
                              {video.isPremium ? (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                  Premium
                                </span>
                              ) : (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                  Free
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => deleteVideoCourse(video.id)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold text-gray-900 font-heading">Media Library</h2>
                  <button 
                    onClick={() => setIsUploadModalOpen(true)}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Files
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Search media by name or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'images', label: 'Images', icon: Image },
                      { id: 'videos', label: 'Videos', icon: Video },
                    ].map((tab) => {
                      const Icon = (tab as any).icon;
                      const isActive = mediaSubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setMediaSubTab(tab.id as any)}
                          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                            isActive
                              ? 'text-white bg-primary'
                              : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Media Grid */}
                {filteredMedia.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMedia.map((media) => (
                      <div key={media.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 group">
                        <div 
                          className="aspect-video bg-gray-100 cursor-pointer relative overflow-hidden"
                          onClick={() => openPreview(media)}
                        >
                          {media.type === 'image' ? (
                            <img 
                              src={media.url} 
                              alt={media.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full relative flex items-center justify-center">
                              <img 
                                src={media.thumbnail} 
                                alt={media.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                                  <Video className="w-7 h-7 text-gray-800 ml-1" />
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="absolute top-3 right-3 flex gap-2">
                            {media.isNew && (
                              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 font-semibold rounded-full">
                                New!
                              </span>
                            )}
                            {media.published ? (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 font-semibold rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Published
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 font-semibold rounded-full">
                                Draft
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="font-semibold text-gray-900 mb-2 truncate">{media.name}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{media.format}</span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{media.size}</span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{media.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => openPreview(media)}
                              className="flex-1 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" /> Preview
                            </button>
                            <button 
                              onClick={() => updateMediaFile(media.id, { published: !media.published })}
                              className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              title={media.published ? "Unpublish" : "Publish"}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteMediaFile(media.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Search className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No media found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 font-heading">Manage Users</h2>
                </div>
                <div className="text-center py-12 text-gray-500">
                  User management coming soon...
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 font-heading">Settings</h2>
                </div>
                <div className="text-center py-12 text-gray-500">
                  Settings panel coming soon...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 font-heading">Upload Media Files</h3>
                <button 
                  onClick={() => setIsUploadModalOpen(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="p-6">
                {/* Drop Zone */}
                <div 
                  className="border-3 border-dashed border-gray-300 hover:border-primary rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer bg-gray-50"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-xl font-semibold text-gray-800 mb-2">Drag & Drop Files Here</p>
                  <p className="text-gray-600 mb-3">or click to browse files from your computer</p>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Supported formats: JPG, JPEG, PNG, WebP, SVG (images); MP4, MOV, WebM (videos)
                  </p>
                  <input 
                    id="file-input"
                    type="file" 
                    multiple 
                    accept="image/*,video/mp4,video/quicktime,video/webm"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-semibold text-gray-800">
                        Selected Files ({selectedFiles.length})
                      </h4>
                      <button 
                        onClick={() => setSelectedFiles([])}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-3">
                      {selectedFiles.map((file, idx) => {
                        const isImage = file.type.startsWith('image/');
                        const previewUrl = URL.createObjectURL(file);
                        return (
                          <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                              {isImage ? (
                                <img src={previewUrl} alt={file.name} className="w-full h-full object-cover" />
                              ) : (
                                <Video className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 truncate">{file.name}</p>
                              <p className="text-sm text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                              </p>
                            </div>
                            <button 
                              onClick={() => setSelectedFiles(selectedFiles.filter((_, i) => i !== idx))}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-800">Uploading...</span>
                          <span className="text-sm font-semibold text-primary">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-primary to-green-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex gap-3 justify-end">
                      <button 
                        onClick={() => setIsUploadModalOpen(false)}
                        disabled={isUploading}
                        className="px-6 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="btn-primary px-6 py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isUploading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Uploading...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload {selectedFiles.length} {selectedFiles.length === 1 ? 'File' : 'Files'}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {isPreviewModalOpen && previewFile && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full">
              <button 
                onClick={() => setIsPreviewModalOpen(false)} 
                className="absolute -top-12 right-0 p-2 text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                {previewFile.type === 'image' ? (
                  <img 
                    src={previewFile.url} 
                    alt={previewFile.name} 
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                ) : (
                  <div className="aspect-video bg-gray-900">
                    <video
                      src={previewFile.url}
                      poster={previewFile.thumbnail}
                      controls
                      playsInline
                      className="w-full h-full"
                      onError={(e) => {
                        console.error("Video playback error:", e);
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{previewFile.name}</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{previewFile.format}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">{previewFile.size}</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{previewFile.category}</span>
                    {previewFile.published && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Published
                      </span>
                    )}
                  </div>
                  {previewFile.alt && (
                    <p className="mt-3 text-gray-600 text-sm"><strong>Alt Text:</strong> {previewFile.alt}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template Form Modal */}
        {isTemplateModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 font-heading">Add New Template</h3>
                <button 
                  onClick={() => setIsTemplateModalOpen(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input 
                    type="text" 
                    value={templateForm.title}
                    onChange={(e) => setTemplateForm({ ...templateForm, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Enter template title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea 
                    value={templateForm.description}
                    onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Enter template description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      value={templateForm.category}
                      onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                      <option>Finance</option>
                      <option>Student</option>
                      <option>Personal</option>
                      <option>Business</option>
                      <option>Dashboard</option>
                      <option>Inventory</option>
                      <option>HR</option>
                      <option>Sales</option>
                      <option>Productivity</option>
                      <option>Project Management</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select 
                      value={templateForm.difficulty}
                      onChange={(e) => setTemplateForm({ ...templateForm, difficulty: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="premium-template"
                    checked={templateForm.isPremium}
                    onChange={(e) => setTemplateForm({ ...templateForm, isPremium: e.target.checked })}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="premium-template" className="text-sm font-medium text-gray-700">
                    Premium Template
                  </label>
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <button 
                    onClick={() => setIsTemplateModalOpen(false)}
                    className="px-6 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddTemplate}
                    className="btn-primary px-6 py-3"
                  >
                    Add Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Form Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 font-heading">Add New Video Course</h3>
                <button 
                  onClick={() => setIsVideoModalOpen(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input 
                    type="text" 
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Enter video title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea 
                    value={videoForm.description}
                    onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Enter video description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select 
                      value={videoForm.category}
                      onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    >
                      <option>Excel Basics</option>
                      <option>Advanced Excel</option>
                      <option>Formulas & Functions</option>
                      <option>Pivot Tables</option>
                      <option>Data Analysis</option>
                      <option>Visualization</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input 
                      type="text" 
                      value={videoForm.duration}
                      onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="e.g., 30 min"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="premium-video"
                    checked={videoForm.isPremium}
                    onChange={(e) => setVideoForm({ ...videoForm, isPremium: e.target.checked })}
                    className="w-5 h-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="premium-video" className="text-sm font-medium text-gray-700">
                    Premium Course
                  </label>
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <button 
                    onClick={() => setIsVideoModalOpen(false)}
                    className="px-6 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddVideo}
                    className="btn-primary px-6 py-3"
                  >
                    Add Video Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
