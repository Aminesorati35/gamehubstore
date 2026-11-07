
import React, {
  useMemo,
  useState,
  useCallback,
} from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";

import { games, robloxScripts } from "../data/data";

import PlatformModal from "../components/PlatformModal";
import DownloadLoadingModal from "../components/DownloadLoadingModal";
import AccessPromptModal from "../components/AccessPromptModal";
import DownloadBackdrop from "../components/DownloadBackdrop";

import { openAdblueLocker } from "../utils/adblueLocker";

const Home = () => {
  // MODAL STATES
  const [showPlatformModal, setShowPlatformModal] =
    useState(false);

  const [showLoading, setShowLoading] = useState(false);
  const [downloadSession, setDownloadSession] = useState(0);

  const [showVerification, setShowVerification] =
    useState(false);

  // SELECTED GAME / SCRIPT
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPlatform, setSelectedPlatform] =
    useState("");

  // CURRENT TAB
  const [selectedTab, setSelectedTab] = useState("games");

  // OPEN PLATFORM SELECTOR
 const handleOpenPlatformPicker = (item) => {
  setDownloadSession((previous) => previous + 1);

  setSelectedItem(item);
  setSelectedPlatform("");

  setShowPlatformModal(true);
  setShowLoading(false);
  setShowVerification(false);
};

  // USER SELECTS ANDROID / IOS / PC
  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);

    setShowPlatformModal(false);
    setShowVerification(false);
    setShowLoading(true);
  };

  // CLOSE ALL MODALS
  const handleClose = () => {
  setShowPlatformModal(false);
  setShowLoading(false);
  setShowVerification(false);

  setSelectedItem(null);
  setSelectedPlatform("");
};

  // LOADING REACHES 100%
  // SHOW VERIFICATION INSTEAD OF OPENING LOCKER
  const handleLoadingComplete = useCallback(() => {
    if (!selectedItem) return;

    setShowLoading(false);
    setShowVerification(true);
  }, [selectedItem]);

  // USER CLICKS CONTINUE TO VERIFICATION
  const handleVerificationContinue = useCallback(async () => {
    if (!selectedItem) return;

    // ADBLUEMEDIA
    if (selectedItem.isAdbluemedia === true) {
      try {
        await openAdblueLocker(selectedItem.adblueConfig);

        setShowVerification(false);
      } catch (error) {
        console.error("AdBlueMedia error:", error);
      }

      return;
    }

    // OGADS / DIRECT URL
    if (selectedItem.downloadUrl) {
      try {
        const url = new URL(
          selectedItem.downloadUrl,
          window.location.href
        );

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Unsupported download URL");
        }

        window.location.assign(url.href);
      } catch (error) {
        console.error("Download URL error:", error);
      }

      return;
    }

    console.error("Download URL is missing!");
  }, [selectedItem]);

  // GAMES / SCRIPTS
  const displayedItems = useMemo(() => {
    if (selectedTab === "games") {
      return games;
    }

    if (selectedTab === "scripts") {
      return robloxScripts;
    }

    return [];
  }, [selectedTab]);

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <section className="container mx-auto min-h-screen px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-5">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            {selectedTab === "games"
              ? "Featured Games & Aps"
              : "Featured Scripts"}
          </h3>

          <p className="mt-1 text-sm text-white/45">
            {selectedTab === "games"
              ? "Choose your favorite Game or App"
              : "Choose your favorite script"}
          </p>
        </div>

        {/* GAME CARDS */}
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

      {/* BACKDROP */}
      <DownloadBackdrop
        isOpen={
          showPlatformModal ||
          showLoading ||
          showVerification
        }
      />

      {/* STEP 1: PLATFORM SELECTION */}
      <PlatformModal
        isOpen={showPlatformModal}
        onClose={handleClose}
        onSelect={handlePlatformSelect}
        gameTitle={
          selectedItem?.shortName ||
          selectedItem?.title ||
          selectedItem?.name
        }
        showPcOption={selectedTab === "scripts"}
        flowType={
          selectedTab === "scripts"
            ? "script"
            : "game"
        }
      />

      {/* STEP 2: LOADING ANIMATION */}
      <DownloadLoadingModal
  key={downloadSession}
  isOpen={showLoading}
  item={selectedItem}
  platform={selectedPlatform}
  onClose={handleClose}
  onComplete={handleLoadingComplete}
/>

      {/* STEP 3: VERIFICATION MODAL */}
      <AccessPromptModal
  key={`verification-${downloadSession}`}
  isOpen={showVerification}
  item={selectedItem}
  onClose={handleClose}
  onContinue={handleVerificationContinue}
/>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
