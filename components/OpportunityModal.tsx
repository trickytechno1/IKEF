'use client';

import React, { useState } from 'react';
import { OpportunityItem } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';
import { X, Calendar, MapPin, Building, CheckCircle, Send, ShieldCheck, Sparkles } from 'lucide-react';

interface OpportunityModalProps {
  opportunity: OpportunityItem | null;
  onClose: () => void;
}

export default function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  const { lang, t } = useLanguage();

  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('');
  const [statement, setStatement] = useState('');
  const [applied, setApplied] = useState(false);

  if (!opportunity) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;

    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantExperience('');
      setStatement('');
      onClose();
    }, 2200);
  };

  const title = lang === 'eo' ? opportunity.titleEo : opportunity.titleEn;
  const description = lang === 'eo' ? opportunity.descriptionEo : opportunity.descriptionEn;
  const requirements = lang === 'eo' ? opportunity.requirementsEo : opportunity.requirementsEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-green-700" />
            <span>{opportunity.typeEo} ({opportunity.type})</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            {title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-bold mt-3">
            <span className="flex items-center gap-1 text-slate-700">
              <Building className="w-4 h-4 text-green-700" />
              {opportunity.organization}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-green-700" />
              {opportunity.location}
            </span>
            <span className="flex items-center gap-1 text-red-600">
              <Calendar className="w-4 h-4" />
              Limo / Deadline: {opportunity.deadline}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {opportunity.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold">
              #{tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Priskribo de la Programo
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {description}
          </p>
        </div>

        {/* Requirements List */}
        <div className="mb-6 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Priskribo & Postuloj / Requirements
          </h3>
          <ul className="space-y-2">
            {requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                <CheckCircle className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Application Form Section */}
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-700" />
            <span>Kandidatiĝu Nun / Apply Now</span>
          </h3>

          {applied ? (
            <div className="p-6 rounded-xl bg-green-50 border border-green-200 text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-green-700 mx-auto" />
              <h4 className="text-lg font-extrabold text-green-900">
                Kandidatiĝo Sukcese Sendita!
              </h4>
              <p className="text-xs text-green-800">
                Dankon, {applicantName}! La teamo de IKEF Futbalo kaj {opportunity.organization} ekzamenos vian aliĝilon kaj kontaktos vin per retpoŝto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Via Nomo / Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ekz. Roberto Silva"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Retpoŝto / Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vi@ekzemplo.org"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Futbala Sperto (Kluboj, Niveloj, Ludo-pozicio)
                </label>
                <input
                  type="text"
                  placeholder="ekz. 3 jaroj en regiona II ligo, striketo, B1 Esperanto"
                  value={applicantExperience}
                  onChange={(e) => setApplicantExperience(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kial vi taŭgas por ĉi tiu programo? / Motivation Statement
                </label>
                <textarea
                  rows={3}
                  placeholder="Klarigu vian motivon por aliĝi al ĉi tiu IKEF-programo..."
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Fermi
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white text-xs font-bold shadow-md shadow-green-800/15 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Sendi Aliĝilon</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
