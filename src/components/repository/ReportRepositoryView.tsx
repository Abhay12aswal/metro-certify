'use client';

import React, { useState } from 'react';
import { Search, Filter, Eye, Download, FileText, CheckCircle2, XCircle } from 'lucide-react';

interface ReportRepositoryViewProps {
  onLoadReport: (reportId: string) => void;
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function ReportRepositoryView({
  onLoadReport,
  language,
  isHighContrast,
}: ReportRepositoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');

  const repositoryData = [
    {
      certId: 'RRSL/AHM/NAWI/2026/0491',
      manufacturer: 'Avery Weigh-Tronix Metrology Ltd.',
      model: 'RetailMaster POS-15K',
      serialNumber: 'IND/RRSL-AHM/2026/0892',
      accuracyClass: 'Class III',
      maxCapacity: '15 kg',
      e: '0.005 kg',
      lab: 'RRSL Ahmedabad',
      officer: 'Er. Rajesh Kumar Sharma',
      date: '2026-09-08',
      status: 'PASS',
      hash: 'OIML-R76-78B4A102-55DE2190',
    },
    {
      certId: 'RRSL/BLR/NAWI-II/2026/0188',
      manufacturer: 'Sartorius Metrology India Pvt Ltd',
      model: 'Secura Analytical Pro 600',
      serialNumber: 'IND/RRSL-BLR/2026/0411',
      accuracyClass: 'Class II',
      maxCapacity: '600 g',
      e: '0.01 g',
      lab: 'RRSL Bengaluru',
      officer: 'Smt. K. Ananthalakshmi',
      date: '2026-09-08',
      status: 'PASS',
      hash: 'OIML-R76-12A45C99-33FE8901',
    },
    {
      certId: 'RRSL/DEL/DEFECT-R76/2026/004',
      manufacturer: 'Apex Industrial Instruments',
      model: 'Platform Scale Benchmark 30K',
      serialNumber: 'IND/AUDIT-REJECT/2026/9941',
      accuracyClass: 'Class III',
      maxCapacity: '30 kg',
      e: '0.01 kg',
      lab: 'RRSL New Delhi',
      officer: 'Shri Vikramaditya Rathore',
      date: '2026-09-08',
      status: 'FAIL',
      hash: 'OIML-R76-99BA0014-44CC7712',
    },
    {
      certId: 'NPL/IND/2026/MET-0104',
      manufacturer: 'Mettler Toledo Precision Balance',
      model: 'XPR Micro-Analytical 205',
      serialNumber: 'IND/NPL/2026/MICRO-901',
      accuracyClass: 'Class I',
      maxCapacity: '220 g',
      e: '0.001 g',
      lab: 'CSIR - NPL India',
      officer: 'Dr. A. Sharma',
      date: '2026-09-07',
      status: 'PASS',
      hash: 'OIML-R76-88CC3321-77EE9920',
    },
    {
      certId: 'RRSL/FBD/NAWI/2026/0882',
      manufacturer: 'Essae-Teraoka Electronics Ltd.',
      model: 'DS-215 Electronic Counter Scale',
      serialNumber: 'IND/RRSL-FBD/2026/5512',
      accuracyClass: 'Class III',
      maxCapacity: '31 kg',
      e: '0.01 kg',
      lab: 'RRSL Faridabad',
      officer: 'Shri M. P. Verma',
      date: '2026-09-06',
      status: 'PASS',
      hash: 'OIML-R76-33DD9988-11AA4455',
    },
  ];

  const filtered = repositoryData.filter((item) => {
    const matchesSearch =
      item.certId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lab.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass =
      filterClass === 'all' || item.accuracyClass.toLowerCase().includes(filterClass.toLowerCase());

    return matchesSearch && matchesClass;
  });

  return (
    <div
      className={`border rounded p-4 mb-6 transition-colors ${
        isHighContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-slate-300 text-slate-800'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-slate-200 gap-2">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#002147] font-sans">
            {language === 'hi'
              ? 'केन्द्रीय विधिक मापविज्ञान रिपोर्ट रिपॉजिटरी एवं ऑडिट ट्रेल'
              : 'Central Legal Metrology Report Repository & Evaluation Audit Trail'}
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            National digital registry of pattern evaluations and model approval certificates issued across India.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
          Showing {filtered.length} Archived Records
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search by Certificate No, Serial No, Manufacturer, or RRSL Lab..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-8 pl-8 pr-3 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:border-[#002147] outline-hidden font-sans"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="h-8 px-2 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:border-[#002147] outline-hidden font-sans"
          >
            <option value="all">All Accuracy Classes</option>
            <option value="Class I">Class I (Special)</option>
            <option value="Class II">Class II (High)</option>
            <option value="Class III">Class III (Medium)</option>
          </select>
        </div>
      </div>

      {/* High Density Governmental Data Table */}
      <div className="overflow-x-auto border border-slate-300 rounded">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-800 border-b border-slate-300 font-bold text-[11px]">
              <th className="p-2 border-r border-slate-200">Certificate Reference No.</th>
              <th className="p-2 border-r border-slate-200">Manufacturer & Model</th>
              <th className="p-2 border-r border-slate-200">Serial No.</th>
              <th className="p-2 border-r border-slate-200">Class & Capacity</th>
              <th className="p-2 border-r border-slate-200">Testing Laboratory</th>
              <th className="p-2 border-r border-slate-200">Testing Metrologist</th>
              <th className="p-2 border-r border-slate-200">Date</th>
              <th className="p-2 border-r border-slate-200 text-center">Verdict</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-sans text-xs">
            {filtered.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition">
                <td className="p-2 font-mono font-bold text-[#002147] border-r border-slate-200">
                  {item.certId}
                </td>
                <td className="p-2 border-r border-slate-200">
                  <div className="font-bold text-slate-900">{item.manufacturer}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{item.model}</div>
                </td>
                <td className="p-2 font-mono text-slate-700 border-r border-slate-200">
                  {item.serialNumber}
                </td>
                <td className="p-2 border-r border-slate-200 font-mono">
                  <span className="font-bold">{item.accuracyClass}</span> &bull; {item.maxCapacity} (e ={' '}
                  {item.e})
                </td>
                <td className="p-2 border-r border-slate-200">{item.lab}</td>
                <td className="p-2 border-r border-slate-200 text-slate-600">{item.officer}</td>
                <td className="p-2 font-mono text-slate-600 border-r border-slate-200">{item.date}</td>
                <td className="p-2 text-center border-r border-slate-200 font-bold">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] ${
                      item.status === 'PASS'
                        ? 'bg-[#15803D] text-white'
                        : 'bg-[#B91C1C] text-white'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => onLoadReport(item.certId)}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[11px] font-bold text-[#002147] cursor-pointer transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
