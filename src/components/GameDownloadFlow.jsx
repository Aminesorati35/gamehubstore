
import React, { useState } from "react";
import PlatformModal from "./PlatformModal";
import DownloadLoadingModal from "./DownloadLoadingModal";
import AccessPromptModal from "./AccessPromptModal";

export default function GameDownloadFlow({
  item,
  isOpen,
  onClose,
  openAdblueLocker,
  showPcOption = false,
  flowType = "game",
}) {
  const [step, setStep] = useState("platform");
  const [platform, setPlatform] = useState(null);

  const handleClose = () => {
    setStep("platform");
    setPlatform(null);
    onClose?.();
  };

  const handlePlatformSelect = (selectedPlatform) => {
    setPlatform(selectedPlatform);
    setStep("loading");
  };

  const handleLoadingComplete = () => {
    setStep("verification");
  };

  const handleVerificationContinue = () => {
    if (!item) return;

    if (item.isAdbluemedia && item.adblueConfig) {
      if (typeof openAdblueLocker !== "function") {
        throw new Error("AdBlueMedia handler is not configured");
      }

      openAdblueLocker(item.adblueConfig);
      handleClose();
      return;
    }

    if (item.downloadUrl) {
      const url = new URL(item.downloadUrl, window.location.href);

      if (!["https:", "http:"].includes(url.protocol)) {
        throw new Error("Unsupported download URL");
      }

      window.location.assign(url.href);
      return;
    }

    console.error("No download provider configured for:", item);
  };

  if (!item) return null;

  return (
    <>
      <PlatformModal
        isOpen={isOpen && step === "platform"}
        gameTitle={item.shortName || item.title || item.name}
        flowType={flowType}
        showPcOption={showPcOption}
        onClose={handleClose}
        onSelect={handlePlatformSelect}
      />

      <DownloadLoadingModal
        isOpen={isOpen && step === "loading"}
        item={item}
        platform={platform}
        onClose={handleClose}
        onComplete={handleLoadingComplete}
      />

      <AccessPromptModal
        isOpen={isOpen && step === "verification"}
        item={item}
        onClose={handleClose}
        onContinue={handleVerificationContinue}
      />
    </>
  );
}
