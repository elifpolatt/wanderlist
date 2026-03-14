import { useState, useEffect } from "react";

//yeni yer ekleme formu
function AddModal({ coord, darkMode, onSave, onClose }) {
  const [form, setForm] = useState({ city:"", country:"", status:"wish", note:"" });

  useEffect(() => {
    setForm({ city:"", country: coord.country||"", status:"wish", note:"" });
  }, [coord]);

  const handleSave = () => {
    if (!form.city.trim() || !form.country.trim()) return;
    onSave({ ...form, lat:coord.lat, lng:coord.lng });
  };

  const t = darkMode
    ? { overlay:"rgba(0,0,0,0.72)", modal:"#111827", border:"rgba(255,255,255,0.1)", title:"#e2ddd6", input:"#1a2235", inputBorder:"rgba(255,255,255,0.1)", text:"#e2ddd6", label:"#9ca3af", hint:"rgba(201,168,76,0.06)", hintBorder:"rgba(201,168,76,0.15)", hintColor:"#9ca3af" }
    : { overlay:"rgba(0,0,0,0.45)", modal:"#ffffff", border:"rgba(0,0,0,0.1)",       title:"#1a1a2e", input:"#f5f7fa", inputBorder:"rgba(0,0,0,0.12)",       text:"#1a1a2e", label:"#6b7280", hint:"rgba(201,168,76,0.06)", hintBorder:"rgba(201,168,76,0.2)",  hintColor:"#6b7280" };

  return (
    <div style={{ position:"fixed", inset:0, background:t.overlay, backdropFilter:"blur(5px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000 }}>
      <div style={{ background:t.modal, border:`1px solid ${t.border}`, borderRadius:18, padding:"1.8rem", width:"min(420px,95vw)", boxShadow:"0 20px 60px rgba(0,0,0,0.5)", transition:"all 0.3s" }}>

        <div style={{ fontFamily:"Georgia,serif", fontSize:"1.3rem", fontWeight:700, color:t.title, marginBottom:8 }}>✈️ Yeni Yer Ekle</div>

        <div style={{ fontSize:"0.75rem", color:t.hintColor, marginBottom:"1.1rem", padding:"0.5rem 0.7rem", background:t.hint, border:`1px solid ${t.hintBorder}`, borderRadius:8, lineHeight:1.5 }}>
          📍 {coord.lat.toFixed(3)}, {coord.lng.toFixed(3)}
          {coord.country
            ? <span style={{ color:"#4caf84", fontWeight:500 }}> · 🌍 {coord.country} tespit edildi</span>
            : <span style={{ color:"#e8774a" }}> · Okyanus, ülkeyi kendin gir</span>
          }
        </div>

        {[["Şehir / Yer Adı *","city","text","örn. Tokyo..."],["Ülke *","country","text","örn. Japonya"]].map(([lbl,key,type,ph])=>(
          <div key={key} style={{ marginBottom:"0.8rem" }}>
            <label style={{ display:"block", fontSize:"0.7rem", letterSpacing:"0.08em", textTransform:"uppercase", color:t.label, marginBottom:5 }}>
              {lbl} {key==="country"&&coord.country&&<span style={{ color:"#4caf84", textTransform:"none", letterSpacing:0, fontSize:"0.68rem" }}>(otomatik)</span>}
            </label>
            <input type={type} placeholder={ph} value={form[key]}
              onChange={e=>setForm({...form,[key]:e.target.value})}
              autoFocus={key==="city"}
              style={{ width:"100%", padding:"0.6rem 0.8rem", background:t.input, border:`1px solid ${key==="country"&&coord.country?"rgba(76,175,132,0.4)":t.inputBorder}`, borderRadius:9, color:t.text, fontSize:"0.9rem", outline:"none", fontFamily:"inherit", boxSizing:"border-box" }}
            />
          </div>
        ))}

        <div style={{ marginBottom:"0.8rem" }}>
          <label style={{ display:"block", fontSize:"0.7rem", letterSpacing:"0.08em", textTransform:"uppercase", color:t.label, marginBottom:5 }}>Durum</label>
          <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}
            style={{ width:"100%", padding:"0.6rem 0.8rem", background:t.input, border:`1px solid ${t.inputBorder}`, borderRadius:9, color:t.text, fontSize:"0.9rem", outline:"none", fontFamily:"inherit" }}>
            <option value="wish">🧡 Gitmek İstiyorum</option>
            <option value="visited">✅ Gittim</option>
          </select>
        </div>

        <div style={{ marginBottom:"1rem" }}>
          <label style={{ display:"block", fontSize:"0.7rem", letterSpacing:"0.08em", textTransform:"uppercase", color:t.label, marginBottom:5 }}>İlk Notun (opsiyonel)</label>
          <textarea placeholder="Bu yeri neden görmek istiyorsun?..." value={form.note}
            onChange={e=>setForm({...form,note:e.target.value})}
            style={{ width:"100%", padding:"0.6rem 0.8rem", background:t.input, border:`1px solid ${t.inputBorder}`, borderRadius:9, color:t.text, fontSize:"0.9rem", outline:"none", fontFamily:"inherit", resize:"vertical", minHeight:65, boxSizing:"border-box" }}
          />
        </div>

        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onClose} style={{ flex:1, padding:"0.65rem", background:"transparent", border:`1px solid ${t.border}`, borderRadius:9, color:t.label, fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit" }}>İptal</button>
          <button onClick={handleSave} style={{ flex:1, padding:"0.65rem", background:"#c9a84c", border:"none", borderRadius:9, color:"#0b0f1a", fontSize:"0.88rem", fontWeight:700, cursor:"pointer", fontFamily:"inherit", opacity:(!form.city.trim()||!form.country.trim())?0.5:1, transition:"opacity 0.2s" }}>📍 Haritaya Ekle</button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
