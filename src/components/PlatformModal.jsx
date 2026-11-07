
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Smartphone,
  Apple,
  Monitor,
  X,
  ChevronRight,
} from "lucide-react";

const platforms = [
  {
    id: "Android",
    label: "Android",
    Icon: Smartphone,
    scriptOnly: false,
  },
  {
    id: "iOS",
    label: "iOS (iPhone / iPad)",
    Icon: Apple,
    scriptOnly: false,
  },
  {
    id: "PC",
    label: "PC (Windows)",
    Icon: Monitor,
    scriptOnly: true,
  },
];

export default function PlatformModal({
  isOpen,
  onClose,
  onSelect,
  gameTitle,
  showPcOption = false,
  flowType = "game",
}) {
  const visible = platforms.filter(
    (platform) => !platform.scriptOnly || showPcOption
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[105] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="platform-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-red-900/40 bg-[#160909] shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex items-start justify-between border-b border-red-900/30 px-5 py-5">
              <div>
                <h2
                  id="platform-title"
                  className="text-xl font-bold text-white"
                >
                  Select Platform
                </h2>

                <p className="mt-1 text-sm text-white/50">
                  {gameTitle ||
                    (flowType === "script" ? "Script" : "Game")}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-2 text-white/50 transition hover:bg-red-900/30 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* OPTIONS */}
            <div className="space-y-2 p-4">
              {visible.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelect(id)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-red-900/30 bg-[#220d0d] px-4 py-3.5 text-left transition-all hover:border-red-500/50 hover:bg-red-900/20 active:scale-[0.98]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/15 text-red-500">
                    <Icon size={22} />
                  </div>

                  <span className="flex-1 text-[15px] font-semibold text-white">
                    {label}
                  </span>

                  <ChevronRight
                    size={19}
                    className="text-white/30 transition group-hover:translate-x-1 group-hover:text-red-400"
                  />
                </button>
              ))}
            </div>

            <p className="px-5 pb-5 text-center text-xs text-white/40">
              Choose your device to continue
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
