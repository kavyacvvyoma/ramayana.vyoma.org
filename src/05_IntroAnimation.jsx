// ════════════════════════════════════════════════════════════════════════════
//  05_IntroAnimation.jsx  —  PAGE-LOAD INTRO OVERLAY ANIMATION
//  > Full-screen canvas animation: hand draws bow → releases arrow →
//    "Jai Shree Ram" text + flowers + crackers blast on impact → fades out
//  > Plays once on every page load / reload
//  > Click anywhere to skip
//  > Edit BLAST_TEXT to change the words that explode out
//  > Edit BURST_COLORS to change cracker colors
//  > Edit timing constants (BOW_FRAMES, FADE_FRAMES) to speed up/slow down
// ════════════════════════════════════════════════════════════════════════════
import { useEffect, useRef } from "react";

// ── EDITABLE: Text fragments that explode out on impact ──────────────────────
const BLAST_TEXT = ["ज","य"," ","श","्","र","ी"," ","र","ा","म","ॐ","।","रा","म","॥"];

// ── EDITABLE: Cracker / firework colors ──────────────────────────────────────
const BURST_COLORS = [
  "#FF6B00","#FFD700","#FF4500","#00CED1","#FF69B4",
  "#7B68EE","#FFFFFF","#FF1493","#ADFF2F","#00FFFF",
];

// ── EDITABLE: Timing (frames at 60fps) ───────────────────────────────────────
const BOW_FRAMES    = 80;   // how long bow-draw lasts before release
const BURST_FRAMES  = 220;  // how long crackers explode before fade starts
const FADE_FRAMES   = 52;   // fade-out duration

export function IntroAnimation({ onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // State
    let phase    = "bow";  // bow → fly → burst → fade
    let tick     = 0;
    let bowPull  = 0;
    let arrowX = 0, arrowY = 0, arrowVX = 0, arrowVY = 0;
    let bgFlash  = 0;
    let sparks   = [], textBits = [], floatWords = [], burstQueue = [];

    const handX  = () => W() * 0.18;
    const handY  = () => H() * 0.55;
    const targetX = () => W() * 0.82;
    const targetY = () => H() * 0.42;

    const randColor = () => BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];

    // ── Spawn helpers ────────────────────────────────────────────────────────
    const spawnSparks = (cx, cy, count = 60) => {
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 2 + Math.random() * 9;
        sparks.push({
          x: cx, y: cy,
          vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3,
          life: 1, decay: 0.012 + Math.random() * 0.018,
          color: randColor(), size: 2 + Math.random() * 5,
          star: Math.random() > 0.5,
        });
      }
    };

    const spawnTextBits = (cx, cy) => {
      BLAST_TEXT.forEach((ch, idx) => {
        for (let r = 0; r < 2; r++) {
          const a = Math.random() * Math.PI * 2;
          const s = 3 + Math.random() * 10;
          textBits.push({
            ch, delay: idx * 4,
            x: cx + (Math.random() - 0.5) * 60,
            y: cy + (Math.random() - 0.5) * 40,
            vx: Math.cos(a) * s, vy: Math.sin(a) * s - 5,
            life: 1, decay: 0.007 + Math.random() * 0.007,
            color: randColor(), size: 18 + Math.random() * 22,
            rot: Math.random() * Math.PI * 2, rotV: (Math.random() - 0.5) * 0.15,
            gravity: 0.12, frame: 0,
          });
        }
      });
    };

    const spawnFloatWords = (cx, cy) => {
      ["जय","श्री","राम","→","JAI SHREE RAM"].forEach((w, i) => {
        floatWords.push({
          text: w, x: cx + (Math.random() - 0.5) * W() * 0.5,
          y: cy + (Math.random() - 0.5) * 80,
          vy: -(1.5 + Math.random() * 2.5),
          life: 1, decay: 0.006,
          size: w.length <= 2 ? 48 : w.length < 6 ? 36 : 22,
          color: BURST_COLORS[i % BURST_COLORS.length],
          delay: i * 12, frame: 0, scale: 0.1, scaleV: 0.08,
        });
      });
    };

    const scheduleBursts = () => {
      for (let i = 0; i < 12; i++) {
        burstQueue.push({
          at: 30 + i * 18,
          x: 80 + Math.random() * (W() - 160),
          y: 40 + Math.random() * (H() * 0.65),
        });
      }
    };

    // ── Draw helpers ─────────────────────────────────────────────────────────
    const drawHand = (pull) => {
      const hx = handX(), hy = handY();
      ctx.save(); ctx.translate(hx, hy);

      // Arm
      ctx.strokeStyle = "#E8AA70"; ctx.lineWidth = 10; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(0, 0); ctx.stroke();

      // Fist
      ctx.fillStyle = "#D49060";
      ctx.beginPath(); ctx.ellipse(8, 0, 16, 11, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#C07840";
      for (let f = -1; f <= 1; f++) {
        ctx.beginPath(); ctx.ellipse(14, f * 6, 6, 3, Math.PI * 0.2, 0, Math.PI * 2); ctx.fill();
      }

      // Bow arc
      ctx.strokeStyle = "#5A2800"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(16, 0, 34, -0.9, 0.9); ctx.stroke();

      // Bowstring
      const pullX = 16 + 28 + pull * 36;
      ctx.strokeStyle = "#C8A060"; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(16 + 28 * Math.cos(-0.9), 34 * Math.sin(-0.9));
      ctx.quadraticCurveTo(pullX, 0, 16 + 28 * Math.cos(0.9), -34 * Math.sin(-0.9));
      ctx.stroke();

      // Arrow on string (bow-draw phase only)
      if (phase === "bow") {
        ctx.save(); ctx.translate(pullX - 4, 0);
        ctx.strokeStyle = "#8B4513"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(4, 0); ctx.stroke();
        // Glow
        const g = ctx.createRadialGradient(-30, 0, 0, -30, 0, 20);
        g.addColorStop(0, "rgba(255,200,0,0.8)"); g.addColorStop(1, "rgba(255,100,0,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(-22, 0, 20, 0, Math.PI * 2); ctx.fill();
        // Tip
        ctx.fillStyle = "#C0C0C0";
        ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(2, -4); ctx.lineTo(2, 4); ctx.closePath(); ctx.fill();
        // Fletching
        ctx.fillStyle = "#E82020";
        ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-48, -7); ctx.lineTo(-46, 0); ctx.lineTo(-48, 7); ctx.closePath(); ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    };

    const drawArrow = (ax, ay, vx, vy) => {
      ctx.save(); ctx.translate(ax, ay); ctx.rotate(Math.atan2(vy, vx));
      const g = ctx.createRadialGradient(-24, 0, 0, -24, 0, 22);
      g.addColorStop(0, "rgba(255,210,0,0.85)"); g.addColorStop(1, "rgba(255,80,0,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(-16, 0, 22, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#6B2E00"; ctx.lineWidth = 3; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(6, 0); ctx.stroke();
      ctx.fillStyle = "#E0E0E0";
      ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(4, -4); ctx.lineTo(4, 4); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#E82020";
      ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(-34, -6); ctx.lineTo(-30, 0); ctx.lineTo(-34, 6); ctx.closePath(); ctx.fill();
      ctx.restore();
    };

    const drawStar = (cx, cy, r, col) => {
      ctx.fillStyle = col; ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = i * Math.PI * 0.4 - Math.PI / 2;
        const b = a + Math.PI * 0.2;
        i === 0 ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
                : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        ctx.lineTo(cx + r * 0.4 * Math.cos(b), cy + r * 0.4 * Math.sin(b));
      }
      ctx.closePath(); ctx.fill();
    };

    // ── Main render loop ──────────────────────────────────────────────────────
    let rafId;
    const render = () => {
      const cw = W(), ch = H();
      ctx.clearRect(0, 0, cw, ch);

      // Night sky background
      const bgAlpha = phase === "bow" || phase === "fly"
        ? 0.88 : Math.max(0, 0.88 - tick / 400);
      ctx.fillStyle = `rgba(8,4,28,${bgAlpha})`;
      ctx.fillRect(0, 0, cw, ch);

      // Flash
      if (bgFlash > 0) {
        ctx.fillStyle = `rgba(255,220,80,${bgFlash})`;
        ctx.fillRect(0, 0, cw, ch);
        bgFlash = Math.max(0, bgFlash - 0.06);
      }

      // Moon glow
      const mg = ctx.createRadialGradient(cw * 0.82, ch * 0.18, 0, cw * 0.82, ch * 0.18, 80);
      mg.addColorStop(0, "rgba(255,220,150,0.22)"); mg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = mg; ctx.fillRect(0, 0, cw, ch);

      // Stars
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      for (let s = 0; s < 60; s++) {
        const sx = (s * 137.5 + 40) % cw;
        const sy = (s * 97.3 + 20) % (ch * 0.7);
        ctx.beginPath(); ctx.arc(sx, sy, 0.5 + (s % 3) * 0.4, 0, Math.PI * 2); ctx.fill();
      }

      // ── BOW phase ─────────────────────────────────────────────────────────
      if (phase === "bow") {
        bowPull = Math.min(1, tick / BOW_FRAMES);
        drawHand(bowPull);
        if (tick >= BOW_FRAMES) {
          phase = "fly"; tick = 0;
          arrowX = handX() + 60; arrowY = handY();
          const dx = targetX() - arrowX, dy = targetY() - arrowY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          arrowVX = (dx / dist) * 22; arrowVY = (dy / dist) * 22;
        }
      }

      // ── FLY phase ─────────────────────────────────────────────────────────
      if (phase === "fly") {
        drawHand(1);
        arrowX += arrowVX; arrowY += arrowVY; arrowVY += 0.15;
        drawArrow(arrowX, arrowY, arrowVX, arrowVY);
        if (Math.hypot(arrowX - targetX(), arrowY - targetY()) < 30 || tick > 60) {
          phase = "burst"; tick = 0;
          bgFlash = 1.0;
          spawnSparks(targetX(), targetY(), 80);
          spawnSparks(targetX() - 40, targetY() + 20, 40);
          spawnTextBits(targetX(), targetY());
          spawnFloatWords(cw / 2, ch * 0.4);
          scheduleBursts();
        }
      }

      // ── BURST + FADE phases ───────────────────────────────────────────────
      if (phase === "burst" || phase === "fade") {
        // Scheduled cracker bursts
        burstQueue.forEach(b => { if (tick === b.at) spawnSparks(b.x, b.y, 45); });

        // Sparks
        sparks = sparks.filter(p => p.life > 0);
        sparks.forEach(p => {
          ctx.globalAlpha = p.life * p.life;
          if (p.star) {
            drawStar(p.x, p.y, p.size, p.color);
          } else {
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color; ctx.shadowBlur = 6;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
          }
          p.x += p.vx; p.y += p.vy; p.vy += 0.18; p.vx *= 0.97; p.life -= p.decay;
        });

        // Letter/emoji bits
        textBits = textBits.filter(p => p.life > 0);
        textBits.forEach(p => {
          p.frame++;
          if (p.frame < p.delay) return;
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.font = `${p.size}px 'Noto Serif Devanagari','Cinzel Decorative',serif`;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color; ctx.shadowBlur = 8;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(p.ch, 0, 0);
          ctx.shadowBlur = 0; ctx.restore();
          p.x += p.vx; p.y += p.vy; p.vy += p.gravity;
          p.vx *= 0.97; p.rot += p.rotV; p.life -= p.decay;
        });

        // Floating "Jai Shree Ram" words
        floatWords = floatWords.filter(w => w.life > 0);
        floatWords.forEach(w => {
          w.frame++;
          if (w.frame < w.delay) return;
          w.scale = Math.min(1, w.scale + w.scaleV);
          ctx.save();
          ctx.globalAlpha = w.life;
          ctx.translate(w.x, w.y); ctx.scale(w.scale, w.scale);
          ctx.font = `bold ${w.size}px 'Noto Serif Devanagari','Cinzel Decorative',serif`;
          ctx.fillStyle = w.color;
          ctx.shadowColor = w.color; ctx.shadowBlur = 18;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.strokeStyle = "rgba(0,0,0,0.6)"; ctx.lineWidth = 3;
          ctx.strokeText(w.text, 0, 0);
          ctx.fillText(w.text, 0, 0);
          ctx.shadowBlur = 0; ctx.restore();
          w.y += w.vy; w.life -= w.decay;
        });

        if (tick > BURST_FRAMES && phase === "burst") { phase = "fade"; tick = 0; }
      }

      // ── FADE phase ────────────────────────────────────────────────────────
      if (phase === "fade") {
        canvas.style.opacity = Math.max(0, 1 - tick / FADE_FRAMES);
        if (tick >= FADE_FRAMES) { onDone(); return; }
      }

      ctx.globalAlpha = 1;
      tick++;
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      onClick={() => onDone()}
      title="Click to skip"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        width: "100%", height: "100%",
        cursor: "pointer",
        transition: "opacity 0.4s ease",
      }}
    />
  );
}
