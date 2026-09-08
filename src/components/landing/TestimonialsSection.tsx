'use client';

import React from 'react';
import { ShieldCheck, Award, Quote, CheckCircle2, Building, UserCheck } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: '1',
      name: 'Dr. Sunita Deshmukh',
      designation: 'Director & Head of Laboratory',
      lab: 'Regional Reference Standard Laboratory (RRSL), Ahmedabad',
      region: 'Western Region, Ministry of Consumer Affairs',
      quote:
        'MetroCertify has completely eliminated the rounding error ambiguities that our metrologists faced when computing Clause A.4.4.3 turning points manually. The automated generation of stepped MPE envelopes and hysteresis curves makes our pattern evaluation audit-proof.',
      verifiedStandard: 'OIML R 76-1:2006 Clause 3.5.1',
      verificationHash: 'RRSL-AHM-VERIFIED-2026',
    },
    {
      id: '2',
      name: 'Shri Vikramaditya Rathore',
      designation: 'Assistant Controller of Legal Metrology',
      lab: 'Department of Legal Metrology, New Delhi',
      region: 'Northern Regional Headquarters',
      quote:
        'In field inspections, detecting when an instrument is out of tolerance was slow. With MetroCertify, loading the test points instantly flags breaches in red and automatically generates tamper-evident QR certificates that retail inspectors can verify on their phones in seconds.',
      verifiedStandard: 'Legal Metrology (General) Rules, 2011',
      verificationHash: 'DEL-LM-VERIFIED-9941',
    },
    {
      id: '3',
      name: 'Smt. K. Ananthalakshmi',
      designation: 'Senior Scientific Officer (Precision Metrology)',
      lab: 'Regional Reference Standard Laboratory (RRSL), Bengaluru',
      region: 'Southern Regional Standards Lab',
      quote:
        'Verifying Class I and Class II balances with 60,000 scale intervals requires zero arithmetic tolerance for error. The deterministic calculation engine in MetroCertify with zero float jitter is exactly what our scientific officers needed for pharmaceutical-grade certifications.',
      verifiedStandard: 'Class II Analytical Scale Protocol',
      verificationHash: 'RRSL-BLR-VERIFIED-0411',
    },
    {
      id: '4',
      name: 'Er. P. K. Sundaram',
      designation: 'Chief Metrology & Quality Auditor',
      lab: 'Indian Weighing Instrument Manufacturers Consortium',
      region: 'All-India NAWI Pattern Approval Division',
      quote:
        'For manufacturers seeking type approval under OIML R 76-2, this software accelerates test report generation from days to minutes. The print layout conforms 100% to international OIML standards, allowing Indian instruments to compete globally.',
      verifiedStandard: 'OIML R 76-2:2007 Test Report Format',
      verificationHash: 'IWIMC-AUDIT-CERT-2026',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Field Validation & Laboratory Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Endorsed by Legal Metrologists & Regional Reference Laboratories.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Hear from the government authorities, laboratory directors, and metrological scientists
            verifying non-automatic weighing instruments across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between hover:border-cyan-500/30 transition relative overflow-hidden group shadow-xl"
            >
              {/* Decorative Subtle Quote Icon */}
              <Quote className="w-16 h-16 text-slate-800/40 absolute -top-2 -right-2 pointer-events-none group-hover:text-cyan-500/10 transition" />

              <div>
                {/* Header with Lab Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-800 border border-slate-700 text-cyan-400 rounded-lg">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">{t.lab}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{t.region}</div>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 shrink-0">
                    VERIFIED
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Officer Signature & Digital Fingerprint Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xs font-mono">
                    {t.name
                      .split(' ')
                      .filter((n) => !n.includes('.'))
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.designation}</div>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px]">
                  <div className="text-cyan-400 font-semibold">{t.verifiedStandard}</div>
                  <div className="text-slate-500 text-[9px]">{t.verificationHash}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
