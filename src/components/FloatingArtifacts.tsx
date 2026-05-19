"use client";
import { motion } from "framer-motion";

const artifacts = [
  { id: 1, type: "circle", size: 40, top: "20%", left: "15%", duration: 15 },
  { id: 2, type: "cross", size: 24, top: "60%", left: "80%", duration: 20 },
  { id: 3, type: "square", size: 30, top: "80%", left: "10%", duration: 18 },
  { id: 4, type: "dots", size: 50, top: "30%", left: "75%", duration: 25 },
];

export default function FloatingArtifacts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {artifacts.map((artifact) => (
        <motion.div
          key={artifact.id}
          className="absolute opacity-20"
          style={{ top: artifact.top, left: artifact.left }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: artifact.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {artifact.type === "circle" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          )}
          {artifact.type === "cross" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 24 24">
              <path d="M12 2L12 22M2 12L22 12" stroke="white" strokeWidth="1" fill="none" />
            </svg>
          )}
          {artifact.type === "square" && (
            <svg width={artifact.size} height={artifact.size} viewBox="0 0 30 30">
              <rect x="2" y="2" width="26" height="26" fill="none" stroke="white" strokeWidth="1" />
              <line x1="2" y1="2" x2="28" y2="28" stroke="white" strokeWidth="1" />
            </svg>
          )}
          {artifact.type === "dots" && (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full opacity-50" />
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
