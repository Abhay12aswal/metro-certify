'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessStepCarouselProps {
  onAccessDashboard: () => void;
}

export default function ProcessStepCarousel({ onAccessDashboard }: ProcessStepCarouselProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showAllStepsModal, setShowAllStepsModal] = useState<boolean>(false);

  const steps = [
    {
      num: '01',
      title: 'Digital Data Entry & Calibration Setup',
      summary:
        'Officer inputs instrument specifications (Max, Min, e, d) and ambient conditions. The platform automatically calculates the verification scale divisions (n = Max/e) and checks legal norm constraints.',
      keyOutput: 'Scale division count n & Environmental validity check',
    },
    {
      num: '02',
      title: 'Automated Load Observation Matrix',
      summary:
        'Standard test loads (0, Min, 500e, 1000e, 2000e, Max) are auto-populated for both Ascending (Loading) and Descending (Unloading) cycles. Small added weights (ΔL) are recorded directly on the bench.',
      keyOutput: 'Observation sheet with turning point inputs',
    },
    {
      num: '03',
      title: 'Deterministic Rules & MPE Verification',
      summary:
        'The calculation engine instantly determines indication before rounding (P), true error (E), and corrected error (Ec) with zero offset deduction. Dynamic stepped MPE envelopes are evaluated in real time.',
      keyOutput: 'Zero-jitter error determination & Pass/Fail status',
    },
    {
      num: '04',
      title: 'Key Performance & Repeatability Tests',
      summary:
        'Officers execute Eccentricity corner load tests (Clause 3.6.2) and Repeatability tests (Clause 3.6.1). Range differences (Imax - Imin) are verified against permissible tolerances automatically.',
      keyOutput: 'Corner load & repeatability verification',
    },
    {
      num: '05',
      title: 'Official OIML R 76-2 Report Generation & QR Stamping',
      summary:
        'Generates an official pattern evaluation certificate complete with Government of India header, observation tables, dual officer signatures, and a tamper-evident SHA-256 verification QR code.',
      keyOutput: 'Certified OIML R 76-2 PDF ready for national model approval',
    },
  ];

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const active = steps[currentStep];

  return (
    <section id="workflow" className="py-16 bg-[#F8FAFC] border-b border-slate-200 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Centered Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147]">
            Standard Operating Procedure // 5-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
            How We Automate Model Approvals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A 5-step digital framework integrating data entry, automated verification, and digital archiving.
          </p>
        </div>

        {/* Interactive Horizontal Step Carousel */}
        <div className="max-w-3xl mx-auto">
          {/* Main Step Card */}
          <div className="relative bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-sm min-h-[260px] flex flex-col justify-between overflow-hidden">
            {/* Large Faded Step Number in Background */}
            <div className="absolute top-4 right-6 text-7xl sm:text-8xl font-black font-mono text-slate-100 select-none pointer-events-none">
              {active.num}
            </div>

            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-[#002147] font-mono text-xs font-bold border border-blue-200">
                <span>STAGE {active.num} OF 05</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-[#002147]">
                {active.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-xl">
                {active.summary}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Output: {active.keyOutput}</span>
              </span>

              {/* Step Navigation Dots */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`w-2 h-2 rounded-full transition cursor-pointer ${
                      currentStep === idx ? 'w-6 bg-[#002147]' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={`Go to Step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Arrows and Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded text-xs font-bold text-slate-700 shadow-2xs transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <span className="text-xs font-mono text-slate-500">
              Step {currentStep + 1} of {steps.length}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded text-xs font-bold text-slate-700 shadow-2xs transition cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Centered "View All Steps" Button in Solid Deep Blue */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllStepsModal(true)}
              className="px-6 py-2.5 bg-[#002147] hover:bg-[#0B3C5D] text-white text-xs font-bold rounded shadow-xs transition hover:shadow cursor-pointer"
            >
              View All Steps
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Full View of All Steps */}
      {showAllStepsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-300 rounded-xl p-6 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-black text-[#002147] uppercase">
                OIML R-76 Approval Framework: All 5 Stages
              </h3>
              <button
                onClick={() => setShowAllStepsModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xs"
              >
                Close &times;
              </button>
            </div>

            <div className="space-y-3 font-sans">
              {steps.map((s) => (
                <div key={s.num} className="p-3.5 bg-slate-50 border border-slate-200 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-[#002147] text-xs">Step {s.num}</span>
                    <h4 className="font-bold text-xs text-slate-900">{s.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600">{s.summary}</p>
                  <div className="mt-1.5 text-[11px] text-emerald-800 font-mono font-semibold">
                    &bull; Output: {s.keyOutput}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={onAccessDashboard}
                className="px-4 py-2 bg-[#002147] text-white text-xs font-bold rounded cursor-pointer"
              >
                Execute in Dashboard &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
