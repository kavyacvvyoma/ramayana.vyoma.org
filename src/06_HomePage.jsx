// ════════════════════════════════════════════════════════════════════════════
//  06_HomePage.jsx  —  Poppins body · Yatra One hero · Cinzel sections
// ════════════════════════════════════════════════════════════════════════════
import { C, F, FEATURED_EVENT_LABEL } from "./01_theme";
import { SpiritualHero, Divider, Btn } from "./02_SharedComponents";

// ── Quiz Banner Popup ─────────────────────────────────────────────────────────
// Shown once per browser session (sessionStorage key: "quizPopupSeen").
// Dismiss via ✕, backdrop click, or either CTA link.

// ── Hero shimmer keyframe (injected once) ────────────────────────────────────
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

// ── Retained URLs ────────────────────────────────────────────────────────────
const YOUTUBE_URL = "https://www.youtube.com/playlist?list=PLmozlYyYE-EQtZaTjtmmL8l238faWFrRU";
const SLIDES_URL  = "https://digitalsanskrit.com";

const HERO_SHLOKA_SANS = "वेदवेद्ये परे पुंसि जाते दशरथात्मजे । वेदः प्राचेतसादासीत् साक्षाद्रामायणात्मना ॥";
const HERO_SHLOKA_IAST = "vedavedye pare puṃsi jāte daśarathātmaje | vedaḥ prācetasādāsīt sākṣāt rāmāyaṇātmanā ||";
const HERO_MEANING     = "When the Supreme Being (Rāma) — who is known through the Veda-s — was born as the son of Daśaratha, the Veda itself manifested in the form of the Rāmāyaṇa through the sage Vālmīki.";

const ABOUT_PARAS = [
  "The Rāmāyaṇa is one of the two great Itihāsa-s, the other being the Mahābhārata. The word Itihāsa (इतिहासः = इति ह आस) literally means \"thus indeed it happened,\" indicating a traditional narrative that preserves the true happenings while conveying profound dhārmika, moral, and spiritual teachings. The Rāmāyaṇa narrates the life and journey of Rāma (रामस्य अयनम् = रामायणम्), whose life exemplifies the highest ideals of dharma.",
  "The most ancient and foundational text is the Vālmīki Rāmāyaṇa, composed by the sage Vālmīki in Sanskrit in 24,000 verses — the Ādi-kāvya, the very first kāvya. Based on how each ṛṣi and poet experienced the bliss of Rāma, celebrated works arose: the Rāmacaritamānasa by Tulasīdāsa in Awadhi, the Kamba Rāmāyaṇam by Kamban in Tamil, the Adhyātma Rāmāyaṇa in the Brahmāṇḍa Purāṇa, and countless regional retellings across cultures and generations.",
];

const GUIDE_ITEMS = [
  { label: "Vedatulya",                     desc: "Revered with sanctity comparable to the Veda-s." },
  { label: "Veda-upabṛṃhaṇa",              desc: "Elaborates and illustrates the teachings of the Veda-s through narrative and examples." },
  { label: "Itihāsa",                       desc: "Preserving elements of history, geography, and cultural memory." },
  { label: "Dharma-śāstra",                desc: "Guiding individuals on righteous conduct and ethical living." },
  { label: "Kāvya (Ādi-kāvya)",            desc: "One of the greatest works of poetry — celebrated for its literary beauty and aesthetic excellence." },
  { label: "Artha-śāstra",                 desc: "Offering insights into governance, leadership, and statecraft." },
  { label: "Self-management Manual",        desc: "Teaching discipline, resilience, and emotional balance." },
  { label: "Relationship Manual",           desc: "Presenting ideal models between parents and children, brothers, spouses, friends, and rulers and citizens." },
  { label: "Leadership & Management Guide", desc: "Offering lessons on responsibility, teamwork, and ethical decision-making relevant in modern organisational contexts." },
  { label: "Bhakti-śāstra",                desc: "Illustrating the highest forms of devotion through characters such as Hanumān." },
  { label: "Mokṣa-śāstra",                desc: "Guiding seekers toward spiritual liberation through the teachings of dharma, devotion, and detachment." },
];

const BENEFITS = [
  { title: "Spiritual Upliftment & Liberation", icon: "ॐ",
    points: ["Removal of all types of sins.", "Listening to the Rāmāyaṇa helps one cross the ocean of saṁsāra and move toward liberation.", "Devoted listening leads to eternal bliss (paramānanda) and freedom from sorrow."] },
  { title: "Personality Growth & Character Development", icon: "✦",
    points: ["Nurtures noble qualities — truthfulness, compassion, gratitude, and self-control as exemplified by Śrī Rāma.", "Reflecting on the characters inspires individuals to cultivate virtues and strengthen moral character.", "Encourages self-discipline, devotion, and righteous conduct in everyday life."] },
  { title: "Mental Peace & Emotional Strength", icon: "◎",
    points: ["Listening to Rāmakathā brings peace of mind and emotional balance.", "Removes fear, distress, and negative mental disturbances such as bad dreams.", "Helps one face life's challenges with courage and clarity."] },
  { title: "Family Harmony & Social Well-being", icon: "⌂",
    points: ["Promotes harmony within the family, reducing conflicts between spouses and family members.", "Strengthens devotion, gratitude, and noble conduct among family members.", "Transforms a home into a sacred and uplifting environment like a tīrtha-kṣetra."] },
  { title: "Protection & Removal of Negative Influences", icon: "⚔",
    points: ["Where the sacred text is present, negative and harmful forces are said to flee.", "Devotion to Rāma grants protection from dangers and difficulties."] },
  { title: "Prosperity & Fulfilment of Righteous Desires", icon: "☸",
    points: ["The Rāmāyaṇa is compared to Kāmadhenu, capable of fulfilling noble aspirations.", "Listening and recitation bring prosperity, happiness, and success in life.", "Certain sections are traditionally recited for specific blessings — progeny, marriage, wealth, and well-being."] },
];

const KANDAS = [
  { n: "✦",   name: "Rāmāyaṇa Māhātmya", desc: "Glory & sanctity of the Rāmāyaṇa",         url: "https://digitalsanskrit.com/E-books/mahatmyam/" },
  { n: "I",   name: "Bāla Kāṇḍa",        desc: "Birth & divine childhood of Rāma",           url: "https://digitalsanskrit.com/E-books/balakanda/" },
  { n: "II",  name: "Ayodhyā Kāṇḍa",     desc: "The exile of Rāma",                          url: "https://digitalsanskrit.com/E-books/ayodhyakanda/" },
  { n: "III", name: "Araṇya Kāṇḍa",      desc: "Forest life & abduction of Sītā",            url: "https://digitalsanskrit.com/E-books/aranyakanda/" },
  { n: "IV",  name: "Kiṣkindhā Kāṇḍa",   desc: "Alliance with the Vānaras",                  url: "https://digitalsanskrit.com/E-books/kishkindhakanda/" },
  { n: "V",   name: "Sundara Kāṇḍa",     desc: "Hanumān's great journey to Laṅkā",           url: "https://digitalsanskrit.com/E-books/sundarakanda/" },
  { n: "VI",  name: "Yuddha Kāṇḍa",      desc: "The battle & victory of dharma",             url: "https://digitalsanskrit.com/E-books/yudhakanda/" },
  { n: "VII", name: "Uttara Kāṇḍa",      desc: "Rāma's return, reign & legacy",              url: null, tooltip: "The E-book is in progress" },
];

function SH({ children, center = false, sub }) {
  return (
    <div style={{ marginBottom: 32, textAlign: center ? "center" : "left" }}>
      <h2 style={{ fontFamily: F.heading, color: C.ink, fontSize: "clamp(17px,3vw,24px)", fontWeight: 600, letterSpacing: 1, lineHeight: 1.3 }}>{children}</h2>
      {sub && <p style={{ fontFamily: F.body, color: C.inkLight, fontSize: "clamp(13px,2vw,14px)", fontStyle: "italic", marginTop: 6, lineHeight: 1.6 }}>{sub}</p>}
      <div style={{ width: 36, height: 2, background: C.accent, borderRadius: 2, marginTop: 10, ...(center ? { margin: "10px auto 0" } : {}) }} />
    </div>
  );
}

export function HomePage({ setActivePage }) {
  return (
    <div className="pi">
      {/* <QuizBannerPopup /> */}
      <style>{SHIMMER_CSS}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <SpiritualHero style={{
        background: C.surface,
        position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${C.inkGhost}`,
      }}>
        {/* Saffron top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.accent, zIndex: 2 }} />

        {/* Responsive 50/50 grid — stacks on mobile */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          minHeight: "clamp(420px, 70vh, 680px)",
        }}>

          {/* ── LEFT: rama.png image ── */}
          <div style={{
            position: "relative",
            minHeight: "clamp(260px, 45vw, 680px)",
            overflow: "hidden",
          }}>
            <img
              src="/rama.png"
              alt="Śrī Rāma Darbar"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>

          {/* ── RIGHT: hero content ── */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center",
            padding: "clamp(48px,6vw,80px) clamp(24px,4vw,52px)",
            position: "relative", zIndex: 1,
          }}>
            {/* Watermark */}
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: F.devan, fontSize: "clamp(80px,15vw,200px)", fontWeight: 700,
              color: C.accent, opacity: 0.03, pointerEvents: "none", userSelect: "none", letterSpacing: 4,
            }}>राम</div>

            {/* Scrolling side columns */}
            {[
              { side: "left",  texts: ["श्री","राम","जय","राम","ॐ","श्री"], dir: "up" },
              { side: "right", texts: ["जय","श्री","राम","ॐ","जय","राम"],   dir: "down" },
            ].map((col, ci) => (
              <div key={ci} style={{ position: "absolute", [col.side]: 4, top: 0, bottom: 0, width: 20, overflow: "hidden", pointerEvents: "none", opacity: 0.12 }}>
                <div style={{ animation: `${col.dir === "up" ? "scrollUp" : "scrollDown"} 18s linear infinite`, display: "flex", flexDirection: "column", gap: 16 }}>
                  {[...col.texts, ...col.texts].map((t, i) => (
                    <span key={i} style={{ fontFamily: F.devan, fontSize: 10, fontWeight: 700, color: C.accent, writingMode: "vertical-rl", letterSpacing: 4 }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ position: "relative", zIndex: 1, maxWidth: 520, width: "100%" }}>
              <p style={{ fontFamily: F.devan, color: C.inkLight, fontSize: "clamp(11px,1.8vw,14px)", lineHeight: 1.7, marginBottom: 12, fontWeight: 600 }}>{HERO_SHLOKA_SANS}</p>
              <p style={{ fontFamily: F.serif, color: C.inkFaint, fontSize: "clamp(10px,1.3vw,11px)", fontStyle: "italic", letterSpacing: 0.5, marginBottom: 20 }}>{HERO_SHLOKA_IAST}</p>

              <h1
                className="hero-shimmer-h1"
                style={{
                  fontFamily: F.hero,
                  fontWeight: 400,
                  fontSize: "clamp(32px,5vw,68px)",
                  lineHeight: 1.05,
                  letterSpacing: 4,
                  marginBottom: 10,
                }}
              >Ramayana</h1>

              <p style={{ fontFamily: F.body, color: C.accent, fontSize: "clamp(10px,1.3vw,11px)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>The Eternal Epic of Dharma</p>

              <p style={{ fontFamily: F.serif, color: C.inkMid, fontSize: "clamp(12px,1.6vw,14px)", lineHeight: 1.8, margin: "0 auto 20px", fontStyle: "italic" }}>{HERO_MEANING}</p>

              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="bt" onClick={() => window.open(SLIDES_URL, "_blank")} style={{ background: `${C.accent}18`, border: `1.5px solid ${C.accent}55`, color: C.accent, borderRadius: 6, padding: "9px 18px", fontFamily: "'Poppins', sans-serif", fontSize: "clamp(10px,1.5vw,12px)", fontWeight: 700, letterSpacing: 0.3, cursor: "pointer", minHeight: 40 }}>Access Ramayana Companion</button>
                <button className="bt" onClick={() => window.open(YOUTUBE_URL, "_blank")} style={{ background: `${C.green}18`, border: `1.5px solid ${C.green}55`, color: C.green, borderRadius: 6, padding: "9px 18px", fontFamily: "'Poppins', sans-serif", fontSize: "clamp(10px,1.5vw,12px)", fontWeight: 700, letterSpacing: 0.3, cursor: "pointer", minHeight: 40 }}>▶ Watch Recordings</button>
              </div>

            </div>
          </div>

        </div>
      </SpiritualHero>

      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(20px,4vw,32px)" }}>

        {/* ── ABOUT ── */}
        <section style={{ marginBottom: "clamp(56px,8vw,88px)" }}>
          <SH>What is the Rāmāyaṇa?</SH>
          {ABOUT_PARAS.map((p, i) => (
            <p key={i} style={{ fontFamily: F.body, color: C.inkMid, fontSize: "clamp(14px,2vw,16px)", lineHeight: 1.9, marginBottom: 20, maxWidth: 760, fontWeight: 300 }}>{p}</p>
          ))}
          <p style={{ fontFamily: F.serif, color: C.inkLight, fontSize: "clamp(14px,2vw,17px)", lineHeight: 1.9, fontStyle: "italic", borderLeft: `3px solid ${C.accent}`, paddingLeft: 20, marginTop: 8, maxWidth: 680 }}>
            Thus, the Rāmāyaṇa stands as a timeless guide illuminating every dimension of life — personal, social, ethical, and spiritual — through the inspiring journey of Rāma and the ideals embodied in the epic.
          </p>
        </section>

         {/* ── SEVEN KĀṆḌAS — timeline ── */}
        <section style={{ marginBottom: "clamp(32px,4vw,48px)" }}>
          <SH center sub="The complete Vālmīki Rāmāyaṇa — from Māhātmya to Yuddha Kāṇḍa">The Seven Sacred Kāṇḍas</SH>
          <div style={{ position: "relative", display: "flex", gap: 0, overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 8, marginTop: 8 }}>
            <div style={{ position: "absolute", top: 28, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${C.accentSoft}, ${C.accentSoft}, transparent)`, zIndex: 0 }} />
            {KANDAS.map((k, i) => (
              <div
                key={i}
                className="hl"
                onClick={() => k.url && window.open(k.url, "_blank", "noopener,noreferrer")}
                title={k.tooltip || undefined}
                style={{
                  flex: "1 1 120px", minWidth: 110,
                  display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                  padding: "0 10px 16px", position: "relative", zIndex: 1,
                  cursor: k.url ? "pointer" : "default",
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: `2px solid ${k.url ? C.accent : C.inkGhost}`,
                  background: k.url ? C.cardBg : C.surface,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 12, flexShrink: 0,
                  boxShadow: k.url ? `0 2px 8px ${C.accent}20` : "none",
                  transition: "all 0.2s ease",
                }}>
                  <span style={{ fontFamily: F.heading, fontSize: k.n === "✦" ? 14 : 10, fontWeight: 700, color: k.url ? C.accent : C.inkGhost, letterSpacing: 0.5 }}>{k.n}</span>
                </div>
                <div style={{ fontFamily: F.body, color: k.url ? C.ink : C.inkLight, fontSize: "clamp(9px,1.3vw,11px)", fontWeight: 600, marginBottom: 4, letterSpacing: 0.2 }}>{k.name}</div>
                <div style={{ fontFamily: F.body, color: C.inkLight, fontSize: "clamp(10px,1.4vw,12px)", lineHeight: 1.4, fontWeight: 300 }}>{k.desc}</div>
                {k.url && (
                  <span style={{ fontFamily: F.body, color: C.accent, fontSize: 9, marginTop: 5, letterSpacing: 0.5 }}>Read →</span>
                )}
                {k.tooltip && (
                  <span style={{ fontFamily: F.body, color: C.inkGhost, fontSize: 9, marginTop: 5, letterSpacing: 0.3, fontStyle: "italic" }}>Coming soon</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW RAMAYANA GUIDES ── */}
        <section style={{ marginBottom: "clamp(56px,8vw,88px)" }}>
          <SH sub="Rāmāyaṇa is not merely a narrative of events that happened centuries ago — it remains deeply relevant today.">
            How does Rāmāyaṇa guide everyday life?
          </SH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: "0 clamp(32px,4vw,60px)" }}>
            {GUIDE_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "16px 0", borderBottom: `1px solid ${C.inkGhost}` }}>
                <span style={{ fontFamily: F.heading, fontSize: 11, fontWeight: 700, color: C.accent, flexShrink: 0, letterSpacing: 0.5, minWidth: 22, paddingTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ fontFamily: F.body, color: C.ink, fontSize: "clamp(12px,1.8vw,13px)", fontWeight: 600, marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontFamily: F.body, color: C.inkLight, fontSize: "clamp(12px,1.7vw,14px)", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY STUDY ── */}
        <section style={{ marginBottom: "clamp(56px,8vw,88px)" }}>
          <SH sub="Traditional śāstra-pramāṇa on the benefits of Rāmāyaṇa recitation & study.">
            Why should I study Rāmāyaṇa?
          </SH>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "clamp(20px,3vw,32px)" }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ paddingTop: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${C.accentSoft}` }}>
                  <span style={{ fontFamily: F.devan, color: C.accent, fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{b.icon}</span>
                  <h3 style={{ fontFamily: F.heading, color: C.ink, fontSize: "clamp(11px,1.8vw,13px)", fontWeight: 600, letterSpacing: 0.5 }}>{b.title}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {b.points.map((pt, pi) => (
                    <p key={pi} style={{ fontFamily: F.body, color: C.inkMid, fontSize: "clamp(12px,1.7vw,14px)", lineHeight: 1.7, paddingLeft: 14, borderLeft: `1px solid ${C.inkGhost}`, fontWeight: 300 }}>{pt}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW TO INTERNALISE CTA ── */}
        {/* <section> ... </section> */}

        {/* ══ TESTIMONIAL — last section ══════════════════════════════════════ */}
        <section style={{ marginTop: "clamp(40px,6vw,64px)" }}>
          <SH center sub="Voices of those who have walked the path of the Rāmāyaṇa Pārāyaṇa">
            Divine Reflections by Pārāyaṇa Karthas
          </SH>
          <div style={{
            position: "relative",
            background: C.cardBg,
            border: `1px solid ${C.accentSoft}`,
            borderLeft: `4px solid ${C.accent}`,
            borderRadius: 10,
            padding: "clamp(18px,3vw,28px) clamp(20px,4vw,36px) clamp(16px,2.5vw,24px)",
            boxShadow: `0 2px 16px ${C.accent}0D`,
            maxWidth: 760,
            margin: "0 auto",
          }}>
            <div style={{
              position: "absolute", top: 10, left: 16,
              fontFamily: "Georgia, serif", fontSize: 56, lineHeight: 1,
              color: C.accent, opacity: 0.07, pointerEvents: "none", userSelect: "none",
            }}>"</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: F.serif, color: C.inkMid, fontSize: "clamp(12px,1.5vw,13px)", lineHeight: 1.8, fontStyle: "italic", fontWeight: 400, marginBottom: 10 }}>
                The discourse beautifully illuminated the timeless relevance of the Vālmīki Rāmāyaṇa by drawing profound parallels with modern management principles. It reaffirmed that ancient wisdom, when interpreted thoughtfully, continues to offer invaluable guidance for contemporary life and solve management challenges.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 14, borderTop: `1px solid ${C.inkGhost}` }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.accent}, ${C.accentMid})`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <span style={{ fontFamily: F.devan, fontSize: 13, color: C.white, fontWeight: 700 }}>र</span>
                </div>
                <div>
                  <p style={{ fontFamily: F.body, color: C.ink, fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>Pārāyaṇa Kartha</p>
                  <p style={{ fontFamily: F.body, color: C.inkLight, fontSize: 10, marginTop: 1 }}>Vālmīki Rāmāyaṇa Navāha Pārāyaṇa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}