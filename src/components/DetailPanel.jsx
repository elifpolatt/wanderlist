import { useState } from "react";

//harita üstü yorum paneli
function DetailPanel({ place, darkMode, onClose, onAddComment, onDeleteComment }) {
  const [commentText, setCommentText] = useState("");

  const handleAdd = () => {
    if (!commentText.trim()) return;
    onAddComment(place.id, commentText);
    setCommentText("");
  };

  return (
    // PANEL KAPSAYICI
    <div className={`
      absolute bottom-4 left-1/2 -translate-x-1/2
      w-[min(430px,88%)] z-30
      rounded-2xl p-5 border
      transition-all duration-300
      ${darkMode
        ? "bg-[#111827] border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        : "bg-white border-black/10 shadow-[0_8px_40px_rgba(0,0,0,0.15)]"
      }
    `}>

      {/* Kapat butonu */}
      <button
        onClick={onClose}
        className={`
          absolute top-2.5 right-2.5 w-6 h-6 rounded-full
          flex items-center justify-center text-xs cursor-pointer
          border transition-all duration-200 hover:opacity-80
          ${darkMode
            ? "bg-[#1a2235] border-white/10 text-gray-400"
            : "bg-gray-100 border-black/10 text-gray-500"
          }
        `}
      >
        ✕
      </button>

      {/* Ust kisim: sehir + rozet */}
      <div className="flex items-start gap-2 mb-3">
        <div className="flex-1">
          <div className={`font-serif text-xl font-bold leading-tight ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
            {place.city}
          </div>
          <div className={`text-[0.75rem] mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            📍 {place.country} · {place.lat.toFixed(2)}, {place.lng.toFixed(2)}
          </div>
        </div>
        <span className={`
          inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-medium
          ${place.status === "wish"
            ? "bg-[#e8774a]/20 text-[#e8774a]"
            : "bg-[#4caf84]/20 text-[#4caf84]"
          }
        `}>
          {place.status === "wish" ? "🧡 Hayalim" : "✅ Gittim"}
        </span>
      </div>

      {/* Yorumlar listesi */}
      <div className="max-h-[120px] overflow-y-auto flex flex-col gap-1.5 mb-3">
        {place.comments.length === 0
          ? (
            <div className={`text-[0.78rem] italic text-center py-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Henuz yorum yok... ✍️
            </div>
          )
          : place.comments.map(c => (
            <div
              key={c.id}
              className={`
                relative rounded-lg px-3 py-2 text-[0.82rem] leading-relaxed
                border
                ${darkMode
                  ? "bg-[#1a2235] border-white/10 text-gray-200"
                  : "bg-gray-50 border-black/10 text-gray-800"
                }
              `}
            >
              {c.text}
              <div className={`text-[0.67rem] mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {c.date}
              </div>
              <button
                onClick={() => onDeleteComment(place.id, c.id)}
                className="absolute top-1.5 right-2 bg-transparent border-none text-[0.7rem] cursor-pointer text-gray-400 hover:text-red-400"
              >
                ✕
              </button>
            </div>
          ))
        }
      </div>

      {/* Yorum ekleme formu */}
      <div className="flex gap-1.5">
        <input
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAdd()}
          placeholder="Not ekle, yorum yaz... (Enter)"
          className={`
            flex-1 px-3 py-2 rounded-lg text-sm outline-none border
            transition-colors duration-200
            focus:border-[#c9a84c]
            ${darkMode
              ? "bg-[#1a2235] border-white/10 text-gray-100 placeholder-gray-500"
              : "bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400"
            }
          `}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-[#c9a84c] text-[#0b0f1a] rounded-lg text-sm font-bold cursor-pointer border-none hover:opacity-90 transition-opacity"
        >
          Ekle
        </button>
      </div>
    </div>
  );
}

export default DetailPanel;
