'use client';

import React from 'react';
import { EnvironmentalConditions, InspectionMetadata } from '../../types/metrology';
import { Thermometer, ShieldCheck } from 'lucide-react';

interface EnvironmentalConditionsCardProps {
  environment: EnvironmentalConditions;
  setEnvironment: React.Dispatch<React.SetStateAction<EnvironmentalConditions>>;
  inspection: InspectionMetadata;
  setInspection: React.Dispatch<React.SetStateAction<InspectionMetadata>>;
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function EnvironmentalConditionsCard({
  environment,
  setEnvironment,
  inspection,
  setInspection,
  language,
  isHighContrast,
}: EnvironmentalConditionsCardProps) {
  const handleEnvChange = (field: keyof EnvironmentalConditions, val: number) => {
    setEnvironment((prev) => ({ ...prev, [field]: val }));
  };

  const handleInspectionChange = (field: keyof InspectionMetadata, val: string) => {
    setInspection((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div
      id="section-environmental"
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
            2
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#002147] font-sans">
            {language === 'hi'
              ? 'पर्यावरणीय परीक्षण स्थितियां एवं प्रयोगशाला संदर्भ'
              : 'Section 2: Environmental Test Conditions & Verification Scheme (OIML Clause 3.9)'}
          </h3>
        </div>

        {/* Verification Scheme Badge Toggle */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-600 font-medium">Scheme:</span>
          <button
            type="button"
            onClick={() =>
              handleInspectionChange(
                'verificationType',
                inspection.verificationType === 'initial' ? 'in_service' : 'initial'
              )
            }
            className={`px-2.5 py-0.5 rounded text-xs font-bold border transition cursor-pointer ${
              inspection.verificationType === 'initial'
                ? 'bg-blue-50 text-[#002147] border-blue-300'
                : 'bg-amber-50 text-[#B45309] border-amber-300'
            }`}
          >
            {inspection.verificationType === 'initial'
              ? 'Initial Verification (1x MPE)'
              : 'In-Service Inspection (2x MPE Clause 3.5.2)'}
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
        {/* Ambient Temperature */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Ambient Temp (&deg;C) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            step="0.1"
            value={environment.temperature}
            onChange={(e) => handleEnvChange('temperature', parseFloat(e.target.value) || 0)}
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono"
          />
          <span className="text-[10px] text-slate-500 mt-0.5 block">Norm: 10&deg;C to 40&deg;C</span>
        </div>

        {/* Relative Humidity */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Relative Humidity (% RH) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            step="0.5"
            value={environment.humidity}
            onChange={(e) => handleEnvChange('humidity', parseFloat(e.target.value) || 0)}
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono"
          />
          <span className="text-[10px] text-slate-500 mt-0.5 block">Norm: &le; 85% Non-condensing</span>
        </div>

        {/* Barometric Pressure */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Atmospheric Pressure (hPa)
          </label>
          <input
            type="number"
            step="0.5"
            value={environment.pressure}
            onChange={(e) => handleEnvChange('pressure', parseFloat(e.target.value) || 0)}
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono"
          />
          <span className="text-[10px] text-slate-500 mt-0.5 block">Standard: ~1013.25 hPa</span>
        </div>

        {/* Mains Voltage */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Mains Voltage (V AC)
          </label>
          <input
            type="number"
            step="1"
            value={environment.voltage}
            onChange={(e) => handleEnvChange('voltage', parseFloat(e.target.value) || 0)}
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] focus:ring-1 focus:ring-[#002147] outline-hidden font-mono"
          />
          <span className="text-[10px] text-slate-500 mt-0.5 block">Std: 230V &plusmn;10%</span>
        </div>
      </div>

      {/* Officer & Lab Metadata Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans mt-3 pt-3 border-t border-slate-200">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Testing Laboratory / RRSL Location
          </label>
          <input
            type="text"
            value={inspection.labName}
            onChange={(e) => handleInspectionChange('labName', e.target.value)}
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] outline-hidden font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Testing Metrologist Name
          </label>
          <input
            type="text"
            value={inspection.officerName}
            onChange={(e) => handleInspectionChange('officerName', e.target.value)}
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] outline-hidden font-medium"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Evaluation Date
          </label>
          <input
            type="date"
            value={inspection.testDate}
            onChange={(e) => handleInspectionChange('testDate', e.target.value)}
            className="w-full h-8 px-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 focus:bg-white focus:border-[#002147] outline-hidden font-mono"
          />
        </div>
      </div>
    </div>
  );
}
