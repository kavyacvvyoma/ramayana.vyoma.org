// ════════════════════════════════════════════════════════════════════════════
//  10_EventsPage.jsx  —  nav: "Events"
//  > Edit current[] for 2025 events, past{} for 2024/2023 — each event: name, date, status, loc, desc, details[]/res[]
// ════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { createPortal } from "react-dom";
import { C, F } from "./01_theme";
import { Card, Tag, Btn, Divider, PageHdr, SpiritualHero, Om } from "./02_SharedComponents";
import { FeaturedEventPage } from "./09_FeaturedEventPage";


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
            ["parayana2025", "Parayana 2025"],
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

        {tab === "parayana2025" && (
          <FeaturedEventPage setActivePage={setActivePage} year="2025" />
        )}
      </div>
    </div>
  );
}

// 