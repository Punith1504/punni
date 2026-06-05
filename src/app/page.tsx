"use client";
import { useEffect } from "react";
import Image from "next/image";
import AntiGravityContainer from "@/components/AntiGravityContainer";
import FloatingArtifacts from "@/components/FloatingArtifacts";
import Navbar from "@/components/Navbar";
import ParallaxBackground from "@/components/ParallaxBackground";
import BinaryCursorCanvas from "@/components/BinaryCursorCanvas";
import MagneticButton from "@/components/MagneticButton";
import CharcoalReveal from "@/components/CharcoalReveal";
import FlipPortrait from "@/components/FlipPortrait";
import { playTick, playHover } from "@/utils/tactile";

import { motion } from "framer-motion";

import RollingText from "@/components/RollingText";

export default function Home() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (Math.abs(window.scrollY - lastScrollY) > 50) {
            playTick();
            lastScrollY = window.scrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-white/20 overflow-hidden bg-[#0A0A0A]">
      <ParallaxBackground />
      <BinaryCursorCanvas />
      <FloatingArtifacts />
      <Navbar />
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-start justify-start px-6 md:px-12 pt-28 md:pt-36 pb-12 z-10 max-w-7xl mx-auto gap-12 lg:gap-16">
        
        {/* Left Side: Portrait */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-5/12 flex justify-center lg:justify-start lg:sticky lg:top-32 perspective-1000 shrink-0"
        >
          <FlipPortrait />
        </motion.div>

        {/* Right Side: Philosophy Text Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.4 } } 
          }}
          className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 relative"
        >
          {/* Decorative Artifacts for premium aesthetic */}
          <div className="absolute -top-20 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-0 right-10 lg:-right-10 text-white/5 font-mono text-[150px] leading-none pointer-events-none select-none tracking-tighter">01</div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }} className="flex flex-col items-center lg:items-start">
            <CharcoalReveal>
              <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight tracking-tight relative z-10">
                Custom Crafted.
              </h1>
            </CharcoalReveal>
            <div className="w-16 h-[2px] bg-white/20 mt-6 mb-2"></div>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }} className="relative z-10">
            <p className="text-chalk text-lg md:text-xl max-w-2xl leading-relaxed mix-blend-screen mx-auto lg:mx-0">
              Most agencies trade speed for quality, or aesthetics for function. We refuse the compromise. PUNNI operates as a high-precision digital studio, leveraging advanced AI agents and Python-backed infrastructure to collapse development timelines from months to days.
            </p>
          </motion.div>
          
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }} className="relative z-10">
            <p className="text-chalk text-lg md:text-xl max-w-2xl leading-relaxed mix-blend-screen mx-auto lg:mx-0">
              We do not build templates. We build custom-crafted digital artifacts. Every interface is meticulously designed to feel handcrafted, while the backend logic runs with absolute, frictionless precision. You bring the vision; we engineer the reality.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } } }} className="pt-8 relative z-10 w-full flex justify-center lg:justify-start">
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <MagneticButton className="px-8 py-4 bg-white/5 border border-white/20 liquid-glass rounded-full text-white tracking-widest hover:bg-white/10 transition-colors">
                Initiate Project
              </MagneticButton>
              <MagneticButton className="px-8 py-4 text-chalk border border-transparent hover:border-white/10 rounded-full tracking-widest transition-all">
                Explore the Architecture
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* The Philosophy section has been integrated into the Hero section above. */}

      {/* 3. Anti-Gravity Advantage */}
      <section className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white text-center w-full block">Defying Digital Gravity.</h2>
          </CharcoalReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Artistic Fidelity", desc: "Interfaces that breathe. We utilize high-contrast, sketched UI elements that elevate your brand from a standard website to a memorable digital experience." },
              { title: "Zero-Friction UX", desc: "Smooth, spring-physics micro-animations and multi-layered parallax depth. Your platform won't just look premium; it will feel weightless." },
              { title: "Rapid AI Deployment", desc: "'Idea to Market' in a fraction of the time. Our automated tech stack ensures your business logic is translated into flawless code faster than traditional development cycles." }
            ].map((item, i) => (
              <AntiGravityContainer key={i} className="p-8 liquid-glass rounded-2xl space-y-6 group">
                <div style={{ transform: "translateZ(30px)" }}>
                  <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                  <p className="text-chalk leading-relaxed">{item.desc}</p>
                </div>
              </AntiGravityContainer>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Service Architecture (Engineering Tiers) */}
      <section className="relative py-32 px-6 z-10" id="craft">
        <div className="max-w-7xl mx-auto space-y-16">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white text-center w-full block">Engineering Tiers.</h2>
          </CharcoalReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "The Foundation", price: "₹25,000", bestFor: "Client portals, premium local business hubs, and digital portfolios.", includes: "Core informational architecture, functional user accounts, single API integration, and our signature Glassmorphism aesthetic." },
              { title: "The Product", price: "₹60,000", bestFor: "Non-technical founders, Micro-SaaS, and creator platforms.", includes: "Full multi-user workflows, integrated payment gateways (Razorpay/Stripe), automated alerts, and custom logic routing." },
              { title: "The Elite", price: "₹1,20,000+", bestFor: "Invite-only communities, high-ticket private networks, and complex enterprise tools.", includes: "Bespoke application architecture, advanced data processing, and an exclusive, highly customized 'Anti-Gravity' interactive environment." }
            ].map((tier, i) => (
              <AntiGravityContainer key={i} className="p-10 liquid-glass rounded-3xl group flex flex-col h-full border border-white/10 hover:border-white/30 transition-colors">
                <div style={{ transform: "translateZ(40px)" }} className="flex-1 space-y-8">
                  <div>
                    <h3 className="font-serif text-3xl text-white">{tier.title}</h3>
                    <p className="text-xl text-chalk mt-2">{tier.price}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-muted mb-2">Best For</h4>
                    <p className="text-chalk/80">{tier.bestFor}</p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-muted mb-2">Includes</h4>
                    <p className="text-chalk/80 text-sm leading-relaxed">{tier.includes}</p>
                  </div>
                </div>
              </AntiGravityContainer>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer / Final Call to Action */}
      <footer id="contact" className="relative py-32 px-6 z-10 border-t border-white/10 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white">Stop Waiting on Development.<br />Start Scaling.</h2>
          </CharcoalReveal>
          <p className="text-chalk text-xl">Your market isn't waiting. Bring your custom-crafted MVP to life this month.</p>
          
          <form className="liquid-glass p-8 md:p-12 rounded-3xl space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted">Name</label>
              <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-white/40 transition-colors" placeholder="Your Name" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted">Project Type</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-white/40 appearance-none">
                  <option>Platform</option>
                  <option>Portal</option>
                  <option>Micro-SaaS</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted">Timeline</label>
                <select className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-white/40 appearance-none">
                  <option>ASAP</option>
                  <option>1 Month</option>
                  <option>Exploring</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted">Brief Description</label>
              <textarea className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-white/40 min-h-[100px]" placeholder="Core function of your product..." />
            </div>
            <div className="pt-6 flex justify-center">
              <MagneticButton className="px-12 py-5 bg-white text-black font-bold tracking-widest uppercase rounded-full hover:bg-gray-200 transition-colors">
                Request Technical Review
              </MagneticButton>
            </div>
          </form>
          <div className="pt-12 text-muted text-xs tracking-widest uppercase">
            © 2026 PUNNI Studio. Custom Crafted.
          </div>
        </div>
      </footer>
    </main>
  );
}
