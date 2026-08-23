import React from "react";

const GameCard = ({ game, onDownloadClick }) => {
  const handleDownload = (e) => {
    e.stopPropagation();
    onDownloadClick(game);
  };

  const isRewards = game.type === "rewards";
  const hasFeatures = Array.isArray(game.features) && game.features.length > 0;
  const isScript = game.category?.toLowerCase().includes("scripts");

  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer border backdrop-blur-md active:scale-[0.98] " +
    "w-full py-2 px-3 text-xs " + // mobile: compact button inside row
    "sm:py-3 sm:px-4 sm:text-sm sm:rounded-2xl";

  const claimClasses =
    "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 border-yellow-300/30 shadow-[0_8px_10px_rgba(245,158,11,0.4)] text-black";

  const downloadClasses = isScript
    ? "bg-purple-600/90 hover:bg-purple-500 border-purple-300/20 shadow-[0_8px_25px_rgba(147,51,234,0.28)]"
    : "bg-red-600/90 hover:bg-red-500 border-red-300/20 shadow-[0_8px_25px_rgba(220,38,38,0.28)]";

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.28)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 cursor-pointer group flex flex-row items-center sm:flex-col sm:items-stretch sm:hover:-translate-y-1.5">
  {/* Image: centered on mobile, top on sm+ */}
  <div className="relative w-40 h-25 self-center flex-shrink-0 sm:w-full sm:h-44 md:h-52 sm:self-auto overflow-hidden">
    <img
      src={game.heroImage}
      alt={game.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 sm:from-black/20 via-transparent sm:via-black/10 to-transparent"></div>
  </div>

      {/* Info: right column on mobile, below image on sm+ */}
      <div className="flex-1 min-w-0 p-3 sm:p-4 flex flex-col justify-center sm:justify-start">
        <h3 className="text-sm sm:text-base md:text-lg font-bold tracking-tight line-clamp-1">
          {game.shortName}
        </h3>
        <p className="text-white/55 text-[11px] sm:text-xs md:text-sm mb-1.5 sm:mb-2 line-clamp-1">
          {game.developer || game.category || "Unknown"}
        </p>

        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <div className="flex items-center text-yellow-400">
            <span className="mr-1 text-xs sm:text-sm">⭐</span>
            <span className="font-bold text-xs sm:text-sm">{game.rating}</span>
          </div>
          <p className="text-white/45 text-[10px] sm:text-xs">{game.downloads}</p>
        </div>

        {hasFeatures && (
          <div className="mb-2 sm:mb-3 hidden sm:flex flex-wrap gap-2 sm:h-17">
            {game.features.slice(0, 4).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-purple-500/15 text-purple-200 border border-purple-400/20"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {isRewards ? (
          <a href={game.downloadUrl} className={`${baseClasses} ${claimClasses}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8" />
              <path d="M7.5 8A2.5 2.5 0 1 1 10 5.5V8" />
              <path d="M16.5 8A2.5 2.5 0 1 0 14 5.5V8" />
            </svg>
            Claim Rewards
          </a>
        ) : (
          <button onClick={handleDownload} className={`${baseClasses} ${downloadClasses}`}>
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {isScript ? "Download Script" : "Download"}
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCard;