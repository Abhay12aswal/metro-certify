'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  RotateCcw,
  Sliders,
} from 'lucide-react';
import {
  CalculatedTestPoint,
  InstrumentData,
  RawTestPointInput,
  TestMatrixSummary,
  LoadSequence,
} from '../types/metrology';
import { generateStandardTestLoads } from '../lib/oiml-engine';

interface WeighingTestMatrixProps {
  calculatedPoints: CalculatedTestPoint[];
  rawPoints: RawTestPointInput[];
  setRawPoints: React.Dispatch<React.SetStateAction<RawTestPointInput[]>>;
  instrument: InstrumentData;
  summary: TestMatrixSummary;
}

export default function WeighingTestMatrix({
  calculatedPoints,
  rawPoints,
  setRawPoints,
  instrument,
  summary,
}: WeighingTestMatrixProps) {
  const [filterSequence, setFilterSequence] = useState<'all' | 'ascending' | 'descending'>('all');

  // Handle cell edit in the observation table
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

  // Add custom test row
  const handleAddRow = (sequence: LoadSequence = 'ascending') => {
    const newId = `custom-point-${Date.now()}`;
    const newPoint: RawTestPointInput = {
      id: newId,
      sequence,
      stepLabel: `${sequence === 'ascending' ? 'Asc' : 'Desc'} Load Step`,
      appliedLoad: sequence === 'ascending' ? instrument.maxCapacity / 2 : instrument.maxCapacity / 2,
      indication: sequence === 'ascending' ? instrument.maxCapacity / 2 : instrument.maxCapacity / 2,
      addedLoad: 0.5 * instrument.actualDivision,
      notes: 'Custom test point',
    };
    setRawPoints((prev) => [...prev, newPoint]);
  };

  // Delete row
  const handleDeleteRow = (id: string) => {
    setRawPoints((prev) => prev.filter((p) => p.id !== id));
  };

  // Auto-generate standard OIML R 76-1 test loads
  const handleGenerateStandardSteps = () => {
    const { ascending, descending } = generateStandardTestLoads(instrument);
    const generated: RawTestPointInput[] = [];

    // Ascending cycle
    ascending.forEach((step, idx) => {
      generated.push({
        id: `gen-asc-${idx}-${Date.now()}`,
        sequence: 'ascending',
        stepLabel: step.label,
        appliedLoad: step.load,
        indication: step.load,
        addedLoad: 0.5 * instrument.actualDivision, // Perfect zero-turning point default
        notes: `Standard OIML loading point`,
      });
    });

    // Descending cycle
    descending.forEach((step, idx) => {
      generated.push({
        id: `gen-desc-${idx}-${Date.now()}`,
        sequence: 'descending',
        stepLabel: step.label,
        appliedLoad: step.load,
        indication: step.load,
        addedLoad: 0.5 * instrument.actualDivision,
        notes: `Standard OIML unloading point`,
      });
    });

    setRawPoints(generated);
  };

  // Clear all rows
  const handleClearAll = () => {
    setRawPoints([]);
  };

  // Filter points for display
  const displayedPoints = calculatedPoints.filter((pt) => {
    if (filterSequence === 'all') return true;
    return pt.sequence === filterSequence;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden no-print">
      {/* Table Toolbar Header */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">
              Module 3: Weighing Performance Test Matrix (OIML Clauses A.4.4 & R 76-2)
            </h2>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                summary.overallStatus === 'PASS'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {summary.overallStatus} ({summary.passedPoints}/{summary.totalPoints} Passed)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time turning point indication P, true error E, zero-error deduction E₀, and dynamic MPE evaluation.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Cycle filter pills */}
          <div className="flex items-center bg-slate-200/80 p-0.5 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterSequence('all')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                filterSequence === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({calculatedPoints.length})
            </button>
            <button
              onClick={() => setFilterSequence('ascending')}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                filterSequence === 'ascending'
                  ? 'bg-white text-emerald-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowUpRight className="w-3 h-3 text-emerald-600" />
              <span>Loading</span>
            </button>
            <button
              onClick={() => setFilterSequence('descending')}
              className={`px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                filterSequence === 'descending'
                  ? 'bg-white text-sky-800 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ArrowDownRight className="w-3 h-3 text-sky-600" />
              <span>Unloading</span>
            </button>
          </div>

          {/* Generate Standard Steps Button */}
          <button
            onClick={handleGenerateStandardSteps}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-semibold transition cursor-pointer"
            title="Auto-calculate standard OIML load points (Min, 500e, 1000e, 2000e, Max)"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Generate Standard Steps</span>
          </button>

          {/* Add Row Button */}
          <button
            onClick={() => handleAddRow('ascending')}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>

          {/* Clear Rows */}
          {rawPoints.length > 0 && (
            <button
              onClick={handleClearAll}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
              title="Clear all test points"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Observation Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
              <th className="py-2.5 px-3 font-bold w-12 text-center">#</th>
              <th className="py-2.5 px-3 font-bold">
                <span className="flex items-center gap-1">
                  Load Sequence
                  <span title="Loading (Ascending) or Unloading (Descending) stage">
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                  </span>
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold">
                <span className="flex items-center gap-1">
                  Applied Load (L)
                  <span className="text-slate-400 font-normal">[{instrument.unit}]</span>
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold">
                <span className="flex items-center gap-1">
                  Indication (I)
                  <span className="text-slate-400 font-normal">[{instrument.unit}]</span>
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold">
                <span className="flex items-center gap-1 text-blue-900">
                  Added Load (&Delta;L)
                  <span title="Small weights added until indication switches to I + d (Clause A.4.4.3)">
                    <HelpCircle className="w-3 h-3 text-blue-500" />
                  </span>
                  <span className="text-slate-400 font-normal">[{instrument.unit}]</span>
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold bg-slate-50">
                <span className="flex items-center gap-1 text-indigo-900">
                  Indication P
                  <span title="P = I + 0.5d - ΔL (Indication prior to rounding)">
                    <HelpCircle className="w-3 h-3 text-indigo-500" />
                  </span>
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold bg-slate-50">
                <span className="flex items-center gap-1">
                  True Error (E)
                  <span title="E = P - L">
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                  </span>
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold bg-blue-50/50">
                <span className="flex items-center gap-1 text-emerald-950 font-black">
                  Corrected Error (E<sub>c</sub>)
                  <span title="Ec = E - E0 (True error minus error at zero load)">
                    <HelpCircle className="w-3 h-3 text-emerald-600" />
                  </span>
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold">
                <span title="Ec expressed in scale intervals (e)">
                  E<sub>c</sub> (in e)
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold">
                <span className="flex items-center gap-1">
                  MPE Limit
                  <span title="Maximum Permissible Error as per OIML R 76-1 Table 6">
                    <HelpCircle className="w-3 h-3 text-slate-400" />
                  </span>
                </span>
              </th>
              <th className="py-2.5 px-3 font-bold text-center">Status</th>
              <th className="py-2.5 px-3 font-bold text-center w-10">Act</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 font-mono">
            {displayedPoints.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-12 text-center text-slate-400 font-sans">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Layers className="w-8 h-8 text-slate-300" />
                    <p className="text-sm font-medium text-slate-600">
                      No test observations recorded yet.
                    </p>
                    <p className="text-xs text-slate-400 max-w-md">
                      Click <strong className="text-blue-600">"Generate Standard Steps"</strong> above or{' '}
                      <strong className="text-emerald-600">"Load Sample Standard Test"</strong> from the top bar to populate authentic metrology data.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              displayedPoints.map((pt, index) => {
                const isBreach = !pt.isCompliant;
                const isZeroPoint = pt.appliedLoad === 0;

                return (
                  <tr
                    key={pt.id}
                    className={`transition ${
                      isBreach
                        ? 'bg-rose-50/90 text-rose-950 font-semibold'
                        : index % 2 === 0
                        ? 'bg-white hover:bg-slate-50/80'
                        : 'bg-slate-50/40 hover:bg-slate-50'
                    }`}
                  >
                    {/* Index */}
                    <td className="py-2 px-3 text-center text-slate-400 font-sans text-[11px]">
                      {index + 1}
                    </td>

                    {/* Sequence & Label */}
                    <td className="py-2 px-3 font-sans">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            pt.sequence === 'ascending'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {pt.sequence === 'ascending' ? (
                            <ArrowUpRight className="w-3 h-3 mr-0.5" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-0.5" />
                          )}
                          {pt.sequence === 'ascending' ? 'ASC' : 'DESC'}
                        </span>
                        <input
                          type="text"
                          value={pt.stepLabel}
                          onChange={(e) =>
                            handleUpdateRow(pt.id, 'stepLabel', e.target.value)
                          }
                          className="text-xs font-semibold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-hidden w-28"
                        />
                      </div>
                    </td>

                    {/* Applied Load L */}
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="any"
                        value={pt.appliedLoad}
                        onChange={(e) =>
                          handleUpdateRow(pt.id, 'appliedLoad', e.target.value)
                        }
                        className="w-20 px-2 py-1 bg-white border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden text-xs font-mono"
                      />
                    </td>

                    {/* Indication I */}
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="any"
                        value={pt.indication}
                        onChange={(e) =>
                          handleUpdateRow(pt.id, 'indication', e.target.value)
                        }
                        className="w-20 px-2 py-1 bg-white border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden text-xs font-mono"
                      />
                    </td>

                    {/* Added Load ΔL */}
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="any"
                        value={pt.addedLoad}
                        onChange={(e) =>
                          handleUpdateRow(pt.id, 'addedLoad', e.target.value)
                        }
                        className="w-20 px-2 py-1 bg-blue-50/60 border border-blue-200 rounded focus:ring-1 focus:ring-blue-500 focus:outline-hidden text-xs font-mono text-blue-900"
                        title="Small load added until I increments to I+d"
                      />
                    </td>

                    {/* Calculated Turning Point P */}
                    <td className="py-2 px-3 bg-slate-50/80 font-bold text-slate-800">
                      {pt.turningPointP.toFixed(4)}
                    </td>

                    {/* True Error E */}
                    <td className="py-2 px-3 bg-slate-50/80 text-slate-700">
                      {pt.trueErrorE > 0 ? `+${pt.trueErrorE.toFixed(4)}` : pt.trueErrorE.toFixed(4)}
                    </td>

                    {/* Corrected Error Ec */}
                    <td className="py-2 px-3 bg-blue-50/30 font-black text-slate-900">
                      {pt.correctedErrorEc > 0
                        ? `+${pt.correctedErrorEc.toFixed(4)}`
                        : pt.correctedErrorEc.toFixed(4)}
                      {isZeroPoint && (
                        <span className="ml-1 text-[9px] font-sans font-normal text-slate-400">
                          (E₀ base)
                        </span>
                      )}
                    </td>

                    {/* Ec in divisions */}
                    <td
                      className={`py-2 px-3 font-bold ${
                        isBreach ? 'text-rose-600' : 'text-slate-800'
                      }`}
                    >
                      {pt.correctedErrorInDivisionsEc > 0
                        ? `+${pt.correctedErrorInDivisionsEc.toFixed(2)}`
                        : pt.correctedErrorInDivisionsEc.toFixed(2)}
                      e
                    </td>

                    {/* MPE Limit */}
                    <td className="py-2 px-3 text-slate-600 font-medium">
                      &plusmn;{pt.mpeDivisions.toFixed(1)}e{' '}
                      <span className="text-[10px] text-slate-400">
                        ({pt.mpeMass} {instrument.unit})
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-2 px-3 text-center font-sans">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          pt.isCompliant
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                        }`}
                      >
                        {pt.isCompliant ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>PASS</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-rose-600" />
                            <span>FAIL</span>
                          </>
                        )}
                      </span>
                    </td>

                    {/* Delete Action */}
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => handleDeleteRow(pt.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                        title="Remove test observation"
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

      {/* Metrological Formula Legend & Summary Bar */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-sans">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              Zero Load Baseline Error (E₀):{' '}
              <strong className="text-slate-800 font-mono">
                {summary.zeroErrorE0.toFixed(4)} {instrument.unit} (
                {summary.zeroErrorInDivisionsE0 > 0 ? `+` : ''}
                {summary.zeroErrorInDivisionsE0}e)
              </strong>
            </span>
          </span>
          <span className="text-slate-300">•</span>
          <span>
            Turning Point Formula:{' '}
            <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded font-semibold font-mono">
              P = I + 0.5d &minus; &Delta;L
            </code>
          </span>
          <span className="text-slate-300">•</span>
          <span>
            Corrected Error Formula:{' '}
            <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded font-semibold font-mono">
              E<sub>c</sub> = (P &minus; L) &minus; E<sub>0</sub>
            </code>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>
            Passed:{' '}
            <strong className="text-emerald-700">{summary.passedPoints}</strong>
          </span>
          <span>
            Failed:{' '}
            <strong
              className={
                summary.failedPoints > 0 ? 'text-rose-600' : 'text-slate-700'
              }
            >
              {summary.failedPoints}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
