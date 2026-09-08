'use client';

import React from 'react';
import NationalEmblem from '../gov/NationalEmblem';
import { Eye, Globe, Map, HelpCircle, ArrowDown } from 'lucide-react';

interface TopUtilityBarProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  isHighContrast: boolean;
  setIsHighContrast: (fn: (prev: boolean) => boolean) => void;
  onOpenHelp: () => void;
}

export default function TopUtilityBar({
  language,
  setLanguage,
  isHighContrast,
  setIsHighContrast,
  onOpenHelp,
}: TopUtilityBarProps) {
  return (
    <div
      className={`border-b text-xs font-sans select-none no-print transition-colors ${
        isHighContrast
          ? 'bg-black text-yellow-300 border-yellow-400'
          : 'bg-white text-slate-700 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Far Left: Emblem of India + Government of India */}
        <div className="flex items-center gap-2.5">
          <NationalEmblem className="w-5 h-7 text-slate-800 shrink-0" />
          <div className="leading-tight border-r border-slate-300 pr-3 mr-1">
            <span className="font-bold text-slate-900 text-xs block font-sans">
              भारत सरकार
            </span>
            <span className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider block">
              Government of India
            </span>
          </div>
        </div>

        {/* Center Top: Department of Consumer Affairs */}
        <div className="hidden md:flex items-center text-center">
          <div className="text-xs font-sans">
            <span className="font-bold text-[#002147] block text-xs">
              उपभोक्ता मामले विभाग &bull; Department of Consumer Affairs
            </span>
            <span className="text-[10px] text-slate-500 font-medium block">
              Ministry of Consumer Affairs, Food &amp; Public Distribution
            </span>
          </div>
        </div>

        {/* Far Right: Accessibility & Utility Controls */}
        <div className="flex items-center gap-3.5 text-xs font-sans">
          {/* Skip to main content */}
          <a
            href="#main-portal"
            className="text-[11px] text-slate-600 hover:text-[#002147] hover:underline hidden sm:inline"
          >
            Skip to main content
          </a>

          <div className="h-3 w-px bg-slate-300 hidden sm:block" />

          {/* Site Map */}
          <a
            href="#lab-network"
            className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-[#002147]"
            title="View Site Map / Lab Network"
          >
            <Map className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden lg:inline">Site Map</span>
          </a>

          {/* Contrast Toggle */}
          <button
            onClick={() => setIsHighContrast((prev) => !prev)}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[11px] cursor-pointer transition ${
              isHighContrast
                ? 'bg-yellow-400 text-black border-yellow-500 font-bold'
                : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
            title="Toggle High Contrast View"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">
              {isHighContrast ? 'Standard' : 'Contrast'}
            </span>
          </button>

          {/* Language Switcher Dropdown / Toggle */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded px-1.5 py-0.5">
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
              className="bg-transparent text-[11px] text-slate-800 font-bold outline-hidden cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
            </select>
          </div>

          {/* Help Icon */}
          <button
            onClick={onOpenHelp}
            className="text-slate-500 hover:text-[#002147] transition cursor-pointer"
            title="Help & Feedback"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
