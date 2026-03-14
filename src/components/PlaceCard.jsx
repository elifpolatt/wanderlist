import { useState } from "react";

//her bir yerin kartı
function PlaceCard({ place, isSelected, darkMode, onSelect, onToggleStatus, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isWish      = place.status === "wish";
  const lastComment = place.comments[place.comments.length - 1];

  const t = darkMode
    ? { card:"#161d2e", cardSel:"#1a2235", border:"rgba(255,255,255,0.07)", borderSel:"#c9a84c", city:"#e2ddd6", meta:"#9ca3af", comment:"#6b7280", btn:"rgba(255,255,255,0.08)", btnColor:"#9ca3af", confirmBg:"#1f2d42", confirmBorder:"rgba(239,68,68,0.4)", confirmText:"#e2ddd6", confirmMuted:"#9ca3af" }
    : { card:"#ffffff", cardSel:"#fff8e8", border:"rgba(0,0,0,0.08)",       borderSel:"#c9a84c", city:"#1a1a2e", meta:"#6b7280", comment:"#9ca3af", btn:"rgba(0,0,0,0.06)", btnColor:"#6b7280", confirmBg:"#fff0f0", confirmBorder:"rgba(239,68,68,0.3)", confirmText:"#1a1a2e", confirmMuted:"#6b7280" };

  return (
    <div style={{ position:"relative", marginBottom:"0.5rem" }}>

      {/* KART */}
      <div
        onClick={() => { if (!showConfirm) onSelect(place); }}
        style={{
          padding:"0.85rem 0.95rem", borderRadius:10, cursor:"pointer", transition:"all 0.18s",
          background: isSelected ? t.cardSel : t.card,
          border:`1px solid ${isSelected ? t.borderSel : t.border}`,
          borderLeft:`3px solid ${isWish ? "#e8774a" : "#4caf84"}`,
          boxShadow: darkMode ? "none" : (isSelected ? "0 2px 12px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.06)"),
          opacity: showConfirm ? 0.5 : 1,
          filter: showConfirm ? "blur(1px)" : "none",
        }}
      >
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:3 }}>
          <span style={{ fontFamily:"Georgia,serif", fontSize:"0.97rem", fontWeight:600, color:t.city }}>{place.city}</span>
          <span style={{ display:"inline-flex", alignItems:"center", padding:"0.15rem 0.55rem", borderRadius:999, fontSize:"0.65rem", fontWeight:500,
            background: isWish ? "rgba(232,119,74,0.15)" : "rgba(76,175,132,0.15)",
            color:      isWish ? "#e8774a"               : "#4caf84",
          }}>{isWish ? "Hayalim" : "Gittim"}</span>
        </div>

        <div style={{ fontSize:"0.72rem", color:t.meta, marginBottom:5 }}>
          📍 {place.country} · {place.comments.length} yorum
        </div>

        {lastComment && (
          <div style={{ fontSize:"0.75rem", color:t.comment, fontStyle:"italic", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
            "{lastComment.text}"
          </div>
        )}

        <div style={{ display:"flex", gap:4, marginTop:8 }}>
          <button
            onClick={e => { e.stopPropagation(); onToggleStatus(place.id); }}
            style={{ flex:1, padding:"0.3rem 0.5rem", borderRadius:6, border:`1px solid ${t.btn}`, background:"transparent", color:t.btnColor, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit" }}
          >
            {isWish ? "✓ Gittim" : "↩ Geri Al"}
          </button>
          <button
            onClick={e => { e.stopPropagation(); onSelect(place); }}
            style={{ flex:1, padding:"0.3rem 0.5rem", borderRadius:6, border:`1px solid ${t.btn}`, background:"transparent", color:t.btnColor, fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit" }}
          >
            💬
          </button>
          <button
            onClick={e => { e.stopPropagation(); setShowConfirm(true); }}
            style={{ padding:"0.3rem 0.6rem", borderRadius:6, border:`1px solid ${t.btn}`, background:"transparent", color:"#ef4444", fontSize:"0.72rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s" }}
          >
            🗑
          </button>
        </div>
      </div>

      {/* SİLME ONAY POPUP'I */}
      {showConfirm && (
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 8px)",
          background: t.confirmBg,
          border: `1px solid ${t.confirmBorder}`,
          borderRadius: 12,
          padding: "1rem 1.1rem",
          zIndex: 50,
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          animation: "popIn 0.18s cubic-bezier(.34,1.56,.64,1)",
        }}>
          <style>{`@keyframes popIn { from { opacity:0; transform:translate(-50%,-50%) scale(0.88); } to { opacity:1; transform:translate(-50%,-50%) scale(1); } }`}</style>

          {/* İkon + başlık */}
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"0.5rem" }}>
            <span style={{ fontSize:"1.2rem" }}>🗑️</span>
            <span style={{ fontFamily:"Georgia,serif", fontSize:"0.95rem", fontWeight:600, color:t.confirmText }}>
              Emin misiniz?
            </span>
          </div>

          {/* Açıklama */}
          <div style={{ fontSize:"0.78rem", color:t.confirmMuted, marginBottom:"0.9rem", lineHeight:1.5 }}>
            <strong style={{ color: "#e8774a" }}>{place.city}</strong> haritanızdan kalıcı olarak silinecek. Bu işlem geri alınamaz.
          </div>

          {/* Butonlar */}
          <div style={{ display:"flex", gap:6 }}>
            <button
              onClick={e => { e.stopPropagation(); setShowConfirm(false); }}
              style={{ flex:1, padding:"0.45rem", borderRadius:7, border:`1px solid ${darkMode?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`, background:"transparent", color:t.confirmMuted, fontSize:"0.78rem", cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s" }}
            >
              İptal
            </button>
            <button
              onClick={e => { e.stopPropagation(); onDelete(place.id); setShowConfirm(false); }}
              style={{ flex:1, padding:"0.45rem", borderRadius:7, border:"none", background:"#ef4444", color:"white", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s" }}
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
