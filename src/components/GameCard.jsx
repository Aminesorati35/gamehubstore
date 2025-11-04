import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game,setShowModal, setLockerId }) => {
  const navigate = useNavigate();

  const handleDownload = (e) => {
    e.stopPropagation(); 
    setLockerId(game.lockerId);
    setShowModal(true); 
  };

  return (
    <div 
      onClick={() => navigate(`/game/${game.id}`)}
      className=" pb-2 bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
    >
      <div className="relative h-48">
        <img src={game.heroImage} alt={game.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">NEW</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{game.shortName}</h3>
        <p className="text-gray-300 text-sm mb-2">{game.developer}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-yellow-400">
            <span className="mr-1">⭐</span>
            <span className="font-bold">{game.rating}</span>
          </div>
          <p className="text-gray-400 text-xs">{game.downloads} downloads</p>
        </div>
        <div className="mt-3 flex justify-between text-xs">
          <div>
            <p className="text-gray-400">Size</p>
            <p className="font-bold">{game.size}</p>
          </div>
          <div>
            <p className="text-gray-400">Age</p>
            <p className="font-bold">{game.age}</p>
          </div>
        </div>
        
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
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