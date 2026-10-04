import React from 'react';
import { ActiveView } from '../types';

interface FooterProps {
  onNavigate: (view: ActiveView) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-midnight text-off-white/80 border-t border-white/10 py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none blueprint-grid-dark opacity-5" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="space-y-4">
          <button 
            id="footer-logo"
            onClick={() => onNavigate('home')} 
            aria-label="HomeDNA — home"
            className="cursor-pointer block focus:outline-none"
          >
            <img src={`${import.meta.env.BASE_URL}brand/logo-horizontal-white.png`} alt="HomeDNA" width={872} height={192} className="h-11 w-auto" />
          </button>
          <p className="font-soehne text-xs text-off-white/50 max-w-[200px] leading-relaxed">
            First-of-its-kind spatial compatibility mapping. Know your home energy before you start looking.
          </p>
        </div>

        {/* Explore Links */}
        <div className="space-y-4">
          <h4 className="font-soehne text-xs font-semibold tracking-wider text-gold uppercase">EXPLORE</h4>
          <ul className="space-y-2 text-sm font-soehne text-off-white/60">
            <li>
              <button onClick={() => onNavigate('how-it-works')} className="hover:text-gold transition-colors focus:outline-none cursor-pointer">
                How It Works
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('science')} className="hover:text-gold transition-colors focus:outline-none cursor-pointer">
                The Science
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('sample-profile')} className="hover:text-gold transition-colors focus:outline-none cursor-pointer">
                Compatibility Profile
              </button>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="space-y-4">
          <h4 className="font-soehne text-xs font-semibold tracking-wider text-gold uppercase">COMPANY</h4>
          <ul className="space-y-2 text-sm font-soehne text-off-white/60">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-gold transition-colors focus:outline-none cursor-pointer">
                About
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('start')} className="hover:text-gold transition-colors focus:outline-none cursor-pointer">
                Compatibility Assessment
              </button>
            </li>
          </ul>
        </div>

        {/* Copyright or legal */}
        <div className="space-y-4">
          <h4 className="font-soehne text-xs font-semibold tracking-wider text-gold uppercase">COMPATIBILITY FIRST</h4>
          <p className="font-soehne text-xs text-off-white/40 leading-relaxed max-w-xs">
            We believe you deserve structured, custom guidance before you start your search.
          </p>
          <div className="pt-2">
            <span className="text-[10px] font-mono tracking-widest text-gold/60 uppercase block">
              © 2026 HOMEDNA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
