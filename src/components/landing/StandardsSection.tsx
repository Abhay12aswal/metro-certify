'use client';

import React from 'react';
import { BookOpen, CheckCircle, ExternalLink, ShieldCheck, FileText } from 'lucide-react';

export default function StandardsSection() {
  return (
    <section id="standards" className="py-20 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Regulatory & International Standards Alignment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            100% Deterministic Compliance with International OIML Standards.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            MetroCertify was designed from the ground up around the exact clauses of the International
            Organization of Legal Metrology (OIML) and Indian statutory rules.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: OIML R 76-1:2006 */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  REQUIREMENTS NORM
                </span>
                <span className="text-xs text-slate-500 font-mono">OIML R 76-1</span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                OIML Recommendation R 76-1:2006 (E)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Non-automatic weighing instruments &ndash; Part 1: Metrological and technical
                requirements &ndash; Tests.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 font-mono border-t border-slate-800 pt-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Clause A.4.4.3:</strong> Turning point method formula P = I + 0.5d -
                    &Delta;L.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Table 6:</strong> Maximum permissible errors on initial verification for
                    Class I, II, III, IIII.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Clause 3.5.2:</strong> 2&times; MPE multiplier for In-Service
                    surveillance.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-cyan-400 font-mono flex items-center gap-1">
              <span>Section 3 Metrological Architecture</span>
            </div>
          </div>

          {/* Card 2: OIML R 76-2:2007 */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  REPORT FORMAT
                </span>
                <span className="text-xs text-slate-500 font-mono">OIML R 76-2</span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                OIML Recommendation R 76-2:2007 (E)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Non-automatic weighing instruments &ndash; Part 2: Pattern evaluation test report
                standardized layout.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 font-mono border-t border-slate-800 pt-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Report Layout:</strong> Complete observation data tables with ascending &
                    descending stages.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Dual Sign-off:</strong> Formal signatures for Testing Officer and
                    Approving Authority.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Print Engine:</strong> Clean A4 multi-page document formatting without
                    UI distortion.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-indigo-400 font-mono flex items-center gap-1">
              <span>Section 4 Test Certificate Output</span>
            </div>
          </div>

          {/* Card 3: Legal Metrology (General) Rules, 2011 */}
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  INDIAN STATUTE
                </span>
                <span className="text-xs text-slate-500 font-mono">ACT 2009 / RULES 2011</span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                Legal Metrology Rules, 2011 (India)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Ministry of Consumer Affairs, Food and Public Distribution, Government of India
                statutory standards.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 font-mono border-t border-slate-800 pt-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Eighth Schedule:</strong> Non-Automatic Weighing Instruments technical
                    specifications.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Verification Stamps:</strong> Digital QR verification for field enforcement
                    officers.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>RRSL Network:</strong> Regional Reference Standard Laboratories testing
                    protocols.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <span>National Enforcement Framework</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
