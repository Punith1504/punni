"use client";
import { useEffect } from "react";
import AntiGravityContainer from "@/components/AntiGravityContainer";
import FloatingArtifacts from "@/components/FloatingArtifacts";
import Navbar from "@/components/Navbar";
import ParallaxBackground from "@/components/ParallaxBackground";
import BinaryCursorCanvas from "@/components/BinaryCursorCanvas";
import MagneticButton from "@/components/MagneticButton";
import CharcoalReveal from "@/components/CharcoalReveal";
import FlipPortrait from "@/components/FlipPortrait";
import AnimatedCounter from "@/components/AnimatedCounter";
import { playTick, playHover } from "@/utils/tactile";

import { motion } from "framer-motion";

import RollingText from "@/components/RollingText";

// Helper to open the chatbot from anywhere on the page
const openChatbot = () => {
  window.dispatchEvent(new CustomEvent("open-chatbot"));
};

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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <main className="relative min-h-screen selection:bg-white/20 overflow-hidden bg-[#0A0A0A]">
      <ParallaxBackground />
      <BinaryCursorCanvas />
      <FloatingArtifacts />
      <Navbar />
      
      {/* ═══════════════════════════════════════════════════════
          1. HERO SECTION
      ═══════════════════════════════════════════════════════ */}
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

        {/* Right Side: Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.4 } } 
          }}
          className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 relative"
        >
          {/* Decorative */}
          <div className="absolute -top-20 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-0 right-10 lg:-right-10 text-white/5 font-mono text-[150px] leading-none pointer-events-none select-none tracking-tighter">01</div>

          <motion.div variants={fadeUp} className="flex flex-col items-center lg:items-start">
            <CharcoalReveal>
              <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight tracking-tight relative z-10">
                Custom Crafted.
              </h1>
            </CharcoalReveal>
            <div className="w-16 h-[2px] bg-white/20 mt-6 mb-2"></div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="relative z-10">
            <p className="text-chalk text-lg md:text-xl max-w-2xl leading-relaxed mix-blend-screen mx-auto lg:mx-0">
              Most agencies trade speed for quality, or aesthetics for function. We refuse the compromise. PUNNI operates as a high-precision digital studio, leveraging advanced AI agents and Python-backed infrastructure to collapse development timelines from months to days.
            </p>
          </motion.div>
          
          <motion.div variants={fadeUp} className="relative z-10">
            <p className="text-chalk text-lg md:text-xl max-w-2xl leading-relaxed mix-blend-screen mx-auto lg:mx-0">
              We do not build templates. We build custom-crafted digital artifacts. Every interface is meticulously designed to feel handcrafted, while the backend logic runs with absolute, frictionless precision. You bring the vision; we engineer the reality.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="pt-8 relative z-10 w-full flex flex-col items-center lg:items-start gap-4">
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <MagneticButton 
                className="px-8 py-4 bg-white/5 border border-white/20 liquid-glass rounded-full text-white tracking-widest hover:bg-white/10 transition-colors"
                onClick={openChatbot}
              >
                Initiate Project
              </MagneticButton>
              <MagneticButton 
                className="px-8 py-4 text-chalk border border-transparent hover:border-white/10 rounded-full tracking-widest transition-all"
                onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
              >
                How We Work
              </MagneticButton>
            </div>
            {/* Trust line */}
            <p className="text-white/25 text-xs tracking-wider uppercase">
              Trusted by 12+ founders &nbsp;•&nbsp; Avg. delivery: 48 hours
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          2. IMPACT METRICS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { target: 12, suffix: "+", label: "Projects Delivered" },
              { target: 98, suffix: "%", label: "Client Satisfaction" },
              { target: 3, suffix: "x", label: "Faster Than Traditional" },
              { target: 48, prefix: "<", suffix: "hrs", label: "Average Delivery" },
            ].map((stat, i) => (
              <AntiGravityContainer key={i} className="p-6 liquid-glass rounded-2xl text-center group">
                <div style={{ transform: "translateZ(20px)" }}>
                  <div className="font-serif text-3xl md:text-4xl text-white mb-2">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      duration={2000 + i * 200}
                    />
                  </div>
                  <p className="text-white/40 text-xs uppercase tracking-widest">{stat.label}</p>
                </div>
              </AntiGravityContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          3. HOW WE WORK (Process)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 z-10" id="process">
        <div className="max-w-6xl mx-auto space-y-16">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white text-center w-full block">How We Work.</h2>
          </CharcoalReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connection line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {[
              { step: "01", title: "Discovery", desc: "We learn your vision, audience, and goals through a focused consultation." },
              { step: "02", title: "Architecture", desc: "AI-powered design and code scaffolding — your project takes shape in hours." },
              { step: "03", title: "Refinement", desc: "Pixel-perfect polish with your feedback at every iteration." },
              { step: "04", title: "Launch", desc: "Deployed, optimized, and handed off with full documentation and support." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="relative text-center group"
              >
                {/* Step number badge */}
                <div className="w-10 h-10 rounded-full liquid-glass border border-white/20 flex items-center justify-center mx-auto mb-6 text-sm text-white/60 group-hover:text-white group-hover:border-white/40 transition-all relative z-10 bg-[#0A0A0A]">
                  {item.step}
                </div>
                <h3 className="font-serif text-xl text-white mb-3">{item.title}</h3>
                <p className="text-chalk/70 text-sm leading-relaxed max-w-[220px] mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          4. DEFYING DIGITAL GRAVITY (Advantages)
      ═══════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════
          5. ENGINEERING TIERS (Pricing)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 z-10" id="craft">
        <div className="max-w-7xl mx-auto space-y-16">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white text-center w-full block">Engineering Tiers.</h2>
          </CharcoalReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "The Starter",
                price: "$100",
                popular: false,
                bestFor: "Simple landing pages, personal sites, and quick validations.",
                features: [
                  "Any simple website",
                  "Responsive design",
                  "Fast delivery",
                ],
              },
              {
                title: "The Foundation",
                price: "$250",
                popular: false,
                bestFor: "Client portals, premium local business hubs, and digital portfolios.",
                features: [
                  "Custom responsive design",
                  "Up to 5 pages",
                  "Single API integration",
                  "Contact form & analytics",
                  "3-day delivery",
                ],
              },
              {
                title: "The Product",
                price: "$600",
                popular: false,
                bestFor: "Non-technical founders, Micro-SaaS, and creator platforms.",
                features: [
                  "Everything in Foundation",
                  "Multi-user auth & workflows",
                  "Payment gateway (Stripe/Razorpay)",
                  "Automated email alerts",
                  "Admin dashboard",
                  "Custom logic & routing",
                  "7-day delivery",
                ],
              },
              {
                title: "The Elite",
                price: "$1,500+",
                popular: false,
                bestFor: "Invite-only communities, high-ticket private networks, and complex enterprise tools.",
                features: [
                  "Everything in Product",
                  "Bespoke architecture",
                  "Advanced data processing",
                  "AI/ML integrations",
                  "Real-time features",
                  "Priority support",
                  "Custom timeline",
                ],
              },
            ].map((tier, i) => (
              <AntiGravityContainer
                key={i}
                className={`p-10 liquid-glass rounded-3xl group flex flex-col h-full transition-colors relative ${
                  tier.popular
                    ? "border-2 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                    : "border border-white/10 hover:border-white/30"
                }`}
              >
                {/* Most Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-[10px] uppercase tracking-widest font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                <div style={{ transform: "translateZ(40px)" }} className="flex-1 space-y-6">
                  <div>
                    <h3 className="font-serif text-3xl text-white">{tier.title}</h3>
                    <p className="text-2xl text-white mt-2 font-serif">{tier.price}</p>
                  </div>

                  <p className="text-chalk/60 text-sm">{tier.bestFor}</p>

                  {/* Feature list */}
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-chalk/80">
                        <span className="text-white/40 mt-0.5 text-xs">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-4">
                    <button
                      onClick={openChatbot}
                      className={`w-full py-3 rounded-full text-sm tracking-widest uppercase transition-all ${
                        tier.popular
                          ? "bg-white text-black hover:bg-gray-100 font-medium"
                          : "border border-white/20 text-white hover:bg-white/5 hover:border-white/40"
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </AntiGravityContainer>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          6. FOOTER / FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <footer id="contact" className="relative py-32 px-6 z-10 border-t border-white/10 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white">Stop Waiting on Development.<br />Start Scaling.</h2>
          </CharcoalReveal>
          <p className="text-chalk text-xl max-w-2xl mx-auto">
            Your market isn't waiting. Tell us your vision and get a custom-crafted MVP delivered this month.
          </p>
          
          {/* Big CTA */}
          <div className="flex justify-center pt-4">
            <MagneticButton
              className="px-14 py-6 bg-white text-black font-bold tracking-widest uppercase rounded-full hover:bg-gray-200 transition-colors text-lg"
              onClick={openChatbot}
            >
              Start Your Project →
            </MagneticButton>
          </div>

          {/* Fallback Contact */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-white/30 text-sm">
            <a href="tel:9642150403" className="flex items-center gap-2 hover:text-white/60 transition-colors">
              📞 9642150403
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:punni.sdstudio@gmail.com" className="flex items-center gap-2 hover:text-white/60 transition-colors">
              ✉️ punni.sdstudio@gmail.com
            </a>
          </div>

          <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-muted text-xs tracking-widest uppercase">
            <span>© 2026 PUNNI Studio. Custom Crafted.</span>
            <span className="hidden sm:inline">•</span>
            <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
