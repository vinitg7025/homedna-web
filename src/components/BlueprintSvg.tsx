import React from 'react';

interface BlueprintSvgProps {
  type: 'evolving' | 'household' | 'interactive' | 'static-sample';
  step?: number;
  highlightSector?: string;
  className?: string;
}

export default function BlueprintSvg({ type, step = 3, highlightSector, className = '' }: BlueprintSvgProps) {
  // SVG size is 300x300 for neat square proportions
  
  if (type === 'evolving') {
    return (
      <div className={`relative aspect-square w-full border border-stone/20 rounded bg-off-white flex items-center justify-center overflow-hidden blueprint-grid-light ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full p-6" fill="none">
          {/* Compass grid lines - always visible */}
          <circle cx="100" cy="100" r="70" className="stroke-stone/15 fill-none stroke-[0.5]" />
          <line x1="100" y1="20" x2="100" y2="180" className="stroke-stone/15 stroke-[0.5]" />
          <line x1="20" y1="100" x2="180" y2="100" className="stroke-stone/15 stroke-[0.5]" />
          <line x1="43" y1="43" x2="157" y2="157" className="stroke-stone/15 stroke-[0.5]" strokeDasharray="2,2" />
          <line x1="157" y1="43" x2="43" y2="157" className="stroke-stone/15 stroke-[0.5]" strokeDasharray="2,2" />

          {/* Compass Directions */}
          <text x="100" y="16" className="fill-stone/40 text-[7px] font-mono font-bold text-center" textAnchor="middle">N</text>
          <text x="100" y="191" className="fill-stone/40 text-[7px] font-mono font-bold text-center" textAnchor="middle">S</text>
          <text x="186" y="102" className="fill-stone/40 text-[7px] font-mono font-bold text-center" textAnchor="middle">E</text>
          <text x="14" y="102" className="fill-stone/40 text-[7px] font-mono font-bold text-center" textAnchor="middle">W</text>

          {/* Step 1: Blank schematic with compass indicators */}
          {step >= 1 && (
            <g className="transition-all duration-700">
              <circle cx="100" cy="100" r="40" className="stroke-stone/30 fill-none stroke-1" />
              <path d="M100 100 L128 72" className="stroke-gold stroke-2 fill-none animate-pulse" />
              <circle cx="128" cy="72" r="3" className="fill-gold" />
            </g>
          )}

          {/* Step 2: Adds room boundaries & light indicators */}
          {step >= 2 && (
            <g className="transition-all duration-700 delay-200">
              <rect x="50" y="50" width="100" height="100" className="stroke-stone/30 fill-none stroke-[0.75]" />
              <path d="M100 100 L100 150 M100 100 L60 60" className="stroke-midnight stroke-[1.25] fill-none" strokeDasharray="2,1" />
              <circle cx="100" cy="150" r="2.5" className="fill-midnight" />
              {/* Light rays */}
              <line x1="100" y1="30" x2="100" y2="170" className="stroke-stone/20 stroke-[0.5]" />
              <line x1="30" y1="100" x2="170" y2="100" className="stroke-stone/20 stroke-[0.5]" />
            </g>
          )}

          {/* Step 3: Complete layout overlay (Workspace, Sanctum, Energy sectors) */}
          {step >= 3 && (
            <g className="transition-all duration-700 delay-500">
              <circle cx="100" cy="100" r="45" className="stroke-gold/50 fill-none stroke-[1]" />
              <path d="M100 60 L140 100 M100 140 L60 100" className="stroke-midnight stroke-[1.5] fill-none" />
              <circle cx="100" cy="100" r="4" className="fill-gold" />
              <rect x="40" y="40" width="120" height="120" className="stroke-gold/60 fill-none stroke-2 pulse-border-gold" />
              {/* Highlight North-East Quadrant */}
              <path d="M100 100 L140 60" className="stroke-gold stroke-2" />
              <text x="145" y="58" className="fill-gold text-[6px] font-mono font-bold" textAnchor="start">SANCTUARY ZONE</text>
            </g>
          )}
        </svg>
      </div>
    );
  }

  if (type === 'household') {
    return (
      <div className={`relative h-64 bg-stone/5 border border-stone/10 rounded-lg flex items-center justify-center p-8 overflow-hidden blueprint-grid-light ${className}`}>
        {/* Dynamic household Venn diagram */}
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Circle A (Buyer A) */}
          <div className="w-40 h-40 rounded-full border border-midnight/30 absolute -translate-x-12 flex flex-col items-center justify-center bg-midnight/[0.02] text-midnight p-4 transition-transform duration-500 hover:-translate-x-16">
            <span className="font-soehne text-[9px] tracking-widest font-bold uppercase text-midnight/40 mb-1">BUYER A</span>
            <span className="font-canela text-xs font-semibold text-center leading-tight">Introvert Sanctuary</span>
            <span className="font-mono text-[7px] text-stone mt-2">South-West Priority</span>
          </div>

          {/* Circle B (Buyer B) */}
          <div className="w-40 h-40 rounded-full border border-gold/40 absolute translate-x-12 flex flex-col items-center justify-center bg-gold/[0.02] text-gold p-4 transition-transform duration-500 hover:translate-x-16">
            <span className="font-soehne text-[9px] tracking-widest font-bold uppercase text-gold/50 mb-1">BUYER B</span>
            <span className="font-canela text-xs font-semibold text-center leading-tight">Social Atrium</span>
            <span className="font-mono text-[7px] text-stone mt-2">East Morning Light</span>
          </div>

          {/* Intersection Label */}
          <div className="absolute z-10 bg-parchment/95 px-3 py-1 border border-stone/30 rounded text-[9px] font-bold text-stone font-mono tracking-widest shadow-sm hover:scale-105 transition-transform">
            SHARED CONVERGENCE
          </div>
        </div>
      </div>
    );
  }

  // default static sample or interactive custom result blueprint
  return (
    <div className={`relative aspect-square w-full border border-stone/15 rounded-xl bg-midnight/95 flex items-center justify-center overflow-hidden blueprint-grid-dark ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none">
        {/* Compass Ring */}
        <circle cx="100" cy="100" r="85" className="stroke-white/10 fill-none stroke-[0.5]" />
        <circle cx="100" cy="100" r="60" className="stroke-white/5 fill-none stroke-[0.5]" />
        
        {/* Cardinal Axis */}
        <line x1="100" y1="10" x2="100" y2="190" className="stroke-white/10 stroke-[0.5]" />
        <line x1="10" y1="100" x2="190" y2="100" className="stroke-white/10 stroke-[0.5]" />
        <line x1="36" y1="36" x2="164" y2="164" className="stroke-white/5 stroke-[0.5]" strokeDasharray="1,2" />
        <line x1="164" y1="36" x2="36" y2="164" className="stroke-white/5 stroke-[0.5]" strokeDasharray="1,2" />

        {/* Labels */}
        <text x="100" y="8" className="fill-white/40 text-[6px] font-mono font-bold text-center" textAnchor="middle">NORTH (AIR)</text>
        <text x="100" y="198" className="fill-white/40 text-[6px] font-mono font-bold text-center" textAnchor="middle">SOUTH (EARTH)</text>
        <text x="194" y="102" className="fill-white/40 text-[6px] font-mono font-bold" textAnchor="end">EAST (LIGHT)</text>
        <text x="6" y="102" className="fill-white/40 text-[6px] font-mono font-bold" textAnchor="start">WEST (WATER)</text>

        {/* Dynamic highlight sectors based on highlighted sector */}
        {highlightSector === 'North-East' && (
          <path d="M100 100 L100 40 A60 60 0 0 1 160 100 Z" className="fill-gold/10 stroke-gold stroke-[0.75]" />
        )}
        {highlightSector === 'South-West' && (
          <path d="M100 100 L40 100 A60 60 0 0 0 100 160 Z" className="fill-gold/10 stroke-gold stroke-[0.75]" />
        )}
        {highlightSector === 'East' && (
          <path d="M100 100 L142.4 57.6 A60 60 0 0 1 142.4 142.4 Z" className="fill-gold/10 stroke-gold stroke-[0.75]" />
        )}

        {/* Room Schematic Drawing */}
        <rect x="55" y="55" width="90" height="90" className="stroke-white/20 fill-none stroke-[0.75]" />
        <line x1="100" y1="55" x2="100" y2="145" className="stroke-white/10 stroke-[0.5]" />
        <line x1="55" y1="100" x2="145" y2="100" className="stroke-white/10 stroke-[0.5]" />

        {/* Room Labels inside the grid */}
        <text x="77" y="77" className="fill-white/20 text-[5px] font-mono" textAnchor="middle">STUDY</text>
        <text x="122" y="77" className="fill-white/20 text-[5px] font-mono" textAnchor="middle">KITCHEN</text>
        <text x="77" y="122" className="fill-white/20 text-[5px] font-mono" textAnchor="middle">MASTER SUITE</text>
        <text x="122" y="122" className="fill-white/20 text-[5px] font-mono" textAnchor="middle">LIVING</text>

        {/* Golden Ratio Spiral or Compass Ray */}
        <path d="M100 100 C120 100, 130 115, 125 125 C115 135, 85 125, 80 100 C75 75, 110 60, 130 80 C150 100, 140 140, 100 150 C60 160, 40 110, 60 70" className="stroke-gold/20 stroke-[0.5] fill-none" />
        
        {/* Dynamic markers based on high values */}
        <g>
          {/* East morning solar light vector */}
          <line x1="190" y1="100" x2="115" y2="100" className="stroke-gold stroke-1" strokeDasharray="3,1" />
          <polygon points="115,100 120,98 120,102" className="fill-gold" />
          <circle cx="190" cy="100" r="1.5" className="fill-gold" />
        </g>
        
        <circle cx="100" cy="100" r="3" className="fill-gold" />
        <circle cx="100" cy="100" r="5" className="stroke-gold/60 stroke-[0.5]" />
      </svg>
    </div>
  );
}
