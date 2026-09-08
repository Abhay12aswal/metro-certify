'use client';

import React from 'react';
import NationalEmblem from './NationalEmblem';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface GovFooterProps {
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function GovFooter({ language, isHighContrast }: GovFooterProps) {
  return (
    <footer
      className={`border-t font-sans text-xs select-none no-print transition-colors ${
        isHighContrast
          ? 'bg-black text-yellow-300 border-yellow-400'
          : 'bg-[#001529] text-slate-300 border-[#000d1a]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800">
          {/* Column 1: Ministry / Government Branding */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-3">
              <NationalEmblem className="w-6 h-8 text-amber-400" />
              <div>
                <h4 className="font-bold text-white text-xs">
                  {language === 'hi'
                    ? 'उपभोक्ता मामले विभाग'
                    : 'Department of Consumer Affairs'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  {language === 'hi'
                    ? 'उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय, भारत सरकार'
                    : 'Ministry of Consumer Affairs, Food & Public Distribution, Government of India'}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-lg font-serif pt-1">
              National Legal Metrology Digital Evaluation Portal facilitates automated model approval,
              pattern evaluation, and test certificate issuance for Non-Automatic Weighing Instruments
              in strict compliance with OIML Recommendation R 76-1:2006 and R 76-2:2007.
            </p>
          </div>

          {/* Column 2: Government Links */}
          <div>
            <h5 className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">
              {language === 'hi' ? 'महत्वपूर्ण कड़ियां' : 'Important Portals'}
            </h5>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>
                <a
                  href="https://consumeraffairs.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>Dept. of Consumer Affairs</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://nplindia.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>CSIR - NPL India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.oiml.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>OIML Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <span>National Portal of India</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Disclosures */}
          <div>
            <h5 className="font-bold text-white uppercase text-[11px] mb-2 tracking-wider">
              {language === 'hi' ? 'अधिनियम एवं नीतियां' : 'Statutory & Policy'}
            </h5>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>
                <a href="#privacy" className="hover:text-amber-300 transition">
                  Website Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-amber-300 transition">
                  Terms of Service & Usage
                </a>
              </li>
              <li>
                <a href="#gigw" className="hover:text-amber-300 transition">
                  GIGW 3.0 Compliance
                </a>
              </li>
              <li>
                <a href="#hyperlink" className="hover:text-amber-300 transition">
                  Hyperlink Policy
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-amber-300 transition">
                  Government Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Standard Disclosures */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400">
          <div>
            Designed &amp; Developed for Department of Consumer Affairs | Powered by Legal Metrology
            Division, Govt. of India
          </div>
          <div className="flex items-center gap-3">
            <span>Last Updated: 08 Sep 2026</span>
            <span>&bull;</span>
            <span>Server Location: NIC National Cloud, New Delhi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
