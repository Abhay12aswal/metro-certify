'use client';

import React from 'react';
import {
  FileText,
  Save,
  Download,
  Printer,
  Sparkles,
  Sliders,
  Thermometer,
  Table,
  Layers,
  Award,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { PRESET_SCENARIOS, PresetScenario } from '../../lib/presets';

interface GovSidebarProps {
  onSelectPreset: (preset: PresetScenario) => void;
  onSaveDraft: () => void;
  onGeneratePdf: () => void;
  onExportDocx: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  language: 'en' | 'hi';
  isHighContrast: boolean;
  overallStatus: 'PASS' | 'FAIL';
  totalPoints: number;
}

export default function GovSidebar({
  onSelectPreset,
  onSaveDraft,
  onGeneratePdf,
  onExportDocx,
  activeSection,
  setActiveSection,
  language,
  isHighContrast,
  overallStatus,
  totalPoints,
}: GovSidebarProps) {
  const sections = [
    { id: 'section-instrument', label: '1. Instrument Metadata', icon: Sliders },
    { id: 'section-environmental', label: '2. Environmental Data', icon: Thermometer },
    { id: 'section-weighing', label: '3. Weighing Matrix', icon: Table },
    { id: 'section-additional', label: '4. Key Performance Tests', icon: Layers },
    { id: 'section-preview', label: '5. PDF Report & Sign-off', icon: FileCheck },
  ];

  return (
    <aside
      className={`w-full lg:w-64 shrink-0 space-y-4 no-print select-none ${
        isHighContrast ? 'text-yellow-300' : 'text-slate-800'
      }`}
    >
      {/* 1. Quick Jump Section Navigation */}
      <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#002147] border-b border-slate-200 pb-1.5 mb-2">
          {language === 'hi' ? 'फॉर्म नेविगेशन' : 'OIML Form Jump Navigation'}
        </h4>
        <nav className="space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'bg-[#002147] text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{s.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* 2. Official Action Controls */}
      <div className="bg-white border border-slate-300 rounded p-3 space-y-2 shadow-2xs">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#002147] border-b border-slate-200 pb-1.5 mb-2">
          {language === 'hi' ? 'कार्रवाई नियंत्रण' : 'Official Actions'}
        </h4>

        {/* Primary Action Button: Solid Deep Blue */}
        <button
          onClick={onGeneratePdf}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#0A3A60] hover:bg-[#002147] text-white text-xs font-bold rounded shadow-xs transition cursor-pointer"
        >
          <Printer className="w-4 h-4 text-amber-300" />
          <span>Save & Generate PDF Report</span>
        </button>

        {/* Secondary Action: Outline Gray */}
        <button
          onClick={onSaveDraft}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-400 text-slate-700 text-xs font-semibold rounded transition cursor-pointer"
        >
          <Save className="w-4 h-4 text-slate-500" />
          <span>Save Draft Form</span>
        </button>

        {/* Utility Action: Outline Green */}
        <button
          onClick={onExportDocx}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-emerald-50/60 hover:bg-emerald-100 border border-emerald-600 text-emerald-800 text-xs font-bold rounded transition cursor-pointer"
        >
          <Download className="w-4 h-4 text-emerald-700" />
          <span>Export to DOCX / JSON</span>
        </button>
      </div>

      {/* 3. Pre-Configured Test Presets (For Evaluator Demonstration) */}
      <div className="bg-white border border-slate-300 rounded p-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#002147]">
            {language === 'hi' ? 'नमूना परीक्षण डेटा' : 'Standard Test Presets'}
          </h4>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
            EVALUATOR
          </span>
        </div>

        <div className="space-y-1.5 text-xs font-sans">
          {PRESET_SCENARIOS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className="w-full text-left p-2 rounded border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition cursor-pointer"
            >
              <div className="font-bold text-slate-900 text-[11px] flex items-center justify-between">
                <span>{preset.name.split(' (')[0]}</span>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                    preset.id.includes('fail')
                      ? 'bg-red-100 text-[#B91C1C]'
                      : 'bg-emerald-100 text-[#15803D]'
                  }`}
                >
                  {preset.id.includes('fail') ? 'FAIL' : 'PASS'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Statutory Compliance Badge */}
      <div className="bg-slate-50 border border-slate-300 rounded p-3 text-center text-xs font-sans">
        <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">
          Government Evaluation Node
        </div>
        <div className="font-bold text-[#002147] text-xs">
          CSIR &bull; National Physical Laboratory (NPL)
        </div>
        <div className="text-[10px] text-slate-500 mt-1">
          Standard: Legal Metrology (General) Rules, 2011 (India) &bull; OIML R 76-1:2006
        </div>
      </div>
    </aside>
  );
}
