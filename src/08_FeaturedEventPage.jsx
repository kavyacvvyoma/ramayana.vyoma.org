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

const EVENT_TITLE_SANS   = "श्रीमद्वाल्मीकि-रामायण-नवाह-पारायण-प्रवचन-यज्ञः";
const EVENT_TITLE_ENG    = "Online Srimad-Valmiki-Ramayana Navaha Parayana & Pravacana Yajna";
const EVENT_SUBTITLE     = "23rd Year Parayana · For Universal Rama Rajya & World Peace";
const EVENT_ORGANISER    = "Jointly Organised by Sanatana Dharma Parishad & Vyoma Linguistic Labs Foundation";
const EVENT_DATES        = "20–29 March 2026";
const EVENT_PARAYANA     = "6:30 AM – 1:30 PM IST  (Daily, 21–29 Mar)";
const EVENT_PRAVACANA    = "6:00 PM – 9:15 PM IST  (Daily, 21–28 Mar)";

const YOUTUBE_URL         = "https://www.youtube.com/playlist?list=PLmozlYyYE-EQtZaTjtmmL8l238faWFrRU";
const SLIDES_URL          = "https://digitalsanskrit.com";

const HIGHLIGHTS = [
  { title: "9-Day Complete Pārāyaṇa", desc: "Full Vālmīki Rāmāyaṇa recited across 9 days with Devanāgarī displayed on screen." },
  { title: "Pravacana in Saṃskṛta",   desc: "Evening sessions (6:00–9:15 PM IST) by Vyoma scholars, 21–28 March." },
  { title: "Vyoma Certificate",        desc: "Attend all 9 days to receive the official Vyoma Navāha Yajña certificate." },
  { title: "Rāmāyaṇa Online Quiz",    desc: "Live quiz during sessions — answer correctly and win exciting prizes." },
  { title: "Sankalpa & Prasāda",      desc: "Submit your Sankalpa via Google Form and receive Yajña Prasāda." },
  { title: "Join from Anywhere",       desc: "Free online live streaming — open to all devotees worldwide." },
];

const SCHEDULE = [
  { date: "Fri 20 Mar", label: "Opening", kanda: "Inauguration — Pūrvāṅga-Pūjā & Kalaśa-Sthāpana",
    sessions: ["4:30 PM – 6:30 PM — Pūrvāṅga-Pūjā & Kalaśa-Sthāpana", "6:30 PM – 9:00 PM — Rāmāyaṇa-Māhātmya-Pārāyaṇa & Pravacana"] },
  { date: "Sat 21 Mar", label: "Day 1", kanda: "Bālakāṇḍa — Birth & divine purpose of Śrī Rāma",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Bālakāṇḍa", "6:00 PM – 7:30 PM — Pravacana Session 1", "7:45 PM – 9:15 PM — Pravacana Session 2"] },
  { date: "Sun 22 Mar", label: "Day 2", kanda: "Ayodhyākāṇḍa (Till Sarga 56) — Events leading to exile",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Ayodhyākāṇḍa (Till Sarga 56)", "6:00 PM – 9:15 PM — Pravacana: Dharma in the royal household"] },
  { date: "Mon 23 Mar", label: "Day 3", kanda: "Ayodhyākāṇḍa (Completion) — Duty, sacrifice and steadfastness",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Ayodhyākāṇḍa (Completion)", "6:00 PM – 9:15 PM — Pravacana: Reflection on duty and sacrifice"] },
  { date: "Tue 24 Mar", label: "Day 4", kanda: "Araṇyakāṇḍa — Forest journey & great turning points",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Araṇyakāṇḍa", "6:00 PM – 9:15 PM — Pravacana: Trials in the forest"] },
  { date: "Wed 25 Mar", label: "Day 5", kanda: "Kiṣkindhākāṇḍa — Alliances & preparation for divine mission",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Kiṣkindhākāṇḍa", "6:00 PM – 9:15 PM — Pravacana: Alliance with Vanaras"] },
  { date: "Thu 26 Mar", label: "Day 6", kanda: "Sundarakāṇḍa — Hanuman's devotion & divine reassurance",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Sundarakāṇḍa", "6:00 PM – 9:15 PM — Pravacana: Courage, devotion, reassurance"] },
  { date: "Fri 27 Mar", label: "Day 7", kanda: "Yuddhakāṇḍa (Till Sarga 59) — Commencement of the great battle",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Yuddhakāṇḍa (Till Sarga 59)", "6:00 PM – 9:15 PM — Pravacana: Dharma vs Adharma"] },
  { date: "Sat 28 Mar", label: "Day 8", kanda: "Yuddhakāṇḍa (Till Sarga 123) — Valor, faith & divine protection",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Yuddhakāṇḍa (Till Sarga 123)", "6:00 PM – 9:15 PM — Pravacana (Final day) — Valor and divine protection"] },
  { date: "Sun 29 Mar", label: "Day 9", kanda: "Yuddhakāṇḍa (Completion) · Sītā-Rāma-Paṭṭābhiṣeka",
    sessions: ["6:30 AM – 1:30 PM — Pārāyaṇa: Yuddhakāṇḍa (Completion)", "Sītā-Rāma-Paṭṭābhiṣeka Pravacana", "Prasāda-vitaraṇa & Anugraha-prāpti"] },
];

const ACHARYAS = [
  { name: "Dr. Venkatasubramanian P", role: "Co-founder, Vyoma Linguistic Labs",
    img: "/acharya-venkatasubramanian.png",
    bio: "Architect of India's largest Sanskrit e-learning ecosystem (450+ courses). Holds Vidvat, Vidyābhūṣaṇa & Ācārya titles; Ph.D. in Sanskrit e-learning. Contributed to NCERT Sanskrit textbooks. 30+ years of teaching and outreach.",
    profileUrl: "https://www.sanskritfromhome.org/teacher-profile/Dr.-Venkatasubramanian-P-18983595" },
  { name: "Dr. Viswanathan P", role: "Chief Executive Officer, Vyoma Labs",
    img: "/acharya-viswanathan.png",
    bio: "CEO of Vyoma Labs. 15+ years in corporate finance, 20+ years teaching Sanskrit & ślokas. Ph.D. exploring solutions from Vālmīki Rāmāyaṇam for modern accounting challenges. Specialist in Indian Knowledge Systems.",
    profileUrl: "https://www.sanskritfromhome.org/teacher-profile/Dr.-Viswanathan-P-18985124" },
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

export function FeaturedEventPage({ setActivePage }) {
  const [posterOpen, setPosterOpen] = useState(false);
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

      {/* ── HERO — matches PageHdr style ── */}
      <SpiritualHero style={{
        background: C.surface,
        position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${C.inkGhost}`,
        marginTop: "12px",
      }}>
        {/* Saffron top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.accent, zIndex: 2 }} />
        {/* Devanagari watermark — same as PageHdr */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Noto Serif Devanagari', serif",
          fontSize: 160, fontWeight: 700,
          color: C.accent, opacity: 0.03, userSelect: "none", letterSpacing: 8,
        }}>रामायण</div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
          minHeight: 160,
          position: "relative", zIndex: 1,
        }}>

          {/* ── LEFT: hero text — same font/size as PageHdr ── */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center",
            padding: "72px clamp(20px,4vw,48px) 28px",
          }}>
            <div style={{ maxWidth: 480, width: "100%" }}>
              <p style={{ fontFamily: "'Noto Serif Devanagari', serif", color: C.inkLight, fontSize: 13, fontWeight: 600, lineHeight: 1.6, marginBottom: 8 }}>{EVENT_TITLE_SANS}</p>

              <h1 className="hero-shimmer-h1" style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: 32,
                lineHeight: 1.2,
                letterSpacing: 2,
                marginBottom: 8,
                margin: "0 0 8px",
              }}>{EVENT_TITLE_ENG}</h1>

              <p style={{ fontFamily: "'Poppins', sans-serif", color: C.inkLight, fontSize: 14, fontStyle: "italic", letterSpacing: 0.3, marginBottom: 4, marginTop: 8 }}>{EVENT_SUBTITLE}</p>
              <p style={{ fontFamily: "'Poppins', sans-serif", color: C.accent, fontSize: 12, letterSpacing: 0.5, marginBottom: 20 }}>{EVENT_ORGANISER}</p>

              <div style={{ width: 40, height: 2, background: C.accent, margin: "0 auto 20px", borderRadius: 2 }} />

              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="bt" onClick={() => window.open(SLIDES_URL, "_blank")} style={{ background: `${C.accent}18`, border: `1.5px solid ${C.accent}55`, color: C.accent, borderRadius: 6, padding: "7px 14px", fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 0.3, cursor: "pointer", minHeight: 36 }}>Access Ramayana Companion</button>
                <button className="bt" onClick={() => window.open(YOUTUBE_URL, "_blank")} style={{ background: `${C.green}18`, border: `1.5px solid ${C.green}55`, color: C.green, borderRadius: 6, padding: "7px 14px", fontFamily: "'Poppins', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 0.3, cursor: "pointer", minHeight: 36 }}>▶ Watch Recordings</button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: event poster ── */}
          <div style={{
            position: "relative",
            minHeight: "clamp(220px, 35vw, 420px)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "clamp(16px,3vw,28px)",
            background: C.surfaceAlt,
          }}>
            <img
              src="/event2026.jpeg"
              alt="Ramayana Navaha Parayana 2026 — Event Poster"
              onClick={() => setPosterOpen(true)}
              title="Click to view full poster"
              style={{
                maxWidth: "100%",
                maxHeight: "clamp(200px,32vw,380px)",
                objectFit: "contain",
                borderRadius: 8,
                boxShadow: `0 4px 24px rgba(42,26,10,0.15)`,
                cursor: "zoom-in",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(42,26,10,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(42,26,10,0.15)"; }}
            />
            <span style={{
              position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
              fontFamily: "'Poppins', sans-serif", fontSize: 10, color: C.inkFaint,
              letterSpacing: 0.5, pointerEvents: "none",
            }}>Click to view full poster</span>
          </div>

        </div>
      </SpiritualHero>

      {/* Highlights + Schedule */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "clamp(44px,6vw,72px) clamp(20px,4vw,32px)" }}>

        {/* ── HIGHLIGHTS ── */}
        <section style={{ marginBottom: "clamp(48px,7vw,72px)" }}>
          <SH>Event Highlights</SH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "0 clamp(24px,4vw,48px)" }}>
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0", borderBottom: `1px solid ${C.inkGhost}` }}>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0, minWidth: 22, paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", color: C.ink, fontSize: "clamp(11px,1.6vw,13px)", fontWeight: 700, marginBottom: 2 }}>{h.title}</div>
                  <div style={{ fontFamily: "'Futura', 'Trebuchet MS', sans-serif", color: C.inkLight, fontSize: "clamp(12px,1.7vw,14px)", lineHeight: 1.6 }}>{h.desc}</div>
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