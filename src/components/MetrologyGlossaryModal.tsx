'use client';

import React from 'react';
import { X, BookOpen, Scale, HelpCircle, AlertCircle, ShieldCheck } from 'lucide-react';

interface MetrologyGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MetrologyGlossaryModal({
  isOpen,
  onClose,
}: MetrologyGlossaryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">OIML R 76-1:2006 Metrological Guide</h2>
              <p className="text-xs text-slate-300">
                Non-Automatic Weighing Instruments (NAWI) Verification Standards & Formulas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-700">
          {/* Section 1: Turning Point Method */}
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-900">
                  1. Turning Point Method (Clause A.4.4.3)
                </h3>
                <p className="mt-1 text-slate-700 leading-relaxed">
                  Digital weighing instruments round indications to the nearest scale interval{' '}
                  <span className="font-semibold text-slate-900">d</span>. To eliminate rounding
                  error and ascertain the true continuous indication before rounding, small weights
                  (typically <span className="font-mono text-blue-800">0.1d</span>) are added until
                  the displayed value unambiguously increments by one division ($I + d$).
                </p>
                <div className="mt-3 p-3 bg-white border border-blue-200 rounded font-mono text-xs text-slate-800">
                  <div className="font-bold text-blue-950">Indication Prior to Rounding (P):</div>
                  <div className="text-base text-blue-700 font-semibold mt-1">
                    P = I + 0.5 &times; d &minus; &Delta;L
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Where: <strong>I</strong> = indicated value; <strong>d</strong> = actual scale
                    interval; <strong>&Delta;L</strong> = sum of additional small weights added.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Error Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                True Error (E)
              </h4>
              <p className="mt-1 text-xs text-slate-600">
                The algebraic difference between the unrounded indication and the applied load.
              </p>
              <div className="mt-2 p-2 bg-white border border-slate-200 rounded font-mono text-center text-sm font-semibold text-indigo-700">
                E = P &minus; L
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Corrected Error (E<sub>c</sub>)
              </h4>
              <p className="mt-1 text-xs text-slate-600">
                True error corrected for zero-load offset error (Clause A.4.4.3).
              </p>
              <div className="mt-2 p-2 bg-white border border-slate-200 rounded font-mono text-center text-sm font-semibold text-emerald-700">
                E<sub>c</sub> = E &minus; E<sub>0</sub>
              </div>
              <div className="mt-1 text-[11px] text-slate-500 text-center">
                (E<sub>0</sub> = error calculated at zero applied load)
              </div>
            </div>
          </div>

          {/* Section 3: MPE Tolerance Tables */}
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-3">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Maximum Permissible Errors (MPE) on Initial Verification (Table 6)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-2 border border-slate-200">Accuracy Class</th>
                    <th className="p-2 border border-slate-200">&plusmn; 0.5 e</th>
                    <th className="p-2 border border-slate-200">&plusmn; 1.0 e</th>
                    <th className="p-2 border border-slate-200">&plusmn; 1.5 e</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-200 font-semibold text-purple-900">
                      Class I (Special)
                    </td>
                    <td className="p-2 border border-slate-200">0 &le; m &le; 50,000 e</td>
                    <td className="p-2 border border-slate-200">50,000 e &lt; m &le; 200,000 e</td>
                    <td className="p-2 border border-slate-200">m &gt; 200,000 e</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2 border border-slate-200 font-semibold text-blue-900">
                      Class II (High)
                    </td>
                    <td className="p-2 border border-slate-200">0 &le; m &le; 5,000 e</td>
                    <td className="p-2 border border-slate-200">5,000 e &lt; m &le; 20,000 e</td>
                    <td className="p-2 border border-slate-200">20,000 e &lt; m &le; 100,000 e</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 font-semibold text-emerald-900">
                      Class III (Medium / Trade)
                    </td>
                    <td className="p-2 border border-slate-200">0 &le; m &le; 500 e</td>
                    <td className="p-2 border border-slate-200">500 e &lt; m &le; 2,000 e</td>
                    <td className="p-2 border border-slate-200">2,000 e &lt; m &le; 10,000 e</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2 border border-slate-200 font-semibold text-slate-800">
                      Class IIII (Ordinary)
                    </td>
                    <td className="p-2 border border-slate-200">0 &le; m &le; 50 e</td>
                    <td className="p-2 border border-slate-200">50 e &lt; m &le; 200 e</td>
                    <td className="p-2 border border-slate-200">200 e &lt; m &le; 1,000 e</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              * Note: For In-Service Inspection (Clause 3.5.2), the permissible error limit is
              doubled (&times;2).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
