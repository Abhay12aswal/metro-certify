'use client';

import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  CalculatedTestPoint,
  InstrumentData,
  TestMatrixSummary,
} from '../types/metrology';
import {
  LineChart as ChartIcon,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Maximize2,
  GitCommit,
} from 'lucide-react';

interface ErrorCurveVisualizerProps {
  calculatedPoints: CalculatedTestPoint[];
  instrument: InstrumentData;
  summary: TestMatrixSummary;
}

export default function ErrorCurveVisualizer({
  calculatedPoints,
  instrument,
  summary,
}: ErrorCurveVisualizerProps) {
  const [axisMode, setAxisMode] = useState<'mass' | 'divisions'>('mass');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Separate ascending and descending points
  const ascPoints = calculatedPoints.filter((p) => p.sequence === 'ascending');
  const descPoints = calculatedPoints.filter((p) => p.sequence === 'descending');

  // Build sorted chart datasets
  // Combine all distinct loads for continuous step MPE and aligned error curves
  const uniqueLoads = Array.from(
    new Set(calculatedPoints.map((p) => p.appliedLoad))
  ).sort((a, b) => a - b);

  const chartData = uniqueLoads.map((load) => {
    const ascMatch = ascPoints.find((p) => p.appliedLoad === load);
    const descMatch = descPoints.find((p) => p.appliedLoad === load);
    const samplePt = ascMatch || descMatch;

    const mpe = samplePt ? samplePt.mpeDivisions : 1.5;
    const loadDiv = samplePt ? samplePt.loadInDivisions : instrument.verificationInterval > 0 ? load / instrument.verificationInterval : 0;

    return {
      load,
      loadInDivisions: loadDiv,
      displayX: axisMode === 'mass' ? `${load} ${instrument.unit}` : `${loadDiv}e`,
      upperMpe: mpe,
      lowerMpe: -mpe,
      zero: 0,
      ecAscending: ascMatch ? ascMatch.correctedErrorInDivisionsEc : undefined,
      ascDetails: ascMatch,
      ecDescending: descMatch ? descMatch.correctedErrorInDivisionsEc : undefined,
      descDetails: descMatch,
      hasBreach: (ascMatch && !ascMatch.isCompliant) || (descMatch && !descMatch.isCompliant),
    };
  });

  // Calculate Hysteresis error: max difference between loading and unloading error at matching loads
  let maxHysteresis = 0;
  let hysteresisLoad = 0;
  uniqueLoads.forEach((load) => {
    const asc = ascPoints.find((p) => p.appliedLoad === load);
    const desc = descPoints.find((p) => p.appliedLoad === load);
    if (asc && desc) {
      const diff = Math.abs(asc.correctedErrorInDivisionsEc - desc.correctedErrorInDivisionsEc);
      if (diff > maxHysteresis) {
        maxHysteresis = diff;
        hysteresisLoad = load;
      }
    }
  });

  // Custom dot renderer for Ascending points
  const renderAscDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (cx === undefined || cy === undefined || payload?.ecAscending === undefined) return null;
    const isCompliant = payload?.ascDetails?.isCompliant ?? true;

    if (!isCompliant) {
      return (
        <g key={`dot-asc-${payload.load}`}>
          <circle cx={cx} cy={cy} r={7} fill="#ef4444" stroke="#ffffff" strokeWidth={2} className="animate-ping opacity-75" />
          <circle cx={cx} cy={cy} r={6} fill="#dc2626" stroke="#ffffff" strokeWidth={2} />
        </g>
      );
    }

    return (
      <circle
        key={`dot-asc-${payload.load}`}
        cx={cx}
        cy={cy}
        r={4.5}
        fill="#059669"
        stroke="#ffffff"
        strokeWidth={1.5}
      />
    );
  };

  // Custom dot renderer for Descending points
  const renderDescDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (cx === undefined || cy === undefined || payload?.ecDescending === undefined) return null;
    const isCompliant = payload?.descDetails?.isCompliant ?? true;

    if (!isCompliant) {
      return (
        <polygon
          key={`dot-desc-${payload.load}`}
          points={`${cx},${cy - 7} ${cx + 6},${cy + 5} ${cx - 6},${cy + 5}`}
          fill="#dc2626"
          stroke="#ffffff"
          strokeWidth={1.5}
        />
      );
    }

    return (
      <polygon
        key={`dot-desc-${payload.load}`}
        points={`${cx},${cy - 5} ${cx + 5},${cy + 4} ${cx - 5},${cy + 4}`}
        fill="#0284c7"
        stroke="#ffffff"
        strokeWidth={1.5}
      />
    );
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;
    const asc = data.ascDetails as CalculatedTestPoint | undefined;
    const desc = data.descDetails as CalculatedTestPoint | undefined;

    return (
      <div className="bg-slate-900/95 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs font-sans min-w-[240px] backdrop-blur-xs">
        <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2 font-mono">
          <span className="font-bold text-slate-200">
            Test Load: {data.load} {instrument.unit}
          </span>
          <span className="text-slate-400">({data.loadInDivisions}e)</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-amber-400 font-semibold">
            <span>MPE Boundary:</span>
            <span>&plusmn;{data.upperMpe.toFixed(1)}e</span>
          </div>

          {asc && (
            <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
              <div className="flex items-center justify-between font-bold text-emerald-400">
                <span>Ascending (Loading):</span>
                <span className={asc.isCompliant ? 'text-emerald-400' : 'text-rose-400'}>
                  {asc.correctedErrorInDivisionsEc > 0 ? '+' : ''}
                  {asc.correctedErrorInDivisionsEc.toFixed(2)}e
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                <span>Indication I: {asc.indication} {instrument.unit}</span>
                <span>Ec: {asc.correctedErrorEc > 0 ? '+' : ''}{asc.correctedErrorEc.toFixed(4)} {instrument.unit}</span>
              </div>
              <div className="text-[10px] mt-1 font-semibold flex items-center justify-between">
                <span>Status:</span>
                <span className={asc.isCompliant ? 'text-emerald-300' : 'text-rose-400 font-bold'}>
                  {asc.isCompliant ? 'PASSED (Compliant)' : 'FAILED (MPE Breached)'}
                </span>
              </div>
            </div>
          )}

          {desc && (
            <div className="p-2 bg-slate-800/80 rounded border border-slate-700">
              <div className="flex items-center justify-between font-bold text-sky-400">
                <span>Descending (Unloading):</span>
                <span className={desc.isCompliant ? 'text-sky-400' : 'text-rose-400'}>
                  {desc.correctedErrorInDivisionsEc > 0 ? '+' : ''}
                  {desc.correctedErrorInDivisionsEc.toFixed(2)}e
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                <span>Indication I: {desc.indication} {instrument.unit}</span>
                <span>Ec: {desc.correctedErrorEc > 0 ? '+' : ''}{desc.correctedErrorEc.toFixed(4)} {instrument.unit}</span>
              </div>
              <div className="text-[10px] mt-1 font-semibold flex items-center justify-between">
                <span>Status:</span>
                <span className={desc.isCompliant ? 'text-sky-300' : 'text-rose-400 font-bold'}>
                  {desc.isCompliant ? 'PASSED (Compliant)' : 'FAILED (MPE Breached)'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!mounted) {
    return (
      <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
        Loading metrology chart engine...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden no-print">
      {/* Chart Control Bar */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-indigo-100 text-indigo-800 rounded-lg">
            <ChartIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>Module 4: Dynamic Error Curve Visualizer (OIML R 76 Tolerance Envelope)</span>
              {summary.failedPoints > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                  {summary.failedPoints} Breached Point(s)
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  All Errors Inside MPE Envelope
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500">
              Y-Axis plots Corrected Error (E<sub>c</sub> / e) against dynamic stepped Maximum Permissible Error (MPE) limits.
            </p>
          </div>
        </div>

        {/* X-Axis scale toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">X-Axis Scale:</span>
          <div className="flex items-center bg-slate-200 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setAxisMode('mass')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                axisMode === 'mass'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mass ({instrument.unit})
            </button>
            <button
              onClick={() => setAxisMode('divisions')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                axisMode === 'divisions'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Scale Divisions (e)
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="p-5">
        {chartData.length === 0 ? (
          <div className="h-72 flex flex-col items-center justify-center text-slate-400 font-sans">
            <ChartIcon className="w-10 h-10 text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-600">No test data to plot.</p>
            <p className="text-xs text-slate-400">
              Add test readings or load a demo preset to visualize the error curve.
            </p>
          </div>
        ) : (
          <div className="h-84 sm:h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  dataKey="displayX"
                  stroke="#64748b"
                  tick={{ fontSize: 11, fontFamily: 'monospace' }}
                  label={{
                    value:
                      axisMode === 'mass'
                        ? `Applied Test Load L (${instrument.unit})`
                        : `Applied Test Load L (in scale divisions 'e')`,
                    position: 'insideBottom',
                    offset: -12,
                    fontSize: 11,
                    fill: '#475569',
                    fontWeight: 600,
                  }}
                />

                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11, fontFamily: 'monospace' }}
                  domain={[-3.0, 3.0]}
                  ticks={[-2.5, -2.0, -1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5, 2.0, 2.5]}
                  label={{
                    value: `Corrected Error Ec (in verification scale intervals 'e')`,
                    angle: -90,
                    position: 'insideLeft',
                    offset: 5,
                    fontSize: 11,
                    fill: '#475569',
                    fontWeight: 600,
                  }}
                />

                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ fontSize: 12, paddingBottom: 10 }}
                />

                {/* Zero Error Center Baseline */}
                <ReferenceLine
                  y={0}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                />

                {/* Stepped Upper MPE Limit (+MPE) */}
                <Line
                  type="stepAfter"
                  dataKey="upperMpe"
                  name="+MPE Upper Limit"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={false}
                  isAnimationActive={false}
                />

                {/* Stepped Lower MPE Limit (-MPE) */}
                <Line
                  type="stepAfter"
                  dataKey="lowerMpe"
                  name="-MPE Lower Limit"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={false}
                  isAnimationActive={false}
                />

                {/* Ascending Loading Run Error Curve */}
                <Line
                  type="monotone"
                  dataKey="ecAscending"
                  name="Loading (Ascending Run Ec)"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={renderAscDot}
                  activeDot={{ r: 7 }}
                  connectNulls
                />

                {/* Descending Unloading Run Error Curve */}
                <Line
                  type="monotone"
                  dataKey="ecDescending"
                  name="Unloading (Descending Run Ec)"
                  stroke="#0284c7"
                  strokeWidth={2}
                  strokeDasharray="4 3"
                  dot={renderDescDot}
                  activeDot={{ r: 7 }}
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Metrological Analytics & Hysteresis Footer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-slate-50 border-t border-slate-200">
        {/* Card 1: Max Error vs Permissible Envelope */}
        <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Peak Corrected Error</span>
            <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-base font-black text-slate-800">
            {summary.maxAbsoluteErrorEc.toFixed(2)} e{' '}
            <span className="text-xs font-normal text-slate-400">
              (Limit: &plusmn;{summary.maxPermissibleLimit.toFixed(1)}e)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {summary.maxAbsoluteErrorEc <= summary.maxPermissibleLimit
              ? 'Peak error remains strictly inside legal MPE envelope.'
              : 'CRITICAL: Error exceeds permissible legal threshold.'}
          </p>
        </div>

        {/* Card 2: Hysteresis Difference */}
        <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Hysteresis Difference</span>
            <GitCommit className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-base font-black text-slate-800">
            {maxHysteresis > 0 ? `${maxHysteresis.toFixed(2)} e` : '0.00 e'}
            {hysteresisLoad > 0 && (
              <span className="text-xs font-normal text-slate-400 ml-1">
                @ {hysteresisLoad} {instrument.unit}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Max divergence between loading & unloading curves at identical load.
          </p>
        </div>

        {/* Card 3: Metrological Verification Status */}
        <div
          className={`p-3 rounded-lg border shadow-2xs ${
            summary.overallStatus === 'PASS'
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-1">
            <span>OIML Compliance</span>
            {summary.overallStatus === 'PASS' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            )}
          </div>
          <div
            className={`text-base font-black ${
              summary.overallStatus === 'PASS'
                ? 'text-emerald-700'
                : 'text-rose-700'
            }`}
          >
            {summary.overallStatus === 'PASS'
              ? 'COMPLIANT (OIML R 76-1)'
              : 'NON-COMPLIANT (BREACH)'}
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            {summary.overallStatus === 'PASS'
              ? 'All observed points meet Initial Verification requirements.'
              : `${summary.failedPoints} point(s) fail Clause 3.5.1 requirements.`}
          </p>
        </div>
      </div>
    </div>
  );
}
