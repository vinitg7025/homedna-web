import React from 'react';
import { motion } from 'motion/react';
import { ActiveView } from '../types';

export default function About() {
  return (
    <div className="w-full pt-16">
      {/* HERO SECTION */}
      <section className="bg-off-white py-20 px-6 border-b border-stone/15">
        <div className="max-w-4xl mx-auto space-y-4 text-left">
          <span className="font-soehne text-[11px] font-bold text-gold uppercase tracking-widest block">
            OUR STORY
          </span>
          <h1 className="font-canela text-5xl sm:text-[60px] font-light text-midnight leading-none">
            Why we built this.
          </h1>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="bg-off-white py-24 px-6 border-b border-stone/15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Founder portrait - Editorial, B&W */}
          <div className="aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden border border-stone/25 shadow-md relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600" 
              alt="Vikram Nair, Founder of HomeDNA" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale contrast-115"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/20 to-transparent" />
            <div className="absolute bottom-3 left-3 bg-off-white/95 px-2.5 py-0.5 rounded text-[8px] font-mono text-stone tracking-widest uppercase">
              VIKRAM NAIR, FOUNDER
            </div>
          </div>

          {/* Founder Statement */}
          <div className="space-y-6 text-left">
            <span className="font-soehne text-[10px] text-stone font-bold uppercase tracking-widest block">
              LETTER FROM THE FOUNDER
            </span>
            
            <div className="font-canela text-lg sm:text-[20px] text-charcoal leading-relaxed space-y-6">
              <p>
                I watched hundreds of friends search for apartments.
                They focused on bedrooms and price.
                Yet, they ended up feeling drained or unfocused in their new space.
              </p>
              <p>
                The market treats homes as simple financial transactions.
                But a home is where your life unfolds.
                I believe serious buyers deserve structured spatial guidance.
              </p>
              <p>
                We built HomeDNA to combine millennia of Vedic logic with personality science.
                It is designed to find where you truly belong.
              </p>
            </div>

            <div className="pt-6 border-t border-stone/15">
              <h4 className="font-soehne text-sm font-semibold text-midnight">Vikram Nair</h4>
              <p className="font-soehne text-xs text-stone">Founder, HomeDNA</p>
            </div>
          </div>

        </div>
      </section>

      {/* BELIEF SECTION */}
      <section className="bg-parchment py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-left">
            <span className="font-soehne text-[11px] font-bold text-stone uppercase tracking-widest block">
              OUR BELIEFS
            </span>
            <h2 className="font-canela text-3xl sm:text-[40px] text-midnight font-light mt-1">
              What we believe.
            </h2>
          </div>

          <div className="space-y-12">
            <div className="space-y-3">
              <span className="font-mono text-xs text-gold font-bold">01</span>
              <p className="font-canela text-xl sm:text-[22px] text-midnight leading-relaxed font-normal">
                A home purchase is not a financial decision with emotional side effects.
                It is a life decision with financial implications.
                The industry treats it backwards.
              </p>
            </div>

            <div className="space-y-3 border-t border-stone/15 pt-8">
              <span className="font-mono text-xs text-gold font-bold">02</span>
              <p className="font-canela text-xl sm:text-[22px] text-midnight leading-relaxed font-normal">
                The knowledge to match a person to the right home has existed for millennia across three independent traditions.
                It has never been made accessible to the individual buyer at scale.
                That is the gap HomeDNA fills.
              </p>
            </div>

            <div className="space-y-3 border-t border-stone/15 pt-8">
              <span className="font-mono text-xs text-gold font-bold">03</span>
              <p className="font-canela text-xl sm:text-[22px] text-midnight leading-relaxed font-normal">
                Structured guidance before a major decision should not require expensive consultants or insider knowledge.
                It should be available to any serious buyer, anywhere, for the price of a meal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
