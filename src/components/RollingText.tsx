"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "Weightless Design.",
  "Heavyweight Engineering.",
  "Custom Crafted.",
  "Delivering Software."
];

export default function RollingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[80px] md:h-[100px] relative w-full flex items-start justify-center md:justify-start overflow-visible perspective-1000">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ y: 80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -80, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="absolute font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight tracking-tight origin-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {phrases[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
