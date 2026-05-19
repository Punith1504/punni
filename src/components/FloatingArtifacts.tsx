"use client";
import { motion } from "framer-motion";

const artifacts = [
  { id: 1, type: "circle", size: 40, top: "20%", left: "15%", duration: 15, color: "text-blue-400", glow: "rgba(96, 165, 250, 0.4)" },
  { id: 2, type: "cross", size: 24, top: "60%", left: "80%", duration: 20, color: "text-purple-400", glow: "rgba(192, 132, 252, 0.4)" },
  { id: 3, type: "square", size: 30, top: "80%", left: "10%", duration: 18, color: "text-cyan-400", glow: "rgba(34, 211, 238, 0.4)" },
  { id: 4, type: "dots", size: 50, top: "30%", left: "75%", duration: 25, color: "text-indigo-400", glow: "rgba(129, 140, 248, 0.4)" },
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
            filter: `drop-shadow(0 0 8px ${artifact.glow})`
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: artifact.type === "binary" ? [0, 5, -5, 0] : [0, 90, 180],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: artifact.duration,
            repeat: Infinity,
            ease: "linear",
            delay: artifact.delay || 0,
          }}
        >
          {artifact.type === "circle" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          )}
          {artifact.type === "cross" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 24 24">
              <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          )}
          {artifact.type === "square" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 30 30">
              <rect x="2" y="2" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1" />
              <line x1="2" y1="2" x2="28" y2="28" stroke="currentColor" strokeWidth="1" />
            </svg>
          )}
          {artifact.type === "dots" && (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-current rounded-full" />
              ))}
            </div>
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
