"use client";
import { motion } from "framer-motion";
import CharcoalReveal from "@/components/CharcoalReveal";
import FlipPortrait from "@/components/FlipPortrait";
import MagneticButton from "@/components/MagneticButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-start justify-start px-6 md:px-12 pt-32 md:pt-40 pb-12 z-10 max-w-7xl mx-auto gap-12 lg:gap-16">
      
      {/* Left Side: Portrait */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full lg:w-5/12 flex justify-center lg:justify-start lg:sticky lg:top-32 perspective-1000 shrink-0"
      >
        <FlipPortrait />
      </motion.div>

      {/* Right Side: Text Content */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } } 
        }}
        className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 relative"
      >
        {/* Decorative Blur */}
        <div className="absolute -top-20 -left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }} className="flex flex-col items-center lg:items-start w-full">
          <CharcoalReveal>
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight tracking-tight relative z-10">
              Transform Workplace Burnout & Relationship Friction into <span className="text-[#a8a196] italic font-light">Clarity.</span>
            </h1>
          </CharcoalReveal>
          <div className="w-16 h-[2px] bg-white/20 mt-8 mb-4"></div>
        </motion.div>
        
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }} className="relative z-10">
          <p className="text-chalk text-xl md:text-2xl font-light max-w-2xl leading-relaxed mix-blend-screen mx-auto lg:mx-0">
            Science-backed therapy for high-performing professionals, couples, and families. <br/><br/>
            By <strong>G. Prathyusha</strong>, MSc Clinical Psychology.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }} className="pt-6 relative z-10 w-full flex justify-center lg:justify-start">
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start w-full sm:w-auto">
            <MagneticButton className="px-8 py-4 bg-white border border-white text-black rounded-full tracking-widest font-bold hover:bg-gray-200 transition-colors w-full sm:w-auto text-center">
              Book Your Initial Consultation
            </MagneticButton>
            <MagneticButton className="px-8 py-4 text-chalk border border-white/20 hover:border-white/50 rounded-full tracking-widest transition-all w-full sm:w-auto text-center">
              Assess Your Stress Level
            </MagneticButton>
          </div>
        </motion.div>

        {/* Trust Banner */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }} 
          className="pt-12 mt-8 border-t border-white/10 w-full"
        >
          <p className="text-sm tracking-widest uppercase text-muted flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4">
            <span className="text-white/40">Specializing in:</span>
            <span className="text-chalk/80 text-center">Corporate Burnout <span className="mx-2 hidden sm:inline">•</span> Relationship Dynamics <span className="mx-2 hidden sm:inline">•</span> Adolescent Development</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
