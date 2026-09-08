'use client';

import React, { useState } from 'react';
import {
  Activity,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { AccuracyClass } from '../../types/metrology';
import {
  calculateTurningPointP,
  calculateTrueError,
  calculateCorrectedError,
  getMPEInDivisions,
  checkCompliance,
  roundTo,
} from '../../lib/oiml-engine';

interface LiveSimulatorSectionProps {
  onOpenQuickDemo: () => void;
}

export default function LiveSimulatorSection({ onOpenQuickDemo }: LiveSimulatorSectionProps) {
  const [accuracyClass, setAccuracyClass] = useState<AccuracyClass>('class_III');
  const [load, setLoad] = useState<number>(10.0); // 10kg
  const [deltaL, setDeltaL] = useState<number>(0.0035); // 3.5g
  const [zeroOffsetE0, setZeroOffsetE0] = useState<number>(0.0005); // 0.5g

  // Class parameters
  const e = accuracyClass === 'class_II' ? 0.01 : 0.005;
  const d = e;
  const unit = accuracyClass === 'class_II' ? 'g' : 'kg';
  const indication = load; // simulated display reading

  // Computations
  const turningPointP = calculateTurningPointP(indication, d, deltaL);
  const trueErrorE = calculateTrueError(turningPointP, load);
  const correctedErrorEc = calculateCorrectedError(trueErrorE, zeroOffsetE0);
  const loadDivisions = roundTo(load / e, 1);
  const ecDivisions = roundTo(correctedErrorEc / e, 2);
  const mpeDivisions = getMPEInDivisions(accuracyClass, loadDivisions, 'initial');
  const isCompliant = checkCompliance(ecDivisions, mpeDivisions);

  return (
    <section id="simulator" className="py-20 bg-slate-950 border-b border-slate-800 text-slate-100 relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800/60 text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Formula Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Test the Metrological Engine Live Before Signing In.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Experience real-time turning point calculations ($P = I + 0.5d - \Delta L$), zero error
            deduction ($E_c = E - E_0$), and dynamic multi-tier MPE limits dynamically.
          </p>
        </div>

        {/* The Interactive High-Tech Simulator Console */}
        <div className="max-w-4xl mx-auto bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10">
          {/* Top Telemetry Header */}
          <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>OIML R 76-1 CALCULATION CORE (DETERMINISTIC)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Class:</span>
              <select
                value={accuracyClass}
                onChange={(e) => setAccuracyClass(e.target.value as AccuracyClass)}
                className="bg-slate-950 border border-slate-700 text-slate-100 text-xs px-2.5 py-1 rounded-lg focus:border-cyan-400 outline-hidden font-mono"
              >
                <option value="class_I">Class I (Special)</option>
                <option value="class_II">Class II (High)</option>
                <option value="class_III">Class III (Medium / Trade)</option>
                <option value="class_IIII">Class IIII (Ordinary)</option>
              </select>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 font-mono text-xs">
            {/* Slider 1: Applied Load L */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span>Applied Load (L):</span>
                <span className="text-white font-bold text-sm">
                  {load.toFixed(3)} {unit}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max={accuracyClass === 'class_II' ? 600 : 15}
                step={accuracyClass === 'class_II' ? 5 : 0.5}
                value={load}
                onChange={(e) => setLoad(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="mt-2 text-[10px] text-slate-500">
                Load in divisions: {loadDivisions.toLocaleString()} e
              </div>
            </div>

            {/* Slider 2: Small Added Weight ΔL */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-cyan-300 mb-2">
                <span>Added Load (&Delta;L):</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {(deltaL * 1000).toFixed(1)} {accuracyClass === 'class_II' ? 'mg' : 'g'}
                </span>
              </div>
              <input
                type="range"
                min="0.0001"
                max={d}
                step={d / 20}
                value={deltaL}
                onChange={(e) => setDeltaL(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="mt-2 text-[10px] text-slate-500">
                Weight added until I steps to I + d
              </div>
            </div>

            {/* Slider 3: Zero Baseline Error E0 */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-indigo-300 mb-2">
                <span>Zero Baseline (E₀):</span>
                <span className="text-indigo-300 font-bold text-sm">
                  {zeroOffsetE0 > 0 ? `+${zeroOffsetE0}` : zeroOffsetE0} {unit}
                </span>
              </div>
              <input
                type="range"
                min="-0.002"
                max="0.002"
                step="0.0002"
                value={zeroOffsetE0}
                onChange={(e) => setZeroOffsetE0(parseFloat(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
              <div className="mt-2 text-[10px] text-slate-500">
                Baseline error at L = 0 (Clause A.4.4.3)
              </div>
            </div>
          </div>

          {/* Real-Time Formula Breakdown Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-slate-950/80 border border-slate-800 rounded-xl font-mono mb-6">
            <div>
              <span className="text-[10px] text-slate-500 block">Indication P</span>
              <span className="text-base font-black text-slate-100">
                {turningPointP.toFixed(4)} {unit}
              </span>
              <span className="text-[9px] text-slate-500 block">P = I + 0.5d &minus; &Delta;L</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 block">True Error E</span>
              <span className="text-base font-black text-slate-100">
                {trueErrorE > 0 ? `+${trueErrorE.toFixed(4)}` : trueErrorE.toFixed(4)} {unit}
              </span>
              <span className="text-[9px] text-slate-500 block">E = P &minus; L</span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 block">Corrected Error E<sub>c</sub></span>
              <span
                className={`text-base font-black ${
                  isCompliant ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {ecDivisions > 0 ? `+${ecDivisions}` : ecDivisions} e
              </span>
              <span className="text-[9px] text-slate-500 block">
                E<sub>c</sub> = E &minus; E₀ ({correctedErrorEc.toFixed(4)} {unit})
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 block">Max Permissible Error</span>
              <span className="text-base font-black text-amber-400">
                &plusmn;{mpeDivisions.toFixed(1)} e
              </span>
              <span className="text-[9px] text-slate-500 block">
                {loadDivisions <= 500
                  ? '0-500e: ±0.5e'
                  : loadDivisions <= 2000
                  ? '500-2000e: ±1.0e'
                  : '>2000e: ±1.5e'}
              </span>
            </div>
          </div>

          {/* Status Verdict Pill & Launch Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isCompliant
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {isCompliant ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 animate-bounce" />
                )}
              </div>
              <div>
                <div
                  className={`text-sm font-bold font-mono ${
                    isCompliant ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  {isCompliant
                    ? 'COMPLIANT: POINT PASSES OIML R 76-1'
                    : 'NON-COMPLIANT: ERROR EXCEEDS MPE ENVELOPE'}
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  Margin:{' '}
                  {isCompliant
                    ? `${(mpeDivisions - Math.abs(ecDivisions)).toFixed(2)}e remaining inside tolerance.`
                    : `${(Math.abs(ecDivisions) - mpeDivisions).toFixed(2)}e beyond legal boundary!`}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenQuickDemo}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider rounded-lg shadow-md transition cursor-pointer shrink-0"
            >
              <span>Open Full Verification Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
