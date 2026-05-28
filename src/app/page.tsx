"use client";
import { useEffect } from "react";
import ParallaxBackground from "@/components/ParallaxBackground";
import BinaryCursorCanvas from "@/components/BinaryCursorCanvas";
import FloatingArtifacts from "@/components/FloatingArtifacts";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StressCloud from "@/components/StressCloud";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { playTick } from "@/utils/tactile";

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
      <HeroSection />
      <StressCloud />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  );
}
