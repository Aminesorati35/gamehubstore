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
    <div className="min-h-screen">
      <Navbar />
      
      <section className="container mx-auto px-4 py-8 min-h-screen">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Games</h2>
          <p className="text-gray-400">Discover the best mobile games</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
