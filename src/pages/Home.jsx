import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import { games } from "../data/data";
import { robloxScripts } from "../data/data";
import AccessPromptModal from "../components/AccessPromptModal";
import TutorialModal from "../components/TutorialModal";
import LockerModal from "../components/LockerModal";

const Home = () => {
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [lockerId, setLockerId] = useState(null);
  const [showLocker, setShowLocker] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedTab, setSelectedTab] = useState("games");

  const handleOpenAccessPrompt = (item) => {
    setSelectedItem(item);
    setLockerId(item.lockerId);
    setShowAccessPrompt(true);
  };

  const handleTutorialContinue = () => {
    setShowTutorial(false);
    setShowLocker(true);
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
          {selectedTab==="games" ? "Discover the best mobile games and apps" : "Access high-performance scripts for your favorite games. Updated daily with new features."  }  
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl gap-2">
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
              onDownloadClick={handleOpenAccessPrompt}
            />
          ))}
        </div>
      </section>

      <AccessPromptModal
        isOpen={showAccessPrompt}
        item={selectedItem}
        contentType={selectedTab === "scripts" ? "script" : "game"}
        onClose={() => setShowAccessPrompt(false)}
        onContinue={() => {
          setShowAccessPrompt(false);
          setShowTutorial(true);
        }}
      />

      <TutorialModal
        isOpen={showTutorial}
        itemTitle={selectedItem?.shortName || selectedItem?.title}
        contentType={selectedTab === "scripts" ? "script" : "game"}
        onClose={() => setShowTutorial(false)}
        onContinue={handleTutorialContinue}
      />

      <LockerModal
        isOpen={showLocker}
        lockerId={lockerId}
        onClose={() => setShowLocker(false)}
      />

      <Footer />
    </div>
  );
};

export default Home;
