import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Nuwana Excel Logo" 
                className="h-20 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">Home</Link>
            <Link to="/templates" className="text-gray-700 hover:text-primary font-medium transition-colors">Templates</Link>
            <Link to="/videos" className="text-gray-700 hover:text-primary font-medium transition-colors">Videos</Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary font-medium transition-colors">Categories</Link>
            {isAdmin && (
              <Link to="/admin" className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors">
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium">
                  <User className="w-5 h-5" />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-primary font-medium">Sign In</Link>
                <Link to="/register" className="btn-primary">Get Started</Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium rounded-lg hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/templates"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium rounded-lg hover:bg-gray-50"
            >
              Templates
            </Link>
            <Link
              to="/videos"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium rounded-lg hover:bg-gray-50"
            >
              Videos
            </Link>
            <Link
              to="/categories"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-primary font-medium rounded-lg hover:bg-gray-50"
            >
              Categories
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 text-primary font-medium rounded-lg hover:bg-primary/10"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <div className="border-t border-gray-100 pt-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-primary font-medium rounded-lg hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-primary font-medium rounded-lg hover:bg-gray-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 btn-primary text-center rounded-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
