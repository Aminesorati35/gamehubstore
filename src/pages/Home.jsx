import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import LoadingModal from '../components/LoadingModal';

function loadLockerScript(lockerId) {
  return new Promise((resolve) => {
    const oldScript = document.getElementById("ogjs");
    if (oldScript) oldScript.remove();

    const script = document.createElement("script");
    script.src = `https://redirectapps.org/cl/js/${lockerId}`;
    script.id = "ogjs";
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [lockerId, setLockerId] = useState(null);

  const handleModalComplete = async () => {
    setShowModal(false);
    if (lockerId) {
      await loadLockerScript(lockerId);
      window.og_load();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#16213e] to-[#0a0e27]">
      <Navbar />
      
      <section className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Featured Games
          </h2>
          <p className="text-gray-400">Discover the best mobile games</p>
        </div>
        
        {/* Mobile: 2 columns, Tablet: 2 columns, Desktop: 3 columns, Large: 4 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              setShowModal={setShowModal} 
              setLockerId={setLockerId} 
            />
          ))}
        </div>
      </section>
      
      <LoadingModal isOpen={showModal} onComplete={handleModalComplete} />
      <Footer />
    </div>
  );
};

export default Home;
