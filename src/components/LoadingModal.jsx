import React, { useState, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

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
  stepDelayMs = 3000,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

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
    if (isOpen) {
      setCurrentStep(0);
      setProgress(0);

      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          setProgress((next / steps.length) * 100);

          if (next >= steps.length) {
            clearInterval(interval);
            setTimeout(() => {
              onComplete();
            }, 700);
            return prev;
          }

          return next;
        });
      }, stepDelayMs);

      return () => clearInterval(interval);
    }
  }, [isOpen, onComplete, stepDelayMs, steps.length]);

  if (!isOpen) return null;

  const embedUrl = normalizeGameplayEmbedUrl(gameplayUrl);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex justify-center items-center p-4">
      <div className="relative max-w-lg w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>

        <div className="relative bg-gradient-to-br from-[#0f3460]/95 to-[#1a1a2e]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
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

            <div className="space-y-4 mb-6">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isPending = index > currentStep;

                return (
                  <div
                    key={index}
                    className={`flex items-start transition-all duration-300 ${
                      isPending ? "opacity-40" : "opacity-100"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {isCompleted ? (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/40">
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-white/20 bg-white/5" />
                      )}
                    </div>

                    <div className="ml-4 flex-1">
                      <h3
                        className={`font-semibold text-sm ${
                          isCurrent ? "text-cyan-300" : "text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {step.desc}
                      </p>
                    </div>

                    {isCurrent && (
                      <span className="ml-2 px-2.5 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 text-xs font-medium rounded-full">
                        In Progress
                      </span>
                    )}
                    {isCompleted && (
                      <span className="ml-2 px-2.5 py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-300 text-xs font-medium rounded-full">
                        Complete
                      </span>
                    )}
                  </div>
                );
              })}
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
            <p className="text-xs text-gray-400 text-center">
              This process typically takes a few seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
