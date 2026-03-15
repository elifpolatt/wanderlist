// Inline style yerine Tailwind class'lari kullanildi
//logo, istatistikler, tema butonu burada 

function Header({ places, darkMode, onToggleDarkMode }) {
  const total        = places.length;
  const wishCount    = places.filter((p) => p.status === "wish").length;
  const visitedCount = places.filter((p) => p.status === "visited").length;

  return (
    <>
      {/* Tailwind ile tanimlanamayan ozel animasyonlar icin style blogu */}
      <style>{`
        .mode-btn::before {
          content:''; position:absolute; inset:0; opacity:0;
          background:rgba(255,255,255,0.15); transition: opacity 0.2s;
        }
        .mode-btn:hover::before { opacity:1; }
        .mode-dark  { background:linear-gradient(135deg,#1e3a5f,#0f2027); color:#e8c97a; box-shadow:0 2px 14px rgba(201,168,76,0.35); }
        .mode-light { background:linear-gradient(135deg,#ffd89b,#ff9a44); color:#1a1a2e; box-shadow:0 2px 14px rgba(255,154,68,0.45); }
        .mode-icon  { font-size:1.05rem; display:inline-block; transition:transform 0.5s cubic-bezier(.34,1.56,.64,1); }
        .mode-btn:hover .mode-icon { transform:rotate(30deg) scale(1.3); }
      `}</style>

      <header className={`
        flex items-center justify-between
        px-6 h-14 shrink-0
        border-b transition-all duration-300
        ${darkMode
          ? "bg-gray-900 border-white/10"
          : "bg-white border-black/10"
        }
      `}>

        {/* LOGO */}

        <div className="flex items-baseline">
         
          <span className="font-serif text-2xl font-bold text-[#c9a84c] tracking-tight">
            WanderList
          </span>
         
          <span className={`
            text-[0.68rem] tracking-widest uppercase ml-2
            ${darkMode ? "text-gray-500" : "text-gray-400"}
          `}>
            Seyahat Haritam
          </span>
        </div>

        {/* ISTATISTIKLER */}
       
        <div className="flex gap-6">
          {[["Toplam", total], ["🧡 Hayalim", wishCount], ["✅ Gezdim", visitedCount]].map(([l, v]) => (
           
            <div key={l} className="text-center">
             
              <span className={`
                block font-serif text-xl leading-none
                ${darkMode ? "text-gray-100" : "text-gray-900"}
              `}>
                {v}
              </span>
              <span className={`text-[0.68rem] ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {l}
              </span>
            </div>
          ))}
        </div>

        {/* Sağ panel — renk aciklamasi + tema butonu */}
        
        <div className="flex gap-3 items-center">

          {/* Renk aciklamasi */}
          <div className={`flex gap-2 text-[0.73rem] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            
            <span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#e8774a] mr-1" />
              Hayalim
            </span>
            <span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#4caf84] mr-1" />
              Gittim
            </span>
          </div>

          {/* Tema butonu */}
          <button
            onClick={onToggleDarkMode}
            className={`
              mode-btn flex items-center gap-2
              rounded-full cursor-pointer overflow-hidden relative
              px-4 py-1.5 text-sm font-semibold
              hover:scale-105 active:scale-95
              transition-transform duration-200
              ${darkMode ? "mode-dark" : "mode-light"}
            `}
          >
            <span className="mode-icon">{darkMode ? "🌙" : "☀️"}</span>
            {darkMode ? "Gece Modu" : "Gunduz Modu"}
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;
