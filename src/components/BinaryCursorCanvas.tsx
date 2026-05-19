"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  value: string;
  opacity: number;
  size: number;
  velocity: number;
  life: number;
  maxLife: number;
}

export default function BinaryCursorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const isOne = Math.random() > 0.5;
      particles.push({
        x: e.clientX + (Math.random() * 20 - 10),
        y: e.clientY + (Math.random() * 20 - 10),
        value: isOne ? "1" : "0",
        opacity: 1,
        size: 14,
        velocity: Math.random() * 2.5 + 1.0, // Increased upward speed
        life: 0,
        maxLife: Math.random() * 20 + 40, // frames
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.y -= p.velocity;
        p.x += Math.sin(p.life * 0.1) * 0.5; // Added subtle horizontal drift
        
        // Decay
        const progress = p.life / p.maxLife;
        p.opacity = Math.max(0, 1 - progress);
        p.size = Math.max(8, 14 - (progress * 6));

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = `rgba(234, 234, 234, ${p.opacity})`;
        ctx.shadowColor = `rgba(234, 234, 234, ${p.opacity * 0.6})`;
        ctx.shadowBlur = 5;
        ctx.fillText(p.value, p.x, p.y);
        ctx.shadowBlur = 0; // reset
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0" 
    />
  );
}
