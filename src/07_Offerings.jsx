// ════════════════════════════════════════════════════════════════════════════
//  07_Offerings.jsx  —  nav: "Offerings"
//  Two tabs: Courses (with persona + subject filters) | Books & Products
//  Single export: OurOfferingsPage  → /offerings
// ════════════════════════════════════════════════════════════════════════════
import { useState, useMemo } from "react";
import { C, F } from "./01_theme";
import { Card, Tag, Btn, PageHdr, Divider } from "./02_SharedComponents";

// ── COURSES with persona + subject tags ──────────────────────────────────────
const COURSES = [
  {
    title: "Experiencing Ramayana through Indian Sign Language",
    link: "https://www.sanskritfromhome.org/course-details/RamayanathroughIndianSignLanguage-48855",
    persona: ["Special Children"], subject: ["Arthanusandhana"]
  },
  {
    title: "Srimad Valmiki Ramayana Navaha Parayana Pravacana Yajna",
    link: "https://www.sanskritfromhome.org/course-details/SrimadValmikiRamayanaNavahaOnlineParayanaPravacana-49025",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens", "Special Children"], subject: ["Mula", "Arthanusandhana"]
  },
  {
    title: "Ramayana Ratnamala (Batch 2)",
    link: "https://www.sanskritfromhome.org/course-details/ramayanaratnamala-48965",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens", "Special Children"], subject: ["Mula"]
  },
  {
    title: "RRR USA 2025",
    link: "https://www.sanskritfromhome.org/course-details/RRR-USA-2025-48870",
    persona: ["Kids", "School/College Students"], subject: ["Arthanusandhana"]
  },
  {
    title: "Raghava Yadaviyam",
    link: "https://www.sanskritfromhome.org/course-details/RaghavaYadaviyam-48876",
    persona: ["University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Ramayana Navaaha Parayana",
    link: "https://www.sanskritfromhome.org/course-details/RamayanaNavaahaParayana-48864",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens", "Special Children"], subject: ["Mula"]
  },
  {
    title: "Ramayana Shibira 2025",
    link: "https://www.sanskritfromhome.org/course-details/ramayanashibira2025-48867",
    persona: ["Kids", "School/College Students"], subject: ["Arthanusandhana"]
  },
  {
    title: "Sankshepa Ramayana Grammar",
    link: "https://www.sanskritfromhome.org/course-details/Sankshepa-Ramayana-Grammar-48820",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Tulsidas Ramcharitmanas Anubhuti",
    link: "https://www.sanskritfromhome.org/course-details/tulsidas-ramcharitmanas-anubhuti%20-48802",
    persona: ["University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Raghuvamsha of Kalidasa Videos (Kannada)",
    link: "https://www.sanskritfromhome.org/course-details/raghuvamsha-of-kalidasa-videos-kannada-sotinagaraj-7301",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Sri Rama Raksha Stotram",
    link: "https://www.sanskritfromhome.org/course-details/sri-rama-raksha-stotram-48777",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Mula"]
  },
  {
    title: "Learn Rama Pooja",
    link: "https://www.sanskritfromhome.org/course-details/learn-rama-pooja-48775",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Viniyoga"]
  },
  {
    title: "Sri Rama Bhujanga Prayata Stotram",
    link: "https://www.sanskritfromhome.org/course-details/sri-rama-bhujanga-prayata-stotram-48767",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Mula"]
  },
  {
    title: "Raghuvamsha of Kalidasa - Sarga 12",
    link: "https://www.sanskritfromhome.org/course-details/raghuvamshaofkalidasa-sarga12-48764",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Sundarakanda from Tulsidas Ramcharitmanas",
    link: "https://www.sanskritfromhome.org/course-details/sundarakanda-from-tulsidas-ramcharitmanas-48753",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Ramayana Upanyasam",
    link: "https://www.sanskritfromhome.org/course-details/ramayanaupanyasam-48748",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Chant Namaramayanam - Batch 2",
    link: "https://www.sanskritfromhome.org/course-details/chant_namaramayanam_batch2-46094",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Mula"]
  },
  {
    title: "Pratimanatakam",
    link: "https://www.sanskritfromhome.org/course-details/pratimanatakam-46089",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Sankshepa Ramayana - Verse by Verse Meaning",
    link: "https://www.sanskritfromhome.org/course-details/sankshepa-ramayana-verse-by-verse-meaning-46503",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Sankshepa Ramayana",
    link: "https://www.sanskritfromhome.org/course-details/sankshepa-ramayana-45580",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Mula"]
  },
  {
    title: "Ramayana Ratnamala Flipbook",
    link: "https://www.sanskritfromhome.org/course-details/ramayana-ratnamala-flipbook-32820",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Mula"]
  },
  {
    title: "Sankshepa Ramayanam Chanting",
    link: "https://www.sanskritfromhome.org/course-details/sankshepa-ramayanam-chanting-32614",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Mula"]
  },
  {
    title: "Namaramayanam Chanting",
    link: "https://www.sanskritfromhome.org/course-details/namaramayanam_chanting-31366",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Mula"]
  },
  {
    title: "Raghuveera Gadyam - Meaning in Sanskrit",
    link: "https://www.sanskritfromhome.org/course-details/raghuveera-gadyam-meaning-sanskrit-29388",
    persona: ["University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Sri Raghuveera Gadyam - Learn to Recite",
    link: "https://www.sanskritfromhome.org/course-details/sri-raghuveera-gadyam-learn-to-recite-12192",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Mula"]
  },
  {
    title: "Yuddhakanda",
    link: "https://www.sanskritfromhome.org/course-details/yuddhakanda-7328",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Raghuvamsha - Sarga 3 (Sanskrit)",
    link: "https://www.sanskritfromhome.org/course-details/raghuvamsha-sarga3-sanskrit-7324",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Sundarakanda",
    link: "https://www.sanskritfromhome.org/course-details/sundarakanda-7304",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Kishkindhakanda",
    link: "https://www.sanskritfromhome.org/course-details/kishkindhakanda-7303",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Raghuvamsha - Sarga 12 (Bhanumami)",
    link: "https://www.sanskritfromhome.org/course-details/raghuvamsha-sarga12-bhanumami-7286",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Raghuvamsha - Sarga 2 (Sanskrit)",
    link: "https://www.sanskritfromhome.org/course-details/raghuvamsha-sarga2-sanskrit-7271",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Champu Ramayanam - Sundarakanda (Tamil)",
    link: "https://www.sanskritfromhome.org/course-details/champuramayanam-sundarakanda-tamil-7266",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Sundarakandam",
    link: "https://www.sanskritfromhome.org/course-details/sundarakandam-7244",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Raghuvamsha - Sarga 1 (Sanskrit)",
    link: "https://www.sanskritfromhome.org/course-details/raghuvamsha-sarga1-sanskrit-7220",
    persona: ["University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Balakanda",
    link: "https://www.sanskritfromhome.org/course-details/balakanda-7218",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Champu Ramayana - Sundarakanda (Sanskrit)",
    link: "https://www.sanskritfromhome.org/course-details/champuramayana-sundarakanda-sanskrit-7217",
    persona: ["University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Champu Ramayana - Balakanda (Tamil)",
    link: "https://www.sanskritfromhome.org/course-details/champuramayana-balakanda-tamil-7206",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Raghuvamsha - Sarga 12 (Tamil)",
    link: "https://www.sanskritfromhome.org/course-details/raghuvamsha-sarga12-tamil-7204",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Management Aspects from Sundarakandam",
    link: "https://www.sanskritfromhome.org/course-details/management-aspects-from-sundarakandam-7198",
    persona: ["University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Viniyoga"]
  },
  {
    title: "Champu Ramayana - Balakanda (Sanskrit)",
    link: "https://www.sanskritfromhome.org/course-details/champuramayana-balakanda-sanskrit-7172",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Raghuvamsha - Sarga 2 Selected (Tamil)",
    link: "https://www.sanskritfromhome.org/course-details/raghuvamsha-sarga2-select-tamil-7170",
    persona: ["School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Arthanusandhana"]
  },
  {
    title: "Ramayana Ratnamala",
    link: "https://www.sanskritfromhome.org/course-details/ramayanaratnamala-7158",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens", "Special Children"], subject: ["Mula"]
  },
  {
    title: "Discourses",
    link: "https://tour.vyoma.org/videos-2024/",
    persona: ["Kids", "School/College Students", "University Students", "Professionals", "Homemakers", "Senior Citizens"], subject: ["Viniyoga"]
  },
];

const ALL_PERSONAS = [
  "Kids", "School/College Students", "University Students",
  "Professionals", "Homemakers", "Senior Citizens", "Special Children",
];
const ALL_SUBJECTS = ["Mula", "Arthanusandhana", "Viniyoga"];

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
// ── Books (physical/digital reading material) ────────────────────────────────
const BOOKS = [
  {
    type: "Book", title: "Nāmarāmāyaṇam — नामरामायणम्",
    link: "https://digitalsanskritguru.com/product/namaramayanam/"
  },
  {
    type: "Book", title: "Rāmāyaṇa Ratnamālā — Book",
    link: "https://digitalsanskritguru.com/product/ramayana-ratnamala-ramaya%e1%b9%87aratnamala-book/"
  },
  {
    type: "Book", title: "Rāmāyaṇa Ratnamālā",
    link: "https://digitalsanskritguru.com/product/ramayana-ratnamala/"
  },
  {
    type: "Flipbook", title: "Nāmarāmāyaṇam — Flipbook",
    link: "https://digitalsanskritguru.com/product/namaramaya%e1%b9%87am-%e0%a4%a8%e0%a4%be%e0%a4%ae%e0%a4%b0%e0%a4%be%e0%a4%ae%e0%a4%be%e0%a4%af%e0%a4%a3%e0%a4%ae%e0%a5%8d-flipbook/"
  },
  {
    type: "Flipbook", title: "Rāmāyaṇa Ratnamālā — Flipbook",
    link: "https://digitalsanskritguru.com/product/ramayana-ratnamala-ramaya%e1%b9%87aratnamala-flipbook/"
  },
  {
    type: "Bulk Purchase", title: "Nāmarāmāyaṇam — Bulk Purchase",
    link: "https://digitalsanskritguru.com/product/namaramaya%e1%b9%87am-%e0%a4%a8%e0%a4%be%e0%a4%ae%e0%a4%b0%e0%a4%be%e0%a4%ae%e0%a4%be%e0%a4%af%e0%a4%a3%e0%a4%ae%e0%a5%8d-bulk-purchase/"
  },
];

// ── Products (audio devices, digital tools) ───────────────────────────────────
const PRODUCTS = [
  {
    type: "Audio Device", title: "Ramayana Ratnamala Audio Device",
    link: "https://digitalsanskritguru.com/product/ramayana-ratnamala-audio-device/"
  },
  {
    type: "Audio Device", title: "Ramayana Ratnamala Audio Device – Festival Offer",
    link: "https://digitalsanskritguru.com/product/ramayana-ratnamala-audio-device-festival-offer/"
  },
  {
    type: "Pen Drive", title: "Śrī Rāma Experience Companion — Pen Drive",
    link: "https://digitalsanskritguru.com/product/srirama-experience-companion-in-pendrive/"
  },
  {
    type: "Web & App", title: "Śrī Rāma Experience Companion — Web & App",
    link: "https://digitalsanskritguru.com/product/srirama-experience-companion/"
  },
];

// ── Rāmāyaṇa Scriptures in E-book ────────────────────────────────────────────
const EBOOKS = [
  { kanda: "Rāmāyaṇa Māhātmya",  sanskrit: "रामायण माहात्म्य",  desc: "Glory & sanctity of the Rāmāyaṇa",          url: "https://digitalsanskrit.com/E-books/mahatmyam/" },
  { kanda: "Bāla Kāṇḍa",         sanskrit: "बालकाण्ड",           desc: "Birth & divine childhood of Śrī Rāma",       url: "https://digitalsanskrit.com/E-books/balakanda/" },
  { kanda: "Ayodhyā Kāṇḍa",      sanskrit: "अयोध्याकाण्ड",       desc: "The exile of Rāma",                          url: "https://digitalsanskrit.com/E-books/ayodhyakanda/" },
  { kanda: "Araṇya Kāṇḍa",       sanskrit: "अरण्यकाण्ड",         desc: "Forest life & abduction of Sītā",            url: "https://digitalsanskrit.com/E-books/aranyakanda/" },
  { kanda: "Kiṣkindhā Kāṇḍa",    sanskrit: "किष्किन्धाकाण्ड",    desc: "Alliance with the Vānaras",                  url: "https://digitalsanskrit.com/E-books/kishkindhakanda/" },
  { kanda: "Sundara Kāṇḍa",      sanskrit: "सुन्दरकाण्ड",        desc: "Hanumān's great journey to Laṅkā",           url: "https://digitalsanskrit.com/E-books/sundarakanda/" },
  { kanda: "Yuddha Kāṇḍa",       sanskrit: "युद्धकाण्ड",          desc: "The great battle & victory of dharma",       url: "https://digitalsanskrit.com/E-books/yudhakanda/" },
];
function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} className="bt" style={{
      background: active ? C.accent : C.cardBg,
      color: active ? C.white : C.inkMid,
      border: `1.5px solid ${active ? C.accent : C.inkGhost}`,
      borderRadius: 20, padding: "5px 14px",
      fontFamily: F.body, fontSize: 12,
      fontWeight: active ? 700 : 400, cursor: "pointer", whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

// ── Courses Tab ───────────────────────────────────────────────────────────────
function CoursesTab() {
  const [search, setSearch] = useState("");
  const [personaFilter, setPersonaFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [page, setPage] = useState(0);
  const PER_PAGE = 12;

  const filtered = useMemo(() =>
    COURSES.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchPersona = !personaFilter || c.persona.includes(personaFilter);
      const matchSubject = !subjectFilter || c.subject.includes(subjectFilter);
      return matchSearch && matchPersona && matchSubject;
    }), [search, personaFilter, subjectFilter]
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const anyFilter = search || personaFilter || subjectFilter;
  const resetAll = () => { setSearch(""); setPersonaFilter(""); setSubjectFilter(""); setPage(0); };

  return (
    <div style={{ padding: "28px 0 44px" }}>
      {/* Source badge */}
      <div style={{
        background: `${C.green1}10`, border: `1px solid ${C.green1}30`,
        borderRadius: 8, padding: "10px 18px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap"
      }}>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1, fontSize: 12, fontWeight: 700 }}>Source:</span>
        <a href="https://www.sanskritfromhome.org" target="_blank" rel="noreferrer"
          style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1, fontSize: 13 }}>
          sanskritfromhome.org
        </a>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.textMuted, fontSize: 12 }}>
          — {COURSES.length} Rāmāyaṇa courses · Click any card to open
        </span>
      </div>

      {/* Filter by Persona */}
      <div style={{ marginBottom: 14 }}>
        <div style={{
          fontFamily: "'Poppins',sans-serif", color: C.brown1,
          fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase"
        }}>
          Filter by Persona
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <FilterPill label="All" active={!personaFilter}
            onClick={() => { setPersonaFilter(""); setPage(0); }} />
          {ALL_PERSONAS.map(p => (
            <FilterPill key={p} label={p} active={personaFilter === p}
              onClick={() => { setPersonaFilter(personaFilter === p ? "" : p); setPage(0); }} />
          ))}
        </div>
      </div>

      {/* Filter by Subject */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: "'Poppins',sans-serif", color: C.brown1,
          fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase"
        }}>
          Filter by Subject
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <FilterPill label="All" active={!subjectFilter}
            onClick={() => { setSubjectFilter(""); setPage(0); }} />
          {ALL_SUBJECTS.map(s => (
            <FilterPill key={s} label={s} active={subjectFilter === s}
              onClick={() => { setSubjectFilter(subjectFilter === s ? "" : s); setPage(0); }} />
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <input type="text" value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          placeholder="Search courses..."
          style={{
            width: "100%", padding: "11px 18px 11px 42px",
            border: `1.5px solid ${C.orange4}`, borderRadius: 8,
            fontFamily: "'Poppins',sans-serif",
            fontSize: 14, color: C.textDark, background: "#fff", outline: "none"
          }} />
        <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}
          width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.textMid} strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        {search && (
          <button onClick={() => { setSearch(""); setPage(0); }}
            style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 18
            }}>×</button>
        )}
      </div>

      {/* Results bar */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8
      }}>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.textMuted, fontSize: 12 }}>
          Showing {visible.length} of {filtered.length} courses
          {personaFilter && ` · ${personaFilter}`}
          {subjectFilter && ` · ${subjectFilter}`}
          {search && ` · "${search}"`}
        </span>
        {anyFilter && (
          <button onClick={resetAll} style={{
            background: "none",
            border: `1px solid ${C.orange3}`, color: C.brown2, borderRadius: 5,
            padding: "4px 12px", fontFamily: "'Poppins',sans-serif", fontSize: 11, cursor: "pointer"
          }}>
            Clear all ×
          </button>
        )}
      </div>

      {/* Course link list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((course, i) => (
          <a key={page * PER_PAGE + i} href={course.link} target="_blank" rel="noreferrer"
            style={{ textDecoration: "none", display: "block" }}>
            <div style={{
              background: C.accentBg, border: `1px solid ${C.accentSoft}`,
              borderRadius: 8, padding: "10px 14px", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = `${C.accent}10`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.accentSoft; e.currentTarget.style.background = C.accentBg; }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{
                  fontFamily: "'Poppins',sans-serif", color: C.accent,
                  fontSize: 13, fontWeight: 600, flex: 1
                }}>{course.title} ↗</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flexShrink: 0 }}>
                  {course.subject.map(s => (
                    <span key={s} style={{
                      background: "#fff", color: C.accent,
                      border: `1px solid ${C.accentSoft}`, borderRadius: 20,
                      padding: "2px 8px", fontSize: 10, fontFamily: "'Poppins',sans-serif", fontWeight: 600
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div style={{
          textAlign: "center", padding: "48px 24px",
          fontFamily: "'Poppins',sans-serif", color: C.orange1
        }}>
          <div style={{ fontSize: 36, marginBottom: 12, fontFamily: "'Noto Serif Devanagari',serif" }}>ॐ</div>
          No courses found for the selected filters.
          <br />
          <button onClick={resetAll} style={{
            marginTop: 14, background: C.green1,
            border: "none", color: "#fff", borderRadius: 6, padding: "8px 20px",
            fontFamily: F.body, fontSize: 12, cursor: "pointer"
          }}>
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            style={{
              background: page === 0 ? C.orange5 : C.white, border: `1.5px solid ${C.orange4}`,
              borderRadius: 6, padding: "7px 14px", fontFamily: F.body, fontSize: 12,
              cursor: page === 0 ? "default" : "pointer", color: page === 0 ? C.textMuted : C.textMid,
              opacity: page === 0 ? 0.5 : 1
            }}>← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)}
              style={{
                background: page === i ? C.green1 : C.white,
                border: `1.5px solid ${page === i ? "transparent" : C.orange4}`,
                borderRadius: 6, padding: "7px 13px", fontFamily: "'Poppins',sans-serif",
                fontSize: 12, cursor: "pointer",
                color: page === i ? "#fff" : C.textMid, fontWeight: page === i ? 700 : 400
              }}>{i + 1}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
            style={{
              background: page === totalPages - 1 ? C.orange5 : C.white, border: `1.5px solid ${C.orange4}`,
              borderRadius: 6, padding: "7px 14px", fontFamily: F.body, fontSize: 12,
              cursor: page === totalPages - 1 ? "default" : "pointer",
              color: page === totalPages - 1 ? C.textMuted : C.textMid,
              opacity: page === totalPages - 1 ? 0.5 : 1
            }}>Next →</button>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.orange4}` }}>
        <a href="https://www.sanskritfromhome.org" target="_blank" rel="noreferrer"
          style={{
            display: "inline-block", background: C.green1, color: "#fff",
            borderRadius: 6, padding: "10px 24px", fontFamily: "'Poppins',sans-serif",
            fontSize: 12, fontWeight: 700, textDecoration: "none", letterSpacing: 1
          }}>
          Browse All Courses at SFH →
        </a>
      </div>
    </div>
  );
}

// ── Shared item link-list renderer ────────────────────────────────────────────
function ItemGrid({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
          style={{ textDecoration: "none", display: "block" }}>
          <div style={{
            background: C.accentBg, border: `1px solid ${C.accentSoft}`,
            borderRadius: 8, padding: "10px 14px", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.background = `${C.accent}10`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.accentSoft; e.currentTarget.style.background = C.accentBg; }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{
                fontFamily: "'Poppins',sans-serif", color: C.accent,
                fontSize: 13, fontWeight: 600, flex: 1
              }}>{item.title} ↗</div>
              <span style={{
                background: "#fff", color: C.accent,
                border: `1px solid ${C.accentSoft}`, borderRadius: 20,
                padding: "2px 10px", fontSize: 10, fontFamily: "'Poppins',sans-serif",
                fontWeight: 600, flexShrink: 0
              }}>{item.type}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function StoreCTA() {
  return (
    <div style={{
      background: `linear-gradient(135deg,${C.orange6},${C.orange5})`,
      border: `1.5px solid ${C.orange4}`, borderRadius: 12, padding: 24,
      textAlign: "center", marginTop: 28
    }}>
      <h3 style={{ fontFamily: "'Poppins',sans-serif", color: C.textDark, fontSize: 16, marginBottom: 6 }}>
        Visit Vyoma Online Store
      </h3>
      <p style={{
        fontFamily: "'Poppins',sans-serif", color: C.textMid,
        fontSize: 14, fontStyle: "italic", marginBottom: 16
      }}>
        Explore the complete catalog including bulk orders for schools, temples, and institutions.
      </p>
      <a href="https://digitalsanskritguru.com" target="_blank" rel="noreferrer"
        style={{
          display: "inline-block", background: C.green1, color: "#fff",
          borderRadius: 6, padding: "10px 22px", fontFamily: "'Poppins',sans-serif",
          fontSize: 12, fontWeight: 700, textDecoration: "none", letterSpacing: 1
        }}>
        Shop All Products →
      </a>
    </div>
  );
}

// ── Books Tab ──────────────────────────────────────────────────────────────────
function BooksTab() {
  return (
    <div style={{ padding: "28px 0 44px" }}>
      <div style={{
        background: `${C.orange1}10`, border: `1px solid ${C.orange4}`,
        borderRadius: 8, padding: "10px 18px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap"
      }}>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1, fontSize: 12, fontWeight: 700 }}>Source:</span>
        <a href="https://digitalsanskritguru.com" target="_blank" rel="noreferrer"
          style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1, fontSize: 13 }}>
          digitalsanskritguru.com
        </a>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.textMuted, fontSize: 12 }}>
          — Books &amp; flipbooks · Click any item to purchase
        </span>
      </div>
      <ItemGrid items={BOOKS} />
      <StoreCTA />
    </div>
  );
}

// ── Products Tab ───────────────────────────────────────────────────────────────
function ProductsTab() {
  return (
    <div style={{ padding: "28px 0 44px" }}>
      <div style={{
        background: `${C.orange1}10`, border: `1px solid ${C.orange4}`,
        borderRadius: 8, padding: "10px 18px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap"
      }}>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1, fontSize: 12, fontWeight: 700 }}>Source:</span>
        <a href="https://digitalsanskritguru.com" target="_blank" rel="noreferrer"
          style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1, fontSize: 13 }}>
          digitalsanskritguru.com
        </a>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.textMuted, fontSize: 12 }}>
          — Audio devices, pen drives &amp; digital tools · Click to purchase
        </span>
      </div>
      <ItemGrid items={PRODUCTS} />
      <StoreCTA />
    </div>
  );
}

// ── E-books Tab ───────────────────────────────────────────────────────────────
function EbooksTab() {
  return (
    <div style={{ padding: "28px 0 44px" }}>
      {/* Source badge */}
      <div style={{
        background: `${C.green1}10`, border: `1px solid ${C.green1}30`,
        borderRadius: 8, padding: "10px 18px", marginBottom: 28,
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap"
      }}>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1, fontSize: 12, fontWeight: 700 }}>Source:</span>
        <a href="https://digitalsanskrit.com" target="_blank" rel="noreferrer"
          style={{ fontFamily: "'Poppins',sans-serif", color: C.orange1, fontSize: 13 }}>
          digitalsanskrit.com
        </a>
        <span style={{ fontFamily: "'Poppins',sans-serif", color: C.textMuted, fontSize: 12 }}>
          — Free Vālmīki Rāmāyaṇa E-books · Click any card to read
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 16 }}>
        {EBOOKS.map((e, i) => (
          <a key={i} href={e.url} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none" }}>
            <div className="hl" style={{
              background: C.cardBg,
              border: `1.5px solid ${C.inkGhost}`,
              borderTop: `3px solid ${C.accent}`,
              borderRadius: 10,
              padding: "20px 22px",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(42,26,10,0.06)",
              height: "100%",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              {/* Kanda number badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{
                  fontFamily: "'Cinzel', serif", fontSize: 10, fontWeight: 700,
                  color: C.accent, letterSpacing: 1, textTransform: "uppercase",
                  background: `${C.accent}12`, border: `1px solid ${C.accentSoft}`,
                  borderRadius: 20, padding: "2px 10px",
                }}>E-Book</span>
                <span style={{ color: C.accent, fontSize: 14, fontWeight: 700 }}>→</span>
              </div>

              {/* Sanskrit name */}
              <div style={{
                fontFamily: "'Noto Serif Devanagari', serif",
                color: C.inkMid, fontSize: "clamp(14px,2vw,18px)", fontWeight: 600, lineHeight: 1.3,
              }}>{e.sanskrit}</div>

              {/* English name */}
              <div style={{
                fontFamily: "'Cinzel', serif",
                color: C.ink, fontSize: "clamp(12px,1.6vw,14px)", fontWeight: 600, letterSpacing: 0.4,
              }}>{e.kanda}</div>

              {/* Description */}
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                color: C.inkLight, fontSize: "clamp(11px,1.4vw,12px)", lineHeight: 1.6, fontWeight: 300,
                marginTop: "auto",
              }}>{e.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function OurOfferingsPage() {
  const [activeTab, setActiveTab] = useState("Courses");

  const tabs = [
    { key: "Courses",  label: "Courses",                        count: COURSES.length },
    { key: "Books",    label: "Books",                          count: BOOKS.length },
    { key: "Products", label: "Products",                       count: PRODUCTS.length },
    { key: "Ebooks",   label: "Rāmāyaṇa Scriptures in E-book", count: EBOOKS.length },
  ];

  return (
    <div className="pi">
      <PageHdr
        title="Offerings"
        subtitle="Ramayana courses & products from Vyoma — click to explore"
        accentColor={C.orange1}
      />



      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${C.orange4}`, marginTop: 28 }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className="bt"
              style={{
                background: activeTab === tab.key ? `${C.orange1}10` : "transparent",
                border: "none",
                borderBottom: `3px solid ${activeTab === tab.key ? C.orange1 : "transparent"}`,
                color: activeTab === tab.key ? C.orange1 : C.textMid,
                fontFamily: "'Poppins',sans-serif",
                fontSize: 15, fontWeight: activeTab === tab.key ? 700 : 400,
                padding: "12px 28px", cursor: "pointer",
                letterSpacing: 0.4, transition: "all 0.2s", marginBottom: -2,
              }}>
              {tab.label}
              <span style={{
                marginLeft: 8,
                background: activeTab === tab.key ? C.orange1 : C.orange4,
                color: activeTab === tab.key ? "#fff" : C.textMuted,
                borderRadius: 20, padding: "2px 9px", fontSize: 10, fontWeight: 700
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {activeTab === "Courses"  && <CoursesTab />}
        {activeTab === "Books"    && <BooksTab />}
        {activeTab === "Products" && <ProductsTab />}
        {activeTab === "Ebooks"   && <EbooksTab />}
      </div>
      {/* ── 4-Step Learning Pathway Infographic ── */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.inkGhost}`, padding: "28px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Desktop: 4 steps in a row connected by arrows */}
          <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
            {[
              {
                n: "01", title: "Śravaṇa, Pārāyaṇa & Lekhana of Mūla",
                desc: "Structured learning of the Rāmāyaṇa through listening, reading and writing",
                tag: "Mūla"
              },
              {
                n: "02", title: "Saṃskṛta-adhyayana",
                desc: "Learning the basics of Sanskrit language and grammar",
                tag: "Sanskrit"
              },
              {
                n: "03", title: "Artha-anusandhāna",
                desc: "Authentic and structured study of the meanings in Rāmāyaṇa",
                tag: "Meaning"
              },
              {
                n: "04", title: "Viniyoga",
                desc: "Appreciating practical usage of Rāmāyaṇa principles in everyday life and workspaces",
                tag: "Application"
              },
            ].map((step, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "stretch", flex: 1 }}>
                {/* Step card */}
                <div style={{
                  flex: 1,
                  background: C.cardBg,
                  border: `1.5px solid ${C.inkGhost}`,
                  borderRadius: 10,
                  padding: "18px 16px",
                  position: "relative",
                  borderTop: `3px solid ${C.accent}`,
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  {/* Step number badge */}
                  <div style={{
                    position: "absolute", top: -14, left: 16,
                    background: C.accent, color: C.white,
                    fontFamily: F.heading, fontSize: 11, fontWeight: 700,
                    borderRadius: 20, padding: "3px 10px", letterSpacing: 1,
                  }}>{step.n}</div>

                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontFamily: F.hero, color: C.ink, fontSize: "clamp(11px,1.4vw,13px)", fontWeight: 600, letterSpacing: 0.3, lineHeight: 1.4, marginBottom: 6 }}>
                      {step.title}
                    </div>
                    <div style={{ fontFamily: F.body, color: C.inkLight, fontSize: "clamp(11px,1.2vw,12px)", lineHeight: 1.6, fontWeight: 300 }}>
                      {step.desc}
                    </div>
                  </div>

                  {/* Tag pill */}
                  <div style={{ marginTop: "auto" }}>
                    <span style={{
                      background: `${C.accent}12`, color: C.accent,
                      border: `1px solid ${C.accentSoft}`,
                      borderRadius: 20, padding: "2px 10px",
                      fontSize: 10, fontFamily: F.body, fontWeight: 700, letterSpacing: 0.5,
                    }}>{step.tag}</span>
                  </div>
                </div>

                {/* Arrow connector — shown between cards, not after last */}
                {i < arr.length - 1 && (
                  <div style={{
                    display: "flex", alignItems: "center", flexShrink: 0, padding: "0 4px",
                    color: C.accent, fontFamily: "monospace", fontSize: 18, fontWeight: 300,
                    userSelect: "none", whiteSpace: "nowrap"
                  }}>
                    —&gt;
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Caption */}
          <p style={{ fontFamily: F.body, color: C.inkFaint, fontSize: 11, textAlign: "center", marginTop: 14, letterSpacing: 0.5, fontStyle: "italic" }}>
            A structured pathway from recitation to realisation — explore our courses mapped to each step below
          </p>
        </div>
      </div>
    </div>
  );
}