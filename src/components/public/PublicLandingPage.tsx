'use client';

import React, { useState } from 'react';
import TopUtilityBar from './TopUtilityBar';
import NavigationHeader from './NavigationHeader';
import HeroBanner from './HeroBanner';
import OverviewSection from './OverviewSection';
import MetricsChallengeSection from './MetricsChallengeSection';
import KeyComponentsSection from './KeyComponentsSection';
import ProcessStepCarousel from './ProcessStepCarousel';
import NationalLabNetworkSection from './NationalLabNetworkSection';
import PublicFooter from './PublicFooter';

interface PublicLandingPageProps {
  onAccessPortal: () => void;
  onReadRules: () => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  isHighContrast: boolean;
  setIsHighContrast: (fn: (prev: boolean) => boolean) => void;
}

export default function PublicLandingPage({
  onAccessPortal,
  onReadRules,
  language,
  setLanguage,
  isHighContrast,
  setIsHighContrast,
}: PublicLandingPageProps) {
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div
      id="main-portal"
      className={`min-h-screen flex flex-col font-sans selection:bg-[#002147] selection:text-white transition-colors ${
        isHighContrast ? 'high-contrast bg-black text-yellow-300' : 'bg-white text-slate-900'
      }`}
    >
      {/* 1. TOP UTILITY BAR (Clean white background, subtle border, Emblem, Accessibility) */}
      <TopUtilityBar
        language={language}
        setLanguage={setLanguage}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        onOpenHelp={() => setShowHelpModal(true)}
      />

      {/* 2. NAVIGATION HEADER ("OIML R-76 Compliance Portal", Nav Links, "Login / Access Portal" Button) */}
      <NavigationHeader
        onAccessPortal={onAccessPortal}
        language={language}
      />

      {/* 3. HERO BANNER (Full-width banner, metrology lab background, bold white text, '01'/'02' sliders) */}
      <HeroBanner
        onAccessPortal={onAccessPortal}
        onReadRules={onReadRules}
      />

      {/* 4. OVERVIEW SECTION (Split layout: Text & CTAs on left, 2x2 Feature Cards Grid on right) */}
      <OverviewSection
        onAccessDashboard={onAccessPortal}
        onReadRules={onReadRules}
      />

      {/* 5. METRICS & CHALLENGE SECTION (3-Card Large Stat Callout Grid: 100%, 75%, Zero) */}
      <MetricsChallengeSection />

      {/* 6. KEY COMPONENTS SECTION (Stacked White Cards with Bullet Points) */}
      <KeyComponentsSection />

      {/* 7. PROCESS / STEP CAROUSEL ("How We Automate Model Approvals" 5-Step Carousel) */}
      <ProcessStepCarousel onAccessDashboard={onAccessPortal} />

      {/* 8. DESIGNATED LEGAL METROLOGY TESTING NETWORK (Split screen: Facility list + Interactive India Map) */}
      <NationalLabNetworkSection onAccessDashboard={onAccessPortal} />

      {/* 9. OFFICIAL GOVERNMENT FOOTER */}
      <PublicFooter onAccessDashboard={onAccessPortal} />

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 rounded-lg p-6 max-w-md w-full shadow-xl space-y-3 font-sans text-xs">
            <h3 className="text-sm font-bold text-[#002147] border-b pb-2">
              National Metrology Helpdesk Assistance
            </h3>
            <p className="text-slate-600 leading-relaxed">
              For technical support on OIML R-76 calculation protocols, pattern approval submission,
              or digital evaluation portal access, contact:
            </p>
            <div className="p-3 bg-slate-50 border rounded font-mono space-y-1 text-[11px] text-slate-800">
              <div>Toll Free: 1800-11-4000</div>
              <div>Direct: +91-11-4560-9212 (NPL Standards)</div>
              <div>Email: legalmetrology-ca@nic.in</div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-1.5 bg-[#002147] text-white font-bold rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
