import React from 'react';

export default function GameButton({ lockerId, setShowModal, setLockerId }) {
  const handleClick = () => {
    setLockerId(lockerId);
    setShowModal(true);
  };

  return (
    <button 
      className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center mb-4 cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" 
      onClick={handleClick}
    >
      <i className="fas fa-download mr-2"></i>
      DOWNLOAD NOW
    </button>
  );
}