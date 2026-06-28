# Nuwana Excel

A modern educational platform for learning Excel with professional templates and video tutorials.

## Features

- 📊 **Excel Templates**: Browse and download professional templates
- 🎥 **Video Tutorials**: Step-by-step video courses
- 🔐 **Authentication**: User registration and login system
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 💎 **Premium Features**: Exclusive templates for premium users

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn or pnpm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and visit http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
nuwana-excel/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── templates/
│   │       └── TemplateCard.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── data/
│   │   └── mockData.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Templates.tsx
│   │   ├── TemplateDetail.tsx
│   │   ├── Videos.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```
