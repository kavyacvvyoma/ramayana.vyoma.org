// ════════════════════════════════════════════════════════════════════════════
//  02_SharedComponents.jsx  —  REDESIGNED UI ATOMS
//  Fonts: Poppins (body/UI) · Yatra One (hero h1) · Cinzel (section h2/h3)
//  Buttons: uniform tinted transparent bg across all variants
// ════════════════════════════════════════════════════════════════════════════
import { useState, useRef, useCallback } from "react";
import { C, F, BHAJAN_SYMBOLS } from "./01_theme";

// ─── Bhajan Particle Engine ───────────────────────────────────────────────────
function useBhajanParticles() {
  const [particles, setParticles] = useState([]);
  const lastTime = useRef(0);
  const spawnParticle = useCallback((x, y) => {
    const now = Date.now();
    if (now - lastTime.current < 150) return;
    lastTime.current = now;
    const id = now + Math.random();
    const symbol = BHAJAN_SYMBOLS[Math.floor(Math.random() * BHAJAN_SYMBOLS.length)];
    const offsetX = (Math.random() - 0.5) * 50;
    setParticles(p => [...p.slice(-12), { id, x: x + offsetX, y, symbol }]);
    setTimeout(() => setParticles(p => p.filter(pt => pt.id !== id)), 1100);
  }, []);
  return { particles, spawnParticle };
}

function BhajanParticles({ particles }) {
  return (
    <>
      {particles.map(p => (
        <div key={p.id} className="bhajan-particle" style={{ left: p.x, top: p.y - 10 }}>
          <span style={{
            fontFamily: F.devan, fontSize: 12, fontWeight: 700,
            color: C.accent, whiteSpace: "nowrap", opacity: 0.85,
          }}>{p.symbol}</span>
        </div>
      ))}
    </>
  );
}

// ─── SpiritualHero ────────────────────────────────────────────────────────────
export function SpiritualHero({ children, minHeight = "auto", style = {} }) {
  const { particles, spawnParticle } = useBhajanParticles();
  return (
    <div onMouseMove={e => spawnParticle(e.clientX, e.clientY)}
      style={{ position: "relative", minHeight, ...style }}>
      <BhajanParticles particles={particles} />
      {children}
    </div>
  );
}

// ─── Om SVG ──────────────────────────────────────────────────────────────────
export const Om = ({ size = 32, color = C.ink }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <text x="50" y="72" textAnchor="middle" fontSize="70" fill={color} fontFamily="serif">ॐ</text>
  </svg>
);

// ─── Divider ─────────────────────────────────────────────────────────────────
export const Divider = ({ accent = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "12px 0" }}>
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${C.inkGhost})` }} />
    {accent
      ? <span style={{ color: C.accent, fontSize: 13, fontFamily: F.devan, fontWeight: 700, opacity: 0.75 }}>ॐ</span>
      : <span style={{ color: C.inkGhost, fontSize: 11 }}>—</span>
    }
    <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${C.inkGhost})` }} />
  </div>
);

export const AccentRule = () => (
  <div style={{ width: 44, height: 2, background: C.accent, borderRadius: 2, margin: "10px 0 20px", animation: "accentIn 0.5s ease", transformOrigin: "left" }} />
);

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style = {} }) {
  return (
    <div className="hl" style={{
      background: C.cardBg,
      border: `1px solid ${C.inkGhost}`,
      borderRadius: 12,
      padding: "clamp(18px,3vw,26px)",
      position: "relative",
      boxShadow: "0 1px 8px rgba(42,26,10,0.05)",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────
export function Tag({ children }) {
  return (
    <span style={{
      background: C.accentBg, color: C.accent,
      border: `1px solid ${C.accentSoft}`,
      borderRadius: 20, padding: "3px 12px",
      fontSize: 11, fontFamily: F.body, letterSpacing: 0.3, fontWeight: 600,
    }}>{children}</span>
  );
}

// ─── Button — UNIFORM tinted transparent bg across all variants ───────────────
// primary   → accent tinted bg + accent border + accent text
// secondary → green tinted bg + green border + green text
// ghost     → ink tinted bg + ink border + ink text
export function Btn({ children, onClick, variant = "primary", color, style = {} }) {
  const configs = {
    primary:   { col: C.accent, bg: `${C.accent}18`, border: `${C.accent}60` },
    secondary: { col: C.green,  bg: `${C.green}18`,  border: `${C.green}60`  },
    ghost:     { col: C.inkMid, bg: `${C.inkMid}12`, border: `${C.inkGhost}` },
  };
  const cfg = configs[variant] || configs.primary;
  return (
    <button className="bt" onClick={onClick} style={{
      background:    cfg.bg,
      color:         cfg.col,
      border:        `1.5px solid ${cfg.border}`,
      padding:       "9px 22px",
      borderRadius:  6,
      fontFamily:    F.body,
      fontSize:      13,
      letterSpacing: 0.3,
      fontWeight:    600,
      cursor:        "pointer",
      minHeight:     40,
      backdropFilter:"blur(4px)",
      ...style,
    }}>{children}</button>
  );
}

// ─── PageHdr — unified hero header (single source of truth for all pages) ────
// All pages share identical: padding, font-sizes, font-families, accent rule.
// Do NOT override these in individual pages.
export function PageHdr({ title, subtitle }) {
  return (
    <SpiritualHero style={{
      background: C.surface,
      padding: "110px clamp(20px,5vw,48px) 28px",
      textAlign: "center", position: "relative", overflow: "hidden",
      borderBottom: `1px solid ${C.inkGhost}`,
      minHeight: 180,
    }}>
      {/* Saffron top stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.accent }} />
      {/* Devanagari watermark */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: F.devan, fontSize: 160, fontWeight: 700,
        color: C.accent, opacity: 0.03, userSelect: "none", letterSpacing: 8,
      }}>रामायण</div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{
          fontFamily: "'Cinzel', serif",
          color: C.ink,
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: 2,
          lineHeight: 1.2,
          margin: 0,
        }}>{title}</h1>
        {subtitle && (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            color: C.inkLight,
            fontSize: 14,
            marginTop: 8,
            fontStyle: "italic",
            letterSpacing: 0.3,
          }}>{subtitle}</p>
        )}
        <div style={{ width: 40, height: 2, background: C.accent, margin: "14px auto 0", borderRadius: 2 }} />
      </div>
    </SpiritualHero>
  );
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────
export function SectionTitle({ children, center = false }) {
  return (
    <div style={{ marginBottom: 24, textAlign: center ? "center" : "left" }}>
      <h2 style={{ fontFamily: F.heading, color: C.ink, fontSize: "clamp(16px,3vw,22px)", fontWeight: 600, letterSpacing: 1, lineHeight: 1.3 }}>{children}</h2>
      <div style={{ width: 36, height: 2, background: C.accent, borderRadius: 2, marginTop: 8, ...(center ? { margin: "8px auto 0" } : {}) }} />
    </div>
  );
}

// ─── StatPill ─────────────────────────────────────────────────────────────────
export function StatPill({ value, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 24px", gap: 4 }}>
      <span style={{ fontFamily: F.heading, fontSize: "clamp(22px,4vw,32px)", fontWeight: 700, color: C.accent, lineHeight: 1 }}>{value}</span>
      <span style={{ fontFamily: F.body, fontSize: "clamp(10px,1.5vw,12px)", color: C.inkLight, letterSpacing: 0.5, textTransform: "uppercase", textAlign: "center" }}>{label}</span>
    </div>
  );
}

// ─── InfoRow ─────────────────────────────────────────────────────────────────
export function InfoRow({ label, value, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.inkGhost}` }}>
      {icon && <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>}
      <span style={{ fontFamily: F.body, fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 0.5, flexShrink: 0, minWidth: 100, textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontFamily: F.body, fontSize: 14, color: C.inkMid, lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}