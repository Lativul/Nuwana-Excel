import React from 'react';
import { Link } from 'react-router-dom';
import {  Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Nuwana Excel Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Master Excel with our professional templates and comprehensive tutorials. Boost your productivity today.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link to="/templates" className="text-gray-400 hover:text-primary transition-colors text-sm">Templates</Link></li>
              <li><Link to="/videos" className="text-gray-400 hover:text-primary transition-colors text-sm">Video Courses</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-primary transition-colors text-sm">Categories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-heading">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Finance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Business</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Student</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Productivity</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-heading">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact Us</a></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Nuwana Excel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
