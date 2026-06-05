"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { playClick, playHover } from "@/utils/tactile";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-6 px-10 flex items-center justify-between pointer-events-none"
    >
      <div className="pointer-events-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onMouseEnter={playHover}
          onClick={() => {
            playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden liquid-glass relative">
            <Image 
              src="/portrait.png" 
              alt="PUNNI Logo" 
              fill 
              priority
              className="object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" 
            />
          </div>
          <span className="font-serif text-2xl tracking-widest text-white drop-shadow-md">PUNNI</span>
        </div>
      </div>
      
      <div className="pointer-events-auto hidden md:flex items-center gap-10">
        <a 
          href="#craft" 
          aria-label="View our Craft and Engineering Tiers"
          className="text-lg tracking-widest text-chalk hover:text-white transition-colors drop-shadow"
          onMouseEnter={playHover}
          onClick={playClick}
        >
          Craft
        </a>
        <a 
          href="#contact" 
          aria-label="Initiate a project request"
          className="px-8 py-3 rounded-full liquid-glass text-lg tracking-widest text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 drop-shadow"
          onMouseEnter={playHover}
          onClick={playClick}
        >
          Initiate
        </a>
      </div>
    </motion.nav>
  );
}
