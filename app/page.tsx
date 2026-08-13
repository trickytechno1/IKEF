'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import OpportunityModal from '@/components/OpportunityModal';
import MemberModal from '@/components/MemberModal';
import SpeechButton from '@/components/SpeechButton';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { MemberItem, OpportunityItem } from '@/lib/data';
import {
  Users,
  Globe2,
  Trophy,
  Languages,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  Calendar,
  Building,
  CheckCircle,
  Star,
  MapPin,
  MessageSquare,
  Play,
  HeartHandshake
} from 'lucide-react';

export default function HomePage() {
  const { lang, t } = useLanguage();
  const { members: realTimeMembers, opportunities: realTimeOpps, vocabulary: realTimeVocab } = useAuth();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<OpportunityItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);

  const members = realTimeMembers;
  const FEATURED_OPPORTUNITIES = realTimeOpps;
  const INITIAL_VOCABULARY = realTimeVocab;


  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
      <Navbar onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1">
        
        {/* HERO AREA (Editorial Grid Layout) */}
        <section className="border-b border-stone-200 bg-[#fcfaf7]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            
            {/* Left Col: Hero Narrative */}
            <div className="lg:col-span-7 flex flex-col p-8 sm:p-12 lg:border-r border-stone-200 relative overflow-hidden justify-between">
              <div className="absolute -top-12 -left-10 text-[220px] font-bold text-stone-200/40 leading-none pointer-events-none select-none">
                EO
              </div>

              <div className="relative z-10 pt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-300 text-green-700 text-[10px] font-bold uppercase tracking-[0.25em] mb-6">
                  <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                  <span>{t('hero.badge')}</span>
                </div>

                <h1 className="serif text-5xl sm:text-6xl md:text-7xl font-normal text-stone-900 leading-[1.08] tracking-tight mb-6">
                  {lang === 'eo' ? (
                    <>
                      Tutmonda <br />
                      Esperanta <br />
                      <span className="italic font-normal text-green-700">Futbala Reto.</span>
                    </>
                  ) : (
                    <>
                      Global <br />
                      Esperanto <br />
                      <span className="italic font-normal text-green-700">Football Network.</span>
                    </>
                  )}
                </h1>

                <p className="text-stone-600 text-base sm:text-lg max-w-lg leading-relaxed mb-8">
                  {t('hero.subtitle')}
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <button
                    onClick={() => setRegisterOpen(true)}
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xs shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span>{t('hero.cta.primary')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <Link
                    href="/direktorio"
                    className="border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>{t('hero.cta.secondary')}</span>
                  </Link>

                  <Link
                    href="/vortaro"
                    className="bg-stone-200/70 hover:bg-stone-300 text-stone-800 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-green-700" />
                    <span>{t('hero.cta.dict')}</span>
                  </Link>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-stone-200 relative z-10">
                <div className="pt-2">
                  <div className="serif text-3xl font-normal text-green-700">06</div>
                  <div className="text-[9px] uppercase font-bold text-stone-400 tracking-widest mt-1">{t('stats.members')}</div>
                </div>
                <div className="pt-2">
                  <div className="serif text-3xl font-normal text-stone-900">06</div>
                  <div className="text-[9px] uppercase font-bold text-stone-400 tracking-widest mt-1">{t('stats.countries')}</div>
                </div>
                <div className="pt-2">
                  <div className="serif text-3xl font-normal text-stone-900">01</div>
                  <div className="text-[9px] uppercase font-bold text-stone-400 tracking-widest mt-1">{t('stats.players')}</div>
                </div>
                <div className="pt-2">
                  <div className="serif text-3xl font-normal text-stone-900">04</div>
                  <div className="text-[9px] uppercase font-bold text-stone-400 tracking-widest mt-1">{t('stats.languages')}</div>
                </div>
              </div>

            </div>

            {/* Right Col: Sidebar Content (Featured Opportunity & Community Teasers) */}
            <div className="lg:col-span-5 flex flex-col bg-stone-100/40">
              
              {/* Opportunity Highlight Section */}
              <div className="p-8 border-b border-stone-200">
                <div className="flex justify-between items-end mb-5">
                  <h2 className="serif text-2xl text-stone-900">Aktualaj Ŝancoj</h2>
                  <Link href="/sancoj" className="text-[10px] font-bold uppercase text-green-700 border-b border-green-700 tracking-wider">
                    Vidi Ĉion
                  </Link>
                </div>

                <div className="bg-white p-6 border border-stone-200 shadow-xs relative rounded-xs">
                  <div className="absolute top-4 right-4 bg-yellow-400 text-stone-900 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
                    NOVA
                  </div>
                  <div className="text-[10px] font-bold text-stone-400 mb-1 tracking-[0.2em]">PARTNERA PROGRAMO</div>
                  <h3 className="font-extrabold text-lg text-stone-900 leading-tight mb-2 uppercase tracking-tight">
                    Sezono ĉe Real Valladolid C
                  </h3>
                  <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                    Unu plena sezono por esperantoparolantaj junuloj kaj ludantoj en Hispanio kun profesia trejnado.
                  </p>
                  <div className="flex gap-2 mb-4">
                    <span className="text-[9px] bg-stone-100 text-stone-800 border border-stone-200 px-2 py-1 font-bold uppercase tracking-wider">
                      Hispanio
                    </span>
                    <span className="text-[9px] bg-stone-100 text-stone-800 border border-stone-200 px-2 py-1 font-bold uppercase tracking-wider">
                      Ludantoj
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedOpp(FEATURED_OPPORTUNITIES[0])}
                    className="w-full border border-stone-900 text-stone-900 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-900 hover:text-white transition-colors cursor-pointer"
                  >
                    Legu Pli
                  </button>
                </div>
              </div>

              {/* Directory Preview */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="serif text-2xl text-stone-900">Plej Recentaj Membroj</h2>
                    <Link href="/direktorio" className="text-[10px] font-bold uppercase text-green-700 hover:underline">
                      Adresaro →
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {members.slice(0, 3).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMember(m)}
                        className="flex items-center gap-3 group cursor-pointer border-b border-stone-200/80 pb-2.5 hover:border-stone-400 transition-colors"
                      >
                        <div className={`w-9 h-9 rounded-full ${m.avatarBg || 'bg-stone-300'} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                          {m.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-xs uppercase tracking-tight text-stone-900 group-hover:text-green-700 transition-colors truncate">
                              {m.name}
                            </span>
                            <span className="text-[10px] text-stone-400 font-bold uppercase ml-2 shrink-0">
                              {m.countryCode}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500 font-medium">
                            {m.roleEo} · {m.languages}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Vocab Teaser */}
                <div className="mt-8 pt-5 border-t-2 border-stone-900">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-900">
                      Lernu la Lingvon
                    </h5>
                    <Link href="/vortaro" className="text-[10px] font-bold text-green-700 hover:underline uppercase">
                      Vortaro
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-stone-700">
                    <div><span className="font-bold">Golo:</span> <span className="italic opacity-60">Goal</span></div>
                    <div><span className="font-bold">Paso:</span> <span className="italic opacity-60">Pass</span></div>
                    <div><span className="font-bold">Turniro:</span> <span className="italic opacity-60">Tournament</span></div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* VALUE PROPOSITIONS SECTION */}
        <section className="py-16 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.25em] border border-green-700/30 px-3 py-1 bg-green-50">
              Kial Aliĝi?
            </span>
            <h2 className="serif text-3xl sm:text-4xl text-stone-900 mt-4 font-normal">
              {t('value.title')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              {t('value.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="editorial-card p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-green-700 text-white flex items-center justify-center mb-6 font-bold text-sm">
                  01
                </div>
                <h3 className="serif text-xl text-stone-900 font-normal mb-2">
                  {t('prop1.title')}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('prop1.desc')}
                </p>
              </div>
              <Link href="/direktorio" className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:underline uppercase tracking-wider mt-6">
                <span>Vidi Adresaron</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="editorial-card p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-stone-900 text-white flex items-center justify-center mb-6 font-bold text-sm">
                  02
                </div>
                <h3 className="serif text-xl text-stone-900 font-normal mb-2">
                  {t('prop2.title')}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('prop2.desc')}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider mt-6">
                <span>Oficiala IKEF Sekcio</span>
                <ShieldCheck className="w-4 h-4 text-green-700" />
              </div>
            </div>

            <div className="editorial-card p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-green-700 text-white flex items-center justify-center mb-6 font-bold text-sm">
                  03
                </div>
                <h3 className="serif text-xl text-stone-900 font-normal mb-2">
                  {t('prop3.title')}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {t('prop3.desc')}
                </p>
              </div>
              <Link href="/eventoj" className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:underline uppercase tracking-wider mt-6">
                <span>Vidi Eventojn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* VOCABULARY HIGHLIGHT SECTION */}
        <section className="py-16 bg-stone-100/60 border-t border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] font-black text-green-700 uppercase tracking-[0.25em]">
                  Faka Vortaro
                </span>
                <h2 className="serif text-3xl sm:text-4xl text-stone-900 font-normal">
                  {t('why.title')}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t('why.desc')}
                </p>

                <div className="pt-2 space-y-2.5">
                  <div className="flex items-center gap-3 p-3 bg-white border border-stone-200">
                    <CheckCircle className="w-4 h-4 text-green-700 shrink-0" />
                    <span className="text-xs font-bold text-stone-800">{t('why.feat1')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white border border-stone-200">
                    <CheckCircle className="w-4 h-4 text-green-700 shrink-0" />
                    <span className="text-xs font-bold text-stone-800">{t('why.feat2')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white border border-stone-200">
                    <CheckCircle className="w-4 h-4 text-green-700 shrink-0" />
                    <span className="text-xs font-bold text-stone-800">{t('why.feat3')}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Audio Vocabulary Cards */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-stone-200">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                  <div>
                    <h3 className="serif text-xl text-stone-900">
                      Futbala Ekzercaro
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Prononcu kaj lernu oficialan esperantan terminologion
                    </p>
                  </div>
                  <Link
                    href="/vortaro"
                    className="text-[10px] font-bold text-green-700 uppercase tracking-widest border-b border-green-700"
                  >
                    Ĉiuj vortoj →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INITIAL_VOCABULARY.slice(0, 6).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-stone-50 border border-stone-200 hover:border-green-300 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-stone-900 block">
                          {item.termEo}
                        </span>
                        <span className="text-[11px] text-stone-500 italic">
                          {item.termEn}
                        </span>
                      </div>
                      <SpeechButton text={item.termEo} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="py-16 bg-stone-900 text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="serif text-4xl sm:text-5xl font-light tracking-tight mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto mb-8 leading-relaxed">
              {t('cta.desc')}
            </p>

            <button
              onClick={() => setRegisterOpen(true)}
              className="bg-green-700 hover:bg-green-600 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] rounded-xs transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>{t('cta.button')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>

      {/* Modals */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />

      <OpportunityModal
        opportunity={selectedOpp}
        onClose={() => setSelectedOpp(null)}
      />

      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <Footer />
    </div>
  );
}
