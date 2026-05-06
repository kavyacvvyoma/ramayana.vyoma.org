// ════════════════════════════════════════════════════════════════════════════
//  11_GalleryPage.jsx  —  nav: "Gallery"
//  > Edit the gallery{} object: keys are years, each year has title + imgs[] with e (emoji) and c (caption)
// ════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { createPortal } from "react-dom";
import { C, F } from "./01_theme";
import { Card, Tag, Btn, Divider, PageHdr, SpiritualHero, Om } from "./02_SharedComponents";

export function GalleryPage() {
  const [yr, setYr] = useState("2026");
  const [lb, setLb] = useState(null);

  const gallery = {
    2026: { title: "Rāmāyaṇa Navāha Pārāyaṇa 2026", imgs: [
      { src: "/Gallery_2026_00.jpeg", c: "Śrī Rāma Darbar — Navāha Pārāyaṇa 2026" },
      { src: "/Gallery_2026_01.jpeg", c: "Inauguration — Ācāryas at the Yajña 2026" },
      { src: "/Gallery_2026_02.jpeg", c: "Devotees gathered for Pārāyaṇa 2026" },
      { src: "/Gallery_2026_03.jpeg", c: "Pārāyaṇa session in progress — 2026" },
      { src: "/Gallery_2026_04.jpeg", c: "Prasāda seva — Navāha Yajña 2026" },
    ]},
    2025: { title: "Ramayana Mahotsava 2025", imgs: [
      { src: "/Gallery_2025_01.jpeg", c: "Rāmāyaṇa Pārāyaṇa 2025 — Ācāryas at the Yajña" },
      { src: "/Gallery2025_02.jpeg",  c: "Rāmāyaṇa Pārāyaṇa 2025 — Devotees in recitation" },
      { src: "/Galery_2025_03.jpg",   c: "Rāmāyaṇa Pārāyaṇa 2025 — Śrī Rāma Darbar" },
    ]},
  };
  const cur = gallery[yr];

  return (
    <div className="pi">
      <PageHdr title="Gallery" subtitle="Moments from Vyoma's Ramayana Journey" accentColor={C.crimson} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 24px" }}>

        {/* Year tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 26, justifyContent: "center" }}>
          {["2026", "2025"].map(y => (
            <button key={y} className="bt" onClick={() => setYr(y)} style={{
              background: yr === y ? `linear-gradient(135deg,${C.crimson},${C.indigo})` : C.cardBg,
              color: yr === y ? C.white : C.textMid,
              border: `2px solid ${yr === y ? "transparent" : C.orange4}`,
              borderRadius: 8, padding: "9px 24px", fontFamily: "'Poppins', sans-serif",
              fontSize: 13, cursor: "pointer", fontWeight: 700,
            }}>{y}</button>
          ))}
        </div>

        <h2 style={{ fontFamily: "'Poppins', sans-serif", color: C.textDark, textAlign: "center", fontSize: 17, marginBottom: 22 }}>{cur.title}</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
          {cur.imgs.map((img, i) => (
            <div key={i} className="hl" onClick={() => setLb({ ...img, color: C.orange1 })} style={{
              background: C.cardBg, border: `1.5px solid ${C.orange4}`,
              borderRadius: 12, cursor: "pointer", overflow: "hidden",
              boxShadow: "0 3px 14px rgba(92,58,30,0.1)",
            }}>
              <img src={img.src} alt={img.c}
                style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Poppins',sans-serif", color: C.brown2, fontSize: 13 }}>{img.c}</span>
                <span style={{ background: C.orange1, color: C.white, borderRadius: "50%", width: 22, height: 22,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>+</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox — portal on document.body */}
        {lb && createPortal(
          <div onClick={() => setLb(null)} style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 999999, cursor: "zoom-out", padding: "clamp(16px,4vw,40px)",
          }}>
            <img
              src={lb.src} alt={lb.c}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: "min(90vw, 900px)", maxHeight: "88vh",
                objectFit: "contain", borderRadius: 10,
                boxShadow: "0 8px 48px rgba(0,0,0,0.7)", cursor: "default",
              }}
            />
            <div style={{
              position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
              fontFamily: "'Poppins', sans-serif", color: "rgba(255,255,255,0.75)",
              fontSize: 13, textAlign: "center", pointerEvents: "none",
            }}>{lb.c}</div>
            <button onClick={() => setLb(null)} style={{
              position: "fixed", top: 18, right: 22,
              background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.35)",
              color: "#fff", fontSize: 22, cursor: "pointer", borderRadius: "50%",
              width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1000000,
            }}>×</button>
          </div>,
          document.body
        )}

      </div>
    </div>
  );
}

// ═══════════════════════════ QUIZ ════════════════════════════════════════════