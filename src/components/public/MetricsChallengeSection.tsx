'use client';

import React from 'react';
import { CheckCircle2, Clock, FileSpreadsheet, ShieldCheck } from 'lucide-react';

export default function MetricsChallengeSection() {
  const metrics = [
    {
      stat: '100%',
      title: 'Calculation Accuracy',
      subtitle: 'Zero manual arithmetic errors',
      description:
        'Eliminates human transposition and rounding drift in Clause A.4.4.3 turning point formulas and zero-offset deductions.',
      icon: CheckCircle2,
      color: 'text-[#15803D]',
    },
    {
      stat: '75%',
      title: 'Time Saved',
      subtitle: 'Reduction in report drafting cycles',
      description:
        'Cuts observation recording, curve plotting, and official sign-off generation from hours to minutes per instrument.',
      icon: Clock,
      color: 'text-[#0B3C5D]',
    },
    {
      stat: 'Zero',
      title: 'Template Inconsistency',
      subtitle: 'Uniform reports across all labs',
      description:
        'Standardizes test evaluation certificates across CSIR-NPL and all 5 Regional Reference Standard Laboratories nationwide.',
      icon: ShieldCheck,
      color: 'text-[#002147]',
    },
  ];

  return (
    <section id="challenges" className="py-16 bg-[#F8FAFC] border-b border-slate-200 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Centered Heading & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147]">
            Benchmarking Impact // Legal Metrology
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
            The Manual Metrology Testing Challenge
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Traditional spreadsheet-based laboratory evaluations are susceptible to transcription
            slips, inconsistent MPE threshold lookups, and formatting discrepancies across state
            verification units.
          </p>
        </div>

        {/* 3 Large Stat / Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm hover:shadow-md transition text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#002147]">
                  <Icon className="w-6 h-6 text-[#002147]" />
                </div>

                <div className={`text-4xl sm:text-5xl font-black tracking-tight font-sans ${m.color}`}>
                  {m.stat}
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#002147]">
                    {m.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 font-mono mt-0.5">
                    ({m.subtitle})
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-sans pt-1">
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
