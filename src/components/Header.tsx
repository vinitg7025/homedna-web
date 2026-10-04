import React, { useState, useEffect } from 'react';
import { ActiveView } from '../types';

interface HeaderProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [currentView]);

  const navItems: { id: ActiveView; label: string }[] = [
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'science', label: 'The Science' },
    { id: 'sample-profile', label: 'Compatibility Profile' },
    { id: 'about', label: 'About' },
  ];

  // Determine if we should show a dark transparent header (on home view and when not scrolled)
  const isDarkHomeHero = currentView === 'home' && !isScrolled;

  return (
    <header 
      id="app-header" 
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 border-b ${
        menuOpen
          ? 'bg-off-white border-stone/10 text-midnight shadow-sm'
          : isDarkHomeHero
            ? 'bg-transparent border-transparent text-off-white'
            : 'bg-off-white/90 backdrop-blur-md border-stone/10 text-midnight shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          id="logo-button"
          onClick={() => onNavigate('home')} 
          aria-label="HomeDNA — home"
          className="block cursor-pointer focus:outline-none"
        >
          {/* Both versions stay mounted so the swap between the dark hero and the light bar never flashes */}
          <img
            src={`${import.meta.env.BASE_URL}brand/logo-horizontal-white.png`}
            alt={isDarkHomeHero && !menuOpen ? 'HomeDNA' : ''}
            width={872} height={192}
            className={`h-8 md:h-9 w-auto ${isDarkHomeHero && !menuOpen ? 'block' : 'hidden'}`}
          />
          <img
            src={`${import.meta.env.BASE_URL}brand/logo-horizontal-brand.png`}
            alt={isDarkHomeHero && !menuOpen ? '' : 'HomeDNA'}
            width={872} height={192}
            className={`h-8 md:h-9 w-auto ${isDarkHomeHero && !menuOpen ? 'hidden' : 'block'}`}
          />
        </button>
        
        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            id="nav-how-it-works"
            onClick={() => onNavigate('how-it-works')} 
            className={`font-soehne text-[13px] tracking-wider uppercase cursor-pointer transition-colors focus:outline-none ${
              currentView === 'how-it-works' 
                ? 'text-gold font-semibold' 
                : isDarkHomeHero 
                  ? 'text-off-white/80 hover:text-off-white' 
                  : 'text-stone hover:text-midnight'
            }`}
          >
            How It Works
          </button>
          <button 
            id="nav-science"
            onClick={() => onNavigate('science')} 
            className={`font-soehne text-[13px] tracking-wider uppercase cursor-pointer transition-colors focus:outline-none ${
              currentView === 'science' 
                ? 'text-gold font-semibold' 
                : isDarkHomeHero 
                  ? 'text-off-white/80 hover:text-off-white' 
                  : 'text-stone hover:text-midnight'
            }`}
          >
            The Science
          </button>
          <button 
            id="nav-sample-profile"
            onClick={() => onNavigate('sample-profile')} 
            className={`font-soehne text-[13px] tracking-wider uppercase cursor-pointer transition-colors focus:outline-none ${
              currentView === 'sample-profile' 
                ? 'text-gold font-semibold' 
                : isDarkHomeHero 
                  ? 'text-off-white/80 hover:text-off-white' 
                  : 'text-stone hover:text-midnight'
            }`}
          >
            Compatibility Profile
          </button>
          <button 
            id="nav-about"
            onClick={() => onNavigate('about')} 
            className={`font-soehne text-[13px] tracking-wider uppercase cursor-pointer transition-colors focus:outline-none ${
              currentView === 'about' 
                ? 'text-gold font-semibold' 
                : isDarkHomeHero 
                  ? 'text-off-white/80 hover:text-off-white' 
                  : 'text-stone hover:text-midnight'
            }`}
          >
            About
          </button>
        </nav>

        <div className="flex items-center">
        {/* Call to Action Button */}
        <button 
          id="nav-cta-btn"
          onClick={() => onNavigate('start')}
          className={`font-soehne text-[13px] py-2 px-5 rounded-full font-medium transition-all duration-300 cursor-pointer focus:outline-none hover:scale-[1.03] ${
            isDarkHomeHero && !menuOpen
              ? 'bg-off-white text-midnight hover:bg-gold hover:text-midnight' 
              : 'bg-midnight text-off-white hover:bg-gold hover:text-midnight'
          }`}
        >
          <span className="md:hidden">Start</span><span className="hidden md:inline">Discover My HomeDNA</span>
        </button>

        {/* Mobile menu button (below tablet width the nav is hidden) */}
        <button
          id="nav-menu-btn"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(o => !o)}
          className={`md:hidden ml-2 w-11 h-11 rounded-full border flex flex-col items-center justify-center gap-[5px] cursor-pointer focus:outline-none ${
            isDarkHomeHero && !menuOpen ? 'border-white/30' : 'border-stone/30'
          }`}
        >
          <span className={`block w-[18px] h-[1.5px] transition-transform ${isDarkHomeHero && !menuOpen ? 'bg-off-white' : 'bg-midnight'} ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block w-[18px] h-[1.5px] transition-opacity ${isDarkHomeHero && !menuOpen ? 'bg-off-white' : 'bg-midnight'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[18px] h-[1.5px] transition-transform ${isDarkHomeHero && !menuOpen ? 'bg-off-white' : 'bg-midnight'} ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {menuOpen && (
        <nav id="mobile-nav" className="md:hidden absolute left-0 right-0 top-16 bg-off-white border-b border-stone/15 shadow-md px-6 pb-5 pt-2">
          {[{ id: 'home' as ActiveView, label: 'Home' }, ...navItems].map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`block w-full text-left font-soehne text-[14px] tracking-wider uppercase py-4 border-b border-stone/10 cursor-pointer focus:outline-none ${
                currentView === item.id ? 'text-gold font-semibold' : 'text-midnight'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
