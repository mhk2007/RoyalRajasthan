import React from "react";

function TableSelection({ setTableType }) {
  return (
    <div className="flex flex-col gap-6">

      {/* SIMPLE */}
      <div className="bg-white/10 p-4 rounded-xl border border-white/20 hover:scale-105 transition">
        <button
          onClick={() => setTableType("simple")}
          className="w-full bg-white/20 text-white py-3 rounded border border-white/30 mb-3"
        >
          🪑 Simple Table
        </button>

        <ul className="text-white text-sm space-y-1">
          <li>✔️ Normal seating</li>
          <li>✔️ Fan / basic cooling</li>
          <li>✔️ Standard service</li>
          <li>✔️ Budget friendly</li>
        </ul>
      </div>

      {/* ROYAL */}
      <div className="relative bg-yellow-500/10 p-4 rounded-xl border border-yellow-400/40 hover:scale-105 transition shadow-lg shadow-yellow-500/30">
        
        <span className="absolute -top-3 right-3 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
          MOST POPULAR
        </span>

        <button
          onClick={() => setTableType("royal")}
          className="w-full bg-yellow-500 text-white py-3 rounded mb-3"
        >
          👑 Royal Table
        </button>

        <ul className="text-white text-sm space-y-1">
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