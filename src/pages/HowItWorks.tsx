import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Circle, Compass, Moon, User, Layout, Shield } from 'lucide-react';
import { ActiveView } from '../types';

interface HowItWorksProps {
  onNavigate: (view: ActiveView) => void;
}

export default function HowItWorks({ onNavigate }: HowItWorksProps) {
  return (
    <div className="w-full pt-16">
      {/* HERO SECTION */}
      <section className="bg-off-white py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h1 className="font-canela text-4xl sm:text-[64px] font-light text-midnight leading-none">
            How it works.
          </h1>
          <p className="font-canela text-xl text-stone max-w-xl mx-auto font-light">
            Three bodies of knowledge. Forty questions. One Compatibility Profile.
          </p>
        </div>
      </section>

      {/* SECTION 1 — THE THREE PILLARS */}
      <section className="bg-parchment py-24 px-6 border-b border-stone/15">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Pillar 1: Vastu Shastra & Vedic Astrology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="font-soehne text-[11px] font-bold text-stone uppercase tracking-widest">
                PILLAR ONE
              </span>
              <h2 className="font-canela text-3xl sm:text-4xl text-midnight font-light">
                Vastu Shastra & Vedic Astrology
              </h2>
              <p className="font-canela text-lg text-stone leading-relaxed font-light">
                Vastu Shastra maps the physical relationships between human beings and the spaces they inhabit.
                This coordinates entrance directions, elemental zones, and spatial orientations.
                It is a detailed spatial intelligence system based on solar movement.
              </p>
              <p className="font-canela text-lg text-stone leading-relaxed font-light">
                Your birth chart acts as a coordinate system.
                This chart guides individual directional and elemental affinities.
                We map this specifically to you and no one else.
              </p>
            </div>
            {/* Image (Threshold) */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-stone/20 relative shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600" 
                alt="Entrance threshold light" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-midnight/5" />
              <div className="absolute bottom-3 right-3 bg-off-white/90 px-2 py-0.5 rounded text-[8px] font-mono text-stone tracking-widest uppercase">
                THRESHOLD STUDY
              </div>
            </div>
          </div>

          {/* Pillar 2: Personality Psychology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="order-last md:order-first">
              {/* Image (Private Space) */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-stone/20 relative shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600" 
                  alt="Quiet sanctuary library seat" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-midnight/5" />
                <div className="absolute bottom-3 right-3 bg-off-white/90 px-2 py-0.5 rounded text-[8px] font-mono text-stone tracking-widest uppercase">
                  PRIVATE SPACE STUDY
                </div>
              </div>
            </div>
            <div className="space-y-6 text-left">
              <span className="font-soehne text-[11px] font-bold text-stone uppercase tracking-widest">
                PILLAR TWO
              </span>
              <h2 className="font-canela text-3xl sm:text-4xl text-midnight font-light">
                Personality Psychology
              </h2>
              <p className="font-canela text-lg text-stone leading-relaxed font-light">
                The Big Five (OCEAN) model is the most rigorously validated personality structure in science.
                Your core introversion, openness, and structure guide how you relate to space.
                This model determines what environments let you rest fully and work productively.
              </p>
              <p className="font-canela text-lg text-stone leading-relaxed font-light">
                We utilize the validated Ten-Item Personality Inventory (TIPI) scale.
                This guarantees maximum accuracy in mapping spatial responses.
              </p>
            </div>
          </div>

          {/* Pillar 3: Neuroarchitecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="font-soehne text-[11px] font-bold text-stone uppercase tracking-widest">
                PILLAR THREE
              </span>
              <h2 className="font-canela text-3xl sm:text-4xl text-midnight font-light">
                Neuroarchitecture
              </h2>
              <p className="font-canela text-lg text-stone leading-relaxed font-light">
                Environmental psychology demonstrates that ceiling heights alter cognitive pathways.
                Natural light directions directly affect physical mood and circadian performance.
                Organic textures measurably lower autonomous physiological stress responses.
              </p>
              <p className="font-canela text-lg text-stone leading-relaxed font-light">
                These are verified biological reactions to physical parameters.
                They are not decorative opinions or trend preferences.
              </p>
            </div>
            {/* Image (Spatial Quality) */}
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-stone/20 relative shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600" 
                alt="Room vertical space" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-midnight/5" />
              <div className="absolute bottom-3 right-3 bg-off-white/90 px-2 py-0.5 rounded text-[8px] font-mono text-stone tracking-widest uppercase">
                SPATIAL QUALITY
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — THE 12 ATTRIBUTES */}
      <section className="bg-off-white py-24 px-6 border-b border-stone/15">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-canela text-3xl sm:text-[44px] font-light text-midnight">
              12 compatibility attributes. Three clusters. One complete picture.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-parchment/40 p-8 border border-stone/15 rounded-xl space-y-6 shadow-sm">
              <span className="font-soehne text-[11px] tracking-wider font-bold text-gold uppercase block">
                SPATIAL COMPATIBILITY
              </span>
              <ul className="font-canela text-lg space-y-3 text-stone">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Entrance Direction</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Ceiling Height</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Natural Light Direction</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Floor Plan Openness</li>
              </ul>
            </div>

            <div className="bg-parchment/40 p-8 border border-stone/15 rounded-xl space-y-6 shadow-sm">
              <span className="font-soehne text-[11px] tracking-wider font-bold text-gold uppercase block">
                PERSONAL RESONANCE
              </span>
              <ul className="font-canela text-lg space-y-3 text-stone">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Social Space Configuration</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Private Retreat Quality</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Workspace Orientation</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Material Preference</li>
              </ul>
            </div>

            <div className="bg-parchment/40 p-8 border border-stone/15 rounded-xl space-y-6 shadow-sm">
              <span className="font-soehne text-[11px] tracking-wider font-bold text-gold uppercase block">
                ELEMENTAL COMPATIBILITY
              </span>
              <ul className="font-canela text-lg space-y-3 text-stone">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Elemental Zone Compatibility</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Vedic Room Placement</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Planetary Period Compatibility</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-gold rounded-full" /> Household Composition Fit</li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="font-canela text-lg text-stone italic">
              Every attribute includes a recommendation, the reasoning behind it, what to look for, and what to avoid.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE PROCESS */}
      <section className="bg-parchment py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16 text-center">
          <h2 className="font-canela text-3xl sm:text-[44px] font-light text-midnight">
            From questions to Compatibility Profile.
          </h2>

          {/* Steps Horizontal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative">
            <div className="space-y-3 p-4 bg-off-white/40 border border-stone/10 rounded-lg relative">
              <div className="w-8 h-8 rounded-full bg-midnight text-off-white flex items-center justify-center font-mono text-xs mx-auto mb-2">1</div>
              <span className="font-soehne text-xs font-bold text-midnight uppercase block">Birth Details</span>
              <p className="font-soehne text-[11px] text-stone">Date, time, and coordinates of your arrival.</p>
            </div>

            <div className="space-y-3 p-4 bg-off-white/40 border border-stone/10 rounded-lg relative">
              <div className="w-8 h-8 rounded-full bg-midnight text-off-white flex items-center justify-center font-mono text-xs mx-auto mb-2">2</div>
              <span className="font-soehne text-xs font-bold text-midnight uppercase block">Personality</span>
              <p className="font-soehne text-[11px] text-stone">TIPI-10 item questionnaire mapping environmental instincts.</p>
            </div>

            <div className="space-y-3 p-4 bg-off-white/40 border border-stone/10 rounded-lg relative">
              <div className="w-8 h-8 rounded-full bg-midnight text-off-white flex items-center justify-center font-mono text-xs mx-auto mb-2">3</div>
              <span className="font-soehne text-xs font-bold text-midnight uppercase block">Lifestyle</span>
              <p className="font-soehne text-[11px] text-stone">30 custom queries on household flow and materials.</p>
            </div>

            <div className="space-y-3 p-4 bg-gold/10 border border-gold/30 rounded-lg relative">
              <div className="w-8 h-8 rounded-full bg-gold text-midnight flex items-center justify-center font-mono text-xs mx-auto mb-2">4</div>
              <span className="font-soehne text-xs font-bold text-midnight uppercase block">Your Profile</span>
              <p className="font-soehne text-[11px] text-stone">Full custom Compatibility Profile delivered to your inbox.</p>
            </div>
          </div>

          <div className="space-y-8 pt-8">
            <p className="font-canela text-lg text-stone max-w-lg mx-auto">
              The full Compatibility Assessment takes about 15 minutes.
              Your Compatibility Profile is generated and delivered by email within 24 hours.
            </p>

            <button
              onClick={() => onNavigate('start')}
              className="font-soehne font-semibold text-[13px] tracking-wider uppercase py-4 px-10 rounded-full cursor-pointer bg-midnight text-off-white hover:bg-gold hover:text-midnight transition-all duration-300 shadow-md inline-flex items-center gap-2"
            >
              Begin My Compatibility Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
