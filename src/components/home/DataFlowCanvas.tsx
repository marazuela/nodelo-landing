import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  size: number;
  color: string;
  phase: "inflow" | "outflow";
  curveOffset: number;
}

const COLORS = ["#58a6ff", "#bc8cff", "#3fb950", "#d29922"];

export default function DataFlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const createParticle = useCallback((w: number, h: number): Particle => {
    const phase = Math.random() > 0.5 ? "inflow" : "outflow";
    const centerX = w / 2;
    const centerY = h / 2;

    if (phase === "inflow") {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.max(w, h) * 0.45;
      return {
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        targetX: centerX + (Math.random() - 0.5) * 40,
        targetY: centerY + (Math.random() - 0.5) * 40,
        progress: 0,
        speed: 0.003 + Math.random() * 0.005,
        size: 1.5 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase,
        curveOffset: (Math.random() - 0.5) * 80,
      };
    }

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.max(w, h) * 0.35;
    return {
      x: centerX + (Math.random() - 0.5) * 40,
      y: centerY + (Math.random() - 0.5) * 40,
      targetX: centerX + Math.cos(angle) * dist,
      targetY: centerY + Math.sin(angle) * dist,
      progress: 0,
      speed: 0.002 + Math.random() * 0.004,
      size: 2 + Math.random() * 2.5,
      color: "#58a6ff",
      phase,
      curveOffset: (Math.random() - 0.5) * 60,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      const p = createParticle(canvas.offsetWidth, canvas.offsetHeight);
      p.progress = Math.random();
      particles.current.push(p);
    }

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      grad.addColorStop(0, "rgba(88,166,255,0.15)");
      grad.addColorStop(1, "rgba(88,166,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      particles.current.forEach((p, i) => {
        p.progress += p.speed;

        if (p.progress >= 1) {
          particles.current[i] = createParticle(w, h);
          return;
        }

        const t = p.progress;
        const midX = (p.x + p.targetX) / 2 + p.curveOffset;
        const midY = (p.y + p.targetY) / 2 - Math.abs(p.curveOffset) * 0.5;
        const px = (1 - t) * (1 - t) * p.x + 2 * (1 - t) * t * midX + t * t * p.targetX;
        const py = (1 - t) * (1 - t) * p.y + 2 * (1 - t) * t * midY + t * t * p.targetY;

        const alpha = t < 0.1 ? t / 0.1 : t > 0.85 ? (1 - t) / 0.15 : 1;

        ctx.globalAlpha = alpha * 0.8;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha * 0.2;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ display: "block" }}
    />
  );
}
