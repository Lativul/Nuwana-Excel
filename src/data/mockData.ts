export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isPremium: boolean;
  thumbnail: string;
  screenshots: string[];
  features: string[];
  tutorialVideo?: string;
  downloadUrl: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  templateCount: number;
}

export const categories: Category[] = [
  { id: '1', name: 'Finance', icon: 'dollar-sign', templateCount: 24 },
  { id: '2', name: 'Student', icon: 'graduation-cap', templateCount: 18 },
  { id: '3', name: 'Business', icon: 'briefcase', templateCount: 32 },
  { id: '4', name: 'Dashboard', icon: 'bar-chart-3', templateCount: 15 },
  { id: '5', name: 'Inventory', icon: 'package', templateCount: 12 },
  { id: '6', name: 'Productivity', icon: 'check-square', templateCount: 28 },
];

export const templates: Template[] = [
  {
    id: '1',
    title: 'Budget Planner Pro',
    description: 'Comprehensive budget tracker with monthly breakdown, savings goals, and visual charts.',
    category: 'Finance',
    difficulty: 'Beginner',
    isPremium: false,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    ],
    features: [
      'Monthly income and expense tracking',
      'Auto-calculating totals and summaries',
      'Visual charts and graphs',
      'Customizable categories',
      'Savings goal tracker',
    ],
    tutorialVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadUrl: '#',
  },
  {
    id: '2',
    title: 'Student Grade Tracker',
    description: 'Track your academic progress, calculate GPA, and set academic goals.',
    category: 'Student',
    difficulty: 'Beginner',
    isPremium: false,
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
    ],
    features: [
      'Grade calculation per subject',
      'GPA calculator (4.0 scale)',
      'Semester and year views',
      'Goal setting and progress tracking',
    ],
    downloadUrl: '#',
  },
  {
    id: '3',
    title: 'Sales Dashboard',
    description: 'Professional sales dashboard with real-time metrics, KPIs, and performance trends.',
    category: 'Dashboard',
    difficulty: 'Intermediate',
    isPremium: true,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    ],
    features: [
      'Real-time sales metrics',
      'Monthly and quarterly comparisons',
      'Top performers tracking',
      'Interactive charts',
      'Export to PDF/Excel',
    ],
    tutorialVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadUrl: '#',
  },
  {
    id: '4',
    title: 'Inventory Management',
    description: 'Complete inventory tracking with stock levels, reorder points, and supplier management.',
    category: 'Inventory',
    difficulty: 'Intermediate',
    isPremium: true,
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    ],
    features: [
      'Stock level monitoring',
      'Automatic reorder alerts',
      'Supplier database',
      'Barcode scanning support',
      'Order history tracking',
    ],
    downloadUrl: '#',
  },
  {
    id: '5',
    title: 'Habit Tracker',
    description: 'Build better habits with daily tracking, streaks, and progress visualization.',
    category: 'Productivity',
    difficulty: 'Beginner',
    isPremium: false,
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
    ],
    features: [
      'Daily habit check-ins',
      'Streak counter',
      'Weekly/monthly reports',
      'Custom habit creation',
    ],
    downloadUrl: '#',
  },
  {
    id: '6',
    title: 'Financial Report Generator',
    description: 'Automated financial reports with P&L, balance sheet, and cash flow statements.',
    category: 'Finance',
    difficulty: 'Advanced',
    isPremium: true,
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    screenshots: [
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    ],
    features: [
      'Profit & Loss statement',
      'Balance sheet generation',
      'Cash flow analysis',
      'Multi-period comparison',
      'Professional formatting',
    ],
    tutorialVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    downloadUrl: '#',
  },
];

export const videos: Video[] = [
  {
    id: '1',
    title: 'Excel Fundamentals: From Zero to Hero',
    description: 'Complete beginner course covering all essential Excel functions and features.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 420,
    lessons: [
      { id: 'l1', title: 'Introduction to Excel', duration: 15, completed: true },
      { id: 'l2', title: 'Basic Formulas & Functions', duration: 20, completed: true },
      { id: 'l3', title: 'Cell Formatting', duration: 18, completed: false },
      { id: 'l4', title: 'Charts & Visualization', duration: 25, completed: false },
      { id: 'l5', title: 'Pivot Tables Basics', duration: 22, completed: false },
    ],
  },
  {
    id: '2',
    title: 'Advanced Pivot Tables & Data Analysis',
    description: 'Master pivot tables, power query, and advanced data analysis techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: 540,
    lessons: [
      { id: 'l1', title: 'Pivot Table Deep Dive', duration: 30, completed: false },
      { id: 'l2', title: 'Power Query Essentials', duration: 35, completed: false },
      { id: 'l3', title: 'Data Modeling', duration: 40, completed: false },
    ],
  },
];
