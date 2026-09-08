'use client';

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface HeroBannerProps {
  onAccessPortal: () => void;
  onReadRules: () => void;
}

export default function HeroBanner({ onAccessPortal, onReadRules }: HeroBannerProps) {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slides = [
    {
      id: '01',
      badge: 'National Legal Metrology Evaluation Standard',
      heading: 'Automated Metrology & OIML R-76 Type Approval',
      subheading:
        'Zero-Error Testing | Automated Permissible Error Calculation | Instant PDF/Word Reports',
      description:
        'Official digital platform under the Department of Consumer Affairs for pattern evaluation, verification scale interval (e) division verification, and statutory model approval of Non-Automatic Weighing Instruments.',
    },
    {
      id: '02',
      badge: 'Clause A.4.4.3 & Table 6 Engine',
      heading: 'Deterministic Turning Point & Tolerance Analysis',
      subheading:
        'Zero Rounding Drift | Dynamic Multi-Tier MPE Step Envelopes | Audit-Proof Testing',
      description:
        'Eliminates manual arithmetic approximations in turning point calculations (P = I + 0.5d - ΔL) across CSIR-NPL and Regional Reference Standard Laboratories (RRSLs) in India.',
    },
  ];

  const current = slides[activeSlide];

  return (
    <section className="relative overflow-hidden bg-[#001D3D] text-white min-h-[460px] flex items-center">
      {/* High-Resolution Laboratory & Metrology Scale Background Styling with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-25 mix-blend-luminosity"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(11, 60, 93, 0.95), rgba(0, 33, 71, 0.98)), url("https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80")',
        }}
      />

      {/* Subtle Engineering Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="max-w-3xl space-y-5">
          {/* Government Standard Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A3A60]/80 border border-blue-400/40 text-blue-200 text-xs font-sans uppercase font-bold tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{current.badge}</span>
          </div>

          {/* Main Heading: Bold White Sans-serif */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-white leading-tight">
            {current.heading}
          </h1>

          {/* Subheading */}
          <div className="text-xs sm:text-sm font-mono text-amber-300 font-bold tracking-wide">
            {current.subheading}
          </div>

          {/* Description Paragraph */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans max-w-2xl">
            {current.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onAccessPortal}
              className="flex items-center gap-2 px-5 py-3 bg-[#FF9933] hover:bg-[#E68A00] text-[#002147] font-black text-xs uppercase tracking-wider rounded shadow-sm transition hover:shadow cursor-pointer"
            >
              <span>Access Evaluation Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onReadRules}
              className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-bold text-xs rounded transition cursor-pointer"
            >
              <span>Read OIML R-76 Rules</span>
            </button>
          </div>
        </div>

        {/* Bottom Right Minimal Slide Indicators ('01', '02') */}
        <div className="absolute bottom-6 right-6 flex items-center gap-3 font-mono text-xs z-10">
          <button
            onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
            className="p-1.5 rounded bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white transition cursor-pointer"
            title="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSlide(idx)}
                className={`px-2 py-0.5 rounded text-xs font-bold font-mono transition cursor-pointer ${
                  activeSlide === idx
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'text-slate-300 bg-white/10 hover:bg-white/20'
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveSlide((prev) => (prev === 1 ? 0 : 1))}
            className="p-1.5 rounded bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white transition cursor-pointer"
            title="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
