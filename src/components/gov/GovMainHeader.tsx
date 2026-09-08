'use client';

import React, { useState } from 'react';
import { Scale, UserCheck, ChevronDown, Check, ShieldCheck, Building2, ArrowLeft } from 'lucide-react';

interface GovMainHeaderProps {
  currentRole: string;
  setCurrentRole: (role: string) => void;
  language: 'en' | 'hi';
  isHighContrast: boolean;
  onExitToPublic?: () => void;
}

export default function GovMainHeader({
  currentRole,
  setCurrentRole,
  language,
  isHighContrast,
  onExitToPublic,
}: GovMainHeaderProps) {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const roles = [
    { id: 'npl', title: 'Dr. A. Sharma | Senior Metrologist, NPL Lab', lab: 'CSIR - National Physical Laboratory (NPL India)' },
    { id: 'rrsl_ahm', title: 'Er. Rajesh K. Sharma | Testing Officer, RRSL Ahmedabad', lab: 'RRSL Ahmedabad (Western Region)' },
    { id: 'rrsl_blr', title: 'Smt. K. Ananthalakshmi | Scientific Officer, RRSL Bengaluru', lab: 'RRSL Bengaluru (Southern Region)' },
    { id: 'enforcement', title: 'Shri V. Rathore | Assistant Controller (Enforcement)', lab: 'Dept. of Legal Metrology, New Delhi' },
  ];

  const activeRoleObj = roles.find((r) => r.title === currentRole) || roles[0];

  return (
    <div
      className={`border-b transition-colors no-print ${
        isHighContrast
          ? 'bg-black text-white border-yellow-400'
          : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Left: Department Logo + Official System Title */}
          <div className="flex items-center gap-3.5">
            {/* Ministry / Department Seal Logo */}
            <div className="w-12 h-12 rounded-lg bg-[#002147] border border-[#001833] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Scale className="w-7 h-7 text-amber-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-50 text-[#002147] border border-blue-200">
                  e-Governance Portal
                </span>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                  System Ref: IN-NLM-R76-2026
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-[#002147] tracking-tight font-sans mt-0.5">
                {language === 'hi'
                  ? 'ओआईएमएल आर-76 डिजिटल परीक्षण एवं मॉडल अनुमोदन प्रणाली'
                  : 'OIML R-76 Digital Testing & Model Approval System'}
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                {language === 'hi'
                  ? 'राष्ट्रीय विधिक मापविज्ञान डिजिटल मूल्यांकन पोर्टल (उपभोक्ता मामले विभाग)'
                  : 'National Legal Metrology Digital Evaluation Portal • Department of Consumer Affairs'}
              </p>
            </div>
          </div>

          {/* Right: User Profile Chip & Role Switcher */}
          <div className="relative flex items-center gap-2 self-stretch md:self-auto justify-end">
            {onExitToPublic && (
              <button
                onClick={onExitToPublic}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#002147] border border-slate-300 rounded text-xs font-bold transition cursor-pointer"
                title="Return to Public Landing Page"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Public Portal</span>
              </button>
            )}

            <div
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded cursor-pointer select-none transition"
              title="Click to switch officer role"
            >
              <div className="w-7 h-7 rounded bg-[#002147] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <UserCheck className="w-4 h-4 text-amber-300" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#002147] flex items-center gap-1">
                  <span>{activeRoleObj.title.split(' | ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div className="text-[10px] text-slate-500 truncate max-w-[200px]">
                  {activeRoleObj.title.split(' | ')[1]}
                </div>
              </div>
            </div>

            {/* Role Dropdown Menu */}
            {isRoleDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-slate-300 rounded shadow-lg z-50 py-1 text-xs">
                <div className="px-3 py-1.5 bg-slate-100 text-[10px] font-bold uppercase text-slate-600 border-b border-slate-200">
                  Switch Authorized Metrology Role
                </div>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentRole(r.title);
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 border-b border-slate-100 last:border-0 flex items-start justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-[#002147]">{r.title.split(' | ')[0]}</div>
                      <div className="text-[10px] text-slate-500">{r.lab}</div>
                    </div>
                    {currentRole === r.title && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Authentic Indian National Tricolor Accent Ribbon */}
      <div className="h-1 w-full grid grid-cols-3">
        <div className="bg-[#FF9933]" />
        <div className="bg-white border-y border-slate-200/50" />
        <div className="bg-[#138808]" />
      </div>
    </div>
  );
}
