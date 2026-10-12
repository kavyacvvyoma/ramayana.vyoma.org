import { useState, useEffect } from "react";
import { C, F } from "./01_theme";
import { trackEvent } from "./analytics";

// ─── Font setup ───────────────────────────────────────────────────────────────
export const GFONTS_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+Balinese&family=Noto+Sans+Bengali&family=Noto+Sans+Grantha&family=Noto+Sans+Gujarati&family=Noto+Sans+Gurmukhi&family=Noto+Sans+Javanese&family=Noto+Sans+Kannada&family=Noto+Sans+Khmer&family=Noto+Sans+Malayalam&family=Noto+Sans+Mongolian&family=Noto+Sans+Myanmar&family=Noto+Sans+Oriya&family=Noto+Sans+Saurashtra&family=Noto+Sans+Sinhala&family=Noto+Sans+Tai+Tham&family=Noto+Sans+Tamil&family=Noto+Sans+Telugu&family=Noto+Sans+Thai&family=Noto+Serif+Tibetan&family=Noto+Nastaliq+Urdu&family=Tiro+Devanagari+Sanskrit&family=Tiro+Tamil&family=Tiro+Telugu&family=Tiro+Kannada&family=Tiro+Malayalam&family=Hind+Siliguri&family=Noto+Serif+Devanagari:wght@400;600;700&display=block";

export const jsr = (pkg, v, file) =>
  `https://cdn.jsdelivr.net/npm/@fontsource/${pkg}@${v}/files/${file}`;

export const EXTRA_FONT_CSS = `
  @font-face{font-family:'Shobhika';font-style:normal;font-weight:400;font-display:block;src:url('/Shobhika-Regular.otf')format('opentype');}
  @font-face{font-family:'Noto Sans Brahmi';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-brahmi", "5.2.6", "noto-sans-brahmi-brahmi-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Serif Dogra';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-serif-dogra", "5.2.6", "noto-serif-dogra-dogra-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Kharoshthi';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-kharoshthi", "5.2.7", "noto-sans-kharoshthi-kharoshthi-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Newa';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-newa", "5.2.7", "noto-sans-newa-newa-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Phags Pa';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-phags-pa", "5.2.5", "noto-sans-phags-pa-phags-pa-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Sharada';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-sharada", "5.2.8", "noto-sans-sharada-sharada-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Siddham';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-siddham", "5.2.6", "noto-sans-siddham-siddham-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Soyombo';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-soyombo", "5.2.6", "noto-sans-soyombo-soyombo-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Takri';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-takri", "5.2.7", "noto-sans-takri-takri-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Tirhuta';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-tirhuta", "5.2.7", "noto-sans-tirhuta-tirhuta-400-normal.woff2")}')format('woff2');}
  @font-face{font-family:'Noto Sans Zanabazar Square';font-style:normal;font-weight:400;font-display:block;src:url('${jsr("noto-sans-zanabazar-square", "5.2.6", "noto-sans-zanabazar-square-zanabazar-square-400-normal.woff2")}')format('woff2');}
`;

export const SCRIPT_FONTS = {
  Devanagari: "Shobhika",
  Hindi: "Shobhika",
  Assamese: "Hind Siliguri",
  Bengali: "Hind Siliguri",
  Tamil: "Tiro Tamil",
  TamilExtended: "Tiro Tamil",
  Telugu: "Tiro Telugu",
  Kannada: "Tiro Kannada",
  Malayalam: "Tiro Malayalam",
  Gujarati: "Noto Sans Gujarati",
  Gurmukhi: "Noto Sans Gurmukhi",
  Oriya: "Noto Sans Oriya",
  Thai: "Noto Sans Thai",
  KhomThai: "Noto Sans Thai",
  Khmer: "Noto Sans Khmer",
  Burmese: "Noto Sans Myanmar",
  Balinese: "Noto Sans Balinese",
  Javanese: "Noto Sans Javanese",
  TaiTham: "Noto Sans Tai Tham",
  Tibetan: "Noto Serif Tibetan",
  Mongolian: "Noto Sans Mongolian",
  Brahmi: "Noto Sans Brahmi",
  Grantha: "Noto Sans Grantha",
  GranthaPandya: "Noto Sans Grantha",
  Sharada: "Noto Sans Sharada",
  Sinhala: "Noto Sans Sinhala",
  Kharoshthi: "Noto Sans Kharoshthi",
  Tirhuta: "Noto Sans Tirhuta",
  Takri: "Noto Sans Takri",
  Dogra: "Noto Serif Dogra",
  Newa: "Noto Sans Newa",
  Saurashtra: "Noto Sans Saurashtra",
  PhagsPa: "Noto Sans Phags Pa",
  Soyombo: "Noto Sans Soyombo",
  ZanabazarSquare: "Noto Sans Zanabazar Square",
  Siddham: "Noto Sans Siddham",
  Ranjana: null,
  Urdu: "Noto Nastaliq Urdu",
  IAST: "Georgia",
  ISO: "Georgia",
  IPA: "Georgia",
  RomanReadable: "Georgia",
  RussianCyrillic: "Georgia",
};

export const NO_FONT_SCRIPTS = new Set(["Ranjana"]);

export const QUICK_SCRIPTS = [
  { id: "Devanagari", label: "Devanagari", native: "देवनागरी" },
  { id: "Kannada", label: "Kannada", native: "ಕನ್ನಡ" },
  { id: "Telugu", label: "Telugu", native: "తెలుగు" },
  { id: "Tamil", label: "Tamil", native: "தமிழ்" },
  { id: "Malayalam", label: "Malayalam", native: "മലയാളം" },
  { id: "IAST", label: "IAST", native: "IAST" },
];

export const QUICK_IDS = new Set(QUICK_SCRIPTS.map((s) => s.id));

export const DROPDOWN_GROUPS = [
  {
    group: "All Languages",
    scripts: [
      { id: "Hindi", label: "Hindi" },
      { id: "Bengali", label: "Bengali" },
      { id: "Assamese", label: "Assamese" },
      { id: "Gujarati", label: "Gujarati" },
      { id: "Gurmukhi", label: "Gurmukhi (Punjabi)" },
      { id: "Oriya", label: "Oriya" },
      { id: "Urdu", label: "Urdu" },
      { id: "TamilExtended", label: "Tamil (Extended)" },
      { id: "Sinhala", label: "Sinhala" },
      { id: "Grantha", label: "Grantha" },
      { id: "GranthaPandya", label: "Grantha (Pandya)" },
      { id: "Thai", label: "Thai" },
      { id: "KhomThai", label: "Khom Thai" },
      { id: "Khmer", label: "Khmer" },
      { id: "Burmese", label: "Burmese" },
      { id: "Balinese", label: "Balinese" },
      { id: "Javanese", label: "Javanese" },
      { id: "TaiTham", label: "Tai Tham" },
      { id: "Tibetan", label: "Tibetan" },
      { id: "Mongolian", label: "Mongolian" },
      { id: "PhagsPa", label: "Phags-pa" },
      { id: "Soyombo", label: "Soyombo" },
      { id: "ZanabazarSquare", label: "Zanabazar Square" },
      { id: "Brahmi", label: "Brahmi" },
      { id: "Kharoshthi", label: "Kharoshthi" },
      { id: "Sharada", label: "Sharada" },
      { id: "Tirhuta", label: "Tirhuta" },
      { id: "Takri", label: "Takri" },
      { id: "Dogra", label: "Dogra" },
      { id: "Newa", label: "Newa" },
      { id: "Saurashtra", label: "Saurashtra" },
      { id: "Siddham", label: "Siddham" },
      { id: "Ranjana", label: "Ranjana ⚠️" },
      { id: "ISO", label: "ISO" },
      { id: "IPA", label: "IPA" },
      { id: "RomanReadable", label: "Readable Roman" },
      { id: "RussianCyrillic", label: "Cyrillic" },
    ],
  },
];

export const ALL_SCRIPTS_FLAT = [
  ...QUICK_SCRIPTS,
  ...DROPDOWN_GROUPS.flatMap((g) => g.scripts),
];

const injected = { g: false, e: false };

export function injectFonts() {
  if (!injected.g) {
    injected.g = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = GFONTS_URL;
    document.head.appendChild(link);
  }

  if (!injected.e) {
    injected.e = true;
    const style = document.createElement("style");
    style.textContent = EXTRA_FONT_CSS;
    document.head.appendChild(style);
  }
}

export async function waitForFont(family) {
  if (!family || ["Georgia", "serif", "sans-serif"].includes(family)) return;
  try {
    await document.fonts.load(`400 24px "${family}"`);
  } catch (e) {
    console.warn("Font load failed:", family);
  }
}

export function ScriptViewer({ 
  devanagariText, 
  title, 
  trackId = null,
  minHeight = 280,
  controlsPosition = "top",
  contentPadding = "32px 36px",
  style = {}
}) {
  const [targetScript, setTargetScript] = useState("Devanagari");
  const [translatedText, setTranslatedText] = useState(devanagariText);
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [isLoading, setIsLoading] = useState(false);
  const [fontReady, setFontReady] = useState(true);

  useEffect(() => {
    injectFonts();
  }, []);

  useEffect(() => {
    trackEvent('script_language_change', { language: targetScript, track_id: trackId });
  }, [targetScript, trackId]);

  const aksharaTarget = targetScript === "Hindi" ? "Devanagari" : targetScript;

  useEffect(() => {
    const family = SCRIPT_FONTS[targetScript];

    if (aksharaTarget === "Devanagari") {
      setFontReady(false);
      setTranslatedText(devanagariText);
      setTranslatedTitle(title);
      waitForFont(family).then(() => setFontReady(true));
      return;
    }

    if (NO_FONT_SCRIPTS.has(targetScript)) {
      setFontReady(true);
      setTranslatedText(devanagariText);
      setTranslatedTitle(title);
      return;
    }

    const run = async () => {
      setIsLoading(true);
      setFontReady(false);

      try {
        const base = {
          source: "Devanagari",
          target: aksharaTarget,
          nativize: true,
          postOptions: [],
          preOptions: [],
        };

        const fetches = [
          fetch("https://aksharamukha-plugin.appspot.com/api/plugin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...base, text: devanagariText }),
          })
        ];

        if (title) {
          fetches.push(
            fetch("https://aksharamukha-plugin.appspot.com/api/plugin", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...base, text: title }),
            })
          );
        }

        const responses = await Promise.all(fetches);

        let text = await responses[0].text();
        let fetchedTitle = null;

        if (title && responses.length > 1) {
          fetchedTitle = await responses[1].text();
        }

        try { text = JSON.parse(text); } catch (e) { }
        if (fetchedTitle) {
          try { fetchedTitle = JSON.parse(fetchedTitle); } catch (e) { }
        }

        await waitForFont(family);
        setTranslatedText(text);
        if (fetchedTitle) setTranslatedTitle(fetchedTitle);
        setFontReady(true);
      } catch (err) {
        console.error(err);
        setTranslatedText(devanagariText);
        setTranslatedTitle(title);
        setFontReady(true);
      }

      setIsLoading(false);
    };

    run();
  }, [targetScript, devanagariText, title, aksharaTarget]);

  const fontFamily = SCRIPT_FONTS[targetScript];
  const currentFont = fontFamily ? `'${fontFamily}', serif` : "serif";
  const noFont = NO_FONT_SCRIPTS.has(targetScript);
  const showContent = fontReady && !isLoading;
  const isDropdownActive = !QUICK_IDS.has(targetScript);
  const activeScriptLabel =
    ALL_SCRIPTS_FLAT.find((s) => s.id === targetScript)?.label || targetScript;

  const controlsNode = (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
          padding: "12px 16px",
          background: C.cardBg,
          borderRadius: 12,
          border: `1px solid ${C.inkGhost}`,
          marginBottom: controlsPosition === "top" ? 20 : 0,
          marginTop: controlsPosition === "bottom" ? 20 : 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {QUICK_SCRIPTS.map((s) => {
          const active = targetScript === s.id;

          return (
            <button
              key={s.id}
              onClick={() => setTargetScript(s.id)}
              disabled={isLoading}
              title={s.label}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: `1px solid ${active ? C.accent : C.inkGhost}`,
                background: active ? C.accent : "transparent",
                color: active ? "#fff" : C.inkMid,
                fontFamily: F.sans,
                fontSize: 12,
                fontWeight: active ? 600 : 400,
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                opacity: isLoading ? 0.6 : 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                lineHeight: 1.2,
                minWidth: 58,
              }}
            >
              <span style={{ fontSize: 15 }}>{s.native}</span>
              <span style={{ fontSize: 10, opacity: 0.75 }}>{s.label}</span>
            </button>
          );
        })}

        <div
          style={{
            width: 1,
            height: 36,
            background: C.inkGhost,
            margin: "0 2px",
            flexShrink: 0,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <i className="ti ti-world" style={{ fontSize: 13, color: C.inkMid }} />

          <select
            value={isDropdownActive ? targetScript : ""}
            onChange={(e) => {
              if (e.target.value) setTargetScript(e.target.value);
            }}
            disabled={isLoading}
            style={{
              padding: "7px 10px",
              borderRadius: 8,
              border: `1px solid ${isDropdownActive ? C.accent : C.inkGhost}`,
              fontFamily: F.sans,
              fontSize: 12,
              color: isDropdownActive ? C.accent : C.inkMid,
              fontWeight: isDropdownActive ? 600 : 400,
              background: isDropdownActive ? `${C.accent}08` : "#FFF",
              cursor: "pointer",
              outline: "none",
              minWidth: 150,
            }}
          >
            <option value="">More scripts…</option>
            {DROPDOWN_GROUPS.map(({ group, scripts }) => (
              <optgroup key={group} label={group}>
                {scripts.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {(isLoading || !fontReady) && (
          <i
            className="ti ti-loader"
            style={{
              fontSize: 15,
              animation: "sv-spin 1s linear infinite",
              color: C.accent,
              marginLeft: 4,
            }}
          />
        )}
      </div>

      <div
        style={{
          marginBottom: controlsPosition === "top" ? 16 : 0,
          marginTop: controlsPosition === "bottom" ? 16 : 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {title && (
          <>
            <span
              style={{
                fontFamily: F.sans,
                fontSize: 13,
                color: C.ink,
                fontWeight: 600,
              }}
            >
              {title}
            </span>
            <span style={{ color: C.inkGhost }}>·</span>
          </>
        )}

        {controlsPosition !== "bottom" && (
          <span style={{ fontFamily: F.sans, fontSize: 12, color: C.inkMid }}>
            Viewing in <strong style={{ color: C.ink }}>{activeScriptLabel}</strong>
          </span>
        )}

        {noFont && (
          <span
            style={{
              fontSize: 11,
              background: "#FFF8E1",
              color: "#795548",
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid #FFE082",
            }}
          >
            ⚠️ No public font for Ranjana — boxes expected
          </span>
        )}
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", ...style }}>
      <style>
        {`
        @keyframes sv-spin{100%{transform:rotate(360deg);}}
        @keyframes sv-pulse{0%,100%{opacity:0.4;}50%{opacity:0.9;}}
        @keyframes sv-fadeIn{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:none;}}
        `}
      </style>

      {controlsPosition === "top" && controlsNode}

      <div
        style={{
          background: C.cardBg,
          borderRadius: 16,
          padding: contentPadding,
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
          border: `1px solid ${C.inkGhost}`,
          minHeight,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: showContent ? "flex-start" : "center",
          position: "relative",
        }}
      >

        {!showContent && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              width: "100%",
              paddingTop: 16,
            }}
          >
            {title && (
              <>
                <div
                  style={{
                    height: 32,
                    width: "48%",
                    borderRadius: 8,
                    background: C.inkGhost,
                    animation: "sv-pulse 1.4s ease-in-out infinite",
                  }}
                />
                <div
                  style={{
                    height: 1,
                    width: "100%",
                    background: C.inkGhost,
                    margin: "12px 0",
                  }}
                />
              </>
            )}
            {[100, 85, 92, 78, 88, 82, 94, 76, 90, 84, 96].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 20,
                  width: `${w}%`,
                  borderRadius: 5,
                  background: C.inkGhost,
                  animation: `sv-pulse 1.4s ease-in-out ${i * 0.07}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {showContent && (
          <div style={{ animation: "sv-fadeIn 0.25s ease", width: "100%" }}>
            {title && translatedTitle && (
              <h2
                style={{
                  fontFamily: currentFont,
                  fontSize: 28,
                  color: C.ink,
                  textAlign: "center",
                  marginBottom: 32,
                  lineHeight: 1.6,
                }}
              >
                {translatedTitle}
              </h2>
            )}

          {controlsPosition === "bottom" && (
            <div style={{
              display: "flex", justifyContent: "flex-start",
              marginBottom: 10,
            }}>
              <span style={{
                fontFamily: F.sans,
                fontSize: 10,
                color: C.inkLight,
                background: `${C.accent}08`,
                border: `1px solid ${C.inkGhost}`,
                padding: "2px 8px",
                borderRadius: 12,
              }}>
                Viewing in <span style={{ fontWeight: 600, color: C.accent }}>{activeScriptLabel}</span>
              </span>
            </div>
          )}
            <div
              style={{
                fontFamily: currentFont,
                fontSize: 21,
                fontWeight: 600,
                color: C.inkMid,
                lineHeight: 2.2,
                textAlign: "center",
                whiteSpace: "pre-wrap",
              }}
            >
              {translatedText}
            </div>
          </div>
        )}
      </div>

      {controlsPosition === "bottom" && controlsNode}
    </div>
  );
}
