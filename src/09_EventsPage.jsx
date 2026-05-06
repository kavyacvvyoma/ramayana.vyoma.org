// ════════════════════════════════════════════════════════════════════════════
//  10_EventsPage.jsx  —  nav: "Events"
//  > Edit current[] for 2025 events, past{} for 2024/2023 — each event: name, date, status, loc, desc, details[]/res[]
// ════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { createPortal } from "react-dom";
import { C, F } from "./01_theme";
import { Card, Tag, Btn, Divider, PageHdr, SpiritualHero, Om } from "./02_SharedComponents";
import { FeaturedEventPage } from "./08_FeaturedEventPage";


export function EventsPage({ setActivePage }) {
  const [tab, setTab] = useState("parayana2026");
  const [lightbox, setLightbox] = useState(false);

  return (
    <div className="pi">
      <PageHdr title="Events" subtitle="Ramayana Learning & Cultural Programs" accentColor={C.teal} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "44px 24px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 26, background: C.orange5, borderRadius: 8, padding: 4, width: "fit-content", flexWrap: "wrap" }}>
          {[
            ["parayana2026", "⭐ Parayana 2026"],
            ["2025", "2025 Events"],
          ].map(([k, l]) => {
            const isParayana = k === "parayana2026";
            return (
              <button key={k} className="bt" onClick={() => setTab(k)} style={{
                background: tab === k
                  ? isParayana
                    ? `linear-gradient(135deg,${C.orange1},${C.orange2})`
                    : `linear-gradient(135deg,${C.teal},${C.indigo})`
                  : "transparent",
                color: tab === k ? C.white : isParayana ? C.orange1 : C.textMid,
                border: tab !== k && isParayana ? `1.5px solid ${C.orange1}60` : "none",
                borderRadius: 6, padding: "8px 16px",
                fontFamily: "'Poppins', sans-serif", fontSize: 11,
                cursor: "pointer", fontWeight: 700,
                animation: isParayana && tab !== k ? "featuredPulse 2.2s infinite" : "none",
              }}>{l}</button>
            );
          })}
        </div>

        {/* ── Parayana 2026 tab — renders FeaturedEventPage inline ── */}
        {tab === "parayana2026" && (
          <FeaturedEventPage setActivePage={setActivePage} />
        )}

        {tab === "2025" && (
          <div style={{ display: "flex", gap: 20 }}>
            {/* Single poster — clicking opens lightbox */}
            <div
              onClick={() => setLightbox(true)}
              style={{ cursor: "pointer", borderRadius: 12, overflow: "hidden",
                boxShadow: `0 4px 20px rgba(0,0,0,0.12)`, width: 260,
                transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.12)"; }}
            >
              <img src="event2025.png" alt="Events 2025 Poster"
                style={{ width: "100%", display: "block", objectFit: "cover" }} />
            </div>
          </div>
        )}

        {/* ── Lightbox — portal on document.body ── */}
        {lightbox && createPortal(
          <div
            onClick={() => setLightbox(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
              zIndex: 999999, display: "flex", alignItems: "center",
              justifyContent: "center", padding: "clamp(16px,4vw,40px)", cursor: "zoom-out" }}
          >
            <img
              src="event2025.png"
              alt="Events 2025 Poster"
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: "min(90vw, 860px)", maxHeight: "90vh",
                objectFit: "contain", borderRadius: 12,
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)", display: "block", cursor: "default" }}
            />
            <button
              onClick={() => setLightbox(false)}
              style={{ position: "fixed", top: 18, right: 22,
                background: "rgba(255,255,255,0.18)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                color: "#fff", fontSize: 22, cursor: "pointer",
                borderRadius: "50%", width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 1000000 }}
            >×</button>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}

// 