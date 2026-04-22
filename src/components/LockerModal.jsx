import React from "react";
import { AnimatePresence, motion } from "motion/react";

export default function LockerModal({ isOpen, lockerId, platform, onClose }) {
  if (!isOpen || !lockerId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[210] flex items-center justify-center px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-lg"
          onClick={onClose}
        />

        {/* MODAL */}
        <motion.div
          className="relative w-full h-[100vh] rounded-none overflow-hidden"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent blur-2xl opacity-60" />

          {/* CARD */}
          <div className="relative h-full bg-[#020617]/95 border border-white/10 rounded-none shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col">
            
            {/* HEADER */}
            

            {/* LOADER (optional while iframe loads) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin opacity-40" />
            </div>

            {/* IFRAME */}
            <iframe
              src={`https://redirectapps.org/cl/i/${lockerId}`}
              className="w-full flex-1 border-0 bg-white z-10"
              title="locker"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}