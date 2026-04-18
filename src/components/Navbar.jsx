import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0b1020]/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-3.5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img src="/logo.png" className='w-10 rounded-xl' alt="" />
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-black bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent tracking-tight">
                Gamedrop.online
              </h1>
              <p className="text-[10px] text-white/45 -mt-1 tracking-wide">Premium Downloads</p>
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Download Badge */}
            <div className="hidden lg:flex items-center px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="text-xs font-semibold text-white/85">2.4M+</span>
              <span className="text-xs text-white/45 ml-1">Downloads</span>
            </div>
            

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;