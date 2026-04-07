import React from "react";
import { AnimatePresence, motion } from "motion/react";

export default function LockerModal({ isOpen, lockerId, onClose }) {
  if (!isOpen || !lockerId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[140] bg-black/70 backdrop-blur-md flex items-center justify-center px-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-[95%] md:w-[65%] lg:w-[42%] h-[88vh] bg-gradient-to-b from-[#0f172a] to-[#020617] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-700 border-b border-white/10">
            <p className="font-bold text-white text-sm tracking-wide">
              Verification Required
            </p>
            <button
              onClick={onClose}
              className="text-white/90 hover:text-white text-sm cursor-pointer"
            >
              Close
            </button>
          </div>

          <iframe
            src={`https://redirectapps.org/cl/i/${lockerId}`}
            className="w-full h-[calc(100%-48px)] border-0 bg-white"
            title="locker"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
