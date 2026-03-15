import { useRef, useState, useEffect, useCallback } from "react";
import PlaceCard from "./PlaceCard";

const MIN_WIDTH     = 220;
const MAX_WIDTH     = 560;
const DEFAULT_WIDTH = 300;

function Sidebar({ places, selected, filter, darkMode, onFilterChange, onSelect, onToggleStatus, onDelete }) {
  const filtered  = filter === "all" ? places : places.filter((p) => p.status === filter);
  const [width, setWidth]       = useState(DEFAULT_WIDTH);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered]   = useState(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_WIDTH);

  // Surukleme baslat
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    startX.current = e.clientX;
    startW.current = width;
    setDragging(true);
  }, [width]);

  // Surukleme devam
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const delta = startX.current - e.clientX;
      const newW  = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startW.current + delta));
      setWidth(newW);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  return (
    <>
      {/* Surukleme sirasinda ekrani kapla — cursor kaymasini onler */}
      {dragging && (
        <div className="fixed inset-0 z-[9999] cursor-ew-resize select-none" />
      )}

      {/* ANA SIDEBAR KAPSAYICI
        Genislik JS ile kontrol edildiginden inline style kalıyor (dinamik deger)
        Diger stiller Tailwind ile yazildi.
      */}
      <div
        style={{ width, minWidth: MIN_WIDTH, maxWidth: MAX_WIDTH }}
        className={`
          relative flex flex-col overflow-hidden shrink-0
          border-l
          ${dragging ? "" : "transition-colors duration-300"}
          ${darkMode
            ? "bg-[#111827] border-white/10"
            : "bg-[#f8f9fc] border-black/10"
          }
        `}
      >
        {/* SURUKLEME TUTAMACI */}
        <div
          onMouseDown={onMouseDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          title="Surukleyerek genislet / daralt"
          className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize z-20 flex items-center justify-center"
        >
          {/* Gorsel cizgi — hover/drag'de buyur ve renklenir */}
          <div
            className="w-0.5 rounded-full transition-all duration-200"
            style={{
              height: hovered || dragging ? 60 : 36,
              background: dragging
                ? "#c9a84c"
                : hovered
                  ? "rgba(201,168,76,0.6)"
                  : darkMode
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.12)",
            }}
          />
        </div>

        {/* BASLIK + FILTRE */}
        <div className={`pt-4 pr-4 pb-3 pl-5 border-b ${darkMode ? "border-white/10" : "border-black/10"}`}>
          <div className="flex items-center justify-between mb-2">
            <div className={`font-serif text-base ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
              📍 Yerlerim
            </div>
            {/* Surukleme sirasinda genislik goster */}
            {(dragging || hovered) && (
              <span className={`text-[0.63rem] px-1.5 py-0.5 rounded ${darkMode ? "text-gray-400 bg-white/5" : "text-gray-400 bg-black/5"}`}>
                ↔ {width}px
              </span>
            )}
          </div>

          {/* Filtre butonlari */}
          <div className="flex gap-1">
            {[["all","Tumu"],["wish","🧡 Hayalim"],["visited","✅ Gittim"]].map(([v, l]) => (
              <button
                key={v}
                onClick={() => onFilterChange(v)}
                className={`
                  flex-1 py-1.5 px-1 rounded-lg text-[0.75rem] cursor-pointer
                  border transition-all duration-200
                  ${filter === v
                    ? darkMode
                      ? "bg-[#1a2235] border-[#c9a84c] text-gray-100"
                      : "bg-[#fff8e8] border-[#c9a84c] text-[#8a6d1a]"
                    : darkMode
                      ? "bg-transparent border-white/10 text-gray-400 hover:border-white/20"
                      : "bg-transparent border-black/10 text-gray-500 hover:border-black/20"
                  }
                `}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* YER LISTESI */}
        <div className="flex-1 overflow-y-auto p-2.5">
          {filtered.length === 0
            ? (
              <div className={`text-center py-12 px-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                <div className="text-3xl mb-2">🗺️</div>
                <div className="font-serif italic text-sm leading-relaxed">
                  Yer yok.<br />Haritaya tikla!
                </div>
              </div>
            )
            : filtered.map((p) => (
              <PlaceCard
                key={p.id}
                place={p}
                isSelected={selected?.id === p.id}
                darkMode={darkMode}
                onSelect={onSelect}
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Sidebar;
