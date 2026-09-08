'use client';

import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Sliders,
  CheckCircle2,
  Terminal,
  Cpu,
  Fingerprint,
} from 'lucide-react';
import { roundTo } from '../../lib/oiml-engine';

interface HeroSectionProps {
  onOpenLogin: () => void;
  onOpenQuickDemo: () => void;
}

export default function HeroSection({
  onOpenLogin,
  onOpenQuickDemo,
}: HeroSectionProps) {
  // Interactive Hero Telemetry Simulator State
  const [heroLoad, setHeroLoad] = useState<number>(10.0);
  const [heroDeltaL, setHeroDeltaL] = useState<number>(0.0035);
  const e = 0.005; // 5g division
  const d = 0.005;

  // Real-time calculation on Hero HUD
  const indication = heroLoad;
  const turningPointP = roundTo(indication + 0.5 * d - heroDeltaL, 4);
  const trueErrorE = roundTo(turningPointP - heroLoad, 4);
  const zeroErrorE0 = 0.0005;
  const correctedErrorEc = roundTo(trueErrorE - zeroErrorE0, 4);
  const errorInDivisions = roundTo(correctedErrorEc / e, 2);
  const mpeDivisions = heroLoad <= 2.5 ? 0.5 : heroLoad <= 10.0 ? 1.0 : 1.5;
  const isCompliant = Math.abs(errorInDivisions) <= mpeDivisions;

  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-24 border-b border-slate-800">
      {/* High-Tech Background Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-inner shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>LEGAL METROLOGY DIVISION &bull; MINISTRY OF CONSUMER AFFAIRS</span>
            </div>

            {/* Kinetic Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Autonomous Verification for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Non-Automatic
              </span>{' '}
              Weighing Instruments.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans">
              MetroCertify automates the rigorous testing, turning point calculations, dynamic MPE
              envelope plotting, and official certificate generation for trade balances and
              analytical scales in strict compliance with <strong>OIML R 76-1:2006</strong> and{' '}
              <strong>OIML R 76-2:2007</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQuickDemo}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Launch Demo Terminal (Instant)</span>
              </button>

              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-700 hover:border-cyan-500/50 text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Officer Secure Sign In</span>
              </button>

              <a
                href="#simulator"
                className="px-4 py-3.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
              >
                <span>Explore Live Formula Engine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Key Micro-Badges */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-slate-400">
              <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-white font-bold text-sm">Clause A.4.4.3</div>
                <div className="text-[10px] text-slate-400">Turning Point Engine</div>
              </div>
              <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-emerald-400 font-bold text-sm">Class I &ndash; IIII</div>
                <div className="text-[10px] text-slate-400">Dynamic MPE Tables</div>
              </div>
              <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-cyan-400 font-bold text-sm">SHA-256 Stamp</div>
                <div className="text-[10px] text-slate-400">Tamper-Proof QR</div>
              </div>
              <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg">
                <div className="text-indigo-400 font-bold text-sm">85% Faster</div>
                <div className="text-[10px] text-slate-400">RRSL Verification</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Telemetry HUD (Interactive Simulator Widget) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              {/* Header Telemetry Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>LIVE SENSOR TELEMETRY</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  CLASS III &bull; e = 5g
                </span>
              </div>

              {/* Digital Load Cell Display */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center mb-4 relative overflow-hidden">
                <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                  Load Receptor Display (I)
                </div>
                <div className="text-4xl font-black font-mono tracking-wider text-emerald-400 my-1">
                  {indication.toFixed(3)}{' '}
                  <span className="text-xs font-normal text-slate-400">kg</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Scale Division: d = 0.005 kg &bull; Scale Intervals: {Math.round(heroLoad / e)} e
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="space-y-3.5 mb-5 font-mono text-xs">
                {/* Applied Load Slider */}
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span>Applied Certified Load (L):</span>
                    <span className="text-white font-bold">{heroLoad.toFixed(2)} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="0.5"
                    value={heroLoad}
                    onChange={(e) => setHeroLoad(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Added Weight Slider */}
                <div>
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-cyan-300">Added Load (&Delta;L weights):</span>
                    <span className="text-cyan-300 font-bold">
                      {(heroDeltaL * 1000).toFixed(1)} g ({heroDeltaL.toFixed(4)} kg)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.005"
                    step="0.0005"
                    value={heroDeltaL}
                    onChange={(e) => setHeroDeltaL(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Auto-Calculated Metrological Telemetry Output */}
              <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl font-mono text-xs mb-4">
                <div>
                  <div className="text-[10px] text-slate-500">Turning Point (P)</div>
                  <div className="text-slate-200 font-bold text-sm">
                    {turningPointP.toFixed(4)} kg
                  </div>
                  <div className="text-[9px] text-slate-500">P = I + 0.5d - &Delta;L</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500">Corrected Error (Ec)</div>
                  <div
                    className={`font-black text-sm ${
                      isCompliant ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {errorInDivisions > 0 ? `+${errorInDivisions}` : errorInDivisions} e
                  </div>
                  <div className="text-[9px] text-slate-500">Limit: &plusmn;{mpeDivisions}e</div>
                </div>
              </div>

              {/* Live Compliance Verdict Banner */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono font-bold transition ${
                  isCompliant
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-300 animate-pulse'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      isCompliant ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  />
                  <span>
                    STATUS: {isCompliant ? 'PASS (WITHIN MPE)' : 'FAIL (MPE EXCEEDED)'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 uppercase">
                  OIML R 76-1:2006
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
