// ════════════════════════════════════════════════════════════════════════════
//  08_FeaturedEventPage.jsx  —  REDESIGNED  ·  Calm · Editorial · Infographic
// ════════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { createPortal } from "react-dom";
import { C, F } from "./01_theme";
import { Btn, Divider, SpiritualHero, Om } from "./02_SharedComponents";


// ── Hero shimmer keyframe ────────────────────────────────────────────────────
const SHIMMER_CSS = `
@keyframes heroShimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
.hero-shimmer-h1 {
  background: linear-gradient(
    90deg,
    #C8551A 0%,
    #E07035 18%,
    #2D6A4F 36%,
    #C8551A 54%,
    #E07035 72%,
    #2D6A4F 90%,
    #C8551A 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: heroShimmer 4s linear infinite;
}
`;

const EVENT_TITLE_SANS = "श्रीमद्वाल्मीकि-रामायण-नवाह-पारायण-प्रवचन-यज्ञः";
const EVENT_TITLE_ENG = "Online Srimad-Valmiki-Ramayana Navaha Parayana & Pravacana Yajna";
const EVENT_SUBTITLE = "23rd Year Parayana · For Universal Rama Rajya & World Peace";
const EVENT_ORGANISER = "Jointly Organised by Sanatana Dharma Parishad & Vyoma Linguistic Labs Foundation";
const EVENT_DATES = "20–29 March 2026";
const EVENT_START_2026 = "Friday, 20 March 2026";
const EVENT_END_2026 = "Sunday, 29 March 2026";
const EVENT_PARAYANA = "6:30 AM – 1:30 PM IST  (Daily, 21–29 Mar)";
const EVENT_PRAVACANA = "6:00 PM – 9:15 PM IST  (Daily, 21–28 Mar)";

const EVENT_START_2025 = "Thursday, 27 March 2025";
const EVENT_END_2025 = "Saturday, 5 April 2025";

const YOUTUBE_URL_2026 = "https://www.youtube.com/playlist?list=PLmozlYyYE-EQtZaTjtmmL8l238faWFrRU";
const YOUTUBE_URL_2025 = "https://www.youtube.com/watch?v=i2N6_8s7jXk";
const SLIDES_URL = "https://digitalsanskrit.com/product/ramayana-companion/";

const HIGHLIGHTS = [
  { title: "Total number of Participants of Rāmāyaṇa Pārāyaṇa-kartās including all 9 days", metric: "40,647 Total YouTube Views" },
  { title: "Number of Certificates issued for Pārāyaṇa Participations", metric: "80" },
  { title: "Number of people attended Rāmāyaṇa Pārāyaṇa quiz", metric: "266" },
  { title: "Number of People certified from quiz", metric: "200" },
];

const GALLERY_2026 = [
  { src: "/Gallery_2026_00.jpeg", c: "Śrī Rāma Darbar — Navāha Pārāyaṇa 2026" },
  { src: "/Gallery_2026_01.jpeg", c: "Inauguration — Ācāryas at the Yajña 2026" },
  { src: "/Gallery_2026_02.jpeg", c: "Devotees gathered for Pārāyaṇa 2026" },
  { src: "/Gallery_2026_03.jpeg", c: "Pārāyaṇa session in progress — 2026" },
  { src: "/Gallery_2026_04.jpeg", c: "Prasāda seva — Navāha Yajña 2026" },
];

const EVENT_TITLE_ENG_2025 = "Navāha-Udayāstamana-Pārāyaṇa of Śrīmad-Vālmīki-Rāmāyaṇa";
const EVENT_TITLE_SUB_2025 = "Incident-wise short description in English";
const EVENT_SUBTITLE_2025 = "22nd Year Parayana · For Universal Rama Rajya & World Peace";

const GALLERY_2025 = [
  { src: "/Gallery_2025_01.jpeg", c: "Rāmāyaṇa Pārāyaṇa 2025 — Ācāryas at the Yajña" },
  { src: "/Gallery2025_02.jpeg", c: "Rāmāyaṇa Pārāyaṇa 2025 — Devotees in recitation" },
  { src: "/Galery_2025_03.jpg", c: "Rāmāyaṇa Pārāyaṇa 2025 — Śrī Rāma Darbar" },
];

const SCHEDULE = [
  {
    date: "Fri 20 Mar", label: "Opening", kanda: "Inauguration — Pūrvāṅga-Pūjā & Kalaśa-Sthāpana",
    sessions: ["4:30 PM – 6:30 PM — Pūrvāṅga-Pūjā & Kalaśa-Sthāpana", "6:30 PM – 9:00 PM — Rāmāyaṇa-Māhātmya-Pārāyaṇa & Pravacana"]
  },
  {
    date: "Sat 21 Mar", label: "Day 1", kanda: "Bālakāṇḍa — Birth & divine purpose of Śrī Rāma",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Bālakāṇḍa", "6:00 PM – 7:30 PM — Pravacana Session 1", "7:45 PM – 9:15 PM — Pravacana Session 2"]
  },
  {
    date: "Sun 22 Mar", label: "Day 2", kanda: "Ayodhyākāṇḍa (Till Sarga 56) — Events leading to exile",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Ayodhyākāṇḍa (Till Sarga 56)", "6:00 PM – 9:15 PM — Pravacana: Dharma in the royal household"]
  },
  {
    date: "Mon 23 Mar", label: "Day 3", kanda: "Ayodhyākāṇḍa (Completion) — Duty, sacrifice and steadfastness",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Ayodhyākāṇḍa (Completion)", "6:00 PM – 9:15 PM — Pravacana: Reflection on duty and sacrifice"]
  },
  {
    date: "Tue 24 Mar", label: "Day 4", kanda: "Araṇyakāṇḍa — Forest journey & great turning points",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Araṇyakāṇḍa", "6:00 PM – 9:15 PM — Pravacana: Trials in the forest"]
  },
  {
    date: "Wed 25 Mar", label: "Day 5", kanda: "Kiṣkindhākāṇḍa — Alliances & preparation for divine mission",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Kiṣkindhākāṇḍa", "6:00 PM – 9:15 PM — Pravacana: Alliance with Vanaras"]
  },
  {
    date: "Thu 26 Mar", label: "Day 6", kanda: "Sundarakāṇḍa — Hanuman's devotion & divine reassurance",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Sundarakāṇḍa", "6:00 PM – 9:15 PM — Pravacana: Courage, devotion, reassurance"]
  },
  {
    date: "Fri 27 Mar", label: "Day 7", kanda: "Yuddhakāṇḍa (Till Sarga 59) — Commencement of the great battle",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Yuddhakāṇḍa (Till Sarga 59)", "6:00 PM – 9:15 PM — Pravacana: Dharma vs Adharma"]
  },
  {
    date: "Sat 28 Mar", label: "Day 8", kanda: "Yuddhakāṇḍa (Till Sarga 123) — Valor, faith & divine protection",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Yuddhakāṇḍa (Till Sarga 123)", "6:00 PM – 9:15 PM — Pravacana (Final day) — Valor and divine protection"]
  },
  {
    date: "Sun 29 Mar", label: "Day 9", kanda: "Yuddhakāṇḍa (Completion) · Sītā-Rāma-Paṭṭābhiṣeka",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Yuddhakāṇḍa (Completion)", "Sītā-Rāma-Paṭṭābhiṣeka Pravacana", "Prasāda-vitaraṇa & Anugraha-prāpti"]
  },
];

const ACHARYAS = [
  {
    name: "Dr. Venkatasubramanian P", role: "Co-founder, Vyoma Linguistic Labs",
    img: "/acharya-venkatasubramanian.png",
    bio: "Architect of India's largest Sanskrit e-learning ecosystem (450+ courses). Holds Vidvat, Vidyābhūṣaṇa & Ācārya titles; Ph.D. in Sanskrit e-learning. Contributed to NCERT Sanskrit textbooks. 30+ years of teaching and outreach.",
    profileUrl: "https://www.sanskritfromhome.org/teacher-profile/Dr.-Venkatasubramanian-P-18983595"
  },
  {
    name: "Dr. Viswanathan P", role: "Chief Executive Officer, Vyoma Labs",
    img: "/acharya-viswanathan.png",
    bio: "CEO of Vyoma Labs. 15+ years in corporate finance, 20+ years teaching Sanskrit & ślokas. Ph.D. exploring solutions from Vālmīki Rāmāyaṇam for modern accounting challenges. Specialist in Indian Knowledge Systems.",
    profileUrl: "https://www.sanskritfromhome.org/teacher-profile/Dr.-Viswanathan-P-18985124"
  },
];

function SH({ children, center = false }) {
  return (
    <div style={{ marginBottom: 28, textAlign: center ? "center" : "left" }}>
      <h2 style={{
        fontFamily: "'Cinzel', serif", color: C.ink,
        fontSize: "clamp(15px,2.8vw,21px)", fontWeight: 600, letterSpacing: 0.8,
      }}>{children}</h2>
      <div style={{
        width: 32, height: 2, background: C.accent, borderRadius: 2, marginTop: 8,
        ...(center ? { margin: "8px auto 0" } : {}),
      }} />
    </div>
  );
}

export function FeaturedEventPage({ setActivePage, year = "2026" }) {
  const [posterOpen, setPosterOpen] = useState(false);
  const [galleryLb, setGalleryLb] = useState(null);

  const is2026 = year === "2026";
  const galleryData = is2026 ? GALLERY_2026 : GALLERY_2025;
  const title = is2026 ? EVENT_TITLE_ENG : EVENT_TITLE_ENG_2025;
  const titleSub = is2026 ? null : EVENT_TITLE_SUB_2025;
  const subtitle = is2026 ? EVENT_SUBTITLE : EVENT_SUBTITLE_2025;
  const youtubeUrl = is2026 ? YOUTUBE_URL_2026 : YOUTUBE_URL_2025;

  const handleNext = (e) => {
    e.stopPropagation();
    const curIdx = galleryLb.idx;
    const nextIdx = curIdx === galleryData.length - 1 ? 0 : curIdx + 1;
    setGalleryLb({ idx: nextIdx, ...galleryData[nextIdx] });
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const curIdx = galleryLb.idx;
    const prevIdx = curIdx === 0 ? galleryData.length - 1 : curIdx - 1;
    setGalleryLb({ idx: prevIdx, ...galleryData[prevIdx] });
  };

  return (
    <div className="pi">
      <style>{SHIMMER_CSS}</style>

      {/* ── Poster lightbox — rendered via portal on document.body ── */}
      {posterOpen && createPortal(
        <div onClick={() => setPosterOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 999999, cursor: "zoom-out",
          padding: "clamp(16px,4vw,40px)",
        }}>
          <img
            src="/event2026.jpeg"
            alt="Event Poster 2026"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "min(90vw, 860px)",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 10,
              boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
              cursor: "default",
            }}
          />
          <button
            onClick={() => setPosterOpen(false)}
            style={{
              position: "fixed", top: 18, right: 22,
              background: "rgba(255,255,255,0.18)",
              border: "1.5px solid rgba(255,255,255,0.35)",
              color: "#fff", fontSize: 22, cursor: "pointer",
              borderRadius: "50%", width: 40, height: 40,
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1000000,
            }}
          >×</button>
        </div>,
        document.body
      )}

      {/* ── Gallery lightbox ── */}
      {galleryLb && createPortal(
        <div onClick={() => setGalleryLb(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 999999, cursor: "zoom-out", padding: "clamp(16px,4vw,40px)",
        }}>
          <button onClick={handlePrev} style={{ position: "absolute", left: "clamp(10px, 4vw, 40px)", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", fontSize: 24, cursor: "pointer", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000000 }}>❮</button>

          <img
            src={galleryLb.src} alt={galleryLb.c}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "min(80vw, 900px)", maxHeight: "88vh",
              objectFit: "contain", borderRadius: 10,
              boxShadow: "0 8px 48px rgba(0,0,0,0.7)", cursor: "default",
            }}
          />

          <button onClick={handleNext} style={{ position: "absolute", right: "clamp(10px, 4vw, 40px)", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.35)", color: "#fff", fontSize: 24, cursor: "pointer", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000000 }}>❯</button>

          <div style={{
            position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
            fontFamily: "'Poppins', sans-serif", color: "rgba(255,255,255,0.75)",
            fontSize: 13, textAlign: "center", pointerEvents: "none",
          }}>{galleryLb.c}</div>

          <button onClick={() => setGalleryLb(null)} style={{
            position: "absolute", top: 18, right: 22,
            background: "rgba(255,255,255,0.18)", border: "1.5px solid rgba(255,255,255,0.35)",
            color: "#fff", fontSize: 22, cursor: "pointer", borderRadius: "50%",
            width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000000,
          }}>×</button>
        </div>,
        document.body
      )}

      {/* ── COMPACT HEADER ── */}
      <div style={{
        textAlign: "center",
        padding: "32px 24px",
        background: C.surface,
        borderBottom: `1px solid ${C.inkGhost}`,
        borderTop: `3px solid ${C.accent}`,
        borderRadius: 8,
        marginBottom: 20
      }}>
        <h1 className="hero-shimmer-h1" style={{
          fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "clamp(20px, 3vw, 26px)",
          letterSpacing: 1, margin: "0 0 4px"
        }}>{title}</h1>
        {titleSub && (
          <p style={{ fontFamily: "'Poppins', sans-serif", color: C.inkLight, fontSize: 11, fontStyle: "italic", marginBottom: 8 }}>({titleSub})</p>
        )}

        <p style={{ fontFamily: "'Poppins', sans-serif", color: C.inkLight, fontSize: 13, fontStyle: "italic", marginBottom: 4 }}>{subtitle}</p>
        <p style={{ fontFamily: "'Poppins', sans-serif", color: C.accent, fontSize: 11, marginBottom: 12 }}>{EVENT_ORGANISER}</p>

        <div style={{ display: "inline-flex", gap: 24, justifyContent: "center", flexWrap: "wrap", background: C.orange5, borderRadius: 8, padding: "10px 20px", marginBottom: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, color: C.inkLight, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>Start Date</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, color: C.ink }}>{is2026 ? EVENT_START_2026 : EVENT_START_2025}</div>
          </div>
          <div style={{ width: 1, background: C.inkGhost, alignSelf: "stretch" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 10, fontWeight: 700, color: C.inkLight, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>End Date</div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, color: C.ink }}>{is2026 ? EVENT_END_2026 : EVENT_END_2025}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="bt" onClick={() => window.open(SLIDES_URL, "_blank")} style={{ background: `${C.accent}18`, border: `1.5px solid ${C.accent}55`, color: C.accent, borderRadius: 6, padding: "8px 16px", fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Access Ramayana Companion</button>
          <button className="bt" onClick={() => window.open(youtubeUrl, "_blank")} style={{ background: `${C.green}18`, border: `1.5px solid ${C.green}55`, color: C.green, borderRadius: 6, padding: "8px 16px", fontFamily: "'Poppins', sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>▶ Watch Recordings</button>
        </div>
      </div>

      {/* Highlights + Schedule */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "10px clamp(20px,4vw,32px)" }}>

        {/* ── HIGHLIGHTS ── */}
        {is2026 && (
          <section style={{ marginBottom: "clamp(48px,7vw,72px)" }}>
            <SH>Event Highlights</SH>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "0 clamp(24px,4vw,48px)" }}>
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0", borderBottom: `1px solid ${C.inkGhost}` }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0, minWidth: 22, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", color: C.ink, fontSize: "clamp(11px,1.6vw,13px)", fontWeight: 700, marginBottom: 2 }}>{h.title}</div>
                    <div style={{ fontFamily: "'Futura', 'Trebuchet MS', sans-serif", color: C.accent, fontSize: "clamp(12px,1.7vw,14px)", fontWeight: 600 }}>{h.metric}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginBottom: "clamp(48px,7vw,72px)" }}>
          <SH>Moments from Parayana {year}</SH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
            {galleryData.map((img, i) => (
              <div key={i} className="hl" onClick={() => setGalleryLb({ idx: i, ...img })} style={{
                background: C.cardBg, border: `1.5px solid ${C.orange4}`,
                borderRadius: 12, cursor: "pointer", overflow: "hidden",
                boxShadow: "0 3px 14px rgba(92,58,30,0.1)",
              }}>
                <img src={img.src} alt={img.c}
                  style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Poppins',sans-serif", color: C.brown2, fontSize: 13 }}>{img.c}</span>
                  <span style={{
                    background: C.orange1, color: C.white, borderRadius: "50%", width: 22, height: 22,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0
                  }}>+</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ĀCĀRYAS ── */}
        <section style={{ marginBottom: "clamp(48px,7vw,72px)" }}>
          <SH>Ācāryas</SH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(20px,3vw,32px)" }}>
            {ACHARYAS.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: 24, borderBottom: `1px solid ${C.inkGhost}` }}>
                <div style={{ flexShrink: 0 }}>
                  {a.img
                    ? <img src={a.img} alt={a.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.accentSoft}` }} />
                    : <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.surface, border: `2px solid ${C.accentSoft}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Om size={28} color={C.accent} /></div>
                  }
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Cinzel', serif", color: C.ink, fontSize: "clamp(12px,1.8vw,14px)", fontWeight: 600, marginBottom: 2 }}>{a.name}</h3>
                  <p style={{ fontFamily: "'Poppins', sans-serif", color: C.accent, fontSize: "clamp(10px,1.4vw,11px)", fontStyle: "italic", marginBottom: 8, letterSpacing: 0.3 }}>{a.role}</p>
                  <p style={{ fontFamily: "'Futura', 'Trebuchet MS', sans-serif", color: C.inkMid, fontSize: "clamp(12px,1.8vw,14px)", lineHeight: 1.7 }}>{a.bio}</p>
                  <a href={a.profileUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 10, fontFamily: "'Poppins', sans-serif", color: C.accent, fontSize: "clamp(10px,1.5vw,12px)", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>Know more →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}