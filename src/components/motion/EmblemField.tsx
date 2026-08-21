import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { a: Node; b: Node; t: number; speed: number };

/**
 * EmblemField — an abstract computational system inspired by the Hive emblem.
 * Nodes drift slowly, connect within a radius, and ember pulses travel along
 * edges. No particle-blast; it reads as visualized computation.
 *
 * Performance: devicePixelRatio capped at 2, node count scales with area and
 * drops on small screens, and the loop pauses when offscreen / tab hidden.
 */
export function EmblemField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let pointer = { x: -9999, y: -9999, active: false };
    let last = performance.now();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : { width: 0, height: 0 };

    const resize = () => {
      const r = parent ? parent.getBoundingClientRect() : rect;
      width = r.width;
      height = r.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const density = width < 640 ? 26000 : 18000;
    const maxLink = width < 640 ? 110 : 150;

    const seed = () => {
      const count = Math.max(24, Math.min(84, Math.floor((width * height) / (density * density * 0.55))));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: 0.8 + Math.random() * 0.9,
      }));
      pulses = [];
    };

    const draw = (time: number) => {
      if (!running) return;
      const dt = Math.min(2, (time - last) / 16.67);
      last = time;

      ctx.clearRect(0, 0, width, height);

      // faint grid
      ctx.fillStyle = "rgba(255,255,255,0.035)";
      const grid = 56;
      for (let gx = grid; gx < width; gx += grid) {
        for (let gy = grid; gy < height; gy += grid) {
          ctx.fillRect(gx, gy, 1, 1);
        }
      }

      // pointer drift
      const px = pointer.active ? (pointer.x - width / 2) * 0.02 : 0;
      const py = pointer.active ? (pointer.y - height / 2) * 0.02 : 0;

      // update nodes
      for (const n of nodes) {
        n.x += n.vx * dt + px * 0.02;
        n.y += n.vy * dt + py * 0.02;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // edges + pulses
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxLink) {
            const alpha = (1 - d / maxLink) * 0.14;
            ctx.strokeStyle = `rgba(245,245,245,${alpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // spawn occasional pulses along an edge
      if (!reduced && pulses.length < 3 && Math.random() < 0.012 && nodes.length > 1) {
        const a = nodes[(Math.random() * nodes.length) | 0];
        let b = nodes[(Math.random() * nodes.length) | 0];
        if (a === b) b = nodes[(a === nodes[0] ? 1 : 0)];
        pulses.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.012 });
      }

      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += p.speed * dt;
        const t = p.t;
        const x = p.a.x + (p.b.x - p.a.x) * t;
        const y = p.a.y + (p.b.y - p.a.y) * t;
        const alpha = Math.sin(t * Math.PI) * 0.7;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 10);
        grad.addColorStop(0, `rgba(232,163,61,${alpha.toFixed(3)})`);
        grad.addColorStop(1, "rgba(232,163,61,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = "rgba(217,217,224,0.4)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const staticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255,255,255,0.035)";
      for (let gx = 56; gx < width; gx += 56)
        for (let gy = 56; gy < height; gy += 56) ctx.fillRect(gx, gy, 1, 1);
      for (let i = 0; i < nodes.length; i++)
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxLink) {
            ctx.strokeStyle = `rgba(245,245,245,${((1 - d / maxLink) * 0.14).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(217,217,224,0.4)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !reduced) {
            if (!running) {
              running = true;
              last = performance.now();
              raf = requestAnimationFrame(draw);
            }
          } else {
            cancelAnimationFrame(raf);
            running = false;
          }
        }
      },
      { threshold: 0 },
    );

    resize();
    io.observe(canvas);

    if (reduced) {
      staticFrame();
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
