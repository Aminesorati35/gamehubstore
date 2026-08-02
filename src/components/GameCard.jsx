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
    "w-full font-semibold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm border backdrop-blur-md active:scale-[0.98]";

const claimClasses =
  "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 border-yellow-300/30 shadow-[0_8px_10px_rgba(245,158,11,0.4)] text-black";

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent"></div>

        
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
       

        {isRewards ? (
           <a
    href="https://gamedrop.store/cl/i/d2od5o"
    className={`${baseClasses} ${claimClasses}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
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