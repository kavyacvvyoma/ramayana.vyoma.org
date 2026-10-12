// ════════════════════════════════════════════════════════════════════════════
//  12_Resourcepage.jsx  —  nav: "Resources"
//  Tabs: Dhyānaśloka | Gāyatrī Rāmāyaṇa | Maṅgalaśloka | Shloka Library | Links
//  Each PDF tab: language pills below the tab, default = Devanagari
//  PDF opens inline via Google Drive embed
// ════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { C, F } from "./01_theme";
import { Card, Tag, Btn, Divider, PageHdr, Om } from "./02_SharedComponents";

// ── PDF data — replace the URL values with your actual Google Drive share links ──

// ── PDF files are served from /public folder — path is just /filename.pdf ──────
// For inline viewing in browser, we use the file path directly.
// Chrome/Edge renders PDFs natively in iframes; Firefox too.
const PDF_DATA = {
  dhyanasloka: {
    title: "Dhyānaśloka-s",
    titleSkt: "ध्यानश्लोक",
    langs: [
      { lang: "Devanagari", label: "देवनागरी", file: "/FGFR_Devanagari_Dhyanasloka_29012026.pdf" },
      { lang: "IAST", label: "IAST", file: "/FGFR_IAST_Dhyanashloka_29012026.pdf" },
      { lang: "Kannada", label: "ಕನ್ನಡ", file: "/FGFR_Kannada_Dhyanashloka_29012026.pdf" },
      { lang: "Tamil", label: "தமிழ்", file: "/FGFR_Tamil_Dhyanashlokas_29012026.pdf" },
      { lang: "Malayalam", label: "മലയാളം", file: "/FGFR_Malayalam_Dhyanashlokas_29012026.pdf" },
      { lang: "Telugu", label: "తెలుగు", file: "/FGFR_Telugu_Dhyanashloka_29012026.pdf" },
    ],
  },
  gayatri: {
    title: "Gāyatrī Rāmāyaṇa",
    titleSkt: "गायत्री रामायण",
    langs: [
      { lang: "Devanagari", label: "देवनागरी", file: "/FGFR_Devanagari_gayatriramayana_27022026.pdf" },
      { lang: "IAST", label: "IAST", file: "/FGFR_IAST_gayatriramayana_27022026.pdf" },
      { lang: "Kannada", label: "ಕನ್ನಡ", file: "/FGFR_Kannada_gayatriramayana_27022026.pdf" },
    ],
  },
  mangalasloka: {
    title: "Maṅgalaśloka-s",
    titleSkt: "मङ्गलश्लोक",
    langs: [
      { lang: "Devanagari", label: "देवनागरी", file: "/FGFR_Devanagari_Mangalasloka_26022026.pdf" },
      { lang: "IAST", label: "IAST", file: "/FGFR_IAST_Mangalasloka_26022026.pdf" },
      { lang: "Kannada", label: "ಕನ್ನಡ", file: "/FGFR_Kannada_Mangalasloka_26022026.pdf" },
      { lang: "Tamil", label: "தமிழ்", file: "/FGFR_Tamil_Mangalasloka_26022026.pdf" },
      { lang: "Malayalam", label: "മലയാളം", file: "/FGFR_Malayalam_Mangalasloka_26022026.pdf" },
      { lang: "Telugu", label: "తెలుగు", file: "/FGFR_Telugu_Mangalasloka_26022026.pdf" },
    ],
  },
};

const EXTERNAL_LINKS = [
  {
    category: "Vālmīki Rāmāyaṇa — Sanskrit Texts", links: [
      { label: "Valmiki Ramayana — valmikiramayan.net", url: "https://www.valmikiramayan.net/", desc: "Complete Sanskrit text with verse-by-verse navigation" },
      { label: "Valmiki Ramayana — IIT Kanpur", url: "https://www.valmiki.iitk.ac.in/", desc: "Searchable Sanskrit text hosted by IIT Kanpur" },
      { label: "Sanskrit Documents — Valmiki Ramayana", url: "https://sanskritdocuments.org/sites/valmikiramayan/", desc: "Valmiki Ramayana in multiple scripts and formats" },
      { label: "Sanskrit Documents — Ramayana Mirror", url: "https://sanskritdocuments.org/mirrors/ramayana/", desc: "Mirror archive of Ramayana texts in various scripts" },
      { label: "GRETIL — Ramayana Texts", url: "https://gretil.sub.uni-goettingen.de/gretil.html#Ram", desc: "Göttingen Register of Electronic Texts in Indian Languages — Ramayana section" },
      { label: "Valmiki Ramayanam — valmikiramayanam.in", url: "https://valmikiramayanam.in/", desc: "Dedicated site for Valmiki Ramayana with translations" },
      { label: "Ambuda — Ramayanam", url: "https://ambuda.org/texts/ramayanam/", desc: "Clean reader interface for the Valmiki Ramayana" },
      { label: "Sanskrit Sahitya — Ramayanam", url: "https://sanskritsahitya.org/ramayanam/1.1", desc: "Sanskrit literary resource with Ramayana text" },
      { label: "Digital Sanskrit — Sundara Kāṇḍa", url: "https://digitalsanskrit.com/E-books/srimadvalmikiramayanam_sundarakandah/", desc: "E-book of Sundarakāṇḍa from Śrīmad Vālmīki Rāmāyaṇam" },
    ]
  },
  {
    category: "Adhyātma Rāmāyaṇa & Other Versions", links: [
      { label: "Adhyatma Ramayana — Sanskrit Documents", url: "https://sanskritdocuments.org/sanskrit/adhyatmaramayana/", desc: "Adhyātma Rāmāyaṇa text in Sanskrit with script options" },
      { label: "Ramcharitmanas — IIT Kanpur", url: "https://www.ramcharitmanas.iitk.ac.in/", desc: "Tulsidas's Ramcharitmanas with text and navigation" },
      { label: "Ramcharitmanas — VedPuran Audio", url: "https://www.vedpuran.com/listenmahakavya_Ramacharitamanasa.asp", desc: "Listen to Ramcharitmanas recitations online" },
    ]
  },
  {
    category: "Digital Libraries & Archives", links: [
      { label: "Vedic Reserve — Itihasa", url: "https://vedicreserve.miu.edu/itihas.htm", desc: "Vedic heritage archive — Itihāsa section including Ramayana" },
      { label: "Sacred Texts — Ramayana", url: "https://sacred-texts.com/hin/rama/", desc: "Classic Ramayana translations in the Sacred Texts archive" },
      { label: "Bombay Indology", url: "https://bombay.indology.info/", desc: "Indological resources and Sanskrit text collections" },
      { label: "Veducation Library — Ramayana", url: "https://www.veducation.world/library/Sastra-शास्त्र/ramayana", desc: "Curated Ramayana resources in the Veducation digital library" },
    ]
  },
  {
    category: "Academic & Reference", links: [
      { label: "Sanskrit NIC — Epics", url: "https://www.sanskrit.nic.in/about_sanskrit.php#epics", desc: "Government of India Sanskrit portal — section on epic literature" },
      { label: "NSKTU — Ramayana on the Internet", url: "https://nsktu.ac.in/index.php/ramayana-on-internet/", desc: "Curated index of Ramayana resources across the web" },
    ]
  },
];

// ── Audio Players Component (Dhyānaśloka only) ────────────────────────────────
// ── Custom Audio Player ───────────────────────────────────────────────────────
function CustomAudioPlayer({ src, label, icon, onPlay }) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elRef, setElRef] = useState(null);   // DOM <audio> element

  const fmt = s => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const toggle = () => {
    if (!elRef) return;
    if (elRef.paused) { onPlay(elRef); elRef.play(); }
    else { elRef.pause(); }
  };

  const seek = e => {
    if (!elRef || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    elRef.currentTime = ratio * duration;
    setCurrent(ratio * duration);
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <div style={{
      background: C.accentBg, border: `1.5px solid ${C.accentSoft}`,
      borderRadius: 10, padding: "7px 12px",
      display: "flex", alignItems: "center", gap: 8
    }}>

      <audio ref={setElRef} src={src} preload="none"
        onLoadedMetadata={e => setDuration(e.target.duration)}
        onTimeUpdate={e => setCurrent(e.target.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setCurrent(0); }} />

      {/* Play/Pause */}
      <button onClick={toggle} className="bt"
        style={{
          background: playing ? C.accent : "transparent",
          border: `1.5px solid ${C.accent}`, borderRadius: "50%",
          width: 30, height: 30, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: playing ? C.white : C.accent,
          transition: "all 0.18s"
        }}>
        {playing
          ? <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
          : <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>}
      </button>

      {/* Label */}
      <div style={{
        display: "flex", alignItems: "center", gap: 5,
        flexShrink: 0, color: C.accent
      }}>
        {icon}
        <span style={{
          fontFamily: "'Poppins',sans-serif", fontSize: 11,
          fontWeight: 700, color: C.brown1, whiteSpace: "nowrap"
        }}>
          {label}
        </span>
      </div>

      {/* Seek bar */}
      <div onClick={seek}
        style={{
          flex: 1, height: 4, background: C.inkGhost,
          borderRadius: 4, cursor: "pointer", position: "relative", minWidth: 60
        }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: C.accent, borderRadius: 4
        }} />
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`,
          transform: "translate(-50%,-50%)", width: 10, height: 10,
          borderRadius: "50%", background: C.accent,
          boxShadow: "0 0 0 2px rgba(255,255,255,0.85)"
        }} />
      </div>

      {/* Time */}
      <span style={{
        fontFamily: "'Poppins',sans-serif", fontSize: 10,
        color: C.inkMid, flexShrink: 0, minWidth: 52, textAlign: "right"
      }}>
        {fmt(current)} / {fmt(duration)}
      </span>
    </div>
  );
}

// ── Audio Players — mutual-exclusive, Dhyānaśloka only ────────────────────────
// Tracks which audio DOM element is currently playing; pauses it when another starts.
function AudioPlayers() {
  const [activeEl, setActiveEl] = useState(null);

  const handlePlay = (el) => {
    if (activeEl && activeEl !== el && !activeEl.paused) activeEl.pause();
    setActiveEl(el);
  };

  const iconNote = (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
  );
  const iconRepeat = (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );

  return (
    <div style={{ marginBottom: 20, maxWidth: 760 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{
          fontFamily: "'Poppins',sans-serif", color: C.ink,
          fontSize: 11, fontWeight: 700, letterSpacing: 1,
          textTransform: "uppercase"
        }}>
          Audio Recitations
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <CustomAudioPlayer
            src="/01_DHYANA_SHLOKAS_Chant.mp3"
            label="Chanting" icon={iconNote}
            onPlay={handlePlay} />
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <CustomAudioPlayer
            src="/01DHYANA_SHLOKAS_Repeat.mp3"
            label="Repeating" icon={iconRepeat}
            onPlay={handlePlay} />
        </div>
      </div>

      {/* ── Purchase Links Row ── */}
      <div style={{ marginTop: 18 }}>
        <div style={{
          fontFamily: "'Poppins',sans-serif", color: C.ink,
          fontSize: 11, fontWeight: 700, letterSpacing: 1,
          textTransform: "uppercase", marginBottom: 10
        }}>
          Purchase Rāmāyaṇa Ratnamālā Products Below
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            {
              url: "https://digitalsanskritguru.com/product/ramayana-ratnamala/?v=13b5bfe96f3e",
              label: "Web Version",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                </svg>
              ),
            },
            {
              url: "https://digitalsanskritguru.com/product/ramayana-ratnamala-ramaya%e1%b9%87aratnamala-book/?v=13b5bfe96f3e",
              label: "Book (Hard copy)",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              ),
            },
            {
              url: "https://digitalsanskritguru.com/product/ramayana-ratnamala-ramaya%e1%b9%87aratnamala-flipbook/?v=13b5bfe96f3e",
              label: "E-Book",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" />
                </svg>
              ),
            },
            {
              url: "https://digitalsanskritguru.com/product/ramayana-ratnamala-audio-device/?v=13b5bfe96f3e",
              label: "Audio device",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none", flex: "1 1 0", minWidth: 120 }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                background: C.accentBg, border: `1.5px solid ${C.accentSoft}`,
                borderRadius: 8, padding: "8px 14px",
                fontFamily: "'Poppins',sans-serif", fontSize: 11,
                fontWeight: 600, color: C.accent,
                transition: "all 0.18s", whiteSpace: "nowrap", height: "100%",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = `${C.accent}15`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.accentSoft; e.currentTarget.style.background = C.accentBg; }}>
                {item.icon}
                {item.label} ↗
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PDF Tab Component ─────────────────────────────────────────────────────────
function PdfTab({ dataKey }) {
  const data = PDF_DATA[dataKey];
  const [activeLang, setActiveLang] = useState("Devanagari");
  const current = data.langs.find(l => l.lang === activeLang) || data.langs[0];

  return (
    <div>


      {/* Audio players & Purchase links — Dhyānaśloka and Maṅgalaśloka */}
      {(dataKey === "dhyanasloka" || dataKey === "mangalasloka") && <AudioPlayers />}

      {/* Language switcher — pill buttons below the tab */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: "'Poppins',sans-serif", color: C.ink,
          fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10,
          textTransform: "uppercase"
        }}>
          Select Language / Script
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {data.langs.map(l => {
            const isActive = activeLang === l.lang;
            return (
              <button key={l.lang} onClick={() => setActiveLang(l.lang)} className="bt"
                style={{
                  background: isActive ? C.accent : C.cardBg,
                  color: isActive ? C.white : C.inkMid,
                  border: `1.5px solid ${isActive ? C.accent : C.inkGhost}`,
                  borderRadius: 24, padding: "7px 18px",
                  fontFamily: "'Poppins',sans-serif", fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  cursor: "pointer", whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                {l.label}
                {l.lang === "Devanagari" && (
                  <span style={{
                    fontSize: 9, opacity: 0.65, fontFamily: "'Poppins',sans-serif",
                    background: isActive ? "rgba(255,255,255,0.25)" : C.accentBg,
                    borderRadius: 10, padding: "1px 6px"
                  }}>default</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* PDF viewer box */}
      <div style={{
        border: `1px solid ${C.inkGhost}`, borderRadius: 12,
        overflow: "hidden", boxShadow: "0 2px 12px rgba(42,26,10,0.06)"
      }}>

        {/* Header bar */}
        <div style={{
          background: C.accent,
          padding: "12px 20px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* PDF icon */}
            <div style={{
              background: "rgba(255,255,255,0.18)", borderRadius: 8,
              width: 36, height: 36, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="12" y2="17" />
              </svg>
            </div>
            <div>
              <div style={{
                fontFamily: "'Poppins',sans-serif", color: C.white,
                fontSize: 14, fontWeight: 700
              }}>
                {data.title}

              </div>
              <div style={{
                fontFamily: "'Poppins',sans-serif",
                color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 2
              }}>
                {current.lang} · PDF Document
              </div>
            </div>
          </div>
          <a href={current.file} target="_blank" rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.16)",
              border: "1.5px solid rgba(255,255,255,0.45)",
              color: C.white, borderRadius: 6, padding: "7px 16px",
              fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 700,
              textDecoration: "none", whiteSpace: "nowrap"
            }}>
            Open / Download ↗
          </a>
        </div>

        {/* iFrame embed */}
        <iframe
          key={current.embedUrl}
          src={current.file}
          title={`${data.title} — ${current.lang}`}
          width="100%" height="620"
          style={{ display: "block", border: "none", background: "#f5f5f5" }}
          allow="autoplay"
        />
      </div>

      <p style={{
        fontFamily: "'Futura', 'Trebuchet MS', sans-serif", color: C.inkFaint,
        fontSize: 12, marginTop: 10, textAlign: "center", fontStyle: "italic"
      }}>
        If the PDF does not load, use the "Open / Download" button above.
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function ResourcesPage() {
  const [section, setSection] = useState("dhyanasloka");

  const TABS = [
    { key: "dhyanasloka", label: "Dhyānaśloka-s", skt: "ध्यानश्लोक" },
    { key: "gayatri", label: "Gāyatrī Rāmāyaṇa", skt: "गायत्री रामायण" },
    { key: "mangalasloka", label: "Maṅgalaśloka-s", skt: "मङ्गलश्लोक" },
    { key: "links", label: "Study Links", skt: null },
  ];

  return (
    <div className="pi">
      <PageHdr title="Resources"
        subtitle="PDFs · Shlokas · Audio Recitations · Study Links"
        accentColor={C.orange1} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 24px 36px" }}>

        {/* ── Tab bar ── */}
        <div style={{
          display: "flex", gap: 0,
          borderBottom: `1px solid ${C.inkGhost}`,
          marginBottom: 32, overflowX: "auto"
        }}>
          {TABS.map(tab => {
            const isActive = section === tab.key;
            return (
              <button key={tab.key} onClick={() => setSection(tab.key)} className="bt"
                style={{
                  background: isActive ? C.accentBg : "transparent",
                  border: "none",
                  borderBottom: `3px solid ${isActive ? C.accent : "transparent"}`,
                  color: isActive ? C.accent : C.inkMid,
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: 13, fontWeight: isActive ? 700 : 400,
                  padding: "12px 22px", cursor: "pointer",
                  letterSpacing: 0.3, whiteSpace: "nowrap",
                  marginBottom: -2, transition: "all 0.2s",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 2,
                }}>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── PDF tabs ── */}
        {section === "dhyanasloka" && <PdfTab dataKey="dhyanasloka" />}
        {section === "gayatri" && <PdfTab dataKey="gayatri" />}
        {section === "mangalasloka" && <PdfTab dataKey="mangalasloka" />}

        {/* ── Study Links ── */}
        {section === "links" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,460px),1fr))",
            gap: 20
          }}>
            {EXTERNAL_LINKS.map(cat => (
              <Card key={cat.category}>
                <h3 style={{
                  fontFamily: "'Poppins',sans-serif", color: C.brown1,
                  fontSize: 15, fontWeight: 700, marginBottom: 12
                }}>
                  {cat.category}
                </h3>
                <Divider />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                  {cat.links.map(link => (
                    <a key={link.label} href={link.url} target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}>
                      <div style={{
                        background: C.accentBg, border: `1px solid ${C.accentSoft}`,
                        borderRadius: 8, padding: "10px 14px", transition: "all 0.2s"
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentMid; e.currentTarget.style.background = `${C.accent}10`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.accentSoft; e.currentTarget.style.background = C.accentBg; }}>
                        <div style={{
                          fontFamily: "'Poppins',sans-serif", color: C.accent,
                          fontSize: 13, fontWeight: 600, marginBottom: 3
                        }}>{link.label} ↗</div>
                        <div style={{
                          fontFamily: "'Futura', 'Trebuchet MS', sans-serif",
                          color: C.inkMid, fontSize: 14, lineHeight: 1.5
                        }}>{link.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}