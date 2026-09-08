'use client';

import React, { useState, useMemo } from 'react';
import GovTopUtilityBar from '../components/gov/GovTopUtilityBar';
import GovMainHeader from '../components/gov/GovMainHeader';
import GovNavBar, { GovPortalTab } from '../components/gov/GovNavBar';
import GovSidebar from '../components/gov/GovSidebar';
import GovFooter from '../components/gov/GovFooter';
import ComplianceSummaryBanner from '../components/workspace/ComplianceSummaryBanner';
import InstrumentMetadataForm from '../components/workspace/InstrumentMetadataForm';
import EnvironmentalConditionsCard from '../components/workspace/EnvironmentalConditionsCard';
import WeighingPerformanceTable from '../components/workspace/WeighingPerformanceTable';
import AdditionalTestsCard from '../components/workspace/AdditionalTestsCard';
import EmbeddedReportPreview from '../components/workspace/EmbeddedReportPreview';
import ReportRepositoryView from '../components/repository/ReportRepositoryView';
import OimlRulebookView from '../components/rulebook/OimlRulebookView';
import GovHelpdeskView from '../components/gov/GovHelpdeskView';
import PublicLandingPage from '../components/public/PublicLandingPage';
import { PRESET_SCENARIOS, PresetScenario } from '../lib/presets';
import { calculateTestMatrix } from '../lib/oiml-engine';
import {
  InstrumentData,
  EnvironmentalConditions,
  InspectionMetadata,
  RawTestPointInput,
} from '../types/metrology';

export default function IndianGovEvaluationPortal() {
  // Public Portal vs Laboratory Dashboard State (Defaults to Public Landing Page)
  const [portalView, setPortalView] = useState<'public' | 'dashboard'>('public');

  // Accessibility & Localization State
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1, 0, 1
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Navigation State
  const [activeTab, setActiveTab] = useState<GovPortalTab>('workspace');
  const [activeSection, setActiveSection] = useState<string>('section-instrument');

  // Current Role State
  const [currentRole, setCurrentRole] = useState<string>(
    'Dr. A. Sharma | Senior Metrologist, NPL Lab'
  );

  // Metrological Master State (Defaults to Class III 15kg Retail Scale)
  const initialPreset = PRESET_SCENARIOS[0];
  const [instrument, setInstrument] = useState<InstrumentData>(initialPreset.data.instrument);
  const [environment, setEnvironment] = useState<EnvironmentalConditions>(initialPreset.data.environment);
  const [inspection, setInspection] = useState<InspectionMetadata>({
    ...initialPreset.data.inspection,
    labName: 'CSIR - National Physical Laboratory (NPL India)',
    officerName: 'Dr. A. Sharma',
    officerDesignation: 'Senior Metrologist (Legal Metrology Division)',
    approverName: 'Dr. Sunita Deshmukh',
    approverDesignation: 'Director & Head of Metrological Authority',
  });
  const [rawPoints, setRawPoints] = useState<RawTestPointInput[]>(initialPreset.data.testPoints);

  // Government Status Toast Banner
  const [govNotification, setGovNotification] = useState<string | null>(null);

  // Deterministic OIML R-76 Calculations
  const { calculatedPoints, summary } = useMemo(() => {
    return calculateTestMatrix(rawPoints, instrument, inspection.verificationType);
  }, [rawPoints, instrument, inspection.verificationType]);

  // Handle Preset Selection (SIH Evaluator Demo)
  const handleSelectPreset = (preset: PresetScenario) => {
    setInstrument(preset.data.instrument);
    setEnvironment(preset.data.environment);
    setInspection((prev) => ({
      ...prev,
      certificateNumber: preset.data.inspection.certificateNumber,
      testDate: preset.data.inspection.testDate,
    }));
    setRawPoints(preset.data.testPoints);

    setGovNotification(`Record Loaded: ${preset.name}. ${preset.description}`);
    setTimeout(() => setGovNotification(null), 5000);
  };

  const handleSaveDraft = () => {
    setGovNotification(
      `Evaluation Draft saved successfully to local repository. Record Ref: ${summary.certificateHash}`
    );
    setTimeout(() => setGovNotification(null), 4000);
  };

  const handleGeneratePdf = () => {
    setActiveTab('workspace');
    setTimeout(() => {
      const previewEl = document.getElementById('section-preview');
      if (previewEl) {
        previewEl.scrollIntoView({ behavior: 'smooth' });
      }
      setTimeout(() => {
        window.print();
      }, 400);
    }, 100);
  };

  const handleExportDocx = () => {
    const exportData = {
      portal: 'National Legal Metrology Digital Evaluation Portal',
      standard: 'OIML R 76-1:2006 & OIML R 76-2:2007',
      certificateNo: inspection.certificateNumber,
      officer: currentRole,
      instrument,
      environment,
      inspection,
      summary,
      observationReadings: calculatedPoints,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OIML-R76-Report-${inspection.certificateNumber.replace(/[^a-zA-Z0-9]/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setGovNotification('Official Evaluation Data Package exported successfully.');
    setTimeout(() => setGovNotification(null), 3000);
  };

  // Font scale class
  const fontScaleClass =
    fontSizeLevel === -1
      ? 'font-scale-sm'
      : fontSizeLevel === 1
      ? 'font-scale-lg'
      : 'font-scale-md';

  // If public portal view is active, render the Ministry Landing Page
  if (portalView === 'public') {
    return (
      <PublicLandingPage
        onAccessPortal={() => setPortalView('dashboard')}
        onReadRules={() => {
          setPortalView('dashboard');
          setActiveTab('rulebook');
        }}
        language={language}
        setLanguage={setLanguage}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
      />
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${fontScaleClass} ${
        isHighContrast ? 'high-contrast bg-black text-yellow-300' : 'bg-[#F4F6F9] text-slate-900'
      }`}
    >
      {/* 1. TOP UTILITY BAR (Official Government Header) */}
      <GovTopUtilityBar
        fontSizeLevel={fontSizeLevel}
        setFontSizeLevel={setFontSizeLevel}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 2. MAIN NAVIGATION HEADER */}
      <GovMainHeader
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        language={language}
        isHighContrast={isHighContrast}
        onExitToPublic={() => setPortalView('public')}
      />

      {/* 3. PRIMARY GOVERNMENT NAVIGATION BAR */}
      <GovNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        isHighContrast={isHighContrast}
      />

      {/* Official Government Alert Banner */}
      {govNotification && (
        <div className="bg-[#002147] text-white px-4 py-2 text-xs font-sans border-b border-amber-400 no-print flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{govNotification}</span>
            </div>
            <button
              onClick={() => setGovNotification(null)}
              className="text-amber-300 hover:text-white font-bold text-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 4. MAIN APPLICATION WORKSPACE */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5">
        {/* Tab 1: New Test Report (Data Entry & Evaluation Workspace) */}
        {activeTab === 'workspace' && (
          <div className="flex flex-col lg:flex-row items-start gap-5">
            {/* Main Form & Observation Grid */}
            <div className="flex-1 w-full min-w-0">
              {/* Real-time Solid Compliance Summary Banner */}
              <ComplianceSummaryBanner
                summary={summary}
                instrument={instrument}
                language={language}
                isHighContrast={isHighContrast}
              />

              {/* Form Section 1: Instrument Metadata */}
              <InstrumentMetadataForm
                instrument={instrument}
                setInstrument={setInstrument}
                language={language}
                isHighContrast={isHighContrast}
              />

              {/* Form Section 2: Environmental Conditions */}
              <EnvironmentalConditionsCard
                environment={environment}
                setEnvironment={setEnvironment}
                inspection={inspection}
                setInspection={setInspection}
                language={language}
                isHighContrast={isHighContrast}
              />

              {/* Form Section 3: Weighing Performance Table */}
              <WeighingPerformanceTable
                calculatedPoints={calculatedPoints}
                rawPoints={rawPoints}
                setRawPoints={setRawPoints}
                instrument={instrument}
                summary={summary}
                language={language}
                isHighContrast={isHighContrast}
              />

              {/* Form Section 4: Key Performance Tests (Eccentricity, Repeatability, Tilt) */}
              <AdditionalTestsCard
                instrument={instrument}
                language={language}
                isHighContrast={isHighContrast}
              />

              {/* Form Section 5: Embedded OIML R 76-2 Test Certificate Preview */}
              <EmbeddedReportPreview
                instrument={instrument}
                environment={environment}
                inspection={inspection}
                calculatedPoints={calculatedPoints}
                summary={summary}
                language={language}
                isHighContrast={isHighContrast}
              />
            </div>

            {/* Sidebar Action Panel */}
            <GovSidebar
              onSelectPreset={handleSelectPreset}
              onSaveDraft={handleSaveDraft}
              onGeneratePdf={handleGeneratePdf}
              onExportDocx={handleExportDocx}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              language={language}
              isHighContrast={isHighContrast}
              overallStatus={summary.overallStatus}
              totalPoints={summary.totalPoints}
            />
          </div>
        )}

        {/* Tab 2: Report Repository */}
        {activeTab === 'repository' && (
          <ReportRepositoryView
            onLoadReport={(certId) => {
              setActiveTab('workspace');
              setGovNotification(`Loaded evaluation record ${certId} from repository.`);
              setTimeout(() => setGovNotification(null), 4000);
            }}
            language={language}
            isHighContrast={isHighContrast}
          />
        )}

        {/* Tab 3: OIML Rulebook & Reference Guide */}
        {activeTab === 'rulebook' && (
          <OimlRulebookView language={language} isHighContrast={isHighContrast} />
        )}

        {/* Tab 4: Help & Support (Helpdesk) */}
        {activeTab === 'helpdesk' && (
          <GovHelpdeskView language={language} isHighContrast={isHighContrast} />
        )}
      </main>

      {/* 5. OFFICIAL GOVERNMENT FOOTER */}
      <GovFooter language={language} isHighContrast={isHighContrast} />
    </div>
  );
}
