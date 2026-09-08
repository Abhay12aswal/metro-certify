'use client';

import React, { useState } from 'react';
import {
  Sliders,
  ChevronDown,
  ChevronUp,
  Thermometer,
  UserCheck,
  Info,
  Scale,
  Zap,
} from 'lucide-react';
import {
  AccuracyClass,
  EnvironmentalConditions,
  InspectionMetadata,
  InstrumentData,
  VerificationType,
  WeightUnit,
} from '../types/metrology';
import { roundTo } from '../lib/oiml-engine';

interface InstrumentRegistrationProps {
  instrument: InstrumentData;
  setInstrument: React.Dispatch<React.SetStateAction<InstrumentData>>;
  environment: EnvironmentalConditions;
  setEnvironment: React.Dispatch<React.SetStateAction<EnvironmentalConditions>>;
  inspection: InspectionMetadata;
  setInspection: React.Dispatch<React.SetStateAction<InspectionMetadata>>;
}

export default function InstrumentRegistration({
  instrument,
  setInstrument,
  environment,
  setEnvironment,
  inspection,
  setInspection,
}: InstrumentRegistrationProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Handle number input updates cleanly
  const handleInstrumentChange = (
    field: keyof InstrumentData,
    value: string | number
  ) => {
    setInstrument((prev) => {
      const updated = { ...prev, [field]: value };
      // Auto-calculate scale interval count n = Max / e
      if (field === 'maxCapacity' || field === 'verificationInterval') {
        const max = field === 'maxCapacity' ? Number(value) : prev.maxCapacity;
        const e =
          field === 'verificationInterval'
            ? Number(value)
            : prev.verificationInterval;
        if (e > 0 && max > 0) {
          updated.scaleIntervalCount = Math.round(max / e);
        }
      }
      return updated;
    });
  };

  const handleEnvChange = (
    field: keyof EnvironmentalConditions,
    value: number
  ) => {
    setEnvironment((prev) => ({ ...prev, [field]: value }));
  };

  const handleInspectionChange = (
    field: keyof InspectionMetadata,
    value: string
  ) => {
    setInspection((prev) => ({ ...prev, [field]: value }));
  };

  // Metrological validation checks as per OIML R 76-1 Table 3
  const n = instrument.scaleIntervalCount;
  const e = instrument.verificationInterval;
  const min = instrument.minCapacity;
  let nStatusMessage = '';
  let isNWarn = false;

  if (instrument.accuracyClass === 'class_III') {
    if (n > 10000) {
      nStatusMessage = `Warning: OIML R 76-1 limits Class III to max 10,000 intervals (current: ${n.toLocaleString()}).`;
      isNWarn = true;
    } else if (n < 100) {
      nStatusMessage = `Warning: Class III requires n >= 100 (current: ${n}).`;
      isNWarn = true;
    }
  } else if (instrument.accuracyClass === 'class_II') {
    if (n > 100000) {
      nStatusMessage = `Warning: Class II standard max is 100,000 intervals.`;
      isNWarn = true;
    }
  }

  const minRatio = e > 0 ? roundTo(min / e, 1) : 0;
  const isMinWarn = instrument.accuracyClass === 'class_III' && minRatio < 20 && min > 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden no-print">
      {/* Accordion Toggle Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-5 py-3.5 bg-slate-50 hover:bg-slate-100/80 border-b border-slate-200 flex items-center justify-between cursor-pointer select-none transition"
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-blue-100 text-blue-800 rounded-lg">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <span>Module 1: Instrument & Environmental Registration (Master Data)</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {instrument.manufacturer} &bull; {instrument.model}
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Accuracy Class {instrument.accuracyClass.replace('class_', '')} &bull; Max:{' '}
              {instrument.maxCapacity} {instrument.unit} &bull; e = {instrument.verificationInterval}{' '}
              {instrument.unit} &bull; n = {instrument.scaleIntervalCount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {isExpanded ? 'Collapse' : 'Expand Details'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </div>
      </div>

      {/* Form Content */}
      {isExpanded && (
        <div className="p-5 space-y-6">
          {/* 1. Instrument Specifications */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-blue-600" />
                1. Metrological Characteristics (OIML R 76-1 Section 3)
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Verification Scheme:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleInspectionChange(
                      'verificationType',
                      inspection.verificationType === 'initial'
                        ? 'in_service'
                        : 'initial'
                    )
                  }
                  className={`px-2.5 py-1 rounded font-bold text-xs transition cursor-pointer border ${
                    inspection.verificationType === 'initial'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}
                >
                  {inspection.verificationType === 'initial'
                    ? 'Initial Verification (1x MPE)'
                    : 'In-Service Inspection (2x MPE)'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Manufacturer */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Manufacturer Name
                </label>
                <input
                  type="text"
                  value={instrument.manufacturer}
                  onChange={(e) =>
                    handleInstrumentChange('manufacturer', e.target.value)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  placeholder="e.g. Avery Weigh-Tronix"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Model Designation
                </label>
                <input
                  type="text"
                  value={instrument.model}
                  onChange={(e) =>
                    handleInstrumentChange('model', e.target.value)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  placeholder="e.g. RetailMaster POS-15K"
                />
              </div>

              {/* Serial Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Serial Number
                </label>
                <input
                  type="text"
                  value={instrument.serialNumber}
                  onChange={(e) =>
                    handleInstrumentChange('serialNumber', e.target.value)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono"
                  placeholder="e.g. IND/RRSL/2026/0892"
                />
              </div>

              {/* Accuracy Class */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Accuracy Class (OIML)
                </label>
                <select
                  value={instrument.accuracyClass}
                  onChange={(e) =>
                    handleInstrumentChange(
                      'accuracyClass',
                      e.target.value as AccuracyClass
                    )
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
                >
                  <option value="class_I">Class I - Special (Analytical)</option>
                  <option value="class_II">Class II - High (Precision)</option>
                  <option value="class_III">
                    Class III - Medium (Commercial Trade)
                  </option>
                  <option value="class_IIII">
                    Class IIII - Ordinary (Coarse)
                  </option>
                </select>
              </div>

              {/* Unit */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unit of Measurement
                </label>
                <select
                  value={instrument.unit}
                  onChange={(e) =>
                    handleInstrumentChange('unit', e.target.value as WeightUnit)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                </select>
              </div>

              {/* Max Capacity */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Max Capacity (Max)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={instrument.maxCapacity}
                    onChange={(e) =>
                      handleInstrumentChange(
                        'maxCapacity',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden pr-10"
                  />
                  <span className="absolute right-3 top-2 text-xs font-medium text-slate-400">
                    {instrument.unit}
                  </span>
                </div>
              </div>

              {/* Min Capacity */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Min Capacity (Min)</span>
                  {minRatio > 0 && (
                    <span className="text-[10px] text-slate-400">
                      ({minRatio}e)
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={instrument.minCapacity}
                    onChange={(e) =>
                      handleInstrumentChange(
                        'minCapacity',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden pr-10"
                  />
                  <span className="absolute right-3 top-2 text-xs font-medium text-slate-400">
                    {instrument.unit}
                  </span>
                </div>
              </div>

              {/* Verification Scale Interval e */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Verification Interval (e)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={instrument.verificationInterval}
                    onChange={(e) =>
                      handleInstrumentChange(
                        'verificationInterval',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden pr-10"
                  />
                  <span className="absolute right-3 top-2 text-xs font-medium text-slate-400">
                    {instrument.unit}
                  </span>
                </div>
              </div>

              {/* Actual Division d */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Actual Division (d)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={instrument.actualDivision}
                    onChange={(e) =>
                      handleInstrumentChange(
                        'actualDivision',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden pr-10"
                  />
                  <span className="absolute right-3 top-2 text-xs font-medium text-slate-400">
                    {instrument.unit}
                  </span>
                </div>
              </div>

              {/* Auto-calculated Divisions n */}
              <div className="sm:col-span-2 lg:col-span-3 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Verification Scale Interval Count:{' '}
                    <span className="text-blue-700 text-sm font-black font-mono">
                      n = {instrument.scaleIntervalCount.toLocaleString()}
                    </span>{' '}
                    <span className="text-slate-400 font-normal">
                      (Formula: Max / e = {instrument.maxCapacity} /{' '}
                      {instrument.verificationInterval})
                    </span>
                  </div>
                  {isNWarn && (
                    <div className="text-[11px] text-amber-700 font-medium mt-1">
                      {nStatusMessage}
                    </div>
                  )}
                  {isMinWarn && (
                    <div className="text-[11px] text-amber-700 font-medium mt-0.5">
                      Advisory: OIML R 76-1 recommends Min &ge; 20e for Class III
                      (current: {minRatio}e).
                    </div>
                  )}
                </div>

                <div className="hidden sm:block text-right">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Legal Norm Status
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isNWarn ? 'text-amber-600' : 'text-emerald-700'
                    }`}
                  >
                    {isNWarn ? 'Standard Deviation' : 'Verified Within Limit'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Environmental & Ambient Conditions */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-cyan-600" />
              2. Environmental & Test Conditions (Clause 3.9)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ambient Temp (&deg;C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={environment.temperature}
                  onChange={(e) =>
                    handleEnvChange('temperature', parseFloat(e.target.value) || 0)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Norm: 10&deg;C to 40&deg;C
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Relative Humidity (% RH)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={environment.humidity}
                  onChange={(e) =>
                    handleEnvChange('humidity', parseFloat(e.target.value) || 0)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Norm: &le; 85% non-condensing
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Barometric Pressure (hPa)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={environment.pressure}
                  onChange={(e) =>
                    handleEnvChange('pressure', parseFloat(e.target.value) || 0)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Std: ~1013.25 hPa
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mains Voltage (V)
                </label>
                <input
                  type="number"
                  step="1"
                  value={environment.voltage}
                  onChange={(e) =>
                    handleEnvChange('voltage', parseFloat(e.target.value) || 0)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Std: 230V &plusmn;10%
                </span>
              </div>
            </div>
          </div>

          {/* 3. Inspection & Legal Metrology Metadata */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
              3. Inspection Authority & Officer Sign-off Data (OIML R 76-2)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Testing Laboratory
                </label>
                <input
                  type="text"
                  value={inspection.labName}
                  onChange={(e) =>
                    handleInspectionChange('labName', e.target.value)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Testing Officer Name
                </label>
                <input
                  type="text"
                  value={inspection.officerName}
                  onChange={(e) =>
                    handleInspectionChange('officerName', e.target.value)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Approving Metrologist
                </label>
                <input
                  type="text"
                  value={inspection.approverName}
                  onChange={(e) =>
                    handleInspectionChange('approverName', e.target.value)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Test Date
                </label>
                <input
                  type="date"
                  value={inspection.testDate}
                  onChange={(e) =>
                    handleInspectionChange('testDate', e.target.value)
                  }
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
