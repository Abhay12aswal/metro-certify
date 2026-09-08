'use client';

import React from 'react';
import { Scale, Lock, Sparkles, Terminal, Shield, ArrowRight } from 'lucide-react';

interface LandingNavbarProps {
  onOpenLogin: () => void;
  onOpenQuickDemo: () => void;
}

export default function LandingNavbar({
  onOpenLogin,
  onOpenQuickDemo,
}: LandingNavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Telemetry Ticker */}
      {/* <div className="bg-slate-900/90 text-slate-400 text-[11px] px-4 py-1.5 border-b border-slate-800 flex items-center justify-between font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-semibold">METROLOGY CORE: ONLINE</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-400">
            OIML R 76-1:2006 & R 76-2:2007 VERIFICATION PROTOCOL
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline text-[10px]">
            RRSL NODES: DEL &bull; BLR &bull; AHM &bull; BBI &bull; VNS
          </span>
          <span className="text-cyan-400 font-bold">LEGAL METROLOGY DIVISION</span>
        </div>
      </div> */}

      {/* Main Glass Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white font-sans">
                  Metro<span className="text-cyan-400">Certify</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  R-76.OS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
                National NAWI Verification & Calibration Suite
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium text-slate-300">
            <a
              href="#about"
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              About Project
            </a>
            <a
              href="#modules"
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Core Modules
            </a>
            <a
              href="#simulator"
              className="hover:text-cyan-400 transition cursor-pointer text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Engine Simulator</span>
            </a>
            <a
              href="#how-it-works"
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Workflow
            </a>
            <a
              href="#testimonials"
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Endorsements
            </a>
            <a
              href="#standards"
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              OIML Standards
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            {/* Instant Demo Shortcut */}
            <button
              onClick={onOpenQuickDemo}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition cursor-pointer shadow-sm"
              title="Instant 1-Click login as Senior Metrologist for Hackathon evaluation"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>1-Click Demo</span>
            </button>

            {/* Officer Login CTA */}
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-500/25 transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Officer Terminal Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
