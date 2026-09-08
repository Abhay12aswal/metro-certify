'use client';

import React, { useState } from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import FeaturesSection from './FeaturesSection';
import LiveSimulatorSection from './LiveSimulatorSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import StandardsSection from './StandardsSection';
import LandingFooter from './LandingFooter';
import LoginModal from '../auth/LoginModal';

interface LandingPageProps {
  onLoginSuccess: (user: { name: string; designation: string; lab: string }) => void;
}

export default function LandingPage({ onLoginSuccess }: LandingPageProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleQuickDemo = () => {
    onLoginSuccess({
      name: 'Er. Rajesh Kumar Sharma',
      designation: 'Senior Metrological Officer (Legal Metrology)',
      lab: 'RRSL Ahmedabad (Western Region)',
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* High-Tech Sticky Glass Navbar */}
      <LandingNavbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuickDemo={handleQuickDemo}
      />

      {/* Hero Section with Interactive HUD Telemetry */}
      <HeroSection
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuickDemo={handleQuickDemo}
      />

      {/* About Project & The Metrology Problem */}
      <AboutSection />

      {/* 6 Specialized Engineering Modules */}
      <FeaturesSection onOpenQuickDemo={handleQuickDemo} />

      {/* Interactive Live Formula Simulator Console */}
      <LiveSimulatorSection onOpenQuickDemo={handleQuickDemo} />

      {/* 4-Step Verification Workflow */}
      <HowItWorksSection onOpenQuickDemo={handleQuickDemo} />

      {/* Field Endorsements & Metrologist Testimonials */}
      <TestimonialsSection />

      {/* Regulatory Standards Matrix */}
      <StandardsSection />

      {/* High-Tech Footer with RRSL Nodes */}
      <LandingFooter
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenQuickDemo={handleQuickDemo}
      />

      {/* Officer Authentication Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
}
