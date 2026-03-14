import { useState, useEffect } from "react";
import * as topojson from "topojson-client";
import Header      from "../components/Header";
import WorldMap, { GEO_URL } from "../components/WorldMap";
import Sidebar     from "../components/Sidebar";
import DetailPanel from "../components/DetailPanel";
import AddModal    from "../components/AddModal";
import samplePlaces from "../data/samplePlaces";

// Home.jsx Header.jsx places, darkMode Logo istatistikleri icin
// Home.jsx WorldMap.jsx places, selected, geoData Haritayi cizmek icin
// Home.jsx Sidebar.jsx places, filter, selected Listeyi gostermek icin
// Sidebar.jsx PlaceCard.jsx place, onDelete Her karti olusturmak icin
// WorldMap.jsx Home.jsx onMapClick(coord) Tiklanan koordinati bildirmek icin
// PlaceCard.jsx Home.jsx onDelete(id) Silme istegini bildirmek icin

function Home() {
  const [places, setPlaces]     = useState(samplePlaces);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]     = useState("all");
  const [geoData, setGeoData]   = useState(null);
  const [geoError, setGeoError] = useState(false);
  const [pending, setPending]   = useState(null);
  const [toast, setToast]       = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // Tüm sayfa arka planını güncelle
  useEffect(() => {
    document.body.style.background  = darkMode ? "#0b0f1a" : "#e8eef5";
    document.body.style.transition  = "background 0.3s";
    document.body.style.margin      = "0";
    document.body.style.padding     = "0";
  }, [darkMode]); //darkMode degisince body rengini guncelle

  useEffect(() => {
    fetch(GEO_URL).then(r=>r.json()).then(topo=>{
      setGeoData(topojson.feature(topo, topo.objects.countries));
    }).catch(()=>setGeoError(true)); //sadece ilk açılışta çalış
  }, []); //GeoJSON harita verisi cekme

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2500); };

  const handleSavePlace = ({ city, country, status, note, lat, lng }) => {
    const p = { id:Date.now(), city, country, lat, lng, status,
      comments: note ? [{id:1, text:note, date:new Date().toLocaleDateString("tr-TR")}] : [] };
    setPlaces(prev=>[...prev,p]);
    setSelected(p); setPending(null);
    showToast(`📍 ${city} haritana eklendi!`);
  };

  const handleToggleStatus = (id) => {
    const updated = places.map(p=>p.id===id?{...p,status:p.status==="wish"?"visited":"wish"}:p);
    setPlaces(updated);
    if (selected?.id===id) setSelected(updated.find(p=>p.id===id));
    showToast(updated.find(p=>p.id===id).status==="visited"?"✅ Gidildi!":"🧡 Hayaller listesine alındı!");
  };

  const handleDelete = (id) => {
    setPlaces(p=>p.filter(x=>x.id!==id));
    if (selected?.id===id) setSelected(null);
    showToast("🗑️ Yer silindi.");
  };

  const handleAddComment = (placeId, text) => {
    const updated = places.map(p=>p.id===placeId
      ? {...p, comments:[...p.comments,{id:Date.now(),text,date:new Date().toLocaleDateString("tr-TR")}]}
      : p);
    setPlaces(updated); setSelected(updated.find(p=>p.id===placeId));
    showToast("💬 Yorum eklendi!");
  };

  const handleDeleteComment = (placeId, commentId) => {
    const updated = places.map(p=>p.id===placeId?{...p,comments:p.comments.filter(c=>c.id!==commentId)}:p);
    setPlaces(updated); setSelected(updated.find(p=>p.id===placeId));
  };

  const t = {
    root:    darkMode ? "#0b0f1a" : "#e8eef5",
    mapBg:   darkMode ? "#060d18" : "#cdd9e8",
    hint:    darkMode ? { bg:"rgba(11,15,26,0.92)", border:"#c9a84c", color:"#e8c97a" }
                      : { bg:"rgba(255,255,255,0.92)", border:"#c9a84c", color:"#8a6d1a" },
    toast:   darkMode ? { bg:"#111827", color:"#e2ddd6" } : { bg:"#ffffff", color:"#1a1a2e" },
    spinner: "#c9a84c",
  };

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:t.root, color:darkMode?"#e2ddd6":"#1a1a2e", height:"100vh", display:"flex", flexDirection:"column", overflow:"hidden", transition:"all 0.3s" }}>

      <Header places={places} darkMode={darkMode} onToggleDarkMode={()=>setDarkMode(d=>!d)} />

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* HARİTA */}
        <div style={{ flex:1, position:"relative", overflow:"hidden", background:t.mapBg, transition:"background 0.3s" }}>
          <div style={{ position:"absolute", top:12, left:"50%", transform:"translateX(-50%)", background:t.hint.bg, border:`1px solid ${t.hint.border}`, color:t.hint.color, padding:"0.38rem 1rem", borderRadius:999, fontSize:"0.75rem", zIndex:20, pointerEvents:"none", whiteSpace:"nowrap" }}>
            🗺️ Haritaya tıklayarak yer ekle · Scroll ile yakınlaştır
          </div>

          {geoError && (
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:12, color:darkMode?"#9ca3af":"#6b7280" }}>
              <div style={{ fontSize:"2.5rem" }}>🌐</div>
              <div>Harita yüklenemedi. İnternet bağlantısı gerekli.</div>
            </div>
          )}

          {!geoData && !geoError && (
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", color:t.spinner, fontSize:"0.9rem", gap:10 }}>
              <div style={{ width:20, height:20, border:`2px solid ${t.spinner}`, borderTopColor:"transparent", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
              Harita yükleniyor...
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          )}

          {geoData && (
            <WorldMap places={places} selected={selected} geoData={geoData} darkMode={darkMode}
              onMapClick={setPending} onPinClick={setSelected} />
          )}

          {selected && (
            <DetailPanel place={selected} darkMode={darkMode}
              onClose={()=>setSelected(null)}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment} />
          )}
        </div>

        <Sidebar places={places} selected={selected} filter={filter} darkMode={darkMode}
          onFilterChange={setFilter} onSelect={setSelected}
          onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
      </div>

      {pending && (
        <AddModal coord={pending} darkMode={darkMode}
          onSave={handleSavePlace} onClose={()=>setPending(null)} />
      )}

      {toast && (
        <div style={{ position:"fixed", bottom:22, right:22, background:t.toast.bg, border:"1px solid #c9a84c", color:t.toast.color, padding:"0.7rem 1.1rem", borderRadius:10, fontSize:"0.83rem", zIndex:3000, boxShadow:"0 8px 30px rgba(0,0,0,0.3)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default Home;
