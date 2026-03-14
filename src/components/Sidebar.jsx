import { useRef, useState, useEffect, useCallback } from "react";
import PlaceCard from "./PlaceCard";

const MIN_WIDTH     = 220;
const MAX_WIDTH     = 560;
const DEFAULT_WIDTH = 300;

//sağ panel aslında
function Sidebar({ places, selected, filter, darkMode, onFilterChange, onSelect, onToggleStatus, onDelete }) {
  const filtered  = filter === "all" ? places : places.filter((p) => p.status === filter);
  const [width, setWidth]       = useState(DEFAULT_WIDTH);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered]   = useState(false);
  const startX = useRef(0);
  const startW = useRef(DEFAULT_WIDTH);

  const t = darkMode
    ? { bg:"#111827", border:"rgba(255,255,255,0.07)", title:"#e2ddd6", muted:"#9ca3af", empty:"#6b7280" }
    : { bg:"#f8f9fc", border:"rgba(0,0,0,0.08)",       title:"#1a1a2e", muted:"#6b7280", empty:"#9ca3af" };

  const handleColor = dragging ? "#c9a84c" : hovered ? "rgba(201,168,76,0.6)" : (darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)");

  // Sürükleme başlat
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    startX.current = e.clientX;
    startW.current = width;
    setDragging(true);
  }, [width]);

  // Sürükleme devam
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const delta = startX.current - e.clientX; // sağ panel: sola git = genişle
      const newW  = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startW.current + delta));
      setWidth(newW);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [dragging]);

  return (
    <>
      {/* Sürükleme sırasında tüm ekranı kaplayan şeffaf overlay cursor'ın kaymasını önler */}
      {dragging && (
        <div style={{ position:"fixed", inset:0, cursor:"ew-resize", zIndex:9999, userSelect:"none" }} />
      )}

      <div style={{
        width,
        minWidth: MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        background: t.bg,
        borderLeft: `1px solid ${t.border}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        transition: dragging ? "none" : "background 0.3s, width 0.05s",
      }}>

        {/* SÜRÜKLEME TUTAMACI*/}
        <div
          onMouseDown={onMouseDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          title="Sürükleyerek genişlet / daralt"
          style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: 8,
            cursor: "ew-resize",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* İnce çizgi göstergesi */}
          <div style={{
            width: 3,
            height: hovered || dragging ? 60 : 36,
            borderRadius: 999,
            background: handleColor,
            transition: "height 0.2s, background 0.2s",
          }} />
        </div>

        {/* ── BAŞLIK + FİLTRE ── */}
        <div style={{ padding:"1rem 1.1rem 0.7rem 1.3rem", borderBottom:`1px solid ${t.border}` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"1rem", color:t.title }}>📍 Yerlerim</div>
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {[["all","Tümü"],["wish","🧡 Hayalim"],["visited","✅ Gittim"]].map(([v,l])=>(
              <button key={v} onClick={()=>onFilterChange(v)} style={{
                flex:1, padding:"0.35rem 0.3rem", borderRadius:7,
                border:`1px solid ${filter===v ? "#c9a84c" : t.border}`,
                background: filter===v ? (darkMode?"#1a2235":"#fff8e8") : "transparent",
                color: filter===v ? (darkMode?"#e2ddd6":"#8a6d1a") : t.muted,
                fontSize:"0.75rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s",
              }}>{l}</button>
            ))}
          </div>
        </div>

        {/* YER LİSTESİ */}
        <div style={{ flex:1, overflowY:"auto", padding:"0.6rem 0.7rem 0.6rem 0.9rem" }}>
          {filtered.length === 0
            ? <div style={{ textAlign:"center", padding:"3rem 1rem", color:t.empty }}>
                <div style={{ fontSize:"2rem", marginBottom:8 }}>🗺️</div>
                <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:"0.88rem", lineHeight:1.6 }}>
                  Yer yok.<br/>Haritaya tıkla!
                </div>
              </div>
            : filtered.map((p) => (
                <PlaceCard
                  key={p.id} place={p}
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
