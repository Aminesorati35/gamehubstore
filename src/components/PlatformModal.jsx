import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Apple, Monitor, X } from "lucide-react";

const PlatformModal = ({
  isOpen,
  onClose,
  onSelect,
  gameTitle,
  showPcOption = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div>
                <h2 className="text-white text-xl font-bold">Select Your Device</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Choose your platform for {gameTitle || "this game"}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <button
                onClick={() => onSelect("Android")}
                className="w-full group rounded-2xl border border-green-400/20 bg-gradient-to-r from-green-500/15 to-emerald-500/10 hover:from-green-500/25 hover:to-emerald-500/20 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-green-500/20 border border-green-400/20 flex items-center justify-center">
                    <Smartphone className="text-green-400" size={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Android</h3>
                    <p className="text-gray-400 text-sm">
                      Continue with Android version
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => onSelect("iOS")}
                className="w-full group rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 hover:from-blue-500/25 hover:to-cyan-500/20 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/20 flex items-center justify-center">
                    <Apple className="text-blue-300" size={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">iPhone / iPad</h3>
                    <p className="text-gray-400 text-sm">
                      Continue with iOS version
                    </p>
                  </div>
                </div>
              </button>

              {showPcOption && (
                <button
                  onClick={() => onSelect("PC")}
                  className="w-full group rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-500/15 to-pink-500/10 hover:from-purple-500/25 hover:to-pink-500/20 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-400/20 flex items-center justify-center">
                      <Monitor className="text-purple-300" size={28} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">PC / Windows</h3>
                      <p className="text-gray-400 text-sm">
                        Continue with PC version
                      </p>
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div className="px-5 pb-5">
              <p className="text-center text-xs text-gray-500">
                Make sure you select the correct device before continuing
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlatformModal;