import React from "react";

function TableSelection({ setTableType }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6">

      {/* SIMPLE */}
      <div className="rounded-xl border border-white/20 bg-white/10 p-3 transition sm:p-4 sm:hover:scale-105">
        <button
          onClick={() => setTableType("simple")}
          className="mb-2 w-full rounded border border-white/30 bg-white/20 py-2.5 text-sm text-white sm:mb-3 sm:py-3 sm:text-base"
        >
          🪑 Simple Table
        </button>

        <ul className="space-y-1 text-xs text-white sm:text-sm">
          <li>✔️ Normal seating</li>
          <li>✔️ Fan / basic cooling</li>
          <li>✔️ Standard service</li>
          <li>✔️ Budget friendly</li>
        </ul>
      </div>

      {/* ROYAL */}
      <div className="relative rounded-xl border border-yellow-400/40 bg-yellow-500/10 p-3 shadow-lg shadow-yellow-500/30 transition sm:p-4 sm:hover:scale-105">
        
        <span className="absolute -top-3 right-3 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
          MOST POPULAR
        </span>

        <button
          onClick={() => setTableType("royal")}
          className="mb-2 w-full rounded bg-yellow-500 py-2.5 text-sm text-white sm:mb-3 sm:py-3 sm:text-base"
        >
          👑 Royal Table
        </button>

        <ul className="space-y-1 text-xs text-white sm:text-sm">
          <li>✨ Premium decoration</li>
          <li>❄️ AC seating</li>
          <li>🕯️ Candle light setup</li>
          <li>🍽️ Priority service</li>
          <li>📸 Photo-friendly ambiance</li>
        </ul>
      </div>

    </div>
  );
}

export default TableSelection;
