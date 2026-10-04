import React, { useState, useEffect } from 'react';
import { ActiveView, AssessmentAnswers, createDefaultAdultProfile, createDefaultHomeDetails } from './types';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Science from './pages/Science';
import SampleProfile from './pages/SampleProfile';
import About from './pages/About';
import Start from './pages/Start';

const initialAnswers: AssessmentAnswers = {
  numAdults: 1,
  householdType: 'couple',
  primaryResident: 'me',
  childrenAges: '',
  adults: [createDefaultAdultProfile('adult-0', '', 'Primary Resident')],
  
  vastuImportance: 'important',
  homeIntent: '',
  propertyType: 'flat',
  householdHealthSupport: [],
  lifeSituations: [],
  financialSituation: 'stable',
  careerSituation: 'stable',
  childConcerns: [],
  vastuSchool: 'none',
  home: createDefaultHomeDetails(),

  firstName: '',
  email: '',
  dob: '',
  ceilingPreference: 'High (10ft+)',
  lightPreference: 'Morning Essential',
  entrancePreference: 'North-East',
  opennessPreference: 'Defined Rooms',
  socialStyle: 'hosting',
  materialTexture: 'organic',
  workspaceNeed: 'quiet',
  householdSize: 'individual',
  
  tipiExtraverted: 4,
  tipiCritical: 4,
  tipiDependable: 4,
  tipiAnxious: 4,
  tipiOpen: 4,
  tipiReserved: 4,
  tipiSympathetic: 4,
  tipiDisorganized: 4,
  tipiCalm: 4,
  tipiConventional: 4
};

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers);

  // Smooth scroll reset on view transitions
  const navigateToView = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Synchronize hash routing for convenient development preview and user navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      const validViews: ActiveView[] = ['home', 'how-it-works', 'science', 'sample-profile', 'about', 'start', 'result'];
      if (validViews.includes(hash as ActiveView)) {
        setActiveView(hash as ActiveView);
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL hash without breaking page re-renders
  const handleNavigate = (view: ActiveView) => {
    window.location.hash = `#/${view}`;
    navigateToView(view);
  };

  // Determine if we should hide header/footer (during active Compatibility Assessment questions for zero distractions)
  const isQuestionnaireActive = activeView === 'start';

  return (
    <div id="homedna-app" className="min-h-screen bg-off-white flex flex-col justify-between font-soehne text-midnight selection:bg-gold/35 antialiased">
      {/* Scroll-Reactive Desktop & Mobile Header */}
      {!isQuestionnaireActive && (
        <Header currentView={activeView} onNavigate={handleNavigate} />
      )}

      {/* Main View Container */}
      <main id="app-main-content" className="flex-grow w-full">
        {activeView === 'home' && (
          <Home onNavigate={handleNavigate} answers={answers} setAnswers={setAnswers} />
        )}
        {activeView === 'how-it-works' && (
          <HowItWorks onNavigate={handleNavigate} />
        )}
        {activeView === 'science' && (
          <Science />
        )}
        {activeView === 'sample-profile' && (
          <SampleProfile onNavigate={handleNavigate} />
        )}
        {activeView === 'about' && (
          <About />
        )}
        {activeView === 'start' && (
          <Start onNavigate={handleNavigate} answers={answers} setAnswers={setAnswers} />
        )}
      </main>

      {/* Footer Element */}
      {!isQuestionnaireActive && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
