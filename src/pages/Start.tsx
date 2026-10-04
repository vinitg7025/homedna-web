import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  AlertCircle, 
  RefreshCw, 
  Users, 
  User, 
  Briefcase, 
  Calendar, 
  Clock, 
  MapPin, 
  Activity, 
  Check, 
  HelpCircle,
  TrendingDown,
  Info
} from 'lucide-react';
import { ActiveView, AssessmentAnswers, AdultProfile, CompatibilityProfileData, createDefaultAdultProfile } from '../types';
import { getVedicZodiacSign } from '../data/assessmentData';
import { submitAssessment, SubmitResult } from '../api';
import BlueprintSvg from '../components/BlueprintSvg';
import MoreDetails from '../components/MoreDetails';

interface StartProps {
  onNavigate: (view: ActiveView) => void;
  answers: AssessmentAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<AssessmentAnswers>>;
}

export default function Start({ onNavigate, answers, setAnswers }: StartProps) {
  // Steps: 'intro' | 'household_setup' | 'adult_profiles' | 'design_intent' | 'calculating' | 'result'
  const [step, setStep] = useState<'intro' | 'household_setup' | 'adult_profiles' | 'design_intent' | 'more_details' | 'calculating' | 'result' | 'error'>('intro');
  const [submitError, setSubmitError] = useState('');
  const [outcome, setOutcome] = useState<SubmitResult | null>(null);
  const inFlight = useRef(false);
  const [activeAdultIndex, setActiveAdultIndex] = useState(0);
  const [calcProgress, setCalcProgress] = useState(0);
  const [calcMessage, setCalcMessage] = useState('Initiating calculations...');

  // Sub-tabs for the active adult profile completion
  const [profileSubTab, setProfileSubTab] = useState<'astro' | 'tipi' | 'behavioral' | 'lifestyle'>('astro');

  // List of standard Nakshatras for lookup
  const NAKSHATRAS = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
    "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Svati", "Vishakha", "Anuradha", "Jyeshtha",
    "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
  ];

  // Progress display while the engine works (creeps toward 90% and never claims completion before the server answers)
  useEffect(() => {
    if (step !== 'calculating') return;
    setCalcProgress(4);
    const ticker = setInterval(() => {
      setCalcProgress(prev => {
        const next = Math.min(prev + 1.2, 90);
        if (next < 25) setCalcMessage('Calculating your birth chart...');
        else if (next < 50) setCalcMessage('Mapping your personality scales...');
        else if (next < 75) setCalcMessage('Checking the rule book against your profile...');
        else setCalcMessage('Writing your Compatibility Profile...');
        return next;
      });
    }, 400);
    return () => clearInterval(ticker);
  }, [step]);

  // The real calculation: the HomeDNA engine decides every recommendation; this page only sends answers and opens the result.
  useEffect(() => {
    if (step !== 'calculating' || inFlight.current) return;
    inFlight.current = true;
    setSubmitError('');
    submitAssessment(answers)
      .then(res => {
        setCalcProgress(100);
        setOutcome(res);
        setStep('result');
        window.location.assign(res.url);
      })
      .catch(err => {
        setSubmitError(err?.message || 'Something went wrong. Please try again.');
        setStep('error');
      })
      .finally(() => { inFlight.current = false; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Adjust number of adult profiles when answers.numAdults changes
  const handleNumAdultsChange = (num: number) => {
    const currentAdults = [...answers.adults];
    if (num > currentAdults.length) {
      // Append new adult profiles
      for (let i = currentAdults.length; i < num; i++) {
        currentAdults.push(
          createDefaultAdultProfile(
            `adult-${i}`, 
            i === 0 ? answers.firstName || '' : `Adult ${i + 1}`, 
            i === 0 ? 'Primary Resident' : 'Partner'
          )
        );
      }
    } else if (num < currentAdults.length) {
      // Slice excess profiles
      currentAdults.splice(num);
    }
    
    setAnswers({
      ...answers,
      numAdults: num,
      adults: currentAdults,
      householdSize: num > 1 ? 'family' : 'individual'
    });
  };

  const updateAdultProfile = (index: number, fields: Partial<AdultProfile>) => {
    const updatedAdults = [...answers.adults];
    updatedAdults[index] = { ...updatedAdults[index], ...fields };

    // Sync legacy root fields if editing adult 0 (Primary)
    if (index === 0) {
      const activeDob = fields.dob ?? answers.dob;
      const zodiac = activeDob ? getVedicZodiacSign(activeDob) : (answers.dob ? getVedicZodiacSign(answers.dob) : '');
      
      setAnswers(prev => ({
        ...prev,
        adults: updatedAdults,
        firstName: fields.name ?? prev.firstName,
        dob: activeDob ?? prev.dob,
        ceilingPreference: fields.wfhStatus === 'full-time' ? 'High (10ft+)' : 'Standard (9ft)',
        lightPreference: fields.sunlightSensitivity && fields.sunlightSensitivity >= 4 ? 'Afternoon Diffused' : 'Morning Essential',
        materialTexture: fields.proxyStorage === 'C' ? 'polished' : 'organic',
        socialStyle: prev.socialStyle,
        
        // sync tipi variables for backend compatibility
        tipiExtraverted: fields.tipiExtraverted ?? prev.tipiExtraverted,
        tipiCritical: fields.tipiCritical ?? prev.tipiCritical,
        tipiDependable: fields.tipiDependable ?? prev.tipiDependable,
        tipiAnxious: fields.tipiAnxious ?? prev.tipiAnxious,
        tipiOpen: fields.tipiOpen ?? prev.tipiOpen,
        tipiReserved: fields.tipiReserved ?? prev.tipiReserved,
        tipiSympathetic: fields.tipiSympathetic ?? prev.tipiSympathetic,
        tipiDisorganized: fields.tipiDisorganized ?? prev.tipiDisorganized,
        tipiCalm: fields.tipiCalm ?? prev.tipiCalm,
        tipiConventional: fields.tipiConventional ?? prev.tipiConventional
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        adults: updatedAdults
      }));
    }
  };

  const handleIntroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update active adult 0 name
    updateAdultProfile(0, { name: answers.firstName, dob: answers.dob });
    setStep('household_setup');
  };

  // Check if active adult's subtabs are fully filled out
  const isAdultTabComplete = (adult: AdultProfile, tab: 'astro' | 'tipi' | 'behavioral' | 'lifestyle'): boolean => {
    if (tab === 'astro') {
      return !!(adult.dob || adult.zodiacSign);
    }
    if (tab === 'tipi') {
      return true; // TIPI initialized to default 4s
    }
    if (tab === 'behavioral') {
      return !!(adult.proxyGuests && adult.proxyDecompress && adult.proxyStorage && adult.proxyDecor);
    }
    if (tab === 'lifestyle') {
      return !!(adult.wfhStatus && adult.studyAtHome);
    }
    return false;
  };

  const isProfileStepReady = (): boolean => {
    return answers.adults.every(adult => 
      isAdultTabComplete(adult, 'astro') && 
      isAdultTabComplete(adult, 'behavioral') &&
      isAdultTabComplete(adult, 'lifestyle')
    );
  };

  if (step === 'intro') {
    return (
      <div className="w-full min-h-[90vh] bg-midnight text-off-white flex flex-col justify-center py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none blueprint-grid-dark opacity-10" />
        
        <div className="max-w-xl mx-auto space-y-8 relative z-10 w-full text-center">
          <div className="space-y-4 animate-fade-in">
            <img src={`${import.meta.env.BASE_URL}brand/mark-white.svg`} alt="HomeDNA" width={256} height={256} className="mx-auto h-16 w-16 opacity-90" />
            <span className="font-soehne text-[11px] text-gold uppercase tracking-[0.2em] font-semibold block">
              COVERS VASTU, ASTROLOGY, PSYCHOLOGY & NEUROSCIENCE
            </span>
            <h1 className="font-canela text-4xl sm:text-[56px] font-light tracking-tight leading-none">
              Discover your home compatibility.
            </h1>
            <p className="font-canela text-lg text-off-white/65 max-w-md mx-auto">
              S0–S3 complete multi-resident assessment. Build your unique Compatibility Profile.
            </p>
          </div>

          <form onSubmit={handleIntroSubmit} className="space-y-4 text-left">
            <div className="space-y-4 bg-white/5 p-6 rounded-lg border border-white/10">
              <div className="space-y-1">
                <label className="font-soehne text-xs text-stone uppercase tracking-wider block font-bold">First Name</label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  required
                  value={answers.firstName}
                  onChange={e => setAnswers({...answers, firstName: e.target.value})}
                  className="w-full bg-midnight border border-white/20 rounded p-3 text-sm font-soehne text-off-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="font-soehne text-xs text-stone uppercase tracking-wider block font-bold">Email Address</label>
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  required
                  value={answers.email}
                  onChange={e => setAnswers({...answers, email: e.target.value})}
                  className="w-full bg-midnight border border-white/20 rounded p-3 text-sm font-soehne text-off-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="font-soehne text-xs text-stone uppercase tracking-wider block font-bold">Date of Birth</label>
                <input 
                  type="date" 
                  required
                  value={answers.dob}
                  onChange={e => setAnswers({...answers, dob: e.target.value})}
                  className="w-full bg-midnight border border-white/20 rounded p-3 text-sm font-soehne text-off-white focus:outline-none focus:border-gold transition-colors"
                />
                <span className="font-soehne text-[11px] text-stone block mt-1">
                  Used to compute your Vedic solar coordinate. Shifted approximately 23 days from Western charts.
                </span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-midnight font-soehne text-xs tracking-widest uppercase font-bold py-4 rounded cursor-pointer transition-all duration-300 shadow-md inline-flex items-center justify-center gap-1.5"
            >
              Begin Compatibility Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-2 pt-4">
            <span className="font-soehne text-[11px] text-off-white/40 block">
              All processing takes place securely. Local persistence applied immediately.
            </span>
            <button 
              onClick={() => onNavigate('home')}
              className="font-soehne text-xs text-stone hover:text-off-white transition-colors underline cursor-pointer"
            >
              ← Return to HomeDNA
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: HOUSEHOLD SETUP (SECTION 0)
  if (step === 'household_setup') {
    return (
      <div className="w-full min-h-[90vh] bg-off-white text-midnight py-16 px-6 flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full space-y-10">
          <div className="flex justify-between items-center border-b border-stone/15 pb-4">
            <span className="font-soehne text-xs text-stone uppercase tracking-widest font-bold">SECTION 0: HOUSEHOLD SETUP</span>
            <span className="font-mono text-xs text-gold font-bold">HOUSEHOLD SEEDING</span>
          </div>

          <div className="space-y-8 text-left">
            <div className="space-y-2">
              <h2 className="font-canela text-3xl font-light text-midnight">Set up your household parameters</h2>
              <p className="font-soehne text-xs text-stone">This determines the blending algorithms used for multiple co-buyers.</p>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-lg border border-stone/15">
              {/* Adults living in home */}
              <div className="space-y-3">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q0.1 — How many adults will permanently live in this home?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleNumAdultsChange(num)}
                      className={`p-3 text-sm border rounded transition-all cursor-pointer font-bold ${
                        answers.numAdults === num
                          ? 'border-midnight bg-midnight text-off-white'
                          : 'border-stone/25 bg-white hover:border-gold text-stone'
                      }`}
                    >
                      {num === 5 ? '5+' : num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Household Description */}
              <div className="space-y-3 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q0.2 — How would you describe your household?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { val: 'couple', label: 'Couple (no parents or other adults)' },
                    { val: 'nuclear', label: 'Nuclear family with parents/in-laws with us' },
                    { val: 'joint', label: 'Joint family — all staying together permanently' },
                    { val: 'friends', label: 'Buying with a friend or co-investor' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, householdType: opt.val })}
                      className={`p-3 text-xs text-left border rounded transition-all cursor-pointer ${
                        answers.householdType === opt.val
                          ? 'border-midnight bg-midnight text-off-white font-bold'
                          : 'border-stone/25 bg-white hover:border-gold text-stone'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Resident Decision */}
              <div className="space-y-3 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q0.3 — Who should be considered the primary resident of this home?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { val: 'me', label: 'Me (the person filling this form)' },
                    { val: 'spouse', label: 'My spouse / partner' },
                    { val: 'parent', label: 'A parent or in-law (elder)' },
                    { val: 'equal', label: 'We are equal — no single primary resident' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, primaryResident: opt.val })}
                      className={`p-3 text-xs text-left border rounded transition-all cursor-pointer ${
                        answers.primaryResident === opt.val
                          ? 'border-midnight bg-midnight text-off-white font-bold'
                          : 'border-stone/25 bg-white hover:border-gold text-stone'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Children (optional) */}
              <div className="space-y-2 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Children living in the home (optional)
                </label>
                <input
                  type="text"
                  placeholder="Ages, e.g. 6, 14"
                  value={answers.childrenAges}
                  onChange={(e) => setAnswers({ ...answers, childrenAges: e.target.value })}
                  className="w-full bg-white border border-stone/25 rounded p-3 text-sm font-soehne focus:outline-none focus:border-gold"
                />
                <p className="font-soehne text-[11px] text-stone">Children's ages change bedroom, light, floor-plan and workspace guidance.</p>
              </div>

              {/* Dynamic Adult List Inputs (Q0.4) */}
              <div className="space-y-4 pt-4 border-t border-stone/10">
                <div className="flex items-center gap-1.5 text-stone uppercase tracking-wider font-bold text-[10px]">
                  <Users className="w-4 h-4 text-gold" />
                  <span>Q0.4 — List permanent residents & roles</span>
                </div>
                
                <div className="space-y-3 bg-stone/5 p-4 rounded border border-stone/15">
                  {answers.adults.map((adult, index) => (
                    <div key={adult.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-white p-3 rounded border border-stone/15 shadow-sm">
                      <div className="sm:col-span-4 space-y-1">
                        <label className="font-mono text-[9px] text-stone tracking-wider uppercase block">
                          Adult {index + 1} Name/Initials {index === 0 && '(You)'}
                        </label>
                        <input
                          type="text"
                          required
                          value={adult.name}
                          onChange={(e) => updateAdultProfile(index, { name: e.target.value })}
                          placeholder={`Adult ${index + 1}`}
                          className="w-full bg-off-white border border-stone/25 rounded p-2 text-xs text-midnight focus:outline-none focus:border-gold"
                        />
                      </div>

                      <div className="sm:col-span-4 space-y-1">
                        <label className="font-mono text-[9px] text-stone tracking-wider uppercase block">
                          Role
                        </label>
                        <select
                          value={adult.role}
                          onChange={(e) => updateAdultProfile(index, { role: e.target.value })}
                          className="w-full bg-off-white border border-stone/25 rounded p-2 text-xs text-midnight focus:outline-none focus:border-gold"
                        >
                          <option value="Primary Resident">Primary Resident</option>
                          <option value="Partner">Partner / Spouse</option>
                          <option value="Parent">Parent</option>
                          <option value="In-law">In-law</option>
                          <option value="Other">Other Family / Adult</option>
                        </select>
                      </div>

                      <div className="sm:col-span-4 space-y-1">
                        <label className="font-mono text-[9px] text-stone tracking-wider uppercase block">
                          Q0.5 — Occupation Profile
                        </label>
                        <select
                          value={adult.occupation}
                          onChange={(e) => updateAdultProfile(index, { occupation: e.target.value })}
                          className="w-full bg-off-white border border-stone/25 rounded p-2 text-xs text-midnight focus:outline-none focus:border-gold"
                        >
                          <option value="creative">Creative professional (designer, writer...)</option>
                          <option value="analytical">Analytical professional (engineer, programmer...)</option>
                          <option value="strategic">Strategic/leadership professional (executive, consultant...)</option>
                          <option value="caregiving">Caregiving professional (teacher, doctor, nurse...)</option>
                          <option value="business">Business owner / entrepreneur</option>
                          <option value="other">Other / not employed outside home</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone/15 flex justify-between">
            <button
              onClick={() => setStep('intro')}
              className="text-stone hover:text-midnight font-soehne text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> BACK
            </button>
            <button
              onClick={() => setStep('adult_profiles')}
              className="bg-midnight hover:bg-gold hover:text-midnight text-off-white font-soehne text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded transition-all flex items-center gap-1.5 cursor-pointer"
            >
              CONTINUE TO PROFILES <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: ADULT PROFILES (SECTIONS 1 & 2A, 2B, 2C IN TABS)
  if (step === 'adult_profiles') {
    const activeAdult = answers.adults[activeAdultIndex] || answers.adults[0];

    const handleTipiValueChange = (key: string, val: number) => {
      updateAdultProfile(activeAdultIndex, { [key]: val });
    };

    return (
      <div className="w-full min-h-[90vh] bg-parchment text-midnight py-16 px-6 flex flex-col justify-center items-center">
        <div className="max-w-4xl w-full space-y-8">
          <div className="flex justify-between items-center border-b border-stone/15 pb-4">
            <span className="font-soehne text-xs text-stone uppercase tracking-widest font-bold">
              SECTION 1 & 2: RECIPIENT COMPATIBILITY INDEX
            </span>
            <span className="font-mono text-xs text-gold font-bold">
              PROFILE {activeAdultIndex + 1} OF {answers.numAdults}
            </span>
          </div>

          {/* Adult Tab Navigation */}
          {answers.numAdults > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-stone/15">
              {answers.adults.map((adult, idx) => {
                const isComplete = isAdultTabComplete(adult, 'astro') && isAdultTabComplete(adult, 'behavioral') && isAdultTabComplete(adult, 'lifestyle');
                return (
                  <button
                    key={adult.id}
                    type="button"
                    onClick={() => {
                      setActiveAdultIndex(idx);
                      setProfileSubTab('astro');
                    }}
                    className={`py-2.5 px-5 rounded-md text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      activeAdultIndex === idx
                        ? 'bg-midnight text-off-white shadow-sm'
                        : 'bg-white border border-stone/15 text-stone hover:border-gold'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{adult.name || `Adult ${idx + 1}`}</span>
                    {isComplete ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-stone" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Sub-section Navigation within Active Adult */}
          <div className="grid grid-cols-4 gap-1 bg-stone/5 p-1 rounded-lg border border-stone/15">
            {[
              { id: 'astro', label: '1. Astro-Vastu', icon: Compass },
              { id: 'tipi', label: '2A. Personality (TIPI)', icon: Activity },
              { id: 'behavioral', label: '2B. Proxy Scenarios', icon: Info },
              { id: 'lifestyle', label: '2C. Usage & Rest', icon: Briefcase }
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setProfileSubTab(tab.id as any)}
                  className={`py-3.5 px-2 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                    profileSubTab === tab.id
                      ? 'bg-white text-midnight shadow-sm font-extrabold'
                      : 'text-stone hover:text-midnight'
                  }`}
                >
                  <IconComp className="w-4 h-4 text-gold" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.id.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Active Sub-Tab View */}
          <div className="bg-white p-8 rounded-xl border border-stone/15 shadow-sm text-left">
            <AnimatePresence mode="wait">
              {profileSubTab === 'astro' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="font-canela text-2xl text-midnight">Section 1: Astro-Vastu Coordinates</h3>
                    <p className="font-soehne text-xs text-stone">Configures your directional alignment vectors using astronomical mathematics.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {/* Q1.1 Date of Birth */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q1.1 — Date of Birth (Required)
                      </label>
                      <input
                        type="date"
                        required
                        value={activeAdult.dob}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { dob: e.target.value })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      />
                      {activeAdult.dob && (
                        <div className="mt-2 p-3.5 bg-gold/10 border border-gold/35 rounded-lg text-xs text-stone flex items-start gap-2.5 animate-fade-in">
                          <Sparkles className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-midnight block">Computed Vedic Sun Sign: {getVedicZodiacSign(activeAdult.dob)}</span>
                            <p className="text-[11px] leading-relaxed mt-0.5 text-stone">
                              Sidereal system measures actual astronomical constellation intersections. Shifts ~23 days from Western zodiacs.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Q1.5 Direct Zodiac Fallback */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q1.5 — Zodiac Sign (Fallback)
                      </label>
                      <select
                        value={activeAdult.zodiacSign || getVedicZodiacSign(activeAdult.dob).split(' ')[0] || ''}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { zodiacSign: e.target.value })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      >
                        <option value="">Select Zodiac Fallback</option>
                        {["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"].map((sign) => (
                          <option key={sign} value={sign}>{sign}</option>
                        ))}
                      </select>
                      <span className="text-[10px] text-stone block">Select manually only if birthdate is skipped.</span>
                    </div>

                    {/* Q1.2 Time of birth */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q1.2 — Time of Birth (Optional)
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="time"
                          disabled={activeAdult.birthTimeUnknown}
                          value={activeAdult.birthTime || ''}
                          onChange={(e) => updateAdultProfile(activeAdultIndex, { birthTime: e.target.value })}
                          className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold disabled:opacity-50"
                        />
                        <label className="flex items-center gap-1.5 whitespace-nowrap cursor-pointer text-xs font-bold text-stone">
                          <input
                            type="checkbox"
                            checked={activeAdult.birthTimeUnknown}
                            onChange={(e) => updateAdultProfile(activeAdultIndex, { birthTimeUnknown: e.target.checked })}
                            className="rounded accent-gold"
                          />
                          <span>Don't know</span>
                        </label>
                      </div>
                      <span className="text-[10px] text-stone block">Used to compute Lagna (ascendant sign) which changes every ~2 hours.</span>
                    </div>

                    {/* Q1.3 Place of birth */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q1.3 — Place of Birth
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-stone" />
                        <input
                          type="text"
                          placeholder="City, State, Country"
                          value={activeAdult.birthPlace || ''}
                          onChange={(e) => updateAdultProfile(activeAdultIndex, { birthPlace: e.target.value })}
                          className="w-full pl-10 bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                        />
                      </div>
                      <span className="text-[10px] text-stone block">Coordinates are vital for precise Lagna mapping.</span>
                    </div>

                    {/* Q1.4 Birth Star / Nakshatra */}
                    <div className="space-y-2 md:col-span-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q1.4 — Do you know your birth star (Janma Nakshatra)?
                      </label>
                      <select
                        value={activeAdult.nakshatra || ''}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { nakshatra: e.target.value })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      >
                        <option value="">No, skip this (or don't know)</option>
                        {NAKSHATRAS.map((n, idx) => (
                          <option key={n} value={n}>{idx + 1}. {n}</option>
                        ))}
                      </select>
                      <span className="text-[10px] text-stone block">
                        Governs finer entry alignments. <a href="https://www.drikpanchang.com/nakshatra/janma-nakshatra-calculator.html" target="_blank" rel="noreferrer" className="text-gold underline font-bold">Lookup star calculation tool</a>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 2A: TIPI SLIDERS */}
              {profileSubTab === 'tipi' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="space-y-1">
                    <h3 className="font-canela text-2xl text-midnight">Section 2A: Ten-Item Personality Inventory (TIPI)</h3>
                    <p className="font-soehne text-xs text-stone">
                      Validated Big Five measurements. Rate statements from 1 (Strongly Disagree) to 7 (Strongly Agree).
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    {[
                      { key: 'tipiExtraverted', label: '1. I feel energised in social situations — I tend to be talkative and enthusiastic around people (E+)' },
                      { key: 'tipiCritical', label: '2. I often challenge or find fault in others\' ideas, even when it creates tension (A-)' },
                      { key: 'tipiDependable', label: '3. I follow through on plans, meet deadlines, and keep my space organized (C+)' },
                      { key: 'tipiAnxious', label: '4. I worry more than most — small setbacks or stressful moments affect my mood easily (N+)' },
                      { key: 'tipiOpen', label: '5. I actively seek out new ideas — I enjoy thinking about complex or abstract things (O+)' },
                      { key: 'tipiReserved', label: '6. I prefer quiet, low-key environments — large gatherings leave me drained (E-)' },
                      { key: 'tipiSympathetic', label: '7. I am genuinely warm and caring — I go out of my way to understand others (A+)' },
                      { key: 'tipiDisorganized', label: '8. I tend to leave things disorganized — keeping structured spaces doesn\'t come naturally (C-)' },
                      { key: 'tipiCalm', label: '9. I handle pressure well and rarely feel anxious — I stay emotionally steady (N-)' },
                      { key: 'tipiConventional', label: '10. I prefer familiar routines and proven approaches — not particularly drawn to novelty (O-)' }
                    ].map((item) => (
                      <div key={item.key} className="space-y-2 bg-stone/5 p-4 rounded border border-stone/15">
                        <div className="flex justify-between items-start gap-4">
                          <p className="font-soehne text-xs font-bold text-midnight leading-relaxed">{item.label}</p>
                          <span className="font-mono text-base font-bold text-gold shrink-0">
                            {(activeAdult as any)[item.key] ?? 4}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="7"
                          step="1"
                          value={(activeAdult as any)[item.key] ?? 4}
                          onChange={(e) => handleTipiValueChange(item.key, parseInt(e.target.value))}
                          className="w-full h-1 bg-stone/25 rounded-lg appearance-none cursor-pointer accent-gold"
                        />
                        <div className="flex justify-between text-[9px] font-mono text-stone">
                          <span>DISAGREE STRONGLY</span>
                          <span>NEUTRAL</span>
                          <span>AGREE STRONGLY</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SECTION 2B: BEHAVIORAL PROXY SCENARIOS */}
              {profileSubTab === 'behavioral' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="font-canela text-2xl text-midnight">Section 2B: Behavioral Proxy Scenarios</h3>
                    <p className="font-soehne text-xs text-stone">Four context-aware situational choices to calibrate your personality-spatial map.</p>
                  </div>

                  <div className="space-y-6 pt-4 text-left">
                    {/* Q2.1 - Guests */}
                    <div className="space-y-2.5">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.1 — When you have guests at your home, what does your ideal evening look like?
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { key: 'A', text: 'A: A large group — the more the merrier. I love when a gathering fills the living room.' },
                          { key: 'B', text: 'B: A few close friends or family, maybe 4–6 people. Comfortable and connected.' },
                          { key: 'C', text: 'C: Ideally just one or two people I know very well. I find large groups draining.' },
                          { key: 'D', text: 'D: Honestly, I prefer when guests don\'t come to my home. I\'d rather meet out.' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => updateAdultProfile(activeAdultIndex, { proxyGuests: opt.key })}
                            className={`p-3.5 text-xs text-left rounded border transition-all cursor-pointer ${
                              activeAdult.proxyGuests === opt.key
                                ? 'border-midnight bg-midnight text-off-white font-semibold'
                                : 'border-stone/25 bg-stone/5 hover:border-gold hover:bg-stone/10 text-stone'
                            }`}
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q2.2 - Long day decompress */}
                    <div className="space-y-2.5 pt-4 border-t border-stone/10">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.2 — After a long day of work, what does your ideal first hour at home look like?
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { key: 'A', text: 'A: I need complete quiet — I\'ll go to my room, close the door, and decompress alone.' },
                          { key: 'B', text: 'B: I want to relax but near family — on the sofa, not necessarily talking.' },
                          { key: 'C', text: 'C: I want to catch up with whoever is home. Human contact recharges me.' },
                          { key: 'D', text: 'D: I\'ll turn on music or TV and move around the house — I need activity to unwind.' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => updateAdultProfile(activeAdultIndex, { proxyDecompress: opt.key })}
                            className={`p-3.5 text-xs text-left rounded border transition-all cursor-pointer ${
                              activeAdult.proxyDecompress === opt.key
                                ? 'border-midnight bg-midnight text-off-white font-semibold'
                                : 'border-stone/25 bg-stone/5 hover:border-gold hover:bg-stone/10 text-stone'
                            }`}
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q2.3 - Storage style */}
                    <div className="space-y-2.5 pt-4 border-t border-stone/10">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.3 — How do you feel about open shelves with items on display vs. closed storage?
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { key: 'A', text: 'A: I love open display — showing books, art, and collections makes a home feel alive.' },
                          { key: 'B', text: 'B: A mix is ideal — some display, some hidden. Depends on the item.' },
                          { key: 'C', text: 'C: Closed storage for everything. I don\'t want to see clutter, even organized clutter.' },
                          { key: 'D', text: 'D: I honestly don\'t care about storage — I\'ll figure it out after I move in.' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => updateAdultProfile(activeAdultIndex, { proxyStorage: opt.key })}
                            className={`p-3.5 text-xs text-left rounded border transition-all cursor-pointer ${
                              activeAdult.proxyStorage === opt.key
                                ? 'border-midnight bg-midnight text-off-white font-semibold'
                                : 'border-stone/25 bg-stone/5 hover:border-gold hover:bg-stone/10 text-stone'
                            }`}
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q2.4 - Décor Instinct */}
                    <div className="space-y-2.5 pt-4 border-t border-stone/10">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.4 — Which of these describes your home décor instinct?
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { key: 'A', text: 'A: I\'m drawn to bold, unusual, distinctive design — I want my home to feel different.' },
                          { key: 'B', text: 'B: I like warm and comfortable — nothing too experimental, but not generic either.' },
                          { key: 'C', text: 'C: Classic, timeless, understated — good materials, no trends.' },
                          { key: 'D', text: 'D: Functional and clean — I don\'t think much about aesthetics.' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => updateAdultProfile(activeAdultIndex, { proxyDecor: opt.key })}
                            className={`p-3.5 text-xs text-left rounded border transition-all cursor-pointer ${
                              activeAdult.proxyDecor === opt.key
                                ? 'border-midnight bg-midnight text-off-white font-semibold'
                                : 'border-stone/25 bg-stone/5 hover:border-gold hover:bg-stone/10 text-stone'
                            }`}
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SECTION 2C: USAGE & LIFESTYLE */}
              {profileSubTab === 'lifestyle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="font-canela text-2xl text-midnight">Section 2C: Usage, Rest & Sensory Scales</h3>
                    <p className="font-soehne text-xs text-stone">Calibrates active focus and biological restoration patterns.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
                    {/* Q2.5 - WFH */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.5 — Do you work from home?
                      </label>
                      <select
                        value={activeAdult.wfhStatus}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { wfhStatus: e.target.value })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      >
                        <option value="full-time">Full time (5 days/week)</option>
                        <option value="hybrid">Hybrid (2–3 days/week)</option>
                        <option value="occasional">Occasionally (less than once/week)</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    {/* Q2.6 - Study */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.6 — Any family members study at home regularly?
                      </label>
                      <select
                        value={activeAdult.studyAtHome}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { studyAtHome: e.target.value })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      >
                        <option value="no">No</option>
                        <option value="child">Yes — a child (school age)</option>
                        <option value="adult">Yes — an adult (exams, professional prep)</option>
                      </select>
                    </div>

                    {/* Q2.7 - Natural light mood scale */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.7 — How much does natural light affect your mood?
                      </label>
                      <select
                        value={activeAdult.naturalLightScale}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { naturalLightScale: parseInt(e.target.value) })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      >
                        <option value="1">1: I barely notice it</option>
                        <option value="2">2: Slight preference for natural light</option>
                        <option value="3">3: I definitely feel better with good natural light</option>
                        <option value="4">4: Natural light is important to me</option>
                        <option value="5">5: Significant — dark spaces make me miserable</option>
                      </select>
                    </div>

                    {/* Q2.9 - Sensory sensitivity */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.9 — Sensory sensitivity (Noise, clutter, harsh light)
                      </label>
                      <select
                        value={activeAdult.sensorySensitivity}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { sensorySensitivity: parseInt(e.target.value) })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      >
                        <option value="1">1: Barely notice these things</option>
                        <option value="2">2: Mildly affected — can decompress anywhere</option>
                        <option value="3">3: Moderately sensitive — prefer quiet, can adapt</option>
                        <option value="4">4: Quite sensitive — clutter/noise drains focus</option>
                        <option value="5">5: Strongly sensitive — directly impacts health</option>
                      </select>
                    </div>

                    {/* Q2.10 - Restoration frequency */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.10 — Need for home to serve as a recovery space
                      </label>
                      <select
                        value={activeAdult.recoveryFrequency}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { recoveryFrequency: parseInt(e.target.value) })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      >
                        <option value="1">1: Rarely — arrive home with energy</option>
                        <option value="2">2: Occasionally — once or twice a week</option>
                        <option value="3">3: Regularly — most workdays I need quiet recharge</option>
                        <option value="4">4: Often — strongly depend on home for rest</option>
                        <option value="5">5: Daily and essential — arrive fully depleted</option>
                      </select>
                    </div>

                    {/* Q2.11 - Glare sensitivity */}
                    <div className="space-y-2">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.11 — Sensitivity to direct sunlight / glare
                      </label>
                      <select
                        value={activeAdult.sunlightSensitivity}
                        onChange={(e) => updateAdultProfile(activeAdultIndex, { sunlightSensitivity: parseInt(e.target.value) })}
                        className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                      >
                        <option value="1">1: Not at all — love intense direct rays</option>
                        <option value="2">2: Slightly — prefer direct but managed</option>
                        <option value="3">3: Moderate — prefer filtered or indirect in work zones</option>
                        <option value="4">4: Quite sensitive — direct sun causes headaches/glare</option>
                        <option value="5">5: Strongly sensitive — need north-facing or shaded zones</option>
                      </select>
                    </div>

                    {/* Q2.8 - Environment conditions checkboxes */}
                    <div className="space-y-3.5 md:col-span-2 pt-4 border-t border-stone/10">
                      <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                        Q2.8 — Do you have any ongoing health conditions affected by home environment?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { id: 'stress', label: 'Chronic stress / anxiety' },
                          { id: 'sleep', label: 'Sleep disorders / Insomnia' },
                          { id: 'respiratory', label: 'Respiratory sensitivity (dust, asthma)' },
                          { id: 'vision', label: 'Vision sensitivity (harsh glare, light strain)' }
                        ].map((c) => {
                          const list = activeAdult.healthConditions || [];
                          const checked = list.includes(c.id);
                          return (
                            <label key={c.id} className="flex items-center gap-2.5 p-3 rounded border border-stone/20 bg-stone/5 text-xs text-midnight cursor-pointer hover:bg-stone/10 transition-colors">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  const updated = checked 
                                    ? list.filter(item => item !== c.id) 
                                    : [...list, c.id];
                                  updateAdultProfile(activeAdultIndex, { healthConditions: updated });
                                }}
                                className="rounded accent-gold"
                              />
                              <span>{c.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Action Buttons */}
          <div className="pt-6 border-t border-stone/15 flex justify-between">
            <button
              onClick={() => {
                if (activeAdultIndex > 0) {
                  setActiveAdultIndex(prev => prev - 1);
                  setProfileSubTab('lifestyle');
                } else {
                  setStep('household_setup');
                }
              }}
              className="text-stone hover:text-midnight font-soehne text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> BACK
            </button>

            <button
              onClick={() => {
                if (activeAdultIndex < answers.numAdults - 1) {
                  setActiveAdultIndex(prev => prev + 1);
                  setProfileSubTab('astro');
                } else {
                  setStep('design_intent');
                }
              }}
              disabled={!isAdultTabComplete(activeAdult, 'astro')}
              className="bg-midnight disabled:opacity-40 hover:bg-gold hover:text-midnight text-off-white font-soehne text-xs font-bold uppercase tracking-widest py-3.5 px-8 rounded transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {activeAdultIndex < answers.numAdults - 1 ? (
                <>NEXT RESIDENT <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>CONTINUE TO DESIGN INTENT <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: VASTU & DESIGN INTENT (SECTION 3)
  if (step === 'design_intent') {
    return (
      <div className="w-full min-h-[90vh] bg-off-white text-midnight py-16 px-6 flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full space-y-10">
          <div className="flex justify-between items-center border-b border-stone/15 pb-4">
            <span className="font-soehne text-xs text-stone uppercase tracking-widest font-bold">
              SECTION 3: VASTU & DESIGN INTENT
            </span>
            <span className="font-mono text-xs text-gold font-bold">FINAL SEEDING</span>
          </div>

          <div className="space-y-8 text-left">
            <div className="space-y-2">
              <h2 className="font-canela text-3xl font-light text-midnight">Anchor your design intentions</h2>
              <p className="font-soehne text-xs text-stone">Configures specific hard-coded constraints for healthy physiological zones.</p>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-lg border border-stone/15 shadow-sm">
              
              {/* Q3.1 - Vastu Importance */}
              <div className="space-y-3">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q3.1 — How important is Vastu compliance to you?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { val: 'essential', label: 'Essential — will not buy unless fully compliant' },
                    { val: 'important', label: 'Important — prefer compliant, open to remedies' },
                    { val: 'neutral', label: 'Neutral — interested in advisory only' },
                    { val: 'not-important', label: 'Not important — don\'t factor Vastu in decisions' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, vastuImportance: opt.val })}
                      className={`p-3 text-xs text-left border rounded transition-all cursor-pointer ${
                        answers.vastuImportance === opt.val
                          ? 'border-midnight bg-midnight text-off-white font-bold'
                          : 'border-stone/25 bg-white hover:border-gold text-stone'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3.2 - Open ended Intent */}
              <div className="space-y-2.5 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q3.2 — What is the single most important thing you want from your home?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A serene sanctuary to decompress, or an active workspace with nature views..."
                  value={answers.homeIntent}
                  onChange={(e) => setAnswers({ ...answers, homeIntent: e.target.value })}
                  className="w-full bg-off-white border border-stone/25 rounded p-3 text-sm font-soehne text-midnight focus:outline-none focus:border-gold"
                />
              </div>

              {/* Q3.3 - Property Type */}
              <div className="space-y-3 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q3.3 — What type of home are you buying?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'flat', label: 'Flat / Apartment' },
                    { val: 'villa', label: 'Villa / House' },
                    { val: 'plot', label: 'Plot Purchase' },
                    { val: 'resale', label: 'Resale Property' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, propertyType: opt.val })}
                      className={`p-2.5 text-xs text-center border rounded transition-all cursor-pointer ${
                        answers.propertyType === opt.val
                          ? 'border-midnight bg-midnight text-off-white font-bold'
                          : 'border-stone/25 bg-white hover:border-gold text-stone'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3.4 - Household Health Conditions */}
              <div className="space-y-3 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q3.4 — Are there any health conditions in your household that you want your new home to support?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'digestive', label: 'Liver, gallbladder, or digestive conditions' },
                    { id: 'heart', label: 'Heart, blood, or cardiovascular conditions' },
                    { id: 'cancer', label: 'Cancer or tumours (any household member)' },
                    { id: 'neurological', label: 'Neurological conditions, migraines, or persistent mental health challenges' },
                    { id: 'respiratory', label: 'Respiratory or lung conditions — asthma, breathing difficulty' },
                    { id: 'reproductive', label: 'Kidney, urinary, or reproductive health' },
                    { id: 'immune', label: 'Immune system, chronic fatigue, or unexplained degenerative conditions' }
                  ].map((c) => {
                    const checked = answers.householdHealthSupport?.includes(c.id);
                    return (
                      <label key={c.id} className="flex items-start gap-2.5 p-3 rounded border border-stone/20 bg-stone/5 text-xs text-midnight cursor-pointer hover:bg-stone/10 transition-colors">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const list = answers.householdHealthSupport || [];
                            const updated = checked 
                              ? list.filter(i => i !== c.id) 
                              : [...list, c.id];
                            setAnswers({ ...answers, householdHealthSupport: updated });
                          }}
                          className="rounded accent-gold mt-0.5"
                        />
                        <span>{c.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q3.5 - Life Situations */}
              <div className="space-y-3 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q3.5 — Are there any significant life situations in your household to support?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'conceive', label: 'We are trying to conceive a child' },
                    { id: 'marriage_self', label: 'I am looking for a suitable marriage partner for myself' },
                    { id: 'marriage_child', label: 'We are looking for a suitable match for our son or daughter' },
                    { id: 'friction', label: 'We experience friction or ongoing challenges in our relationship' },
                    { id: 'legal', label: 'We are dealing with legal disputes, litigation, or property conflicts' }
                  ].map((c) => {
                    const checked = answers.lifeSituations?.includes(c.id);
                    return (
                      <label key={c.id} className="flex items-start gap-2.5 p-3 rounded border border-stone/20 bg-stone/5 text-xs text-midnight cursor-pointer hover:bg-stone/10 transition-colors">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => {
                            const list = answers.lifeSituations || [];
                            const updated = checked 
                              ? list.filter(i => i !== c.id) 
                              : [...list, c.id];
                            setAnswers({ ...answers, lifeSituations: updated });
                          }}
                          className="rounded accent-gold mt-0.5"
                        />
                        <span>{c.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Q3.5b - Child concerns (only when children are present) */}
              {/\d/.test(answers.childrenAges || '') && (
                <div className="space-y-3 pt-4 border-t border-stone/10">
                  <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                    Q3.5b — Are there any concerns about the children in your household you would like the home to support?
                  </label>
                  <p className="font-soehne text-[11px] text-stone">Framed as spatial support for focus and rest, never a promise about a child's performance or behaviour.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'stubborn', label: 'A child is unusually stubborn, restless, or hard to settle' },
                      { id: 'academic', label: 'A child is struggling academically or with concentration' },
                      { id: 'withdrawn', label: 'A child seems low-energy, withdrawn, or unmotivated' }
                    ].map((c) => {
                      const checked = answers.childConcerns?.includes(c.id);
                      return (
                        <label key={c.id} className="flex items-start gap-2.5 p-3 rounded border border-stone/20 bg-stone/5 text-xs text-midnight cursor-pointer hover:bg-stone/10 transition-colors">
                          <input
                            type="checkbox"
                            checked={!!checked}
                            onChange={() => {
                              const list = answers.childConcerns || [];
                              setAnswers({ ...answers, childConcerns: checked ? list.filter(i => i !== c.id) : [...list, c.id] });
                            }}
                            className="rounded accent-gold mt-0.5"
                          />
                          <span>{c.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Q3.6 - Financial Situation */}
              <div className="space-y-3 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q3.6 — How would you describe your household's financial situation over the past 2–3 years?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { val: 'growing', label: 'Growing steadily — income and savings are on track' },
                    { val: 'stable', label: 'Stable — holding ground, no major movement' },
                    { val: 'pressure', label: 'Facing pressure — slow income or unexpected expenses' },
                    { val: 'difficulty', label: 'Significant difficulty — priority concern right now' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, financialSituation: opt.val })}
                      className={`p-3 text-xs text-left border rounded transition-all cursor-pointer ${
                        answers.financialSituation === opt.val
                          ? 'border-midnight bg-midnight text-off-white font-semibold'
                          : 'border-stone/25 bg-white hover:border-gold text-stone'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3.7 - Career situation */}
              <div className="space-y-3 pt-4 border-t border-stone/10">
                <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                  Q3.7 — How would you describe your career, professional, or business situation?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { val: 'progressing', label: 'Progressing well — growth, new opportunities' },
                    { val: 'stable', label: 'Stable and steady — no major shifting' },
                    { val: 'stagnant', label: 'Stagnant — feeling stuck, plateaus, slow' },
                    { val: 'difficult', label: 'Actively difficult — real setbacks, pressure' }
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, careerSituation: opt.val })}
                      className={`p-3 text-xs text-left border rounded transition-all cursor-pointer ${
                        answers.careerSituation === opt.val
                          ? 'border-midnight bg-midnight text-off-white font-semibold'
                          : 'border-stone/25 bg-white hover:border-gold text-stone'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Q3.8 - Tradition (only when Vastu matters) */}
              {(answers.vastuImportance === 'essential' || answers.vastuImportance === 'important') && (
                <div className="space-y-3 pt-4 border-t border-stone/10">
                  <label className="font-soehne text-xs font-bold text-midnight uppercase tracking-wider block">
                    Q3.8 — Do you follow a specific Vastu or astrology tradition?
                  </label>
                  <p className="font-soehne text-[11px] text-stone">HomeDNA's default is the personalised classical school, where the right direction depends on your own chart. If you follow another tradition, your report says where the advice may differ.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { val: 'none', label: 'No particular tradition — whatever the analysis recommends' },
                      { val: 'nagara', label: 'Classical / North Indian (Nagara) Vastu' },
                      { val: 'dravida', label: 'South Indian (Manayadi / Dravida) or a family astrologer\'s guidance' },
                      { val: 'maharishi', label: 'Maharishi Sthapatya Veda / Transcendental Meditation tradition' },
                      { val: 'kp', label: 'KP (Krishnamurti Paddhati) astrology' },
                      { val: 'unsure', label: 'Not sure' }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setAnswers({ ...answers, vastuSchool: opt.val })}
                        className={`p-3 text-xs text-left border rounded transition-all cursor-pointer ${
                          answers.vastuSchool === opt.val
                            ? 'border-midnight bg-midnight text-off-white font-semibold'
                            : 'border-stone/25 bg-white hover:border-gold text-stone'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          <div className="pt-6 border-t border-stone/15 flex justify-between">
            <button
              onClick={() => {
                setStep('adult_profiles');
                setActiveAdultIndex(answers.numAdults - 1);
                setProfileSubTab('lifestyle');
              }}
              className="text-stone hover:text-midnight font-soehne text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> BACK
            </button>
            <button
              onClick={() => setStep('more_details')}
              className="bg-gold hover:bg-gold/90 text-midnight font-soehne text-xs font-bold uppercase tracking-widest py-4 px-10 rounded shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              CONTINUE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // OPTIONAL: TELL US MORE
  if (step === 'more_details') {
    return (
      <MoreDetails
        answers={answers}
        setAnswers={setAnswers}
        onBack={() => setStep('design_intent')}
        onGenerate={() => setStep('calculating')}
      />
    );
  }

  // GENERATING SCREEN (CALCULATING)
  if (step === 'calculating') {
    return (
      <div className="w-full min-h-[90vh] bg-midnight text-off-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none blueprint-grid-dark opacity-10" />
        
        <div className="max-w-md w-full text-center space-y-8 relative z-10">
          <div className="w-24 h-24 rounded-full border-2 border-gold/20 border-t-gold animate-spin flex items-center justify-center mx-auto">
            <Compass className="w-10 h-10 text-gold" />
          </div>

          <div className="space-y-3">
            <h2 className="font-canela text-3xl font-light text-off-white">Synthesizing compatibility variables...</h2>
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gold transition-all duration-300" style={{ width: `${calcProgress}%` }} />
            </div>
            <p className="font-mono text-xs text-gold tracking-widest uppercase h-4">
              {calcMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ERROR SCREEN
  if (step === 'error') {
    return (
      <div className="w-full min-h-[90vh] bg-off-white flex flex-col justify-center items-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <AlertCircle className="w-10 h-10 text-gold mx-auto" />
          <h2 className="font-canela text-3xl font-light text-midnight">We could not finish your profile</h2>
          <p className="font-soehne text-sm text-stone leading-relaxed">{submitError}</p>
          <p className="font-soehne text-xs text-stone">Your answers are still here. Nothing was lost.</p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setStep('more_details')}
              className="text-stone hover:text-midnight font-soehne text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> BACK
            </button>
            <button
              onClick={() => setStep('calculating')}
              className="bg-gold hover:bg-gold/90 text-midnight font-soehne text-xs font-bold uppercase tracking-widest py-3 px-8 rounded shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  // READY SCREEN (shown briefly; the browser is already being sent to the report / checkout)
  return (
    <div className="w-full min-h-[90vh] bg-off-white flex flex-col justify-center items-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <CheckCircle2 className="w-10 h-10 text-gold mx-auto" />
        <h2 className="font-canela text-3xl font-light text-midnight">
          {outcome?.kind === 'checkout' ? 'One step left' : 'Your Compatibility Profile is ready'}
        </h2>
        <p className="font-soehne text-sm text-stone leading-relaxed">
          {outcome?.kind === 'checkout'
            ? 'Taking you to secure checkout. Your report is created as soon as payment is confirmed.'
            : 'Opening your report now. If nothing happens, use the button below.'}
        </p>
        {outcome && (
          <a
            href={outcome.url}
            className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold/90 text-midnight font-soehne text-xs font-bold uppercase tracking-widest py-3 px-8 rounded shadow-md"
          >
            {outcome.kind === 'checkout' ? 'CONTINUE TO CHECKOUT' : 'OPEN MY REPORT'} <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
