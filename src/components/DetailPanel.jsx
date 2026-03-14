import { useState } from "react";

//harita üstü yorum paneli
function DetailPanel({ place, darkMode, onClose, onAddComment, onDeleteComment }) {
  const [commentText, setCommentText] = useState("");

  const t = darkMode
    ? { panel:"#111827", border:"rgba(255,255,255,0.1)", bubble:"#1a2235", bubbleBorder:"rgba(255,255,255,0.07)", city:"#e2ddd6", meta:"#9ca3af", date:"#6b7280", noComment:"#6b7280", input:"#1a2235", inputBorder:"rgba(255,255,255,0.1)", closeBtn:"#1a2235", closeBtnColor:"#9ca3af" }
    : { panel:"#ffffff", border:"rgba(0,0,0,0.1)",       bubble:"#f5f7fa", bubbleBorder:"rgba(0,0,0,0.07)",       city:"#1a1a2e", meta:"#6b7280", date:"#9ca3af", noComment:"#9ca3af", input:"#f5f7fa", inputBorder:"rgba(0,0,0,0.12)", closeBtn:"#f0f4f8", closeBtnColor:"#6b7280" };

  const handleAdd = () => {
    if (!commentText.trim()) return;
    onAddComment(place.id, commentText);
    setCommentText("");
  };

  return (
    <div style={{
      position:"absolute", bottom:18, left:"50%", transform:"translateX(-50%)",
      width:"min(430px,88%)", background:t.panel,
      border:`1px solid ${t.border}`, borderRadius:15, padding:"1.3rem",
      boxShadow: darkMode ? "0 8px 40px rgba(0,0,0,0.6)" : "0 8px 40px rgba(0,0,0,0.15)",
      zIndex:30, transition:"all 0.3s",
    }}>
      <button onClick={onClose} style={{ position:"absolute", top:10, right:10, background:t.closeBtn, border:`1px solid ${t.border}`, color:t.closeBtnColor, width:26, height:26, borderRadius:"50%", cursor:"pointer", fontSize:"0.8rem", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>

      <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:"0.8rem" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"Georgia,serif", fontSize:"1.35rem", fontWeight:700, color:t.city, lineHeight:1.1 }}>{place.city}</div>
          <div style={{ fontSize:"0.75rem", color:t.meta, marginTop:3 }}>📍 {place.country} · {place.lat.toFixed(2)}, {place.lng.toFixed(2)}</div>
        </div>
        <span style={{ display:"inline-flex", alignItems:"center", padding:"0.15rem 0.55rem", borderRadius:999, fontSize:"0.65rem", fontWeight:500,
          background: place.status==="wish" ? "rgba(232,119,74,0.15)" : "rgba(76,175,132,0.15)",
          color:      place.status==="wish" ? "#e8774a"               : "#4caf84",
        }}>{place.status==="wish" ? "🧡 Hayalim" : "✅ Gittim"}</span>
      </div>

      <div style={{ maxHeight:120, overflowY:"auto", marginBottom:"0.8rem", display:"flex", flexDirection:"column", gap:6 }}>
        {place.comments.length===0
          ? <div style={{ fontSize:"0.78rem", color:t.noComment, fontStyle:"italic", textAlign:"center", padding:"0.5rem" }}>Henüz yorum yok... ✍️</div>
          : place.comments.map(c=>(
            <div key={c.id} style={{ background:t.bubble, border:`1px solid ${t.bubbleBorder}`, borderRadius:9, padding:"0.6rem 0.8rem", fontSize:"0.82rem", color:t.city, lineHeight:1.5, position:"relative" }}>
              {c.text}
              <div style={{ fontSize:"0.67rem", color:t.date, marginTop:3 }}>{c.date}</div>
              <button onClick={()=>onDeleteComment(place.id,c.id)} style={{ position:"absolute", top:6, right:8, background:"none", border:"none", color:t.date, cursor:"pointer", fontSize:"0.7rem" }}>✕</button>
            </div>
          ))
        }
      </div>

      <div style={{ display:"flex", gap:6 }}>
        <input value={commentText} onChange={e=>setCommentText(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&handleAdd()}
          placeholder="Not ekle, yorum yaz... (Enter)"
          style={{ flex:1, padding:"0.6rem 0.8rem", background:t.input, border:`1px solid ${t.inputBorder}`, borderRadius:8, color:t.city, fontSize:"0.85rem", outline:"none", fontFamily:"inherit" }}
        />
        <button onClick={handleAdd} style={{ padding:"0.6rem 1rem", background:"#c9a84c", border:"none", borderRadius:8, color:"#0b0f1a", fontWeight:700, fontSize:"0.82rem", cursor:"pointer", fontFamily:"inherit" }}>Ekle</button>
      </div>
    </div>
  );
}

export default DetailPanel;
