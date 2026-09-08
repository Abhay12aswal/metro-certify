'use client';

import React from 'react';
import {
  Sliders,
  Scale,
  LineChart,
  QrCode,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenQuickDemo: () => void;
}

export default function HowItWorksSection({ onOpenQuickDemo }: HowItWorksSectionProps) {
  const steps = [
    {
      num: '01',
      title: 'Master Data & Environmental Calibration',
      icon: Sliders,
      description:
        'Officer inputs Max, Min, e, and d. MetroCertify calculates verification interval count n = Max/e and validates legal thresholds alongside ambient Temperature, Humidity, and Voltage.',
    },
    {
      num: '02',
      title: 'Loading & Unloading Observation Matrix',
      icon: Scale,
      description:
        'Standard test loads (0, Min, 500e, 1000e, 2000e, Max) are auto-generated. For each point, the officer records indication I and added load ΔL (turning point method).',
    },
    {
      num: '03',
      title: 'Deterministic Calculation & Envelope Plotting',
      icon: LineChart,
      description:
        'The engine computes P, true error E, zero-offset deduction Ec, and plots error curves against dynamic stepped MPE limits. Hysteresis (|Easc - Edesc|) is analyzed in real time.',
    },
    {
      num: '04',
      title: 'Tamper-Evident OIML R 76-2 Certification',
      icon: QrCode,
      description:
        'Instantly generates a formal test certificate with RRSL header, observation tables, dual officer signatures, and a cryptographic SHA-256 QR code for instant field validation.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow & Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            How MetroCertify Operates in Legal Metrology Laboratories.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            From initial bench load application to official certificate issuance in 4 structured,
            standardized steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-cyan-500/40 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-cyan-400/60 group-hover:text-cyan-400 transition">
                      {step.num}
                    </span>
                    <div className="p-2.5 bg-slate-800 border border-slate-700 text-cyan-300 rounded-xl group-hover:bg-cyan-500/20 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>STAGE {idx + 1} OF 4</span>
                  <span className="text-cyan-400 font-semibold">AUTOMATED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenQuickDemo}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-850 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold rounded-xl shadow-lg transition cursor-pointer"
          >
            <span>Launch Interactive 4-Step Verification Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
