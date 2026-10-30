import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

/**
 * LiquidWaterRippleCanvas - Ultra-High-Performance Edition
 * Realistic concentric water wave ripple simulation when water droplets fall.
 * 
 * Optimized specifically for iOS Safari, WebKit, and mobile devices (e.g. iPhone SE 2):
 * - Delta-time physics: wave expansion speed remains constant and natural regardless of frame rate.
 * - Hardware-accelerated dual-stroke glow: replaces expensive CPU-bound `ctx.shadowBlur`.
 * - Zero per-frame GC allocations: eliminates runtime gradient creation in inner animation loops.
 * - DPR capping: avoids multi-megapixel fillrate stalls on Retina mobile screens.
 * - Removed CSS `filter: drop-shadow` on canvas to prevent full-screen compositor re-rasterization.
 */
const WaterRippleCanvas = forwardRef(({ 
  accentColor = '#00f0ff', 
  secondaryColor = '#a855f7',
  className = "absolute inset-0 w-full h-full pointer-events-none" 
}, ref) => {
  const canvasRef = useRef(null);
  const dropsRef = useRef([]);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  // Helper to add a water drop impact
  const createDrop = (x, y, intensity = 1.0, maxRadius = 320) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    dropsRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: isMobile ? Math.min(maxRadius, 250) : maxRadius,
      rings: isMobile ? [0, 24, 52] : [0, 18, 38, 62],
      opacity: Math.min(1.0, 0.85 * intensity),
      speed: (isMobile ? 2.8 : 2.6) * (0.9 + Math.random() * 0.2),
      life: 0,
      maxLife: isMobile ? 100 : 130,
      splashRadius: 3,
      splashAlpha: 1.0
    });

    // Cap active drops to preserve high performance on mobile
    const maxActiveDrops = isMobile ? 6 : 12;
    if (dropsRef.current.length > maxActiveDrops) {
      dropsRef.current.shift();
    }
  };

  // Expose imperative drop trigger to parent
  useImperativeHandle(ref, () => ({
    addDrop: (x, y, intensity = 1.0) => {
      createDrop(x, y, intensity);
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Cap DPR to 1.5 on mobile to avoid 4x Retina fillrate bottleneck while preserving razor sharpness
      const rawDpr = window.devicePixelRatio || 1;
      dpr = Math.min(rawDpr, width < 768 ? 1.5 : 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    // Initial gentle drop right in the center
    const initialTimer = setTimeout(() => {
      if (width > 0 && height > 0) {
        createDrop(width / 2, height * 0.45, 1.2, Math.min(width * 0.45, 340));
      }
    }, 300);

    // Ambient periodic droplets
    let lastAmbientDrop = Date.now();
    let ambientInterval = 2800;
    let lastFrameTime = performance.now();

    // Check visibility via IntersectionObserver to pause rendering when scrolled out of view
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        lastFrameTime = performance.now();
      }
    }, { threshold: 0.1 });
    visibilityObserver.observe(canvas);

    const render = (currentTime) => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // Delta time in 60Hz frame units (dt ~ 1.0 at 60fps)
      // Clamped to prevent jumps if browser tab was suspended
      const deltaMs = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      const dt = Math.min(Math.max(deltaMs / 16.67, 0.5), 2.2);

      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastAmbientDrop > ambientInterval) {
        lastAmbientDrop = now;
        const isMobile = width < 768;
        ambientInterval = (isMobile ? 3200 : 2400) + Math.random() * 1600;
        
        const randX = width * (0.25 + Math.random() * 0.5);
        const randY = height * (0.25 + Math.random() * 0.5);
        createDrop(randX, randY, 0.9 + Math.random() * 0.35, isMobile ? 240 : 340);
      }

      const drops = dropsRef.current;
      for (let d = drops.length - 1; d >= 0; d--) {
        const drop = drops[d];
        drop.radius += drop.speed * dt;
        drop.life += dt;

        // Decay opacity smoothly based on life ratio
        const lifeRatio = drop.life / drop.maxLife;
        drop.opacity = Math.max(0, (1 - lifeRatio) * 0.85);

        if (drop.life >= drop.maxLife || drop.opacity <= 0.005) {
          drops.splice(d, 1);
          continue;
        }

        // 1. Initial splash sparkle (first 18 frames)
        if (drop.life < 18) {
          const splashProgress = drop.life / 18;
          const currentSplashRadius = drop.splashRadius + splashProgress * 12;
          const currentSplashAlpha = (1 - splashProgress) * drop.opacity;

          ctx.beginPath();
          ctx.arc(drop.x, drop.y, currentSplashRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentSplashAlpha * 0.95})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(drop.x, drop.y, currentSplashRadius * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${currentSplashAlpha * 0.75})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // 2. Concentric expanding wave rings
        for (let i = 0; i < drop.rings.length; i++) {
          const ringRadius = drop.radius - drop.rings[i];
          if (ringRadius <= 0) continue;

          const ringRatio = ringRadius / drop.maxRadius;
          if (ringRatio >= 1.0) continue;

          // Wave envelope: bell curve
          const envelope = Math.sin(ringRatio * Math.PI);
          const ringAlpha = drop.opacity * envelope * (1 - i * 0.18);
          if (ringAlpha <= 0.005) continue;

          const strokeWidth = Math.max(0.75, (2.4 - ringRatio * 1.4) * (1 - i * 0.12));

          // Soft ambient outer cyan bloom (fast 0-blur dual pass instead of costly shadowBlur)
          if (ringAlpha > 0.08) {
            ctx.beginPath();
            ctx.arc(drop.x, drop.y, ringRadius, 0, Math.PI * 2);
            ctx.lineWidth = strokeWidth * 2.4;
            ctx.strokeStyle = `rgba(0, 240, 255, ${ringAlpha * 0.28})`;
            ctx.stroke();
          }

          // Crisp specular crest
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, ringRadius, 0, Math.PI * 2);
          ctx.lineWidth = strokeWidth;
          ctx.strokeStyle = `rgba(130, 248, 255, ${ringAlpha * 0.9})`;
          ctx.stroke();

          // Subtle secondary inner refractive wave shadow
          if (ringRadius > 8) {
            ctx.beginPath();
            ctx.arc(drop.x, drop.y, ringRadius - 1.2, 0, Math.PI * 2);
            ctx.lineWidth = 0.75;
            ctx.strokeStyle = `rgba(5, 14, 29, ${ringAlpha * 0.4})`;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      clearTimeout(initialTimer);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [accentColor, secondaryColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
    />
  );
});

WaterRippleCanvas.displayName = 'WaterRippleCanvas';

export default WaterRippleCanvas;
