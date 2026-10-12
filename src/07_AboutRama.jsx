// ════════════════════════════════════════════════════════════════════════════
//  06_HomePage.jsx
// ════════════════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef, useCallback } from "react";
import { C, F } from "./01_theme";

const YOUTUBE_URL = "https://www.youtube.com/playlist?list=PLmozlYyYE-EQtZaTjtmmL8l238faWFrRU";
const SLIDES_URL = "https://digitalsanskrit.com";
const WA_GROUP_1 = "https://chat.whatsapp.com/nithyaparayana-group-1";
const WA_GROUP_2 = "https://chat.whatsapp.com/nithyaparayana-group-2";

const ABOUT_PARAS = [
  "The Rāmāyaṇa is one of the two great Itihāsa-s, the other being the Mahābhārata. The word Itihāsa (इतिहासः = इति ह आस) literally means \"thus indeed it happened,\" indicating a traditional narrative that preserves the true happenings while conveying profound dhārmika, moral, and spiritual teachings. The Rāmāyaṇa narrates the life and journey of Rāma (रामस्य अयनम् = रामायणम्), whose life exemplifies the highest ideals of dharma.",
  "The most ancient and foundational text is the Vālmīki Rāmāyaṇa, composed by the sage Vālmīki in Sanskrit in 24,000 verses — the Ādi-kāvya, the very first kāvya. Based on how each ṛṣi and poet experienced the bliss of Rāma, celebrated works arose: the Rāmacaritamānasa by Tulasīdāsa in Awadhi, the Kamba Rāmāyaṇam by Kamban in Tamil, the Adhyātma Rāmāyaṇa in the Brahmāṇḍa Purāṇa, and countless regional retellings across cultures and generations.",
];

const GUIDE_ITEMS = [
  { label: "Vedatulya", desc: "Revered with sanctity comparable to the Veda-s." },
  { label: "Veda-upabṛṃhaṇa", desc: "Elaborates and illustrates the teachings of the Veda-s through narrative and examples." },
  { label: "Itihāsa", desc: "Preserving elements of history, geography, and cultural memory." },
  { label: "Dharma-śāstra", desc: "Guiding individuals on righteous conduct and ethical living." },
  { label: "Kāvya (Ādi-kāvya)", desc: "One of the greatest works of poetry — celebrated for its literary beauty and aesthetic excellence." },
  { label: "Artha-śāstra", desc: "Offering insights into governance, leadership, and statecraft." },
  { label: "Self-management Manual", desc: "Teaching discipline, resilience, and emotional balance." },
  { label: "Relationship Manual", desc: "Presenting ideal models between parents and children, brothers, spouses, friends, and rulers and citizens." },
  { label: "Leadership & Management Guide", desc: "Offering lessons on responsibility, teamwork, and ethical decision-making relevant in modern organisational contexts." },
  { label: "Bhakti-śāstra", desc: "Illustrating the highest forms of devotion through characters such as Hanumān." },
  { label: "Mokṣa-śāstra", desc: "Guiding seekers toward spiritual liberation through the teachings of dharma, devotion, and detachment." },
];

const BENEFITS = [
  {
    title: "Spiritual Upliftment & Liberation",
    icon: "ॐ",
    points: [
      "Removal of all types of sins.",
      "Listening to the Rāmāyaṇa helps one cross the ocean of saṁsāra and move toward liberation.",
      "Devoted listening leads to eternal bliss (paramānanda) and freedom from sorrow.",
    ],
  },
  {
    title: "Personality Growth & Character Development",
    icon: "✦",
    points: [
      "Nurtures noble qualities — truthfulness, compassion, gratitude, and self-control as exemplified by Śrī Rāma.",
      "Reflecting on the characters inspires individuals to cultivate virtues and strengthen moral character.",
      "Encourages self-discipline, devotion, and righteous conduct in everyday life.",
    ],
  },
  {
    title: "Mental Peace & Emotional Strength",
    icon: "◎",
    points: [
      "Listening to Rāmakathā brings peace of mind and emotional balance.",
      "Removes fear, distress, and negative mental disturbances such as bad dreams.",
      "Helps one face life's challenges with courage and clarity.",
    ],
  },
  {
    title: "Family Harmony & Social Well-being",
    icon: "⌂",
    points: [
      "Promotes harmony within the family, reducing conflicts between spouses and family members.",
      "Strengthens devotion, gratitude, and noble conduct among family members.",
      "Transforms a home into a sacred and uplifting environment like a tīrtha-kṣetra.",
    ],
  },
  {
    title: "Protection & Removal of Negative Influences",
    icon: "⚔",
    points: [
      "Where the sacred text is present, negative and harmful forces are said to flee.",
      "Devotion to Rāma grants protection from dangers and difficulties.",
    ],
  },
  {
    title: "Prosperity & Fulfilment of Righteous Desires",
    icon: "☸",
    points: [
      "The Rāmāyaṇa is compared to Kāmadhenu, capable of fulfilling noble aspirations.",
      "Listening and recitation bring prosperity, happiness, and success in life.",
      "Certain sections are traditionally recited for specific blessings — progeny, marriage, wealth, and well-being.",
    ],
  },
];

const KANDAS = [
  { n: "✦", name: "Rāmāyaṇa Māhātmya", desc: "Glory & sanctity of the Rāmāyaṇa", url: "https://digitalsanskrit.com/E-books/mahatmyam/" },
  { n: "I", name: "Bāla Kāṇḍa", desc: "Birth & divine childhood of Rāma", url: "https://digitalsanskrit.com/E-books/balakanda/" },
  { n: "II", name: "Ayodhyā Kāṇḍa", desc: "The exile of Rāma", url: "https://digitalsanskrit.com/E-books/ayodhyakanda/" },
  { n: "III", name: "Araṇya Kāṇḍa", desc: "Forest life & abduction of Sītā", url: "https://digitalsanskrit.com/E-books/aranyakanda/" },
  { n: "IV", name: "Kiṣkindhā Kāṇḍa", desc: "Alliance with the Vānaras", url: "https://digitalsanskrit.com/E-books/kishkindhakanda/" },
  { n: "V", name: "Sundara Kāṇḍa", desc: "Hanumān's great journey to Laṅkā", url: "https://digitalsanskrit.com/E-books/sundarakanda/" },
  { n: "VI", name: "Yuddha Kāṇḍa", desc: "The battle & victory of dharma", url: "https://digitalsanskrit.com/E-books/yudhakanda/" },
  { n: "VII", name: "Uttara Kāṇḍa", desc: "Rāma's return, reign & legacy", url: null, tooltip: "The E-book is in progress" },
];

const SLIDE_HEIGHT = "clamp(500px, 68vh, 680px)";

const HERO_CSS = `
@keyframes heroShimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

.hero-shimmer-h1 {
  background: linear-gradient(
    90deg,
    #C8551A 0%, #E07035 18%, #2D6A4F 36%,
    #C8551A 54%, #E07035 72%, #2D6A4F 90%, #C8551A 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: heroShimmer 4s linear infinite;
}

@keyframes slideEnter {
  from { opacity: 0; transform: translateX(28px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scrollUp {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}

@keyframes scrollDown {
  from { transform: translateY(-50%); }
  to { transform: translateY(0); }
}

.slide-enter {
  animation: slideEnter 0.5s cubic-bezier(0.22,1,0.36,1) both;
}

.wa-enter-1 {
  animation: fadeUp 0.4s 0.05s ease both;
}

.wa-enter-2 {
  animation: fadeUp 0.4s 0.15s ease both;
}

.copy-toast {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  background: #2D6A4F;
  color: #fff;
  font-size: 10px;
  font-family: 'Poppins', sans-serif;
  padding: 3px 10px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  animation: fadeUp 0.2s ease both;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(212,176,144,0.5);
  background: rgba(253,250,244,0.85);
  backdrop-filter: blur(6px);
  color: #4A2C14;
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(42,26,10,0.10);
  transition: all 0.18s ease;
}

.slider-arrow:hover {
  background: #FDFAF4;
  box-shadow: 0 4px 14px rgba(42,26,10,0.16);
}
`;

const WaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.549 4.109 1.51 5.843L.057 23.117a.75.75 0 0 0 .928.928l5.274-1.453A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.626-.484-5.153-1.334l-.369-.213-3.828 1.054 1.054-3.828-.213-.369A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

function CopyBtn({ link }) {
  const [copied, setCopied] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div style={{ position: "relative", display: "inline-flex", flexShrink: 0 }}>
      {copied && <span className="copy-toast">Copied!</span>}

      <button
        onClick={handle}
        title="Copy link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          background: copied ? "rgba(45,106,79,0.12)" : "rgba(74,44,20,0.07)",
          border: `1.5px solid ${copied ? "#2D6A4F" : "rgba(212,176,144,0.7)"}`,
          color: copied ? "#2D6A4F" : "#7A5230",
          borderRadius: 6,
          padding: "6px 11px",
          fontFamily: "'Poppins', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          minHeight: 34,
          whiteSpace: "nowrap",
        }}
      >
        <CopyIcon />
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}

function WaRow({ label, link, className }) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        padding: "11px 14px",
        background: "#FFFFFF",
        border: "1px solid rgba(242,196,154,0.6)",
        borderLeft: "3px solid #25D366",
        borderRadius: 8,
        boxShadow: "0 1px 6px rgba(42,26,10,0.04)",
      }}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "rgba(37,211,102,0.10)",
          border: "1.5px solid rgba(37,211,102,0.4)",
          color: "#128C7E",
          borderRadius: 6,
          padding: "6px 13px",
          fontFamily: "'Poppins', sans-serif",
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          textDecoration: "none",
          transition: "all 0.18s ease",
          minHeight: 34,
          flex: "1 1 auto",
        }}
      >
        <WaIcon />
        {label}
      </a>

      <CopyBtn link={link} />
    </div>
  );
}

function Slide1() {
  return (
    <div
      className="slide-enter"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",

        paddingTop: 20,
        paddingRight: "clamp(24px,5vw,60px)",
        paddingBottom: 54,
        paddingLeft: "clamp(24px,5vw,60px)",

        position: "relative",
        zIndex: 1,
        height: SLIDE_HEIGHT,
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: F.devan,
          fontSize: "clamp(80px,15vw,200px)",
          fontWeight: 700,
          color: C.accent,
          opacity: 0.03,
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: 4,
        }}
      >
        राम
      </div>

      {[
        { side: "left", texts: ["श्री", "राम", "जय", "राम", "ॐ", "श्री"], dir: "up" },
        { side: "right", texts: ["जय", "श्री", "राम", "ॐ", "जय", "राम"], dir: "down" },
      ].map((col, ci) => (
        <div
          key={ci}
          style={{
            position: "absolute",
            [col.side]: 4,
            top: 0,
            bottom: 0,
            width: 20,
            overflow: "hidden",
            pointerEvents: "none",
            opacity: 0.11,
          }}
        >
          <div
            style={{
              animation: `${col.dir === "up" ? "scrollUp" : "scrollDown"} 18s linear infinite`,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[...col.texts, ...col.texts].map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: F.devan,
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.accent,
                  writingMode: "vertical-rl",
                  letterSpacing: 4,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1140,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <h1
          className="hero-shimmer-h1"
          style={{
            fontFamily: F.hero,
            fontWeight: 400,
            fontSize: "clamp(48px,5.4vw,80px)",
            lineHeight: 1.18,
            letterSpacing: 4,
            margin: "0 0 34px",
            paddingTop: 4,
          }}
        >
          Ramayana Resources
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            margin: "0 auto 30px",
            textAlign: "left",
            maxWidth: 1140,
          }}
        >
          <WaRow label="Join Our Nithyaparayana Group - 1" link={WA_GROUP_1} className="wa-enter-1" />
          <WaRow label="Join Our Nithyaparayana Group - 2" link={WA_GROUP_2} className="wa-enter-2" />
        </div>

        <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="bt"
            onClick={() => window.open(SLIDES_URL, "_blank")}
            style={{
              background: `${C.accent}18`,
              border: `1.5px solid ${C.accent}55`,
              color: C.accent,
              borderRadius: 6,
              padding: "9px 24px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(11px,1.4vw,14px)",
              fontWeight: 700,
              letterSpacing: 0.3,
              cursor: "pointer",
              minHeight: 44,
            }}
          >
            📖 Access E-books of Rāmāyaṇa Scripts
          </button>

          <button
            className="bt"
            onClick={() => window.open(YOUTUBE_URL, "_blank")}
            style={{
              background: `${C.green}18`,
              border: `1.5px solid ${C.green}55`,
              color: C.green,
              borderRadius: 6,
              padding: "9px 24px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(11px,1.4vw,14px)",
              fontWeight: 700,
              letterSpacing: 0.3,
              cursor: "pointer",
              minHeight: 44,
            }}
          >
            ▶ Watch Recordings
          </button>
        </div>
      </div>
    </div>
  );
}

const SLIDES = [Slide1];
const SLIDE_INTERVAL = 5500;

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const SlideComponent = SLIDES[current];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        height: SLIDE_HEIGHT,
      }}
    >
      <SlideComponent key={current} />

      <button className="slider-arrow" onClick={prev} aria-label="Previous slide" style={{ left: 10 }}>
        ‹
      </button>

      <button className="slider-arrow" onClick={next} aria-label="Next slide" style={{ right: 10 }}>
        ›
      </button>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          zIndex: 10,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? C.accent : `${C.accent}44`,
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {paused && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 54,
            background: "rgba(253,250,244,0.88)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(212,176,144,0.5)",
            borderRadius: 4,
            padding: "3px 8px",
            zIndex: 10,
            fontFamily: "'Poppins', sans-serif",
            fontSize: 10,
            color: C.inkLight,
            letterSpacing: 0.5,
          }}
        >
          ⏸ paused
        </div>
      )}
    </div>
  );
}

function SH({ children, center = false, sub }) {
  return (
    <div style={{ marginBottom: 32, textAlign: center ? "center" : "left" }}>
      <h2
        style={{
          fontFamily: F.heading,
          color: C.ink,
          fontSize: "clamp(17px,3vw,24px)",
          fontWeight: 600,
          letterSpacing: 1,
          lineHeight: 1.3,
        }}
      >
        {children}
      </h2>

      {sub && (
        <p
          style={{
            fontFamily: F.body,
            color: C.inkLight,
            fontSize: "clamp(13px,2vw,14px)",
            fontStyle: "italic",
            marginTop: 6,
            lineHeight: 1.6,
          }}
        >
          {sub}
        </p>
      )}

      <div
        style={{
          width: 36,
          height: 2,
          background: C.accent,
          borderRadius: 2,
          marginTop: 10,
          ...(center ? { margin: "10px auto 0" } : {}),
        }}
      />
    </div>
  );
}

export function AboutPage({ setActivePage }) {
  return (
    <div className="pi">
      <style>{HERO_CSS}</style>

      <div
        style={{
          background: C.surface,
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${C.inkGhost}`,
          height: 90 // Spacer for navbar
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: C.accent,
            zIndex: 20,
          }}
        />
      </div>

      <div
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          padding: "clamp(48px,7vw,80px) clamp(20px,4vw,32px)",
        }}
      >
        <section style={{ marginBottom: "clamp(56px,8vw,88px)" }}>
          <SH>What is the Rāmāyaṇa?</SH>

          {ABOUT_PARAS.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: F.body,
                color: C.inkMid,
                fontSize: "clamp(14px,2vw,16px)",
                lineHeight: 1.9,
                marginBottom: 20,
                maxWidth: 720,
                width: "100%",
                fontWeight: 300,
                textAlign: "justify",
              }}
            >
              {p}
            </p>
          ))}

          <p
            style={{
              fontFamily: F.serif,
              color: C.inkLight,
              fontSize: "clamp(14px,2vw,17px)",
              lineHeight: 1.9,
              fontStyle: "italic",
              borderLeft: `3px solid ${C.accent}`,
              paddingLeft: 20,
              marginTop: 8,
              maxWidth: 720,
              width: "100%",
              textAlign: "justify",
            }}
          >
            Thus, the Rāmāyaṇa stands as a timeless guide illuminating every dimension of life — personal,
            social, ethical, and spiritual — through the inspiring journey of Rāma and the ideals embodied in
            the epic.
          </p>
        </section>

        <section style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
          <SH center sub="The complete Vālmīki Rāmāyaṇa in its original and authentic form">
            The Seven Sacred Kāṇḍas
          </SH>

          <div
            style={{
              position: "relative",
              display: "flex",
              gap: 0,
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              paddingBottom: 8,
              marginTop: 8,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 28,
                left: 0,
                right: 0,
                height: 1,
                background: `linear-gradient(to right, transparent, ${C.accentSoft}, ${C.accentSoft}, transparent)`,
                zIndex: 0,
              }}
            />

            {KANDAS.map((k, i) => (
              <div
                key={i}
                className="hl"
                onClick={() => k.url && window.open(k.url, "_blank", "noopener,noreferrer")}
                title={k.tooltip || undefined}
                style={{
                  flex: "1 1 120px",
                  minWidth: 110,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "0 10px 16px",
                  position: "relative",
                  zIndex: 1,
                  cursor: k.url ? "pointer" : "default",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: `2px solid ${k.url ? C.accent : C.inkGhost}`,
                    background: k.url ? C.cardBg : C.surface,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    flexShrink: 0,
                    boxShadow: k.url ? `0 2px 8px ${C.accent}20` : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: F.heading,
                      fontSize: k.n === "✦" ? 14 : 10,
                      fontWeight: 700,
                      color: k.url ? C.accent : C.inkGhost,
                      letterSpacing: 0.5,
                    }}
                  >
                    {k.n}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: F.body,
                    color: k.url ? C.ink : C.inkLight,
                    fontSize: "clamp(9px,1.3vw,11px)",
                    fontWeight: 600,
                    marginBottom: 4,
                    letterSpacing: 0.2,
                  }}
                >
                  {k.name}
                </div>

                <div
                  style={{
                    fontFamily: F.body,
                    color: C.inkLight,
                    fontSize: "clamp(10px,1.4vw,12px)",
                    lineHeight: 1.4,
                    fontWeight: 300,
                  }}
                >
                  {k.desc}
                </div>

                {k.url && (
                  <span style={{ fontFamily: F.body, color: C.accent, fontSize: 9, marginTop: 5, letterSpacing: 0.5 }}>
                    Read →
                  </span>
                )}

                {k.tooltip && (
                  <span
                    style={{
                      fontFamily: F.body,
                      color: C.inkGhost,
                      fontSize: 9,
                      marginTop: 5,
                      letterSpacing: 0.3,
                      fontStyle: "italic",
                    }}
                  >
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "clamp(56px,8vw,88px)" }}>
          <SH sub="Rāmāyaṇa is not merely a narrative of events that happened centuries ago — it remains deeply relevant today.">
            How does Rāmāyaṇa guide everyday life?
          </SH>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
              gap: "0 clamp(32px,4vw,60px)",
            }}
          >
            {GUIDE_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  padding: "16px 0",
                  borderBottom: `1px solid ${C.inkGhost}`,
                }}
              >
                <span
                  style={{
                    fontFamily: F.heading,
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.accent,
                    flexShrink: 0,
                    letterSpacing: 0.5,
                    minWidth: 22,
                    paddingTop: 3,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <div
                    style={{
                      fontFamily: F.body,
                      color: C.ink,
                      fontSize: "clamp(12px,1.8vw,13px)",
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    {item.label}
                  </div>

                  <div
                    style={{
                      fontFamily: F.body,
                      color: C.inkLight,
                      fontSize: "clamp(12px,1.7vw,14px)",
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "clamp(56px,8vw,88px)" }}>
          <SH sub="Traditional śāstra-pramāṇa on the benefits of Rāmāyaṇa recitation & study.">
            Why should I study Rāmāyaṇa?
          </SH>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "clamp(20px,3vw,32px)",
            }}
          >
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ paddingTop: 4 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                    paddingBottom: 10,
                    borderBottom: `1px solid ${C.accentSoft}`,
                    minHeight: 56,
                  }}
                >
                  <span style={{ fontFamily: F.devan, color: C.accent, fontSize: 18, lineHeight: 1, flexShrink: 0 }}>
                    {b.icon}
                  </span>

                  <h3
                    style={{
                      fontFamily: F.heading,
                      color: C.ink,
                      fontSize: "clamp(11px,1.8vw,13px)",
                      fontWeight: 600,
                      letterSpacing: 0.5,
                    }}
                  >
                    {b.title}
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {b.points.map((pt, pi) => (
                    <p
                      key={pi}
                      style={{
                        fontFamily: F.body,
                        color: C.inkMid,
                        fontSize: "clamp(12px,1.7vw,14px)",
                        lineHeight: 1.7,
                        paddingLeft: 14,
                        borderLeft: `1px solid ${C.inkGhost}`,
                        fontWeight: 300,
                      }}
                    >
                      {pt}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "clamp(40px,6vw,64px)" }}>
          <SH center sub="Voices of those who have walked the path of the Rāmāyaṇa Pārāyaṇa">
            Divine Reflections by Pārāyaṇa kartā-s
          </SH>

          <div
            style={{
              position: "relative",
              background: C.cardBg,
              border: `1px solid ${C.accentSoft}`,
              borderLeft: `4px solid ${C.accent}`,
              borderRadius: 10,
              padding: "clamp(18px,3vw,28px) clamp(20px,4vw,36px) clamp(16px,2.5vw,24px)",
              boxShadow: `0 2px 16px ${C.accent}0D`,
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 16,
                fontFamily: "Georgia, serif",
                fontSize: 56,
                lineHeight: 1,
                color: C.accent,
                opacity: 0.07,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              "
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  fontFamily: F.serif,
                  color: C.inkMid,
                  fontSize: "clamp(12px,1.5vw,13px)",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  fontWeight: 400,
                  marginBottom: 10,
                  textAlign: "justify",
                }}
              >
                The discourse beautifully illuminated the timeless relevance of the Vālmīki Rāmāyaṇa by drawing
                profound parallels with modern management principles. It reaffirmed that ancient wisdom, when
                interpreted thoughtfully, continues to offer invaluable guidance for contemporary life and solve
                management challenges.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  paddingTop: 14,
                  borderTop: `1px solid ${C.inkGhost}`,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.accent}, ${C.accentMid})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: F.devan, fontSize: 13, color: C.white, fontWeight: 700 }}>
                    र
                  </span>
                </div>

                <div>
                  <p style={{ fontFamily: F.body, color: C.ink, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>
                    Pārāyaṇa Kartā
                  </p>
                  <p style={{ fontFamily: F.body, color: C.inkLight, fontSize: 10, marginTop: 1 }}>
                    Vālmīki Rāmāyaṇa Navāha Pārāyaṇa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}