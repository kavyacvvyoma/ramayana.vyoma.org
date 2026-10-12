// ════════════════════════════════════════════════════════════════════════════
//  20_DemoHlsPage.jsx  —  HLS Streaming Demo Page with Overlay Controls
// ════════════════════════════════════════════════════════════════════════════
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { C, F } from "./01_theme";
import { PageHdr, Btn, Card } from "./02_SharedComponents";

export function DemoHlsPage() {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const controlsTimerRef = useRef(null);
  const src = "https://d3a8qbwm8iliew.cloudfront.net/assets/Sloka-1/HLS/Sloka-1.m3u8";

  // Player controls state
  const [levels, setLevels] = useState([{ index: -1, label: "Auto" }]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [speed, setSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Progress/Video bar state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Overlay Visibility State
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // Retrieve available quality levels
        const availableLevels = hls.levels.map((level, idx) => ({
          index: idx,
          label: level.height ? `${level.height}p` : `Quality ${idx + 1}`,
        }));
        setLevels([{ index: -1, label: "Auto" }, ...availableLevels]);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn("HLS network error, attempting recovery...");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn("HLS media error, attempting recovery...");
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for native Safari
      video.src = src;
    }
  }, [src]);

  // Sync native video events with React state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onDurationChange = () => setDuration(video.duration);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("durationchange", onDurationChange);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("durationchange", onDurationChange);
    };
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  // Seek forward/backward by 10s
  const skip = (seconds) => {
    const video = videoRef.current;
    if (!video) return;
    let newTime = video.currentTime + seconds;
    if (newTime < 0) newTime = 0;
    if (newTime > video.duration) newTime = video.duration;
    video.currentTime = newTime;
    triggerControlsInteraction();
  };

  // Update speed
  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
    triggerControlsInteraction();
  };

  // Toggle loop
  const toggleLoop = () => {
    const nextLoop = !isLooping;
    setIsLooping(nextLoop);
    if (videoRef.current) {
      videoRef.current.loop = nextLoop;
    }
    triggerControlsInteraction();
  };

  // Update HLS quality level
  const handleQualityChange = (e) => {
    const levelIndex = parseInt(e.target.value, 10);
    setCurrentLevel(levelIndex);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
    }
    triggerControlsInteraction();
  };

  // Seek video directly via progress bar click
  const handleProgressBarClick = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    video.currentTime = percentage * duration;
    triggerControlsInteraction();
  };

  // Helper to format seconds to MM:SS
  const formatTime = (secs) => {
    if (isNaN(secs) || !isFinite(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins}:${remaining.toString().padStart(2, "0")}`;
  };

  // Auto-hide controls logic
  const triggerControlsInteraction = () => {
    setShowControls(true);
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }
    controlsTimerRef.current = setTimeout(() => {
      // Only auto-hide if video is playing
      if (videoRef.current && !videoRef.current.paused) {
        setShowControls(false);
      }
    }, 2800); // hide after 2.8s of inactivity
  };

  // Trigger brief visibility at mount
  useEffect(() => {
    triggerControlsInteraction();
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, []);

  const handleMouseMove = () => {
    triggerControlsInteraction();
  };

  const handleMouseLeave = () => {
    // Hide controls immediately on mouse leave if playing
    if (isPlaying) {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
      setShowControls(false);
    }
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];

  return (
    <div className="pi" style={{ background: C.pageBg, minHeight: "100vh" }}>
      <PageHdr title="HLS Video Streaming Demo" subtitle="Overlay controls with auto-hide, loop, speed, and quality settings" />

      <div style={{ maxWidth: 840, margin: "0 auto", padding: "0 20px 60px" }}>
        <Card style={{ padding: "28px" }}>
          <h3 style={{ fontFamily: F.heading, color: C.brown1, fontSize: 21, marginBottom: 8 }}>
            Sanskrit Shloka Chanting Player
          </h3>
          <p style={{ fontFamily: F.sans, color: C.textLight, fontSize: 14, marginBottom: 24 }}>
            Move your cursor inside the player area to reveal the custom controls overlay. Controls will auto-hide after 3 seconds of inactivity.
          </p>

          {/* Player Wrapper with Mouse Event Handlers */}
          <div 
            id="hls-custom-player-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={togglePlay}
            style={{ 
              width: "100%", 
              background: "#020100", 
              borderRadius: 14, 
              overflow: "hidden", 
              boxShadow: "0 12px 45px rgba(0,0,0,0.22)",
              aspectRatio: "16/9",
              position: "relative",
              marginBottom: 24,
              cursor: "pointer"
            }}
          >
            {/* Native Video tag */}
            <video
              id="custom-hls-video"
              ref={videoRef}
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />

            {/* Skip Intro Overlay Button (moves above the overlay when controls are visible) */}
            {currentTime < 5 && duration > 5 && (
              <button
                id="btn-skip-intro-overlay"
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current) {
                    videoRef.current.currentTime = 5;
                  }
                }}
                style={{
                  position: "absolute",
                  left: 20,
                  bottom: showControls ? 130 : 20,
                  zIndex: 15,
                  background: "rgba(10, 5, 0, 0.85)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.28)",
                  color: "#FFFBF0",
                  borderRadius: 6,
                  padding: "8px 16px",
                  fontFamily: F.sans,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.4)",
                  transition: "bottom 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0, 0, 0, 0.95)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(10, 5, 0, 0.85)"}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 4 15 12 5 20 5 4" />
                  <line x1="19" y1="5" x2="19" y2="19" />
                </svg>
                Skip Intro
              </button>
            )}

            {/* Custom Controls Bar (Overlay Card) */}
            <div 
              id="hls-custom-controls"
              onClick={(e) => e.stopPropagation()} // prevent play/pause toggle when interacting with controls
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                background: "rgba(10, 5, 0, 0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 14,
                padding: "16px 20px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                zIndex: 10,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
                transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                opacity: showControls ? 1 : 0,
                transform: showControls ? "translateY(0)" : "translateY(12px)",
                pointerEvents: showControls ? "auto" : "none"
              }}
            >
              {/* Custom Video Progress Seek Bar */}
              <div id="hls-video-bar-section" style={{ width: "100%" }}>
                <div
                  id="custom-progress-bar-rail"
                  onClick={handleProgressBarClick}
                  style={{
                    width: "100%",
                    height: 5,
                    background: "rgba(255, 255, 255, 0.25)",
                    borderRadius: 3,
                    cursor: "pointer",
                    position: "relative",
                    transition: "height 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.height = "7px"}
                  onMouseLeave={e => e.currentTarget.style.height = "5px"}
                >
                  <div
                    style={{
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                      height: "100%",
                      background: C.accent,
                      borderRadius: 3
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: `${duration ? (currentTime / duration) * 100 : 0}%`,
                      transform: "translate(-50%, -50%)",
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: C.accent,
                      boxShadow: "0 0 5px rgba(0,0,0,0.3)"
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: F.sans, fontSize: 11, color: "rgba(255, 255, 255, 0.85)" }}>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls Buttons Grid */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                {/* Play, Pause, Skip Back, Skip Forward */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    id="ctrl-btn-play"
                    onClick={togglePlay}
                    style={{
                      background: C.accent,
                      color: "#FFF",
                      border: "none",
                      borderRadius: "50%",
                      width: 38,
                      height: 38,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      transition: "transform 0.1s, background-color 0.2s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = C.accentMid}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = C.accent}
                    onMouseDown={e => e.currentTarget.style.transform = "scale(0.93)"}
                    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <i className="ti ti-player-pause" /> : <i className="ti ti-player-play" />}
                  </button>

                  <button
                    id="ctrl-btn-back-10"
                    onClick={() => skip(-10)}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#FFFBF0",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontFamily: F.sans,
                      fontSize: 12,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      transition: "background 0.2s, border-color 0.2s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"; }}
                    title="Rewind 10 Seconds"
                  >
                    <i className="ti ti-rotate-clockwise-2" style={{ transform: "scaleX(-1)", fontSize: 13 }} /> -10s
                  </button>

                  <button
                    id="ctrl-btn-forward-10"
                    onClick={() => skip(10)}
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#FFFBF0",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontFamily: F.sans,
                      fontSize: 12,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      transition: "background 0.2s, border-color 0.2s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"; }}
                    title="Forward 10 Seconds"
                  >
                    +10s <i className="ti ti-rotate-clockwise-2" style={{ fontSize: 13 }} />
                  </button>
                </div>

                {/* Speed, Quality, Loop */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  {/* Playback speed selection */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 700, color: "rgba(255, 255, 255, 0.85)" }}>Speed:</span>
                    <select
                      id="ctrl-select-speed"
                      value={speed}
                      onChange={handleSpeedChange}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 6,
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "#FFFBF0",
                        fontFamily: F.sans,
                        fontSize: 12,
                        cursor: "pointer",
                        outline: "none",
                        transition: "border-color 0.2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"}
                    >
                      {speedOptions.map(opt => (
                        <option key={opt} value={opt} style={{ background: "#1E150F", color: "#FFF" }}>
                          {opt === 1 ? "Normal" : `${opt}x`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* HLS quality level selection */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 700, color: "rgba(255, 255, 255, 0.85)" }}>Quality:</span>
                    <select
                      id="ctrl-select-quality"
                      value={currentLevel}
                      onChange={handleQualityChange}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 6,
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "#FFFBF0",
                        fontFamily: F.sans,
                        fontSize: 12,
                        cursor: "pointer",
                        outline: "none",
                        transition: "border-color 0.2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"}
                    >
                      {levels.map(lvl => (
                        <option key={lvl.index} value={lvl.index} style={{ background: "#1E150F", color: "#FFF" }}>
                          {lvl.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Loop Toggle */}
                  <button
                    id="ctrl-btn-loop"
                    onClick={toggleLoop}
                    style={{
                      background: isLooping ? "rgba(200, 85, 26, 0.3)" : "rgba(255, 255, 255, 0.1)",
                      color: isLooping ? C.accentMid : "#FFFBF0",
                      border: `1px solid ${isLooping ? C.accent : "rgba(255, 255, 255, 0.2)"}`,
                      borderRadius: 6,
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontFamily: F.sans,
                      fontSize: 12,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => {
                      if (!isLooping) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isLooping) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                      }
                    }}
                    title="Toggle Looping"
                  >
                    <i className="ti ti-repeat" style={{ fontSize: 13 }} /> {isLooping ? "Loop On" : "Loop Off"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={{ background: C.accentBg, padding: 14, borderRadius: 8, border: `1px solid ${C.accentSoft}` }}>
            <span style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 0.5 }}>
              CloudFront HLS Stream Address:
            </span>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: C.inkMid, marginTop: 4, wordBreak: "break-all" }}>
              {src}
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <Btn id="btn-back-home-2" onClick={() => window.location.hash = "#/"} variant="primary">
              Back to Home
            </Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}
