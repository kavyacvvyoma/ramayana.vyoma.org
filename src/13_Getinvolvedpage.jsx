// ════════════════════════════════════════════════════════════════════════════
//  13_Getinvolvedpage.jsx  —  nav: "Get Involved"
// ════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, F } from "./01_theme";
import { Card, Btn, Divider, PageHdr } from "./02_SharedComponents";

const VOLUNTEER_URL    = "https://vyoma.org/volunteers/";
const SPONSORSHIP_URL  = "https://vyoma-linguistic-labs-foundation.danamojo.org/dm/valmiki-ramayana-navaha-udayastamana-parayana-20th-march-to-29th-march-2026-10720";

export function GetInvolvedPage() {
  const [tab, setTab] = useState("volunteer");

  return (
    <div className="pi">

      <PageHdr title="Get Involved" subtitle="Join the Vyoma Ramayana mission — as a volunteer or a sponsor" />

      {/* ── Tabs + Content ── */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "40px 24px 64px" }}>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 0,
          borderBottom: `2px solid ${C.orange4}`, marginBottom: 32 }}>
          {[["volunteer","Volunteer"],["sponsorship","Sponsorship"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className="bt"
              style={{
                background: tab === key ? `${C.orange1}10` : "transparent",
                border: "none",
                borderBottom: `3px solid ${tab === key ? C.orange1 : "transparent"}`,
                color: tab === key ? C.orange1 : C.brown2,
                fontFamily: "'Poppins',sans-serif",
                fontSize: 16, fontWeight: tab === key ? 700 : 400,
                padding: "12px 32px", cursor: "pointer",
                letterSpacing: 0.4, transition: "all 0.2s", marginBottom: -2,
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* Volunteer */}
        {tab === "volunteer" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 24, alignItems: "start" }}>

            {/* Left card — Join as Volunteer */}
            <Card style={{ borderTop: `3px solid ${C.orange1}`, textAlign: "center", padding: "36px 32px" }}>
              <div style={{ fontFamily: "'Noto Serif Devanagari',serif",
                color: C.orange1, fontSize: 32, marginBottom: 16 }}>ॐ</div>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", color: C.brown1,
                fontSize: 20, marginBottom: 14 }}>Become a Volunteer</h2>
              <Divider accent />
              <p style={{ fontFamily: "'Poppins',sans-serif", color: C.brown2,
                fontSize: 15, lineHeight: 1.8, margin: "18px auto", maxWidth: 480 }}>
                Volunteer with Vyoma to support Rāmāyaṇa outreach, events, and learning programmes.
                Your time and skills can help thousands discover the wisdom of the Rāmāyaṇa.
              </p>
              <a href={VOLUNTEER_URL} target="_blank" rel="noreferrer"
                style={{ textDecoration: "none" }}>
                <Btn style={{ fontSize: 13, padding: "12px 32px" }}>
                  Join as Volunteer →
                </Btn>
              </a>
            </Card>

            {/* Right card — Volunteer Projects */}
            <div style={{ background: C.surface, border: `1px solid ${C.inkGhost}`, borderRadius: 12, padding: "28px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 3, height: 22, background: C.accent, borderRadius: 2, flexShrink: 0 }} />
                <h3 style={{ fontFamily: "'Cinzel', serif", color: C.ink, fontSize: "clamp(13px,2vw,16px)", fontWeight: 600, letterSpacing: 0.5 }}>
                  Volunteer Projects
                </h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {[
                  "Srimad Valmiki Ramayana E-book — Moola in Kannada",
                  "Srimad Valmiki Ramayana E-book — Moola in IAST",
                  "Srimad Valmiki Ramayana E-book — Moola in Tamil",
                  "Srimad Valmiki Ramayana E-book — Moola in Telugu",
                  "Srimad Valmiki Ramayana E-book — Moola in Malayalam",
                  "Tulsidas Ramacharitamanas Companion — A Comprehensive Learning Product",
                ].map((project, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "10px 14px", background: C.cardBg, borderRadius: 8, border: `1px solid ${C.inkGhost}` }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0, minWidth: 20, paddingTop: 2 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "'Poppins', sans-serif", color: C.inkMid, fontSize: "clamp(12px,1.8vw,14px)", lineHeight: 1.6 }}>
                      {project}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ background: C.accentBg, border: `1px solid ${C.accentSoft}`, borderRadius: 8, padding: "14px 18px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", color: C.inkMid, fontSize: "clamp(12px,1.8vw,14px)", lineHeight: 1.7, marginBottom: 8 }}>
                  If you wish to contribute to the above projects, kindly write to us at
                </p>
                <a href="mailto:support@vyomalabs.in" style={{ fontFamily: "'Poppins', sans-serif", color: C.accent, fontSize: "clamp(13px,2vw,15px)", fontWeight: 700, textDecoration: "none", letterSpacing: 0.3 }}>
                  support@vyomalabs.in →
                </a>
              </div>
            </div>

          </div>
        )}

        {/* Sponsorship */}
        {tab === "sponsorship" && (
          <Card style={{ borderTop: `3px solid ${C.orange1}`, textAlign: "center", padding: "36px 32px" }}>
            <div style={{ fontFamily: "'Noto Serif Devanagari',serif",
              color: C.orange1, fontSize: 32, marginBottom: 16 }}>ॐ</div>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", color: C.brown1,
              fontSize: 20, marginBottom: 14 }}>Sponsor the Parayana</h2>
            <Divider accent />
            <p style={{ fontFamily: "'Poppins',sans-serif", color: C.brown2,
              fontSize: 15, lineHeight: 1.8, margin: "18px auto", maxWidth: 480 }}>
              Support the Vālmīki Rāmāyaṇa Navāha Pārāyaṇa (20–29 March 2026)
              and be part of this sacred yajña. Your sponsorship directly enables this divine event.
            </p>
            <a href={SPONSORSHIP_URL} target="_blank" rel="noreferrer"
              style={{ textDecoration: "none" }}>
              <Btn style={{ fontSize: 13, padding: "12px 32px" }}>
                Sponsor Now →
              </Btn>
            </a>
          </Card>
        )}

      </div>
    </div>
  );
}