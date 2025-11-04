import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game, setShowModal, setLockerId }) => {
  const navigate = useNavigate();

  const handleDownload = (e) => {
    e.stopPropagation(); 
    setLockerId(game.lockerId);
    setShowModal(true); 
  };

  return (
    <div 
      onClick={() => navigate(`/game/${game.id}`)}
      className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-2 group"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img 
          src={game.heroImage} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            NEW
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base sm:text-lg font-bold drop-shadow-lg line-clamp-1">{game.shortName}</h3>
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        <p className="text-gray-300 text-xs sm:text-sm mb-2 line-clamp-1">{game.developer}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-yellow-400">
            <span className="mr-1 text-sm">⭐</span>
            <span className="font-bold text-sm">{game.rating}</span>
          </div>
          <p className="text-gray-400 text-xs">{game.downloads}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-2 border border-white/10 text-center">
            <p className="text-gray-400 text-xs mb-0.5">Size</p>
            <p className="font-bold text-xs">{game.size}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-2 border border-white/10 text-center">
            <p className="text-gray-400 text-xs mb-0.5">Age</p>
            <p className="font-bold text-xs">{game.age}</p>
          </div>
        </div>
        
        <button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
      </div>
    </div>
  );
};

export default GameCard;