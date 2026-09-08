'use client';

import React from 'react';
import { TestMatrixSummary, InstrumentData } from '../../types/metrology';
import { CheckCircle2, XCircle, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ComplianceSummaryBannerProps {
  summary: TestMatrixSummary;
  instrument: InstrumentData;
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function ComplianceSummaryBanner({
  summary,
  instrument,
  language,
  isHighContrast,
}: ComplianceSummaryBannerProps) {
  const {
    totalPoints,
    passedPoints,
    failedPoints,
    zeroErrorInDivisionsE0,
    maxAbsoluteErrorEc,
    maxPermissibleLimit,
    overallStatus,
  } = summary;

  const isPass = overallStatus === 'PASS' && totalPoints > 0;
  const isFail = overallStatus === 'FAIL';
  const isPending = totalPoints === 0;

  return (
    <div
      className={`border rounded p-4 mb-4 transition-colors ${
        isHighContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : isPass
          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
          : isFail
          ? 'bg-red-50/70 border-red-300 text-red-950'
          : 'bg-amber-50/70 border-amber-300 text-amber-950'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Formal Metrological Verdict */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded flex items-center justify-center font-bold text-white shrink-0 ${
              isPass
                ? 'bg-[#15803D]'
                : isFail
                ? 'bg-[#B91C1C]'
                : 'bg-[#B45309]'
            }`}
          >
            {isPass ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : isFail ? (
              <XCircle className="w-6 h-6" />
            ) : (
              <Clock className="w-6 h-6" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/80 border border-slate-300 text-slate-700">
                Official Compliance Status
              </span>
              <span className="text-[11px] font-mono text-slate-600 font-semibold">
                Ref: {summary.certificateHash}
              </span>
            </div>

            <h3 className="text-base font-bold font-sans tracking-tight mt-0.5">
              {isPending &&
                (language === 'hi'
                  ? 'सत्यापन स्थिति: परीक्षण डेटा लंबित (प्रतीक्षारत)'
                  : 'VERIFICATION STATUS: PENDING TEST OBSERVATIONS')}
              {isPass &&
                (language === 'hi'
                  ? 'विधिक मापविज्ञान सत्यापन: स्वीकृत / उत्तीर्ण (ओआईएमएल आर 76-1 अनुपालन)'
                  : 'METROLOGICAL COMPLIANCE: APPROVED / PASS (CONFORMS TO OIML R 76-1)')}
              {isFail &&
                (language === 'hi'
                  ? 'विधिक मापविज्ञान सत्यापन: अस्वीकृत / अनुत्तीर्ण (अधिकतम अनुमेय त्रुटि सीमा पार)'
                  : 'METROLOGICAL COMPLIANCE: REJECTED / FAIL (MPE TOLERANCE EXCEEDED)')}
            </h3>

            <p className="text-xs text-slate-600 font-sans mt-0.5">
              {isPending &&
                'Record load readings below or click "Load Standard Preset" in the action panel to evaluate.'}
              {isPass &&
                `All ${totalPoints} evaluated test points satisfy Clause 3.5.1 Maximum Permissible Error limits. Peak error: ${maxAbsoluteErrorEc.toFixed(2)}e (Limit: ±${maxPermissibleLimit.toFixed(1)}e).`}
              {isFail &&
                `Critical Violation: ${failedPoints} observation point(s) exceed the statutory OIML R 76-1 MPE tolerance. Peak error: ${maxAbsoluteErrorEc.toFixed(2)}e.`}
            </p>
          </div>
        </div>

        {/* Right: Key Laboratory Data Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto font-mono text-xs">
          {/* Tested Points */}
          <div className="bg-white border border-slate-300 rounded px-2.5 py-1.5 text-center">
            <span className="text-[10px] text-slate-500 uppercase block font-sans">
              Tested Points
            </span>
            <strong className="text-slate-800 text-sm">
              {passedPoints} / {totalPoints}
            </strong>
          </div>

          {/* Zero Error E0 */}
          <div className="bg-white border border-slate-300 rounded px-2.5 py-1.5 text-center">
            <span className="text-[10px] text-slate-500 uppercase block font-sans">
              Zero Offset (E₀)
            </span>
            <strong className="text-[#002147] text-sm">
              {zeroErrorInDivisionsE0 > 0 ? `+${zeroErrorInDivisionsE0}` : zeroErrorInDivisionsE0}e
            </strong>
          </div>

          {/* Max Error Ec */}
          <div className="bg-white border border-slate-300 rounded px-2.5 py-1.5 text-center">
            <span className="text-[10px] text-slate-500 uppercase block font-sans">
              Peak Error |E<sub>c</sub>|
            </span>
            <strong
              className={`text-sm ${
                maxAbsoluteErrorEc > maxPermissibleLimit ? 'text-[#B91C1C]' : 'text-slate-800'
              }`}
            >
              {maxAbsoluteErrorEc.toFixed(2)}e
            </strong>
          </div>

          {/* MPE Boundary */}
          <div className="bg-white border border-slate-300 rounded px-2.5 py-1.5 text-center">
            <span className="text-[10px] text-slate-500 uppercase block font-sans">
              Legal Limit (MPE)
            </span>
            <strong className="text-[#15803D] text-sm">
              &plusmn;{maxPermissibleLimit.toFixed(1)}e
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
