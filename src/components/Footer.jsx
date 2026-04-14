import React from 'react';

const Footer = () => {
  return (
    <footer className="relative mt-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="bg-[#0b1020]/45 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-8">
          {/* Main content */}
          <div className="flex flex-col items-center space-y-6">
           

            {/* Copyright */}
            <div className="text-center space-y-2">
              <p className="text-white/65 text-sm font-medium">
                © 2025 GameHub. All rights reserved.
              </p>
              <p className="text-white/35 text-xs max-w-md leading-relaxed">
                This is a fan page. All trademarks belong to their respective owners.
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;