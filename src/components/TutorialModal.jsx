import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoadingModal from "./LoadingModal";

const TUTORIAL_SOURCES = {
  game: "https://player.cloudinary.com/embed/?cloud_name=dendxflaj&public_id=games_content_locker_gue8er",
  script:
    "https://player.cloudinary.com/embed/?cloud_name=dendxflaj&public_id=0407_3_czwcuk",
};

export default function TutorialModal({
  isOpen,
  contentType = "game",
  itemTitle,
  platform,
  onClose,
  onContinue,
}) {
  if (!isOpen) return null;

  const isScript = contentType === "script";
  const [isLoading, setIsLoading] = useState(false);

  const loadingType = useMemo(() => {
    return isScript ? "scripts" : "games";
  }, [isScript]);

  const handleContinueClick = () => {
    if (isLoading) return;
    setIsLoading(true);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isLoading ? undefined : onClose}
        >
          <motion.div
            className="w-full max-w-[420px] rounded-2xl overflow-hidden border border-amber-300/70 bg-[#0b1220] shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[56vh] min-h-[320px] max-h-[540px] bg-black">
              <iframe
                title="Tutorial video"
                src={TUTORIAL_SOURCES[contentType] || TUTORIAL_SOURCES.game}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 text-center">
              <p className="text-white/90 text-sm mb-4 ">
                <span className="font-semibold text-red-400">
                  {itemTitle ? `${itemTitle}: ` : ""}
                </span>
                {platform ? `(${platform}) ` : ""}
                {isScript
                  ? "Complete the tutorial to see how to download the script."
                  : "Complete the tutorial to see how to download the game."}
              </p>

              <button
                onClick={handleContinueClick}
                disabled={isLoading}
                className={`w-full bg-[#b7a507] text-white py-3 rounded-xl font-semibold transition-colors ${
                  isLoading
                    ? "opacity-80 cursor-not-allowed"
                    : "hover:bg-[#c7b50c] cursor-pointer"
                }`}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {isLoading && (
                    <span className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>{isLoading ? "Preparing…" : "Continue →"}</span>
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <LoadingModal
        isOpen={isLoading}
        platform={platform}
        type={loadingType}
        onComplete={() => {
          setIsLoading(false);
          onContinue?.();
        }}
      />
    </>
  );
}
