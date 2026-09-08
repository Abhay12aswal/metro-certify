'use client';

import React from 'react';
import NationalEmblem from '../gov/NationalEmblem';
import { ExternalLink, Scale, ShieldCheck } from 'lucide-react';

interface PublicFooterProps {
  onAccessDashboard: () => void;
}

export default function PublicFooter({ onAccessDashboard }: PublicFooterProps) {
  return (
    <footer className="bg-[#001529] text-slate-300 font-sans text-xs border-t border-slate-800 no-print select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Column 1: Ministry Branding */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <NationalEmblem className="w-6 h-8 text-amber-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white text-xs">
                  Department of Consumer Affairs &bull; उपभोक्ता मामले विभाग
                </h4>
                <p className="text-[11px] text-slate-400">
                  Ministry of Consumer Affairs, Food & Public Distribution, Government of India
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed max-w-md font-sans pt-1">
              National statutory compliance portal for Non-Automatic Weighing Instruments (NAWI) model
              approval under OIML R-76 and the Legal Metrology Act, 2009. Standardizing pattern
              evaluations across India.
            </p>

            <div className="pt-2">
              <button
                onClick={onAccessDashboard}
                className="px-4 py-2 bg-[#0B3C5D] hover:bg-[#002147] text-white text-xs font-bold rounded border border-blue-400/30 transition cursor-pointer"
              >
                Access Evaluation Dashboard &rarr;
              </button>
            </div>
          </div>

          {/* Column 2: Core Modules & Links */}
          <div>
            <h5 className="font-bold text-white uppercase text-[11px] mb-3 tracking-wider">
              System Modules
            </h5>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>
                <a href="#overview" className="hover:text-amber-300 transition">
                  Platform Overview
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-amber-300 transition">
                  Automated MPE Rules Engine
                </a>
              </li>
              <li>
                <a href="#components" className="hover:text-amber-300 transition">
                  Key System Components
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-amber-300 transition">
                  5-Step Approval Process
                </a>
              </li>
              <li>
                <a href="#lab-network" className="hover:text-amber-300 transition">
                  National Lab Network
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Statutory References */}
          <div>
            <h5 className="font-bold text-white uppercase text-[11px] mb-3 tracking-wider">
              Statutory Documentation
            </h5>
            <ul className="space-y-1.5 text-[11px] text-slate-400 font-mono">
              <li>
                <a
                  href="https://www.oiml.org/en/files/pdf_r/r076-1-e06.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>OIML R 76-1:2006 (E)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.oiml.org/en/files/pdf_r/r076-2-e07.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>OIML R 76-2:2007 (E)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="#legal" className="hover:text-amber-300 transition">
                  Legal Metrology Act, 2009
                </a>
              </li>
              <li>
                <a href="#rules" className="hover:text-amber-300 transition">
                  LM (General) Rules, 2011
                </a>
              </li>
              <li>
                <a href="#helpdesk" className="hover:text-amber-300 transition">
                  Helpdesk &amp; Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Standard Government Disclosures */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-400">
          <div>
            Designed &amp; Developed for Department of Consumer Affairs | Powered by Legal Metrology Division, Govt. of India
          </div>
          <div className="flex items-center gap-3">
            <span>Last Updated: 08 Sep 2026</span>
            <span>&bull;</span>
            <span>GIGW 3.0 Compliant</span>
            <span>&bull;</span>
            <span>NIC Cloud Hosted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
