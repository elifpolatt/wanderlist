import { useRef, useEffect, useCallback, useState } from "react";
import * as d3 from "d3";
import { COUNTRY_NAMES, COUNTRY_FLAGS } from "../data/countries";

export const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"; //dünya ülkelerinin sınırları, koordinatlar, harita şekilleri

//D3.js ile çizilen dünya haritası
function WorldMap({ places, selected, geoData, darkMode, onMapClick, onPinClick }) {
  const svgRef   = useRef(null);
  const zoomRef  = useRef({ k:1, x:0, y:0 });
  const sizeRef  = useRef({ w:800, h:500 });
  // useState ile useRef farkı: useState degisince ekran yenilenir, useRef degisince ekran
  // yenilenmez. Zoom gibi cok sık degisen degerler icin useRef daha performanslıdır.
  // Zoom degisince ekran yenilenmez, sadece deger guncellenir. performans sorunu olmaz.
  // Tooltip state
  const [tooltip, setTooltip] = useState(null); // { x, y, name, flag, hasPin }

  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    sizeRef.current = { w: el.offsetWidth, h: el.offsetHeight };
  });

  const getProjection = useCallback(() => {
    const { w, h } = sizeRef.current;
    return d3.geoNaturalEarth1().scale(w / 6.2).translate([w / 2, h / 2]);
  }, []);

  const getPathGen = useCallback(() => d3.geoPath().projection(getProjection()), [getProjection]);

  // Zoom
  useEffect(() => {
    if (!svgRef.current || !geoData) return;
    const svg = d3.select(svgRef.current);
    const zb = d3.zoom().scaleExtent([1, 12]).on("zoom", (e) => {
      const { k, x, y } = e.transform;
      zoomRef.current = { k, x, y };
      svg.select("g.map-group").attr("transform", e.transform);
    });
    svg.call(zb);
    return () => svg.on(".zoom", null);
  }, [geoData]);

  // SVG koordinatını coğrafi koordinata çevir
  const svgToGeo = useCallback((clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const { k, x, y } = zoomRef.current;
    const mapX = (clientX - rect.left  - x) / k;
    const mapY = (clientY - rect.top - y) / k;
    return getProjection().invert([mapX, mapY]);
  }, [getProjection]);

  // Mouse hareketi -> ülke tespiti ->  tooltip
  const handleMouseMove = useCallback((e) => {
    if (!geoData) return;
    const coords = svgToGeo(e.clientX, e.clientY);
    if (!coords) { setTooltip(null); return; }
    const [lng, lat] = coords;

    // Hangi ülke?
    let found = null;
    for (const f of geoData.features) {
      if (d3.geoContains(f, [lng, lat])) {
        found = f;
        break;
      }
    }

    if (!found) {
      setTooltip(null);
      return;
    }

    const id   = parseInt(found.id);
    const name = COUNTRY_NAMES[id] || found.properties?.name || "Bilinmiyor";
    const flag = COUNTRY_FLAGS[id] || "🌐";

    // Bu ülkede daha önce eklenen pin var mı?
    const pinCount = places.filter(p => p.country === name).length;

    const svg  = svgRef.current;
    const rect = svg.getBoundingClientRect();

    setTooltip({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      name,
      flag,
      pinCount,
    });
  }, [geoData, svgToGeo, places]);

  const handleMouseLeave = () => setTooltip(null);

  // Tıklama
  const handleSvgClick = useCallback((e) => {
    if (e.defaultPrevented) return;
    const coords = svgToGeo(e.clientX, e.clientY);
    if (!coords) return;
    const [lng, lat] = coords;
    let detectedCountry = "";
    for (const f of geoData.features) {
      if (d3.geoContains(f, [lng, lat])) {
        detectedCountry = COUNTRY_NAMES[parseInt(f.id)] || f.properties?.name || "";
        break;
      }
    }
    onMapClick({ lat: parseFloat(lat.toFixed(4)), lng: parseFloat(lng.toFixed(4)), country: detectedCountry });
  }, [svgToGeo, geoData, onMapClick]); // bunlar değişince yeniden oluştur

  // Tema renkleri
  const ocean1 = darkMode ? "#0e2044" : "#a8c8e8";
  const ocean2 = darkMode ? "#060d18" : "#7ab0d4";
  const land   = darkMode ? "#1a2540" : "#d4e6c3";
  const landH  = darkMode ? "#2a3d6e" : "#b8d49a";
  const border = darkMode ? "#2d3f6a" : "#a8c4a0";
  const grid   = darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{ width:"100%", height:"100%", position:"relative" }}>
      <svg
        ref={svgRef}
        width="100%" height="100%"
        style={{ display:"block", cursor:"crosshair" }}
        onClick={handleSvgClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="40%">
            <stop offset="0%"   stopColor={ocean1} />
            <stop offset="100%" stopColor={ocean2} />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#oceanGrad)" />

        <g className="map-group">
          {geoData && (
            <path d={getPathGen()(d3.geoGraticule()())} fill="none" stroke={grid} strokeWidth="0.5" />
          )}

          {/* Ülkeler */}
          {geoData && geoData.features.map((f, i) => (
            <path
              key={i}
              d={getPathGen()(f)}
              fill={land}
              stroke={border}
              strokeWidth="0.5"
              style={{ transition:"fill 0.12s" }}
              onMouseEnter={e => e.currentTarget.setAttribute("fill", landH)}
              onMouseLeave={e => e.currentTarget.setAttribute("fill", land)}
            />
          ))}

          {/* Pinler */}
          {places.map(p => {
            const pt = getProjection()([p.lng, p.lat]);
            if (!pt) return null;
            const [px, py] = pt;
            const isSel = selected?.id === p.id;
            const color = p.status === "visited" ? "#4caf84" : "#e8774a";
            return (
              <g key={p.id} style={{ cursor:"pointer" }} onClick={e => { e.stopPropagation(); onPinClick(p); }}>
                {isSel && (
                  <circle cx={px} cy={py} r="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5">
                    <animate attributeName="r"       values="10;20;10" dur="1.8s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="1.8s" repeatCount="indefinite"/>
                  </circle>
                )}
                <ellipse cx={px+1} cy={py+8} rx="5" ry="2" fill="rgba(0,0,0,0.25)"/>
                <circle cx={px} cy={py} r={isSel?9:6} fill={color}
                  stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
                  style={{ filter:`drop-shadow(0 2px 5px ${color}88)` }}
                />
                <circle cx={px} cy={py} r="2" fill="white" opacity="0.8"/>
                {isSel && (
                  <text x={px} y={py-13} textAnchor="middle"
                    fill={darkMode?"white":"#1a1a2e"} fontSize="9" fontWeight="bold"
                    style={{ pointerEvents:"none" }}>
                    {p.city}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* TOOLTIP */}
      {tooltip && (
        <div style={{
          position: "absolute",
          left: tooltip.x + 16,
          top:  tooltip.y - 12,
          pointerEvents: "none",
          zIndex: 50,
          transform: tooltip.x > sizeRef.current.w - 200 ? "translateX(-110%)" : "none",
        }}>
          <div style={{
            background: darkMode ? "rgba(15,25,45,0.95)" : "rgba(255,255,255,0.97)",
            border: `1px solid ${darkMode ? "rgba(201,168,76,0.3)" : "rgba(201,168,76,0.4)"}`,
            borderRadius: 10,
            padding: "0.55rem 0.85rem",
            boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            whiteSpace: "nowrap",
          }}>
            <div>
              {/* Ülke adı */}
              <div style={{
                fontSize: "0.88rem",
                fontWeight: 600,
                fontFamily: "Georgia, serif",
                color: darkMode ? "#e2ddd6" : "#1a1a2e",
                lineHeight: 1.2,
              }}>
                {tooltip.name}
              </div>

              {/* Pin bilgisi */}
              <div style={{ fontSize:"0.68rem", color: darkMode ? "#9ca3af" : "#6b7280", marginTop:2 }}>
                {tooltip.pinCount > 0
                  ? <span style={{ color:"#c9a84c" }}>📍 {tooltip.pinCount} yer eklendi</span>
                  : <span>Tıkla → yer ekle</span>
                }
              </div>
            </div>
          </div>

          {/* Tooltip ok */}
          <div style={{
            position: "absolute",
            left: tooltip.x > sizeRef.current.w - 200 ? "auto" : -6,
            right: tooltip.x > sizeRef.current.w - 200 ? -6 : "auto",
            top: "50%",
            transform: "translateY(-50%)",
            width: 0, height: 0,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderRight: tooltip.x > sizeRef.current.w - 200
              ? "none"
              : `6px solid ${darkMode ? "rgba(15,25,45,0.95)" : "rgba(255,255,255,0.97)"}`,
            borderLeft: tooltip.x > sizeRef.current.w - 200
              ? `6px solid ${darkMode ? "rgba(15,25,45,0.95)" : "rgba(255,255,255,0.97)"}`
              : "none",
          }}/>
        </div>
      )}
    </div>
  );
}

export default WorldMap;
