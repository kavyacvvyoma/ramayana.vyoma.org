// ════════════════════════════════════════════════════════════════════════════
//  14_ShlokasPage.jsx  —  nav: "Shlokas"
//  Audio streaming UI (Spotify/Gaana style) for Chanting & Explanation
// ════════════════════════════════════════════════════════════════════════════
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { C, F } from "./01_theme";
import { PageHdr } from "./02_SharedComponents";

// ── Mock Data Generation (100 tracks per section) ─────────────────────────────
const generateTracks = (topicName, sectionName) => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `${topicName.replace(/\s/g, '')}-${sectionName}-${i + 1}`,
    title: `${topicName} — ${sectionName} ${i + 1}`,
    sub: `Sarga ${Math.floor(i / 10) + 1} • Verse ${(i % 10) + 1}`,
    // Using the site's existing audio file as placeholder for all tracks
    src: "/SriRamaJayaRama.mp3", 
    duration: "0:24", // Mock duration string for UI
    lyrics: `॥ ${topicName} — ${sectionName} ${i + 1} ॥\n\nतपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् ।\nनारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥\n\n(This is placeholder text. In a real application, you would provide the precise Sanskrit text and English meaning for this specific audio track.)`
  }));
};

const TOPICS = [
  { id: "sankshepa", label: "Sankshepa Ramayana" },
  { id: "bala",      label: "Balakanda" },
  { id: "ayodhya",   label: "Ayodhyakanda" },
  { id: "aranya",    label: "Aranyakanda" },
  { id: "kiskindha", label: "Kishkindhakanda" },
  { id: "sundara",   label: "Sundarakanda" },
  { id: "yuddha",    label: "Yuddhakanda" },
];

const TRACK_DB = {};
TOPICS.forEach(t => {
  TRACK_DB[t.id] = {
    chanting: generateTracks(t.label, "Chanting"),
    explanation: generateTracks(t.label, "Explanation")
  };
});

// ── Icons ─────────────────────────────────────────────────────────────────────
const IcoPlay   = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const IcoPause  = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const IcoNext   = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>;
const IcoPrev   = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>;
const IcoVolOn  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>;
const IcoVolMute= () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>;
const IcoLyrics = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/></svg>;
const IcoLoop   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>;
const IcoLoopOne= () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 15h-2v-3.5l-1.5.5v-1l2.5-.8h1v4.8zm-1-11V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>;
const IcoHeadphones = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1h-4v8h4c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9z"/></svg>;

// Helper for time formatting
const formatTime = (sec) => {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const formatCount = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export function ShlokasPage() {
  const [topic, setTopic] = useState(TOPICS[0].id);
  const [tab, setTab] = useState("chanting"); // "chanting" | "explanation"
  const [searchQuery, setSearchQuery] = useState("");

  // Player state
  const [activeQueue, setActiveQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  // Settings
  const [loopMode, setLoopMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one
  const [speed, setSpeed] = useState(1); // 0.75, 1, 1.25, 1.5, 2
  const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

  // UI state
  const [showLyrics, setShowLyrics] = useState(false);

  const audioRef = useRef(null);

  const currentTracks = TRACK_DB[topic][tab];
  const activeTrack = currentIndex >= 0 ? activeQueue[currentIndex] : null;

  // Real play counts (Persisted in LocalStorage)
  const [playCounts, setPlayCounts] = useState(() => {
    try {
      const saved = localStorage.getItem("ramayana_play_counts");
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
        localStorage.setItem("ramayana_play_counts", JSON.stringify(newCounts));
        return newCounts;
      });
    }
  }, [activeTrack?.id]);

  const filteredTopics = TOPICS.filter(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()));

  // ── Audio Engine Hooks ──────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current && activeTrack) {
      audioRef.current.src = activeTrack.src;
      audioRef.current.currentTime = 0; // Ensure playback starts from beginning (fixes issues when multiple tracks share the same placeholder src)
      audioRef.current.playbackRate = speed;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentIndex, activeQueue]); // Play when track index changes

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
      else audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (currentIndex === -1 && currentTracks.length > 0) {
      // Nothing playing, start the first track of current view
      setActiveQueue(currentTracks);
      setCurrentIndex(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const playTrack = (trackIndex, queue) => {
    setActiveQueue(queue);
    setCurrentIndex(trackIndex);
  };

  const nextTrack = () => {
    if (activeQueue.length === 0) return;
    if (currentIndex < activeQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (loopMode === 1) { // repeat all
      setCurrentIndex(0);
    } else {
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const prevTrack = () => {
    if (activeQueue.length === 0) return;
    if (progress > 3) {
      audioRef.current.currentTime = 0; // restart if past 3s
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (loopMode === 1) {
      setCurrentIndex(activeQueue.length - 1);
    }
  };

  const toggleLoop = () => setLoopMode((prev) => (prev + 1) % 3);
  const cycleSpeed = () => {
    const nextIdx = (SPEEDS.indexOf(speed) + 1) % SPEEDS.length;
    setSpeed(SPEEDS[nextIdx]);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
  };
  const handleLoadedMeta = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };
  const handleEnded = () => {
    if (loopMode === 2) { // repeat one
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      nextTrack();
    }
  };

  const seek = (e) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setProgress(val);
    }
  };

  // Auto-scroll to active track when it changes
  useEffect(() => {
    if (activeTrack) {
      const el = document.getElementById(`track-${activeTrack.id}`);
      if (el) {
        // block: "start" brings it to the top of the scrollable view
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeTrack]);

  // ── Layout Rendering ────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100svh - 70px)", background: C.pageBg, paddingBottom: 90 }}>
      <PageHdr title="Shlokas & Audio" subtitle="Listen to chanting and explanations" accentColor={C.accent} />

      <div style={{ display: "flex", flex: 1, maxWidth: 1400, margin: "0 auto", width: "100%" }}>
        
        {/* ── Sidebar: Topics ── */}
        <aside style={{
          width: 280, borderRight: `1px solid ${C.inkGhost}`,
          padding: "30px 20px", display: "flex", flexDirection: "column", gap: 6,
          background: "linear-gradient(to right, transparent, rgba(0,0,0,0.02))"
        }}>
          <div style={{ fontFamily: F.heading, fontSize: 13, color: C.inkLight, fontWeight: 700, marginBottom: 12, paddingLeft: 12, letterSpacing: 1 }}>LIBRARY</div>
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
          <div style={{ overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
            {filteredTopics.map(t => (
              <button key={t.id} onClick={() => setTopic(t.id)}
                style={{
                  textAlign: "left", background: topic === t.id ? C.accentBg : "transparent",
                  border: "none", borderRadius: 8, padding: "12px 16px",
                  color: topic === t.id ? C.accent : C.inkMid,
                  fontFamily: F.sans, fontSize: 14, fontWeight: topic === t.id ? 600 : 400,
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: topic === t.id ? `0 2px 8px rgba(200,85,26,0.15)` : "none"
                }}>
                {t.label}
              </button>
            ))}
            {filteredTopics.length === 0 && (
              <div style={{ padding: "12px", fontFamily: F.sans, fontSize: 13, color: C.inkFaint, textAlign: "center" }}>
                No topics found.
              </div>
            )}
          </div>
        </aside>

        {/* ── Main Panel: Tracklist ── */}
        <main style={{ flex: 1, padding: "30px 40px", overflowY: "auto", height: "calc(100svh - 220px)" }}>
          
          <h2 style={{ fontFamily: F.heading, fontSize: 28, color: C.ink, marginBottom: 24 }}>
            {TOPICS.find(t => t.id === topic)?.label}
          </h2>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 10, borderBottom: `2px solid ${C.inkGhost}`, marginBottom: 24 }}>
            {["chanting", "explanation"].map(k => (
              <button key={k} onClick={() => setTab(k)}
                style={{
                  background: "transparent", border: "none",
                  borderBottom: `3px solid ${tab === k ? C.accent : "transparent"}`,
                  padding: "10px 24px", color: tab === k ? C.accent : C.inkLight,
                  fontFamily: F.sans, fontSize: 15, fontWeight: tab === k ? 600 : 400,
                  cursor: "pointer", textTransform: "capitalize", marginBottom: -2,
                  transition: "all 0.2s"
                }}>
                {k}
              </button>
            ))}
          </div>

          {/* Track List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {currentTracks.map((track, idx) => {
              const isActive = activeTrack && activeTrack.id === track.id;
              return (
                <div key={track.id}
                  id={`track-${track.id}`}
                  onClick={() => playTrack(idx, currentTracks)}
                  style={{
                    display: "flex", alignItems: "center", padding: "12px 16px",
                    borderRadius: 8, cursor: "pointer",
                    background: isActive ? C.accentBg : "transparent",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if(!isActive) e.currentTarget.style.background = "rgba(0,0,0,0.03)" }}
                  onMouseLeave={e => { if(!isActive) e.currentTarget.style.background = "transparent" }}
                >
                  {/* Play Indicator / Number */}
                  <div style={{ width: 40, fontFamily: F.sans, color: isActive ? C.accent : C.inkFaint, fontSize: 14, fontWeight: isActive ? 700 : 400 }}>
                    {isActive && isPlaying ? <div style={{width: 12, height:12, background: C.accent, borderRadius: "50%", animation: "pulse 1s infinite"}}/> : (idx + 1)}
                  </div>
                  
                  {/* Track Info */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: F.sans, color: isActive ? C.accent : C.ink, fontSize: 15, fontWeight: 500 }}>
                      {track.title}
                    </div>
                    <div style={{ fontFamily: F.sans, color: C.inkLight, fontSize: 12 }}>
                      {track.sub}
                    </div>
                  </div>

                  {/* Duration & Plays */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <div style={{ fontFamily: F.sans, color: C.inkFaint, fontSize: 13 }}>
                      {track.duration}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: F.sans, color: C.inkFaint, fontSize: 11 }}>
                      <IcoHeadphones/> {formatCount(playCounts[track.id] || 0)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* ── Audio Element (Hidden) ── */}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMeta} onEnded={handleEnded} loop={loopMode === 2} />

      {/* ── Sticky Bottom Player (Spotify-like) ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 90,
        background: C.cardBg, borderTop: `1px solid ${C.inkGhost}`,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)", zIndex: 100,
        display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between"
      }}>
        
        {/* Player: Left (Info) */}
        <div style={{ width: "30%", display: "flex", alignItems: "center", gap: 16 }}>
          {activeTrack ? (
            <>
              <div style={{ width: 56, height: 56, borderRadius: 6, background: `linear-gradient(135deg, ${C.accent}, ${C.accentSoft})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(200,85,26,0.2)" }}>
                <span style={{ fontSize: 24, color: "#fff" }}>{tab === "chanting" ? "🕉️" : "📖"}</span>
              </div>
              <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                <div style={{ fontFamily: F.sans, color: C.ink, fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>{activeTrack.title}</div>
                <div style={{ fontFamily: F.sans, color: C.inkLight, fontSize: 12, overflow: "hidden", textOverflow: "ellipsis" }}>{activeTrack.sub}</div>
              </div>
            </>
          ) : (
            <div style={{ fontFamily: F.sans, color: C.inkFaint, fontSize: 13 }}>Select a track to play</div>
          )}
        </div>

        {/* Player: Center (Controls) */}
        <div style={{ width: "40%", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Speed toggle */}
            <button onClick={cycleSpeed} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: F.sans, fontSize: 12, fontWeight: 600, color: speed !== 1 ? C.accent : C.inkLight, width: 36 }}>
              {speed}x
            </button>
            {/* Prev */}
            <button onClick={prevTrack} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMid }}><IcoPrev/></button>
            {/* Play/Pause */}
            <button onClick={togglePlay} style={{ width: 44, height: 44, borderRadius: "50%", background: C.accent, color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(200,85,26,0.3)", transition: "transform 0.1s" }} onMouseDown={e=>e.currentTarget.style.transform="scale(0.95)"} onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}>
              {isPlaying ? <IcoPause/> : <IcoPlay/>}
            </button>
            {/* Next */}
            <button onClick={nextTrack} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMid }}><IcoNext/></button>
            {/* Loop toggle */}
            <button onClick={toggleLoop} style={{ background: "none", border: "none", cursor: "pointer", color: loopMode > 0 ? C.accent : C.inkLight, width: 36, display: "flex", justifyContent: "center", position: "relative" }}>
              {loopMode === 2 ? <IcoLoopOne/> : <IcoLoop/>}
              {loopMode > 0 && <div style={{position:"absolute", bottom: -4, width: 4, height: 4, borderRadius:"50%", background:C.accent}}/>}
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", maxWidth: 500 }}>
            <span style={{ fontFamily: F.sans, fontSize: 11, color: C.inkLight, width: 35, textAlign: "right" }}>{formatTime(progress)}</span>
            <input type="range" min={0} max={duration || 100} value={progress} onChange={seek}
              style={{
                flex: 1, height: 5, borderRadius: 3, appearance: "none", background: C.inkGhost, outline: "none", cursor: "pointer",
                accentColor: C.accent // Basic native styling, real app would use custom slider background
              }}
            />
            <span style={{ fontFamily: F.sans, fontSize: 11, color: C.inkLight, width: 35 }}>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Player: Right (Volume & Lyrics) */}
        <div style={{ width: "30%", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
          <button onClick={() => setShowLyrics(!showLyrics)} disabled={!activeTrack}
            style={{
              background: "none", border: "none", cursor: activeTrack ? "pointer" : "default",
              color: showLyrics ? C.accent : (activeTrack ? C.inkMid : C.inkGhost), display: "flex", alignItems: "center", gap: 6,
              fontFamily: F.sans, fontSize: 13, fontWeight: 500
            }}>
            <IcoLyrics/> Lyrics
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => setIsMuted(!isMuted)} style={{ background: "none", border: "none", cursor: "pointer", color: C.inkMid }}>
              {isMuted || volume === 0 ? <IcoVolMute/> : <IcoVolOn/>}
            </button>
            <input type="range" min={0} max={1} step={0.01} value={isMuted ? 0 : volume} onChange={e => {setVolume(Number(e.target.value)); setIsMuted(false);}}
              style={{ width: 80, height: 5, borderRadius: 3, appearance: "none", background: C.inkGhost, accentColor: C.inkMid, cursor: "pointer" }}
            />
          </div>
        </div>
      </div>

      {/* ── Lyrics Drawer (Portal) ── */}
      {showLyrics && activeTrack && createPortal(
        <>
          <div onClick={() => setShowLyrics(false)} style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 90, zIndex: 89, cursor: "default"
          }} />
          <div style={{
            position: "fixed", top: 0, right: 0, bottom: 90, width: "100%", maxWidth: 450,
            background: C.cardBg, boxShadow: "-8px 0 30px rgba(0,0,0,0.1)", zIndex: 90,
            display: "flex", flexDirection: "column", animation: "accentIn 0.3s ease-out", transformOrigin: "right"
          }}>
            <div style={{ padding: "24px", borderBottom: `1px solid ${C.inkGhost}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: C.surface }}>
              <h3 style={{ fontFamily: F.heading, color: C.ink, margin: 0, fontSize: 18 }}>Lyrics & Text</h3>
              <button onClick={() => setShowLyrics(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: C.inkLight }}>&times;</button>
            </div>
          <div style={{ padding: "30px 24px", overflowY: "auto", flex: 1 }}>
            <div style={{ fontFamily: F.sans, color: C.accent, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>{activeTrack.title}</div>
            <div style={{ fontFamily: F.devan, color: C.inkMid, fontSize: 18, fontWeight: 600, lineHeight: 2, whiteSpace: "pre-wrap" }}>
              {activeTrack.lyrics}
            </div>
          </div>
        </div>
        </>,
        document.body
      )}

    </div>
  );
}
