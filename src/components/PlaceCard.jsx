// PlaceCard.jsx — Tailwind CSS versiyonu
import { useState } from "react";

//her bir yerin kartı
function PlaceCard({ place, isSelected, darkMode, onSelect, onToggleStatus, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isWish      = place.status === "wish";
  const lastComment = place.comments[place.comments.length - 1];

  return (
    <div className="relative mb-2">

      {/* KART */}
      <div
        onClick={() => { if (!showConfirm) onSelect(place); }}
        className={`
          p-3 rounded-xl cursor-pointer
          transition-all duration-200
          border border-l-[3px]
          ${isWish ? "border-l-[#e8774a]" : "border-l-[#4caf84]"}
          ${isSelected
            ? darkMode
              ? "bg-[#1a2235] border-[#c9a84c]"
              : "bg-[#fff8e8] border-[#c9a84c]"
            : darkMode
              ? "bg-[#161d2e] border-white/10"
              : "bg-white border-black/10 shadow-sm"
          }
          ${showConfirm ? "opacity-50 blur-[1px]" : "opacity-100"}
        `}
      >
        {/* Ust satir: sehir + rozet */}
        <div className="flex justify-between items-start mb-1">
          <span className={`font-serif text-base font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {place.city}
          </span>
          <span className={`
            inline-flex items-center px-2 py-0.5 rounded-full
            text-[0.65rem] font-medium
            ${isWish
              ? "bg-[#e8774a]/20 text-[#e8774a]"
              : "bg-[#4caf84]/20 text-[#4caf84]"
            }
          `}>
            {isWish ? "Hayalim" : "Gittim"}
          </span>
        </div>

        {/* Ulke + yorum sayisi */}
        <div className={`text-[0.72rem] mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          📍 {place.country} · {place.comments.length} yorum
        </div>

        {/* Son yorum */}
        {lastComment && (
          <div className={`
            text-[0.75rem] italic overflow-hidden text-ellipsis whitespace-nowrap
            ${darkMode ? "text-gray-500" : "text-gray-400"}
          `}>
            "{lastComment.text}"
          </div>
        )}

        {/* Butonlar */}
        <div className="flex gap-1 mt-2">
          <button
            onClick={e => { e.stopPropagation(); onToggleStatus(place.id); }}
            className={`
              flex-1 py-1 px-2 rounded-md text-[0.72rem] cursor-pointer
              border transition-all duration-200
              hover:opacity-80
              ${darkMode
                ? "border-white/10 text-gray-400 bg-transparent"
                : "border-black/10 text-gray-500 bg-transparent"
              }
            `}
          >
            {isWish ? "✓ Gittim" : "↩ Geri Al"}
          </button>

          <button
            onClick={e => { e.stopPropagation(); onSelect(place); }}
            className={`
              flex-1 py-1 px-2 rounded-md text-[0.72rem] cursor-pointer
              border transition-all duration-200
              hover:opacity-80
              ${darkMode
                ? "border-white/10 text-gray-400 bg-transparent"
                : "border-black/10 text-gray-500 bg-transparent"
              }
            `}
          >
            💬
          </button>

          <button
            onClick={e => { e.stopPropagation(); setShowConfirm(true); }}
            className={`
              py-1 px-2 rounded-md text-[0.72rem] cursor-pointer
              border transition-all duration-200
              text-red-500 hover:bg-red-500/10
              ${darkMode ? "border-white/10 bg-transparent" : "border-black/10 bg-transparent"}
            `}
          >
            🗑
          </button>
        </div>
      </div>

      {/* SILME ONAY POPUP'I */}
      {showConfirm && (
        <div
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[calc(100%-8px)] z-50
            rounded-xl p-4
            border shadow-xl
            ${darkMode
              ? "bg-[#1f2d42] border-red-500/40"
              : "bg-red-50 border-red-400/30"
            }
          `}
          style={{ animation: "popIn 0.18s cubic-bezier(.34,1.56,.64,1)" }}
        >
          <style>{`
            @keyframes popIn {
              from { opacity:0; transform:translate(-50%,-50%) scale(0.88); }
              to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
            }
          `}</style>

          {/* Ikon + baslik */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🗑️</span>
            <span className={`font-serif text-base font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
              Emin misiniz?
            </span>
          </div>

          {/* Aciklama */}
          <div className={`text-[0.78rem] mb-3 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <strong className="text-[#e8774a]">{place.city}</strong> haritanizdan kalici olarak silinecek. Bu islem geri alinamaz.
          </div>

          {/* Butonlar */}
          <div className="flex gap-2">
            <button
              onClick={e => { e.stopPropagation(); setShowConfirm(false); }}
              className={`
                flex-1 py-1.5 rounded-lg text-[0.78rem] cursor-pointer
                border transition-all duration-200 hover:opacity-80
                bg-transparent
                ${darkMode ? "border-white/10 text-gray-400" : "border-black/10 text-gray-500"}
              `}
            >
              Iptal
            </button>
            <button
              onClick={e => { e.stopPropagation(); onDelete(place.id); setShowConfirm(false); }}
              className="flex-1 py-1.5 rounded-lg text-[0.78rem] font-semibold cursor-pointer border-none bg-red-500 text-white transition-all duration-200 hover:bg-red-600"
            >
              Evet, Sil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaceCard;
