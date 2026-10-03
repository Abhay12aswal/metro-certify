'use client';

import React from 'react';
import { Scale, LogIn, ExternalLink, ArrowRight } from 'lucide-react';

interface NavigationHeaderProps {
  onAccessPortal: () => void;
  language: 'en' | 'hi';
}

export default function NavigationHeader({
  onAccessPortal,
  language,
}: NavigationHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs no-print font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Left: System Logo + Portal Title */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#002147] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Scale className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-[#002147] tracking-tight">
                  OIML R-76 Compliance Portal
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-[#002147] border border-blue-200 hidden md:inline">
                  Govt. Portal
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                National Non-Automatic Weighing Instruments (NAWI) Evaluation Engine
              </p>
            </div>
          </a>

          {/* Center: Ministry Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-5 text-xs font-semibold text-slate-700">
            <a href="#overview" className="hover:text-[#002147] transition">
              Overview
            </a>
            <a href="#features" className="hover:text-[#002147] transition">
              Features
            </a>
            <a href="#challenges" className="hover:text-[#002147] transition">
              Architecture
            </a>
            <a href="#components" className="hover:text-[#002147] transition">
              Key Components
            </a>
            <a href="#workflow" className="hover:text-[#002147] transition">
              Workflow Steps
            </a>
            <a href="#lab-network" className="hover:text-[#002147] transition">
              Testing Labs
            </a>
            <a
              href="/docs/project-overview.html"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#002147] transition text-slate-600 font-bold"
              title="View and print the complete project summary and evaluation document"
            >
              <span>Project Brief (PDF)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </nav>

          {/* Far Right: Dark Blue Primary Action Button (#0B3C5D / #002147) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onAccessPortal}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-[#002147] hover:bg-[#0B3C5D] text-white text-xs font-bold rounded shadow-xs transition hover:shadow cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-300" />
              <span>Login / Access Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tricolor Government Ribbon Accent */}
      <div className="h-0.5 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-white" />
        <div className="bg-[#138808]" />
      </div>
    </header>
  );
}
