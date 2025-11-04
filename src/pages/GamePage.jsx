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
      <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] to-[#16213e]">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-4">Game Not Found</h2>
            <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
          <div className="md:flex md:gap-8">
            <div className="md:flex-1 mb-6 md:mb-0">
              <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden group">
                <img 
                  src={game.heroImage} 
                  alt={game.title} 
                  className="absolute top-0 left-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold drop-shadow-lg">{game.title}</h3>
                  <p className="text-sm text-gray-200 drop-shadow-md">{game.category}</p>
                </div>
              </div>
            </div>
            
            <div className="md:flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    NEW
                  </span>
                  <h2 className="text-3xl font-bold mt-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {game.shortName}
                  </h2>
                  <p className="text-gray-300 text-sm mt-1">{game.developer}</p>
                </div>
                <div className="text-right bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10">
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-1">⭐</span>
                    <span className="font-bold text-lg">{game.rating}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{game.downloads} downloads</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
                  <p className="text-gray-400 text-xs mb-1">Size</p>
                  <p className="font-bold text-sm">{game.size}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
                  <p className="text-gray-400 text-xs mb-1">Version</p>
                  <p className="font-bold text-sm">{game.version}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center">
                  <p className="text-gray-400 text-xs mb-1">Age</p>
                  <p className="font-bold text-sm">{game.age}</p>
                </div>
              </div>
              
              <GameButton lockerId={game.lockerId} setShowModal={setShowModal} setLockerId={setLockerId} /> 
              
              <p className="text-center text-xs text-gray-500">By downloading, you agree to our Terms & Conditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Game Features
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {game.features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 flex flex-col items-center text-center border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-3 text-2xl shadow-lg">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Screenshots */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Screenshots
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {game.images.map((image, index) => (
            <div 
              key={index} 
              className="rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 group bg-white/5 backdrop-blur-lg"
            >
              <img 
                src={image} 
                alt={`${game.title} Screenshot ${index + 1}`} 
                className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="container mx-auto px-4 py-6 pb-12">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Player Reviews
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {game.reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${review.gradient} rounded-full flex items-center justify-center mr-3 shadow-lg`}>
                  <span className="font-bold text-sm">{review.initials}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">{review.name}</h3>
                  <div className="flex text-yellow-400 text-xs mt-1">
                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                    {review.rating % 1 !== 0 && <span>⭐</span>}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{review.text}</p>
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