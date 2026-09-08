'use client';

import React, { useState } from 'react';
import { BookOpen, Search, CheckCircle, Scale, AlertCircle, FileText } from 'lucide-react';

interface OimlRulebookViewProps {
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function OimlRulebookView({ language, isHighContrast }: OimlRulebookViewProps) {
  const [activeClause, setActiveClause] = useState('clause_a443');

  const clauses = [
    {
      id: 'clause_a443',
      number: 'Clause A.4.4.3',
      title: 'Determination of Indication Prior to Rounding (Turning Point Method)',
      standard: 'OIML R 76-1:2006 (E) Annex A',
      summary:
        'Digital weighing instruments round readings to the nearest actual scale interval d. To determine true indication without rounding, small weights of 0.1d (or 0.1e) are successively added until the display unambiguously increments by 1d (I + d).',
      formula: 'P = I + 0.5d - ΔL',
      variables: [
        { name: 'I', desc: 'Indicated reading on the instrument display' },
        { name: 'd', desc: 'Actual scale interval of the instrument' },
        { name: 'ΔL', desc: 'Total sum of small additional weights added to reach the turning point' },
      ],
      legalRule:
        'Legal Metrology (General) Rules, 2011 (Eighth Schedule, Part I, Clause 4): The turning point method shall be strictly applied for all pattern evaluation and initial verification tests.',
    },
    {
      id: 'clause_351',
      number: 'Clause 3.5.1 / Table 6',
      title: 'Maximum Permissible Errors (MPE) on Initial Verification',
      standard: 'OIML R 76-1:2006 (E) Section 3.5',
      summary:
        'The maximum permissible errors for increasing or decreasing loads are expressed in units of the verification scale interval e according to the accuracy class and applied test load m.',
      formula: '|Ec| <= |MPE|',
      variables: [
        { name: 'Class I (Special)', desc: '0 to 50,000e: ±0.5e | 50,000e to 200,000e: ±1.0e | > 200,000e: ±1.5e' },
        { name: 'Class II (High)', desc: '0 to 5,000e: ±0.5e | 5,000e to 20,000e: ±1.0e | 20,000e to 100,000e: ±1.5e' },
        { name: 'Class III (Medium)', desc: '0 to 500e: ±0.5e | 500e to 2,000e: ±1.0e | 2,000e to 10,000e: ±1.5e' },
        { name: 'Class IIII (Ordinary)', desc: '0 to 50e: ±0.5e | 50e to 200e: ±1.0e | 200e to 1,000e: ±1.5e' },
      ],
      legalRule:
        'Clause 3.5.2: In-Service Inspection MPE is exactly twice (2x) the initial verification MPE.',
    },
    {
      id: 'clause_362',
      number: 'Clause 3.6.2',
      title: 'Eccentricity (Corner Load) Test Requirements',
      standard: 'OIML R 76-1:2006 (E) Section 3.6.2',
      summary:
        'The indications for different positions of a load on the load receptor shall comply with the maximum permissible errors. A test load corresponding to approximately 1/3 of the maximum capacity is placed successively in 4 quarter corners and center.',
      formula: '|Ec,pos| <= |MPE|',
      variables: [
        { name: 'Test Load', desc: '1/3 Max for instruments with 4 support points' },
        { name: 'Corners Tested', desc: 'Front-Left, Back-Left, Back-Right, Front-Right, and Center' },
        { name: 'Permissible Deviation', desc: 'Errors at each corner must not exceed the MPE for that load' },
      ],
      legalRule: 'Section 3.6.2.1: Applicable to all trade scales and counter weighing machines.',
    },
    {
      id: 'clause_361',
      number: 'Clause 3.6.1',
      title: 'Repeatability Test (Error of Indication Spread)',
      standard: 'OIML R 76-1:2006 (E) Section 3.6.1',
      summary:
        'The difference between the results of several weighings of the same load shall not be greater than the absolute value of the maximum permissible error of the instrument for that load.',
      formula: 'I_max - I_min <= |MPE|',
      variables: [
        { name: 'Number of Weighings', desc: 'At least 3 series of weighings at 1/2 Max and Max' },
        { name: 'Max Spread', desc: 'Algebraic range difference (Imax - Imin)' },
      ],
      legalRule: 'Clause 3.6.1: For instruments with n > 1,000, 10 weighings are recommended.',
    },
  ];

  const selected = clauses.find((c) => c.id === activeClause) || clauses[0];

  return (
    <div
      className={`border rounded p-4 mb-6 transition-colors ${
        isHighContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-slate-300 text-slate-800'
      }`}
    >
      {/* Header */}
      <div className="pb-3 mb-4 border-b border-slate-200">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#002147] font-sans">
          {language === 'hi'
            ? 'ओआईएमएल आर-76 वैधानिक नियम पुस्तिका एवं तकनीकी मानक संदर्भ'
            : 'OIML R-76 Statutory Rulebook & Legal Metrology Technical Standards'}
        </h2>
        <p className="text-xs text-slate-500 font-sans mt-0.5">
          International standards reference guide covering Non-Automatic Weighing Instruments (NAWI) testing clauses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Clause Selector Sidebar */}
        <div className="space-y-1.5 font-sans">
          {clauses.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveClause(c.id)}
              className={`w-full text-left p-2.5 rounded border transition cursor-pointer ${
                activeClause === c.id
                  ? 'bg-[#002147] text-white border-[#001833] font-bold shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
              }`}
            >
              <div className="text-xs font-bold">{c.number}</div>
              <div className="text-[10px] truncate opacity-90">{c.title}</div>
            </button>
          ))}
        </div>

        {/* Clause Content Area */}
        <div className="md:col-span-2 p-4 bg-slate-50 border border-slate-300 rounded text-xs font-sans space-y-4">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">{selected.standard}</div>
            <h3 className="text-sm font-black text-[#002147] mt-0.5">
              {selected.number}: {selected.title}
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed mt-2 font-serif">
              {selected.summary}
            </p>
          </div>

          {/* Formula Display Box */}
          <div className="p-3 bg-white border border-slate-300 rounded font-mono">
            <div className="text-[10px] font-bold uppercase text-slate-500 font-sans">
              Statutory Formula / Condition:
            </div>
            <div className="text-base font-black text-[#002147] my-1">
              {selected.formula}
            </div>
            <div className="space-y-1 text-[11px] text-slate-600 font-sans border-t border-slate-100 pt-2 mt-2">
              {selected.variables.map((v, i) => (
                <div key={i} className="flex items-start gap-2">
                  <strong className="font-mono text-blue-900 shrink-0">{v.name}:</strong>
                  <span>{v.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Rule Disclosure */}
          <div className="p-2.5 bg-amber-50 border border-amber-300 rounded text-[11px] text-amber-950 font-sans">
            <strong>Indian Legal Metrology Alignment:</strong> {selected.legalRule}
          </div>
        </div>
      </div>
    </div>
  );
}
