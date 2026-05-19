"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <div ref={ref} className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 opacity-[0.02]"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="crosshatch" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 40 L 40 0 M 0 0 L 40 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crosshatch)" />
        </svg>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-white opacity-[0.015] rounded-full blur-[120px]"
      />
      <motion.div 
        style={{ y: y1 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white opacity-[0.02] rounded-full blur-[100px]"
      />
    </div>
  );
}
