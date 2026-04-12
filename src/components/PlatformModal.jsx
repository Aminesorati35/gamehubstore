import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Apple, Monitor, X, ChevronRight } from "lucide-react";

const rows = [
  { id: "Android", label: "Android", Icon: Smartphone, scriptOnly: false },
  { id: "iOS", label: "iOS (iPhone / iPad)", Icon: Apple, scriptOnly: false },
  { id: "PC", label: "PC (Windows)", Icon: Monitor, scriptOnly: true },
];

const PlatformModal = ({
  isOpen,
  onClose,
  onSelect,
  gameTitle,
  showPcOption = false,
  flowType = "game",
}) => {
  const visible = rows.filter((r) => !r.scriptOnly || showPcOption);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[105] flex items-center justify-center p-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          onClick={onClose}
        >
          {/* Full blur immediately on open — avoid fading the whole overlay (blur looked “slow”) */}
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-2xl backdrop-saturate-150 [transform:translateZ(0)]"
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="platform-modal-title"
            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/[0.12] bg-[#12151f]/80 shadow-[0_24px_64px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] px-5 pt-5 pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/35">
                  Download
                </p>
                <h2
                  id="platform-modal-title"
                  className="mt-1 text-lg font-semibold tracking-tight text-white"
                >
                  Select platform
                </h2>
                <p className="mt-1 text-sm text-white/45 leading-snug">
                  {gameTitle || (flowType === "script" ? "Script" : "Game")}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/45 transition-all hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-3 pb-2 pt-3">
              <ul className="divide-y divide-white/[0.05] overflow-hidden rounded-xl border border-white/[0.08] bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                {visible.map(({ id, label, Icon }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => onSelect(id)}
                      className="group flex w-full items-center gap-3 px-4 py-3.5 text-left text-white transition-all hover:bg-white/[0.07] active:bg-white/[0.09]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/65 transition-colors group-hover:border-white/[0.12] group-hover:bg-white/[0.07] group-hover:text-white/90">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <span className="flex-1 text-[15px] font-medium text-white/90 group-hover:text-white">
                        {label}
                      </span>
                      <ChevronRight
                        size={18}
                        className="shrink-0 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-white/40"
                        aria-hidden
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <p className="px-5 pb-5 pt-1 text-xs leading-relaxed text-white/38 text-center">
              {showPcOption
                ? "Choose the device you use for this script."
                : "Choose the device you use for this game."}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlatformModal;
