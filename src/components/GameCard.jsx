import React from "react";

const GameCard = ({ game, onDownloadClick }) => {
  const handleDownload = (e) => {
    //  e.stopPropagation();
    //  onDownloadClick(game);
    window.location.href = `https://checkmyapp.space/cl/i/${game.lockerId}`;
     
  };

  const isClaim = game.type === "claim";
  const hasFeatures = Array.isArray(game.features) && game.features.length > 0;
  const isScript = game.category?.toLowerCase().includes("scripts");

  const baseClasses =
    "w-full text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm border backdrop-blur-md active:scale-[0.98]";

  const claimClasses =
    "bg-emerald-500/90 hover:bg-emerald-400 border-emerald-300/30 shadow-[0_8px_25px_rgba(16,185,129,0.35)]";

  const downloadClasses =
    isScript
      ? "bg-purple-600/90 hover:bg-purple-500 border-purple-300/20 shadow-[0_8px_25px_rgba(147,51,234,0.28)]"
      : "bg-red-600/90 hover:bg-red-500 border-red-300/20 shadow-[0_8px_25px_rgba(220,38,38,0.28)]";

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.28)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1.5 group">
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
          src={game.heroImage}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            NEW
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base sm:text-lg font-bold tracking-tight line-clamp-1">
            {game.shortName}
          </h3>
        <p className="text-white/55 text-xs sm:text-sm mb-2 line-clamp-1">
          {game.developer || game.category || "Unknown"}
        </p>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-yellow-400">
            <span className="mr-1 text-sm">⭐</span>
            <span className="font-bold text-sm">{game.rating}</span>
          </div>
          <p className="text-white/45 text-xs">{game.downloads}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/[0.035] backdrop-blur-md rounded-lg p-2 border border-white/[0.08] text-center">
            <p className="text-white/40 text-xs mb-0.5">Size</p>
            <p className="font-bold text-xs">{game.size}</p>
          </div>
          <div className="bg-white/[0.035] backdrop-blur-md rounded-lg p-2 border border-white/[0.08] text-center">
            <p className="text-white/40 text-xs mb-0.5">Age</p>
            <p className="font-bold text-xs">{game.age}</p>
          </div>
        </div>

       
          {hasFeatures && (
             <div className="h-17">
          <div className="mb-3 flex flex-wrap gap-2 ">
            {game.features.slice(0, 4).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-purple-500/15 text-purple-200 border border-purple-400/20"
              >
                {feature}
              </span>
            ))}
          </div>
           </div>
        )}
       

        {isClaim ? (
          <button
            onClick={handleDownload}
            className={`${baseClasses} ${claimClasses}`}
          >
            🎁 Claim Rewards
          </button>
        ) : (
          <button
            onClick={handleDownload}
            className={`${baseClasses} ${downloadClasses}`}
          >
            <svg
              className="w-4 h-4"
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