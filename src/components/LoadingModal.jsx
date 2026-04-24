import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const normalizeGameplayEmbedUrl = (url) => {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (!trimmed) return "";

  // If user provides streamable "page" URL, convert to embed (/e/)
  // Examples:
  // - https://streamable.com/c3bxub
  // - https://streamable.com/e/c3bxub?
  try {
    const u = new URL(trimmed);
    if (u.hostname.includes("streamable.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      const id = parts[0] === "e" ? parts[1] : parts[0];
      if (id) {
        return `https://streamable.com/e/${id}?autoplay=1&muted=1`;
      }
    }
  } catch {
    // fall through
  }

  return trimmed;
};

const LoadingModal = ({
  isOpen,
  onComplete,
  platform,
  type,
  gameplayUrl,
  stepDelayMs = 1000,
  compact = false,
  requireAcknowledge = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("running"); // "running" | "done"
  const finishTimeoutRef = useRef(null);

  const isScript = type === "scripts";

  const steps = isScript
    ? [
        {
          title: "Detecting Environment",
          desc: `Checking ${platform || "PC"} compatibility`,
        },
        {
          title: "Connecting to Executor",
          desc: "Establishing secure injection channel",
        },
        {
          title: "Loading Script",
          desc: "Preparing script functions and modules",
        },
        {
          title: "Injecting Script",
          desc: "Executing script into Roblox session",
        },
      ]
    : [
        {
          title: "Verifying Device",
          desc: `Checking ${platform || "mobile"} compatibility`,
        },
        {
          title: "Connecting to Server",
          desc: "Establishing secure connection",
        },
        {
          title: "Preparing Files",
          desc: `Setting up ${platform || "mobile"} game data`,
        },
        {
          title: "Initializing Download",
          desc: `Starting ${platform || "mobile"} process`,
        },
      ];

  useEffect(() => {
    if (!isOpen) return;

    setCurrentStep(0);
    setProgress(0);
    setPhase("running");

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        setProgress((next / steps.length) * 100);

        if (next >= steps.length) {
          clearInterval(interval);
          setProgress(100);

          if (requireAcknowledge) {
            setPhase("done");
            return prev;
          }

          finishTimeoutRef.current = setTimeout(() => {
            onComplete();
          }, 700);
          return prev;
        }

        return next;
      });
    }, stepDelayMs);

    return () => {
      clearInterval(interval);
      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
        finishTimeoutRef.current = null;
      }
    };
  }, [isOpen, onComplete, requireAcknowledge, stepDelayMs, steps.length]);

  if (!isOpen) return null;

  const embedUrl = normalizeGameplayEmbedUrl(gameplayUrl);
  const isDone = phase === "done";
  const activeStepIndex = Math.min(currentStep, Math.max(steps.length - 1, 0));
  const activeStep = steps[activeStepIndex];

  return (
    <div
      className={`fixed inset-0 z-[200] flex justify-center ${
        compact ? "items-start sm:items-center" : "items-center"
      } ${compact ? "bg-black/55 backdrop-blur-sm p-4 sm:p-8" : "bg-black/70 backdrop-blur-md p-4"}`}
    >
      <div
        className={`relative w-full ${
          compact ? "max-w-md scale-[0.96] sm:scale-[0.98]" : "max-w-lg"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>

        <div
          className={`relative bg-gradient-to-br from-[#0f3460]/95 to-[#1a1a2e]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col ${
            compact ? "" : "max-h-[min(720px,86vh)]"
          }`}
        >
          <div className="relative px-6 py-5 border-b border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
            <h2 className="relative text-xl font-semibold text-white">
              Preparing Your Download
            </h2>
            <p className="relative text-blue-200/80 text-sm mt-1">
              {isScript
                ? `Initializing script for ${platform || "PC"}`
                : platform
                  ? `${platform} selected successfully`
                  : "Please wait while we set everything up"}
            </p>
          </div>

          <div className="px-6 py-6">
            {embedUrl ? (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-white">
                    Gameplay preview
                  </p>
                  <span className="text-[11px] text-white/50">
                    Loading while you watch
                  </span>
                </div>
                <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black aspect-video">
                  <iframe
                    title="Gameplay preview"
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null}

            <div className="">
              <div className="flex items-center justify-between mb-3 ">
                <p className="text-xs text-white/60">
                  Step {Math.min(currentStep + 1, steps.length)} of {steps.length}
                </p>
                <p className="text-xs text-white/45">
                  {isDone ? "All steps complete" : "Working…"}
                </p>
              </div>

              <div className="relative min-h-[92px] ">
                <AnimatePresence mode="wait" initial={false}>
                  {!isDone ? (
                    <motion.div
                      key={activeStepIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        </div>
                      </div>

                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-sm text-cyan-300">
                          {activeStep?.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                          {activeStep?.desc}
                        </p>
                      </div>

                      <span className="ml-2 px-2.5 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 text-xs font-medium rounded-full self-start">
                        In Progress
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="all-done"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold text-sm text-white">
                          Setup complete
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                          Everything is ready. Continue to open verification.
                        </p>
                      </div>

                      <span className="ml-2 px-2.5 py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 text-xs font-medium rounded-full self-start">
                        Complete
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-300">
                  Overall Progress
                </span>
                <span className="text-sm font-semibold text-white">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="w-full h-2.5 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 ease-out shadow-lg shadow-blue-500/50"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm px-6 py-3 border-t border-white/10">
            {isDone ? (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-gray-300">
                  Ready when you are — tap continue to open verification.
                </p>
                <button
                  type="button"
                  onClick={onComplete}
                  className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-4 py-2.5 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition"
                >
                  Continue
                </button>
              </div>
            ) : (
              <p className="text-xs text-gray-400 text-center">
                This process typically takes a few seconds
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
