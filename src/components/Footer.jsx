import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-auto">
      {/* Gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="bg-gradient-to-b from-[#0f3460]/30 to-[#1a1a2e]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Main content */}
          <div className="flex flex-col items-center space-y-6">
           

            {/* Copyright */}
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm font-medium">
                © 2025 GameHub. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs max-w-md">
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