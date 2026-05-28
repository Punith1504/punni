"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import CharcoalReveal from '@/components/CharcoalReveal';

const testimonials = [
  {
    id: 1,
    quote: "Prathyusha's approach completely transformed how I handle workplace stress. Her practical frameworks helped me manage my startup anxiety and finally achieve a sustainable work-life balance.",
    author: "Software Engineer, Tech Startup",
    rating: 5
  },
  {
    id: 2,
    quote: "We were on the brink of separation. The 'Couples Foundation' package gave us the communication tools we desperately needed. It honestly saved our marriage.",
    author: "Married Couple, 5 Years",
    rating: 5
  },
  {
    id: 3,
    quote: "Bringing her Corporate Wellness Workshop to our engineering team changed our entire culture. Burnout rates dropped, and psychological safety improved dramatically.",
    author: "VP of Engineering, Enterprise SaaS",
    rating: 5
  },
  {
    id: 4,
    quote: "A truly empathetic and modern approach to therapy. She doesn't just listen; she provides actionable, science-backed strategies that work in the real world.",
    author: "Marketing Director",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000); // Auto-rotate every 8 seconds
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 }
    })
  };

  return (
    <section className="relative py-32 px-6 z-10 border-t border-white/5" id="results">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-16 space-y-4">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Results That Speak Volumes</h2>
          </CharcoalReveal>
          <p className="text-chalk text-lg">
            Anonymized feedback from high-performing individuals and teams.
          </p>
        </div>

        <div className="w-full flex items-center justify-between gap-4 md:gap-8 relative">
          
          <button 
            onClick={handlePrev} 
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex-1 overflow-hidden relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-3xl mx-auto liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 text-center flex flex-col items-center relative"
              >
                <div className="absolute -top-6 bg-[#0A0A0A] p-2 rounded-full border border-white/10">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <Quote size={20} className="text-[#0A0A0A]" />
                  </div>
                </div>
                
                <div className="flex gap-1 text-[#E8FF47] mt-4 mb-8">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                
                <p className="font-serif text-2xl md:text-3xl text-white leading-relaxed italic mb-10">
                  "{testimonials[currentIndex].quote}"
                </p>
                
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-1 bg-white/20 rounded-full"></div>
                  <p className="text-xs uppercase tracking-widest text-chalk/80 font-bold">
                    {testimonials[currentIndex].author}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext} 
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

        </div>

        <div className="flex gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
