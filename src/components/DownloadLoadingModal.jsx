
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Download, CheckCircle2 } from "lucide-react";

export default function DownloadLoadingModal({
  isOpen,
  item,
  platform,
  onComplete,
  onClose,
}) {
  const [progress, setProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const openingRef = useRef(false);

  useEffect(() => {
    if (!isOpen || !item) return;

    setProgress(0);
    setIsOpening(false);
    openingRef.current = false;

    let value = 0;

    const interval = setInterval(() => {
      value = Math.min(value + 0.6, 100);
      setProgress(value);

      if (value >= 100) clearInterval(interval);
    }, 45);

    return () => clearInterval(interval);
  }, [isOpen, item]);

  const isDone = progress >= 100;

  const phaseLabel =
    progress < 15
      ? "Connecting to download mirror..."
      : progress < 45
      ? `Preparing ${item?.shortName || item?.title || "game"} data...`
      : progress < 75
      ? `Preparing package (${item?.size || "game files"})...`
      : progress < 90
      ? "Checking package information..."
      : progress < 100
      ? "Finalizing download setup..."
      : "Your download is ready!";

  const handleDownload = () => {
    if (!isDone || openingRef.current) return;

    openingRef.current = true;
    setIsOpening(true);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-[360px] overflow-hidden rounded-[20px] border border-red-900/50 bg-[#160707] shadow-[0_25px_80px_rgba(0,0,0,0.7)]"
          >
            {/* RED HEADER */}
            <div className="relative flex min-h-[180px] items-center justify-center bg-gradient-to-b from-[#dc2626] via-[#991b1b] to-[#450a0a]">
              <button
                type="button"
                onClick={onClose}
                disabled={isOpening}
                aria-label="Close loading"
                className="absolute left-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-red-300/20 bg-black/35 text-white transition hover:bg-black/60 disabled:opacity-50"
              >
                <X size={18} />
              </button>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-400/15 via-transparent to-red-950/30" />

              {/* FLOATING PHONE */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, -4, 0] }}
                transition={{
                  opacity: { duration: 0.4 },
                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative z-10 flex h-[140px] w-[110px] flex-col overflow-hidden rounded-[24px] border-[3px] border-red-500/70 bg-[#170808] shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
              >
                <div className="flex justify-between bg-[#100404] px-2 py-1 text-[7px] text-white/60">
                  <span>11:56</span>
                  <span>●●● WiFi</span>
                </div>

                <div className="grid flex-1 grid-cols-4 content-start gap-[3px] p-[6px]">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square overflow-hidden rounded-[6px] ${
                        i === 0
                          ? "border border-red-400/60 bg-red-600/20"
                          : "bg-red-900/20"
                      }`}
                    >
                      {i === 0 && item.heroImage && (
                        <img
                          src={item.heroImage}
                          alt={item.title || "Game"}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="pointer-events-none absolute bottom-4 text-lg font-black tracking-wider text-white/20 blur-[3px]">
                GAMEDROP
              </div>
            </div>

            {/* PROGRESS CARD */}
            <div className="relative z-10 mx-4 -mt-10 rounded-[20px] border border-red-900/40 bg-[#230b0b] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="mb-2 flex items-center justify-center gap-2">
                {isDone && (
                  <CheckCircle2 size={19} className="text-red-400" />
                )}

                <h3 className="text-center text-base font-black text-white">
                  {isDone ? "Package Ready!" : "Preparing Package..."}
                </h3>
              </div>

              <p className="mb-2 truncate text-center text-xs font-semibold text-red-400">
                {item.shortName || item.title}
              </p>

              <p className="mb-4 min-h-[18px] text-center text-xs font-medium text-red-200/60">
                {phaseLabel}
              </p>

              {/* RED PROGRESS BAR */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-red-950">
                <div
                  className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#ef4444] shadow-[0_0_12px_rgba(220,38,38,0.5)] transition-[width] duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                >
                  {!isDone && (
                    <div className="absolute inset-0 w-[60%] animate-[shimmer_1.5s_linear_infinite] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  )}
                </div>
              </div>

              <p className="mt-3 text-center text-[11px] font-semibold text-red-300">
                {isDone
                  ? "100% — Ready to download!"
                  : `${Math.round(progress)}% — Please wait...`}
              </p>

              {platform && (
                <p className="mt-2 text-center text-[10px] text-red-200/40">
                  Platform: {platform}
                </p>
              )}
            </div>

            {/* FOOTER */}
            <div className="p-4 pt-5">
              {isDone ? (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  onClick={handleDownload}
                  disabled={isOpening}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#dc2626] to-[#991b1b] p-3.5 text-sm font-black uppercase tracking-widest text-white shadow-[0_6px_25px_rgba(220,38,38,0.45)] transition-all hover:scale-[1.02] hover:from-[#ef4444] hover:to-[#dc2626] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isOpening ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                      Opening...
                    </>
                  ) : (
                    <>
                      <Download size={18} strokeWidth={2.5} />
                      DOWNLOAD NOW
                    </>
                  )}
                </motion.button>
              ) : (
                <div className="flex w-full items-center justify-center gap-2 rounded-[14px] border border-red-700/30 bg-red-900/20 p-3.5 text-center text-xs font-black uppercase tracking-widest text-red-300/70">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400/60 border-t-transparent" />
                  Preparing Data
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
