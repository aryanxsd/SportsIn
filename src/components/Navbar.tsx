import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Users,
  Search,
  UserCircle,
  LogOut,
  Trophy,
  Building2,
  Globe,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { path: '/home', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { path: '/discover', icon: <Search className="w-5 h-5" />, label: 'Discover' },
    { path: '/teams', icon: <Users className="w-5 h-5" />, label: 'Teams' },
    { path: '/tournaments', icon: <Trophy className="w-5 h-5" />, label: 'Tournaments' },
    { path: '/community', icon: <Globe className="w-5 h-5" />, label: 'Community' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 ${
        isScrolled ? 'border-neon' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-black" />
                </div>
                <span className="ml-2 text-xl font-bold text-white">SportsIn</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? 'bg-black text-neon border border-neon'
                        : 'text-gray-300 hover:text-neon'
                    } px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* User Menu (Desktop) */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                {user.user_type === 'Academy' && (
                  <Link
                    to="/academy-setup"
                    className="flex items-center text-gray-300 hover:text-neon transition-colors"
                  >
                    <Building2 className="w-5 h-5 mr-2" />
                    Academy
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="flex items-center text-gray-300 hover:text-neon transition-colors"
                >
                  <UserCircle className="w-8 h-8" />
                  <span className="ml-2">{user.username}</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center text-gray-300 hover:text-neon transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="ml-2">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="text-gray-300 hover:text-neon px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-neon text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-300 hover:text-neon p-2"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)} />
        
        <div className="relative bg-black w-4/5 max-w-sm h-full overflow-y-auto">
          <div className="px-4 pt-4 pb-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-8 h-8 rounded-full bg-neon flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-black" />
                </div>
                <span className="ml-2 text-xl font-bold text-white">SportsIn</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-neon"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {user && (
            <div className="px-4 py-4 border-b border-gray-800">
              <Link
                to="/profile"
                className="flex items-center space-x-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.username}&background=39FF14&color=000000`}
                  alt={user.username}
                  className="h-10 w-10 rounded-full border border-neon"
                />
                <div>
                  <div className="text-white font-medium">{user.username}</div>
                  <div className="text-gray-400 text-sm">{user.sport} {user.user_type}</div>
                </div>
              </Link>
            </div>
          )}

          <div className="px-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-md ${
                  location.pathname === item.path
                    ? 'text-neon bg-neon bg-opacity-10'
                    : 'text-gray-300'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ))}

            {user?.user_type === 'Academy' && (
              <Link
                to="/academy-setup"
                className="flex items-center justify-between px-4 py-3 rounded-md text-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <Building2 className="w-5 h-5" />
                  <span className="ml-3">Academy</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <div className="border-t border-gray-800 px-4 py-4">
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-gray-300 hover:text-neon"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/signin"
                  className="block w-full text-center px-4 py-2 rounded-md border border-gray-700 text-gray-300 hover:text-neon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-2 rounded-md bg-neon text-black font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;