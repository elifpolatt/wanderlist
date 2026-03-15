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

  // Ortak input class'i — her input - select - textarea icin kullanilir
  const inputClass = `
    w-full px-3 py-2 rounded-lg text-sm outline-none
    border transition-all duration-200
    ${darkMode
      ? "bg-[#1a2235] border-white/10 text-gray-100 placeholder-gray-500"
      : "bg-gray-50  border-black/10  text-gray-900 placeholder-gray-400"
    }
    focus:border-[#c9a84c]
  `;

  const labelClass = `
    block text-[0.7rem] tracking-widest uppercase mb-1
    ${darkMode ? "text-gray-400" : "text-gray-500"}
  `;

  return (
    <div className={`
      fixed inset-0 flex items-center justify-center z-[2000]
      backdrop-blur-md
      ${darkMode ? "bg-black/70" : "bg-black/45"}
    `}>

      {/* MODAL KUTUSU */}
      <div className={`
        rounded-2xl p-7 w-[min(420px,95vw)] shadow-2xl
        border transition-all duration-300
        ${darkMode
          ? "bg-[#111827] border-white/10"
          : "bg-white border-black/10"
        }
      `}>

        {/* Baslik */}
        <div className={`font-serif text-xl font-bold mb-2 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
          ✈️ Yeni Yer Ekle
        </div>

        {/* Koordinat / ulke bilgisi */}
        <div className={`
          text-[0.75rem] mb-4 px-3 py-2 rounded-lg leading-relaxed
          border
          ${darkMode
            ? "bg-[#c9a84c]/5 border-[#c9a84c]/20 text-gray-400"
            : "bg-[#c9a84c]/5 border-[#c9a84c]/25 text-gray-500"
          }
        `}>
          📍 {coord.lat.toFixed(3)}, {coord.lng.toFixed(3)}
          {coord.country
            ? <span className="text-[#4caf84] font-medium"> · 🌍 {coord.country} tespit edildi</span>
            : <span className="text-[#e8774a]"> · Okyanus, ulkeyi kendin gir</span>
          }
        </div>

        {/* Sehir */}
        <div className="mb-3">
          <label className={labelClass}>Sehir / Yer Adi *</label>
          <input
            type="text"
            placeholder="orn. Tokyo..."
            value={form.city}
            autoFocus
            onChange={e => setForm({...form, city: e.target.value})}
            className={inputClass}
          />
        </div>

        {/* Ulke */}
        <div className="mb-3">
          <label className={labelClass}>
            Ulke *
            {coord.country && (
              <span className="text-[#4caf84] normal-case tracking-normal text-[0.68rem] ml-1">(otomatik)</span>
            )}
          </label>
          <input
            type="text"
            placeholder="orn. Japonya"
            value={form.country}
            onChange={e => setForm({...form, country: e.target.value})}
            className={`${inputClass} ${coord.country ? "border-[#4caf84]/40" : ""}`}
          />
        </div>

        {/* Durum */}
        <div className="mb-3">
          <label className={labelClass}>Durum</label>
          <select
            value={form.status}
            onChange={e => setForm({...form, status: e.target.value})}
            className={inputClass}
          >
            <option value="wish">🧡 Gitmek Istiyorum</option>
            <option value="visited">✅ Gittim</option>
          </select>
        </div>

        {/* Not */}
        <div className="mb-5">
          <label className={labelClass}>Ilk Notun (opsiyonel)</label>
          <textarea
            placeholder="Bu yeri neden gormek istiyorsun?..."
            value={form.note}
            onChange={e => setForm({...form, note: e.target.value})}
            className={`${inputClass} resize-y min-h-[65px]`}
          />
        </div>

        {/* Butonlar */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className={`
              flex-1 py-2.5 rounded-xl text-sm cursor-pointer
              border bg-transparent transition-all duration-200
              hover:opacity-80
              ${darkMode ? "border-white/10 text-gray-400" : "border-black/10 text-gray-500"}
            `}
          >
            Iptal
          </button>
          <button
            onClick={handleSave}
            className={`
              flex-1 py-2.5 rounded-xl text-sm font-bold cursor-pointer
              bg-[#c9a84c] text-[#0b0f1a] border-none
              transition-opacity duration-200
              hover:opacity-90
              ${(!form.city.trim() || !form.country.trim()) ? "opacity-50" : "opacity-100"}
            `}
          >
            📍 Haritaya Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
