
import React, { useMemo, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import { games, robloxScripts } from "../data/data";
import PlatformModal from "../components/PlatformModal";
import DownloadLoadingModal from "../components/DownloadLoadingModal";
import DownloadBackdrop from "../components/DownloadBackdrop";
import { openAdblueLocker } from "../utils/adblueLocker";

const Home = () => {
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedTab, setSelectedTab] = useState("games");

  const handleOpenPlatformPicker = (item) => {
    setSelectedItem(item);
    setSelectedPlatform("");
    setShowLoading(false);
    setShowPlatformModal(true);
  };

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    setShowPlatformModal(false);
    setShowLoading(true);
  };

  const handleClose = () => {
    setShowPlatformModal(false);
    setShowLoading(false);
    setSelectedItem(null);
    setSelectedPlatform("");
  };

  const handleLoadingComplete = useCallback(async () => {
    if (!selectedItem) return;

    setShowLoading(false);

    if (selectedItem.isAdbluemedia === true) {
      try {
        await openAdblueLocker(selectedItem.adblueConfig);
      } catch (error) {
        console.error("AdBlueMedia error:", error);
      }
      return;
    }

    if (selectedItem.downloadUrl) {
      window.location.href = selectedItem.downloadUrl;
      return;
    }

    console.error("Download URL is missing!");
  }, [selectedItem]);

  const displayedItems = useMemo(() => {
    if (selectedTab === "games") return games;
    if (selectedTab === "scripts") return robloxScripts;
    return [];
  }, [selectedTab]);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="container mx-auto min-h-screen px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-5">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            {selectedTab === "games"
              ? "Featured Games"
              : "Featured Scripts"}
          </h3>

          <p className="mt-1 text-sm text-white/45">
            {selectedTab === "games"
              ? "Choose your favorite game"
              : "Choose your favorite script"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {displayedItems.map((item) => (
            <GameCard
              key={`${selectedTab}-${item.id}`}
              game={item}
              onDownloadClick={handleOpenPlatformPicker}
            />
          ))}
        </div>
      </section>

      <DownloadBackdrop
        isOpen={showPlatformModal || showLoading}
      />

      <PlatformModal
        isOpen={showPlatformModal}
        onClose={handleClose}
        onSelect={handlePlatformSelect}
        gameTitle={selectedItem?.shortName || selectedItem?.title}
        showPcOption={selectedTab === "scripts"}
        flowType={selectedTab === "scripts" ? "script" : "game"}
      />

      <DownloadLoadingModal
        isOpen={showLoading}
        item={selectedItem}
        platform={selectedPlatform}
        onClose={handleClose}
        onComplete={handleLoadingComplete}
      />

      <Footer />
    </div>
  );
};

export default Home;
