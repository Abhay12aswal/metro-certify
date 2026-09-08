'use client';

import React from 'react';
import {
  Cpu,
  ShieldAlert,
  FileCheck,
  Archive,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface OverviewSectionProps {
  onAccessDashboard: () => void;
  onReadRules: () => void;
}

export default function OverviewSection({
  onAccessDashboard,
  onReadRules,
}: OverviewSectionProps) {
  const features = [
    {
      title: 'Automated MPE Engine',
      description:
        'Auto-calculates maximum permissible errors across Class I, II, III, and IIII weighing instruments strictly adhering to Table 6 thresholds.',
      icon: Cpu,
    },
    {
      title: 'Real-Time Input Validation',
      description:
        'Catches erroneous readings and calculation discrepancies instantly during the turning point small load addition method (Clause A.4.4.3).',
      icon: ShieldAlert,
    },
    {
      title: 'One-Click PDF/DOCX Reports',
      description:
        'Generates standardized, print-ready OIML R 76-2 pattern approval test certificates with dual signatures and cryptographic QR codes.',
      icon: FileCheck,
    },
    {
      title: 'Digital Repository & Audit Trail',
      description:
        'Centralized, searchable historical repository of evaluations conducted across CSIR-NPL and Regional Reference Standard Laboratories.',
      icon: Archive,
    },
  ];

  return (
    <section id="overview" className="py-16 bg-white border-b border-slate-200 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Overview Statement & CTAs */}
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147]">
              Section // 01
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
              Overview
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              The <strong>OIML R-76 Compliance Portal</strong> is the designated digital platform
              mandated by the Department of Consumer Affairs for standardizing the model approval
              and type evaluation of Non-Automatic Weighing Instruments (NAWI) across India.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              By replacing legacy spreadsheet calculations with an automated deterministic rules
              engine, the system guarantees 100% compliance with international OIML R-76 recommendations
              and the Legal Metrology Act, 2009.
            </p>

            {/* Two Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onAccessDashboard}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#002147] hover:bg-[#0B3C5D] text-white text-xs font-bold rounded shadow-xs transition hover:shadow cursor-pointer"
              >
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onReadRules}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-[#002147] text-[#002147] text-xs font-bold rounded transition cursor-pointer"
              >
                <span>Read Rules</span>
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div id="features" className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-200 space-y-2.5"
                  >
                    <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-[#002147]">
                      <Icon className="w-5 h-5 text-[#002147]" />
                    </div>

                    <h3 className="text-sm font-bold text-[#002147] font-sans">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
