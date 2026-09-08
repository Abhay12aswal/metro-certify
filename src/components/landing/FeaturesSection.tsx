'use client';

import React from 'react';
import {
  Sliders,
  Cpu,
  Table,
  LineChart,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Shield,
  Activity,
  Layers,
} from 'lucide-react';

interface FeaturesSectionProps {
  onOpenQuickDemo: () => void;
}

export default function FeaturesSection({ onOpenQuickDemo }: FeaturesSectionProps) {
  const modules = [
    {
      id: '01',
      title: 'Module 1: Instrument & Environmental Master Registry',
      badge: 'Clause 3.9 & Table 3',
      icon: Sliders,
      color: 'from-blue-500 to-cyan-500',
      description:
        'Registers instrument parameters (Max, Min, e, d) and auto-computes verification scale divisions n = Max/e with legal norm limit checks. Tracks ambient Temperature, Humidity, and Voltage.',
      features: [
        'Dynamic Scale Interval Count n = Max/e',
        'Accuracy Class selector (Class I to IIII)',
        'Ambient condition thresholds (10°C to 40°C)',
        'Initial vs In-Service verification toggle',
      ],
    },
    {
      id: '02',
      title: 'Module 2: Deterministic OIML Calculation Engine',
      badge: 'Clause A.4.4.3 & Table 6',
      icon: Cpu,
      color: 'from-cyan-500 to-teal-500',
      description:
        'Precision mathematical pipeline evaluating turning point indication P, true error E, zero-offset deduction E0, and dynamic stepped MPE tolerance lookup without rounding jitter.',
      features: [
        'P = I + 0.5d - ΔL turning point method',
        'E = P - L and Ec = E - E0 formulas',
        'Multi-tier stepped limits (±0.5e, ±1.0e, ±1.5e)',
        'Epsilon-guarded compliance comparison',
      ],
    },
    {
      id: '03',
      title: 'Module 3: Dual-Cycle Test Observation Matrix',
      badge: 'Clause A.4.4 & R 76-2',
      icon: Table,
      color: 'from-teal-500 to-emerald-500',
      description:
        'Interactive spreadsheet matrix capturing both Ascending (Loading) and Descending (Unloading) runs with real-time recalculation, inline row addition, and 1-click standard steps generator.',
      features: [
        'Ascending & Descending load sequence support',
        '1-Click "Generate Standard Steps" (0, Min, 500e, Max)',
        'Live pass/fail compliance badge per row',
        'Instant zero baseline error E0 determination',
      ],
    },
    {
      id: '04',
      title: 'Module 4: Dynamic Error Curve Visualizer',
      badge: 'Recharts Envelope',
      icon: LineChart,
      color: 'from-indigo-500 to-blue-500',
      description:
        'Recharts visualization plotting Corrected Error (Ec) curves against stepped upper and lower MPE limits. Automatically highlights out-of-tolerance breaches in pulsing red.',
      features: [
        'Continuous stepped ±MPE envelope boundaries',
        'Ascending (green) and Descending (blue) curves',
        'Interactive tooltips with margin details',
        'Real-time Hysteresis difference (|Easc - Edesc|)',
      ],
    },
    {
      id: '05',
      title: 'Module 5: Official OIML R 76-2 Report & Print Engine',
      badge: 'OIML R 76-2:2007 (E)',
      icon: FileCheck2,
      color: 'from-purple-500 to-indigo-500',
      description:
        'Generates formal pattern evaluation test certificates formatted to OIML R 76-2 layout with Government of India header, observation tables, dual signatures, and QR verification.',
      features: [
        'Govt of India / RRSL official certificate format',
        'Dual sign-off (Testing Officer & Approving Metrologist)',
        'Tamper-evident SHA-256 cryptographic QR code',
        'Optimized A4 print stylesheet (@media print)',
      ],
    },
    {
      id: '06',
      title: 'Module 6: Quick Demo Presets for Evaluators',
      badge: '1-Click Presets',
      icon: Sparkles,
      color: 'from-emerald-500 to-cyan-500',
      description:
        'Allows hackathon judges and metrologists to instantly load authentic compliance runs: Class III 15kg retail scale, Class II 600g precision analytical balance, or an out-of-tolerance defect audit scale.',
      features: [
        'Preset 1: Class III 15kg Retail Scale (Compliant)',
        'Preset 2: Class II 600g Analytical Balance (Compliant)',
        'Preset 3: Class III 30kg Scale (Defect / Audit Failure)',
        'Instant chart and report population under 5 seconds',
      ],
    },
  ];

  return (
    <section id="modules" className="py-20 bg-slate-950 border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture & Functional Specifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            6 Specialized Metrology Modules Engineered for Legal Precision.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Every module in MetroCertify is built to directly reflect the requirements of OIML
            Recommendation R 76-1 (Requirements) and R 76-2 (Test Report Format).
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="group relative p-6 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-2xl transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Pill & Module Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${m.color} text-slate-950 shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                      {m.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition mb-2">
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                    {m.description}
                  </p>

                  {/* Features Bullet List */}
                  <div className="space-y-2 border-t border-slate-800/80 pt-3">
                    {m.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[11px] text-slate-300 font-mono"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>METROLOGICAL SUB-SYSTEM {m.id}</span>
                  <button
                    onClick={onOpenQuickDemo}
                    className="hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
