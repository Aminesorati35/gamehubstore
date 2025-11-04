import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingModal from '../components/LoadingModal';
import { games } from '../data/games';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GameButton from '../components/GameButton';

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

const GamePage = () => {
  const { id } = useParams();
  const game = games.find(g => g.id === id);
  const [showModal, setShowModal] = useState(false);
  const [lockerId, setLockerId] = useState(null);


  if (!game) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Game Not Found</h2>
          <Link to="/" className="text-blue-500 hover:underline">Return to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleDownload = () => {
    setShowModal(true);
  };

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
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="md:flex md:gap-8">
            <div className="md:flex-1 mb-6 md:mb-0">
              <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden">
                <img 
                  src={game.heroImage} 
                  alt={game.title} 
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold">{game.title}</h3>
                  <p className="text-sm">{game.category}</p>
                </div>
              </div>
            </div>
            
            <div className="md:flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">NEW</span>
                  <h2 className="text-2xl font-bold mt-2">{game.shortName}</h2>
                  <p className="text-gray-300 text-sm">{game.developer}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-1">⭐</span>
                    <span className="font-bold">{game.rating}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{game.downloads} downloads</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Size</p>
                  <p className="font-bold">{game.size}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Version</p>
                  <p className="font-bold">{game.version}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Age</p>
                  <p className="font-bold">{game.age}</p>
                </div>
              </div>
              
              {/* <button 
                onClick={handleDownload}
                className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center mb-4 cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <i className="fas fa-download mr-2"></i>
                DOWNLOAD NOW
              </button> */}
              <GameButton lockerId={game.lockerId} setShowModal={setShowModal} setLockerId={setLockerId}  /> 

              
              <p className="text-center text-xs text-gray-400">By downloading, you agree to our Terms & Conditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Game Features</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {game.features.map((feature, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mb-2 text-2xl">
              <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="font-bold text-sm">{feature.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Screenshots</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {game.images.map((image, index) => (
            <div key={index} className="rounded-xl overflow-hidden">
              <img src={image} alt={`${game.title} Screenshot ${index + 1}`} className="w-full h-60 object-cover hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Player Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {game.reviews.map((review, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <div className={`w-10 h-10 bg-gradient-to-r ${review.gradient} rounded-full flex items-center justify-center mr-3`}>
                  <span className="font-bold text-sm">{review.initials}</span>
                </div>
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                    {review.rating % 1 !== 0 && <span>⭐</span>}
                  </div>
                </div>
              </div>
              <p className="text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      <LoadingModal isOpen={showModal} onComplete={handleModalComplete} />
      
      <Footer />
    </div>
  );
};

export default GamePage;