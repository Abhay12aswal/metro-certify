'use client';

import React from 'react';
import { Scale, ShieldCheck, MapPin, ExternalLink, Terminal } from 'lucide-react';

interface LandingFooterProps {
  onOpenLogin: () => void;
  onOpenQuickDemo: () => void;
}

export default function LandingFooter({
  onOpenLogin,
  onOpenQuickDemo,
}: LandingFooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-800">
      {/* Top Banner: Regional Reference Standard Laboratories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
            National Metrology Infrastructure
          </div>
          <h4 className="text-lg font-bold text-white">
            Regional Reference Standard Laboratories (RRSL) Network
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Providing legal metrology verification, calibration, and standards dissemination across India.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs font-mono">
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="text-white font-bold flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>RRSL Ahmedabad</span>
            </div>
            <div className="text-[10px] text-slate-400">Western Region &bull; Gujarat</div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="text-white font-bold flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>RRSL Bengaluru</span>
            </div>
            <div className="text-[10px] text-slate-400">Southern Region &bull; Karnataka</div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="text-white font-bold flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>RRSL Bhubaneswar</span>
            </div>
            <div className="text-[10px] text-slate-400">Eastern Region &bull; Odisha</div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="text-white font-bold flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>RRSL Faridabad</span>
            </div>
            <div className="text-[10px] text-slate-400">Northern Region &bull; Haryana</div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="text-white font-bold flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>RRSL Varanasi</span>
            </div>
            <div className="text-[10px] text-slate-400">Central Region &bull; Uttar Pradesh</div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand column */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-lg">
              <Scale className="w-5 h-5" />
            </div>
            <span className="text-lg font-black text-white">
              Metro<span className="text-cyan-400">Certify</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Autonomous compliance software for non-automatic weighing instruments adhering strictly to
            OIML Recommendation R 76-1 and R 76-2. Developed for the Legal Metrology Division,
            Ministry of Consumer Affairs, Government of India.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onOpenQuickDemo}
              className="px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-700 text-cyan-300 text-xs font-mono font-bold rounded-lg transition cursor-pointer"
            >
              Launch Instant Demo
            </button>
            <button
              onClick={onOpenLogin}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-mono font-bold rounded-lg transition cursor-pointer"
            >
              Officer Terminal
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-3">
            System Modules
          </h5>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#about" className="hover:text-cyan-400 transition">
                Architectural Vision
              </a>
            </li>
            <li>
              <a href="#modules" className="hover:text-cyan-400 transition">
                Core Modules (01 - 06)
              </a>
            </li>
            <li>
              <a href="#simulator" className="hover:text-cyan-400 transition">
                Formula Simulator
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-cyan-400 transition">
                Verification Workflow
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-cyan-400 transition">
                Metrologist Reviews
              </a>
            </li>
          </ul>
        </div>

        {/* Standards & Compliance */}
        <div>
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-3">
            Regulatory Standards
          </h5>
          <ul className="space-y-2 text-xs text-slate-400 font-mono">
            <li>OIML R 76-1:2006 (E)</li>
            <li>OIML R 76-2:2007 (E)</li>
            <li>Legal Metrology Act, 2009</li>
            <li>LM (General) Rules, 2011</li>
            <li>ISO/IEC 17025 Ready</li>
          </ul>
        </div>
      </div>

      {/* Copyright & Live Status Ticker */}
      <div className="bg-slate-950/90 border-t border-slate-900 px-4 sm:px-6 py-4 text-center text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <div>
          &copy; {new Date().getFullYear()} MetroCertify &bull; Ministry of Consumer Affairs, Govt. of India
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PORTAL UPTIME: 99.98% &bull; SYSTEM CLOCK: ACTIVE</span>
        </div>
      </div>
    </footer>
  );
}
