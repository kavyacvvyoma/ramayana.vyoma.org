// ════════════════════════════════════════════════════════════════════════════
//  13_Getinvolvedpage.jsx  —  nav: "Get Involved"
// ════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, F } from "./01_theme";
import { Card, Btn, Divider, PageHdr } from "./02_SharedComponents";

const VOLUNTEER_URL    = "https://docs.google.com/forms/d/e/1FAIpQLSeqt3AcujP6rvwqMIsA9bemzO058dWIAGqKeYYXoIfNpeDR-g/viewform";
const DONATION_URL = "https://vyoma.org/donors/";
const SCHEMES = [
  { label: "Guru Dakṣiṇā", desc: "Teachers’ contribution", icon: "ti-school", url: "https://vyoma.org/teachers/" },
  { label: "Vidyā Dānam", desc: "Courses contribution", icon: "ti-book-2", url: "https://vyoma.org/education/" },
  { label: "Grantha Dānam", desc: "Books publication & printing", icon: "ti-books", url: "https://vyoma.org/publication/" },
  { label: "Vidyārthī Nidhi", desc: "Scholarship & rewards", icon: "ti-award", url: "https://vyoma.org/scholarship-rewards/" },
  { label: "Samskrit Sabhā Ujjeevanam", desc: "Sabhā revival scheme", icon: "ti-users", url: "https://vyoma.org/sabha-fund/" },
  { label: "Anna Santharpaṇam @ Vyoma Office", desc: "Nourishment program", icon: "ti-tools-kitchen-2", url: "https://vyoma.org/nourishment/" },
  { label: "Vyoma Bala Gurukulam", desc: "A 3-Year after-school immersive experience", icon: "ti-backpack", url: "https://vyoma.org/vsp/" },
  { label: "Events and Projects", desc: "General events contribution", icon: "ti-calendar-event", url: "https://vyoma.org/eventscontribution/" }
];

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
              <div style={{ marginTop: 16 }}>
                <a href="https://vyoma.org/volunteers/" target="_blank" rel="noreferrer"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 13,
                    color: C.brown2,
                    textDecoration: "none"
                  }}
                >
                  For more details, <span style={{ color: C.orange1, textDecoration: "underline", fontWeight: 600 }}>view more</span>
                </a>
              </div>
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
          <Card style={{ borderTop: `3px solid ${C.orange1}`, padding: "28px 24px 36px", textAlign: "center" }}>
            
            {/* Quote Section */}
            <div style={{
              maxWidth: 720,
              margin: "0 auto 20px",
              padding: "16px 24px",
              background: `${C.orange1}04`,
              border: `1px solid ${C.orange1}15`,
              borderRadius: 12,
              boxShadow: `0 4px 20px rgba(200,85,26,0.03)`
            }}>
              <div style={{
                fontFamily: "'Noto Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(15px, 1.8vw, 17px)",
                color: C.brown1,
                lineHeight: 1.6
              }}>
                “Earn with Hundred Hands and Donate with Thousand Hands”
              </div>
            </div>


            <a href={DONATION_URL} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
              <Btn style={{ fontSize: 14, padding: "12px 36px", borderRadius: 30 }}>
                Donate →
              </Btn>
            </a>

            {/* Specific Schemes Grid */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 28 }}>
                <div style={{ width: 24, height: 1, background: C.orange4 }} />
                <h3 style={{
                  fontFamily: "'Cinzel', serif",
                  color: C.brown1,
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase"
                }}>
                  Specific Donation Schemes
                </h3>
                <div style={{ width: 24, height: 1, background: C.orange4 }} />
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 20,
                maxWidth: 1060,
                margin: "0 auto"
              }}>
                {SCHEMES.map((scheme, i) => (
                  <a
                    key={i}
                    href={scheme.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "16px 20px",
                      background: C.surface,
                      borderRadius: 10,
                      border: `1px solid ${C.inkGhost}`,
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.01)"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = C.orange1;
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 6px 18px rgba(200,85,26,0.06)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = C.inkGhost;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.01)";
                    }}
                  >
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      background: `${C.orange1}08`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: C.orange1
                    }}>
                      <i className={`ti ${scheme.icon}`} style={{ fontSize: 18 }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 1, textAlign: "left", flex: 1 }}>
                      <span style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: C.brown1,
                        fontSize: 13,
                        fontWeight: 700,
                        lineHeight: 1.3
                      }}>
                        {scheme.label}
                      </span>
                      <span style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: C.brown2,
                        fontSize: 11,
                        lineHeight: 1.3
                      }}>
                        {scheme.desc}
                      </span>
                    </div>
                    <i className="ti ti-arrow-right" style={{ color: C.orange1, fontSize: 14, flexShrink: 0 }} />
                  </a>
                ))}
              </div>
            </div>

          </Card>
        )}

      </div>
    </div>
  );
}