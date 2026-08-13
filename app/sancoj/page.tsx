'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import OpportunityModal from '@/components/OpportunityModal';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { OpportunityItem } from '@/lib/data';
import {
  Briefcase,
  Building,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function OpportunitiesPage() {
  const { lang, t } = useLanguage();
  const { opportunities: realTimeOpps } = useAuth();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('Ĉiuj');
  const [selectedOpp, setSelectedOpp] = useState<OpportunityItem | null>(null);

  const types = ['Ĉiuj', 'Collaborator', 'Contract', 'Trial', 'Scholarship', 'Exchange'];

  const filteredOpps = realTimeOpps.filter((opp) => {
    if (selectedType === 'Ĉiuj') return true;
    return opp.type === selectedType;
  });

  const collaboratorOpp = realTimeOpps.find((o) => o.type === 'Collaborator') || realTimeOpps[realTimeOpps.length - 1];


  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 flex flex-col font-sans selection:bg-green-100">
      <Navbar onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1">
        
        {/* Banner */}
        <section className="bg-[#fcfaf7] text-stone-900 py-10 md:py-14 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-300 text-green-700 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Futbalaj Programaĵoj</span>
            </div>
            <h1 className="serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight">
              {t('opp.page.title')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
              {t('opp.page.subtitle')}
            </p>
          </div>
        </section>

        {/* Real Valladolid C Spotlight Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-8">
          <div className="bg-stone-900 text-stone-100 p-8 sm:p-10 border border-stone-800">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-700 text-white font-bold text-[10px] uppercase tracking-widest">
                  ★ Flagŝipa Partnero: Real Valladolid C
                </div>
                <h2 className="serif text-2xl sm:text-3xl font-normal text-stone-50 leading-tight">
                  Unu Plena Sezono en Hispanio kun Esperanto-Interŝanĝo
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                  Oficiala programo de IKEF Futbalo kaj Real Valladolid C ofertanta profesian trejnadon, loĝadon kaj ligmatĉojn en Hispanio por talenta Esperantista futbalisto.
                </p>
              </div>

              <button
                onClick={() => setSelectedOpp(realTimeOpps[0] || null)}
                className="px-6 py-3.5 bg-green-700 hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer"
              >
                Legu Detalojn & Kandidatiĝu →
              </button>
            </div>
          </div>
        </section>

        {/* CALL FOR COLLABORATORS / PLATFORM DEVELOPERS & WRITERS SPOTLIGHT */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-6">
          <div className="bg-emerald-950 text-white p-8 sm:p-10 border border-emerald-800 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 text-emerald-900/40 text-[180px] font-black pointer-events-none select-none">
              &lt;/&gt;
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-800 text-emerald-100 text-[10px] font-bold uppercase tracking-[0.2em] border border-emerald-700">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Alvoko al Kunlaborantoj & Verkistoj / Call for Collaborators</span>
                </div>

                <h2 className="serif text-2xl sm:text-3xl font-normal text-white leading-tight">
                  Ĉu vi volas verki, traduki aŭ evoluigi nian platformon?
                </h2>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans max-w-2xl">
                  Ni serĉas interesitajn membrojn por partopreni en la <strong>Platforma Evoluiga Projekto</strong>. Kontribuu per skribado de artikoloj, plibonigo de la futbala vortaro, kodado aŭ disvolvo de novaj ciferecaj iloj por nia tutmonda komunumo!
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[10px] bg-emerald-900/90 text-emerald-200 px-2.5 py-1 border border-emerald-700 font-bold uppercase">
                    ✍️ Artikol-Verkado
                  </span>
                  <span className="text-[10px] bg-emerald-900/90 text-emerald-200 px-2.5 py-1 border border-emerald-700 font-bold uppercase">
                    📚 Vortaro & Terminologio
                  </span>
                  <span className="text-[10px] bg-emerald-900/90 text-emerald-200 px-2.5 py-1 border border-emerald-700 font-bold uppercase">
                    💻 Reteja Evoluigo (Software Dev)
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  onClick={() => setSelectedOpp(collaboratorOpp)}
                  className="w-full lg:w-auto px-6 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Aliĝi kiel Kunlaboranto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs & Cards */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          
          {/* Type Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mr-2 shrink-0">
              Tipo:
            </span>
            {types.map((tType) => (
              <button
                key={tType}
                onClick={() => setSelectedType(tType)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  selectedType === tType
                    ? 'bg-green-700 text-white border-green-700'
                    : 'bg-white border-stone-300 text-stone-800 hover:bg-stone-50'
                }`}
              >
                {tType === 'Ĉiuj' ? 'Ĉiuj Ŝancoj' : tType}
              </button>
            ))}
          </div>

          {/* Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOpps.map((opp) => (
              <div
                key={opp.id}
                className="editorial-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-extrabold uppercase tracking-wider border border-green-200">
                      {opp.typeEo} ({opp.type})
                    </span>
                    <span className="text-xs font-bold text-stone-500 flex items-center gap-1 uppercase tracking-wider text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      Limo: {opp.deadline}
                    </span>
                  </div>

                  <h3 className="serif text-2xl font-normal text-stone-900 mb-1">
                    {lang === 'eo' ? opp.titleEo : opp.titleEn}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-stone-500 mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1 text-green-700">
                      <Building className="w-3.5 h-3.5" />
                      {opp.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {opp.location}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 border border-stone-200 mb-4">
                    {lang === 'eo' ? opp.descriptionEo : opp.descriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {opp.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200 uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Kandidatiĝo malfermita
                  </span>

                  <button
                    onClick={() => setSelectedOpp(opp)}
                    className="px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Vidi Detalojn / Aliĝi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </section>

      </main>

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onAddMember={() => {}}
      />

      <OpportunityModal
        opportunity={selectedOpp}
        onClose={() => setSelectedOpp(null)}
      />

      <Footer />
    </div>
  );
}
