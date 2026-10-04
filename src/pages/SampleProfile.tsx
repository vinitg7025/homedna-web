import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, MapPin, CheckCircle, Compass, Circle } from 'lucide-react';
import { ActiveView } from '../types';
import { SAMPLE_PROFILE_DATA } from '../data/assessmentData';
import BlueprintSvg from '../components/BlueprintSvg';

interface SampleProfileProps {
  onNavigate: (view: ActiveView) => void;
}

export default function SampleProfile({ onNavigate }: SampleProfileProps) {
  const [selectedAttribute, setSelectedAttribute] = useState<number>(1);

  // Associated image for each attribute based on visual-first guidelines
  const getAttributeImage = (id: number): string => {
    switch (id) {
      case 1: return 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600'; // light study entrance
      case 2: return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600'; // spatial quality height
      case 3: return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600'; // morning daylight
      case 4: return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600'; // floor openness
      case 5: return 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600'; // social seating
      case 6: return 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600'; // private nook
      case 7: return 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=600'; // workspace orientation
      case 8: return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600'; // biophilic materials
      case 9: return 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600'; // elemental zones
      case 10: return 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600'; // room placement
      case 11: return 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600'; // planetary period diagram
      case 12: return 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=600'; // joint planning
      default: return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600';
    }
  };

  const getSectorsForAttribute = (id: number): string => {
    if (id === 1 || id === 10) return 'East';
    if (id === 7 || id === 11) return 'North-East';
    if (id === 9 || id === 6) return 'South-West';
    return '';
  };

  return (
    <div className="w-full pt-16">
      {/* HERO SECTION */}
      <section className="bg-off-white py-20 px-6 border-b border-stone/15">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <h1 className="font-canela text-4xl sm:text-[56px] font-light text-midnight leading-none">
            What your Compatibility Profile looks like.
          </h1>
          <p className="font-canela text-lg text-stone max-w-xl mx-auto">
            A complete sample — all 12 compatibility attributes — for a fictional buyer.
          </p>
        </div>
      </section>

      {/* ARCHETYPE REVEAL MOMENT */}
      <section className="bg-midnight py-24 px-6 text-center text-off-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none blueprint-grid-dark opacity-10" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="space-y-2">
            <span className="font-soehne text-[11px] text-off-white/45 uppercase tracking-[0.15em] font-bold">
              YOUR COMPATIBILITY ARCHETYPE
            </span>
            <h2 className="font-canela text-5xl sm:text-[80px] lg:text-[96px] text-gold font-light tracking-tight leading-none">
              {SAMPLE_PROFILE_DATA.archetypeName}
            </h2>
          </div>

          <p className="font-canela text-xl sm:text-2xl text-off-white/80 max-w-xl mx-auto leading-relaxed">
            {SAMPLE_PROFILE_DATA.archetypeDescription}
          </p>

          <div className="pt-4 border-t border-white/10 max-w-md mx-auto">
            <span className="font-soehne text-xs text-stone uppercase tracking-widest block mb-1">
              ORIENTATION SIGNATURE
            </span>
            <span className="font-soehne text-sm font-medium text-off-white">
              {SAMPLE_PROFILE_DATA.orientationSignature}
            </span>
          </div>
        </div>
      </section>

      {/* 12 ATTRIBUTES INTERACTIVE CATALOG */}
      <section className="bg-off-white py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="font-soehne text-[11px] text-stone uppercase tracking-[0.15em] font-bold block">
              SAMPLE COMPATIBILITY PROFILE: ARJUN MEHTA, SINGAPORE
            </span>
            <p className="font-canela text-lg text-stone italic max-w-md mx-auto">
              Singapore. 38 years old. Product manager. First home purchase with partner.
            </p>
          </div>

          {/* Master 12-attribute list and active card visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-6">
            
            {/* Attribute index menu */}
            <div className="lg:col-span-4 space-y-2">
              <span className="font-soehne text-[10px] text-stone font-bold uppercase tracking-widest block px-3 pb-2 border-b border-stone/10">
                12 COMPATIBILITY ATTRIBUTES
              </span>
              <div className="space-y-1 overflow-y-auto max-h-[500px] pr-2">
                {SAMPLE_PROFILE_DATA.attributes.map((attr) => {
                  // Replace "Alignment" and "Framework" in user-facing cluster names
                  let clusterDisplayName: string = attr.cluster;
                  if (attr.cluster === 'Spatial Alignment') {
                    clusterDisplayName = 'Spatial Compatibility';
                  } else if (attr.cluster === 'Elemental Compatibility') {
                    clusterDisplayName = 'Elemental Compatibility';
                  }
                  
                  const attrDisplayName = attr.name === 'Elemental Zone Alignment' ? 'Elemental Zone Compatibility' : attr.name;

                  return (
                    <button
                      key={attr.id}
                      onClick={() => setSelectedAttribute(attr.id)}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        selectedAttribute === attr.id
                          ? 'bg-midnight text-off-white border-midnight shadow-md'
                          : 'bg-white text-stone border-stone/15 hover:border-gold/50 hover:bg-stone/5'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className={`text-[9px] font-mono tracking-widest uppercase block ${
                          selectedAttribute === attr.id ? 'text-gold' : 'text-stone'
                        }`}>
                          {clusterDisplayName}
                        </span>
                        <span className="font-canela text-base font-normal">
                          {attrDisplayName}
                        </span>
                      </div>
                      <span className="text-xs font-mono opacity-40">#{attr.id.toString().padStart(2, '0')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected active card content and matching image */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Dynamic Attribute Card */}
              {SAMPLE_PROFILE_DATA.attributes.filter(a => a.id === selectedAttribute).map((attr) => {
                const attrDisplayName = attr.name === 'Elemental Zone Alignment' ? 'Elemental Zone Compatibility' : attr.name;
                return (
                  <div 
                    key={attr.id} 
                    className="bg-white border border-stone/15 rounded-xl p-8 flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-stone/10">
                        <span className="font-soehne text-xs text-stone uppercase tracking-widest font-bold">
                          ATTRIBUTE {attr.id}
                        </span>
                        <span className="bg-gold/15 text-gold font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                          CONFIDENCE: {attr.confidence}
                        </span>
                      </div>

                      <div className="space-y-3 text-left">
                        <h3 className="font-canela text-2xl font-light text-midnight">{attrDisplayName}</h3>
                        <p className="font-soehne text-[13px] text-midnight font-bold leading-relaxed">
                          {attr.recommendation}
                        </p>
                        <p className="font-soehne text-xs text-stone leading-relaxed">
                          {attr.basis}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 pt-4 border-t border-stone/10 text-left text-xs text-stone">
                      <div>
                        <span className="font-soehne font-bold text-midnight uppercase tracking-wider block mb-1">LOOK FOR</span>
                        <p className="leading-normal">{attr.toLookFor}</p>
                      </div>
                      <div>
                        <span className="font-soehne font-bold text-midnight uppercase tracking-wider block mb-1">AVOID</span>
                        <p className="leading-normal">{attr.toAvoid}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Dynamic Supporting Architectural Image / Diagram */}
              <div className="rounded-xl overflow-hidden border border-stone/15 relative flex flex-col items-center justify-center min-h-[350px]">
                {selectedAttribute === 11 || selectedAttribute === 9 ? (
                  <div className="w-full h-full">
                    <BlueprintSvg type="interactive" highlightSector={getSectorsForAttribute(selectedAttribute)} className="w-full h-full border-none" />
                  </div>
                ) : (
                  <>
                    <img 
                      src={getAttributeImage(selectedAttribute)} 
                      alt="Pillar space representation" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-midnight/10" />
                    <div className="absolute bottom-4 left-4 bg-midnight/90 text-off-white font-mono text-[9px] py-1 px-3.5 rounded tracking-widest uppercase">
                      SAMPLE SPACE VISUALIZATION
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <section className="bg-midnight py-24 px-6 text-center text-off-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none blueprint-grid-dark opacity-10" />
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="font-canela text-3xl sm:text-[44px] font-light text-off-white">
            Now see yours.
          </h2>
          
          <div>
            <button
              onClick={() => onNavigate('start')}
              className="font-soehne font-medium text-[15px] py-4 px-10 rounded-full cursor-pointer bg-gold text-midnight hover:bg-gold/90 transition-all duration-300 shadow-md inline-flex items-center gap-2"
            >
              Begin My Compatibility Assessment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <span className="font-soehne text-xs text-off-white/40 block">
            15 minutes. Delivered within 24 hours. No credit card required.
          </span>
        </div>
      </section>
    </div>
  );
}
