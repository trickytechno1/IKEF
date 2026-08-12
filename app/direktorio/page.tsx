'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import MemberModal from '@/components/MemberModal';
import { useLanguage } from '@/context/LanguageContext';
import { INITIAL_MEMBERS, MemberItem } from '@/lib/data';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  ShieldCheck,
  Mail,
  Globe2,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export default function DirectoryPage() {
  const { lang, t } = useLanguage();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);
  const [membersList, setMembersList] = useState<MemberItem[]>(INITIAL_MEMBERS);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');

  // Extract unique countries & languages
  const availableCountries = useMemo(() => {
    const list = Array.from(new Set(membersList.map((m) => m.country)));
    return ['All', ...list.sort()];
  }, [membersList]);

  const availableRoles = [
    'All',
    'Player',
    'Coach',
    'Referee',
    'Organizer',
    'Researcher',
    'Scout',
    'Fan'
  ];

  const availableLanguages = ['All', 'eo', 'en', 'es', 'fr', 'de', 'pl', 'ja', 'zh', 'ru'];

  const filteredMembers = useMemo(() => {
    return membersList.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        m.bio.toLowerCase().includes(q) ||
        (m.position && m.position.toLowerCase().includes(q));

      const matchesRole = roleFilter === 'All' || m.role === roleFilter;
      const matchesCountry = countryFilter === 'All' || m.country === countryFilter;
      const matchesLang =
        languageFilter === 'All' || m.languages.includes(languageFilter.toLowerCase());

      return matchesSearch && matchesRole && matchesCountry && matchesLang;
    });
  }, [membersList, searchQuery, roleFilter, countryFilter, languageFilter]);

  const handleAddMember = (newMember: MemberItem) => {
    setMembersList((prev) => [newMember, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 flex flex-col font-sans selection:bg-green-100">
      <Navbar onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1">
        
        {/* Banner */}
        <section className="bg-[#fcfaf7] text-stone-900 py-10 md:py-14 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-300 text-green-700 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
                  <Users className="w-3.5 h-3.5" />
                  <span>Komunuma Adresaro</span>
                </div>
                <h1 className="serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight">
                  {t('dir.title')}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
                  {t('dir.subtitle')}
                </p>
              </div>

              <button
                onClick={() => setRegisterOpen(true)}
                className="px-5 py-3 bg-green-700 hover:bg-green-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t('dir.addMe')}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Filters and Search Bar */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <div className="bg-white p-6 border border-stone-200 mb-8 space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('dir.search')}
                className="w-full pl-11 pr-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs font-medium bg-[#fcfaf7]"
              />
            </div>

            {/* Filter Selects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              {/* Role Filter */}
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                  Rolo / Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7] font-semibold text-stone-800"
                >
                  {availableRoles.map((r) => (
                    <option key={r} value={r}>
                      {r === 'All' ? t('dir.filter.role') : r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                  Lando / Country
                </label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7] font-semibold text-stone-800"
                >
                  {availableCountries.map((c) => (
                    <option key={c} value={c}>
                      {c === 'All' ? t('dir.filter.country') : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                  Lingvo / Language
                </label>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7] font-semibold text-stone-800 uppercase"
                >
                  {availableLanguages.map((l) => (
                    <option key={l} value={l}>
                      {l === 'All' ? t('dir.filter.lang') : l.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Counter */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 font-bold">
              <span>Membroj trovitaj: <strong className="text-stone-900">{filteredMembers.length}</strong></span>
              {(roleFilter !== 'All' || countryFilter !== 'All' || languageFilter !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setRoleFilter('All');
                    setCountryFilter('All');
                    setLanguageFilter('All');
                  }}
                  className="text-green-700 hover:underline flex items-center gap-1 cursor-pointer text-xs font-bold uppercase tracking-wider"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Nuligi filtrilojn</span>
                </button>
              )}
            </div>

          </div>

          {/* MEMBER CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="editorial-card p-6 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Card Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-stone-900 text-stone-50 border border-stone-800 flex items-center justify-center serif text-xl font-normal shrink-0`}>
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="serif text-xl font-normal text-stone-900 group-hover:text-green-700 transition-colors">
                            {member.name}
                          </h3>
                          {member.verified && (
                            <span title="IKEF Verified Member">
                              <ShieldCheck className="w-4 h-4 text-green-700 fill-green-100 shrink-0" />
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mt-0.5">
                          {member.country} ({member.countryCode})
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role & Position */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-extrabold uppercase tracking-wider border border-green-200">
                      {member.roleEo} ({member.role})
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200 uppercase tracking-wider">
                      EO: {member.eoLevel}
                    </span>
                  </div>

                  {/* Languages spoken */}
                  <div className="flex items-center gap-1 mb-4 text-xs">
                    <span className="text-stone-400 font-bold text-[10px] uppercase tracking-wider mr-1">Lingvoj:</span>
                    {member.languages.map((l) => (
                      <span
                        key={l}
                        className="px-1.5 py-0.5 text-[10px] font-extrabold bg-stone-100 text-stone-800 uppercase tracking-wider border border-stone-200"
                      >
                        {l}
                      </span>
                    ))}
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed bg-stone-50 p-3 border border-stone-200">
                    {member.bio}
                  </p>
                </div>

                {/* Actions bottom */}
                <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider truncate max-w-[140px]">
                    {member.club || 'IKEF Futbalo'}
                  </span>

                  <button
                    onClick={() => setSelectedMember(member)}
                    className="px-3.5 py-2 bg-green-700 hover:bg-green-800 text-white text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>{t('dir.viewProfile')}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-16 bg-white border border-stone-200 my-6 space-y-3">
              <Users className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="serif text-xl text-stone-900">Neniu membro trovita</h3>
              <p className="text-xs text-stone-500">
                Ne ekzistas membroj kongruaj kun ĉi tiuj filtriloj.
              </p>
              <button
                onClick={() => setRegisterOpen(true)}
                className="mt-2 px-5 py-2.5 bg-green-700 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Estu la unua kaj aldonu vian profilon!</span>
              </button>
            </div>
          )}

        </section>

      </main>

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onAddMember={handleAddMember}
      />

      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <Footer />
    </div>
  );
}
