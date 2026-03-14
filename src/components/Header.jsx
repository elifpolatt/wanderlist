//logo, istatistikler, tema butonu burada 

function Header({ places, darkMode, onToggleDarkMode }) {
  const total        = places.length;
  const wishCount    = places.filter((p) => p.status === "wish").length;
  const visitedCount = places.filter((p) => p.status === "visited").length;

  const t = darkMode
    ? { bg:"#111827", border:"rgba(255,255,255,0.07)", text:"#e2ddd6", muted:"#6b7280" }
    : { bg:"#ffffff", border:"rgba(0,0,0,0.08)",       text:"#1a1a2e", muted:"#9ca3af" };

  return (
    <>
      <style>{`
        .mode-btn {
          display:flex; align-items:center; gap:7px;
          padding:0.4rem 1.1rem; border-radius:999px; cursor:pointer;
          font-family:inherit; font-size:0.8rem; font-weight:600;
          border:none; position:relative; overflow:hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .mode-btn::before {
          content:''; position:absolute; inset:0; opacity:0;
          background:rgba(255,255,255,0.15);
          transition: opacity 0.2s;
        }
        .mode-btn:hover::before { opacity:1; }
        .mode-btn:hover  { transform:scale(1.07); }
        .mode-btn:active { transform:scale(0.96); }
        .mode-dark  { background:linear-gradient(135deg,#1e3a5f,#0f2027); color:#e8c97a; box-shadow:0 2px 14px rgba(201,168,76,0.35); }
        .mode-light { background:linear-gradient(135deg,#ffd89b,#ff9a44); color:#1a1a2e; box-shadow:0 2px 14px rgba(255,154,68,0.45); }
        .mode-icon  { font-size:1.05rem; display:inline-block; transition:transform 0.5s cubic-bezier(.34,1.56,.64,1); }
        .mode-btn:hover .mode-icon { transform:rotate(30deg) scale(1.3); }
      `}</style>

      <header style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 1.4rem", height:54, background:t.bg, borderBottom:`1px solid ${t.border}`, flexShrink:0, transition:"all 0.3s" }}>

        <div style={{ display:"flex", alignItems:"baseline" }}>
          <span style={{ fontFamily:"Georgia,serif", fontSize:"1.5rem", fontWeight:700, color:"#c9a84c", letterSpacing:-0.5 }}>WanderList</span>
          <span style={{ fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", color:t.muted, marginLeft:8 }}>Seyahat Haritam</span>
        </div>

        <div style={{ display:"flex", gap:24 }}>
          {[["Toplam",total],["🧡 Hayalim",wishCount],["✅ Gezdim",visitedCount]].map(([l,v])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <span style={{ display:"block", fontFamily:"Georgia,serif", fontSize:"1.2rem", color:t.text, lineHeight:1 }}>{v}</span>
              <span style={{ fontSize:"0.68rem", color:t.muted }}>{l}</span>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:14, alignItems:"center" }}>
          <div style={{ display:"flex", gap:10, fontSize:"0.73rem", color:t.muted }}>
            <span><span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:"#e8774a", marginRight:4 }}/>Hayalim</span>
            <span><span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:"#4caf84", marginRight:4 }}/>Gittim</span>
          </div>
          <button onClick={onToggleDarkMode} className={`mode-btn ${darkMode ? "mode-dark" : "mode-light"}`}>
            <span className="mode-icon">{darkMode ? "🌙" : "☀️"}</span>
            {darkMode ? "Gece Modu" : "Gündüz Modu"}
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
