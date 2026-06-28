import React, { createContext, useContext, useState, ReactNode } from 'react';

// Initial Mock Data
const initialTemplates = [
  { id: '1', title: 'Budget Planner', description: 'Perfect Excel template for managing personal finances monthly and yearly', category: 'Finance', difficulty: 'Beginner', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', screenshots: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'], features: ['Expense tracking', 'Income management', 'Savings goals', 'Monthly summary'], tutorialVideo: null, published: true },
  { id: '2', title: 'Student Planner', description: 'Organize your classes, homework, exams and study schedule effectively', category: 'Student', difficulty: 'Beginner', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', screenshots: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop'], features: ['Class timetable', 'Assignment tracker', 'Exam schedule', 'Grade calculator'], tutorialVideo: null, published: true },
  { id: '3', title: 'Sales Dashboard', description: 'Professional dashboard template for tracking sales performance and KPIs', category: 'Business', difficulty: 'Advanced', isPremium: true, thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop', screenshots: ['https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop'], features: ['Real-time charts', 'KPI tracking', 'Monthly comparisons', 'Sales analytics'], tutorialVideo: null, published: true },
  { id: '4', title: 'Inventory Management', description: 'Comprehensive inventory tracking system with stock alerts and reports', category: 'Business', difficulty: 'Intermediate', isPremium: false, thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop', screenshots: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop'], features: ['Stock levels', 'Reorder alerts', 'Supplier info', 'Inventory reports'], tutorialVideo: null, published: true },
];

const initialVideoCourses = [
  { id: '1', title: 'Excel for Beginners', description: 'Master Excel fundamentals including formulas, functions, and basic operations', category: 'Excel Basics', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', duration: '3h 15m', lessons: [ { id: '1-1', title: 'Introduction to Excel', duration: '10m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }, { id: '1-2', title: 'Basic Formulas', duration: '15m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }, { id: '1-3', title: 'Essential Functions', duration: '20m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' } ], isPremium: false, published: true },
  { id: '2', title: 'Advanced Excel Techniques', description: 'Learn pivot tables, VLOOKUP, macros, and advanced data analysis tools', category: 'Advanced Excel', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', duration: '5h 30m', lessons: [ { id: '2-1', title: 'Pivot Tables Deep Dive', duration: '25m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }, { id: '2-2', title: 'VLOOKUP & XLOOKUP', duration: '30m', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' } ], isPremium: true, published: true },
];

const initialMedia: MediaFile[] = [
  { id: 1, name: 'Budget Planner Thumbnail', type: 'image', format: 'JPG', size: '1.2 MB', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop', category: 'Thumbnails', alt: 'Budget Planner Template', published: true },
  { id: 2, name: 'Homepage Hero Banner', type: 'image', format: 'PNG', size: '3.5 MB', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop', category: 'Banners', alt: 'Hero banner showing Excel dashboard', published: true },
  { id: 3, name: 'Excel Pivot Tables Tutorial', type: 'video', format: 'MP4', size: '125 MB', duration: '15:42', url: 'https://www.w3schools.com/html/mov_bbb.mp4', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop', category: 'Tutorials', published: true },
];

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

interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

interface VideoCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  duration: string;
  lessons: VideoLesson[];
  isPremium: boolean;
  published: boolean;
}

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

interface DataContextType {
  templates: Template[];
  videoCourses: VideoCourse[];
  mediaFiles: MediaFile[];
  getPublishedTemplates: () => Template[];
  getPublishedVideos: () => VideoCourse[];
  getPublishedMedia: () => MediaFile[];
  addMediaFile: (file: MediaFile) => void;
  updateMediaFile: (id: number | string, updates: Partial<MediaFile>) => void;
  deleteMediaFile: (id: number | string) => void;
  addTemplate: (template: Template) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  addVideoCourse: (course: VideoCourse) => void;
  updateVideoCourse: (id: string, updates: Partial<VideoCourse>) => void;
  deleteVideoCourse: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [videoCourses, setVideoCourses] = useState<VideoCourse[]>(initialVideoCourses);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMedia);

  const getPublishedTemplates = () => templates.filter(t => t.published);
  const getPublishedVideos = () => videoCourses.filter(v => v.published);
  const getPublishedMedia = () => mediaFiles.filter(m => m.published);

  const addMediaFile = (file: MediaFile) => {
    setMediaFiles([file, ...mediaFiles]);
  };

  const updateMediaFile = (id: number | string, updates: Partial<MediaFile>) => {
    setMediaFiles(mediaFiles.map(file => file.id === id ? { ...file, ...updates } : file));
  };

  const deleteMediaFile = (id: number | string) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== id));
  };

  const addTemplate = (template: Template) => {
    setTemplates([template, ...templates]);
  };

  const updateTemplate = (id: string, updates: Partial<Template>) => {
    setTemplates(templates.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const addVideoCourse = (course: VideoCourse) => {
    setVideoCourses([course, ...videoCourses]);
  };

  const updateVideoCourse = (id: string, updates: Partial<VideoCourse>) => {
    setVideoCourses(videoCourses.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteVideoCourse = (id: string) => {
    setVideoCourses(videoCourses.filter(c => c.id !== id));
  };

  return (
    <DataContext.Provider value={{
      templates, videoCourses, mediaFiles,
      getPublishedTemplates, getPublishedVideos, getPublishedMedia,
      addMediaFile, updateMediaFile, deleteMediaFile,
      addTemplate, updateTemplate, deleteTemplate,
      addVideoCourse, updateVideoCourse, deleteVideoCourse,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
