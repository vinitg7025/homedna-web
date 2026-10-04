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

      {/* STORY SECTION - Editorial, typography only */}
      <section className="bg-off-white py-24 px-6 border-b border-stone/15">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-[640px] font-canela text-lg sm:text-[20px] text-charcoal leading-[1.8] space-y-8 text-left">
            <p>
              For more than 40 years, we have been part of thousands of real estate transactions
              and have watched people search for homes across generations.
            </p>

            <p className="text-midnight">We saw a pattern.</p>

            <p>
              Buyers compare bedrooms, locations, prices, amenities and floor plans.
              They become experts at evaluating the property.
              Yet the deeper question often remains unanswered.
            </p>

            <p className="border-l-2 border-gold pl-6 py-1 text-2xl sm:text-[26px] text-midnight leading-snug">
              Will this home work for me and the life I want to live?
            </p>

            <p>
              A home is more than a financial transaction. It is where you sleep, work, recover,
              build relationships and spend much of your life.
            </p>

            <p>We believe serious buyers deserve a structured way to understand that fit.</p>

            <p>
              HomeDNA brings together millennia of Vedic spatial knowledge with personality science
              to help people understand the relationship between{' '}
              <span className="text-midnight font-medium">who they are and where they live</span>.
            </p>

            <p>
              We built HomeDNA to make this guidance accessible before one of life's biggest decisions.
            </p>
          </div>

          {/* Closing statement */}
          <div className="max-w-[720px] mt-16 pt-10 border-t border-stone/15 text-left">
            <p className="font-canela text-3xl sm:text-[36px] font-light text-midnight leading-tight">
              Because finding the right home should begin with understanding the person who will live in it.
            </p>
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
