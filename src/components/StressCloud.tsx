"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, ArrowRight, Mail, User, CheckCircle } from 'lucide-react';
import CharcoalReveal from '@/components/CharcoalReveal';

const initialStressors = [
  { id: 1, text: 'Deadlines', size: 90, top: '10%', left: '15%' },
  { id: 2, text: 'Arguments', size: 100, top: '40%', left: '10%' },
  { id: 3, text: 'Burnout', size: 120, top: '25%', left: '45%' },
  { id: 4, text: 'Finances', size: 95, top: '65%', left: '30%' },
  { id: 5, text: 'Parenting', size: 85, top: '15%', left: '75%' },
  { id: 6, text: 'Expectations', size: 110, top: '55%', left: '70%' },
];

export default function StressCloud() {
  const [stressors, setStressors] = useState(initialStressors);
  const [poppedCount, setPoppedCount] = useState(0);
  
  // Lead Generation States
  const [showGate, setShowGate] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handlePop = (id: number) => {
    setStressors(stressors.filter(s => s.id !== id));
    setPoppedCount(prev => prev + 1);
    
    // Automatically show gate if they pop all bubbles
    if (stressors.length === 1 && !isUnlocked) {
      setTimeout(() => setShowGate(true), 800);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      // Mock API call to save lead
      setIsUnlocked(true);
      setShowGate(false);
    }
  };

  const getTemperatureMessage = () => {
    if (poppedCount === 0) return "Click on the stressors that weigh on you today.";
    if (!isUnlocked) return "Calculating your cognitive load...";
    
    if (poppedCount <= 2) return "It's completely normal to feel a little pressure. You're maintaining a healthy baseline.";
    if (poppedCount <= 4) return "Your stress level is building up. Proactive management can prevent full burnout.";
    return "You're carrying a heavy cognitive load. A structured clinical approach is highly recommended.";
  };

  const getRecommendation = () => {
    if (poppedCount === 0 || !isUnlocked) return null;
    if (poppedCount <= 2) return "Action Plan: A free 15-minute consultation to learn basic cognitive framing strategies.";
    if (poppedCount <= 4) return "Action Plan: 'Individual Alignment' sessions to unpack these specific stressors safely.";
    return "Action Plan: The 'Monthly Retainer' package to build a sustainable, long-term mental wellness framework.";
  };

  const progressPercentage = (poppedCount / initialStressors.length) * 100;

  return (
    <section className="relative py-32 px-6 z-10" id="interactive">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-12">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Cognitive Load Assessment</h2>
          </CharcoalReveal>
          <p className="text-chalk text-lg max-w-2xl mx-auto">
            What's on your mind? Tap the bubbles that represent your current stressors to generate a personalized action plan.
          </p>
        </div>

        <div className="w-full relative bg-white/5 border border-white/10 rounded-3xl h-[450px] overflow-hidden mb-12 liquid-glass">
          <AnimatePresence>
            {stressors.map((stressor) => (
              <motion.div
                key={stressor.id}
                onClick={() => handlePop(stressor.id)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -15, 0],
                  x: [0, 10, -10, 0]
                }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)', transition: { duration: 0.3 } }}
                transition={{ 
                  duration: 0.4, 
                  y: { repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" },
                  x: { repeat: Infinity, duration: 4 + Math.random() * 2, ease: "easeInOut" }
                }}
                whileHover={{ scale: 1.05 }}
                className="absolute flex items-center justify-center rounded-full bg-white/10 border border-white/30 backdrop-blur-md cursor-pointer text-white font-medium shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:bg-white/20 transition-colors"
                style={{
                  width: stressor.size,
                  height: stressor.size,
                  top: stressor.top,
                  left: stressor.left,
                }}
              >
                {stressor.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {stressors.length === 0 && !showGate && (
            <motion.div 
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="text-white/60 mb-4" size={64} />
              <h3 className="text-2xl font-serif text-white">Assessment Complete</h3>
            </motion.div>
          )}

          {/* Lead Gate Overlay */}
          <AnimatePresence>
            {showGate && (
              <motion.div 
                className="absolute inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center p-6 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-[#111] border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
                  <h3 className="font-serif text-2xl text-white mb-2">Unlock Your Action Plan</h3>
                  <p className="text-chalk text-sm mb-6">Enter your details below to instantly view your clinical stress analysis and receive our weekly mental wellness newsletter.</p>
                  
                  <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                    <div className="relative flex items-center">
                      <User size={18} className="absolute left-4 text-white/40" />
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/30 outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div className="relative flex items-center">
                      <Mail size={18} className="absolute left-4 text-white/40" />
                      <input 
                        type="email" 
                        placeholder="Your Email Address" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-white/30 outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <button type="submit" className="w-full bg-white text-black font-bold tracking-widest uppercase rounded-lg py-4 mt-2 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      Reveal My Results <ArrowRight size={18} />
                    </button>
                  </form>
                  <p className="text-[#666] text-xs mt-4">We respect your privacy. Zero spam, unsubscribe anytime.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Temperature Reading */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 liquid-glass">
          <div className="flex items-start gap-4 flex-1">
            <Thermometer className="text-white/60 mt-1 shrink-0" size={32} />
            <div>
              <p className="text-white text-lg font-medium leading-relaxed">{getTemperatureMessage()}</p>
              {isUnlocked && poppedCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-white/10 border-l-2 border-white rounded-r-lg"
                >
                  <p className="text-white font-medium text-sm">{getRecommendation()}</p>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end w-full md:w-auto shrink-0 gap-4">
            <div className="w-full md:w-64">
              <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${isUnlocked ? progressPercentage : 0}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-white/40 to-white rounded-full"
                />
              </div>
              <div className="flex justify-between text-xs font-bold tracking-widest uppercase text-white/40">
                <span>Low</span>
                <span>Moderate</span>
                <span>High</span>
              </div>
            </div>

            {poppedCount > 0 && !isUnlocked && !showGate && (
              <button 
                onClick={() => setShowGate(true)} 
                className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold tracking-widest uppercase text-white transition-colors"
              >
                Analyze Results
              </button>
            )}
            
            {isUnlocked && (
              <a 
                href="#booking" 
                className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-gray-200 transition-colors"
              >
                Book Consultation <ArrowRight size={16} />
              </a>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
