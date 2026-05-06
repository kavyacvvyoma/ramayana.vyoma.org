// ════════════════════════════════════════════════════════════════════════════
//  04_Footer.jsx  —  SITE FOOTER
//  > Edit CONTACT_INFO to change address, phone, email, website
//  > Edit SOCIAL_LINKS to add/remove social platforms
//  > Edit TAGLINE and COPYRIGHT_TEXT for branding copy
//  > Edit BRAND_NAME / BRAND_SUBTITLE for logo text
// ════════════════════════════════════════════════════════════════════════════
import { C, F, NAV_ITEMS } from "./01_theme";
import { Om, Divider } from "./02_SharedComponents";

// ── EDITABLE CONTENT ─────────────────────────────────────────────────────────

const BRAND_NAME     = "VYOMA";
const BRAND_SUBTITLE = "RAMAYANA";

const TAGLINE = "Vyoma Linguistic Labs Foundation — Bringing Ramayana wisdom to modern minds.";

const CONTACT_INFO = [
  { icon: "Email:", text: "support@vyomalabs.in" },
  { icon: "Phone:", text: "+91 94808 65623" },
  { icon: "Location:", text: "84, NGEF Layout Main Rd, opposite to Fortis hospital, NGEF Layout, Stage 2, Naagarabhaavi, Bengaluru, Karnataka 560072" },
  { icon: "Web:", text: "www.vyoma.org" },
];

const SOCIAL_LINKS = [
  { label: "YouTube",     url: "https://www.youtube.com/channel/UCp5mvCwXR-drTRyzNUUjdZg" },
  { label: "Facebook",    url: "https://www.facebook.com/Vyomalabs/" },
  { label: "Instagram",   url: "https://www.instagram.com/sanskrit_from_home/" },
  { label: "Twitter / X", url: "https://x.com/VyomaSanskrit" },
];

const COPYRIGHT_TEXT = "© 2025 Vyoma Linguistic Labs Foundation · All rights reserved · रामो विग्रहवान् धर्मः ";

// ── CO-SPONSORS — replace src with actual logo paths, update name ─────────────
const CO_SPONSORS = [
  {
    name: "Pythagoras Technology Solutions LLP",
    src: "/pythagoras-logo-1.jpg",
    initials: "PT",
    color: "#2D6A4F",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export function Footer({ setActivePage }) {
  return (
    <footer style={{
      background: `linear-gradient(135deg,${C.orange5},${C.orange6})`,
      borderTop: `3px solid ${C.orange4}`,
      padding: "44px 24px 20px", marginTop: 52,
    }}>
      {/* Single saffron accent line */}
      <div style={{
        height: 3, marginTop: -3, marginBottom: 32,
        background: C.accent,
      }} />

      {/* ══ CO-SPONSORS BAND ══════════════════════════════════════════════════ */}
      <div style={{
        background: C.cardBg,
        borderBottom: `1px solid ${C.orange4}`,
        padding: "28px 24px",
        marginTop: -44,
        marginLeft: -24,
        marginRight: -24,
        marginBottom: 36,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif", color: C.teal,
            fontSize: 24, letterSpacing: 1, textAlign: "center", marginBottom: 20,
          }}>CO-SPONSORS</h1>
          <div style={{
            display: "flex", gap: 40, justifyContent: "center",
            flexWrap: "wrap", alignItems: "flex-start",
          }}>
            {CO_SPONSORS.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 160, height: 100, borderRadius: 12,
                  border: `1.5px solid ${C.orange4}`,
                  background: C.surface,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(42,26,10,0.08)",
                }}>
                  {s.src
                    ? <img src={s.src} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 12 }} />
                    : <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 22, color: s.color, letterSpacing: 1 }}>{s.initials}</span>
                  }
                </div>
                <span style={{
                  fontFamily: "'Poppins', sans-serif", color: C.textMid,
                  fontSize: 11, textAlign: "center", maxWidth: 130, lineHeight: 1.5,
                }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(195px,1fr))",
          gap: 30, marginBottom: 28,
        }}>

          {/* Brand column */}
          <div>
            <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 12 }}>
              <Om size={32} color={C.orange1} />
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", color: C.orange1, fontSize: 14 }}>{BRAND_NAME}</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", color: C.teal, fontSize: 9, letterSpacing: 3 }}>{BRAND_SUBTITLE}</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Poppins', sans-serif", color: C.textMid, fontSize: 13, lineHeight: 1.7 }}>
              {TAGLINE}
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["श्री","राम","ॐ","जय","राम"].map((s, i) => (
                <span key={i} className="twinkle" style={{
                  fontFamily: "'Noto Serif Devanagari', serif",
                  fontSize: 14, fontWeight: 700, color: C.orange1,
                  animationDelay: `${i * 0.3}s`,
                }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", color: C.teal, fontSize: 11, marginBottom: 12, letterSpacing: 1 }}>
              QUICK LINKS
            </h4>
            {NAV_ITEMS.map(item => (
              <div key={item} style={{ marginBottom: 6 }}>
                <button className="bt" onClick={() => setActivePage(item)} style={{
                  background: "none", border: "none", color: C.textMid,
                  fontFamily: "'Poppins', sans-serif", fontSize: 13, cursor: "pointer", padding: 0,
                }}>→ {item}</button>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", color: C.teal, fontSize: 11, marginBottom: 12, letterSpacing: 1 }}>
              CONTACT
            </h4>
            {CONTACT_INFO.map(({ icon, text }) => (
              <div key={icon} style={{ display: "flex", gap: 7, marginBottom: 7, alignItems: "center" }}>
                <span>{icon}</span>
                <span style={{ fontFamily: "'Poppins', sans-serif", color: C.textMid, fontSize: 13 }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontFamily: "'Poppins', sans-serif", color: C.teal, fontSize: 11, marginBottom: 12, letterSpacing: 1 }}>
              FOLLOW US
            </h4>
            {SOCIAL_LINKS.map(s => (
              <div key={s.label} style={{ marginBottom: 6 }}>
                <button className="bt" onClick={() => window.open(s.url, "_blank", "noopener,noreferrer")} style={{
                  background: "none", border: `1px solid ${C.orange3}`, color: C.textMid,
                  fontFamily: "'Poppins', sans-serif", fontSize: 13,
                  cursor: "pointer", padding: "3px 10px", borderRadius: 4,
                }}> {s.label}</button>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontFamily: "'Poppins', sans-serif", color: C.textMuted, fontSize: 12, textAlign: "center" }}>
          {COPYRIGHT_TEXT}
        </p>
      </div>
    </footer>
  );
}