
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, CheckCircle2 } from "lucide-react";

export default function DownloadLoadingModal({
  isOpen,
  item,
  platform,
  onComplete,
  onClose,
}) {
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  

  useEffect(() => {
  if (!isOpen || !item) {
    completedRef.current = false;
    return;
  }

  completedRef.current = false;
  setProgress(0);

  let value = 0;

  const interval = setInterval(() => {
    value = Math.min(value + 0.6, 100);
    setProgress(value);

    if (value >= 100) {
      clearInterval(interval);
    }
  }, 45);

  return () => clearInterval(interval);
}, [isOpen, item]);

 useEffect(() => {
  if (!isOpen || progress < 100 || completedRef.current) {
    return;
  }

  completedRef.current = true;

  const timeout = setTimeout(() => {
    onComplete?.();
  }, 600);

  return () => clearTimeout(timeout);
}, [isOpen, progress, onComplete]);

  const isDone = progress >= 100;

  const phaseLabel =
    progress < 15
      ? "Connecting to download service..."
      : progress < 45
      ? "Preparing game information..."
      : progress < 75
      ? "Preparing download setup..."
      : progress < 90
      ? "Checking platform compatibility..."
      : progress < 100
      ? "Finishing setup..."
      : "Setup complete!";

  const gameTitle =
    item?.shortName || item?.title || item?.name || "Game";

  const gameImage =
    item?.heroImage || item?.image || item?.icon;

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="loading-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[360px] overflow-hidden rounded-[20px] border border-red-900/40 bg-[#160909] shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
          >
            {/* RED HEADER */}
            <div className="relative flex min-h-[180px] items-center justify-center bg-gradient-to-b from-red-700 via-red-800 to-red-950">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close loading"
                className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
              >
                <X size={18} />
              </button>

              {/* FLOATING PHONE */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 flex h-[140px] w-[110px] flex-col overflow-hidden rounded-[23px] border-[3px] border-red-400/50 bg-[#170808] shadow-xl"
              >
                <div className="flex justify-between bg-black/40 px-2 py-1 text-[7px] text-white/50">
                  <span>11:56</span>
                  <span>WiFi</span>
                </div>

                <div className="grid flex-1 grid-cols-4 content-start gap-[3px] p-[6px]">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square overflow-hidden rounded-[6px] ${
                        i === 0
                          ? "border border-red-400/50 bg-red-600/20"
                          : "bg-red-900/25"
                      }`}
                    >
                      {i === 0 && gameImage && (
                        <img
                          src={gameImage}
                          alt={gameTitle}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <span className="pointer-events-none absolute bottom-3 text-lg font-black tracking-widest text-white/15">
                GAMEDROP
              </span>
            </div>

            {/* PROGRESS */}
            <div className="relative z-10 mx-4 -mt-8 rounded-2xl border border-red-900/40 bg-[#230b0b] p-4 shadow-xl">
              <div className="mb-2 flex items-center justify-center gap-2">
                {isDone && (
                  <CheckCircle2
                    size={19}
                    className="text-red-400"
                  />
                )}

                <h2
                  id="loading-title"
                  className="text-center text-base font-bold text-white"
                >
                  {isDone
                    ? "Setup Complete!"
                    : "Preparing Download..."}
                </h2>
              </div>

              <p className="mb-2 truncate text-center text-xs font-semibold text-red-400">
                {gameTitle}
              </p>

              <p className="mb-4 text-center text-xs text-white/50">
                {phaseLabel}
              </p>

              <div className="h-2.5 overflow-hidden rounded-full bg-red-950">
                <div
                  className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-red-700 to-red-500 transition-[width] duration-75"
                  style={{ width: `${progress}%` }}
                >
                  {!isDone && (
                    <div className="absolute inset-0 w-[60%] animate-[shimmer_1.5s_linear_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  )}
                </div>
              </div>

              <p className="mt-3 text-center text-[11px] font-semibold text-red-300">
                {Math.round(progress)}%
                {isDone ? " — Complete" : " — Please wait"}
              </p>

              {platform && (
                <p className="mt-2 text-center text-[10px] text-white/35">
                  Platform: {platform}
                </p>
              )}
            </div>

            {/* FOOTER */}
            <div className="p-4 pt-5">
              <div className="flex items-center justify-center gap-2 rounded-xl border border-red-800/30 bg-red-900/20 p-3.5 text-xs font-bold uppercase tracking-wider text-red-300">
                {isDone ? (
                  "Opening Verification..."
                ) : (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                    Preparing Data
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
