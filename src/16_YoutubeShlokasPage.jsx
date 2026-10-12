// ════════════════════════════════════════════════════════════════════════════
//  15_YoutubeShlokasPage.jsx  —  nav: "YT Shlokas"
//  Audio/Video streaming UI (Spotify style) for YouTube timestamped tracks
// ════════════════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { C, F } from "./01_theme";
import { PageHdr } from "./02_SharedComponents";
import { trackEvent } from "./analytics";
import { ScriptViewer } from "./00_ScriptViewer";
import { TRACK_DB, LYRICS, SCHEDULE_W1, initializeS3Schedule } from "./16_ScheduleData";
import Hls from "hls.js";
import s3VideosFormat from "./s3_videos_format.json";

// ── Mock Data Generation ──────────────────────────────────────────────────────
const TOPICS_STATIC = [
  {
    id: "sankshepa",
    label: "Saṅkṣepa Rāmāyaṇa",
    subtopics: [
      { id: "s-week-1", label: "Week 01" },
      { id: "s-week-2", label: "Week 02" },
      { id: "s-week-3", label: "Week 03" },
      { id: "s-week-4", label: "Week 04" },
      { id: "s-week-5", label: "Week 05" },
      { id: "s-week-6", label: "Week 06" },
      { id: "s-week-7", label: "Week 07" },
      { id: "s-week-8", label: "Week 08" },
      { id: "s-week-9", label: "Week 09" },
      { id: "s-week-10", label: "Week 10" },
      { id: "s-week-11", label: "Week 11" },
      { id: "s-week-12", label: "Week 12" },
      { id: "s-week-13", label: "Week 13" },
      { id: "s-week-14", label: "Week 14" },
      { id: "s-week-15", label: "Week 15" }
    ]
  }
];

// ── Track data is managed in 16_ScheduleData.js ─────────────────────────────
// Edit SCHEDULE_W1 there to add/update days from the content team spreadsheet.
// TRACK_DB is imported above.

// ── Schedule helper ─────────────────────────────────────────────────────────
// Returns true if track is unlocked (no liveAt, or liveAt is in the past)
// ⚠️ TESTING: Day 02 is force-unlocked — remove the n===2 check before production
const isTrackLive = (track) => {
  if (!track.liveAt) return true;
  return new Date() >= new Date(track.liveAt);
};

// Returns true if a week has at least one live track
const isWeekLive = (topicId, subtopicId) => {
  const weekData = TRACK_DB[topicId]?.[subtopicId];
  if (!weekData) return false;
  const allTracks = [...(weekData.chanting || []), ...(weekData.explanation || [])];
  return allTracks.some(t => isTrackLive(t));
};

// Format liveAt as a human-friendly date string (IST)
const formatLiveDate = (isoStr) => {
  const d = new Date(isoStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const IcoHeadphones = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z" /></svg>;
const IcoLyrics = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" /></svg>;
const IcoShare = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>;

const formatCount = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const YT_RESPONSIVE_CSS = `
  .yt-wa-section { max-width: 1400px; margin: 6rem auto 0; width: 100%; padding: 0 40px; box-sizing: border-box; }
  .yt-wrapper { display: flex; flex: 1; max-width: 1400px; margin: 1rem auto 0; width: 100%; }
  .yt-sidebar { width: 240px; border-right: 1px solid #EBE4D5; padding: 8px 20px 30px; display: flex; flex-direction: column; gap: 6px; background: linear-gradient(to right, transparent, rgba(0,0,0,0.02)); flex-shrink: 0; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .yt-sidebar-overlay { display: none; }
  .yt-mobile-library-btn { display: none; }
  .yt-mobile-close { display: none; }
  
  .yt-main { flex: 1; padding: 8px 40px 30px; height: auto; overflow: visible; }
  .yt-split { display: flex; gap: 32px; align-items: flex-start; }
  .yt-video-col { flex: 0 0 62%; position: sticky; top: 90px; z-index: 10; align-self: flex-start; scroll-margin-top: 100px; }
  .yt-playlist-col { flex: 1; background: #FFFFFF; border-radius: 12px; padding: 20px 20px 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.05); border: 1px solid #EBE4D5; min-width: 0; }
  
  .yt-sidebar { width: 240px; border-right: 1px solid #EBE4D5; padding: 8px 20px 30px; display: flex; flex-direction: column; gap: 6px; background: linear-gradient(to right, transparent, rgba(0,0,0,0.02)); flex-shrink: 0; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); overflow-y: auto; position: sticky; top: 90px; height: calc(100svh - 100px); align-self: flex-start; }
  .yt-sidebar.collapsed-desktop { width: 64px; padding-left: 12px; padding-right: 12px; }
  .yt-sidebar.collapsed-desktop .yt-sb-content { opacity: 0; pointer-events: none; height: 0; overflow: hidden; }
  .yt-sidebar.collapsed-desktop .yt-sb-title { display: none; }
  
  .yt-desktop-toggle-sb { display: flex; align-items: center; justify-content: center; background: transparent; border: none; cursor: pointer; color: #1E1E1E; padding: 6px; border-radius: 6px; transition: background 0.2s; }
  .yt-desktop-toggle-sb:hover { background: rgba(0,0,0,0.05); }

  .yt-video-player-container {
    width: 100%;
    background: #000;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    aspect-ratio: 16/9;
    position: relative;
  }

  .gd-player-container {
    width: 100%;
    height: 100%;
    background: #000;
    position: relative;
    overflow: hidden;
  }
  .gd-player-iframe {
    border: none;
    position: absolute;
    top: -56px;
    left: 0;
    width: 100%;
    height: calc(100% + 56px);
  }

  @media (max-width: 1024px) {
    .yt-desktop-toggle-sb { display: none; }
    .yt-sidebar.collapsed-desktop { width: 320px; padding: 20px; opacity: 1; }
    .yt-sidebar.collapsed-desktop .yt-sb-content { opacity: 1; pointer-events: auto; height: auto; overflow: visible; }
    .yt-sidebar.collapsed-desktop .yt-sb-title { display: block; }
    .yt-wa-section { margin-top: 5.5rem; padding: 0 24px; }
    .yt-wrapper { flex-direction: column; margin-top: 1rem; }
    
    /* Turn sidebar into a sliding drawer */
    .yt-sidebar { 
      position: fixed; top: 0; left: 0; bottom: 0; z-index: 1000; 
      width: 320px; max-width: 85vw; background: #FFFFFF;
      box-shadow: 4px 0 24px rgba(0,0,0,0.15);
      transform: translateX(-100%); padding: 20px; max-height: none;
    }
    .yt-sidebar.open { transform: translateX(0); }
    
    .yt-sidebar-overlay {
      display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999;
      opacity: 0; pointer-events: none; transition: opacity 0.3s;
    }
    .yt-sidebar-overlay.open {
      opacity: 1; pointer-events: auto; backdrop-filter: blur(2px);
    }
    
    .yt-mobile-library-btn { 
      display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 12px 20px; background: #C8551A; color: #FFFFFF; 
      border-radius: 8px; font-weight: 600; font-family: 'Poppins', sans-serif; font-size: 14px;
      border: none; margin-bottom: 24px; cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(200,85,26,0.2);
    }
    .yt-mobile-close { display: block; }

    .yt-main { height: auto; overflow-y: visible; padding: 24px; }
    .yt-split { flex-direction: column; gap: 24px; }
    .yt-video-col { flex: none; width: 100%; position: static; }
    .yt-playlist-col { flex: none; width: 100%; box-sizing: border-box; }
    
    .yt-video-player-container.gd-active {
      aspect-ratio: 4/3;
    }
  }

  @media (max-width: 600px) {
    .yt-wa-section { margin-top: 4.5rem; padding: 0 12px; }
    .yt-wrapper { margin-top: 1rem; }
    .yt-main { padding: 16px 12px; }
  }
`;

// ── Local HTML5 Video Player ──────────────────────────────────────────────────
const LocalVideoPlayer = ({ videoUrl, onProgress, playerInstanceRef }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (videoUrl && videoUrl.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hlsRef.current = hls;
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
      }
    } else {
      video.src = videoUrl;
      video.load();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (onProgress) {
        onProgress(video.currentTime);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoUrl, onProgress]);

  useEffect(() => {
    if (playerInstanceRef) {
      playerInstanceRef.current = {
        seekToStart: (startSeconds) => {
          if (videoRef.current) {
            videoRef.current.currentTime = startSeconds || 0;
            videoRef.current.play().catch(() => {});
          }
        },
        skipIntro: (startSeconds) => {
          if (videoRef.current) {
            videoRef.current.currentTime = (startSeconds || 0) + 5;
            videoRef.current.play().catch(() => {});
          }
        }
      };
    }
  }, [playerInstanceRef]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <video
        ref={videoRef}
        controls
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        autoPlay
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

const FastYouTubePlayer = ({ track, onProgress, playerInstanceRef }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const [apiLoaded, setApiLoaded] = useState(!!window.YT);
  const onProgressRef = useRef(onProgress);
  const [showEndOverlay, setShowEndOverlay] = useState(false);

  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  // Reset overlay when track changes
  useEffect(() => {
    setShowEndOverlay(false);
  }, [track]);

  // Expose seekToStart and skipIntro so parent can call them imperatively
  useEffect(() => {
    if (playerInstanceRef) {
      playerInstanceRef.current = {
        seekToStart: (startSeconds) => {
          if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
            playerRef.current.seekTo(Math.floor(startSeconds || 0), true);
            if (typeof playerRef.current.playVideo === 'function') {
              playerRef.current.playVideo();
            }
          }
          setShowEndOverlay(false);
        },
        skipIntro: (startSeconds) => {
          if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
            playerRef.current.seekTo(Math.floor((startSeconds || 0) + 5), true);
            if (typeof playerRef.current.playVideo === 'function') {
              playerRef.current.playVideo();
            }
          }
          setShowEndOverlay(false);
        }
      };
    }
  });

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = () => {
        setApiLoaded(true);
      };
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    } else {
      setApiLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!apiLoaded || !track || !containerRef.current) return;

    const initialStart = track.startSeconds || 0;

    if (!playerRef.current) {
      const playerVars = {
        start: Math.floor(initialStart),
        autoplay: 1,
        rel: 0,
        modestbranding: 1
      };
      if (track.endSeconds) {
        playerVars.end = Math.floor(track.endSeconds);
      }
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: track.videoId,
        playerVars,
        events: {
          onReady: (event) => {
            try {
              event.target.unloadModule("captions");
              event.target.unloadModule("cc");
            } catch (e) {
              console.warn("Could not unload captions module onReady:", e);
            }
            try {
              event.target.playVideo();
            } catch (e) {}
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              try {
                event.target.unloadModule("captions");
                event.target.unloadModule("cc");
              } catch (e) {
                console.warn("Could not unload captions module onStateChange:", e);
              }
            }
          }
        }
      });
    } else {
      if (typeof playerRef.current.loadVideoById === 'function') {
        const loadArgs = {
          videoId: track.videoId,
          startSeconds: Math.floor(initialStart)
        };
        if (track.endSeconds) {
          loadArgs.endSeconds = Math.floor(track.endSeconds);
        }
        playerRef.current.loadVideoById(loadArgs);
      }
    }
  }, [apiLoaded, track]); // intentionally exclude startAt to prevent reload

  // Progress Interval
  useEffect(() => {
    if (!apiLoaded || !track) return;
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const time = playerRef.current.getCurrentTime();
          
          // Enforce end seconds boundary to prevent watching further shlokas
          if (track.endSeconds && time >= track.endSeconds) {
            if (typeof playerRef.current.pauseVideo === 'function') {
              playerRef.current.pauseVideo();
            }
            if (typeof playerRef.current.seekTo === 'function') {
              // Automatically reset the player progress bar to start of this verse
              playerRef.current.seekTo(Math.floor(track.startSeconds || 0), true);
            }
            setShowEndOverlay(true);
          }

          if (time > 0 && typeof onProgressRef.current === 'function') {
            onProgressRef.current(track.id, time);
          }
        } catch (e) { }
      }
    }, 250); // check every 250ms for swift boundary enforcement
    return () => clearInterval(interval);
  }, [apiLoaded, track]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#000", position: "relative" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%", border: "none" }} />

      {showEndOverlay && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(20, 10, 5, 0.94)",
          backdropFilter: "blur(6px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          padding: 20,
          textAlign: "center",
          color: "#FFFBF6",
        }}>
          <h3 style={{
            fontFamily: "'Noto Serif', serif",
            color: "#C8551A",
            fontSize: "clamp(18px, 4vw, 24px)",
            margin: "0 0 8px 0",
            fontWeight: 700
          }}>
            Verse Completed!
          </h3>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(13px, 3.5vw, 15px)",
            color: "#EBE4D5",
            margin: "0 0 24px 0",
            lineHeight: 1.5,
            maxWidth: 280
          }}>
            You have completed this verse. Tap below to replay.
          </p>
          <button
            onClick={() => {
              if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
                playerRef.current.seekTo(Math.floor(track.startSeconds || 0), true);
                if (typeof playerRef.current.playVideo === 'function') {
                  playerRef.current.playVideo();
                }
              }
              setShowEndOverlay(false);
            }}
            style={{
              background: "linear-gradient(135deg, #C8551A 0%, #E07035 100%)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 50,
              padding: "12px 28px",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(200,85,26,0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            <i className="ti ti-rotate-clockwise" style={{ fontSize: 16 }} />
            Replay Verse
          </button>
        </div>
      )}
    </div>
  );
};

const getTrackParamFromUrl = () => {
  try {
    const hashParts = window.location.hash.split('?');
    if (hashParts[1]) {
      const p = new URLSearchParams(hashParts[1]).get('track');
      if (p) return p;
    }
    if (window.location.search) {
      const p = new URLSearchParams(window.location.search).get('track');
      if (p) return p;
    }
  } catch (e) {}
  return null;
};

// Helper to resolve track IDs, supporting exact matches as well as resilient variations (e.g. yt-s-s-week-12-d77-c vs yt-s-week-12-d77-c vs yt-s-w12-d77-c)
const findTrackFromId = (rawTrackId) => {
  if (!rawTrackId) return null;

  let trackId = rawTrackId.trim();
  if (trackId === "yt-s-w2-d12-c") trackId = "yt-s-w3-d12-c";
  if (trackId === "yt-s-w2-d12-e") trackId = "yt-s-w3-d12-e";

  // Tier 1: Exact match
  for (const tKey in TRACK_DB) {
    for (const stKey in TRACK_DB[tKey]) {
      if (stKey === 'chanting' || stKey === 'explanation') continue;
      for (const tabKey of ['chanting', 'explanation']) {
        const track = TRACK_DB[tKey][stKey][tabKey]?.find(t => t.id === trackId);
        if (track) return { topic: tKey, subtopic: stKey, tab: tabKey, track };
      }
    }
    for (const tabKey of ['chanting', 'explanation']) {
      const track = TRACK_DB[tKey][tabKey]?.find(t => t.id === trackId);
      if (track) return { topic: tKey, subtopic: null, tab: tabKey, track };
    }
  }

  // Tier 2: Resilient Day-number & tab suffix matching
  const dayMatch = trackId.match(/-d(\d+)(-[ce])?$/i);
  if (dayMatch) {
    const dayNumStr = dayMatch[1].padStart(2, "0");
    const suffix = (dayMatch[2] || "").toLowerCase();
    const targetTab = suffix === "-c" ? "chanting" : suffix === "-e" ? "explanation" : null;

    for (const tKey in TRACK_DB) {
      for (const stKey in TRACK_DB[tKey]) {
        if (stKey === 'chanting' || stKey === 'explanation') continue;
        const tabsToCheck = targetTab ? [targetTab] : ['chanting', 'explanation'];
        for (const tabKey of tabsToCheck) {
          const track = TRACK_DB[tKey][stKey][tabKey]?.find(t => t.id && t.id.includes(`-d${dayNumStr}`));
          if (track) return { topic: tKey, subtopic: stKey, tab: tabKey, track };
        }
      }
      for (const tabKey of (targetTab ? [targetTab] : ['chanting', 'explanation'])) {
        const track = TRACK_DB[tKey][tabKey]?.find(t => t.id && t.id.includes(`-d${dayNumStr}`));
        if (track) return { topic: tKey, subtopic: null, tab: tabKey, track };
      }
    }
  }

  return null;
};

export function YoutubeShlokasPage() {
  // Parse URL on first load
  const [initialParams] = useState(() => {
    const trackId = getTrackParamFromUrl();
    if (trackId) {
      const found = findTrackFromId(trackId);
      if (found) return found;
    }

    // Dynamic Default Selection: Automatically open today's scheduled shloka
    try {
      const getTodayISTString = () => {
        const d = new Date();
        const offset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const istDate = new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + offset);
        const yyyy = istDate.getFullYear();
        const mm = String(istDate.getMonth() + 1).padStart(2, '0');
        const dd = String(istDate.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };

      const todayStr = getTodayISTString();
      let defaultSubtopic = "s-week-1";
      let defaultTab = "chanting";
      let defaultTrack = null;
      let foundToday = false;

      // 1. Try to find the exact track scheduled for today's date
      for (const stKey in TRACK_DB.sankshepa) {
        if (stKey === "chanting" || stKey === "explanation") continue;
        for (const tabKey of ["chanting", "explanation"]) {
          const track = TRACK_DB.sankshepa[stKey][tabKey]?.find(t => t.date === todayStr);
          if (track && isTrackLive(track)) {
            defaultSubtopic = stKey;
            defaultTab = tabKey;
            defaultTrack = track;
            foundToday = true;
            break;
          }
        }
        if (foundToday) break;
      }

      // 2. If no track is scheduled for today or not yet live, fallback to the most recently unlocked track
      if (!foundToday) {
        let latestTrack = null;
        let latestSubtopic = "s-week-1";
        let latestTab = "chanting";

        for (const stKey in TRACK_DB.sankshepa) {
          if (stKey === "chanting" || stKey === "explanation") continue;
          for (const tabKey of ["chanting", "explanation"]) {
            const liveTracks = (TRACK_DB.sankshepa[stKey][tabKey] || []).filter(t => isTrackLive(t));
            liveTracks.forEach(t => {
              if (!latestTrack || new Date(t.date) > new Date(latestTrack.date)) {
                latestTrack = t;
                latestSubtopic = stKey;
                latestTab = tabKey;
              }
            });
          }
        }

        if (latestTrack) {
          defaultSubtopic = latestSubtopic;
          defaultTab = latestTab;
          defaultTrack = latestTrack;
        }
      }

      return { topic: "sankshepa", subtopic: defaultSubtopic, tab: defaultTab, track: defaultTrack };
    } catch (err) {
      console.error("Error setting dynamic default track:", err);
    }

    return { topic: "sankshepa", subtopic: "s-week-1", tab: "chanting", track: null };
  });

  const [topic, setTopic] = useState(initialParams.topic);
  const [subtopic, setSubtopic] = useState(initialParams.subtopic);
  const [tab, setTab] = useState(initialParams.tab);
  const [searchQuery, setSearchQuery] = useState("");

  // Player state
  const [activeTrack, setActiveTrack] = useState(initialParams.track);

  // Track Memory State (initialize with URL track to prevent auto-play overwrite)
  const [tabTracks, setTabTracks] = useState(() => {
    if (initialParams.track) {
      return { [`${initialParams.topic}-${initialParams.subtopic}-${initialParams.tab}`]: initialParams.track };
    }
    return {};
  });
  const [trackProgress, setTrackProgress] = useState({});
  const playerInstanceRef = useRef(null);
  const videoSectionRef = useRef(null);

  // Dynamic schedule loading state
  const [scheduleLoaded, setScheduleLoaded] = useState(false);

  // Fetch HLS dynamic schedule config from S3 / CloudFront JSON on mount
  useEffect(() => {
    initializeS3Schedule(s3VideosFormat);
    setScheduleLoaded(true);

    const MANIFEST_URL = "https://d2xr6tg4fy1mqx.cloudfront.net/Sanksheparamayana/s3_videos_format.json";
    fetch(MANIFEST_URL)
      .then(res => {
        if (!res.ok) throw new Error("CloudFront manifest fetch failed");
        return res.json();
      })
      .then(data => {
        initializeS3Schedule(data);
      })
      .catch(() => {});
  }, []);

  // Resolve deep links after schedule loaded
  useEffect(() => {
    if (!scheduleLoaded) return;

    // Resolve URL deep link again now that the schedule is populated
    const trackId = getTrackParamFromUrl();
    
    if (trackId) {
      const found = findTrackFromId(trackId);
      if (found) {
        setTopic(found.topic);
        setSubtopic(found.subtopic);
        setTab(found.tab);
        setActiveTrack(found.track);
        const memKey = `${found.topic}-${found.subtopic}-${found.tab}`;
        setTabTracks(prev => ({ ...prev, [memKey]: found.track }));
        return;
      }
    }

    // DefaultSelection: Auto select today's track
    try {
      const getTodayISTString = () => {
        const d = new Date();
        const offset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + offset);
        const yyyy = istDate.getFullYear();
        const mm = String(istDate.getMonth() + 1).padStart(2, '0');
        const dd = String(istDate.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };

      const todayStr = getTodayISTString();
      let defaultSubtopic = "s-week-1";
      let defaultTab = "chanting";
      let defaultTrack = null;
      let foundToday = false;

      for (const stKey in TRACK_DB.sankshepa) {
        if (stKey === "chanting" || stKey === "explanation") continue;
        for (const tabKey of ["chanting", "explanation"]) {
          const track = TRACK_DB.sankshepa[stKey][tabKey]?.find(t => t.date === todayStr);
          if (track && isTrackLive(track)) {
            defaultSubtopic = stKey;
            defaultTab = tabKey;
            defaultTrack = track;
            foundToday = true;
            break;
          }
        }
        if (foundToday) break;
      }

      if (!foundToday) {
        let latestTrack = null;
        let latestSubtopic = "s-week-1";
        let latestTab = "chanting";

        for (const stKey in TRACK_DB.sankshepa) {
          if (stKey === "chanting" || stKey === "explanation") continue;
          for (const tabKey of ["chanting", "explanation"]) {
            const liveTracks = (TRACK_DB.sankshepa[stKey][tabKey] || []).filter(t => isTrackLive(t));
            liveTracks.forEach(t => {
              if (!latestTrack || new Date(t.date) > new Date(latestTrack.date)) {
                latestTrack = t;
                latestSubtopic = stKey;
                latestTab = tabKey;
              }
            });
          }
        }

        if (latestTrack) {
          defaultSubtopic = latestSubtopic;
          defaultTab = latestTab;
          defaultTrack = latestTrack;
        }
      }

      setTopic("sankshepa");
      setSubtopic(defaultSubtopic);
      setTab(defaultTab);
      setActiveTrack(defaultTrack);
      const memKey = `sankshepa-${defaultSubtopic}-${defaultTab}`;
      setTabTracks(prev => ({ ...prev, [memKey]: defaultTrack }));
    } catch (err) {
      console.error("Error setting dynamic default track:", err);
    }
  }, [scheduleLoaded]);

  // Compute TOPICS dynamically from TRACK_DB.sankshepa keys
  const subtopicsList = Object.keys(TRACK_DB.sankshepa)
    .filter(k => k.startsWith("s-week-"))
    .sort((a, b) => {
      const numA = parseInt(a.replace("s-week-", ""), 10);
      const numB = parseInt(b.replace("s-week-", ""), 10);
      return numA - numB;
    })
    .map(k => {
      const num = k.replace("s-week-", "");
      const padNum = num.padStart(2, "0");
      return { id: k, label: `Week ${padNum}` };
    });

  const TOPICS = [
    {
      id: "sankshepa",
      label: "Saṅkṣepa Rāmāyaṇa",
      subtopics: subtopicsList
    }
  ];

  // UI state
  const [showGoToSection, setShowGoToSection] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  // Scroll to video section on deep-link load
  useEffect(() => {
    if (initialParams.track && videoSectionRef.current) {
      const timer = setTimeout(() => {
        videoSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [initialParams.track]);

  // Clean up legacy URL search parameters so they don't persist
  useEffect(() => {
    if (window.location.search.includes("track=")) {
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const handleCopy = (e, track) => {
    e.stopPropagation();
    trackEvent('track_link_copied', { track_id: track.id, track_title: track.title });
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}#/dailysatsanga?track=${track.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(track.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleNativeShare = (e, track) => {
    e.stopPropagation();
    trackEvent('track_shared', { track_id: track.id, track_title: track.title });
    const baseUrl = window.location.origin + window.location.pathname;
    const url = `${baseUrl}#/dailysatsanga?track=${track.id}`;
    if (navigator.share) {
      navigator.share({
        title: track.title,
        text: `Listen to ${track.title} on Rāmāyaṇa Satsaṅga`,
        url: url
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedId(track.id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    }
  };

  let currentTracks = [];
  if (topic && TRACK_DB[topic]) {
    if (subtopic && TRACK_DB[topic][subtopic]) {
      currentTracks = TRACK_DB[topic][subtopic][tab] || [];
    } else {
      currentTracks = TRACK_DB[topic][tab] || [];
    }
  }

  // Auto-play first track when track list changes or resume memory
  useEffect(() => {
    if (currentTracks.length > 0) {
      const memKey = `${topic}-${subtopic}-${tab}`;
      const memorizedTrack = tabTracks[memKey];

      if (memorizedTrack) {
        // Find memorized track in currentTracks by exact ID OR by Day number match
        const memorizedDayNum = memorizedTrack.id ? memorizedTrack.id.match(/-d(\d+)/)?.[1] : null;
        const matchedInCurrent = currentTracks.find(t => 
          t.id === memorizedTrack.id || 
          (memorizedDayNum && t.id && t.id.includes(`-d${memorizedDayNum.padStart(2, "0")}`))
        );

        if (matchedInCurrent) {
          setActiveTrack(matchedInCurrent);
          return;
        }
      }

      // Auto-select the most recently unlocked live track
      const liveTracks = currentTracks.filter(t => isTrackLive(t));
      const defaultTrack = liveTracks[liveTracks.length - 1] || currentTracks[0];
      setActiveTrack(defaultTrack);
      setTabTracks(prev => ({ ...prev, [memKey]: defaultTrack }));
    } else {
      setActiveTrack(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, subtopic, tab, scheduleLoaded]);

  // Real play counts (Persisted in LocalStorage)
  const [playCounts, setPlayCounts] = useState(() => {
    try {
      const saved = localStorage.getItem("ramayana_yt_play_counts");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Increment play count when a track starts
  useEffect(() => {
    if (activeTrack && activeTrack.id) {
      setPlayCounts(prev => {
        const newCounts = { ...prev, [activeTrack.id]: (prev[activeTrack.id] || 0) + 1 };
        localStorage.setItem("ramayana_yt_play_counts", JSON.stringify(newCounts));
        return newCounts;
      });
    }
  }, [activeTrack?.id]);

  // Heartbeat tracking for active users
  useEffect(() => {
    const interval = setInterval(() => {
      trackEvent('yt_active_heartbeat', { page: 'YoutubeShlokasPage', topic, activeTrackId: activeTrack?.id });
    }, 60000); // every 60 seconds
    return () => clearInterval(interval);
  }, [topic, activeTrack]);

  const filteredTopics = TOPICS.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const playTrack = (track) => {
    if (!isTrackLive(track)) return; // locked — do nothing
    trackEvent('yt_video_play', { track_id: track.id, track_title: track.title, topic, tab });
    // Always reset progress so the video starts from the track's own timestamp
    setTrackProgress(prev => { const next = { ...prev }; delete next[track.id]; return next; });
    if (activeTrack && activeTrack.id === track.id) {
      // Same track — React won't re-render the player, so seek imperatively
      playerInstanceRef.current?.seekToStart(track.startSeconds || 0);
    } else {
      setActiveTrack(track);
    }
    const memKey = `${topic}-${subtopic}-${tab}`;
    setTabTracks(prev => ({ ...prev, [memKey]: track }));
  };

  const handleTopicClick = (tId) => {
    if (topic === tId) {
      setTopic(null); // Collapse if already open
    } else {
      setTopic(tId);
      setSubtopic(null); // Reset subtopic when opening a new topic
    }
  };

  const trackStart = activeTrack?.startSeconds || 0;
  const currentProgress = (activeTrack && trackProgress[activeTrack.id])
    ? Math.max(0, trackProgress[activeTrack.id] - trackStart)
    : 0;
  const showSkipIntro = activeTrack && !activeTrack.isQuiz && !activeTrack.isIntro && currentProgress < 5;

  // ── Layout Rendering ────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100svh - 70px)", background: C.pageBg, paddingBottom: 24 }}>
      <style>{YT_RESPONSIVE_CSS}</style>

      {/* ── WhatsApp Community Links (Independent Section) ── */}
      <div className="yt-wa-section">
        <div style={{ padding: "20px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", background: "#FCF8F3", borderRadius: 16, border: "1px solid #EBE4D5", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>

          <h3 style={{ fontFamily: F.heading, fontSize: 22, color: C.ink, margin: 0, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <i className="ti ti-brand-whatsapp" style={{ fontSize: 28, color: "#2D7A4A" }}></i>
            Join our Daily Rāmāyaṇa Satsaṅga Group on Whatsapp
          </h3>

          <p style={{ fontFamily: F.sans, fontSize: 14, color: C.inkLight, margin: 0, lineHeight: 1.6, maxWidth: 900 }}>
            Let the words and values of Vālmīki Rāmāyaṇa become a part of daily life. Through our WhatsApp learning group, receive short, authentic reflections and nuggets from the Rāmāyaṇa every day — a small step towards deeper connection with the timeless wisdom of this encyclopaedic grantha.
          </p>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
            {/* WhatsApp Group */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <a href="https://chat.whatsapp.com/DRf7kBaceS5B7kN1FF8MGs" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button style={{ background: "#E8F5E9", color: "#1A4D2E", border: "1px solid #C8E6C9", padding: "8px 16px", borderRadius: 8, fontFamily: F.sans, fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.background = "#D0E8D2"; }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "#E8F5E9"; }}>
                  Join Whatsapp Group
                </button>
              </a>
              <button onClick={() => {
                if (navigator.share) navigator.share({ title: 'Join Daily Rāmāyaṇa Satsaṅga Whatsapp Group', url: 'https://chat.whatsapp.com/DRf7kBaceS5B7kN1FF8MGs' }).catch(() => { });
                else { navigator.clipboard.writeText('https://chat.whatsapp.com/DRf7kBaceS5B7kN1FF8MGs'); alert('Link copied to clipboard!'); }
              }} style={{ background: "transparent", color: "#7A5030", border: "1px solid #EBE4D5", padding: "6px 8px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "#FDF6EB"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }} title="Share Whatsapp Group Link">
                <i className="ti ti-share" style={{ fontSize: 18 }}></i>
              </button>
            </div>
          </div>

          <p style={{ fontFamily: F.sans, fontSize: 13, color: "#8A5F3E", margin: "12px 0 0 0", lineHeight: 1.5, maxWidth: 800, fontWeight: 500 }}>
            If you miss a day in between, or want to catch up on older posts, you can access them in the archives below.
          </p>

        </div>
      </div>
      <div className="yt-wrapper">

        {/* ── Mobile Sidebar Overlay ── */}
        <div
          className={`yt-sidebar-overlay ${showMobileSidebar ? "open" : ""}`}
          onClick={() => setShowMobileSidebar(false)}
        />

        {/* ── Sidebar: Topics & Subtopics ── */}
        <aside className={`yt-sidebar ${showMobileSidebar ? "open" : ""} ${!sidebarOpen ? "collapsed-desktop" : ""}`}>
          <div style={{ display: "flex", justifyContent: sidebarOpen ? "space-between" : "center", alignItems: "center", marginBottom: 12 }}>


            <button className="yt-desktop-toggle-sb" onClick={() => setSidebarOpen(!sidebarOpen)} title="Toggle Sidebar">
              {sidebarOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
            <button className="yt-mobile-close" onClick={() => setShowMobileSidebar(false)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: C.inkLight }}>&times;</button>
          </div>

          <div className="yt-sb-content" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ padding: "0 4px", marginBottom: 12 }}>
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8,
                  border: `1px solid ${C.inkGhost}`, background: C.cardBg,
                  fontFamily: F.sans, fontSize: 13, color: C.ink,
                  outline: "none"
                }}
              />
            </div>
            <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: 6, paddingRight: 4 }}>
              {filteredTopics.map(t => {
                const isExpanded = topic === t.id;
                return (
                  <div key={t.id} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <button onClick={() => handleTopicClick(t.id)}
                      style={{
                        textAlign: "left", background: isExpanded ? C.accentBg : "transparent",
                        border: "none", borderRadius: 8, padding: "12px 16px",
                        color: isExpanded ? C.accent : C.inkMid,
                        fontFamily: F.sans, fontSize: 14, fontWeight: isExpanded ? 600 : 400,
                        cursor: "pointer", transition: "all 0.2s",
                        boxShadow: isExpanded ? `0 2px 8px rgba(200,85,26,0.15)` : "none",
                        display: "flex", justifyContent: "space-between", alignItems: "center"
                      }}>
                      {t.label}
                      {t.subtopics && t.subtopics.length > 0 && (
                        <span style={{
                          fontSize: 10,
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                          opacity: isExpanded ? 1 : 0.4
                        }}>
                          ▼
                        </span>
                      )}
                    </button>

                    {/* Subtopics Accordion */}
                    {isExpanded && t.subtopics && t.subtopics.length > 0 && (
                      <div style={{
                        display: "flex", flexDirection: "column", gap: 2,
                        paddingLeft: 12, marginLeft: 16, marginTop: 4, marginBottom: 8,
                        borderLeft: `2px solid ${C.inkGhost}`
                      }}>
                        {t.subtopics.filter(st => isWeekLive(t.id, st.id)).map(st => (
                          <button key={st.id} onClick={() => { setSubtopic(st.id); setShowMobileSidebar(false); }}
                            style={{
                              textAlign: "left", background: subtopic === st.id ? "rgba(200,85,26,0.08)" : "transparent",
                              border: "none", borderRadius: 6, padding: "8px 12px",
                              color: subtopic === st.id ? C.accent : C.inkLight,
                              fontFamily: F.sans, fontSize: 13, fontWeight: subtopic === st.id ? 600 : 400,
                              cursor: "pointer", transition: "all 0.1s"
                            }}>
                            {st.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {filteredTopics.length === 0 && (
                <div style={{ padding: "12px", fontFamily: F.sans, fontSize: 13, color: C.inkFaint, textAlign: "center" }}>
                  No topics found.
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ── Main Panel: Tracklist ── */}
        <main className="yt-main">

          {/* Mobile Library Button */}
          <button className="yt-mobile-library-btn" onClick={() => setShowMobileSidebar(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            Select Topic / Shloka
          </button>

          <h2 style={{ fontFamily: F.heading, fontSize: 22, color: C.ink, marginBottom: 8 }}>
            Daily Satsaṅga Archives
          </h2>

          {/* ── Prominent Tabs ── */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `2px solid ${C.inkGhost}` }}>
            {["chanting", "explanation"].map(k => {
              const isActive = tab === k;
              const iconClass = k === "chanting" ? "ti-music" : "ti-book-2";
              return (
                <button key={k} onClick={() => {
                  setTab(k);
                  trackEvent('tab_view', { tab_name: k, topic });
                }}
                  style={{
                    background: isActive ? "#FBE8DA" : "transparent",
                    color: isActive ? "#C8551A" : C.inkLight,
                    border: "none",
                    borderBottom: isActive ? `3px solid #C8551A` : `3px solid transparent`,
                    padding: "8px 16px",
                    borderTopLeftRadius: 8, borderTopRightRadius: 8,
                    fontFamily: F.sans, fontSize: 14, fontWeight: isActive ? 600 : 500,
                    cursor: "pointer", textTransform: "capitalize",
                    transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 8,
                    marginBottom: -2
                  }}>
                  <i className={`ti ${iconClass}`} style={{ fontSize: 18 }}></i>
                  {k}
                </button>
              )
            })}
          </div>

          <div style={{ marginBottom: 16 }}>
            {/* Topic label + View Script link inline */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <h3 style={{
                fontFamily: F.heading, fontSize: 22, color: C.ink, margin: 0,
                display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap"
              }}>
                <span>{topic ? TOPICS.find(t => t.id === topic)?.label : "Select a Topic"}</span>
                {activeTrack && (() => {
                  const text = typeof activeTrack.lyrics === 'object' ? activeTrack.lyrics.devanagari : null;
                  const firstWord = text ? text.trim().split(/\s+/)[0] + '...' : null;
                  return (
                    <span style={{
                      fontFamily: F.sans, fontSize: 14, fontWeight: 500, color: C.textMid,
                      display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap"
                    }}>
                      <span style={{ color: `${C.accent}50`, fontWeight: 300 }}>|</span>
                      <span style={{ fontWeight: 600, color: C.accent }}>{activeTrack.title}</span>
                      {firstWord && <span style={{ color: C.textMuted, fontSize: 13 }}>{firstWord}</span>}
                    </span>
                  );
                })()}
              </h3>

              <button
                onClick={() => setShowGoToSection(true)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "transparent", border: `1px solid ${C.accent}50`,
                  color: C.accent, borderRadius: 6, padding: "4px 12px",
                  fontFamily: F.sans, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s", flexShrink: 0
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.accentBg; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                Go to Section
              </button>
            </div>
          </div>

          <div className="yt-split">

            {/* ── Left Column: Video & Info ── */}
            <div ref={videoSectionRef} className="yt-video-col">
              {/* Video Player Section */}
              <div className="yt-video-player-container">
                {activeTrack ? (
                  activeTrack.isQuiz ? (
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#fdf8f5", color: C.ink }}>
                      <span style={{ fontSize: 48, marginBottom: 16 }}>📝</span>
                      <h3 style={{ fontFamily: F.heading, fontSize: 24, marginBottom: 8, color: "#8B3510" }}>{activeTrack.title}</h3>
                      <p style={{ fontFamily: F.sans, fontSize: 14, color: "#666", marginBottom: 24, textAlign: "center", maxWidth: "80%" }}>{activeTrack.lyrics}</p>
                      <a
                        href={`#/weekly-quiz?week=${subtopic?.startsWith("s-") ? subtopic.slice(2) : (subtopic || "week-1")}`}
                        style={{ background: "#C8551A", color: "#fff", padding: "12px 24px", borderRadius: 8, textDecoration: "none", fontFamily: F.sans, fontWeight: 600, transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#8B3510"}
                        onMouseLeave={e => e.currentTarget.style.background = "#C8551A"}
                      >
                        Start Quiz
                      </a>
                    </div>
                  ) : activeTrack.mediaType === "local" ? (
                    <LocalVideoPlayer
                      videoUrl={activeTrack.videoUrl}
                      playerInstanceRef={playerInstanceRef}
                      onProgress={(time) => setTrackProgress(p => ({ ...p, [activeTrack.id]: time }))}
                    />
                  ) : (
                    <FastYouTubePlayer
                      track={activeTrack}
                      playerInstanceRef={playerInstanceRef}
                      onProgress={(id, time) => setTrackProgress(p => ({ ...p, [id]: time }))}
                    />
                  )
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)" }}>
                    <span style={{ fontSize: 48, marginBottom: 16 }}>▶️</span>
                    <span style={{ fontFamily: F.sans, fontSize: 16 }}>Select a track below to watch</span>
                  </div>
                )}

                {/* Skip Intro Overlay Button */}
                {activeTrack && !activeTrack.isQuiz && !activeTrack.isIntro && showSkipIntro && (
                  <button
                    onClick={() => playerInstanceRef.current?.skipIntro(activeTrack.startSeconds)}
                    style={{
                      position: "absolute",
                      left: "16px",
                      bottom: "56px",
                      zIndex: 10,
                      background: "rgba(0, 0, 0, 0.75)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#ffffff",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontFamily: F.sans,
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.9)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.45)";
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(0, 0, 0, 0.75)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
                    Skip Intro
                  </button>
                )}
              </div>

              {/* ── Script Viewer below Video ── */}
              {activeTrack && activeTrack.lyrics && !activeTrack.isQuiz && !activeTrack.isIntro && (
                <div style={{ marginTop: 24 }}>
                  <ScriptViewer
                    devanagariText={typeof activeTrack.lyrics === 'object' ? activeTrack.lyrics.devanagari : activeTrack.lyrics}
                    trackId={activeTrack.id}
                    minHeight="auto"
                    controlsPosition="bottom"
                    contentPadding="12px 16px"
                  />
                </div>
              )}

            </div>

            {/* ── Right Column: Playlist & Tabs ── */}
            <div className="yt-playlist-col">

              {/* Tabs relocated to top */}

              {/* Track List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: "calc(100svh - 240px)", overflowY: "auto", paddingRight: 4 }}>
                {currentTracks.length === 0 && (
                  <div style={{ padding: "24px 12px", fontFamily: F.sans, fontSize: 14, color: C.inkFaint }}>
                    No YouTube tracks available for this section yet.
                  </div>
                )}
                {currentTracks.filter(track => isTrackLive(track)).map((track, idx) => {
                  const isActive = activeTrack && activeTrack.id === track.id;
                  const live = isTrackLive(track);
                  return (
                    <div key={track.id}
                      id={`track-${track.id}`}
                      onClick={() => live && playTrack(track)}
                      style={{
                        display: "flex", alignItems: "center", padding: "12px 16px",
                        borderRadius: 8, cursor: live ? "pointer" : "default",
                        background: isActive ? C.accentBg : live ? "transparent" : "rgba(0,0,0,0.02)",
                        transition: "background 0.2s",
                        border: `1px solid ${isActive ? C.accent + "30" : live ? "transparent" : C.inkGhost}`,
                        opacity: live ? 1 : 0.62,
                      }}
                      onMouseEnter={e => { if (live && !isActive) e.currentTarget.style.background = "rgba(0,0,0,0.03)" }}
                      onMouseLeave={e => { if (live && !isActive) e.currentTarget.style.background = "transparent" }}
                    >
                      {/* Play Indicator / Number / Lock */}
                      <div style={{ width: 32, fontFamily: F.sans, color: isActive ? C.accent : live ? C.inkFaint : C.inkGhost, fontSize: 13, fontWeight: isActive ? 700 : 400 }}>
                        {!live
                          ? <span title={`Live on ${formatLiveDate(track.date || track.liveAt)}`} style={{ fontSize: 14 }}>🔒</span>
                          : isActive
                            ? <div style={{ width: 8, height: 8, background: C.accent, borderRadius: "50%", boxShadow: "0 0 8px rgba(200,85,26,0.6)" }} />
                            : (idx + 1)
                        }
                      </div>

                      {/* Track Info */}
                      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ fontFamily: F.sans, color: isActive ? C.accent : live ? C.ink : C.inkLight, fontSize: 14, fontWeight: 500 }}>
                          {track.title}
                        </div>
                        <div style={{ fontFamily: F.sans, color: live ? C.inkLight : C.inkFaint, fontSize: 12, fontWeight: 500 }}>
                          {!live
                            ? `Live on ${formatLiveDate(track.date || track.liveAt)}`
                            : (() => {
                              const text = typeof track.lyrics === 'object' ? track.lyrics.devanagari : null;
                              return text ? text.trim().split(/\s+/)[0] + '...' : track.sub;
                            })()
                          }
                        </div>
                      </div>

                      {/* Plays & Share — only for live tracks */}
                      {live && <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: F.sans, color: C.inkFaint, fontSize: 11 }}>
                          <IcoHeadphones /> {formatCount(playCounts[track.id] || 0)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <button
                            onClick={(e) => handleCopy(e, track)}
                            title="Copy link"
                            style={{
                              background: "transparent", border: "none", cursor: "pointer",
                              color: copiedId === track.id ? "#2D7A4A" : C.inkLight,
                              display: "flex", alignItems: "center", gap: 4,
                              padding: "4px 8px", borderRadius: 4, transition: "all 0.2s",
                              fontFamily: F.sans, fontSize: 11, fontWeight: copiedId === track.id ? 700 : 400
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = copiedId === track.id ? "transparent" : "rgba(0,0,0,0.05)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            {copiedId === track.id ? "Copied" : <i className="ti ti-link" style={{ fontSize: 16 }}></i>}
                          </button>

                          <button
                            onClick={(e) => handleNativeShare(e, track)}
                            title="Share this track"
                            style={{
                              background: "transparent", border: "none", cursor: "pointer",
                              color: C.inkLight,
                              display: "flex", alignItems: "center", gap: 4,
                              padding: "4px 8px", borderRadius: 4, transition: "all 0.2s",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.05)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            <i className="ti ti-share" style={{ fontSize: 16 }}></i>
                          </button>
                        </div>
                      </div>}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* ── Go To Section Modal (Portal) ── */}
      {showGoToSection && createPortal(
        <>
          <div onClick={() => setShowGoToSection(false)} style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2000, cursor: "default", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)"
          }} />
          <div style={{
            position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "90%", maxWidth: 360, maxHeight: "80vh",
            background: C.cardBg, color: C.ink, borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.15)", zIndex: 2001,
            display: "flex", flexDirection: "column"
          }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.inkGhost}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: F.heading, fontSize: 16, margin: 0, color: C.ink, letterSpacing: 0.5 }}>Sections</h3>
              <button onClick={() => setShowGoToSection(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: C.inkLight, padding: 0, display: "flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = C.ink} onMouseLeave={e => e.currentTarget.style.color = C.inkLight}>&times;</button>
            </div>
            <div style={{ padding: "12px 0", overflowY: "auto", flex: 1 }}>
              {currentTracks.filter(track => isTrackLive(track)).map((track, idx) => {
                const isActive = activeTrack && activeTrack.id === track.id;
                return (
                  <button key={track.id} onClick={() => { playTrack(track); setShowGoToSection(false); }}
                    style={{
                      width: "100%", textAlign: "left", padding: "12px 20px", background: isActive ? C.accentBg : "transparent",
                      border: "none", color: isActive ? C.accent : C.inkMid, fontFamily: F.sans, fontSize: 14, fontWeight: isActive ? 600 : 400,
                      cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "flex-start", gap: 12
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(0,0,0,0.03)" }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent" }}
                  >
                    <span style={{ width: 20, flexShrink: 0, textAlign: "right", color: isActive ? C.accent : C.inkLight }}>{idx + 1}.</span>
                    <span>{track.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>,
        document.body
      )}

    </div>
  );
}