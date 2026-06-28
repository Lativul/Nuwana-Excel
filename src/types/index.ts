export interface Template {
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

export interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

export interface VideoCourse {
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

export interface MediaFile {
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

export type UserRole = 'Guest' | 'User' | 'Administrator';

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  role: UserRole;
}
