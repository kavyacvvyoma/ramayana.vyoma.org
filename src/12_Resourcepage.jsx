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
    title:       "Dhyānaśloka",
    titleSkt:    "ध्यानश्लोक",
    langs: [
      { lang: "Devanagari", label: "देवनागरी", file: "/FGFR_Devanagari_Dhyanasloka_29012026.pdf" },
      { lang: "IAST",       label: "IAST",      file: "/FGFR_IAST_Dhyanashloka_29012026.pdf" },
      { lang: "Kannada",    label: "ಕನ್ನಡ",     file: "/FGFR_Kannada_Dhyanashloka_29012026.pdf" },
      { lang: "Tamil",      label: "தமிழ்",     file: "/FGFR_Tamil_Dhyanashlokas_29012026.pdf" },
      { lang: "Malayalam",  label: "മലയാളം",    file: "/FGFR_Malayalam_Dhyanashlokas_29012026.pdf" },
      { lang: "Telugu",     label: "తెలుగు",    file: "/FGFR_Telugu_Dhyanashloka_29012026.pdf" },
    ],
  },
  gayatri: {
    title:       "Gāyatrī Rāmāyaṇa",
    titleSkt:    "गायत्री रामायण",
    langs: [
      { lang: "Devanagari", label: "देवनागरी", file: "/FGFR_Devanagari_gayatriramayana_27022026.pdf" },
      { lang: "IAST",       label: "IAST",      file: "/FGFR_IAST_gayatriramayana_27022026.pdf" },
      { lang: "Kannada",    label: "ಕನ್ನಡ",     file: "/FGFR_Kannada_gayatriramayana_27022026.pdf" },
    ],
  },
  mangalasloka: {
    title:       "Maṅgalaśloka",
    titleSkt:    "मङ्गलश्लोक",
    langs: [
      { lang: "Devanagari", label: "देवनागरी", file: "/FGFR_Devanagari_Mangalasloka_26022026.pdf" },
      { lang: "IAST",       label: "IAST",      file: "/FGFR_IAST_Mangalasloka_26022026.pdf" },
      { lang: "Kannada",    label: "ಕನ್ನಡ",     file: "/FGFR_Kannada_Mangalasloka_26022026.pdf" },
      { lang: "Tamil",      label: "தமிழ்",     file: "/FGFR_Tamil_Mangalasloka_26022026.pdf" },
      { lang: "Malayalam",  label: "മലയാളം",    file: "/FGFR_Malayalam_Mangalasloka_26022026.pdf" },
      { lang: "Telugu",     label: "తెలుగు",    file: "/FGFR_Telugu_Mangalasloka_26022026.pdf" },
    ],
  },
};

const EXTERNAL_LINKS = [
  { category: "Vālmīki Rāmāyaṇa — Sanskrit Texts", links: [
    { label: "Valmiki Ramayana — valmikiramayan.net", url: "https://www.valmikiramayan.net/", desc: "Complete Sanskrit text with verse-by-verse navigation" },
    { label: "Valmiki Ramayana — IIT Kanpur", url: "https://www.valmiki.iitk.ac.in/", desc: "Searchable Sanskrit text hosted by IIT Kanpur" },
    { label: "Sanskrit Documents — Valmiki Ramayana", url: "https://sanskritdocuments.org/sites/valmikiramayan/", desc: "Valmiki Ramayana in multiple scripts and formats" },
    { label: "Sanskrit Documents — Ramayana Mirror", url: "https://sanskritdocuments.org/mirrors/ramayana/", desc: "Mirror archive of Ramayana texts in various scripts" },
    { label: "GRETIL — Ramayana Texts", url: "https://gretil.sub.uni-goettingen.de/gretil.html#Ram", desc: "Göttingen Register of Electronic Texts in Indian Languages — Ramayana section" },
    { label: "Valmiki Ramayanam — valmikiramayanam.in", url: "https://valmikiramayanam.in/", desc: "Dedicated site for Valmiki Ramayana with translations" },
    { label: "Ambuda — Ramayanam", url: "https://ambuda.org/texts/ramayanam/", desc: "Clean reader interface for the Valmiki Ramayana" },
    { label: "Sanskrit Sahitya — Ramayanam", url: "https://sanskritsahitya.org/ramayanam/1.1", desc: "Sanskrit literary resource with Ramayana text" },
    { label: "Digital Sanskrit — Sundara Kāṇḍa", url: "https://digitalsanskrit.com/E-books/srimadvalmikiramayanam_sundarakandah/", desc: "E-book of Sundarakāṇḍa from Śrīmad Vālmīki Rāmāyaṇam" },
  ]},
  { category: "Adhyātma Rāmāyaṇa & Other Versions", links: [
    { label: "Adhyatma Ramayana — Sanskrit Documents", url: "https://sanskritdocuments.org/sanskrit/adhyatmaramayana/", desc: "Adhyātma Rāmāyaṇa text in Sanskrit with script options" },
    { label: "Ramcharitmanas — IIT Kanpur", url: "https://www.ramcharitmanas.iitk.ac.in/", desc: "Tulsidas's Ramcharitmanas with text and navigation" },
    { label: "Ramcharitmanas — VedPuran Audio", url: "https://www.vedpuran.com/listenmahakavya_Ramacharitamanasa.asp", desc: "Listen to Ramcharitmanas recitations online" },
  ]},
  { category: "Digital Libraries & Archives", links: [
    { label: "Vedic Reserve — Itihasa", url: "https://vedicreserve.miu.edu/itihas.htm", desc: "Vedic heritage archive — Itihāsa section including Ramayana" },
    { label: "Sacred Texts — Ramayana", url: "https://sacred-texts.com/hin/rama/", desc: "Classic Ramayana translations in the Sacred Texts archive" },
    { label: "Bombay Indology", url: "https://bombay.indology.info/", desc: "Indological resources and Sanskrit text collections" },
    { label: "Veducation Library — Ramayana", url: "https://www.veducation.world/library/Sastra-शास्त्र/ramayana", desc: "Curated Ramayana resources in the Veducation digital library" },
  ]},
  { category: "Academic & Reference", links: [
    { label: "Sanskrit NIC — Epics", url: "https://www.sanskrit.nic.in/about_sanskrit.php#epics", desc: "Government of India Sanskrit portal — section on epic literature" },
    { label: "NSKTU — Ramayana on the Internet", url: "https://nsktu.ac.in/index.php/ramayana-on-internet/", desc: "Curated index of Ramayana resources across the web" },
  ]},
];

// ── PDF Tab Component ─────────────────────────────────────────────────────────
function PdfTab({ dataKey }) {
  const data = PDF_DATA[dataKey];
  const [activeLang, setActiveLang] = useState("Devanagari");
  const current = data.langs.find(l => l.lang === activeLang) || data.langs[0];

  return (
    <div>
     

      {/* Language switcher — pill buttons below the tab */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "'Poppins',sans-serif", color: C.ink,
          fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10,
          textTransform: "uppercase" }}>
          Select Language / Script
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {data.langs.map(l => {
            const isActive = activeLang === l.lang;
            return (
              <button key={l.lang} onClick={() => setActiveLang(l.lang)} className="bt"
                style={{
                  background:  isActive ? C.accent : C.cardBg,
                  color:       isActive ? C.white  : C.inkMid,
                  border:      `1.5px solid ${isActive ? C.accent : C.inkGhost}`,
                  borderRadius: 24, padding: "7px 18px",
                  fontFamily: "'Poppins',sans-serif", fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  cursor: "pointer", whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                {l.label}
                {l.lang === "Devanagari" && (
                  <span style={{ fontSize: 9, opacity: 0.65, fontFamily: "'Poppins',sans-serif",
                    background: isActive ? "rgba(255,255,255,0.25)" : C.accentBg,
                    borderRadius: 10, padding: "1px 6px" }}>default</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* PDF viewer box */}
      <div style={{ border: `1px solid ${C.inkGhost}`, borderRadius: 12,
        overflow: "hidden", boxShadow: "0 2px 12px rgba(42,26,10,0.06)" }}>

        {/* Header bar */}
        <div style={{ background: C.accent,
          padding: "12px 20px", display: "flex",
          justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* PDF icon */}
            <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: 8,
              width: 36, height: 36, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="8" y1="13" x2="16" y2="13"/>
                <line x1="8" y1="17" x2="12" y2="17"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Poppins',sans-serif", color: C.white,
                fontSize: 14, fontWeight: 700 }}>
                {data.title}

              </div>
              <div style={{ fontFamily: "'Poppins',sans-serif",
                color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 2 }}>
                {current.lang} · PDF Document
              </div>
            </div>
          </div>
          <a href={current.file} target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.16)",
              border: "1.5px solid rgba(255,255,255,0.45)",
              color: C.white, borderRadius: 6, padding: "7px 16px",
              fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 700,
              textDecoration: "none", whiteSpace: "nowrap" }}>
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

      <p style={{ fontFamily: "'Futura', 'Trebuchet MS', sans-serif", color: C.inkFaint,
        fontSize: 12, marginTop: 10, textAlign: "center", fontStyle: "italic" }}>
        If the PDF does not load, use the "Open / Download" button above.
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function ResourcesPage() {
  const [section, setSection] = useState("whatsapp");

  const TABS = [
    { key: "whatsapp",     label: "WhatsApp Group",       skt: null },
    { key: "dhyanasloka",  label: "Dhyānaśloka",         skt: null },
    { key: "gayatri",      label: "Gāyatrī Rāmāyaṇa",   skt: null },
    { key: "mangalasloka", label: "Maṅgalaśloka",         skt: null },
    { key: "links",        label: "Study Links",          skt: null },
  ];

  return (
    <div className="pi">
      <PageHdr title="Resources"
        subtitle="PDFs · Shlokas · Audio Recitations · Study Links"
        accentColor={C.orange1} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "30px 24px 36px" }}>

        {/* ── Tab bar ── */}
        <div style={{ display: "flex", gap: 0,
          borderBottom: `1px solid ${C.inkGhost}`,
          marginBottom: 32, overflowX: "auto" }}>
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
                {tab.skt && (
                  <span style={{ fontFamily: "'Noto Serif Devanagari',serif",
                    fontSize: 10, opacity: isActive ? 0.8 : 0.5,
                    color: isActive ? C.accent : C.inkLight }}>
                    {tab.skt}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── WhatsApp Group tab ── */}
        {section === "whatsapp" && (
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ background: "#25D366", borderRadius: 12,
                width: 48, height: 48, display: "flex", alignItems: "center",
                justifyContent: "center", flexShrink: 0,
                boxShadow: "0 4px 12px rgba(37,211,102,0.3)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h2 style={{ fontFamily: "'Poppins',sans-serif", color: C.brown1,
                  fontSize: 20, fontWeight: 700, margin: 0 }}>
                  WhatsApp Group
                </h2>
                <p style={{ fontFamily: "'Futura', 'Trebuchet MS', sans-serif",
                  color: C.inkMid, fontSize: 13, margin: "4px 0 0" }}>
                  Join our community group to stay connected
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                {
                  label: "WhatsApp Group — Link 1",
                  url: "https://chat.whatsapp.com/LvYDaHEWXzU1ZoShqUC2PH",
                  desc: "Click to join our WhatsApp community group",
                },
                {
                  label: "WhatsApp Group — Link 2",
                  url: "https://chat.whatsapp.com/LvYDaHEWXzU1ZoShqUC2PH",
                  desc: "Alternate invite link to the WhatsApp group",
                },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac",
                    borderRadius: 12, padding: "14px 18px",
                    display: "flex", alignItems: "center", gap: 14,
                    transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#25D366"; e.currentTarget.style.background = "#dcfce7"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#86efac"; e.currentTarget.style.background = "#f0fdf4"; }}>
                    <div style={{ background: "#25D366", borderRadius: 8,
                      width: 36, height: 36, display: "flex", alignItems: "center",
                      justifyContent: "center", flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Poppins',sans-serif", color: "#15803d",
                        fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
                        {link.label} ↗
                      </div>
                      <div style={{ fontFamily: "'Futura', 'Trebuchet MS', sans-serif",
                        color: C.inkMid, fontSize: 13 }}>{link.desc}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── PDF tabs ── */}
        {section === "dhyanasloka"  && <PdfTab dataKey="dhyanasloka" />}
        {section === "gayatri"      && <PdfTab dataKey="gayatri" />}
        {section === "mangalasloka" && <PdfTab dataKey="mangalasloka" />}

        {/* ── Study Links ── */}
        {section === "links" && (
          <div style={{ display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,460px),1fr))",
            gap: 20 }}>
            {EXTERNAL_LINKS.map(cat => (
              <Card key={cat.category}>
                <h3 style={{ fontFamily: "'Poppins',sans-serif", color: C.brown1,
                  fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                  {cat.category}
                </h3>
                <Divider />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
                  {cat.links.map(link => (
                    <a key={link.label} href={link.url} target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}>
                      <div style={{ background: C.accentBg, border: `1px solid ${C.accentSoft}`,
                        borderRadius: 8, padding: "10px 14px", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentMid; e.currentTarget.style.background = `${C.accent}10`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C.accentSoft; e.currentTarget.style.background = C.accentBg; }}>
                        <div style={{ fontFamily: "'Poppins',sans-serif", color: C.accent,
                          fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{link.label} ↗</div>
                        <div style={{ fontFamily: "'Futura', 'Trebuchet MS', sans-serif",
                          color: C.inkMid, fontSize: 14, lineHeight: 1.5 }}>{link.desc}</div>
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