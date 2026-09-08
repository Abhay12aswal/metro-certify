'use client';

import React, { useState } from 'react';
import { InstrumentData } from '../../types/metrology';
import { CheckCircle, AlertCircle, Layers, Check, X } from 'lucide-react';
import { roundTo } from '../../lib/oiml-engine';

interface AdditionalTestsCardProps {
  instrument: InstrumentData;
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function AdditionalTestsCard({
  instrument,
  language,
  isHighContrast,
}: AdditionalTestsCardProps) {
  const e = instrument.verificationInterval || 0.005;
  const max = instrument.maxCapacity || 15;
  const eccLoad = roundTo(max / 3, 2); // Standard 1/3 Max for non-concentrated load receptors

  // Eccentricity Test State (5 points: Center, Corner 1, Corner 2, Corner 3, Corner 4)
  const [eccentricityPoints, setEccentricityPoints] = useState([
    { pos: '1. Center Receptor (Ref)', indication: eccLoad, added: 0.002, p: eccLoad, ec: 0 },
    { pos: '2. Front-Left Corner', indication: eccLoad, added: 0.0022, p: eccLoad - 0.0002, ec: -0.04 },
    { pos: '3. Back-Left Corner', indication: eccLoad, added: 0.0018, p: eccLoad + 0.0002, ec: +0.04 },
    { pos: '4. Back-Right Corner', indication: eccLoad, added: 0.0025, p: eccLoad - 0.0005, ec: -0.10 },
    { pos: '5. Front-Right Corner', indication: eccLoad, added: 0.0019, p: eccLoad + 0.0001, ec: +0.02 },
  ]);

  // Repeatability Test State (3 series at 1/2 Max and Max)
  const [repeatabilitySeries, setRepeatabilitySeries] = useState([
    { run: 'Run 1 (50% Max)', load: roundTo(max * 0.5, 2), reading: roundTo(max * 0.5, 2) },
    { run: 'Run 2 (50% Max)', load: roundTo(max * 0.5, 2), reading: roundTo(max * 0.5 + 0.001, 3) },
    { run: 'Run 3 (50% Max)', load: roundTo(max * 0.5, 2), reading: roundTo(max * 0.5, 2) },
  ]);

  // Tilt Test State
  const [tiltTestPassed, setTiltTestPassed] = useState(true);

  // Compute Eccentricity Max Error in divisions
  const maxEccError = Math.max(...eccentricityPoints.map((p) => Math.abs(p.ec)));
  const eccLimitDiv = 1.0; // typical 1.0e limit
  const eccPass = maxEccError <= eccLimitDiv;

  // Compute Repeatability Max Spread (Imax - Imin)
  const repReadings = repeatabilitySeries.map((r) => r.reading);
  const repSpread = roundTo(Math.max(...repReadings) - Math.min(...repReadings), 4);
  const repSpreadDiv = e > 0 ? roundTo(repSpread / e, 2) : 0;
  const repLimitDiv = 1.0;
  const repPass = repSpreadDiv <= repLimitDiv;

  return (
    <div
      id="section-additional"
      className={`border rounded p-4 mb-4 transition-colors ${
        isHighContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-slate-300 text-slate-800'
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#002147] text-white flex items-center justify-center text-xs font-bold shrink-0">
            4
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#002147] font-sans">
            {language === 'hi'
              ? 'प्रमुख निष्पादन परीक्षण (उत्केंद्रता, पुनरावृत्ति एवं झुकाव परीक्षण)'
              : 'Section 4: Key Performance Tests (Eccentricity, Repeatability, and Tilt Verification)'}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          OIML R 76-1 Clauses 3.6.1, 3.6.2 & 3.9.1.1
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-sans">
        {/* Sub-Test 1: Eccentricity (Corner Load) Test */}
        <div className="border border-slate-200 rounded p-3 bg-slate-50/50">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <div>
              <h4 className="font-bold text-[#002147] text-xs">
                A. Eccentricity Test (Clause 3.6.2)
              </h4>
              <p className="text-[10px] text-slate-500">
                Applied Load: {eccLoad} {instrument.unit} (~1/3 Max on 4 corners & center)
              </p>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                eccPass ? 'bg-[#15803D] text-white' : 'bg-[#B91C1C] text-white'
              }`}
            >
              {eccPass ? 'PASS' : 'FAIL'}
            </span>
          </div>

          <table className="w-full text-[11px] font-mono border-collapse">
            <thead>
              <tr className="bg-slate-200/60 text-slate-700">
                <th className="p-1 text-left font-sans">Position</th>
                <th className="p-1 text-right font-sans">Indication</th>
                <th className="p-1 text-right font-sans">Error (Ec/e)</th>
                <th className="p-1 text-center font-sans">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {eccentricityPoints.map((pt, idx) => {
                const ptPass = Math.abs(pt.ec) <= eccLimitDiv;
                return (
                  <tr key={idx} className="bg-white">
                    <td className="p-1 font-sans text-slate-700">{pt.pos}</td>
                    <td className="p-1 text-right font-bold text-slate-900">
                      {pt.indication.toFixed(3)}
                    </td>
                    <td className="p-1 text-right font-bold">
                      {pt.ec > 0 ? `+${pt.ec.toFixed(2)}` : pt.ec.toFixed(2)}e
                    </td>
                    <td className="p-1 text-center">
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold font-sans ${
                          ptPass ? 'bg-emerald-100 text-[#15803D]' : 'bg-red-100 text-[#B91C1C]'
                        }`}
                      >
                        {ptPass ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-2 text-[10px] text-slate-500 font-sans flex justify-between">
            <span>
              Peak Corner Divergence: <strong>{maxEccError.toFixed(2)}e</strong>
            </span>
            <span>
              Permissible Limit: <strong>&plusmn;{eccLimitDiv.toFixed(1)}e</strong>
            </span>
          </div>
        </div>

        {/* Sub-Test 2: Repeatability Test (Clause 3.6.1) */}
        <div className="border border-slate-200 rounded p-3 bg-slate-50/50">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
            <div>
              <h4 className="font-bold text-[#002147] text-xs">
                B. Repeatability Test (Clause 3.6.1)
              </h4>
              <p className="text-[10px] text-slate-500">
                Successive weighings (Imax &minus; Imin &le; |MPE|)
              </p>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                repPass ? 'bg-[#15803D] text-white' : 'bg-[#B91C1C] text-white'
              }`}
            >
              {repPass ? 'PASS' : 'FAIL'}
            </span>
          </div>

          <table className="w-full text-[11px] font-mono border-collapse">
            <thead>
              <tr className="bg-slate-200/60 text-slate-700">
                <th className="p-1 text-left font-sans">Observation</th>
                <th className="p-1 text-right font-sans">Load Applied</th>
                <th className="p-1 text-right font-sans">Indication (I)</th>
                <th className="p-1 text-center font-sans">Tolerance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {repeatabilitySeries.map((r, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="p-1 font-sans text-slate-700">{r.run}</td>
                  <td className="p-1 text-right text-slate-600 font-bold">{r.load.toFixed(2)}</td>
                  <td className="p-1 text-right font-bold text-[#002147]">
                    {r.reading.toFixed(3)}
                  </td>
                  <td className="p-1 text-center text-slate-500 font-sans">Valid</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2 text-[10px] text-slate-500 font-sans space-y-1">
            <div className="flex justify-between">
              <span>
                Maximum Range Difference (I<sub>max</sub> &minus; I<sub>min</sub>):
              </span>
              <strong className="text-slate-800">
                {repSpread.toFixed(4)} {instrument.unit} ({repSpreadDiv}e)
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Allowable Repeatability Limit:</span>
              <strong className="text-[#15803D]">&le; {repLimitDiv.toFixed(1)}e</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
