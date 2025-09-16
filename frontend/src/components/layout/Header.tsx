import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Helper function to check if a section is active
  const isSectionActive = (sectionId: string) => {
    if (location.pathname === '/') {
      // For home page, check if we're in the hero section
      return sectionId === 'hero';
    }
    return false;
  };

  // Helper function to check if a route is active
  const isRouteActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen && !(event.target as Element).closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // Don't show header on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-soft' : 'bg-white shadow-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('hero')}
              className={`text-2xl font-bold transition-colors duration-200 ${
                isScrolled ? 'text-endereco-blue hover:text-endereco-light-blue' : 'text-gray-800 hover:text-endereco-blue'
              }`}
            >
              Taimi<span className="text-blue-500">Lab</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-all duration-200 ${
                isRouteActive('/') 
                  ? 'text-black font-bold' 
                  : 'text-gray-700 hover:text-endereco-blue'
              }`}
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className={`transition-all duration-200 ${
                isSectionActive('about') 
                  ? 'text-black font-bold' 
                  : 'text-gray-700 hover:text-endereco-blue'
              }`}
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`transition-all duration-200 ${
                isSectionActive('contact') 
                  ? 'text-black font-bold' 
                  : 'text-gray-700 hover:text-endereco-blue'
              }`}
            >
              Contato
            </button>
            
            {/* Dashboard Link for authenticated users */}
            {isAuthenticated && (
              <Link
                to="/home"
                className={`transition-all duration-200 ${
                  isRouteActive('/home') 
                    ? 'text-black font-bold' 
                    : 'text-gray-700 hover:text-endereco-blue'
                }`}
              >
                Home
              </Link>
            )}
          </nav>

          {/* User Menu / Login Button */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-endereco-blue transition-colors duration-200"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 bg-endereco-gradient rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="hidden sm:block">{user?.name || user?.email}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-endereco-blue hover:bg-endereco-dark-blue transition-colors duration-200"
              >
                Sign in
              </Link>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className={`transition-colors duration-200 ${
                  isScrolled ? 'text-gray-700 hover:text-endereco-blue' : 'text-gray-700 hover:text-endereco-blue'
                }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-gray-200 rounded-b-lg">
              <Link
                to="/"
                className={`block w-full text-left px-3 py-2 transition-all duration-200 ${
                  isRouteActive('/') 
                    ? 'text-black font-bold' 
                    : 'text-gray-700 hover:text-endereco-blue hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left px-3 py-2 transition-all duration-200 ${
                  isSectionActive('about') 
                    ? 'text-black font-bold' 
                    : 'text-gray-700 hover:text-endereco-blue hover:bg-gray-50'
                }`}
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-left px-3 py-2 transition-all duration-200 ${
                  isSectionActive('contact') 
                    ? 'text-black font-bold' 
                    : 'text-gray-700 hover:text-endereco-blue hover:bg-gray-50'
                }`}
              >
                Contact
              </button>
              
              {/* Dashboard Link for authenticated users */}
              {isAuthenticated && (
                <Link
                to="/home"
                className={`block w-full text-left px-3 py-2 transition-all duration-200 ${
                  isRouteActive('/home') 
                    ? 'text-black font-bold' 
                    : 'text-gray-700 hover:text-endereco-blue hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
                </Link>
              )}
              
              {/* Authentication section */}
              {isAuthenticated ? (
                <div className="pt-2 border-t border-gray-200">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-endereco-blue hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-endereco-blue hover:bg-gray-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}