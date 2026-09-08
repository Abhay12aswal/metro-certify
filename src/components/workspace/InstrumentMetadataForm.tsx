'use client';

import React from 'react';
import { InstrumentData, AccuracyClass, WeightUnit } from '../../types/metrology';
import { Scale, Info, AlertTriangle } from 'lucide-react';
import { roundTo } from '../../lib/oiml-engine';

interface InstrumentMetadataFormProps {
  instrument: InstrumentData;
  setInstrument: React.Dispatch<React.SetStateAction<InstrumentData>>;
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function InstrumentMetadataForm({
  instrument,
  setInstrument,
  language,
  isHighContrast,
}: InstrumentMetadataFormProps) {
  const handleFieldChange = (field: keyof InstrumentData, value: string | number) => {
    setInstrument((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'maxCapacity' || field === 'verificationInterval') {
        const max = field === 'maxCapacity' ? Number(value) : prev.maxCapacity;
        const e = field === 'verificationInterval' ? Number(value) : prev.verificationInterval;
        if (e > 0 && max > 0) {
          updated.scaleIntervalCount = Math.round(max / e);
        }
      }
      return updated;
    });
  };

  const n = instrument.scaleIntervalCount;
  const e = instrument.verificationInterval;
  const min = instrument.minCapacity;
  const minRatio = e > 0 ? roundTo(min / e, 1) : 0;
  const isClassIIIOverLimit = instrument.accuracyClass === 'class_III' && n > 10000;
  const isMinBelowNorm = instrument.accuracyClass === 'class_III' && minRatio < 20 && min > 0;

  return (
    <div
      id="section-instrument"
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
            1
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#002147] font-sans">
            {language === 'hi'
              ? 'उपकरण मास्टर विवरण एवं मेट्रोलॉजिकल विशेषताएं'
              : 'Section 1: Instrument Master Metadata & Metrological Specifications'}
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          OIML R 76-1 Clause 3.1 & 3.2
        </span>
      </div>

      {/* High-Density Form Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-sans">
        {/* Manufacturer */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Manufacturer Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={instrument.manufacturer}
            onChange={(e) => handleFieldChange('manufacturer', e.target.value)}
            placeholder="e.g. Avery Weigh-Tronix India Ltd."
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-medium"
          />
        </div>

        {/* Model */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Model Designation <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={instrument.model}
            onChange={(e) => handleFieldChange('model', e.target.value)}
            placeholder="e.g. POS-Pro 15K"
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-medium"
          />
        </div>

        {/* Serial Number */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Instrument Serial No. <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={instrument.serialNumber}
            onChange={(e) => handleFieldChange('serialNumber', e.target.value)}
            placeholder="e.g. IND/RRSL/2026/0892"
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono font-medium"
          />
        </div>

        {/* Accuracy Class */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Accuracy Class (OIML) <span className="text-red-600">*</span>
          </label>
          <select
            value={instrument.accuracyClass}
            onChange={(e) =>
              handleFieldChange('accuracyClass', e.target.value as AccuracyClass)
            }
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-bold"
          >
            <option value="class_I">Class I - Special Accuracy (Analytical)</option>
            <option value="class_II">Class II - High Accuracy (Precision Balance)</option>
            <option value="class_III">Class III - Medium Accuracy (Trade / Counter Scale)</option>
            <option value="class_IIII">Class IIII - Ordinary Accuracy (Platform / Weighbridge)</option>
          </select>
        </div>

        {/* Measurement Unit */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Unit of Mass
          </label>
          <select
            value={instrument.unit}
            onChange={(e) => handleFieldChange('unit', e.target.value as WeightUnit)}
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-medium"
          >
            <option value="kg">Kilogram (kg)</option>
            <option value="g">Gram (g)</option>
          </select>
        </div>

        {/* Max Capacity */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Maximum Capacity (Max) <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0"
              value={instrument.maxCapacity}
              onChange={(e) =>
                handleFieldChange('maxCapacity', parseFloat(e.target.value) || 0)
              }
              className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono font-bold pr-10"
            />
            <span className="absolute right-2.5 top-1.5 text-xs text-slate-500 font-sans font-medium">
              {instrument.unit}
            </span>
          </div>
        </div>

        {/* Min Capacity */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center justify-between">
            <span>Minimum Capacity (Min)</span>
            {minRatio > 0 && (
              <span className="text-[10px] text-slate-500 font-mono">({minRatio}e)</span>
            )}
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0"
              value={instrument.minCapacity}
              onChange={(e) =>
                handleFieldChange('minCapacity', parseFloat(e.target.value) || 0)
              }
              className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono font-bold pr-10"
            />
            <span className="absolute right-2.5 top-1.5 text-xs text-slate-500 font-sans font-medium">
              {instrument.unit}
            </span>
          </div>
        </div>

        {/* Verification Interval e */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Verification Interval (e) <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0"
              value={instrument.verificationInterval}
              onChange={(e) =>
                handleFieldChange('verificationInterval', parseFloat(e.target.value) || 0)
              }
              className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono font-bold pr-10"
            />
            <span className="absolute right-2.5 top-1.5 text-xs text-slate-500 font-sans font-medium">
              {instrument.unit}
            </span>
          </div>
        </div>

        {/* Actual Division d */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Actual Scale Interval (d)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0"
              value={instrument.actualDivision}
              onChange={(e) =>
                handleFieldChange('actualDivision', parseFloat(e.target.value) || 0)
              }
              className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono font-bold pr-10"
            />
            <span className="absolute right-2.5 top-1.5 text-xs text-slate-500 font-sans font-medium">
              {instrument.unit}
            </span>
          </div>
        </div>

        {/* Auto-computed Verification Scale Interval Count (n = Max/e) */}
        <div className="sm:col-span-2 lg:col-span-3 bg-slate-50 border border-slate-300 rounded px-3 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-[#002147]">
              Computed Scale Intervals Count:{' '}
              <span className="font-mono text-sm font-black text-blue-900 ml-1">
                n = {n.toLocaleString()}
              </span>{' '}
              <span className="text-[11px] font-normal text-slate-500">
                (Formula: Max / e = {instrument.maxCapacity} / {instrument.verificationInterval})
              </span>
            </div>
            {isClassIIIOverLimit && (
              <div className="text-[11px] text-[#B91C1C] font-semibold mt-0.5 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Statutory Warning: OIML R 76-1 Table 3 limits Class III to max 10,000 divisions.</span>
              </div>
            )}
            {isMinBelowNorm && (
              <div className="text-[11px] text-amber-700 font-semibold mt-0.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Advisory: Standard recommends Min &ge; 20e for Class III (current: {minRatio}e).</span>
              </div>
            )}
          </div>

          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              isClassIIIOverLimit
                ? 'bg-red-100 text-[#B91C1C] border border-red-300'
                : 'bg-emerald-100 text-[#15803D] border border-emerald-300'
            }`}
          >
            {isClassIIIOverLimit ? 'Limit Exceeded' : 'Intervals Validated'}
          </span>
        </div>
      </div>
    </div>
  );
}
