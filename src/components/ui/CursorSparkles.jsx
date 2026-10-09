'use client';

import { useEffect, useRef } from 'react';

// Tweak these to taste.
const COLORS = ['#e49d86', '#d07d60', '#f0b45a', '#f48fb1', '#b79cf2']; // brand peach + a little magic
const MAX_PARTICLES = 140;
const TRAIL_SPACING = 16; // px of travel per extra sparkle
const CLICK_BURST = 14;

function drawStar(ctx, x, y, radius, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? radius : radius * 0.32; // 4-point star
    const angle = (Math.PI / 4) * i;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Decorative cursor trail: sparkles that drift, twinkle and fade.
 * - mouse only (skipped on touch) and skipped when the user prefers reduced motion
 * - the animation loop runs only while particles exist, so it costs nothing when idle
 * - pointer-events: none + aria-hidden, so it never gets in the way
 */
export default function CursorSparkles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const particles = [];
    let frame = 0;
    let last = 0;
    let lastX = null;
    let lastY = null;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (x, y, burst = false) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 1.2 + Math.random() * 2.4 : 0.15 + Math.random() * 0.6;
      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? 0.6 : 0.2),
        size: 4 + Math.random() * 6,
        life: 1,
        decay: 0.014 + Math.random() * 0.014, // ~0.6-1.2s at 60fps
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isStar: Math.random() > 0.3,
      });
    };

    const tick = (now) => {
      const dt = Math.min(32, now - last) / 16.67; // frame-rate independent
      last = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay * dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.025 * dt; // gentle gravity
        p.vx *= 0.985;
        p.rotation += p.spin * dt;

        const size = p.size * (0.35 + 0.65 * p.life);
        ctx.globalAlpha = Math.min(1, p.life * 1.4);
        ctx.fillStyle = p.color;
        if (p.isStar) {
          drawStar(ctx, p.x, p.y, size, p.rotation);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      frame = particles.length ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const allowed = (event) =>
      event.pointerType === 'mouse' && !reducedMotion.matches && finePointer.matches;

    const onMove = (event) => {
      if (!allowed(event)) return;
      const { clientX: x, clientY: y } = event;
      if (lastX !== null) {
        const distance = Math.hypot(x - lastX, y - lastY);
        const steps = Math.min(5, Math.max(1, Math.round(distance / TRAIL_SPACING)));
        for (let i = 1; i <= steps; i++) {
          spawn(lastX + ((x - lastX) * i) / steps, lastY + ((y - lastY) * i) / steps);
        }
      }
      lastX = x;
      lastY = y;
      start();
    };

    const onDown = (event) => {
      if (!allowed(event)) return;
      for (let i = 0; i < CLICK_BURST; i++) spawn(event.clientX, event.clientY, true);
      start();
    };

    const onLeave = () => {
      lastX = null;
      lastY = null;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99] size-full"
    />
  );
}
