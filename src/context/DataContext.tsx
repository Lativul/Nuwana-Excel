import { createContext } from 'react';
import { Template, VideoCourse, MediaFile } from '../types';

interface DataContextType {
  templates: Template[];
  videoCourses: VideoCourse[];
  mediaFiles: MediaFile[];
  getPublishedTemplates: () => Template[];
  getPublishedVideos: () => VideoCourse[];
  getPublishedMedia: () => MediaFile[];
  updateMediaFile: (id: string | number, updates: Partial<MediaFile>) => void;
  addTemplate: (template: Template) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
  addVideoCourse: (course: VideoCourse) => void;
  updateVideoCourse: (id: string, updates: Partial<VideoCourse>) => void;
  deleteVideoCourse: (id: string) => void;
  addMediaFile: (file: MediaFile) => void;
  deleteMediaFile: (id: string | number) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);
