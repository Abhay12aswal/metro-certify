'use client';

import React from 'react';
import { Cpu, UserCheck, Layers, CheckCircle2 } from 'lucide-react';

export default function KeyComponentsSection() {
  const components = [
    {
      title: 'Automated Rules Engine (OIML R-76 Logic)',
      subtitle: 'Deterministic Metrological Computation',
      icon: Cpu,
      bullets: [
        'Deterministic calculation of indication before rounding via small added load method (P = I + 0.5d - ΔL as per Clause A.4.4.3).',
        'Dynamic stepped Maximum Permissible Error (MPE) envelope lookup for Class I, II, III, and IIII scales (Table 6).',
        'Continuous zero-load baseline offset deduction (Ec = E - E0) and live hysteresis divergence tracking.',
        'Initial Verification (1x MPE) and In-Service Surveillance (2x MPE Clause 3.5.2) dynamic multipliers.',
      ],
    },
    {
      title: 'Role-Based Access & Digital Signatures',
      subtitle: 'Statutory Accountability & Verification Hierarchy',
      icon: UserCheck,
      bullets: [
        'Strict role separation between Laboratory Testing Technicians, Senior Metrologists, and Laboratory Directors.',
        'Dual sign-off blocks requiring both the Testing Metrologist signature and Director approval mark.',
        'Client-side cryptographic SHA-256 digital digest generation embedding serial numbers, test dates, and approval hashes.',
        'Tamper-evident verification QR code stamped on all generated OIML R 76-2 certificates for field inspector audits.',
      ],
    },
    {
      title: 'Modular Rules Architecture',
      subtitle: 'Future-Proof Indian Metrology Standards',
      icon: Layers,
      bullets: [
        'Isolated metrological rules pipeline allowing seamless updates when international OIML recommendations revise.',
        'Full compatibility with the Legal Metrology (General) Rules, 2011 Eighth Schedule specifications for India.',
        'Extensible modules supporting Non-Automatic Weighing Instruments (NAWI) and future Automatic Weighing Instruments (AWI).',
        'Zero vendor lock-in with standard JSON and print-optimized PDF export capability.',
      ],
    },
  ];

  return (
    <section id="components" className="py-16 bg-white border-b border-slate-200 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147]">
            Technical Foundation // Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
            Key Components of OIML Compliance Platform
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Engineered to deliver high laboratory throughput while maintaining absolute fidelity to
            OIML metrological regulations.
          </p>
        </div>

        {/* Vertical Stack of Clean White Cards with Subtle Drop Shadows */}
        <div className="max-w-4xl mx-auto space-y-5">
          {components.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-[#002147] shrink-0">
                    <Icon className="w-6 h-6 text-[#002147]" />
                  </div>

                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#002147]">
                        {comp.title}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium font-mono">
                        {comp.subtitle}
                      </div>
                    </div>

                    <ul className="space-y-2 pt-1 border-t border-slate-100">
                      {comp.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
