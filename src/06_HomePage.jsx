// ════════════════════════════════════════════════════════════════════════════
//  LandingPage.jsx  —  PORTAL PAGE
//  10 hex tiles: 5 top + 5 bottom
// ════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react";

// ── Tile definitions — ordered as requested ───────────────────────────────
// type: "page"  → calls setActivePage(key)
// type: "modal" → opens the WhatsApp modal
const TILES = [
  { key: "About Ramayana", label: "Know Rāmāyaṇa", sub: "About Rāmāyaṇa", type: "page", icon: "ti-info-circle", border: "#C8551A", fill: "#FBE8DA", labelColor: "#8B3510" },
  // { key: "__whatsapp__", label: "Join Nithya Parayana", sub: "WhatsApp groups", type: "modal", icon: "ti-brand-whatsapp", border: "#2D7A4A", fill: "#D9F2E3", labelColor: "#1A4D2E" },
  { key: "YT Shlokas", label: "Daily Satsaṅga", sub: "Video chanting", type: "page", icon: "ti-brand-youtube", border: "#D32F2F", fill: "#FFEBEE", labelColor: "#B71C1C", highlight: true },
  // { key: "Shlokas", label: "Audio Shlokas", sub: "Listen to audio", type: "page", icon: "ti-music", border: "#C9900C", fill: "#FDF3D4", labelColor: "#6B4C06" },
  {
    key: "Learn", label: "Learn Rāmāyaṇa", sub: "Courses & offerings", type: "page", icon: "ti-book-2", border: "#B8841A", fill: "#FBEFD8", labelColor: "#6B4A0A"
  },
  { key: "Resources", label: "Resources", sub: "Shlokas & audio", type: "page", icon: "ti-books", border: "#B84A18", fill: "#FAE4DA", labelColor: "#7A2E0E" },
  // { key: "Get Certified", label: "Get Certified", sub: "Quiz & rewards", type: "page", icon: "ti-trophy", border: "#C07A12", fill: "#FDECD4", labelColor: "#6B430A" },
  { key: "Events", label: "Events", sub: "Pārāyaṇa & programs", type: "page", icon: "ti-calendar-event", border: "#A86820", fill: "#FAEAD8", labelColor: "#5E3A10" },
  // { key: "Get Involved", label: "Get Involved", sub: "Volunteer & sponsor", type: "page", icon: "ti-heart-handshake", border: "#C8551A", fill: "#FBE8DA", labelColor: "#8B3510" },
  // { key: "Gallery", label: "Gallery", sub: "Photo moments", type: "page", icon: "ti-photo", border: "#D4820A", fill: "#FDEFD4", labelColor: "#7A4A05" },
];

const WA_LINKS = [
  { label: "Nithya Parayana Group 1", url: "https://chat.whatsapp.com/LvYDaHEWXzU1ZoShqUC2PH" },
  { label: "Nithya Parayana Group 2", url: "https://chat.whatsapp.com/LvYDaHEWXzU1ZoShqUC2PH" },
];

// ── Scoped CSS ────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');

@keyframes lp-down    { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
@keyframes lp-up      { from{opacity:0;transform:translateY(18px)}  to{opacity:1;transform:translateY(0)} }
@keyframes lp-hexIn   { from{opacity:0;transform:scale(0.74) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes lp-shim    { 0%{background-position:200% center} 100%{background-position:-200% center} }
@keyframes lp-drift   { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.03) rotate(3deg)} }
@keyframes lp-modalIn { from{opacity:0;transform:scale(0.92) translateY(12px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes lp-glowPulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.15); opacity: 0; } }

.lp-hdr { animation: lp-down 0.45s cubic-bezier(0.22,1,0.36,1) both; }
.lp-vol { transition: all 0.2s ease; }
.lp-vol:hover { filter:brightness(1.05); transform:translateY(-2px) scale(1.02); background: rgba(42,26,10,0.08) !important; }

.lp-hex-border, .lp-hex-fill {
  position: absolute; inset: 0;
  clip-path: polygon(48% 2%,52% 2%,98% 26%,98% 74%,52% 98%,48% 98%,2% 74%,2% 26%);
}
.lp-hex-fill { inset: 3px; }

.lp-hex-wrap {
  position: relative;
  transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), filter 0.45s ease;
  will-change: transform;
}
.lp-hex-wrap:hover { transform: translateY(-6px) scale(1.04); filter: brightness(1.06); }

.lp-hex-inner {
  position: absolute; inset: 0;
  clip-path: polygon(48% 2%,52% 2%,98% 26%,98% 74%,52% 98%,48% 98%,2% 74%,2% 26%);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
}

.lp-title {
  background: linear-gradient(90deg,#C8551A 0%,#E07035 22%,#8B1A1A 44%,#C8551A 66%,#E07035 88%,#8B1A1A 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: lp-shim 6s linear infinite;
}

.lp-mandala {
  position: fixed; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: min(100vw, 900px); height: min(100vw, 900px);
  opacity: 0.025; pointer-events: none;
  animation: lp-drift 22s ease-in-out infinite;
}

.lp-modal-card { animation: lp-modalIn 0.28s cubic-bezier(0.22,1,0.36,1) both; }

.lp-wa-row {
  display: flex; align-items: center; gap: 10px;
  padding: 13px 0; border-bottom: 1px solid rgba(0,0,0,0.07);
}
.lp-wa-row:last-child { border-bottom: none; }

.lp-copy-btn {
  background: none; border: 1px solid rgba(0,0,0,0.15); border-radius: 6px;
  padding: 4px 10px; cursor: pointer; font-size: 11px; color: #666;
  transition: all 0.18s ease; white-space: nowrap; flex-shrink: 0;
  font-family: -apple-system, 'Segoe UI', sans-serif;
}
.lp-copy-btn:hover { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.25); }
.lp-copy-btn.lp-copied { border-color: #2D7A4A; color: #2D7A4A; background: rgba(45,122,74,0.06); }

@media (max-width: 850px) {
  .lp-hdr {
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 12px 20px !important;
    padding: 14px 20px !important;
  }
  .lp-logo-col {
    flex: 0 0 auto !important;
    justify-content: center !important;
  }
  .lp-title-col {
    flex: 0 0 auto !important;
    text-align: center !important;
  }
  .lp-vol-col {
    flex: 1 0 100% !important;
    justify-content: center !important;
    margin-top: 4px !important;
  }
}

@media (max-width: 520px) {
  .lp-hdr {
    flex-direction: column !important;
    align-items: center !important;
    gap: 10px !important;
    padding: 12px 14px !important;
  }
  .lp-logo-col {
    width: 100% !important;
    justify-content: center !important;
  }
  .lp-title-col {
    width: 100% !important;
    text-align: center !important;
  }
  .lp-vol-col {
    width: 100% !important;
    justify-content: center !important;
  }
}
`;

// ── Mandala decorative bg ─────────────────────────────────────────────────
function Mandala() {
  return (
    <svg className="lp-mandala" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      {[50, 100, 150, 200, 260, 330, 400].map((r, i) => (
        <circle key={i} cx={400} cy={400} r={r} fill="none"
          stroke="#C8551A" strokeWidth={i % 2 === 0 ? 1.4 : 0.6} />
      ))}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * 22.5) * Math.PI / 180;
        return <line key={i} x1={400} y1={400}
          x2={400 + 400 * Math.cos(a)} y2={400 + 400 * Math.sin(a)}
          stroke="#C8551A" strokeWidth={0.5} />;
      })}
      {[80, 160, 240].map((r, ri) =>
        Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45) * Math.PI / 180;
          return <circle key={`${ri}-${i}`}
            cx={400 + r * Math.cos(a)} cy={400 + r * Math.sin(a)}
            r={5 + ri * 2} fill="none" stroke="#C8551A" strokeWidth={0.7} />;
        })
      )}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45) * Math.PI / 180;
        const cx = 400 + 30 * Math.cos(a), cy = 400 + 30 * Math.sin(a);
        return <ellipse key={`p${i}`} cx={cx} cy={cy} rx={14} ry={7}
          transform={`rotate(${i * 45 + 90},${cx},${cy})`}
          fill="none" stroke="#C8551A" strokeWidth={0.8} />;
      })}
    </svg>
  );
}

// ── WhatsApp Modal ────────────────────────────────────────────────────────
function WhatsAppModal({ onClose }) {
  const [copied, setCopied] = useState(null);

  const handleCopy = (url, idx) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 2200);
    });
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(20,10,5,0.52)",
        backdropFilter: "blur(5px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        className="lp-modal-card"
        onClick={e => e.stopPropagation()}
        style={{
          background: "#FFFBF6",
          borderRadius: 18,
          padding: "28px 28px 20px",
          maxWidth: 430, width: "100%",
          boxShadow: "0 28px 64px rgba(0,0,0,0.18)",
          border: "1px solid rgba(200,85,26,0.14)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(0,0,0,0.06)", border: "none", borderRadius: 8,
          width: 30, height: 30, cursor: "pointer", fontSize: 18,
          color: "#666", display: "flex", alignItems: "center", justifyContent: "center",
          lineHeight: 1,
        }}>×</button>

        {/* Modal header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "#25D36618",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <i className="ti ti-brand-whatsapp" style={{ fontSize: 24, color: "#25D366" }} />
          </div>
          <div>
            <div style={{
              fontFamily: "-apple-system, 'Segoe UI', sans-serif",
              fontWeight: 700, fontSize: 17, color: "#1A1A1A", lineHeight: 1.2,
            }}>
              Join Nithya Parayana
            </div>
            <div style={{
              fontFamily: "-apple-system, 'Segoe UI', sans-serif",
              fontSize: 12, color: "#999", marginTop: 3,
            }}>
              Tap a group link to join on WhatsApp
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "16px 0 4px" }} />

        {/* Group links */}
        {WA_LINKS.map((link, idx) => (
          <div key={idx} className="lp-wa-row">
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(45,122,74,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <i className="ti ti-users" style={{ fontSize: 16, color: "#2D7A4A" }} />
            </div>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              style={{
                flex: 1,
                fontFamily: "-apple-system, 'Segoe UI', sans-serif",
                fontSize: 14, fontWeight: 600,
                color: "#2D7A4A", textDecoration: "none",
              }}
            >
              {link.label}
            </a>
            <button
              className={`lp-copy-btn${copied === idx ? " lp-copied" : ""}`}
              onClick={() => handleCopy(link.url, idx)}
            >
              {copied === idx ? "✓ Copied!" : "Copy link"}
            </button>
          </div>
        ))}

        <div style={{
          marginTop: 14, textAlign: "center",
          fontFamily: "-apple-system, 'Segoe UI', sans-serif",
          fontSize: 11, color: "#C0C0C0",
        }}>
          Press Esc or click outside to close
        </div>
      </div>
    </div>
  );
}

// ── Single hex tile ───────────────────────────────────────────────────────
function HexTile({ tile, onPageClick, onModalClick, delay }) {
  const w = "clamp(130px, 14.5vw, 175px)";
  const h = "clamp(148px, 16.5vw, 200px)";

  const handleClick = () => {
    if (tile.type === "modal") onModalClick();
    else onPageClick(tile.key);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        cursor: "pointer", gap: 10, userSelect: "none",
        position: "relative",
        animation: `lp-hexIn 0.52s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
      }}
    >
      {tile.highlight && (
        <div style={{
          position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
          background: tile.border, color: "#FFF", fontSize: "clamp(8px, 0.8vw, 10px)", fontWeight: 700,
          padding: "3px 10px", borderRadius: 12, zIndex: 10, letterSpacing: 1,
          boxShadow: `0 3px 8px ${tile.border}60`, whiteSpace: "nowrap"
        }}>
          ONGOING
        </div>
      )}
      <div className="lp-hex-wrap" style={{ width: w, height: h, filter: tile.highlight ? `drop-shadow(0 4px 12px ${tile.border}50)` : "none" }}>
        <div className="lp-hex-border" style={{ background: tile.border }} />
        <div className="lp-hex-fill" style={{ background: tile.fill }} />
        <div className="lp-hex-inner">
          <i
            className={`ti ${tile.icon}`}
            style={{ fontSize: "clamp(22px,2.6vw,32px)", color: tile.border, lineHeight: 1 }}
          />
          <span style={{
            fontFamily: "-apple-system, 'Segoe UI', sans-serif",
            fontWeight: 700,
            color: tile.labelColor,
            fontSize: "clamp(11.5px, 1.1vw, 14.5px)",
            letterSpacing: 0.6,
            textAlign: "center",
            padding: "0 8px",
            lineHeight: 1.3,
            textTransform: "uppercase",
          }}>
            {tile.label}
          </span>
        </div>
      </div>

      {/* 
      <span style={{
        fontFamily: "-apple-system, 'Segoe UI', sans-serif",
        fontSize: "clamp(13px, 1.2vw, 15px)",
        color: "#7A5030", fontWeight: 400,
        textAlign: "center",
        maxWidth: "clamp(100px, 12vw, 140px)",
        lineHeight: 1.5,
      }}>
        {tile.sub}
      </span>
      */}
    </div>
  );
}

// ── Landing page root ─────────────────────────────────────────────────────
export function LandingPage({ setActivePage }) {
  const [rdy, setRdy] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRdy(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setShowModal(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const row1 = TILES.slice(0, 5);
  const row2 = TILES.slice(5);

  return (
    <div style={{
      minHeight: "100svh", background: "#FDFAF4",
      display: "flex", flexDirection: "column",
      overflowX: "hidden", position: "relative",
    }}>
      <style>{CSS}</style>
      <Mandala />

      {/* ══ HEADER BAR ══════════════════════════════════════════════════ */}
      <header className="lp-hdr" style={{
        position: "relative", zIndex: 10,
        background: "rgba(253,250,244,0.97)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(200,85,26,0.16)",
        boxShadow: "0 2px 18px rgba(200,85,26,0.07)",
        padding: "clamp(12px,1.3vw,14px) clamp(14px,4vw,40px)",
        minHeight: "clamp(58px,8vh,66px)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
      }}>
        {/* Left Side: Logo */}
        <div className="lp-logo-col" style={{ flex: 1, display: "flex", justifyContent: "flex-start", minWidth: 0 }}>
          <div
            style={{
              display: "flex", alignItems: "center",
              flexShrink: 0,
              background: "rgba(224,102,25,0.85)",
              borderRadius: 10,
              padding: "6px 10px",
              boxShadow: "0 4px 12px rgba(200,85,26,0.25)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              overflow: "visible",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(200,85,26,0.38)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(200,85,26,0.25)"; }}
          >
            <img
              src="/logo_white.png"
              alt="Vyoma Rāmāyaṇa"
              style={{ maxHeight: 44, width: "auto", display: "block", filter: "brightness(1.1)", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Center: Title */}
        <div className="lp-title-col" style={{ flex: "none", textAlign: "center" }}>
          <h1 className="lp-title" style={{
            fontFamily: "'Noto Serif',serif",
            fontSize: "clamp(15px,3vw,28px)", lineHeight: 1.4, margin: 0,
            letterSpacing: "clamp(0.5px,0.3vw,2px)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            Vyoma Rāmāyaṇa Resources
          </h1>
        </div>

        {/* Right Side: Volunteer Button */}
        <div className="lp-vol-col" style={{ flex: 1, display: "flex", justifyContent: "flex-end", minWidth: 0 }}>
          <div onClick={() => setActivePage("Get Involved")} style={{ textDecoration: "none", flexShrink: 0 }}>
            <button className="lp-vol" style={{
              background: "rgba(42,26,10,0.04)", backdropFilter: "blur(4px)",
              color: "#4A2C14", border: "none",
              padding: "clamp(8px,1.2vw,12px) clamp(14px,2.5vw,26px)",
              borderRadius: 100, fontFamily: "'Noto Serif',serif",
              fontSize: "clamp(11px,1.3vw,14px)", fontWeight: 600,
              letterSpacing: 0.3, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
            }}>
              ✦ Get involved in Rāmasevā
            </button>
          </div>
        </div>
      </header>

      {/* ══ HEX TILE GRID ═══════════════════════════════════════════════ */}
      <main style={{
        flex: 1, position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "clamp(28px,4vw,48px) clamp(16px,4vw,32px) clamp(32px,5vw,52px)",
      }}>
        {/* Eyebrow */}
        <div style={{
          textAlign: "center", marginBottom: "clamp(20px,3vw,34px)",
          opacity: rdy ? 1 : 0,
          animation: rdy ? "lp-up 0.45s 0.08s ease both" : "none",
        }}>
          <p style={{
            fontFamily: "-apple-system, 'Segoe UI', sans-serif",
            fontSize: "clamp(8px,1.1vw,10px)", letterSpacing: 3,
            color: "#A87850", textTransform: "uppercase", fontWeight: 600, marginBottom: 8,
          }}>
            Select a section to explore
          </p>
          <div style={{ width: 32, height: 2, background: "#C8551A", borderRadius: 2, margin: "0 auto" }} />
        </div>

        {/* Row 1 — 5 tiles */}
        <div style={{
          display: "flex", gap: "clamp(8px,1.8vw,20px)",
          justifyContent: "center", flexWrap: "wrap", width: "100%",
        }}>
          {row1.map((tile, i) => (
            <HexTile key={tile.key} tile={tile}
              onPageClick={setActivePage}
              onModalClick={() => setShowModal(true)}
              delay={0.12 + i * 0.07}
            />
          ))}
        </div>

        <div style={{ height: "clamp(20px,3.5vw,42px)" }} />

        {/* Row 2 — 5 tiles */}
        <div style={{
          display: "flex", gap: "clamp(8px,1.8vw,20px)",
          justifyContent: "center", flexWrap: "wrap", width: "100%",
        }}>
          {row2.map((tile, i) => (
            <HexTile key={tile.key} tile={tile}
              onPageClick={setActivePage}
              onModalClick={() => setShowModal(true)}
              delay={0.47 + i * 0.07}
            />
          ))}
        </div>


      </main>

      {/* ══ WHATSAPP MODAL ══════════════════════════════════════════════ */}
      {showModal && <WhatsAppModal onClose={() => setShowModal(false)} />}
    </div>
  );
}