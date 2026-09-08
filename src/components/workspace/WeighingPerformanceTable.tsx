'use client';

import React, { useState } from 'react';
import {
  CalculatedTestPoint,
  InstrumentData,
  RawTestPointInput,
  TestMatrixSummary,
  LoadSequence,
} from '../../types/metrology';
import { generateStandardTestLoads } from '../../lib/oiml-engine';
import {
  Plus,
  Trash2,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from 'lucide-react';

interface WeighingPerformanceTableProps {
  calculatedPoints: CalculatedTestPoint[];
  rawPoints: RawTestPointInput[];
  setRawPoints: React.Dispatch<React.SetStateAction<RawTestPointInput[]>>;
  instrument: InstrumentData;
  summary: TestMatrixSummary;
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function WeighingPerformanceTable({
  calculatedPoints,
  rawPoints,
  setRawPoints,
  instrument,
  summary,
  language,
  isHighContrast,
}: WeighingPerformanceTableProps) {
  const [filterSeq, setFilterSeq] = useState<'all' | 'ascending' | 'descending'>('all');

  const handleUpdateRow = (
    id: string,
    field: keyof RawTestPointInput,
    val: string | number
  ) => {
    setRawPoints((prev) =>
      prev.map((pt) => {
        if (pt.id !== id) return pt;
        if (field === 'appliedLoad' || field === 'indication' || field === 'addedLoad') {
          const num = parseFloat(String(val));
          return { ...pt, [field]: isNaN(num) ? 0 : num };
        }
        return { ...pt, [field]: val };
      })
    );
  };

  const handleAddRow = (sequence: LoadSequence = 'ascending') => {
    const newId = `pt-${Date.now()}`;
    const newPoint: RawTestPointInput = {
      id: newId,
      sequence,
      stepLabel: `${sequence === 'ascending' ? 'Loading' : 'Unloading'} Step`,
      appliedLoad: instrument.maxCapacity / 2,
      indication: instrument.maxCapacity / 2,
      addedLoad: 0.5 * (instrument.actualDivision || instrument.verificationInterval),
      notes: 'Custom test step',
    };
    setRawPoints((prev) => [...prev, newPoint]);
  };

  const handleDeleteRow = (id: string) => {
    setRawPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const handleGenerateStandardSteps = () => {
    const { ascending, descending } = generateStandardTestLoads(instrument);
    const d = instrument.actualDivision || instrument.verificationInterval;
    const generated: RawTestPointInput[] = [];

    ascending.forEach((step, idx) => {
      generated.push({
        id: `gen-asc-${idx}-${Date.now()}`,
        sequence: 'ascending',
        stepLabel: step.label,
        appliedLoad: step.load,
        indication: step.load,
        addedLoad: 0.5 * d,
        notes: 'Standard loading point',
      });
    });

    descending.forEach((step, idx) => {
      generated.push({
        id: `gen-desc-${idx}-${Date.now()}`,
        sequence: 'descending',
        stepLabel: step.label,
        appliedLoad: step.load,
        indication: step.load,
        addedLoad: 0.5 * d,
        notes: 'Standard unloading point',
      });
    });

    setRawPoints(generated);
  };

  const displayedPoints = calculatedPoints.filter((pt) => {
    if (filterSeq === 'all') return true;
    return pt.sequence === filterSeq;
  });

  return (
    <div
      id="section-weighing"
      className={`border rounded mb-4 transition-colors overflow-hidden ${
        isHighContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-slate-300 text-slate-800'
      }`}
    >
      {/* Table Section Header */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#002147] text-white flex items-center justify-center text-xs font-bold shrink-0">
              3
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002147] font-sans">
              {language === 'hi'
                ? 'भार निष्पादन परीक्षण अवलोकन तालिका (ओआईएमएल खंड ए.4.4)'
                : 'Section 3: Weighing Performance Test Observation Table (OIML Clauses A.4.4 & R 76-2)'}
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 font-sans mt-0.5">
            Turning point method indication P = I + 0.5d &minus; &Delta;L &bull; Zero offset E₀ ={' '}
            {summary.zeroErrorE0.toFixed(4)} {instrument.unit} ({summary.zeroErrorInDivisionsE0 > 0 ? '+' : ''}
            {summary.zeroErrorInDivisionsE0}e)
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Cycle filter */}
          <div className="flex items-center bg-slate-200 p-0.5 rounded text-[11px] font-sans">
            <button
              onClick={() => setFilterSeq('all')}
              className={`px-2 py-0.5 rounded cursor-pointer font-medium ${
                filterSeq === 'all' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              All ({calculatedPoints.length})
            </button>
            <button
              onClick={() => setFilterSeq('ascending')}
              className={`px-2 py-0.5 rounded cursor-pointer font-medium ${
                filterSeq === 'ascending' ? 'bg-white text-emerald-800 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              Loading (▲)
            </button>
            <button
              onClick={() => setFilterSeq('descending')}
              className={`px-2 py-0.5 rounded cursor-pointer font-medium ${
                filterSeq === 'descending' ? 'bg-white text-blue-800 font-bold shadow-2xs' : 'text-slate-600'
              }`}
            >
              Unloading (▼)
            </button>
          </div>

          {/* Generate Standard Steps Button */}
          <button
            onClick={handleGenerateStandardSteps}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#002147] text-white hover:bg-[#0A3A60] rounded text-xs font-bold transition cursor-pointer"
            title="Auto-calculate OIML standard test loads (0, Min, 500e, 1000e, 2000e, Max)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Generate Standard Steps</span>
          </button>

          {/* Add Row Button */}
          <button
            onClick={() => handleAddRow('ascending')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 rounded text-xs font-semibold transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-600" />
            <span>Add Row</span>
          </button>

          {rawPoints.length > 0 && (
            <button
              onClick={() => setRawPoints([])}
              className="p-1 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition cursor-pointer"
              title="Clear all test points"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* High-Density Data Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 font-bold text-[11px]">
              <th className="py-2 px-2.5 text-center w-10 border-r border-slate-200">#</th>
              <th className="py-2 px-2.5 border-r border-slate-200">Stage & Label</th>
              <th className="py-2 px-2.5 border-r border-slate-200">
                Load L [{instrument.unit}]
              </th>
              <th className="py-2 px-2.5 border-r border-slate-200">
                Indication I [{instrument.unit}]
              </th>
              <th className="py-2 px-2.5 border-r border-slate-200 bg-blue-50/60 text-[#002147]">
                Added &Delta;L [{instrument.unit}]
              </th>
              <th className="py-2 px-2.5 border-r border-slate-200 bg-slate-50 text-slate-700">
                P (Before Rounding)
              </th>
              <th className="py-2 px-2.5 border-r border-slate-200 text-slate-700">
                True Error E
              </th>
              <th className="py-2 px-2.5 border-r border-slate-200 font-black text-slate-900 bg-slate-50">
                Corrected E<sub>c</sub> [E&minus;E₀]
              </th>
              <th className="py-2 px-2.5 border-r border-slate-200 font-bold">
                E<sub>c</sub> (in e)
              </th>
              <th className="py-2 px-2.5 border-r border-slate-200 text-slate-700">
                Permissible Limit (&plusmn;MPE)
              </th>
              <th className="py-2 px-2.5 text-center border-r border-slate-200">Status</th>
              <th className="py-2 px-2 text-center w-8">Act</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
            {displayedPoints.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-8 text-center text-slate-500 font-sans">
                  No observation points entered yet. Click{' '}
                  <strong className="text-[#002147]">"Generate Standard Steps"</strong> above or select a preset from the sidebar.
                </td>
              </tr>
            ) : (
              displayedPoints.map((pt, index) => {
                const isBreach = !pt.isCompliant;
                return (
                  <tr
                    key={pt.id}
                    className={`transition-colors ${
                      isBreach
                        ? 'bg-red-50/90 text-red-950 font-bold'
                        : index % 2 === 0
                        ? 'bg-white'
                        : 'bg-slate-50/50'
                    }`}
                  >
                    {/* Index */}
                    <td className="py-1.5 px-2.5 text-center text-slate-500 font-sans border-r border-slate-200">
                      {index + 1}
                    </td>

                    {/* Stage & Label */}
                    <td className="py-1.5 px-2.5 font-sans border-r border-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            pt.sequence === 'ascending'
                              ? 'bg-slate-200 text-slate-800'
                              : 'bg-blue-100 text-[#002147]'
                          }`}
                        >
                          {pt.sequence === 'ascending' ? '▲ LOAD' : '▼ UNLOAD'}
                        </span>
                        <input
                          type="text"
                          value={pt.stepLabel}
                          onChange={(e) => handleUpdateRow(pt.id, 'stepLabel', e.target.value)}
                          className="w-24 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#002147] focus:outline-hidden text-xs font-semibold"
                        />
                      </div>
                    </td>

                    {/* Applied Load L */}
                    <td className="py-1.5 px-2.5 border-r border-slate-200">
                      <input
                        type="number"
                        step="any"
                        value={pt.appliedLoad}
                        onChange={(e) => handleUpdateRow(pt.id, 'appliedLoad', e.target.value)}
                        className="w-16 h-6 px-1.5 bg-white border border-slate-300 rounded text-xs font-mono font-bold focus:border-[#002147] outline-hidden"
                      />
                    </td>

                    {/* Indication I */}
                    <td className="py-1.5 px-2.5 border-r border-slate-200">
                      <input
                        type="number"
                        step="any"
                        value={pt.indication}
                        onChange={(e) => handleUpdateRow(pt.id, 'indication', e.target.value)}
                        className="w-16 h-6 px-1.5 bg-white border border-slate-300 rounded text-xs font-mono focus:border-[#002147] outline-hidden"
                      />
                    </td>

                    {/* Added Load ΔL */}
                    <td className="py-1.5 px-2.5 border-r border-slate-200 bg-blue-50/30">
                      <input
                        type="number"
                        step="any"
                        value={pt.addedLoad}
                        onChange={(e) => handleUpdateRow(pt.id, 'addedLoad', e.target.value)}
                        className="w-16 h-6 px-1.5 bg-white border border-blue-300 rounded text-xs font-mono font-bold text-blue-900 focus:border-[#002147] outline-hidden"
                        title="Small load added until display switches to I + d"
                      />
                    </td>

                    {/* P */}
                    <td className="py-1.5 px-2.5 border-r border-slate-200 bg-slate-50 text-slate-800 font-bold">
                      {pt.turningPointP.toFixed(4)}
                    </td>

                    {/* E */}
                    <td className="py-1.5 px-2.5 border-r border-slate-200 text-slate-700">
                      {pt.trueErrorE > 0 ? `+${pt.trueErrorE.toFixed(4)}` : pt.trueErrorE.toFixed(4)}
                    </td>

                    {/* Corrected Error Ec */}
                    <td className="py-1.5 px-2.5 border-r border-slate-200 font-black text-slate-900 bg-slate-50">
                      {pt.correctedErrorEc > 0
                        ? `+${pt.correctedErrorEc.toFixed(4)}`
                        : pt.correctedErrorEc.toFixed(4)}
                    </td>

                    {/* Ec in divisions */}
                    <td
                      className={`py-1.5 px-2.5 border-r border-slate-200 font-black ${
                        isBreach ? 'text-[#B91C1C]' : 'text-slate-900'
                      }`}
                    >
                      {pt.correctedErrorInDivisionsEc > 0
                        ? `+${pt.correctedErrorInDivisionsEc.toFixed(2)}`
                        : pt.correctedErrorInDivisionsEc.toFixed(2)}
                      e
                    </td>

                    {/* MPE */}
                    <td className="py-1.5 px-2.5 border-r border-slate-200 text-slate-700">
                      &plusmn;{pt.mpeDivisions.toFixed(1)}e{' '}
                      <span className="text-[10px] text-slate-500">
                        ({pt.mpeMass} {instrument.unit})
                      </span>
                    </td>

                    {/* Solid Status Badge (No glowing/animated tags) */}
                    <td className="py-1.5 px-2.5 text-center border-r border-slate-200 font-sans">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          pt.isCompliant
                            ? 'bg-[#15803D] text-white'
                            : 'bg-[#B91C1C] text-white'
                        }`}
                      >
                        {pt.isCompliant ? 'PASS' : 'FAIL'}
                      </span>
                    </td>

                    {/* Delete */}
                    <td className="py-1.5 px-2 text-center">
                      <button
                        onClick={() => handleDeleteRow(pt.id)}
                        className="text-slate-400 hover:text-red-700 transition cursor-pointer"
                        title="Delete point"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Observation Table Footer Disclosures */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-300 text-[11px] font-sans text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span>
            Total Points Evaluated: <strong>{summary.totalPoints}</strong>
          </span>
          <span>&bull;</span>
          <span>
            Compliant Points: <strong className="text-[#15803D]">{summary.passedPoints}</strong>
          </span>
          <span>&bull;</span>
          <span>
            Tolerance Breaches: <strong className="text-[#B91C1C]">{summary.failedPoints}</strong>
          </span>
        </div>
        <div className="text-slate-500 font-mono text-[10px]">
          Evaluation Protocol: OIML R 76-1:2006 Clause A.4.4.3
        </div>
      </div>
    </div>
  );
}
