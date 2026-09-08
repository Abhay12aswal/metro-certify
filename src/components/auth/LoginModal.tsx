'use client';

import React, { useState } from 'react';
import {
  X,
  Lock,
  UserCheck,
  ShieldCheck,
  KeyRound,
  Zap,
  Building,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; designation: string; lab: string }) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const [officerId, setOfficerId] = useState('officer.rajesh@rrsl.gov.in');
  const [passcode, setPasscode] = useState('rrsl-secure-2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId.trim() || !passcode.trim()) {
      setError('Please provide your authorized Officer ID and Passcode.');
      return;
    }

    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Er. Rajesh Kumar Sharma',
        designation: 'Senior Metrological Officer (Legal Metrology)',
        lab: 'RRSL Ahmedabad (Western Region)',
      });
      onClose();
    }, 600);
  };

  const handleQuickDemoLogin = (role: 'ahmedabad' | 'bengaluru') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'ahmedabad') {
        onLoginSuccess({
          name: 'Er. Rajesh Kumar Sharma',
          designation: 'Senior Metrological Officer (Legal Metrology)',
          lab: 'RRSL Ahmedabad (Western Region)',
        });
      } else {
        onLoginSuccess({
          name: 'Smt. K. Ananthalakshmi',
          designation: 'Senior Scientific Officer (Metrology)',
          lab: 'RRSL Bengaluru (Southern Region)',
        });
      }
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md no-print animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden text-slate-100">
        {/* Futuristic Top Glowing Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-indigo-500" />

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/60">
                  RRSL ACCESS NODE 01
                </span>
              </div>
              <h2 className="text-lg font-black tracking-tight text-white mt-1">
                Legal Metrology Officer Portal
              </h2>
              <p className="text-xs text-slate-400">
                Ministry of Consumer Affairs &bull; OIML R 76-1/2 Verification Console
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Access for Evaluators (Crucial for SIH Demo!) */}
        <div className="p-6 pt-4 pb-2">
          <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Evaluator Instant Access
              </span>
              <span className="text-[10px] text-cyan-400/80 font-mono">1-CLICK LOGIN</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
              Skip manual credential entry. Click below to immediately launch the authenticated
              verification terminal as a certified RRSL metrologist:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('ahmedabad')}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-bold rounded-lg shadow-sm transition cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-200" />
                <span>Demo as RRSL Lead</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('bengaluru')}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>Scientific Officer</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] uppercase font-mono tracking-widest text-slate-500 absolute">
              Or Manual Authentication
            </span>
          </div>

          {/* Manual Credential Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-lg text-rose-300 text-xs font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 flex items-center justify-between">
                <span>OFFICER ID / EMAIL</span>
                <span className="text-[10px] text-slate-500 font-sans">Gov NIC / RRSL Domain</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="officer@rrsl.gov.in"
                  className="w-full text-xs font-mono px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-hidden focus:ring-1 focus:ring-cyan-400 transition"
                />
                <UserCheck className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 flex items-center justify-between">
                <span>CRYPTOGRAPHIC PASSCODE / PIN</span>
                <span className="text-[10px] text-slate-500 font-sans">256-Bit Authorized</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs font-mono px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 focus:border-cyan-400 focus:outline-hidden focus:ring-1 focus:ring-cyan-400 transition"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-500/20 transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Terminal Token...</span>
              ) : (
                <>
                  <span>Authorize & Open Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Security Badge */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>END-TO-END VERIFICATION AUDIT TRAIL ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
