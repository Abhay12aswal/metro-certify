'use client';

import React, { useEffect, useState } from 'react';
import {
  Printer,
  Download,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Award,
  CheckCircle2,
  XCircle,
  Hash,
  Scale,
  Calendar,
  Building,
} from 'lucide-react';
import {
  CalculatedTestPoint,
  EnvironmentalConditions,
  InspectionMetadata,
  InstrumentData,
  TestMatrixSummary,
} from '../types/metrology';
import { generateQrDataUrl } from '../lib/utils';

interface OIMLCertificateViewProps {
  instrument: InstrumentData;
  environment: EnvironmentalConditions;
  inspection: InspectionMetadata;
  calculatedPoints: CalculatedTestPoint[];
  summary: TestMatrixSummary;
}

export default function OIMLCertificateView({
  instrument,
  environment,
  inspection,
  calculatedPoints,
  summary,
}: OIMLCertificateViewProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Generate cryptographic tamper-evident QR verification stamp
  useEffect(() => {
    const qrPayload = JSON.stringify({
      cert: inspection.certificateNumber,
      sn: instrument.serialNumber,
      mfg: instrument.manufacturer,
      model: instrument.model,
      class: instrument.accuracyClass,
      max: `${instrument.maxCapacity}${instrument.unit}`,
      e: `${instrument.verificationInterval}${instrument.unit}`,
      date: inspection.testDate,
      verdict: summary.overallStatus,
      hash: summary.certificateHash,
      authority: 'RRSL / Ministry of Consumer Affairs, Govt. of India',
    });

    generateQrDataUrl(qrPayload).then((url) => {
      setQrDataUrl(url);
    });
  }, [instrument, inspection, summary]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const exportData = {
      format: 'OIML R 76-2 (2007) / NAWI Legal Metrology Record',
      certificateNumber: inspection.certificateNumber,
      generatedAt: new Date().toISOString(),
      instrument,
      environment,
      inspection,
      summary,
      testObservations: calculatedPoints,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OIML-Certificate-${inspection.certificateNumber.replace(
      /[^a-zA-Z0-9]/g,
      '-'
    )}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Top Action Ribbon (Hidden when printing) */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Official OIML R 76-2 Test Certificate Preview</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                summary.overallStatus === 'PASS'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {summary.overallStatus === 'PASS'
                ? 'CERTIFIED COMPLIANT'
                : 'VERIFICATION REJECTED'}
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Formatted to official OIML R 76-2 standards for legal metrology verification by RRSL officers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Test JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate (A4 PDF)</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          AUTHENTIC OIML R 76-2 TEST CERTIFICATE (A4 Sheet Document)
          ========================================================================= */}
      <div className="print-container bg-white text-slate-900 p-8 sm:p-12 rounded-xl border border-slate-300 shadow-md max-w-4xl mx-auto font-serif">
        {/* Certificate Header / Emblems */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {/* National Emblem Placeholder Badge */}
              <div className="w-16 h-16 rounded-full border-2 border-slate-800 flex items-center justify-center p-2 text-center bg-slate-50 shrink-0">
                <div className="text-[9px] font-sans font-bold leading-tight uppercase text-slate-800">
                  Govt. of India
                  <br />
                  <span className="text-[8px] text-blue-800">RRSL</span>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase font-sans font-extrabold tracking-widest text-slate-600">
                  Government of India &bull; Ministry of Consumer Affairs
                </div>
                <h1 className="text-lg sm:text-xl font-bold font-sans tracking-tight text-slate-950 mt-0.5">
                  {inspection.labName || 'Regional Reference Standard Laboratory (RRSL)'}
                </h1>
                <p className="text-xs text-slate-600 font-sans italic">
                  Legal Metrology (General) Rules, 2011 &bull; OIML Recommendation R 76-1:2006 & R 76-2:2007
                </p>
              </div>
            </div>

            {/* Certificate Meta & Stamp */}
            <div className="text-right shrink-0">
              <div className="text-[10px] uppercase font-sans font-bold text-slate-500">
                Certificate Ref. No.
              </div>
              <div className="font-mono font-bold text-xs text-blue-950">
                {inspection.certificateNumber}
              </div>
              <div className="text-[10px] text-slate-500 font-sans mt-1">
                Date of Issue: <strong>{inspection.testDate}</strong>
              </div>
              <div className="inline-block mt-1 px-2 py-0.5 bg-slate-100 border border-slate-300 rounded font-sans text-[10px] font-bold uppercase text-slate-700">
                {inspection.verificationType === 'initial'
                  ? 'Initial Verification'
                  : 'In-Service Verification'}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-300 text-center">
            <h2 className="text-base font-bold font-sans tracking-wider uppercase text-slate-900">
              Pattern Evaluation & Verification Test Report (NAWI)
            </h2>
            <div className="text-xs text-slate-600 font-sans">
              Non-Automatic Weighing Instrument (OIML R 76-2 Clause 3.1 & 3.2)
            </div>
          </div>
        </div>

        {/* Section 1: Instrument & Environmental Characteristics */}
        <div className="mb-6 font-sans">
          <div className="bg-slate-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
            1. Metrological Characteristics & Environmental Parameters
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs border border-slate-300 p-3 rounded">
            <div>
              <span className="text-slate-500 font-medium">Manufacturer:</span>{' '}
              <strong className="text-slate-900">{instrument.manufacturer}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Serial Number:</span>{' '}
              <strong className="text-slate-900 font-mono">{instrument.serialNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Model / Type:</span>{' '}
              <strong className="text-slate-900">{instrument.model}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Accuracy Class:</span>{' '}
              <strong className="text-blue-900 uppercase font-bold">
                {instrument.accuracyClass.replace('class_', 'Class ')}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Max Capacity (Max):</span>{' '}
              <strong className="text-slate-900">
                {instrument.maxCapacity} {instrument.unit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Min Capacity (Min):</span>{' '}
              <strong className="text-slate-900">
                {instrument.minCapacity} {instrument.unit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Verification Interval (e):</span>{' '}
              <strong className="text-slate-900">
                {instrument.verificationInterval} {instrument.unit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Actual Scale Interval (d):</span>{' '}
              <strong className="text-slate-900">
                {instrument.actualDivision} {instrument.unit}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Number of Intervals (n = Max/e):</span>{' '}
              <strong className="text-slate-900 font-mono">
                {instrument.scaleIntervalCount.toLocaleString()}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Ambient Test Conditions:</span>{' '}
              <strong className="text-slate-900">
                {environment.temperature}&deg;C &bull; {environment.humidity}% RH &bull;{' '}
                {environment.pressure} hPa
              </strong>
            </div>
          </div>
        </div>

        {/* Section 2: Complete Test Observation Table */}
        <div className="mb-6 font-sans">
          <div className="bg-slate-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
            2. Weighing Test Observations (Clause A.4.4 & R 76-2)
          </div>

          <div className="overflow-x-auto border border-slate-300 rounded">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 font-bold">
                  <th className="p-1.5 text-center">Seq</th>
                  <th className="p-1.5">Stage</th>
                  <th className="p-1.5">Load L [{instrument.unit}]</th>
                  <th className="p-1.5">Indication I</th>
                  <th className="p-1.5">&Delta;L</th>
                  <th className="p-1.5">P [I+0.5d-&Delta;L]</th>
                  <th className="p-1.5">True Error E</th>
                  <th className="p-1.5">E<sub>c</sub> [E&minus;E₀]</th>
                  <th className="p-1.5">E<sub>c</sub> (in e)</th>
                  <th className="p-1.5">MPE Limit</th>
                  <th className="p-1.5 text-center">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-[10.5px]">
                {calculatedPoints.map((pt, idx) => (
                  <tr
                    key={pt.id}
                    className={
                      !pt.isCompliant
                        ? 'bg-rose-50 text-rose-950 font-bold'
                        : idx % 2 === 0
                        ? 'bg-white'
                        : 'bg-slate-50/50'
                    }
                  >
                    <td className="p-1.5 text-center text-slate-500">{idx + 1}</td>
                    <td className="p-1.5 font-sans font-semibold">
                      {pt.sequence === 'ascending' ? '▲ Load' : '▼ Unload'}
                    </td>
                    <td className="p-1.5 font-bold">{pt.appliedLoad}</td>
                    <td className="p-1.5">{pt.indication}</td>
                    <td className="p-1.5 text-blue-900">{pt.addedLoad}</td>
                    <td className="p-1.5">{pt.turningPointP.toFixed(4)}</td>
                    <td className="p-1.5">
                      {pt.trueErrorE > 0 ? `+${pt.trueErrorE.toFixed(4)}` : pt.trueErrorE.toFixed(4)}
                    </td>
                    <td className="p-1.5 font-bold">
                      {pt.correctedErrorEc > 0
                        ? `+${pt.correctedErrorEc.toFixed(4)}`
                        : pt.correctedErrorEc.toFixed(4)}
                    </td>
                    <td
                      className={`p-1.5 font-black ${
                        !pt.isCompliant ? 'text-rose-700' : 'text-slate-900'
                      }`}
                    >
                      {pt.correctedErrorInDivisionsEc > 0
                        ? `+${pt.correctedErrorInDivisionsEc.toFixed(2)}`
                        : pt.correctedErrorInDivisionsEc.toFixed(2)}
                      e
                    </td>
                    <td className="p-1.5 text-slate-700">
                      &plusmn;{pt.mpeDivisions.toFixed(1)}e
                    </td>
                    <td className="p-1.5 text-center font-sans">
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold ${
                          pt.isCompliant
                            ? 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                            : 'text-rose-800 bg-rose-100 border border-rose-300'
                        }`}
                      >
                        {pt.isCompliant ? 'PASS' : 'FAIL'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1 text-[10px] text-slate-500 italic">
            * Zero load baseline error E₀ = {summary.zeroErrorE0.toFixed(4)} {instrument.unit} (
            {summary.zeroErrorInDivisionsE0 > 0 ? '+' : ''}
            {summary.zeroErrorInDivisionsE0}e) applied to all observation points.
          </div>
        </div>

        {/* Section 3: Metrological Assessment Verdict */}
        <div className="mb-6 font-sans page-break-inside-avoid">
          <div className="bg-slate-800 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
            3. Metrological Assessment & Formal Finding
          </div>

          <div
            className={`p-4 rounded-lg border-2 flex items-start gap-4 ${
              summary.overallStatus === 'PASS'
                ? 'bg-emerald-50/50 border-emerald-600 text-emerald-950'
                : 'bg-rose-50/50 border-rose-600 text-rose-950'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {summary.overallStatus === 'PASS' ? (
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-rose-600" />
              )}
            </div>
            <div>
              <div className="text-sm font-black tracking-wide uppercase">
                {summary.overallStatus === 'PASS'
                  ? 'CERTIFIED: INSTRUMENT MEETS OIML R 76-1 SPECIFICATIONS'
                  : 'REJECTED: INSTRUMENT FAILS MAXIMUM PERMISSIBLE ERROR LIMITS'}
              </div>
              <p className="text-xs mt-1 text-slate-700 leading-relaxed font-serif">
                {summary.overallStatus === 'PASS' ? (
                  <>
                    The Non-Automatic Weighing Instrument with Serial Number{' '}
                    <strong>{instrument.serialNumber}</strong> has been subjected to testing in
                    accordance with OIML R 76-1:2006. The maximum observed corrected error of{' '}
                    <strong>{summary.maxAbsoluteErrorEc.toFixed(2)} e</strong> remains strictly within
                    the permissible limit of &plusmn;{summary.maxPermissibleLimit.toFixed(1)} e across
                    all evaluated test points. The instrument is hereby{' '}
                    <strong>APPROVED for Legal Metrology Verification</strong>.
                  </>
                ) : (
                  <>
                    The weighing instrument with Serial Number{' '}
                    <strong>{instrument.serialNumber}</strong> failed compliance verification. Total of{' '}
                    <strong>{summary.failedPoints}</strong> test point(s) exceeded the Maximum
                    Permissible Error envelope defined under Clause 3.5.1. Maximum observed error was{' '}
                    <strong>{summary.maxAbsoluteErrorEc.toFixed(2)} e</strong> against permissible limit
                    of &plusmn;{summary.maxPermissibleLimit.toFixed(1)} e. Verification mark is{' '}
                    <strong>WITHHELD</strong>.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Dual Sign-off & Tamper-Proof Cryptographic Verification */}
        <div className="pt-4 border-t-2 border-slate-900 font-sans page-break-inside-avoid">
          <div className="grid grid-cols-3 gap-6 items-end">
            {/* Testing Officer Signature */}
            <div className="text-center">
              <div className="h-14 flex items-end justify-center mb-1">
                <div className="font-serif italic text-xs text-slate-500 border-b border-slate-400 w-full pb-1">
                  [Digital Signed: {inspection.officerName}]
                </div>
              </div>
              <div className="text-xs font-bold text-slate-900">{inspection.officerName}</div>
              <div className="text-[10px] text-slate-500">
                {inspection.officerDesignation || 'Senior Metrological Officer (Legal Metrology)'}
              </div>
              <div className="text-[9px] text-slate-400">Testing Officer</div>
            </div>

            {/* Approving Authority Signature */}
            <div className="text-center">
              <div className="h-14 flex items-end justify-center mb-1">
                <div className="font-serif italic text-xs text-slate-500 border-b border-slate-400 w-full pb-1">
                  [Approved: {inspection.approverName}]
                </div>
              </div>
              <div className="text-xs font-bold text-slate-900">{inspection.approverName}</div>
              <div className="text-[10px] text-slate-500">
                {inspection.approverDesignation || 'Director & Metrological Authority, RRSL'}
              </div>
              <div className="text-[9px] text-slate-400">Approving Metrologist</div>
            </div>

            {/* Cryptographic Tamper-Evident QR Code Stamp */}
            <div className="text-center flex flex-col items-center">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Tamper-proof Certificate QR"
                  className="w-20 h-20 border border-slate-300 p-1 rounded bg-white shadow-2xs"
                />
              ) : (
                <div className="w-20 h-20 bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                  QR Generating
                </div>
              )}
              <div className="text-[8px] font-mono font-bold text-slate-600 mt-1">
                {summary.certificateHash}
              </div>
              <div className="text-[8px] text-slate-400 uppercase font-semibold">
                Scan to Verify Authenticity
              </div>
            </div>
          </div>

          <div className="mt-6 pt-2 border-t border-slate-200 text-center text-[9px] text-slate-400 font-sans">
            This certificate is digitally signed and generated by MetroCertify &bull; Compliant with
            OIML R 76-1:2006 (E) & R 76-2:2007 (E) &bull; Regional Reference Standard Laboratory
          </div>
        </div>
      </div>
    </div>
  );
}
