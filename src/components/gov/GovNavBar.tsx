'use client';

import React from 'react';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Archive,
  BookOpen,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';

export type GovPortalTab =
  | 'workspace' // New Test Report / Evaluation Workspace
  | 'repository' // Report Repository
  | 'rulebook' // OIML Rulebook
  | 'helpdesk'; // Help & Support

interface GovNavBarProps {
  activeTab: GovPortalTab;
  setActiveTab: (tab: GovPortalTab) => void;
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function GovNavBar({
  activeTab,
  setActiveTab,
  language,
  isHighContrast,
}: GovNavBarProps) {
  const tabs = [
    {
      id: 'workspace' as GovPortalTab,
      labelEn: 'New Test Report (Evaluation Workspace)',
      labelHi: 'नई परीक्षण रिपोर्ट (मूल्यांकन कार्यक्षेत्र)',
      icon: FileSpreadsheet,
    },
    {
      id: 'repository' as GovPortalTab,
      labelEn: 'Report Repository',
      labelHi: 'रिपोर्ट रिपॉजिटरी',
      icon: Archive,
    },
    {
      id: 'rulebook' as GovPortalTab,
      labelEn: 'OIML Rulebook & Clauses',
      labelHi: 'ओआईएमएल नियम पुस्तिका',
      icon: BookOpen,
    },
    {
      id: 'helpdesk' as GovPortalTab,
      labelEn: 'Help & Support (Helpdesk)',
      labelHi: 'सहायता एवं संपर्क',
      icon: HelpCircle,
    },
  ];

  return (
    <nav
      className={`border-b transition-colors no-print ${
        isHighContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-[#0B3C5D] border-[#002147] text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold font-sans tracking-wide rounded-t whitespace-nowrap cursor-pointer transition ${
                  isActive
                    ? isHighContrast
                      ? 'bg-yellow-400 text-black font-extrabold'
                      : 'bg-white text-[#002147] shadow-xs'
                    : isHighContrast
                    ? 'text-yellow-300 hover:bg-slate-900'
                    : 'text-slate-100 hover:bg-[#002E6D] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{language === 'hi' ? tab.labelHi : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
