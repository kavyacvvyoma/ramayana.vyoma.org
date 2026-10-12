// ════════════════════════════════════════════════════════════════════════════
//  03_Navbar.jsx  —  TOP NAVIGATION BAR  (Fully Responsive + Audio Player)
//  Breakpoints:
//    Mobile  : < 640px   → hamburger menu, full-screen drawer
//    Tablet  : 640–1024px → hamburger menu, compact drawer
//    Desktop : 1024–1440px → full nav bar
//    TV/Wide : > 1440px  → full nav bar, larger type
//  > Edit brand name / tagline in the Logo section below
//  > Add/remove nav items in 01_theme.js → NAV_ITEMS
//  > Toggle featured event tab in 01_theme.js → FEATURED_EVENT_ACTIVE
//  > Audio: place SriRamaJayaRama.mp3 in your /public folder
//  > Audio volume: edit AUDIO_VOLUME constant below (0.0 – 1.0)
// ════════════════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { C, F, ALL_NAV, FEATURED_EVENT_LABEL } from "./01_theme";

// ── Audio config ───────────────────────────────────────────────────────────
const AUDIO_SRC = "/SriRamaJayaRama.mp3";
const AUDIO_VOLUME = 0.12;   // very mild — 0.0 (silent) to 1.0 (full)

// ── Audio SVG icons ────────────────────────────────────────────────────────
const IconPlay = ({ size = 10, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const IconPause = ({ size = 10, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <rect x="5" y="3" width="4" height="18" rx="1" />
    <rect x="15" y="3" width="4" height="18" rx="1" />
  </svg>
);
const IconMusic = ({ size = 11, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

// ── Responsive hook ────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    return w < 640 ? "mobile" : w < 1024 ? "tablet" : w < 1920 ? "desktop" : "tv";
  });
  useEffect(() => {
    const fn = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : w < 1920 ? "desktop" : "tv");
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return bp;
}

// ── Hamburger icon ─────────────────────────────────────────────────────────
function HamburgerIcon({ open, color }) {
  const bar = (top, rotate, translateY, opacity = 1) => ({
    display: "block",
    width: 22, height: 2.5,
    background: color, borderRadius: 2,
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    transformOrigin: "center",
    transform: `translateY(${translateY}px) rotate(${rotate}deg)`,
    opacity,
    marginBottom: top === 0 ? 5 : top === 1 ? 5 : 0,
  });
  return (
    <div style={{ width: 22, height: 17, position: "relative", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <span style={bar(0, open ? 45 : 0, open ? 7.5 : 0)} />
      <span style={bar(1, 0, 0, open ? 0 : 1)} />
      <span style={bar(2, open ? -45 : 0, open ? -7.5 : 0)} />
    </div>
  );
}

// ── Mobile/Tablet Drawer ───────────────────────────────────────────────────
function MobileDrawer({ open, onClose, activePage, setActivePage, bp, audioPlaying, onToggleAudio }) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const drawerWidth = bp === "mobile" ? "100vw" : "320px";

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 1100,
        background: "rgba(10,10,30,0.55)", backdropFilter: "blur(4px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }} />

      {/* Drawer panel */}
      <div ref={drawerRef} style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: drawerWidth, zIndex: 1200,
        background: "rgba(255,252,248,0.98)", backdropFilter: "blur(20px)",
        borderLeft: `3px solid ${C.orange4}`,
        boxShadow: `-8px 0 40px ${C.indigo}30`,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>
        {/* Top stripe — single saffron line */}
        <div style={{ height: 3, flexShrink: 0, background: C.accent }} />

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-equally",
          padding: "16px 20px", borderBottom: `1px solid ${C.orange4}60`, flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo_white.png"
              alt="Vyoma Ramayana"
              style={{ height: 38, width: "auto", display: "block" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Audio button inside drawer header */}
            <button onClick={onToggleAudio} title={audioPlaying ? "Pause chanting" : "Play chanting"}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                background: audioPlaying ? `${C.accent}15` : `${C.green1}10`,
                border: `1.5px solid ${audioPlaying ? C.accent : C.green1}55`,
                borderRadius: 16, padding: "5px 10px",
                cursor: "pointer", transition: "all 0.2s",
              }}>
              <IconMusic size={11} color={audioPlaying ? C.accent : C.green1} />
              <span style={{
                fontFamily: F.body, fontSize: 10,
                color: audioPlaying ? C.accent : C.green1, fontWeight: 600
              }}>
                {audioPlaying ? "ON" : "OFF"}
              </span>
              {audioPlaying
                ? <IconPause size={9} color={C.accent} />
                : <IconPlay size={9} color={C.green1} />}
            </button>
            <button onClick={onClose} aria-label="Close menu"
              style={{
                background: `${C.orange4}40`, border: "none", borderRadius: 8,
                width: 36, height: 36, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.textMid, fontSize: 20, lineHeight: 1,
              }}>×</button>
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {ALL_NAV.map((item, idx) => {
            const isFeatured = item === FEATURED_EVENT_LABEL;
            const isActive = activePage === item;
            return (
              <button key={item}
                onClick={() => { setActivePage(item); onClose(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  width: "100%", padding: "14px 24px",
                  background: isFeatured
                    ? `${C.accent}10`
                    : isActive ? `${C.accent}10` : "none",
                  border: "none",
                  borderLeft: isFeatured
                    ? `3px solid ${C.accent}`
                    : isActive ? `3px solid ${C.accent}` : "3px solid transparent",
                  color: isFeatured ? C.accent : isActive ? C.accent : C.textMid,
                  fontFamily: F.body,
                  fontSize: 13, fontWeight: isActive || isFeatured ? 700 : 400,
                  cursor: "pointer", textAlign: "left", letterSpacing: 0.4,
                  transition: "all 0.2s",
                  animation: open ? `fadeUp 0.3s ease ${idx * 0.04}s both` : "none",
                }}>
                {isFeatured && (
                  <span style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: C.accent,
                    borderRadius: 4, padding: "2px 8px",
                    color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                    whiteSpace: "nowrap",
                  }}>LIVE</span>
                )}
                {item}
              </button>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.orange4}60`, flexShrink: 0 }}>
          <p style={{
            fontFamily: F.body,
            color: C.textLight, fontSize: 11, textAlign: "center", lineHeight: 1.6
          }}>
            Sanatana Dharma Samrakshana Parishad®<br />Vyoma Linguistic Labs
          </p>
        </div>
      </div>
    </>
  );
}

// ── Audio Button — icon-only pill, same on ALL screen sizes ───────────────
function AudioButton({ playing, onToggle, isTV }) {
  return (
    <button onClick={onToggle}
      title={playing ? "Pause Śrī Rāma Jaya Rāma chanting" : "Play Śrī Rāma Jaya Rāma chanting"}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        background: playing ? `${C.accent}15` : `${C.green1}10`,
        border: `1.5px solid ${playing ? C.accent : C.green1}50`,
        borderRadius: 20,
        padding: isTV ? "8px 12px" : "6px 10px",
        cursor: "pointer", flexShrink: 0,
        transition: "all 0.2s", marginLeft: 10,
        minHeight: 36, minWidth: 36,
      }}>
      <IconMusic size={isTV ? 13 : 11} color={playing ? C.accent : C.green1} />
      {playing
        ? <IconPause size={isTV ? 10 : 9} color={C.accent} />
        : <IconPlay size={isTV ? 10 : 9} color={C.green1} />}
    </button>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────
export function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const bp = useBreakpoint();
  const isMobileOrTablet = bp === "mobile" || bp === "tablet";
  const isTV = bp === "tv";

  // ── URL-based active page detection ──────────────────────────────────────
  // Maps current URL path back to nav label so the correct tab is highlighted
  // when user navigates directly to a URL (e.g. ramayana.vyoma.org/events)
  const location = useLocation();
  const ROUTE_MAP = {
    "/": "Home",
    "/home": "Know Rāmāyaṇa",
    "/events": "Events",
    "/offerings": "Learn Rāmāyaṇa",
    "/resources": "Resources",
    "/get-involved": "Get Involved",
    "/dailysatsanga": "Daily Satsaṅga",
  };
  const activeFromURL = ROUTE_MAP[location.pathname] ?? activePage;

  // ── Audio setup ──────────────────────────────────────────────────────────
  useEffect(() => {
    // Create audio element — preload so it's ready when user clicks play
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = AUDIO_VOLUME;
    audio.preload = "auto";
    audioRef.current = audio;

    // Audio is paused by default — user must click the play button to start
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggleAudio = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (audioPlaying) {
      audio.pause();
      setAudioPlaying(false);
    } else {
      // Use the button click as the user gesture to start play
      audio.play()
        .then(() => setAudioPlaying(true))
        .catch((err) => {
          console.warn("Audio play failed:", err);
        });
    }
  };

  // ── Scroll & resize ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOrTablet && menuOpen) setMenuOpen(false);
  }, [isMobileOrTablet, menuOpen]);

  // ── Responsive sizes ─────────────────────────────────────────────────────
  const navHeight = bp === "mobile" ? 64 : bp === "tablet" ? 72 : bp === "tv" ? 100 : 90;
  const logoFontMain = bp === "mobile" ? 18 : bp === "tablet" ? 20 : bp === "tv" ? 32 : 24;
  const logoFontSub = bp === "mobile" ? 12 : bp === "tablet" ? 13 : bp === "tv" ? 22 : 18;
  const navFontSize = isTV ? 16 : 14;
  const featFontSize = isTV ? 14 : 12;

  return (
    <>
      <nav role="navigation" aria-label="Main navigation"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,248,242,0.96)",
          backdropFilter: "blur(16px)",
          borderBottom: `2px solid ${C.orange4}`,
          boxShadow: scrolled ? `0 2px 20px ${C.orange4}60` : "none",
          transition: "all 0.3s ease",
        }}>
        {/* Single saffron top line — no rainbow */}
        <div style={{ height: 3, background: C.accent }} />

        <div style={{
          maxWidth: isTV ? 1920 : 1280, margin: "0 auto",
          padding: bp === "mobile" ? "0 12px" : bp === "tablet" ? "0 16px" : "0 25px",
          display: "flex", alignItems: "center", height: navHeight,
        }}>

          {/* ── LOGO with Translucent Orange Background ── */}
          <div style={{
            display: "flex", alignItems: "center",
            cursor: "pointer", flexShrink: 0,
            background: "rgba(224, 102, 25, 0.85)", // Light transparent orange
            borderRadius: 10,
            padding: "4px 10px",
            marginRight: 4,
            boxShadow: `0 4px 12px ${C.orange1}40`,
            transition: "all 0.3s ease",
          }}
            onClick={() => { setActivePage("Home"); setMenuOpen(false); }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = `0 6px 16px ${C.orange1}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 12px ${C.orange1}40`;
            }}
            role="link" aria-label="Go to home">
            <img
              src="/logo_white.png"
              alt="Vyoma Ramayana"
              style={{
                height: bp === "mobile" ? 36 : bp === "tablet" ? 40 : bp === "tv" ? 56 : 44,
                width: "auto",
                display: "block",
                filter: "brightness(1.1)", // Slight brightness boost to make logo pop
              }}
            />
          </div>

          {/* ── DESKTOP / TV NAV LINKS + AUDIO BUTTON ── */}
          {!isMobileOrTablet && (
            <div style={{
              display: "flex", gap: isTV ? 1 : 1, marginLeft: "auto",
              flexWrap: "nowrap", alignItems: "center"
            }}>
              {ALL_NAV.map(item => {
                const isFeatured = item === FEATURED_EVENT_LABEL;
                const isActive = activeFromURL === item;
                return (
                  <button key={item}
                    className={`bt${isFeatured ? " featured-nav" : ""}`}
                    onClick={() => setActivePage(item)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      background: isFeatured
                        ? C.accent
                        : isActive ? `${C.accent}12` : "none",
                      border: "none",
                      color: isFeatured ? C.white : isActive ? C.accent : C.textMid,
                      fontFamily: F.body,
                      fontSize: isFeatured ? featFontSize : navFontSize,
                      fontWeight: isActive || isFeatured ? 700 : 400,
                      padding: isFeatured
                        ? (isTV ? "10px 20px" : "8px 16px")
                        : (isTV ? "12px 18px" : "10px 14px"),
                      cursor: "pointer",
                      borderBottom: !isFeatured && isActive
                        ? `2px solid ${C.accent}` : "2px solid transparent",
                      borderRadius: isFeatured ? 5 : "3px 3px 0 0",
                      letterSpacing: 0.4, transition: "all 0.2s",
                      boxShadow: "none",
                      marginLeft: isFeatured ? 6 : 0, whiteSpace: "nowrap",
                    }}>{item}</button>
                );
              })}

              {/* Audio button — desktop/TV */}
              <AudioButton playing={audioPlaying} onToggle={toggleAudio} isTV={isTV} />
            </div>
          )}

          {/* ── MOBILE / TABLET: featured pill + audio icon + hamburger ── */}
          {isMobileOrTablet && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>

              {/* Featured event mini-pill on tablet */}
              {bp === "tablet" && (() => {
                const featuredItem = ALL_NAV.find(i => i === FEATURED_EVENT_LABEL);
                return featuredItem ? (
                  <button className="bt featured-nav"
                    onClick={() => setActivePage(featuredItem)}
                    style={{
                      background: C.accent,
                      border: "none", color: C.white,
                      fontFamily: F.body, fontSize: 12, fontWeight: 700,
                      padding: "7px 14px", borderRadius: 5, cursor: "pointer",
                      boxShadow: "none",
                      whiteSpace: "nowrap", letterSpacing: 0.4,
                    }}>{featuredItem}</button>
                ) : null;
              })()}

              {/* Audio icon-only button — mobile/tablet */}
              <button onClick={toggleAudio}
                title={audioPlaying ? "Pause chanting" : "Play chanting"}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  background: audioPlaying ? `${C.accent}15` : `${C.green1}10`,
                  border: `1.5px solid ${audioPlaying ? C.accent : C.green1}50`,
                  borderRadius: 20, padding: "7px 10px",
                  cursor: "pointer", transition: "all 0.2s", minHeight: 40,
                }}>
                <IconMusic size={12} color={audioPlaying ? C.accent : C.green1} />
                {audioPlaying
                  ? <IconPause size={9} color={C.accent} />
                  : <IconPlay size={9} color={C.green1} />}
              </button>

              {/* Hamburger */}
              <button onClick={() => setMenuOpen(v => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                style={{
                  background: menuOpen ? `${C.accent}12` : "transparent",
                  border: `1.5px solid ${menuOpen ? C.accent + "50" : C.inkGhost}`,
                  borderRadius: 8,
                  width: bp === "mobile" ? 40 : 44,
                  height: bp === "mobile" ? 40 : 44,
                  cursor: "pointer", display: "flex", alignItems: "center",
                  justifyContent: "center", transition: "all 0.2s", flexShrink: 0,
                }}>
                <HamburgerIcon open={menuOpen} color={C.accent} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── MOBILE / TABLET DRAWER ── */}
      {isMobileOrTablet && (
        <MobileDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          activePage={activePage}
          setActivePage={setActivePage}
          bp={bp}
          audioPlaying={audioPlaying}
          onToggleAudio={toggleAudio}
        />
      )}
    </>
  );
}