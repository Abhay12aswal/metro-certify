'use client';

import React from 'react';
import {
  Scale,
  Sparkles,
  FileCheck,
  LineChart,
  ClipboardList,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
} from 'lucide-react';
import { PRESET_SCENARIOS, PresetScenario } from '../lib/presets';
import { TestMatrixSummary } from '../types/metrology';

interface HeaderProps {
  activeTab: 'matrix' | 'chart' | 'certificate';
  setActiveTab: (tab: 'matrix' | 'chart' | 'certificate') => void;
  onSelectPreset: (preset: PresetScenario) => void;
  onResetToBlank: () => void;
  summary: TestMatrixSummary;
  onOpenGlossary: () => void;
  onTriggerPrint: () => void;
  currentUser?: { name: string; designation: string; lab: string } | null;
  onLogout?: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  onSelectPreset,
  onResetToBlank,
  summary,
  onOpenGlossary,
  onTriggerPrint,
  currentUser,
  onLogout,
}: HeaderProps) {
  const defaultPreset = PRESET_SCENARIOS[0]; // Class III 15kg retail scale

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs no-print">
      {/* Top Gov Banner */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-100">
            Regional Reference Standard Laboratory (RRSL)
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-slate-400">
            Ministry of Consumer Affairs, Food & Public Distribution, Govt. of India
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          {currentUser && (
            <div className="flex items-center gap-2">
              <span className="text-cyan-300 font-medium">
                Officer: <strong>{currentUser.name}</strong> ({currentUser.lab})
              </span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-rose-400 hover:text-rose-300 font-semibold px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800 text-[10px] transition cursor-pointer"
                >
                  Exit / Public Site
                </button>
              )}
            </div>
          )}
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Formulas & Standards Guide</span>
          </button>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-700 to-indigo-800 text-white rounded-xl shadow-md shadow-blue-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  Metro<span className="text-blue-600">Certify</span>
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  NAWI Engine
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Non-Automatic Weighing Instruments Legal Metrology Compliance Platform
              </p>
            </div>
          </div>

          {/* Quick Demo Preset & Test Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Primary Evaluator Demo Button (Module 6 requirement) */}
            <button
              onClick={() => onSelectPreset(defaultPreset)}
              className="group flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-semibold rounded-lg shadow-sm shadow-emerald-700/20 transition cursor-pointer"
              title="Click to instantly populate 15kg Class III trade scale with realistic ascending and descending passing readings"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 animate-spin group-hover:rotate-90 transition" />
              <span>Load Sample Test (Class III 15kg Retail Scale)</span>
            </button>

            {/* Other Presets Dropdown */}
            <div className="relative group">
              <select
                onChange={(e) => {
                  const found = PRESET_SCENARIOS.find((p) => p.id === e.target.value);
                  if (found) onSelectPreset(found);
                }}
                defaultValue=""
                className="text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300 rounded-lg px-2.5 py-2 hover:bg-slate-200 transition cursor-pointer outline-hidden"
              >
                <option value="" disabled>
                  Load Other Presets...
                </option>
                {PRESET_SCENARIOS.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={onResetToBlank}
              className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200 transition cursor-pointer"
              title="Reset to blank instrument"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Live Verdict Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition ${
                summary.totalPoints === 0
                  ? 'bg-slate-100 text-slate-600 border-slate-200'
                  : summary.overallStatus === 'PASS'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-500/20'
                  : 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-500/20 animate-pulse'
              }`}
            >
              {summary.totalPoints === 0 ? (
                <>
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>NO DATA</span>
                </>
              ) : summary.overallStatus === 'PASS' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>VERDICT: COMPLIANT (PASS)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>VERDICT: OUT OF TOLERANCE (FAIL)</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <span>1. Instrument & Test Matrix</span>
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeTab === 'matrix'
                    ? 'bg-blue-800 text-blue-100'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {summary.totalPoints} pts
              </span>
            </button>

            <button
              onClick={() => setActiveTab('chart')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'chart'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>2. Dynamic Error Curve</span>
              {summary.failedPoints > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white">
                  {summary.failedPoints} Breaches
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'certificate'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>3. Official OIML R 76-2 Report</span>
            </button>
          </nav>

          {/* Quick Print action */}
          <button
            onClick={onTriggerPrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print / Export</span> PDF
          </button>
        </div>
      </div>
    </header>
  );
}
