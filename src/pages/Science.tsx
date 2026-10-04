import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, Search, BookOpen, AlertCircle } from 'lucide-react';
import { CITATIONS } from '../data/assessmentData';

export default function Science() {
  return (
    <div className="w-full pt-16">
      {/* HERO SECTION */}
      <section className="bg-midnight py-20 px-6 text-center text-off-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none blueprint-grid-dark opacity-10" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="font-canela text-3xl sm:text-[60px] font-light leading-tight">
            Vastu Shastra & Vedic Astrology. Personality Psychology. Neuroarchitecture.
          </h1>
          <p className="font-canela text-lg sm:text-[20px] text-off-white/65 max-w-xl mx-auto">
            Three independent disciplines. One Compatibility Profile.
          </p>
        </div>
      </section>

      {/* RESEARCH CITATIONS GRID */}
      <section className="bg-off-white py-24 px-6 border-b border-stone/15">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-left space-y-2">
            <h2 className="font-canela text-4xl font-light text-midnight">The research.</h2>
            <p className="font-soehne text-xs text-stone max-w-md leading-relaxed">
              Below are peer-reviewed research findings on spatial and personality science.
              Vedic traditions are documented separately below as architectural disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {CITATIONS.map((cit, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-stone/15 rounded-xl p-8 space-y-4 flex flex-col justify-between shadow-sm hover:border-gold/30 transition-colors"
              >
                <div className="space-y-3">
                  <span className="font-soehne text-[10px] tracking-wider text-stone uppercase block font-bold">
                    {cit.source} · {cit.year}
                  </span>
                  <h3 className="font-canela text-xl text-midnight font-semibold leading-snug">
                    {cit.finding}
                  </h3>
                  <p className="font-soehne text-xs text-stone leading-relaxed">
                    {cit.detail}
                  </p>
                </div>
                <div className="pt-4 border-t border-stone/10 font-soehne text-xs text-midnight font-medium">
                  Implication: {cit.implication}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VASTU SHASTRA SECTION */}
      <section className="bg-parchment py-24 px-6 border-b border-stone/15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <h2 className="font-canela text-3xl sm:text-[44px] text-midnight font-light">
              On Vastu Shastra.
            </h2>
            
            <p className="font-canela text-lg text-stone leading-relaxed">
              Vastu Shastra maps the relationship between human beings and the spaces they inhabit.
              This coordinates entrance directions, elemental zones, and room orientations.
              It is a 5,000-year-old spatial intelligence system developed across the subcontinent.
            </p>

            <p className="font-canela text-lg text-stone leading-relaxed">
              Most Vastu advice is generic rules applied to any home.
              HomeDNA uses it differently.
              Every Vastu recommendation in your Compatibility Profile is specific to you.
            </p>

            <p className="font-canela text-lg text-stone leading-relaxed">
              Recommendations are derived from your birth chart and planetary positions.
              Generic Vastu tells you which direction a kitchen should face.
              HomeDNA tells you which direction your kitchen should face.
            </p>
          </div>

          {/* Compass layout overlay on threshold image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone/25 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600" 
              alt="Threshold entrance study" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Visual overlay: transparent blue compass lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-40">
                <circle cx="50" cy="50" r="40" className="stroke-gold stroke-2 fill-none" />
                <line x1="50" y1="10" x2="50" y2="90" className="stroke-gold stroke-[0.5]" />
                <line x1="10" y1="50" x2="90" y2="50" className="stroke-gold stroke-[0.5]" />
                {/* Highlight Northeast */}
                <path d="M50 50 L78 22" className="stroke-gold stroke-2" />
                <text x="80" y="22" className="fill-gold text-[6px] font-mono font-bold">NE</text>
              </svg>
            </div>
            <div className="absolute bottom-3 left-3 bg-midnight/90 text-off-white font-mono text-[9px] py-0.5 px-2 rounded">
              VASTU ORIENTATION RECORD
            </div>
          </div>
        </div>
      </section>

      {/* VEDIC ASTROLOGY SECTION */}
      <section className="bg-off-white py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          
          {/* Abstract architectural and birth chart overlay */}
          <div className="relative w-full h-[35vh] bg-midnight border border-white/10 rounded-xl overflow-hidden blueprint-grid-dark flex items-center justify-center p-8">
            <svg viewBox="0 0 200 100" className="w-full h-full opacity-60">
              {/* Floor plan blueprint */}
              <rect x="20" y="10" width="160" height="80" className="stroke-white/15 stroke-[0.5] fill-none" />
              <line x1="60" y1="10" x2="60" y2="90" className="stroke-white/15 stroke-[0.5]" />
              <line x1="120" y1="10" x2="120" y2="90" className="stroke-white/15 stroke-[0.5]" />
              
              {/* Astro Wheel centered */}
              <circle cx="100" cy="50" r="35" className="stroke-gold/50 stroke-1 fill-none" />
              <circle cx="100" cy="50" r="25" className="stroke-gold/30 stroke-[0.5] fill-none" />
              {/* Star points */}
              <path d="M100 15 L100 85 M65 50 L135 50" className="stroke-gold/45 stroke-[0.5]" strokeDasharray="1,1" />
              <polygon points="100,20 102,28 98,28" className="fill-gold" />
            </svg>
            <div className="absolute top-4 left-4 bg-gold/10 text-gold font-mono text-[9px] py-0.5 px-2 rounded">
              JYOTIRVASTU SYSTEM INTERPRETATION
            </div>
          </div>

          <div className="space-y-6 text-left max-w-2xl mx-auto">
            <h2 className="font-canela text-3xl sm:text-[44px] text-midnight font-light text-center">
              On Vedic astrology.
            </h2>
            
            <p className="font-canela text-lg text-stone leading-relaxed">
              Vedic astrology — Jyotish — has been studied and refined for over 5,000 years.
              Hundreds of millions of people consult their birth chart before major life decisions.
              HomeDNA uses it as a precision instrument.
            </p>

            <p className="font-canela text-lg text-stone leading-relaxed">
              Your birth chart is not consulted for predictions.
              It is used as a coordinate system to map directional affinities.
              Combined with Vastu Shastra, your chart determines spatial recommendations.
            </p>

            <p className="font-canela text-lg text-stone leading-relaxed">
              This is the methodology of Jyotirvastu — the integration of Vedic astrology with Vastu.
              It is what separates a HomeDNA Compatibility Profile from generic advice.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
