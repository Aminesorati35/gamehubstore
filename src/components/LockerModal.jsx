import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function LockerModal({
  phase = "closed", // "closed" | "prefetch" | "visible"
  lockerId,
  lockerBaseUrl = "https://redirectapps.org/cl/i/",
  platform,
  onClose,
}) {
  const lockerUrl = useMemo(() => {
    if (!lockerId) return "";
    return `${lockerBaseUrl}${lockerId}`;
  }, [lockerBaseUrl, lockerId]);

  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (phase === "closed") {
      setIframeLoaded(false);
    }
  }, [phase, lockerUrl]);

  if (phase === "closed" || !lockerId || !lockerUrl) return null;

  const isPrefetch = phase === "prefetch";
  const isVisible = phase === "visible";

  return (
    <AnimatePresence>
      <motion.div
        key="locker-root"
        className={`fixed inset-0 flex items-center justify-center px-0 ${
          // Keep prefetch underneath LoadingModal (z-[200])
          isPrefetch ? "z-[125]" : "z-[210]"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP (only when actually showing the locker UI) */}
        {isVisible ? (
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        ) : null}

        {/* SHELL */}
        <motion.div
          className={`relative w-full h-[100dvh] overflow-hidden ${
            isPrefetch ? "pointer-events-none opacity-0" : ""
          }`}
          initial={{ opacity: 0, y: isPrefetch ? 0 : 18, scale: isPrefetch ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent blur-2xl opacity-60" />

          {/* CARD */}
          <div className="relative h-full bg-[#020617]/95 border border-white/10 rounded-none shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col">
            {/* HEADER (only when visible) */}
            

            <div className="relative flex-1 min-h-0">
              <motion.div
                key="locker-iframe"
                className="absolute inset-0 z-10"
                initial={false}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, y: 14, scale: 0.985, filter: "blur(6px)" }
                }
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* IFRAME (kept mounted between prefetch -> visible for fast reveal) */}
                <iframe
                  src={lockerUrl}
                  className={`absolute inset-0 w-full h-full border-0 bg-white ${
                    isPrefetch ? "pointer-events-none" : "pointer-events-auto"
                  }`}
                  title="locker"
                  onLoad={() => setIframeLoaded(true)}
                />
              </motion.div>

              {/* LOADER while iframe is still loading */}
              {!iframeLoaded ? (
                <div className="absolute inset-0 z-[12] flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin opacity-60" />
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
