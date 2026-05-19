"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { playHover } from "@/utils/tactile";

export default function FlipPortrait() {
  const [isFlipped, setIsFlipped] = useState(false);

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
          <div className="w-full h-full liquid-glass p-3 rounded-[3rem] flex items-center justify-center border border-white/20 shadow-2xl shadow-white/5">
            <div className="text-center space-y-2">
              <div className="w-12 h-[1px] bg-white/20 mx-auto mb-4"></div>
              <span className="block font-serif text-3xl text-white tracking-widest uppercase leading-tight">
                Custom<br/>Crafted
              </span>
              <div className="w-12 h-[1px] bg-white/20 mx-auto mt-4"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
