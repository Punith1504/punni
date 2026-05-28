"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import CharcoalReveal from '@/components/CharcoalReveal';
import MagneticButton from '@/components/MagneticButton';

const faqs = [
  {
    question: "Do you accept insurance?",
    answer: "We are considered an out-of-network provider for most PPO plans. We provide 'Superbills' after each session that you can submit to your insurance company for potential reimbursement depending on your specific coverage."
  },
  {
    question: "What is the investment for the Corporate Wellness Workshop?",
    answer: "Corporate packages are highly customized based on your team size and specific friction points. They typically range from half-day seminars to 3-month comprehensive audits. Please inquire directly for a detailed proposal."
  },
  {
    question: "Are our sessions completely confidential?",
    answer: "Absolutely. Confidentiality is the cornerstone of clinical psychology. Your privacy is legally and ethically protected, ensuring a completely safe space for honest exploration."
  },
  {
    question: "How long does the Couples Foundation retainer last?",
    answer: "The retainer is a month-to-month commitment, but we typically recommend a minimum of 3 months to see profound, lasting structural changes in the relationship dynamics."
  }
];

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <footer className="relative z-10 pt-32 pb-12 px-6 border-t border-white/10" id="contact">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Top: FAQs & Brand */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="flex-1 space-y-6">
            <h2 className="font-serif text-3xl text-white tracking-wide">G. Prathyusha</h2>
            <p className="text-xs uppercase tracking-widest text-chalk/60 font-bold">MSc Clinical Psychology</p>
            <p className="text-chalk leading-relaxed max-w-sm">
              Elevating mental wellness for high-performing individuals, couples, and corporate teams through science-backed clinical frameworks.
            </p>
          </div>

          <div className="flex-[1.5] space-y-8">
            <h3 className="font-serif text-2xl text-white">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="text-white/90 text-lg group-hover:text-white transition-colors pr-8">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="text-white/50 shrink-0" size={20} />
                    ) : (
                      <ChevronDown className="text-white/50 shrink-0" size={20} />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-chalk leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: CTA and Contact */}
        <div className="liquid-glass rounded-3xl p-10 md:p-16 border border-white/10 shadow-2xl flex flex-col md:flex-row gap-12 items-center justify-between relative overflow-hidden" id="booking">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>
          
          <div className="flex-1 space-y-6 text-center md:text-left z-10">
            <h3 className="font-serif text-4xl text-white">Ready to align your life?</h3>
            <p className="text-chalk text-lg max-w-md mx-auto md:mx-0">
              Secure your initial consultation or inquire about corporate packages today.
            </p>
            <div className="pt-4 flex justify-center md:justify-start">
              <MagneticButton className="px-8 py-4 bg-white text-black rounded-full font-bold tracking-widest uppercase text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                Book Consultation <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </div>
          
          <div className="flex-1 w-full flex flex-col items-center md:items-end gap-6 z-10">
            <div className="flex items-center gap-4 text-chalk w-full max-w-sm p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-white" />
              </div>
              <span className="text-sm">hello@prathyusha-clinic.com</span>
            </div>
            <div className="flex items-center gap-4 text-chalk w-full max-w-sm p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-white" />
              </div>
              <span className="text-sm">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4 text-chalk w-full max-w-sm p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-white" />
              </div>
              <span className="text-sm">Virtual Sessions & Jubilee Hills, HYD</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase tracking-widest text-chalk/50 font-bold">
          <p>&copy; {new Date().getFullYear()} G. Prathyusha. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
