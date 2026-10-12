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

const BRAND_NAME = "VYOMA";
const BRAND_SUBTITLE = "RAMAYANA";

const TAGLINE = "Vyoma Linguistic Labs Foundation — Bringing Ramayana wisdom to modern minds.";

const CONTACT_INFO = [
  { icon: "Email:", text: "support@vyomalabs.in", href: "mailto:support@vyomalabs.in" },
  { icon: "Phone:", text: "+91 94808 65623", href: "tel:+919480865623" },
  { icon: "Location:", text: "View on Maps ↗", href: "https://share.google/Ze3eDmSN3qfqjFRHI" },
  { icon: "Web:", text: "www.vyoma.org", href: "https://www.vyoma.org" },
];

const SOCIAL_LINKS = [
  {
    label: "YouTube", url: "https://www.youtube.com/channel/UCp5mvCwXR-drTRyzNUUjdZg",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" /></svg>,
  },
  {
    label: "Facebook", url: "https://www.facebook.com/Vyomalabs/",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" /></svg>,
  },
  {
    label: "Instagram", url: "https://www.instagram.com/sanskrit_from_home/",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>,
  },
  {
    label: "Twitter / X", url: "https://x.com/VyomaSanskrit",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
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
        padding: "16px 24px 12px",
        marginTop: -44,
        marginLeft: -24,
        marginRight: -24,
        marginBottom: 20,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h3 style={{
            fontFamily: "'Noto Serif', serif", color: C.teal,
            fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textAlign: "center", marginBottom: 10,
          }}>CO-SPONSORS</h3>
          <div style={{
            display: "flex", gap: 24, justifyContent: "center",
            flexWrap: "wrap", alignItems: "center",
          }}>
            {CO_SPONSORS.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 120, height: 50, borderRadius: 8,
                  border: `1px solid ${C.orange4}`,
                  background: C.surface,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                  boxShadow: "0 1px 6px rgba(42,26,10,0.05)",
                }}>
                  {s.src
                    ? <img src={s.src} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 4 }} />
                    : <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 16, color: s.color, letterSpacing: 1 }}>{s.initials}</span>
                  }
                </div>
                <span style={{
                  fontFamily: "'Noto Serif', serif", color: C.textMid,
                  fontSize: 11.5, fontWeight: 500, textAlign: "left", maxWidth: 260, lineHeight: 1.4,
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
                <div style={{ fontFamily: "'Noto Serif', serif", color: C.orange1, fontSize: 14 }}>{BRAND_NAME}</div>
                <div style={{ fontFamily: "'Noto Serif', serif", color: C.teal, fontSize: 9, letterSpacing: 3 }}>{BRAND_SUBTITLE}</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Noto Serif', serif", color: C.textMid, fontSize: 13, lineHeight: 1.7 }}>
              {TAGLINE}
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              {["श्री", "राम", "ॐ", "जय", "राम"].map((s, i) => (
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
            <h4 style={{ fontFamily: "'Noto Serif', serif", color: C.teal, fontSize: 11, marginBottom: 12, letterSpacing: 1 }}>
              QUICK LINKS
            </h4>
            {NAV_ITEMS.map(item => (
              <div key={item} style={{ marginBottom: 6 }}>
                <button className="bt" onClick={() => setActivePage(item)} style={{
                  background: "none", border: "none", color: C.textMid,
                  fontFamily: "'Noto Serif', serif", fontSize: 13, cursor: "pointer", padding: 0,
                }}>→ {item}</button>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Noto Serif', serif", color: C.teal, fontSize: 11, marginBottom: 12, letterSpacing: 1 }}>
              CONTACT
            </h4>
            {CONTACT_INFO.map(({ icon, text, href }) => (
              <div key={icon} style={{ display: "flex", gap: 7, marginBottom: 7, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Noto Serif', serif", color: C.textMid, fontSize: 13, flexShrink: 0 }}>{icon}</span>
                {href
                  ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ fontFamily: "'Noto Serif', serif", color: C.accent, fontSize: 13, textDecoration: "underline", textUnderlineOffset: 2, lineHeight: 1.5 }}>{text}</a>
                  : <span style={{ fontFamily: "'Noto Serif', serif", color: C.textMid, fontSize: 13 }}>{text}</span>
                }
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontFamily: "'Noto Serif', serif", color: C.teal, fontSize: 11, marginBottom: 12, letterSpacing: 1 }}>
              FOLLOW US
            </h4>
            {SOCIAL_LINKS.map(s => (
              <div key={s.label} style={{ marginBottom: 6 }}>
                <button className="bt" onClick={() => window.open(s.url, "_blank", "noopener,noreferrer")} style={{
                  background: "none", border: `1px solid ${C.orange3}`, color: C.textMid,
                  fontFamily: "'Noto Serif', serif", fontSize: 13,
                  cursor: "pointer", padding: "4px 10px", borderRadius: 4,
                  display: "inline-flex", alignItems: "center", gap: 7,
                }}>{s.icon} {s.label}</button>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontFamily: "'Noto Serif', serif", color: C.textMuted, fontSize: 12, textAlign: "center" }}>
          {COPYRIGHT_TEXT}
        </p>
      </div>
    </footer>
  );
}