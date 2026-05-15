import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black/85 backdrop-blur-xl z-[1000] border-b border-white/5 flex items-center">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
            <Heart size={20} fill="white" color="white" />
          </div>
          <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight">PashuRashak</span>
        </Link>
        
        <div className="hidden md:flex gap-10 items-center">
          {[
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'Contact', path: '/contact' },
            { name: 'About', path: '/about' },
            { name: 'Report', path: '/report' }
          ].map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-sm font-semibold transition-all relative ${
                isActive(link.path) 
                ? 'text-emerald-400' 
                : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-emerald-500 rounded-full"></span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <Link to={`/${user.role}`} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5">
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-4 md:gap-6">
              <Link to="/login" className="text-white/80 hover:text-white font-semibold text-sm transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;