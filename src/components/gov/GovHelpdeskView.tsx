'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Building, Send, CheckCircle2 } from 'lucide-react';

interface GovHelpdeskViewProps {
  language: 'en' | 'hi';
  isHighContrast: boolean;
}

export default function GovHelpdeskView({ language, isHighContrast }: GovHelpdeskViewProps) {
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const labs = [
    {
      name: 'CSIR - National Physical Laboratory (NPL India)',
      address: 'Dr. K.S. Krishnan Marg, New Delhi - 110012',
      nodal: 'Head of Physico-Mechanical Standards',
      phone: '+91-11-4560-9212',
      email: 'standards@nplindia.org',
    },
    {
      name: 'RRSL Ahmedabad (Western Region)',
      address: 'Near Sola Bridge, S.G. Highway, Ahmedabad, Gujarat - 380060',
      nodal: 'Director, RRSL Western Region',
      phone: '+91-79-2766-3021',
      email: 'rrsl-ahm@nic.in',
    },
    {
      name: 'RRSL Bengaluru (Southern Region)',
      address: 'PB No. 5814, Peenya Industrial Area, Bengaluru, Karnataka - 560058',
      nodal: 'Director, RRSL Southern Region',
      phone: '+91-80-2839-4451',
      email: 'rrsl-blr@nic.in',
    },
    {
      name: 'RRSL Bhubaneswar (Eastern Region)',
      address: 'Near AIIMS, Sijua, Patrapada, Bhubaneswar, Odisha - 751019',
      nodal: 'Director, RRSL Eastern Region',
      phone: '+91-674-247-5120',
      email: 'rrsl-bbsr@nic.in',
    },
    {
      name: 'RRSL Faridabad (Northern Region)',
      address: 'Sector 27-C, Mathura Road, Faridabad, Haryana - 121003',
      nodal: 'Director, RRSL Northern Region',
      phone: '+91-129-227-4025',
      email: 'rrsl-fbd@nic.in',
    },
    {
      name: 'RRSL Varanasi (Central Region)',
      address: 'Plot No. 4, Industrial Area, Ramnagar, Varanasi, UP - 221008',
      nodal: 'Director, RRSL Central Region',
      phone: '+91-542-262-3112',
      email: 'rrsl-vns@nic.in',
    },
  ];

  return (
    <div
      className={`border rounded p-4 mb-6 transition-colors ${
        isHighContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-white border-slate-300 text-slate-800'
      }`}
    >
      <div className="pb-3 mb-4 border-b border-slate-200">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#002147] font-sans">
          {language === 'hi'
            ? 'विधिक मापविज्ञान सहायता केन्द्र एवं क्षेत्रीय प्रयोगशाला निर्देशिका'
            : 'Legal Metrology Helpdesk & National Standards Laboratories Directory'}
        </h2>
        <p className="text-xs text-slate-500 font-sans mt-0.5">
          Government nodal contacts for pattern approval, verification disputes, and technical support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Laboratories Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
          {labs.map((lab, idx) => (
            <div key={idx} className="p-3 bg-slate-50 border border-slate-300 rounded space-y-1.5">
              <h4 className="font-bold text-[#002147] text-xs flex items-start gap-1.5">
                <Building className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-600" />
                <span>{lab.name}</span>
              </h4>
              <p className="text-[11px] text-slate-600 pl-5">{lab.address}</p>
              <div className="text-[10px] text-slate-500 pl-5">
                <strong>Officer:</strong> {lab.nodal}
              </div>
              <div className="flex items-center gap-4 text-[10px] pl-5 pt-1 font-mono text-blue-950 font-semibold">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  {lab.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-500" />
                  {lab.email}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Support Ticket Submission Box */}
        <div className="p-4 bg-slate-50 border border-slate-300 rounded text-xs font-sans">
          <h4 className="font-bold text-[#002147] text-xs mb-2">
            Submit Technical Evaluation Query
          </h4>
          <p className="text-[11px] text-slate-500 mb-3">
            For doubts on OIML R 76-1 interpretation, software bugs, or statutory appeals.
          </p>

          {ticketSubmitted ? (
            <div className="p-3 bg-emerald-100 border border-emerald-300 rounded text-[#15803D] text-xs font-bold text-center">
              <CheckCircle2 className="w-5 h-5 mx-auto mb-1" />
              <span>Grievance Ticket Logged: #LM-2026-0982. Department response within 2 working days.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTicketSubmitted(true);
              }}
              className="space-y-2.5"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Officer Name & Designation
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. A. Sharma"
                  className="w-full h-8 px-2.5 bg-white border border-slate-300 rounded text-xs outline-hidden focus:border-[#002147]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Government Email / Mobile No.
                </label>
                <input
                  type="text"
                  required
                  placeholder="officer@nic.in"
                  className="w-full h-8 px-2.5 bg-white border border-slate-300 rounded text-xs outline-hidden focus:border-[#002147]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">
                  Query Subject & Clause Reference
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your calculation or verification discrepancy..."
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs outline-hidden focus:border-[#002147]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#002147] text-white font-bold rounded text-xs hover:bg-[#0A3A60] transition cursor-pointer"
              >
                Submit Official Grievance Ticket
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
