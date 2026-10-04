import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Users, Check, AlertCircle, Radar, Layers } from 'lucide-react';
import { ActiveView, AssessmentAnswers } from '../types';
import BlueprintSvg from '../components/BlueprintSvg';

interface HomeProps {
  onNavigate: (view: ActiveView) => void;
  answers: AssessmentAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<AssessmentAnswers>>;
}

export default function Home({ onNavigate, answers, setAnswers }: HomeProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('start');
  };

  // Chapter 1 scroll opacity effect for editorial background image
  const bgOpacity = Math.min(0.08, scrollY / 1000);

  return (
    <div className="w-full">
      {/* CHAPTER 1 — DISCOVER */}
      <section 
        id="chapter-discover" 
        className="bg-midnight min-h-[95vh] flex flex-col justify-center relative overflow-hidden px-6 pt-16"
      >
        {/* Background visual elements */}
        <div className="absolute inset-0 pointer-events-none blueprint-grid-dark opacity-10" />
        
        {/* Fading editorial background image (Light Study) */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200')",
            opacity: bgOpacity 
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-12 z-10 py-16">
          <div className="space-y-6">
            <h1 className="font-canela font-light text-4xl sm:text-[72px] lg:text-[88px] text-off-white text-center tracking-[-0.02em] leading-[1.15] max-w-4xl mx-auto">
              Before you fall in love with a house, discover your HomeDNA.
            </h1>
            <p className="font-canela font-normal text-lg sm:text-[22px] lg:text-[26px] text-off-white/70 text-center leading-relaxed max-w-2xl mx-auto">
              Know your Home Compatibility first.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              id="hero-cta"
              onClick={() => onNavigate('start')}
              className="font-soehne font-medium text-[15px] py-4 px-10 rounded-full cursor-pointer bg-gold text-midnight hover:bg-gold/90 transition-all duration-300 shadow-lg flex items-center gap-2 group hover:scale-[1.02]"
            >
              Discover My HomeDNA
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <span className="font-soehne text-[13px] text-off-white/45">
              Takes about 15 minutes.
            </span>
          </div>
        </div>
      </section>

      {/* CHAPTER 2 — UNDERSTAND */}
      <section id="chapter-understand" className="bg-off-white py-24 px-6 border-b border-stone/15">
        <div className="max-w-4xl mx-auto text-center space-y-20">
          
          {/* Large belief statements displayed sequentially */}
          <div className="space-y-16 py-8">
            <p className="font-canela text-2xl sm:text-3xl lg:text-[34px] text-charcoal max-w-2xl mx-auto leading-relaxed">
              Some homes feel right the moment you walk in. Others never do — no matter how long you live there.
            </p>
            <p className="font-canela text-2xl sm:text-3xl lg:text-[34px] text-charcoal max-w-2xl mx-auto leading-relaxed">
              A beautiful house is not always the right house.
            </p>
            <p className="font-canela text-2xl sm:text-3xl lg:text-[34px] text-charcoal max-w-2xl mx-auto leading-relaxed">
              The same apartment feels energizing to one person and draining to another.
            </p>
          </div>

          {/* Double photograph comparison */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-2">
                <div className="aspect-[4/3] bg-stone/5 rounded-lg flex items-center justify-center border border-stone/20 relative overflow-hidden shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" 
                    alt="Space perspective Family A" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 blueprint-grid-light opacity-30" />
                  <span className="absolute bottom-3 left-3 bg-midnight/90 text-off-white font-mono text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">ACTIVE PROFILE</span>
                </div>
                <span className="font-soehne text-xs text-stone tracking-wider block text-left uppercase">FAMILY A</span>
              </div>
              <div className="space-y-2">
                <div className="aspect-[4/3] bg-stone/5 rounded-lg flex items-center justify-center border border-stone/20 relative overflow-hidden shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" 
                    alt="Space perspective Family B" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-40 grayscale"
                  />
                  <div className="absolute inset-0 blueprint-grid-light opacity-30" />
                  <span className="absolute bottom-3 left-3 bg-stone/90 text-off-white font-mono text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">CONFLICTED PROFILE</span>
                </div>
                <span className="font-soehne text-xs text-stone tracking-wider block text-left uppercase">FAMILY B</span>
              </div>
            </div>
            <p className="font-canela text-xl sm:text-2xl text-midnight font-normal pt-4">
              Same home. Two families. Two completely different experiences.
            </p>
          </div>

          {/* Regret statistic */}
          <div className="py-8">
            <span className="font-canela text-[120px] leading-none font-thin text-midnight block">82%</span>
            <span className="font-soehne text-sm text-stone tracking-wider uppercase block mt-2">
              of home buyers report post-purchase regret.
            </span>
          </div>

          {/* Reveal line with thin gold rule above */}
          <div className="pt-12 border-t border-gold/40 max-w-[560px] mx-auto">
            <p className="font-canela text-2xl sm:text-[32px] text-midnight font-normal leading-tight">
              There is one filter almost every buyer overlooks: compatibility.
            </p>
          </div>

          {/* Category definition blueprint contrast */}
          <div className="pt-16 space-y-6 max-w-3xl mx-auto">
            <span className="font-soehne text-[11px] text-stone tracking-[0.12em] uppercase font-bold block">
              A NEW WAY TO BUY A HOME
            </span>
            
            <div className="border border-stone/20 rounded-xl overflow-hidden shadow-sm font-soehne text-xs text-left bg-white">
              <div className="grid grid-cols-2 bg-stone/5 border-b border-stone/15 font-bold uppercase tracking-wider text-stone p-4">
                <div>UNTIL NOW, YOU SEARCHED BY</div>
                <div className="text-midnight">NOW, START WITH COMPATIBILITY</div>
              </div>
              <div className="grid grid-cols-2 p-6 gap-6">
                <div className="space-y-3 text-stone font-medium">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-stone" /> Price</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-stone" /> Location</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-stone" /> Bedrooms</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-stone" /> Amenities</div>
                </div>
                <div className="space-y-3 text-midnight font-semibold">
                  <div className="flex items-center gap-2 text-gold"><div className="w-1.5 h-1.5 rounded-full bg-gold" /> Compatibility First</div>
                  <div className="flex items-center gap-2 text-midnight/60"><div className="w-1.5 h-1.5 rounded-full bg-midnight/35" /> Price</div>
                  <div className="flex items-center gap-2 text-midnight/60"><div className="w-1.5 h-1.5 rounded-full bg-midnight/35" /> Location</div>
                  <div className="flex items-center gap-2 text-midnight/60"><div className="w-1.5 h-1.5 rounded-full bg-midnight/35" /> Bedrooms</div>
                  <div className="flex items-center gap-2 text-midnight/60"><div className="w-1.5 h-1.5 rounded-full bg-midnight/35" /> Amenities</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3 — REVEAL */}
      <section id="chapter-reveal" className="bg-parchment py-24 px-6 border-b border-stone/15">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="font-canela text-3xl sm:text-[48px] lg:text-[60px] font-light text-midnight leading-tight">
              Three bodies of knowledge. One Compatibility Profile.
            </h2>
          </div>

          {/* Full-width editorial spatial quality photograph */}
          <div className="w-full aspect-[21/9] rounded-xl overflow-hidden border border-stone/25 relative shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200" 
              alt="Architectural space defined by height and concrete" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent" />
            <div className="absolute bottom-4 right-4 bg-off-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-mono text-stone font-bold tracking-widest uppercase">
              IMAGE: SPATIAL QUALITY
            </div>
          </div>

          {/* Three pillar cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="bg-off-white/80 border border-midnight/10 rounded-xl p-8 space-y-6 flex flex-col justify-between shadow-sm hover:border-gold/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-midnight/5 flex items-center justify-center text-midnight">
                  <Compass className="w-5 h-5 stroke-[1]" />
                </div>
                <h3 className="font-canela text-[28px] sm:text-[32px] font-normal text-midnight leading-tight">
                  Vastu Shastra & Vedic Astrology
                </h3>
              </div>
              <p className="font-soehne text-[13px] text-stone leading-relaxed">
                5,000 years of Vedic tradition — your birth chart and spatial orientation combined into a single compatibility reading. Astrology as a precision instrument, not a prediction.
              </p>
            </div>

            <div className="bg-off-white/80 border border-midnight/10 rounded-xl p-8 space-y-6 flex flex-col justify-between shadow-sm hover:border-gold/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-midnight/5 flex items-center justify-center text-midnight">
                  <Radar className="w-5 h-5 stroke-[1]" />
                </div>
                <h3 className="font-canela text-[28px] sm:text-[32px] font-normal text-midnight leading-tight">
                  Personality Psychology
                </h3>
              </div>
              <p className="font-soehne text-[13px] text-stone leading-relaxed">
                The Big Five model — the most validated personality framework in science — measures exactly how you relate to space.
              </p>
            </div>

            <div className="bg-off-white/80 border border-midnight/10 rounded-xl p-8 space-y-6 flex flex-col justify-between shadow-sm hover:border-gold/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-midnight/5 flex items-center justify-center text-midnight">
                  <Layers className="w-5 h-5 stroke-[1]" />
                </div>
                <h3 className="font-canela text-[28px] sm:text-[32px] font-normal text-midnight leading-tight">
                  Neuroarchitecture
                </h3>
              </div>
              <p className="font-soehne text-[13px] text-stone leading-relaxed">
                The science of how physical space — ceiling height, light, materiality — measurably changes cognition and wellbeing.
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <p className="font-soehne text-sm text-midnight font-semibold tracking-wide uppercase">
              Combined into one Compatibility Profile.
            </p>
          </div>

          {/* 12 attributes blueprint diagram mapping */}
          <div className="pt-12 border-t border-stone/15 space-y-8">
            <div className="text-center">
              <span className="font-soehne text-[11px] text-stone uppercase tracking-[0.15em] font-bold">
                YOUR COMPATIBILITY PROFILE — 12 ATTRIBUTES
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-stone/20 bg-off-white/50 p-6 rounded-lg space-y-4">
                <span className="font-mono text-[9px] text-gold uppercase tracking-widest font-bold block">SPATIAL COMPATIBILITY</span>
                <ul className="space-y-2 text-sm font-soehne text-stone">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Entrance Direction</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Ceiling Height</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Natural Light Direction</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Floor Plan Openness</li>
                </ul>
              </div>

              <div className="border border-stone/20 bg-off-white/50 p-6 rounded-lg space-y-4">
                <span className="font-mono text-[9px] text-gold uppercase tracking-widest font-bold block">PERSONAL RESONANCE</span>
                <ul className="space-y-2 text-sm font-soehne text-stone">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Social Space Configuration</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Private Retreat Quality</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Workspace Orientation</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Material Preference</li>
                </ul>
              </div>

              <div className="border border-stone/20 bg-off-white/50 p-6 rounded-lg space-y-4">
                <span className="font-mono text-[9px] text-gold uppercase tracking-widest font-bold block">ELEMENTAL COMPATIBILITY</span>
                <ul className="space-y-2 text-sm font-soehne text-stone">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Elemental Zone Alignment</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Vedic Room Placement</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Planetary Period Compatibility</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-gold rounded-full" /> Household Composition Fit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 4 — MATCH */}
      <section id="chapter-match" className="bg-off-white py-24 px-6 border-b border-stone/15 relative overflow-hidden">
        {/* Soft background image at 12% opacity (Threshold) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.12] bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200')" }}
        />

        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-canela text-2xl sm:text-[36px] text-midnight italic leading-normal font-light">
              "Your morning energy is predicted by your entrance direction, not your coffee."
            </p>
          </div>

          {/* Three citation cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-off-white/95 border border-stone/15 rounded-xl p-8 space-y-4 shadow-sm">
              <span className="font-soehne text-[10px] tracking-wider text-stone uppercase block font-bold">
                ENVIRONMENTAL PSYCHOLOGY
              </span>
              <p className="font-canela text-xl text-midnight font-semibold">+26% performance</p>
              <p className="font-soehne text-xs text-stone leading-relaxed">
                Measured difference between daylit and windowless environments.
              </p>
            </div>

            <div className="bg-off-white/95 border border-stone/15 rounded-xl p-8 space-y-4 shadow-sm">
              <span className="font-soehne text-[10px] tracking-wider text-stone uppercase block font-bold">
                COGNITIVE SCIENCE
              </span>
              <p className="font-canela text-xl text-midnight font-semibold">Ceiling height changes cognition</p>
              <p className="font-soehne text-xs text-stone leading-relaxed">
                High ceilings activate abstract thinking; low ceilings focus attention.
              </p>
            </div>

            <div className="bg-off-white/95 border border-stone/15 rounded-xl p-8 space-y-4 shadow-sm">
              <span className="font-soehne text-[10px] tracking-wider text-stone uppercase block font-bold">
                PERSONALITY SCIENCE
              </span>
              <p className="font-canela text-xl text-midnight font-semibold">Personality predicts space</p>
              <p className="font-soehne text-xs text-stone leading-relaxed">
                Big Five personality traits measurably predict how a person arranges and responds to their living environment.
              </p>
            </div>
          </div>

          {/* Sample attribute card side-by-side with photo */}
          <div className="space-y-4 pt-8">
            <span className="font-soehne text-[11px] text-stone tracking-widest font-bold block uppercase text-center">
              SAMPLE COMPATIBILITY ATTRIBUTE
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Fully rendered attribute card */}
              <div className="bg-white border border-stone/15 p-8 rounded-xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-stone/10">
                    <span className="font-soehne text-xs text-stone uppercase tracking-widest font-bold">ATTRIBUTE 1</span>
                    <span className="bg-gold/10 text-gold font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                      Confidence: Absolute
                    </span>
                  </div>
                  <div className="space-y-2 text-left">
                    <h3 className="font-canela text-2xl font-light text-midnight">Entrance Direction</h3>
                    <p className="font-soehne text-[13px] text-charcoal font-bold leading-relaxed">
                      Recommendation: South-West, South, or West primary entrance is highly contraindicated. Target East or North-East entrances only.
                    </p>
                    <p className="font-soehne text-xs text-stone leading-relaxed">
                      Basis: Guided by Arjun's strong Virgo solar orientation and high OCEAN introversion scores. A non-compatible entrance triggers cognitive depletion during transitional periods.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone/10 text-left text-[11px]">
                  <div>
                    <span className="font-soehne font-bold text-midnight uppercase tracking-wider block mb-1">LOOK FOR</span>
                    <span className="text-stone leading-normal">Entrance doors facing between 0° (North) and 90° (East).</span>
                  </div>
                  <div>
                    <span className="font-soehne font-bold text-midnight uppercase tracking-wider block mb-1">AVOID</span>
                    <span className="text-stone leading-normal">Main entry doors opening to the South or South-West sectors.</span>
                  </div>
                </div>
              </div>

              {/* Matching image */}
              <div className="rounded-xl overflow-hidden border border-stone/15 relative min-h-[300px]">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" 
                  alt="Entrance showing light angle" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-midnight/10" />
                <div className="absolute bottom-4 left-4 bg-midnight/90 text-off-white font-mono text-[10px] py-1 px-3.5 rounded tracking-widest uppercase">
                  LIGHT STUDY: EAST THRESHOLD
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 5 — CHOOSE */}
      <section id="chapter-choose" className="bg-parchment py-24 px-6 border-b border-stone/15">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="font-canela text-3xl sm:text-[56px] lg:text-[72px] font-light text-midnight leading-tight">
            15 minutes. 40 questions. One Compatibility Profile, yours alone.
          </h2>

          {/* Side-by-side evolving blueprint states */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <BlueprintSvg type="evolving" step={1} />
              <span className="font-soehne text-xs text-stone uppercase tracking-wider font-semibold">
                "Answer 40 questions"
              </span>
            </div>

            <div className="space-y-4">
              <BlueprintSvg type="evolving" step={2} />
              <span className="font-soehne text-xs text-stone uppercase tracking-wider font-semibold">
                "Your Compatibility Blueprint evolves"
              </span>
            </div>

            <div className="space-y-4">
              <BlueprintSvg type="evolving" step={3} />
              <span className="font-soehne text-xs text-stone uppercase tracking-wider font-semibold">
                "Your Compatibility Archetype arrives"
              </span>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-8 pt-6">
            <p className="font-canela text-xl text-midnight font-normal leading-relaxed">
              You'll receive your Compatibility Profile — and your Compatibility Archetype, the two-word identity that describes exactly the kind of home you're compatible with.
            </p>

            <button
              id="experience-cta"
              onClick={() => onNavigate('start')}
              className="font-soehne font-medium text-[15px] py-4 px-10 rounded-full cursor-pointer bg-midnight text-off-white hover:bg-gold hover:text-midnight transition-all duration-300 shadow-md inline-flex items-center gap-2 group"
            >
              Begin My Compatibility Assessment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      {/* CHAPTER 6 — SEARCH */}
      <section id="chapter-search" className="bg-off-white py-24 px-6 border-b border-stone/15">
        <div className="max-w-5xl mx-auto text-center space-y-16">
          <h2 className="font-canela text-3xl sm:text-[48px] lg:text-[60px] font-light text-midnight leading-tight max-w-3xl mx-auto">
            When a home needs to be compatible for more than one person.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            {/* Collective space photograph */}
            <div className="rounded-xl overflow-hidden border border-stone/15 relative min-h-[280px]">
              <img 
                src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=600" 
                alt="Two people planning with blueprints" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-midnight/5" />
              <div className="absolute bottom-4 left-4 bg-off-white/95 px-3 py-1 rounded text-[10px] font-mono text-stone font-bold tracking-widest uppercase">
                IMAGE: COLLECTIVE SPACE
              </div>
            </div>

            {/* Overlapping household diagrams */}
            <BlueprintSvg type="household" />
          </div>

          <p className="font-canela text-lg sm:text-xl text-stone max-w-xl mx-auto text-center leading-relaxed">
            HomeDNA generates a Compatibility Profile for every decision-maker — and maps exactly where you converge and where you diverge.
          </p>
        </div>
      </section>

      {/* CHAPTER 7 — BEGIN */}
      <section id="chapter-begin" className="bg-midnight py-28 px-6 text-center relative overflow-hidden text-off-white">
        <div className="absolute inset-0 pointer-events-none blueprint-grid-dark opacity-10" />
        <div className="relative max-w-4xl mx-auto space-y-12 z-10">
          
          <p className="font-canela font-light text-2xl sm:text-[40px] lg:text-[52px] leading-tight max-w-3xl mx-auto text-center">
            Before you search for a home, discover the home that was always meant to be yours.
          </p>

          <h2 className="font-soehne text-xs text-off-white/65 uppercase tracking-[0.15em] font-bold">
            KNOW YOUR COMPATIBILITY BEFORE YOU BEGIN YOUR SEARCH
          </h2>

          {/* Minimalist form */}
          <form onSubmit={handleFormSubmit} className="max-w-md mx-auto space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <input 
                type="text" 
                placeholder="Your name" 
                required
                value={answers.firstName}
                onChange={e => setAnswers({...answers, firstName: e.target.value})}
                className="w-full bg-midnight border border-white/20 rounded p-3.5 text-sm font-soehne text-off-white placeholder-stone focus:outline-none focus:border-gold transition-colors"
              />
              <input 
                type="email" 
                placeholder="your@email.com" 
                required
                value={answers.email}
                onChange={e => setAnswers({...answers, email: e.target.value})}
                className="w-full bg-midnight border border-white/20 rounded p-3.5 text-sm font-soehne text-off-white placeholder-stone focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-midnight font-soehne text-xs tracking-widest uppercase font-bold py-4 rounded cursor-pointer transition-all duration-300 shadow-md inline-flex items-center justify-center gap-1.5"
            >
              Discover My HomeDNA <ArrowRight className="w-3 h-3" />
            </button>
          </form>

          <span className="font-soehne text-xs text-off-white/40 block">
            Takes about 15 minutes. Your data generates your Compatibility Profile and nothing else. No credit card required.
          </span>
        </div>
      </section>
    </div>
  );
}
