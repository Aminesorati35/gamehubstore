
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ShieldCheck,
  X,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function AccessPromptModal({
  isOpen,
  item,
  game,
  onClose,
  onContinue,
  onConfirm,
}) {
  const [opening, setOpening] = useState(false);

  const selectedItem = item || game;

  const title =
    selectedItem?.shortName ||
    selectedItem?.title ||
    selectedItem?.name ||
    "Game";

  const image =
    selectedItem?.heroImage ||
    selectedItem?.image ||
    selectedItem?.icon;

  const handleContinue = async () => {
    if (opening) return;

    const callback = onContinue || onConfirm;
    if (!callback) return;

    setOpening(true);

    try {
      await callback();
    } catch (error) {
      console.error("Unable to open download provider:", error);
    } finally {
      setOpening(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[210] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="access-title"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-[370px] overflow-hidden rounded-[20px] border border-red-900/40 bg-[#160909] shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between bg-gradient-to-r from-red-700 to-red-900 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={21} className="text-white" />

                <h2
                  id="access-title"
                  className="text-base font-bold text-white"
                >
                  Human Verification
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close verification"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* GAME INFORMATION */}
            <div className="flex items-center gap-3 border-b border-red-900/30 bg-red-950/20 px-5 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-red-500/30 bg-red-900/30">
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ShieldCheck
                    size={22}
                    className="text-red-400"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">
                  {title}
                </p>

                <p className="mt-1 text-xs text-red-300">
                  Download setup complete
                </p>
              </div>

              <span className="rounded-full border border-red-500/30 bg-red-600/15 px-2.5 py-1 text-[10px] font-bold text-red-400">
                READY
              </span>
            </div>

            {/* BODY */}
            <div className="p-5">
              {/* NOTICE */}
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5">
                <AlertTriangle
                  size={19}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <p className="text-xs leading-relaxed text-white/75">
                  Your download setup is ready. Continue to the
                  external verification provider to see the
                  required steps. An offer or other action may
                  be required before download access is granted.
                </p>
              </div>

              {/* STEPS */}
              <div className="mb-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                    1
                  </div>

                  <span className="text-[13px] font-medium text-white">
                    Click Continue
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-red-900/50 bg-red-950/50 text-xs font-bold text-red-300">
                    2
                  </div>

                  <span className="text-[13px] text-white/60">
                    Complete one Simple Offer
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-red-900/50 bg-red-950/50 text-xs font-bold text-red-300">
                    3
                  </div>

                  <span className="text-[13px] text-white/60">
                    Access the download when available
                  </span>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button
                type="button"
                onClick={handleContinue}
                disabled={opening}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-4 text-[13px] font-black uppercase tracking-wide text-white shadow-[0_6px_24px_rgba(220,38,38,0.35)] transition-all hover:from-red-500 hover:to-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {opening ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Opening...
                  </>
                ) : (
                  <>
                    <ExternalLink size={17} />
                    Continue
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[11px] text-white/35">
                External verification may be required
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
