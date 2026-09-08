'use client';

import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Layers,
  Activity,
  Maximize2,
  Sliders,
} from 'lucide-react';
import { TestMatrixSummary, InstrumentData } from '../types/metrology';

interface QuickStatsBarProps {
  summary: TestMatrixSummary;
  instrument: InstrumentData;
}

export default function QuickStatsBar({ summary, instrument }: QuickStatsBarProps) {
  const { totalPoints, passedPoints, failedPoints, zeroErrorInDivisionsE0, maxAbsoluteErrorEc, maxPermissibleLimit, overallStatus } =
    summary;

  const compliancePercentage =
    totalPoints > 0 ? Math.round((passedPoints / totalPoints) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 no-print">
      {/* 1. Overall Verdict */}
      <div
        className={`p-3.5 rounded-xl border flex flex-col justify-between transition ${
          totalPoints === 0
            ? 'bg-white border-slate-200'
            : overallStatus === 'PASS'
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 text-emerald-950'
            : 'bg-gradient-to-br from-rose-50 to-red-50 border-rose-200 text-rose-950'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Metrology Verdict
          </span>
          {overallStatus === 'PASS' ? (
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          )}
        </div>
        <div className="mt-1">
          <div
            className={`text-lg font-black tracking-tight ${
              overallStatus === 'PASS' ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {totalPoints === 0 ? 'READY' : overallStatus}
          </div>
          <div className="text-[10px] text-slate-500">
            {totalPoints === 0
              ? 'Awaiting test inputs'
              : overallStatus === 'PASS'
              ? 'Within OIML R 76-1 limits'
              : `${failedPoints} point(s) exceed MPE`}
          </div>
        </div>
      </div>

      {/* 2. Tested Points Ratio */}
      <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Pass / Total
          </span>
          <Layers className="w-4 h-4 text-blue-600" />
        </div>
        <div className="mt-1">
          <div className="text-lg font-black text-slate-800">
            {passedPoints} <span className="text-xs font-normal text-slate-400">/ {totalPoints}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                failedPoints === 0 ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ width: `${compliancePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Scale Division Count n */}
      <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Divisions (n)
          </span>
          <Sliders className="w-4 h-4 text-indigo-600" />
        </div>
        <div className="mt-1">
          <div className="text-lg font-black text-slate-800">
            {instrument.scaleIntervalCount.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            e = {instrument.verificationInterval} {instrument.unit}
          </div>
        </div>
      </div>

      {/* 4. Zero Error E0 */}
      <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Zero Error (E₀)
          </span>
          <Activity className="w-4 h-4 text-cyan-600" />
        </div>
        <div className="mt-1">
          <div className="text-lg font-black text-slate-800">
            {zeroErrorInDivisionsE0 > 0 ? `+${zeroErrorInDivisionsE0}` : zeroErrorInDivisionsE0}
            <span className="text-xs font-semibold text-slate-400 ml-1">e</span>
          </div>
          <div className="text-[10px] text-slate-500">
            {summary.zeroErrorE0.toFixed(4)} {instrument.unit}
          </div>
        </div>
      </div>

      {/* 5. Max Absolute Error |Ec| */}
      <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Max |E<sub>c</sub>|
          </span>
          <Maximize2 className="w-4 h-4 text-amber-600" />
        </div>
        <div className="mt-1">
          <div
            className={`text-lg font-black ${
              maxAbsoluteErrorEc > maxPermissibleLimit && maxPermissibleLimit > 0
                ? 'text-rose-600'
                : 'text-slate-800'
            }`}
          >
            {maxAbsoluteErrorEc.toFixed(2)}
            <span className="text-xs font-semibold text-slate-400 ml-1">e</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Max Limit: &plusmn;{maxPermissibleLimit.toFixed(1)}e
          </div>
        </div>
      </div>

      {/* 6. Legal Tolerance Safety Margin */}
      <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex flex-col justify-between shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            MPE Margin
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="mt-1">
          {maxPermissibleLimit > 0 ? (
            <>
              <div
                className={`text-lg font-black ${
                  maxAbsoluteErrorEc > maxPermissibleLimit
                    ? 'text-rose-600'
                    : 'text-emerald-700'
                }`}
              >
                {maxAbsoluteErrorEc > maxPermissibleLimit
                  ? `-${(maxAbsoluteErrorEc - maxPermissibleLimit).toFixed(2)}e`
                  : `+${(maxPermissibleLimit - maxAbsoluteErrorEc).toFixed(2)}e`}
              </div>
              <div className="text-[10px] text-slate-500">
                {maxAbsoluteErrorEc > maxPermissibleLimit ? 'Tolerance Breached' : 'Within Tolerance'}
              </div>
            </>
          ) : (
            <>
              <div className="text-lg font-black text-slate-400">-</div>
              <div className="text-[10px] text-slate-400">N/A</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
