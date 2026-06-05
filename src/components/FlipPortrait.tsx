"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { playHover } from "@/utils/tactile";

const backContent = [
  {
    title: "⚡ 48-Hour Delivery",
    desc: "Idea to MVP in days, not months. We build with aggressive precision."
  },
  {
    title: "📈 Scale Faster",
    desc: "Robust, scalable infrastructure that handles growth effortlessly."
  },
  {
    title: "🛠️ Focus on Growth",
    desc: "You acquire the users. We take care of the tech. No compromises."
  }
];

export default function FlipPortrait() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFlipped) {
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % backContent.length);
      }, 2500);
    } else {
      setIndex(0); // Reset when flipped back
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFlipped]);

  return (
    <div 
      className="relative w-[300px] h-[450px] md:w-[350px] md:h-[550px] lg:w-[400px] lg:h-[650px] cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => {
        setIsFlipped(true);
        playHover();
      }}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        {/* Front */}
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <div className="w-full h-full liquid-glass p-3 rounded-[3rem] shadow-2xl shadow-white/5">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden glass-edge">
              <Image 
                src="/portrait.png" 
                alt="Punith Portrait" 
                fill 
                className="object-cover mix-blend-luminosity scale-105"
              />
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0" 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-full liquid-glass p-8 rounded-[3rem] flex flex-col items-center justify-center border border-white/20 shadow-2xl shadow-white/5 bg-[#0A0A0A]/50 overflow-hidden perspective-1000">
            <div className="relative w-full h-[150px] flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0, rotateX: -45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -50, opacity: 0, rotateX: 45 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className="absolute w-full text-center px-4 origin-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span className="block font-serif text-2xl md:text-3xl text-white tracking-wide mb-4">
                    {backContent[index].title}
                  </span>
                  <p className="text-sm md:text-base text-chalk/70 leading-relaxed">
                    {backContent[index].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
