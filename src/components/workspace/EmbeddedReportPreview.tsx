'use client';

import React, { useEffect, useState } from 'react';
import {
  CalculatedTestPoint,
  EnvironmentalConditions,
  InspectionMetadata,
  InstrumentData,
  TestMatrixSummary,
} from '../../types/metrology';
import NationalEmblem from '../gov/NationalEmblem';
import { generateQrDataUrl } from '../../lib/utils';
import { Printer, Download, Award, CheckCircle2, XCircle } from 'lucide-react';

interface EmbeddedReportPreviewProps {
  instrument: InstrumentData;
  environment: EnvironmentalConditions;
  inspection: InspectionMetadata;
  calculatedPoints: CalculatedTestPoint[];
  summary: TestMatrixSummary;
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function EmbeddedReportPreview({
  instrument,
  environment,
  inspection,
  calculatedPoints,
  summary,
  language,
  isHighContrast,
}: EmbeddedReportPreviewProps) {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const payload = JSON.stringify({
      system: 'National Legal Metrology Digital Evaluation Portal',
      ministry: 'Department of Consumer Affairs, Govt. of India',
      certNo: inspection.certificateNumber,
      mfg: instrument.manufacturer,
      model: instrument.model,
      serial: instrument.serialNumber,
      class: instrument.accuracyClass,
      max: `${instrument.maxCapacity}${instrument.unit}`,
      e: `${instrument.verificationInterval}${instrument.unit}`,
      verdict: summary.overallStatus,
      hash: summary.certificateHash,
      date: inspection.testDate,
    });

    generateQrDataUrl(payload).then((url) => setQrUrl(url));
  }, [instrument, inspection, summary]);

  const handlePrint = () => {
    window.print();
  };

  const isPass = summary.overallStatus === 'PASS';

  return (
    <div
      id="section-preview"
      className={`border rounded p-4 mb-4 transition-colors ${
        isHighContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-slate-300 text-slate-800'
      }`}
    >
      {/* Action Toolbar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 gap-2 no-print">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#002147] text-white flex items-center justify-center text-xs font-bold shrink-0">
            5
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#002147] font-sans">
            Section 5: Embedded Official OIML R 76-2 Test Certificate Preview
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002147] hover:bg-[#0A3A60] text-white rounded text-xs font-bold transition cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Print Official Certificate (A4 PDF)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          AUTHENTIC INDIAN GOVERNMENT OIML R 76-2 CERTIFICATE DOCUMENT
          ========================================================================= */}
      <div className="print-container bg-white text-slate-900 border border-slate-400 rounded p-6 sm:p-10 font-serif max-w-4xl mx-auto shadow-xs">
        {/* Certificate Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-4 text-center">
          <div className="flex items-center justify-between">
            <NationalEmblem className="w-10 h-14 text-slate-900 shrink-0" />
            <div className="flex-1 px-4">
              <div className="text-xs uppercase font-sans font-extrabold tracking-widest text-slate-700">
                Government of India &bull; भारत सरकार
              </div>
              <div className="text-sm font-sans font-bold text-slate-900">
                Ministry of Consumer Affairs, Food & Public Distribution
              </div>
              <div className="text-xs font-sans text-slate-700 font-semibold">
                Department of Consumer Affairs &bull; Legal Metrology Division
              </div>
              <h2 className="text-sm sm:text-base font-sans font-black uppercase text-[#002147] mt-1 tracking-wider">
                Pattern Evaluation & Verification Test Certificate (NAWI)
              </h2>
              <div className="text-[10px] font-sans text-slate-600 italic">
                Issued in accordance with Legal Metrology (General) Rules, 2011 & OIML R 76-1:2006 / R 76-2:2007
              </div>
            </div>

            {/* QR Verification Stamp */}
            <div className="text-center shrink-0 w-20">
              {qrUrl ? (
                <img
                  src={qrUrl}
                  alt="Verification QR"
                  className="w-18 h-18 border border-slate-300 p-0.5 mx-auto"
                />
              ) : (
                <div className="w-18 h-18 bg-slate-100 border text-[9px] flex items-center justify-center font-sans text-slate-400">
                  QR Stamp
                </div>
              )}
              <span className="text-[8px] font-mono text-slate-600 block mt-0.5">
                Scan to Verify
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-300 flex justify-between text-xs font-sans text-slate-700">
            <span>
              Certificate No: <strong className="font-mono">{inspection.certificateNumber}</strong>
            </span>
            <span>
              Evaluation Scheme:{' '}
              <strong className="uppercase">
                {inspection.verificationType === 'initial'
                  ? 'Initial Verification'
                  : 'In-Service Verification'}
              </strong>
            </span>
            <span>
              Date: <strong>{inspection.testDate}</strong>
            </span>
          </div>
        </div>

        {/* Section 1: Instrument & Test Metadata */}
        <div className="mb-4 font-sans text-xs">
          <div className="bg-slate-100 border-y border-slate-300 px-2 py-1 font-bold text-slate-900 uppercase text-[10px]">
            1. Instrument Metadata & Environmental Conditions
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 py-2 text-[11px] border-b border-slate-200">
            <div>
              <span className="text-slate-500">Manufacturer:</span>{' '}
              <strong>{instrument.manufacturer}</strong>
            </div>
            <div>
              <span className="text-slate-500">Serial No:</span>{' '}
              <strong className="font-mono">{instrument.serialNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500">Model:</span> <strong>{instrument.model}</strong>
            </div>
            <div>
              <span className="text-slate-500">Accuracy Class:</span>{' '}
              <strong className="uppercase font-bold text-[#002147]">
                {instrument.accuracyClass.replace('class_', 'Class ')}
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Max Capacity:</span>{' '}
              <strong>
                {instrument.maxCapacity} {instrument.unit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Min Capacity:</span>{' '}
              <strong>
                {instrument.minCapacity} {instrument.unit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Verification Interval (e):</span>{' '}
              <strong>
                {instrument.verificationInterval} {instrument.unit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Actual Division (d):</span>{' '}
              <strong>
                {instrument.actualDivision} {instrument.unit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500">Scale Divisions (n = Max/e):</span>{' '}
              <strong className="font-mono">{instrument.scaleIntervalCount.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-slate-500">Environmental Readings:</span>{' '}
              <strong>
                {environment.temperature}&deg;C &bull; {environment.humidity}% RH &bull;{' '}
                {environment.pressure} hPa
              </strong>
            </div>
          </div>
        </div>

        {/* Section 2: Complete Observation Data */}
        <div className="mb-4 font-sans">
          <div className="bg-slate-100 border-y border-slate-300 px-2 py-1 font-bold text-slate-900 uppercase text-[10px]">
            2. Weighing Test Observation Sheet (Clause A.4.4)
          </div>
          <table className="w-full text-left border-collapse text-[10px] my-1 font-mono">
            <thead>
              <tr className="bg-slate-50 text-slate-800 border-b border-slate-300 font-bold">
                <th className="p-1 text-center w-6">#</th>
                <th className="p-1 font-sans">Stage</th>
                <th className="p-1">Load L [{instrument.unit}]</th>
                <th className="p-1">Indication I</th>
                <th className="p-1">&Delta;L</th>
                <th className="p-1">P [I+0.5d-&Delta;L]</th>
                <th className="p-1">Error E</th>
                <th className="p-1">E<sub>c</sub> [E-E₀]</th>
                <th className="p-1">E<sub>c</sub> (in e)</th>
                <th className="p-1">MPE Limit</th>
                <th className="p-1 text-center font-sans">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {calculatedPoints.map((pt, idx) => (
                <tr key={pt.id}>
                  <td className="p-1 text-center font-sans">{idx + 1}</td>
                  <td className="p-1 font-sans">
                    {pt.sequence === 'ascending' ? '▲ Load' : '▼ Unload'}
                  </td>
                  <td className="p-1 font-bold">{pt.appliedLoad}</td>
                  <td className="p-1">{pt.indication}</td>
                  <td className="p-1">{pt.addedLoad}</td>
                  <td className="p-1">{pt.turningPointP.toFixed(4)}</td>
                  <td className="p-1">
                    {pt.trueErrorE > 0 ? `+${pt.trueErrorE.toFixed(4)}` : pt.trueErrorE.toFixed(4)}
                  </td>
                  <td className="p-1 font-bold">
                    {pt.correctedErrorEc > 0
                      ? `+${pt.correctedErrorEc.toFixed(4)}`
                      : pt.correctedErrorEc.toFixed(4)}
                  </td>
                  <td className="p-1 font-bold">
                    {pt.correctedErrorInDivisionsEc > 0
                      ? `+${pt.correctedErrorInDivisionsEc.toFixed(2)}`
                      : pt.correctedErrorInDivisionsEc.toFixed(2)}
                    e
                  </td>
                  <td className="p-1">&plusmn;{pt.mpeDivisions.toFixed(1)}e</td>
                  <td className="p-1 text-center font-sans">
                    <span
                      className={`inline-block px-1.5 py-0.2 rounded text-[8px] font-bold ${
                        pt.isCompliant
                          ? 'bg-[#15803D] text-white'
                          : 'bg-[#B91C1C] text-white'
                      }`}
                    >
                      {pt.isCompliant ? 'PASS' : 'FAIL'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-[9px] text-slate-500 font-sans italic">
            * Zero load offset E₀ = {summary.zeroErrorE0.toFixed(4)} {instrument.unit} deducted from
            all points as per OIML R 76-1 Clause A.4.4.3.
          </div>
        </div>

        {/* Section 3: Statutory Metrological Verdict Box */}
        <div className="mb-4 font-sans page-break-inside-avoid">
          <div className="bg-slate-100 border-y border-slate-300 px-2 py-1 font-bold text-slate-900 uppercase text-[10px]">
            3. Metrological Evaluation Verdict & Statutory Declaration
          </div>

          <div
            className={`p-3 rounded border my-2 flex items-start gap-3 ${
              isPass
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : 'bg-red-50 border-red-500 text-red-950'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isPass ? (
                <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
              ) : (
                <XCircle className="w-5 h-5 text-[#B91C1C]" />
              )}
            </div>

            <div className="text-xs">
              <div className="font-black uppercase tracking-wide">
                {isPass
                  ? 'CERTIFIED: INSTRUMENT MEETS ALL STATUTORY REQUIREMENTS UNDER OIML R 76-1'
                  : 'REJECTED: INSTRUMENT FAILS MAXIMUM PERMISSIBLE ERROR TOLERANCES'}
              </div>
              <p className="mt-1 text-[11px] text-slate-700 leading-relaxed font-serif">
                {isPass
                  ? `It is certified that the Non-Automatic Weighing Instrument with Serial Number ${instrument.serialNumber} has undergone testing at ${inspection.labName} in accordance with OIML R 76-1:2006. The maximum observed corrected error of ${summary.maxAbsoluteErrorEc.toFixed(2)}e complies with the permissible limit of ±${summary.maxPermissibleLimit.toFixed(1)}e. Model Approval verification stamp is GRANTED.`
                  : `The instrument with Serial Number ${instrument.serialNumber} failed testing. Total of ${summary.failedPoints} point(s) exceeded the Maximum Permissible Error envelope. Maximum observed error was ${summary.maxAbsoluteErrorEc.toFixed(2)}e against limit of ±${summary.maxPermissibleLimit.toFixed(1)}e. Model approval verification is WITHHELD.`}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Dual Official Sign-off */}
        <div className="pt-4 border-t-2 border-slate-900 font-sans page-break-inside-avoid">
          <div className="grid grid-cols-2 gap-8 text-center text-xs">
            {/* Testing Officer Signature */}
            <div>
              <div className="h-12 flex items-end justify-center mb-1 border-b border-slate-400">
                <span className="font-serif italic text-slate-600 text-xs pb-1">
                  [Digitally Signed: {inspection.officerName}]
                </span>
              </div>
              <div className="font-bold text-slate-900">{inspection.officerName}</div>
              <div className="text-[10px] text-slate-600">Testing Metrologist</div>
              <div className="text-[9px] text-slate-500 font-mono">
                {inspection.labName || 'National Physical Laboratory (NPL India)'}
              </div>
            </div>

            {/* Approving Authority Signature */}
            <div>
              <div className="h-12 flex items-end justify-center mb-1 border-b border-slate-400">
                <span className="font-serif italic text-slate-600 text-xs pb-1">
                  [Approved: {inspection.approverName || 'Dr. Sunita Deshmukh'}]
                </span>
              </div>
              <div className="font-bold text-slate-900">
                {inspection.approverName || 'Dr. Sunita Deshmukh'}
              </div>
              <div className="text-[10px] text-slate-600">
                Director & Approving Metrological Authority
              </div>
              <div className="text-[9px] text-slate-500 font-mono">
                Department of Consumer Affairs, Government of India
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[8px] font-mono text-slate-500">
            National Legal Metrology Digital Evaluation Portal &bull; System Generated Record ID:{' '}
            {summary.certificateHash}
          </div>
        </div>
      </div>
    </div>
  );
}
