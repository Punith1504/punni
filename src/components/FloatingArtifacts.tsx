"use client";
import { motion } from "framer-motion";

const artifacts = [
  { id: 1, type: "astrolabe", size: 60, top: "20%", left: "15%", duration: 25, color: "text-blue-400", glow: "rgba(96, 165, 250, 0.4)" },
  { id: 2, type: "prism", size: 45, top: "60%", left: "80%", duration: 30, color: "text-purple-400", glow: "rgba(192, 132, 252, 0.4)" },
  { id: 3, type: "hexagram", size: 50, top: "80%", left: "10%", duration: 28, color: "text-cyan-400", glow: "rgba(34, 211, 238, 0.4)" },
  { id: 4, type: "orbital", size: 70, top: "30%", left: "75%", duration: 35, color: "text-indigo-400", glow: "rgba(129, 140, 248, 0.4)" },
  { id: 5, type: "binary", text: "01101", top: "15%", left: "65%", duration: 22, color: "text-emerald-400", glow: "rgba(52, 211, 153, 0.4)", delay: 0 },
  { id: 6, type: "binary", text: "10010", top: "70%", left: "25%", duration: 19, color: "text-sky-400", glow: "rgba(56, 189, 248, 0.4)", delay: 2 },
  { id: 7, type: "binary", text: "1101", top: "45%", left: "85%", duration: 24, color: "text-blue-400", glow: "rgba(96, 165, 250, 0.4)", delay: 5 },
  { id: 8, type: "binary", text: "0010", top: "85%", left: "55%", duration: 17, color: "text-violet-400", glow: "rgba(167, 139, 250, 0.4)", delay: 1 },
];

export default function FloatingArtifacts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {artifacts.map((artifact) => (
        <motion.div
          key={artifact.id}
          className={`absolute opacity-15 ${artifact.color}`}
          style={{ 
            top: artifact.top, 
            left: artifact.left,
            filter: `drop-shadow(0 0 12px ${artifact.glow})`
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: artifact.type === "binary" ? [0, 5, -5, 0] : [0, 180, 360],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: artifact.duration,
            repeat: Infinity,
            ease: "linear",
            delay: artifact.delay || 0,
          }}
        >
          {artifact.type === "astrolabe" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="30" cy="30" r="28" strokeDasharray="4 4" />
              <circle cx="30" cy="30" r="20" />
              <circle cx="30" cy="30" r="12" strokeDasharray="2 2" />
              <line x1="30" y1="2" x2="30" y2="58" />
              <line x1="2" y1="30" x2="58" y2="30" />
            </svg>
          )}
          {artifact.type === "prism" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 45 45" fill="none" stroke="currentColor" strokeWidth="1">
              <polygon points="22.5,2 43,14 43,38 22.5,50 2,38 2,14" />
              <polyline points="2,14 22.5,26 43,14" />
              <line x1="22.5" y1="26" x2="22.5" y2="50" />
            </svg>
          )}
          {artifact.type === "hexagram" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1">
              <polygon points="25,4 46,39 4,39" />
              <polygon points="25,46 4,11 46,11" />
              <circle cx="25" cy="25" r="14" strokeDasharray="2 2" />
            </svg>
          )}
          {artifact.type === "orbital" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 70 70" fill="none" stroke="currentColor" strokeWidth="1">
              <ellipse cx="35" cy="35" rx="32" ry="12" transform="rotate(30 35 35)" />
              <ellipse cx="35" cy="35" rx="32" ry="12" transform="rotate(-30 35 35)" />
              <ellipse cx="35" cy="35" rx="32" ry="12" transform="rotate(90 35 35)" />
              <circle cx="35" cy="35" r="4" fill="currentColor" />
            </svg>
          )}
          {artifact.type === "binary" && (
            <div className="font-mono text-sm tracking-widest font-bold">
              {artifact.text}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
