import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import LoadingModal from '../components/LoadingModal';
import { motion } from "motion/react"

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [lockerId, setLockerId] = useState(null);
  const [showLocker,setShowLocker]=useState()



  const handleModalComplete = async () => {
    setShowModal(false);
    if (lockerId) {
      setShowLocker(true)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#16213e] to-[#0a0e27]">
      <Navbar />
      
      <section className="container mx-auto px-10 py-8 min-h-screen">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Featured Games
          </h2>
          <p className="text-gray-400">Discover the best mobile games</p>
        </div>
        
        {/* Mobile: 2 columns, Tablet: 2 columns, Desktop: 3 columns, Large: 4 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 ">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              setShowModal={setShowModal} 
              setLockerId={setLockerId} 
              setShowLocker={setShowLocker}
            />
          ))}
        </div>
      </section>
      
      <LoadingModal isOpen={showModal} onComplete={handleModalComplete}/>
      {showLocker && (
          <motion.div
            key="locker-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => setShowLocker(false)} // click outside closes
          >
            <motion.div
              key="locker-modal"
              className="w-[92%] md:w-[60%] lg:w-[40%] h-[calc(var(--vh,1vh)*90)] md:h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-300"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} // prevent close on inside click
            >
              {/* Optional header */}
              <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b">
                <p className="font-game text-sm text-gray-700">Verification</p>
              </div>

              <iframe
                src={`https://confirmapp.store/cl/i/${lockerId}`}
                className="w-full h-full border-0"
                scrolling="yes"
                title="locker"
              />
            </motion.div>
          </motion.div>
        )}
      <Footer />
    </div>
  );
};

export default Home;
