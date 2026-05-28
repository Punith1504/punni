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
      className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 flex items-center justify-between pointer-events-none bg-gradient-to-b from-[#0A0A0A]/80 to-transparent backdrop-blur-sm"
    >
      <div className="pointer-events-auto">
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onMouseEnter={playHover}
          onClick={() => {
            playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden liquid-glass relative border border-white/20">
            <Image 
              src="/portrait.png" 
              alt="G. Prathyusha" 
              fill 
              priority
              className="object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl tracking-wide text-white drop-shadow-md leading-tight">G. Prathyusha</span>
            <span className="text-[10px] uppercase tracking-widest text-chalk/80">Clinical Psychology</span>
          </div>
        </div>
      </div>
      
      <div className="pointer-events-auto hidden md:flex items-center gap-10">
        <a 
          href="#expertise" 
          aria-label="View our expertise and tiers"
          className="text-sm tracking-widest text-chalk hover:text-white transition-colors drop-shadow uppercase"
          onMouseEnter={playHover}
          onClick={playClick}
        >
          Expertise
        </a>
        <a 
          href="#interactive" 
          aria-label="Assess your stress level"
          className="text-sm tracking-widest text-chalk hover:text-white transition-colors drop-shadow uppercase"
          onMouseEnter={playHover}
          onClick={playClick}
        >
          Assess Stress
        </a>
        <a 
          href="#results" 
          aria-label="View client results"
          className="text-sm tracking-widest text-chalk hover:text-white transition-colors drop-shadow uppercase"
          onMouseEnter={playHover}
          onClick={playClick}
        >
          Results
        </a>
        <a 
          href="#booking" 
          aria-label="Book your consultation"
          className="px-8 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm tracking-widest text-white uppercase hover:bg-white/20 transition-all hover:scale-105 active:scale-95 drop-shadow shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          onMouseEnter={playHover}
          onClick={playClick}
        >
          Book Now
        </a>
      </div>
    </motion.nav>
  );
}
