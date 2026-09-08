'use client';

import React from 'react';
import NationalEmblem from './NationalEmblem';
import { Eye, Globe } from 'lucide-react';

interface GovTopUtilityBarProps {
  fontSizeLevel: number; // -1, 0, 1
  setFontSizeLevel: (fn: (prev: number) => number) => void;
  isHighContrast: boolean;
  setIsHighContrast: (fn: (prev: boolean) => boolean) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

export default function GovTopUtilityBar({
  fontSizeLevel,
  setFontSizeLevel,
  isHighContrast,
  setIsHighContrast,
  language,
  setLanguage,
}: GovTopUtilityBarProps) {
  return (
    <div
      className={`border-b text-xs font-sans select-none no-print transition-colors ${
        isHighContrast
          ? 'bg-black text-yellow-300 border-yellow-400'
          : 'bg-[#002147] text-slate-200 border-[#001833]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Official Government of India text & emblem */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <NationalEmblem className="w-5 h-7 text-amber-300 shrink-0" />
            <div className="leading-tight">
              <span className="font-semibold tracking-wide text-white text-[11px] block">
                {language === 'hi' ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
              </span>
              <span className="text-[10px] text-slate-300 block">
                {language === 'hi'
                  ? 'उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय'
                  : 'Ministry of Consumer Affairs, Food & Public Distribution'}
              </span>
            </div>
          </div>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-[11px] font-medium text-amber-300 hidden md:inline">
            {language === 'hi' ? 'विधिक मापविज्ञान प्रभाग' : 'Department of Consumer Affairs • Legal Metrology Division'}
          </span>
        </div>

        {/* Right: Accessibility controls and language switcher */}
        <div className="flex items-center gap-4 text-xs font-mono">
          {/* Skip to main content (GIGW compliance) */}
          <a
            href="#main-content"
            className="hidden lg:inline text-[11px] font-sans text-slate-300 hover:text-white underline underline-offset-2"
          >
            {language === 'hi' ? 'मुख्य सामग्री पर जाएं' : 'Skip to Main Content'}
          </a>

          <div className="h-3.5 w-px bg-slate-600 hidden sm:block" />

          {/* Font Resizing Controls: A-, A, A+ */}
          <div className="flex items-center gap-1 bg-slate-900/60 p-0.5 rounded border border-slate-700">
            <button
              onClick={() => setFontSizeLevel((prev) => Math.max(prev - 1, -1))}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer transition ${
                fontSizeLevel === -1
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeLevel(() => 0)}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer transition ${
                fontSizeLevel === 0
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel((prev) => Math.min(prev + 1, 1))}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer transition ${
                fontSizeLevel === 1
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Mode Toggle */}
          <button
            onClick={() => setIsHighContrast((prev) => !prev)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-sans cursor-pointer transition ${
              isHighContrast
                ? 'bg-yellow-400 text-black border-yellow-500 font-bold'
                : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isHighContrast ? 'Normal Contrast' : 'High Contrast'}
            </span>
          </button>

          <div className="h-3.5 w-px bg-slate-600 hidden sm:block" />

          {/* Language Switcher (English / हिंदी) */}
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer ${
                language === 'en' ? 'text-amber-300 underline font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <span className="text-slate-500">/</span>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer ${
                language === 'hi' ? 'text-amber-300 underline font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
