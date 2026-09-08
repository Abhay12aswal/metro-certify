'use client';

import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Layers,
  FileCheck2,
  Scale,
  Zap,
  Check,
  X,
} from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Problem Statement & Architectural Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Transforming Legal Metrology from{' '}
            <span className="text-rose-400 line-through">Manual Slip-ups</span> to{' '}
            <span className="text-cyan-400 font-extrabold">Autonomous Precision</span>.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Across India&apos;s Regional Reference Standard Laboratories (RRSLs) and state metrology
            divisions, verifying commercial scales and precision balances has traditionally relied on
            error-prone manual calculations and static paper sheets.
          </p>
        </div>

        {/* Contrast Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Traditional Manual Paradigm */}
          <div className="p-6 sm:p-8 bg-slate-900/40 border border-rose-900/40 rounded-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-400 rounded-xl">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The Legacy Verification Bottleneck</h3>
                <p className="text-xs text-rose-400/80 font-mono">Manual Hand-Calculations & Excel</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-400 font-sans">
              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-rose-950 border border-rose-800 text-rose-400 shrink-0 mt-0.5">
                  <X className="w-3 h-3" />
                </div>
                <span>
                  <strong>Turning Point Arithmetic Errors:</strong> Officers frequently miscalculate{' '}
                  <code className="text-rose-300 font-mono">P = I + 0.5d &minus; &Delta;L</code>{' '}
                  under time pressure at the testing bench.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-rose-950 border border-rose-800 text-rose-400 shrink-0 mt-0.5">
                  <X className="w-3 h-3" />
                </div>
                <span>
                  <strong>Zero-Drift Neglect:</strong> Forgetting to deduct baseline error{' '}
                  <code className="text-rose-300 font-mono">E₀</code> from subsequent test steps,
                  yielding false failure reports.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-rose-950 border border-rose-800 text-rose-400 shrink-0 mt-0.5">
                  <X className="w-3 h-3" />
                </div>
                <span>
                  <strong>MPE Step-Threshold Confusion:</strong> Hand-looking up whether a test load
                  falls into &plusmn;0.5e, &plusmn;1.0e, or &plusmn;1.5e bands for Class I, II, III,
                  or IIII.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-rose-950 border border-rose-800 text-rose-400 shrink-0 mt-0.5">
                  <X className="w-3 h-3" />
                </div>
                <span>
                  <strong>Paper Certificates & Fraud Risks:</strong> Static certificates lack digital
                  signatures or cryptographic verification, enabling counterfeit compliance stamps.
                </span>
              </li>
            </ul>
          </div>

          {/* MetroCertify Solution */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/40 rounded-2xl shadow-xl shadow-cyan-500/5 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-950 border border-cyan-500/50 text-cyan-400 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">The MetroCertify Platform</h3>
                <p className="text-xs text-cyan-400 font-mono">Autonomous Deterministic Execution</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-300 font-sans">
              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong>Automated Turning Point Engine:</strong> Zero-approximation computation of unrounded
                  indications with instant precision rounding guards.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong>Dynamic Multi-Class MPE Engine:</strong> Instant lookup for Class I, II, III,
                  and IIII with toggleable Initial (1x) and In-Service (2x) verification modes.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong>Stepped Error Envelope Visualization:</strong> Interactive Recharts plot with
                  loading/unloading curves, breach markers, and hysteresis metrics.
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <div className="p-1 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 shrink-0 mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span>
                  <strong>Tamper-Evident SHA-256 QR Certificates:</strong> Pixel-perfect OIML R 76-2
                  report generation with instant QR scanning verification for enforcement officers.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* High-Tech Metrological Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">100%</div>
            <div className="text-xs font-semibold text-slate-200 mt-1">OIML R 76-1:2006</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Strict Norm Compliance</div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">4 Classes</div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Class I, II, III, IIII</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">From 0.001mg to 150 Tons</div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-400">5 RRSLs</div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Regional Labs Ready</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">National Metrology Grid</div>
          </div>

          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">SHA-256</div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Tamper-Proof QR</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Instant Field Audit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
