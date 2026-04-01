import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import { games } from "../data/data";
import { apps } from "../data/data";
import { robloxScripts } from "../data/data";
import LoadingModal from "../components/LoadingModal";
import PlatformModal from "../components/PlatformModal";
import { motion } from "motion/react";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [lockerId, setLockerId] = useState(null);
  const [showLocker, setShowLocker] = useState(false);

  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);

  const [selectedTab, setSelectedTab] = useState("scripts");

  const handleOpenPlatformModal = (item) => {
    setSelectedGame(item);
    setLockerId(item.lockerId);
    setShowPlatformModal(true);
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setShowPlatformModal(false);
    setShowModal(true);
  };

  const handleModalComplete = async () => {
    setShowModal(false);
    if (lockerId) {
      setShowLocker(true);
    }
  };

const displayedItems = useMemo(() => {
  if (selectedTab === "games") return games;
  if (selectedTab === "scripts") return robloxScripts;
  return [];
}, [selectedTab]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#16213e] to-[#0a0e27]">
      <Navbar />

      <section className="container mx-auto px-10 py-8 min-h-screen">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Featured Content
          </h2>
          <p className="text-gray-400">
            Discover the best mobile games and apps
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl gap-2">
            <button
              onClick={() => setSelectedTab("scripts")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                selectedTab === "scripts"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              Roblox Scripts
            </button>
            <button
              onClick={() => setSelectedTab("games")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                selectedTab === "games"
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              Games
            </button>
            {/* <button
              onClick={() => setSelectedTab("apps")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                selectedTab === "apps"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              Apps
            </button> */}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-white text-2xl font-bold">
            {selectedTab === "games"
              ? "Featured Games"
              : selectedTab === "apps"
                ? "Featured Apps"
                : "Featured Scripts"}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {selectedTab === "games"
              ? "Choose your favorite game"
              : selectedTab === "apps"
                ? "Choose your favorite app"
                : "Choose your favorite script"}
          </p>
        </div>

        <div
          key={selectedTab}
          className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {displayedItems.map((item) => (
            <GameCard
              key={`${selectedTab}-${item.id}`}
              game={item}
              onDownloadClick={handleOpenPlatformModal}
            />
          ))}
        </div>
      </section>

<PlatformModal
  isOpen={showPlatformModal}
  onClose={() => setShowPlatformModal(false)}
  onSelect={handlePlatformSelect}
  gameTitle={selectedGame?.shortName || selectedGame?.title}
  showPcOption={selectedTab === "scripts"}
/>
      <LoadingModal
        isOpen={showModal}
        onComplete={handleModalComplete}
        platform={selectedPlatform}
      />

      {showLocker && (
        <motion.div
          key="locker-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={() => setShowLocker(false)}
        >
          <motion.div
            key="locker-modal"
            className="relative w-[95%] md:w-[65%] lg:w-[42%] 
             h-[calc(var(--vh,1vh)*90)] md:h-[80vh]
             bg-gradient-to-b from-[#0f172a] to-[#020617]
             rounded-2xl overflow-hidden 
             shadow-[0_0_40px_rgba(0,0,0,0.8)]
             border border-cyan-500/30"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-4 py-3 
                bg-gradient-to-r from-cyan-600 to-blue-700 
                border-b border-white/10"
            >
              <p className="font-bold text-white text-sm tracking-wide">
                🔐 Verification Required{" "}
                {selectedPlatform ? `• ${selectedPlatform}` : ""}
              </p>
            </div>

            <div className="relative w-full h-full bg-black">
              {/* Glow border */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none 
                  border border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
              />

              <iframe
                src={`https://confirmapp.store/cl/i/${lockerId}`}
                className="w-full h-full border-0 bg-white rounded-b-2xl"
                scrolling="yes"
                title="locker"
              />
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
