import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import { games } from "../data/data";
import { robloxScripts } from "../data/data";
import AccessPromptModal from "../components/AccessPromptModal";
import PlatformModal from "../components/PlatformModal";

const Home = () => {
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [showAccessPrompt, setShowAccessPrompt] = useState(false);
  const [lockerId, setLockerId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const [selectedTab, setSelectedTab] = useState("games");

  const handleOpenPlatformPicker = (item) => {
    setSelectedItem(item);
    setLockerId(item.lockerId);
    setSelectedPlatform("");
    setShowPlatformModal(true);
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setShowPlatformModal(false);
    setShowAccessPrompt(true);
  };

  const handleClosePlatformModal = () => {
    setShowPlatformModal(false);
    setSelectedItem(null);
    setLockerId(null);
    setSelectedPlatform("");
  };

const displayedItems = useMemo(() => {
  if (selectedTab === "games") return games;
  if (selectedTab === "scripts") return robloxScripts;
  return [];
}, [selectedTab]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-8 min-h-screen">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-5 py-6 sm:px-7">
          <h2 className="text-3xl sm:text-4xl font-black mb-2 tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Featured Content
          </h2>
          <p className="text-white/50 leading-relaxed">
          {selectedTab==="games" ? "Discover the best mobile games and apps" : "Access high-performance scripts for your favorite games. Updated daily with new features."  }  
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] gap-2">
          <button
              onClick={() => setSelectedTab("games")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                selectedTab === "games"
                  ? "bg-white text-[#0b1020] shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              Games
            </button>
            {/* <button
              onClick={() => setSelectedTab("scripts")}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                selectedTab === "scripts"
                  ? "bg-white text-[#0b1020] shadow-lg"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              Roblox Scripts
            </button> */}
            
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
          <h3 className="text-white text-2xl font-bold tracking-tight">
            {selectedTab === "games"
              ? "Featured Games"
              : selectedTab === "apps"
                ? "Featured Apps"
                : "Featured Scripts"}
          </h3>
          <p className="text-white/45 text-sm mt-1">
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
              onDownloadClick={handleOpenPlatformPicker}
            />
          ))}
        </div>
      </section>

      <PlatformModal
        isOpen={showPlatformModal}
        onClose={handleClosePlatformModal}
        onSelect={handlePlatformSelect}
        gameTitle={selectedItem?.shortName || selectedItem?.title}
        showPcOption={selectedTab === "scripts"}
        flowType={selectedTab === "scripts" ? "script" : "game"}
      />

      <AccessPromptModal
        isOpen={showAccessPrompt}
        item={selectedItem}
        contentType={selectedTab === "scripts" ? "script" : "game"}
        platform={selectedPlatform}
        onClose={() => setShowAccessPrompt(false)}
        onContinue={() => {
          setShowAccessPrompt(false);
          if (!lockerId) return;
          window.location.assign(`https://redirectapps.org/cl/i/${lockerId}`);
        }}
      />

      <Footer />
    </div>
  );
};

export default Home;
