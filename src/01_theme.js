// ════════════════════════════════════════════════════════════════════════════
//  01_theme.js  —  GLOBAL THEME  (Warm Saffron + Crimson — NO GREEN)
//  Fonts: Poppins · Yatra One · Cinzel · Noto Serif Devanagari · Futura
// ════════════════════════════════════════════════════════════════════════════

export const C = {
  pageBg: "#FDFAF4",
  cardBg: "#FFFFFF",
  surface: "#FDF6EB",
  surfaceAlt: "#F7EFE0",

  accent: "#C8551A",
  accentMid: "#E07035",
  accentSoft: "#F2C49A",
  accentBg: "#FEF2E8",

  // Replaced all green with a deep crimson / maroon secondary
  green: "#8B1A1A",   // was #2D6A4F  — now deep crimson
  greenHover: "#6B1111",   // was #1B4332  — now darker crimson

  ink: "#2A1A0A",
  inkMid: "#4A2C14",
  inkLight: "#7A5230",
  inkFaint: "#A87850",
  inkGhost: "#D4B090",

  // ── Backward-compat aliases (all green→crimson) ────────────────────────────
  orange1: "#C8551A",
  orange2: "#E07035",
  orange3: "#F2C49A",
  orange4: "#F2C49A",
  orange5: "#FEF2E8",
  orange6: "#FDFAF4",
  yellow1: "#C8551A",
  yellow2: "#C8551A",
  yellow3: "#FEF2E8",
  yellow4: "#FDFAF4",
  btnBg: "#8B1A1A",   // buttons: deep crimson instead of green
  btnHover: "#6B1111",
  btnText: "#FFFFFF",
  brown1: "#2A1A0A",
  brown2: "#4A2C14",
  brown3: "#7A5230",
  brown4: "#A87850",
  green1: "#8B1A1A",   // all green shades → crimson family
  green2: "#B22222",
  green3: "#CD5C5C",
  green4: "#FAD7D7",
  teal: "#8B1A1A",   // teal → crimson
  tealLight: "#B22222",
  crimson: "#2A1A0A",
  crimsonL: "#4A2C14",
  indigo: "#2A1A0A",
  indigoL: "#4A2C14",
  gold: "#C8551A",
  goldL: "#E07035",
  textDark: "#2A1A0A",
  textMid: "#4A2C14",
  textLight: "#7A5230",
  textMuted: "#A87850",
  white: "#FFFFFF",
  accent1: "#C8551A",
  brown: "#2A1A0A",
  brownLight: "#4A2C14",
  yellowSoft: "#FEF2E8",
  cream: "#FDFAF4",
  gradStart: "#C8551A",
};

// ── Font family constants ─────────────────────────────────────────────────────
export const F = {
  body: "'Noto Serif', 'Shobhika', serif",
  heading: "'Noto Serif', 'Shobhika', serif",
  hero: "'Noto Serif', 'Shobhika', serif",
  sans: "'Noto Serif', 'Shobhika', serif",
  devan: "'Shobhika', 'Noto Serif Devanagari', serif",
  serif: "'Noto Serif', 'Shobhika', serif",
};

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  "Home", "Know Rāmāyaṇa", "Daily Satsaṅga", "Learn Rāmāyaṇa", "Resources", "Events", "Get Involved",
];

export const FEATURED_EVENT_ACTIVE = true;
export const FEATURED_EVENT_LABEL = "Learn";
export const ALL_NAV = NAV_ITEMS;

export const BHAJAN_SYMBOLS = [
  "श्री राम", "जय राम", "जय जय राम",
  "श्रीराम", "जय राम", "जय श्री राम",
];

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Serif+Devanagari:wght@400;600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');

  @font-face {
    font-family: 'Shobhika';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: url('/Shobhika-Regular.otf') format('opentype');
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #FDFAF4;
    color: #2A1A0A;
    font-family: 'Noto Serif', serif;
    -webkit-font-smoothing: antialiased;
  }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes popIn     { 0%{opacity:0;transform:scale(0.3) translateY(0)} 60%{opacity:1;transform:scale(1.1) translateY(-26px)} 100%{opacity:0;transform:scale(0.8) translateY(-60px)} }
  @keyframes borderMarch{ 0%{background-position:0 50%} 100%{background-position:200% 50%} }
  @keyframes twinkle   { 0%,100%{opacity:0.2;transform:scale(0.85)} 50%{opacity:0.8;transform:scale(1.05)} }
  @keyframes scrollUp  { 0%{transform:translateY(0)} 100%{transform:translateY(-50%)} }
  @keyframes scrollDown{ 0%{transform:translateY(-50%)} 100%{transform:translateY(0)} }
  @keyframes featuredPulse{ 0%,100%{box-shadow:0 0 0 0 rgba(200,85,26,0.3)} 70%{box-shadow:0 0 0 7px rgba(200,85,26,0)} }
  @keyframes accentIn  { from{transform:scaleX(0);opacity:0} to{transform:scaleX(1);opacity:1} }

  .pi  { animation: fadeUp 0.45s ease forwards; }
  .fl  { animation: float 3.5s ease-in-out infinite; }
  .bt  { transition: all 0.17s ease; cursor: pointer; font-family: 'Noto Serif', serif; }
  .bt:hover { filter: brightness(1.07); }
  .hl  { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .hl:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(42,26,10,0.09) !important; }
  .featured-nav { animation: featuredPulse 2.2s infinite; }
  .twinkle { animation: twinkle 2s ease-in-out infinite; }
  .bhajan-particle { position:fixed; pointer-events:none; font-size:18px; z-index:9999; animation:popIn 1.1s ease forwards; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #FDF6EB; }
  ::-webkit-scrollbar-thumb { background: #C8551A; border-radius: 3px; }

  .quiz-explanation-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    background: #FDF6EB;
    padding: 16px 20px;
    border-left: 4px solid #C8551A;
    border-radius: 0 8px 8px 0;
    margin-bottom: 24px;
    animation: fadeUp 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  }

  @media (max-width: 600px) {
    .quiz-explanation-card-header {
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
    }
    .quiz-explanation-card-header > div:last-child {
      width: 100%;
    }
    .quiz-explanation-card-header > div:last-child button {
      width: 100% !important;
      display: block;
    }
  }
`;