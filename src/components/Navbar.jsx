import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-lg bg-[#1a1a2e]/80 border-b border-gray-800/50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img src="/logo.png" className='w-10' alt="" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                GameHub
              </h1>
              <p className="text-[10px] text-gray-400 -mt-1">Play Anywhere</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Download Badge */}
            <div className="hidden lg:flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30">
              <span className="text-xs font-bold text-blue-400">2.4M+</span>
              <span className="text-xs text-gray-400 ml-1">Downloads</span>
            </div>

            {/* Mobile Menu Button */}
           
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;