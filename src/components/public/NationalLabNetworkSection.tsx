'use client';

import React, { useState } from 'react';
import { MapPin, Building, Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface NationalLabNetworkSectionProps {
  onAccessDashboard: () => void;
}

export default function NationalLabNetworkSection({
  onAccessDashboard,
}: NationalLabNetworkSectionProps) {
  const [selectedLabId, setSelectedLabId] = useState<string>('npl');

  const labs = [
    {
      id: 'npl',
      name: 'CSIR - National Physical Laboratory (NPL India)',
      shortName: 'NPL New Delhi',
      city: 'New Delhi',
      region: 'National Metrology Institute (NMI)',
      badge: 'Apex Primary Standards Lab',
      badgeColor: 'bg-blue-100 text-[#002147] border-blue-200',
      address: 'Dr. K.S. Krishnan Marg, New Delhi - 110012',
      phone: '+91-11-4560-9212',
      email: 'director@nplindia.org',
      // Approximate map coordinates in SVG viewBox (0 0 500 550)
      mapX: 200,
      mapY: 175,
    },
    {
      id: 'fbd',
      name: 'RRSL Faridabad',
      shortName: 'RRSL Faridabad',
      city: 'Faridabad, Haryana',
      region: 'Northern Regional Reference Lab',
      badge: 'Regional Standards Node',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      address: 'Sector 27-C, Mathura Road, Faridabad - 121003',
      phone: '+91-129-227-4025',
      email: 'rrsl-fbd@nic.in',
      mapX: 205,
      mapY: 185,
    },
    {
      id: 'ahm',
      name: 'RRSL Ahmedabad',
      shortName: 'RRSL Ahmedabad',
      city: 'Ahmedabad, Gujarat',
      region: 'Western Regional Reference Lab',
      badge: 'Regional Standards Node',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      address: 'Near Sola Bridge, S.G. Highway, Ahmedabad - 380060',
      phone: '+91-79-2766-3021',
      email: 'rrsl-ahm@nic.in',
      mapX: 130,
      mapY: 260,
    },
    {
      id: 'vns',
      name: 'RRSL Varanasi',
      shortName: 'RRSL Varanasi',
      city: 'Varanasi, Uttar Pradesh',
      region: 'Central Regional Reference Lab',
      badge: 'Regional Standards Node',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      address: 'Plot No. 4, Industrial Area, Ramnagar, Varanasi - 221008',
      phone: '+91-542-262-3112',
      email: 'rrsl-vns@nic.in',
      mapX: 285,
      mapY: 230,
    },
    {
      id: 'bbsr',
      name: 'RRSL Bhubaneswar',
      shortName: 'RRSL Bhubaneswar',
      city: 'Bhubaneswar, Odisha',
      region: 'Eastern Regional Reference Lab',
      badge: 'Regional Standards Node',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      address: 'Near AIIMS, Sijua, Patrapada, Bhubaneswar - 751019',
      phone: '+91-674-247-5120',
      email: 'rrsl-bbsr@nic.in',
      mapX: 330,
      mapY: 300,
    },
    {
      id: 'blr',
      name: 'RRSL Bengaluru',
      shortName: 'RRSL Bengaluru',
      city: 'Bengaluru, Karnataka',
      region: 'Southern Regional Reference Lab',
      badge: 'Regional Standards Node',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      address: 'PB No. 5814, Peenya Industrial Area, Bengaluru - 560058',
      phone: '+91-80-2839-4451',
      email: 'rrsl-blr@nic.in',
      mapX: 195,
      mapY: 420,
    },
  ];

  const selectedLab = labs.find((l) => l.id === selectedLabId) || labs[0];

  return (
    <section id="lab-network" className="py-16 bg-white border-b border-slate-200 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147]">
            National Legal Metrology Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
            Designated Legal Metrology Testing Network
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Connecting NPL India and regional evaluation laboratories across the country.
          </p>
        </div>

        {/* Split Screen Layout: Left list, Right Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Vertical list of key test facilities */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-200 flex justify-between">
              <span>Select Recognized Testing Facility</span>
              <span className="font-mono text-[#002147]">6 Nodal Centers</span>
            </div>

            <div className="space-y-2.5">
              {labs.map((lab) => {
                const isSelected = selectedLabId === lab.id;
                return (
                  <div
                    key={lab.id}
                    onClick={() => setSelectedLabId(lab.id)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/70 border-[#002147] shadow-sm ring-1 ring-[#002147]'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`p-2 rounded mt-0.5 ${
                            isSelected
                              ? 'bg-[#002147] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                            {lab.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                            <span>{lab.city}</span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase shrink-0 ${lab.badgeColor}`}
                      >
                        {lab.badge}
                      </span>
                    </div>

                    {/* Detailed info if selected */}
                    {isSelected && (
                      <div className="mt-3 pt-2.5 border-t border-blue-200 text-xs text-slate-600 space-y-1 font-sans">
                        <div className="text-[11px]">
                          <strong>Address:</strong> {lab.address}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-600 pt-0.5">
                          <span>Phone: {lab.phone}</span>
                          <span>Email: {lab.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Interactive Map component of India */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center relative">
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-sans mb-4">
              <span className="font-bold text-[#002147]">
                Live Geographic Evaluation Map
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                Click pins to inspect lab nodes
              </span>
            </div>

            {/* India Map Geometric SVG Representation */}
            <div className="relative w-full max-w-[420px] aspect-[500/550]">
              <svg
                viewBox="0 0 500 550"
                className="w-full h-full filter drop-shadow-sm select-none"
              >
                {/* Simplified Realistic Stylized India Contour Silhouette */}
                <path
                  d="M170,80 L200,45 L220,50 L240,70 L260,85 L255,115 L285,120 L305,100 L320,110 L310,135 L335,145 L350,135 L380,140 L410,120 L425,135 L405,160 L435,175 L415,200 L370,195 L345,210 L345,230 L395,250 L400,270 L360,285 L340,310 L310,340 L285,385 L260,430 L220,490 L200,530 L180,470 L160,420 L150,370 L130,320 L110,290 L95,280 L110,240 L130,225 L115,200 L135,170 L150,135 Z"
                  fill="#E2E8F0"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />

                {/* State Reference Lines (Stylized Grid Overlay) */}
                <path
                  d="M150,225 Q240,240 345,230"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M130,320 Q220,340 310,340"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M200,100 L200,480"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Render Interactive Map Pins */}
                {labs.map((lab) => {
                  const isSelected = selectedLabId === lab.id;
                  return (
                    <g
                      key={lab.id}
                      onClick={() => setSelectedLabId(lab.id)}
                      className="cursor-pointer group"
                    >
                      {/* Pulse Circle on active pin */}
                      {isSelected && (
                        <circle
                          cx={lab.mapX}
                          cy={lab.mapY}
                          r="16"
                          fill="#002147"
                          opacity="0.18"
                          className="animate-ping"
                        />
                      )}

                      {/* Pin Outer Ring */}
                      <circle
                        cx={lab.mapX}
                        cy={lab.mapY}
                        r={isSelected ? '9' : '6.5'}
                        fill={isSelected ? '#002147' : '#B91C1C'}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        className="transition-all duration-300 group-hover:scale-125"
                      />

                      {/* Center Dot */}
                      <circle
                        cx={lab.mapX}
                        cy={lab.mapY}
                        r="2.5"
                        fill="#FFFFFF"
                      />

                      {/* Pin Label */}
                      <text
                        x={lab.mapX + (lab.mapX > 250 ? -12 : 12)}
                        y={lab.mapY + 4}
                        textAnchor={lab.mapX > 250 ? 'end' : 'start'}
                        fontSize="10.5"
                        fontWeight={isSelected ? '800' : '600'}
                        fill={isSelected ? '#002147' : '#334155'}
                        fontFamily="sans-serif"
                      >
                        {lab.shortName}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Active Lab Card Callout Overlay on Bottom of Map */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs border border-slate-300 rounded p-3 shadow-md font-sans text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      Selected Evaluation Node
                    </span>
                    <h5 className="font-black text-[#002147]">{selectedLab.name}</h5>
                    <div className="text-[10px] text-slate-600 font-mono">
                      {selectedLab.region} &bull; {selectedLab.phone}
                    </div>
                  </div>
                  <button
                    onClick={onAccessDashboard}
                    className="px-3 py-1.5 bg-[#002147] hover:bg-[#0B3C5D] text-white font-bold text-[10px] rounded shrink-0 cursor-pointer"
                  >
                    Open Lab Portal &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
