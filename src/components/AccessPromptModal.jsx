import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoadingModal from "./LoadingModal";

export default function AccessPromptModal({
  isOpen,
  item,
  contentType = "game",
  platform,
  onClose,
  onContinue,
}) {
  if (!isOpen || !item) return null;

  const isScript = contentType === "script";
  const [isLoading, setIsLoading] = useState(false);

  const loadingType = useMemo(() => {
    // LoadingModal expects "scripts" for script steps/copy.
    return isScript ? "scripts" : "games";
  }, [isScript]);

  const heading = isScript ? "Unlock Script Access" : "Unlock Game Download";
  const actionText = isScript ? "get this script" : "download this game";

  const detailBadges = [
    platform ? `Platform: ${platform}` : null,
    item.category,
    item.size ? `Size: ${item.size}` : null,
    item.version ? `Version: ${item.version}` : null,
    item.downloads ? `${item.downloads} users` : null,
  ].filter(Boolean);

  const handleContinueClick = () => {
    if (isLoading) return;
    setIsLoading(true);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isLoading ? undefined : onClose}
        >
          <motion.div
            className="w-full max-w-[560px] rounded-2xl overflow-hidden border border-white/15 bg-[#0f172a] shadow-2xl"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-44 sm:h-52">
              <img
                src={item.heroImage}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/70 to-black/20" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/85 text-xs uppercase tracking-widest font-bold">
                  {isScript ? "Roblox Script" : "Game Download"}
                </p>
                <h3 className="text-white text-xl sm:text-2xl font-bold mt-1">
                  {item.shortName || item.title}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                To {actionText}, complete one quick verification offer.
              </p>

              <div className="mt-4 rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-white font-semibold text-sm">{heading}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {detailBadges.map((badge) => (
                    <span
                      key={badge}
                      className="text-xs text-white bg-white/10 border border-white/20 rounded-full px-2.5 py-1"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleContinueClick}
                disabled={isLoading}
                className={`mt-5 w-full rounded-xl bg-[#b7a507] text-white font-semibold py-3 transition-colors ${
                  isLoading
                    ? "opacity-80 cursor-not-allowed"
                    : "hover:bg-[#c7b50c] cursor-pointer"
                }`}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {isLoading && (
                    <span className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>
                    {isLoading ? "Preparing…" : `Continue to ${actionText}`}
                  </span>
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
