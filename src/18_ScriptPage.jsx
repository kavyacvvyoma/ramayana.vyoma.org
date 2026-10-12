// ════════════════════════════════════════════════════════════════════════════
//  18_ScriptPage.jsx
// ════════════════════════════════════════════════════════════════════════════

import { useState, useEffect } from "react";
import { C, F } from "./01_theme";
import { PageHdr } from "./02_SharedComponents";
import { TOPICS, TRACK_DB, findTrackById, getSourceText } from "./00_DevanagariScript";
import { trackEvent } from "./analytics";
import { ScriptViewer } from "./00_ScriptViewer";

function parseUrlContext() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  return {
    topicId: params.get("topic") || null,
    trackId: params.get("track") || null,
  };
}

const CSS = `
  .sp-wrap{display:flex;align-items:stretch;min-height:calc(100svh - 70px);}

  .sp-sidebar{
    width:220px;flex-shrink:0;
    border-right:1px solid #EBE4D5;
    background:#FDFAF6;
    display:flex;flex-direction:column;
    position:sticky;top:0;height:100svh;
  }
  .sp-sidebar-head{
    padding:18px 16px 14px;
    border-bottom:1px solid #EBE4D5;
    display:flex;align-items:center;justify-content:space-between;
  }
  .sp-sidebar-body{padding:10px 0;flex:1;overflow-y:auto;}

  .sp-topic-btn{
    width:100%;text-align:left;border:none;cursor:pointer;
    padding:13px 20px;background:transparent;
    border-left:3px solid transparent;
    font-family:inherit;font-size:14px;font-weight:400;
    color:#666;transition:all 0.15s;line-height:1.4;
    display:flex;align-items:center;gap:10px;
  }
  .sp-topic-btn:hover{background:rgba(0,0,0,0.03);color:#333;}
  .sp-topic-btn.active{
    background:rgba(200,85,26,0.07);
    border-left:3px solid #C8551A;
    color:#C8551A;font-weight:600;
  }

  .sp-main{flex:1;padding:28px 40px 100px;min-width:0;overflow-x:hidden;}
  .sp-mobile-btn{display:none;}
  .sp-overlay{display:none;}
  .sp-close-btn{display:none;}

  @media(max-width:900px){
    .sp-sidebar{
      position:fixed;top:0;left:0;bottom:0;z-index:1000;
      height:100%;width:240px;background:#FFF;
      box-shadow:4px 0 20px rgba(0,0,0,0.12);
      transform:translateX(-100%);
      transition:transform 0.28s cubic-bezier(0.4,0,0.2,1);
    }
    .sp-sidebar.open{transform:translateX(0);}
    .sp-overlay{
      display:block;position:fixed;inset:0;
      background:rgba(0,0,0,0.4);z-index:999;
      opacity:0;pointer-events:none;transition:opacity 0.28s;
    }
    .sp-overlay.open{opacity:1;pointer-events:auto;}
    .sp-mobile-btn{
      display:flex;align-items:center;gap:8px;
      background:transparent;border:1px solid #EBE4D5;
      border-radius:8px;padding:8px 14px;margin-bottom:20px;
      font-size:13px;cursor:pointer;font-family:inherit;color:#666;
    }
    .sp-close-btn{display:block;}
    .sp-main{padding:16px 16px 80px;}
  }
  @media(max-width:600px){.sp-main{padding:12px 12px 80px;}}
`;

const SCRIPT_TEXTS = TOPICS.flatMap((topic) => {
  const topicData = TRACK_DB?.[topic.id] || {};

  return Object.entries(topicData).flatMap(([subId, subData]) => {
    if (subId === "chanting" || subId === "explanation") return [];

    return ["chanting", "explanation"].flatMap((section) => {
      return (subData?.[section] || [])
        .map((track) => {
          const devanagari = getSourceText(track);
          if (!devanagari) return null;

          return {
            id: track.id,
            topicId: topic.id,
            subId,
            label: track.title || track.sub || topic.label,
            devanagari,
          };
        })
        .filter(Boolean);
    });
  });
});

function getScriptText(id) {
  return SCRIPT_TEXTS.find((item) => item.id === id) || null;
}

export const ScriptPage = () => {
  const [urlCtx] = useState(() => parseUrlContext());

  const [activeId, setActiveId] = useState(() => {
    if (urlCtx.trackId) {
      const found = findTrackById(urlCtx.trackId);
      if (found) return found.track.id;
    }

    if (urlCtx.topicId) {
      const match = SCRIPT_TEXTS.find((s) => s.topicId === urlCtx.topicId);
      if (match) return match.id;
    }

    return SCRIPT_TEXTS[0]?.id || null;
  });

  const activeEntry = getScriptText(activeId) || SCRIPT_TEXTS[0] || {
    id: "empty",
    label: "No Text Found",
    devanagari: "No Devanagari text available.",
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Track when a user views a specific topic text
  useEffect(() => {
    if (activeEntry && activeEntry.id !== "empty") {
      trackEvent('script_topic_view', { 
        topic_id: activeEntry.topicId, 
        sub_id: activeEntry.subId, 
        label: activeEntry.label 
      });
    }
  }, [activeId, activeEntry]);

  return (
    <div style={{ background: C.pageBg }}>
      <style>
        {CSS}
      </style>

      <PageHdr
        title="Script Viewer"
        subtitle="Select a text from the left, then choose a script"
      />

      <div
        className={`sp-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="sp-wrap">
        <aside className={`sp-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sp-sidebar-head">
            <span
              style={{
                fontFamily: F.sans,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.inkMid,
              }}
            >
              Texts
            </span>

            <button
              className="sp-close-btn"
              onClick={() => setSidebarOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 20,
                color: C.inkLight,
                lineHeight: 1,
              }}
            >
              &times;
            </button>
          </div>

          <div className="sp-sidebar-body">
            {SCRIPT_TEXTS.map((entry) => {
              const isActive = activeId === entry.id;

              return (
                <button
                  key={entry.id}
                  className={`sp-topic-btn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setActiveId(entry.id);
                    setSidebarOpen(false);
                  }}
                >
                  <i
                    className={`ti ${isActive ? "ti-book-2" : "ti-book"}`}
                    style={{
                      fontSize: 15,
                      flexShrink: 0,
                      color: isActive ? C.accent : C.inkLight,
                    }}
                  />
                  {entry.label}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="sp-main">
          <button className="sp-mobile-btn" onClick={() => setSidebarOpen(true)}>
            <i className="ti ti-layout-sidebar" style={{ fontSize: 15 }} />
            Select text
          </button>

          <div
            style={{
              marginBottom: 18,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <a
              href={urlCtx.trackId ? `#/dailysatsanga?track=${urlCtx.trackId}` : `#/dailysatsanga`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: F.sans,
                fontSize: 13,
                color: C.accent,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              <i className="ti ti-arrow-left" style={{ fontSize: 13 }} />
              Back to Daily Satsanga
            </a>
          </div>

          <ScriptViewer 
            devanagariText={activeEntry.devanagari} 
            title={activeEntry.label} 
            trackId={activeEntry.id}
          />
        </main>
      </div>
    </div>
  );
};