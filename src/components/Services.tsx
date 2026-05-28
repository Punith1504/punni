"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Briefcase, Check, ArrowRight } from 'lucide-react';
import CharcoalReveal from '@/components/CharcoalReveal';
import AntiGravityContainer from '@/components/AntiGravityContainer';

const services = [
  {
    id: 'individual',
    title: 'Individual Alignment',
    subtitle: 'Single Sessions',
    icon: <User size={28} />,
    description: 'Targeted interventions to navigate immediate stressors, anxiety, and personal roadblocks.',
    features: ['Cognitive reframing techniques', 'Action-oriented coping strategies', 'Flexible scheduling', 'Follow-up resources'],
    popular: false,
    cta: 'Book Session'
  },
  {
    id: 'corporate',
    title: 'Corporate Wellness',
    subtitle: 'High-Ticket B2B',
    icon: <Briefcase size={28} />,
    description: 'Transform your engineering teams by eradicating burnout and fostering psychological safety.',
    features: ['On-site or remote workshops', 'Team resilience training', 'Leadership conflict resolution', 'Quarterly mental audits'],
    popular: true,
    cta: 'Inquire for Teams'
  },
  {
    id: 'couples',
    title: 'Couples Foundation',
    subtitle: 'Monthly Retainer',
    icon: <Users size={28} />,
    description: 'A structured, ongoing commitment to rebuilding trust, intimacy, and communication.',
    features: ['4x Sessions per month', 'Between-session messaging', 'Conflict de-escalation tools', 'Shared growth mapping'],
    popular: false,
    cta: 'Apply for Retainer'
  }
];

export default function Services() {
  return (
    <section className="relative py-32 px-6 z-10" id="expertise">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <CharcoalReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-white">Ways We Can Work Together</h2>
          </CharcoalReveal>
          <p className="text-chalk text-lg">
            Premium, structured engagement models designed for deep alignment and measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={service.id} className="h-full relative">
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-white text-black text-xs font-bold tracking-widest uppercase py-2 px-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Highest ROI
                </div>
              )}
              
              <AntiGravityContainer className={`h-full p-8 md:p-10 liquid-glass rounded-3xl flex flex-col border transition-all duration-500 group ${service.popular ? 'border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'border-white/10 hover:border-white/20'}`}>
                <div style={{ transform: "translateZ(40px)" }} className="flex-1 flex flex-col">
                  
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-white">{service.title}</h3>
                      <p className="text-xs uppercase tracking-widest text-white/50 mt-1">{service.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-chalk/90 leading-relaxed mb-8 h-20">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-10 flex-1">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-chalk">
                        <Check size={18} className="text-white/60 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a 
                    href="#booking" 
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold tracking-widest uppercase transition-all ${
                      service.popular 
                        ? 'bg-white text-black hover:bg-gray-200' 
                        : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {service.cta} <ArrowRight size={16} />
                  </a>
                  
                </div>
              </AntiGravityContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
