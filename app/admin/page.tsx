'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MemberModal from '@/components/MemberModal';
import RegisterModal from '@/components/RegisterModal';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { MemberItem } from '@/lib/data';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  KeyRound,
  CheckCircle2,
  Clock,
  Search,
  Users,
  Filter,
  RefreshCw,
  LogOut,
  Mail,
  UserCheck,
  UserX,
  Sparkles,
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';

const ADMIN_PASSCODES = ['ikef2026', 'admin123', 'admin', 'ikef-admin'];

export default function AdminPage() {
  const { lang, t } = useLanguage();
  const { members, verifyMemberByAdmin, triggerSampleRegistration, cleanAndResetDb } = useAuth();

  // Security Auth State
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('ikef_admin_unlocked') === 'true';
    }
    return false;
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Filters & State
  const [statusFilter, setStatusFilter] = useState<'pending' | 'verified' | 'all'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');

  // Interactive Modals
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  // Action status notification
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [batchLoading, setBatchLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (ADMIN_PASSCODES.includes(passcode.trim().toLowerCase())) {
      setIsUnlocked(true);
      sessionStorage.setItem('ikef_admin_unlocked', 'true');
      setPasscode('');
    } else {
      setAuthError('Nevalida pasvorto / Invalid password.');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem('ikef_admin_unlocked');
  };

  // Toggle single member verification
  const handleToggleVerification = async (member: MemberItem) => {
    setActionLoading(member.id);
    setActionNotice(null);
    try {
      const newStatus = !member.verified;
      const success = await verifyMemberByAdmin(member.id, newStatus);
      if (success) {
        setActionNotice(
          newStatus
            ? `Profilo por "${member.name}" sukcese verifikita de administranto!`
            : `Verifiko por "${member.name}" nuligita.`
        );
      } else {
        setActionNotice('Eraro dum ĝisdatigo de Firestore verifiko.');
      }
    } catch (err: any) {
      setActionNotice(`Eraro: ${err.message}`);
    } finally {
      setActionLoading(null);
      setTimeout(() => setActionNotice(null), 4000);
    }
  };

  // Verify all pending members in one batch
  const handleVerifyAllPending = async () => {
    const pendingMembers = members.filter((m) => !m.verified);
    if (pendingMembers.length === 0) return;

    if (!confirm(`Ĉu vi certas ke vi volas verifiki ĉiujn ${pendingMembers.length} pendajn profilojn?`)) {
      return;
    }

    setBatchLoading(true);
    setActionNotice(null);
    try {
      let count = 0;
      for (const m of pendingMembers) {
        const ok = await verifyMemberByAdmin(m.id, true);
        if (ok) count++;
      }
      setActionNotice(`Sukcese verifikitaj ${count} pendaj membraj profiloj!`);
    } catch (err: any) {
      setActionNotice(`Eraro dum amasa verifiko: ${err.message}`);
    } finally {
      setBatchLoading(false);
      setTimeout(() => setActionNotice(null), 4500);
    }
  };

  // Derived member lists
  const pendingCount = useMemo(() => members.filter((m) => !m.verified).length, [members]);
  const verifiedCount = useMemo(() => members.filter((m) => m.verified).length, [members]);

  const uniqueCountries = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => {
      if (m.country) set.add(m.country);
    });
    return Array.from(set).sort();
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const queryLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        m.name.toLowerCase().includes(queryLower) ||
        m.country.toLowerCase().includes(queryLower) ||
        m.role.toLowerCase().includes(queryLower) ||
        (m.club && m.club.toLowerCase().includes(queryLower)) ||
        (m.email && m.email.toLowerCase().includes(queryLower));

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'pending' && !m.verified) ||
        (statusFilter === 'verified' && m.verified);

      const matchesRole = roleFilter === 'All' || m.role === roleFilter;
      const matchesCountry = countryFilter === 'All' || m.country === countryFilter;

      return matchesSearch && matchesStatus && matchesRole && matchesCountry;
    });
  }, [members, searchQuery, statusFilter, roleFilter, countryFilter]);

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 flex flex-col font-sans selection:bg-green-100">
      <Navbar onOpenRegister={() => setRegisterModalOpen(true)} />

      {/* Header Banner */}
      <section className="bg-stone-900 text-stone-100 py-10 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/60 border border-green-700/80 text-green-300 text-[10px] font-extrabold uppercase tracking-widest mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span>Sekura Administrejo de IKEF Futbalo</span>
              </div>
              <h1 className="serif text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Verifiko de Membraj Profiloj
              </h1>
              <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
                Administru kaj konfirmu aliĝintajn futbalistojn, trejnistojn kaj organizantojn en la real-tempa Firestore datumbazo.
              </p>
            </div>

            {isUnlocked && (
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleLock}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-stone-400" />
                  <span>Elsaluti el Administrejo</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-10 py-10">
        {!isUnlocked ? (
          /* LOCKED AUTHENTICATION CARD */
          <div className="max-w-md mx-auto my-12 bg-white border border-stone-200 p-8 shadow-xl text-center">
            <div className="w-14 h-14 bg-stone-100 border border-stone-300 text-green-800 mx-auto mb-4 flex items-center justify-center rounded-xs">
              <Lock className="w-7 h-7 text-green-800" />
            </div>

            <h2 className="serif text-2xl font-extrabold text-stone-900 mb-2">
              Administra Aŭtentigo
            </h2>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              Tiu ĉi sekcio estas protektita por administrantoj de IKEF Futbalo por kontroli kaj verifiki profilojn.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">
                  Pasvorto / Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    placeholder="Enigu pasvorton..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs font-mono bg-stone-50"
                  />
                </div>
              </div>

              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Malŝlosi Administrejon</span>
              </button>
            </form>
          </div>
        ) : (
          /* UNLOCKED ADMIN DASHBOARD */
          <div className="space-y-8">
            {/* Action Feedback Notice */}
            {actionNotice && (
              <div className="p-4 bg-green-50 border border-green-300 text-green-900 text-xs font-bold flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
                  <span>{actionNotice}</span>
                </div>
                <button
                  onClick={() => setActionNotice(null)}
                  className="text-stone-500 hover:text-stone-800 text-[10px] font-bold uppercase tracking-widest cursor-pointer"
                >
                  Fermi
                </button>
              </div>
            )}

            {/* Overview Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Stat 1: Pending */}
              <div className={`p-5 border ${pendingCount > 0 ? 'bg-amber-50/80 border-amber-300' : 'bg-white border-stone-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest">
                    Pendantaj Verifikoj
                  </span>
                  <div className={`p-2 rounded-xs ${pendingCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-500'}`}>
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="serif text-3xl font-extrabold text-amber-900">{pendingCount}</span>
                  <span className="text-[11px] text-amber-800 font-bold">
                    {pendingCount === 1 ? 'profilo kontrolenda' : 'profiloj kontrolendaj'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-2">
                  {pendingCount > 0
                    ? 'Ili montras la mesaĝon: "Profile must be verified by admin"'
                    : 'Ĉiuj profiloj estas nuntempe verifikitaj!'}
                </p>
              </div>

              {/* Stat 2: Verified */}
              <div className="p-5 bg-white border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest">
                    Verifikitaj Profiloj
                  </span>
                  <div className="p-2 bg-green-100 text-green-800 rounded-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="serif text-3xl font-extrabold text-green-800">{verifiedCount}</span>
                  <span className="text-[11px] text-stone-600 font-bold">Aŭtentigitaj</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-2">
                  Membroj kun oficiala IKEF verifikita insigno sur la ludejo.
                </p>
              </div>

              {/* Stat 3: Total */}
              <div className="p-5 bg-white border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold text-stone-500 uppercase tracking-widest">
                    Entute Registritaj
                  </span>
                  <div className="p-2 bg-stone-100 text-stone-700 rounded-xs">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="serif text-3xl font-extrabold text-stone-900">{members.length}</span>
                  <span className="text-[11px] text-stone-600 font-bold">Membroj</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-2">
                  Sinkronigitaj en reala tempo kun Firebase Firestore.
                </p>
              </div>
            </div>

            {/* Batch Action Banner if Pending Exist */}
            {pendingCount > 0 && (
              <div className="p-5 bg-amber-50 border border-amber-300 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
                      Atentas Admin-Verifikon ({pendingCount} {pendingCount === 1 ? 'Profilo' : 'Profiloj'})
                    </h3>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Ĉi tiuj novaj aliĝoj devas esti kontrolitaj por ricevi la verdan verifikitikan insignon.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleVerifyAllPending}
                    disabled={batchLoading}
                    className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{batchLoading ? 'Verifikante...' : `Verifiki Ĉiujn ${pendingCount} Pendajn`}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Filter and Search Bar */}
            <div className="p-6 bg-white border border-stone-200 space-y-4">
              
              {/* Status Tab Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div className="flex items-center gap-1 bg-stone-100 p-1 border border-stone-200">
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                      statusFilter === 'pending'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>Pendantaj Kontrolendaj</span>
                    {pendingCount > 0 && (
                      <span className="px-1.5 py-0.2 bg-amber-600 text-white rounded-full text-[10px] font-extrabold">
                        {pendingCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setStatusFilter('verified')}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                      statusFilter === 'verified'
                        ? 'bg-green-700 text-white font-extrabold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verifikitaj ({verifiedCount})</span>
                  </button>

                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                      statusFilter === 'all'
                        ? 'bg-stone-900 text-white font-extrabold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Ĉiuj Profiloj ({members.length})</span>
                  </button>
                </div>

                <div className="text-xs text-stone-500 font-medium">
                  Montrantaj <strong className="text-stone-900">{filteredMembers.length}</strong> el {members.length} membroj
                </div>
              </div>

              {/* Search & Dropdown Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Serĉi laŭ nomo, retpoŝto, lando..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                  />
                </div>

                {/* Role */}
                <div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                  >
                    <option value="All">Ĉiuj Roloj (All Roles)</option>
                    <option value="Player">Ludanto (Player)</option>
                    <option value="Coach">Trejnisto (Coach)</option>
                    <option value="Referee">Arbitraciisto (Referee)</option>
                    <option value="Organizer">Organizanto (Organizer)</option>
                    <option value="Scout">Skolto (Scout)</option>
                  </select>
                </div>

                {/* Country */}
                <div>
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                  >
                    <option value="All">Ĉiuj Landoj (All Countries)</option>
                    {uniqueCountries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Member Profiles List */}
            {filteredMembers.length === 0 ? (
              <div className="p-12 text-center bg-white border border-stone-200">
                <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto mb-3 opacity-60" />
                <h3 className="serif text-xl font-bold text-stone-900 mb-1">
                  Neniu Membro Trovita
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  {statusFilter === 'pending'
                    ? 'Brave! Neniu profilo atendas admin-verifikon kun la elektitaj filtriloj.'
                    : 'Neniu profilo kongruas kun viaj elektitaj serĉ-kriterioj.'}
                </p>
                {(searchQuery || roleFilter !== 'All' || countryFilter !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setRoleFilter('All');
                      setCountryFilter('All');
                    }}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Nuligi Filtrilojn
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`p-6 border transition-all flex flex-col justify-between ${
                      member.verified
                        ? 'bg-white border-stone-200'
                        : 'bg-amber-50/40 border-amber-300/80 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Top Status Header Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-stone-200/80">
                        {member.verified ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 border border-green-300 text-green-800 text-[10px] font-extrabold uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                            <span>Verifikita de Admin</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span>Profile must be verified by admin</span>
                          </div>
                        )}

                        <span className="text-[10px] font-mono text-stone-400">
                          ID: #{member.id}
                        </span>
                      </div>

                      {/* Main Profile Info */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-12 h-12 ${
                            member.avatarBg || 'bg-green-800'
                          } text-white font-black flex items-center justify-center text-lg shrink-0 rounded-xs`}
                        >
                          {member.name.charAt(0)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="serif text-lg font-bold text-stone-900 truncate">
                            {member.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 mt-0.5">
                            <span className="font-bold text-stone-800">{member.country}</span>
                            <span className="text-stone-300">•</span>
                            <span className="font-semibold text-green-800">{member.roleEo || member.role}</span>
                            {member.club && (
                              <>
                                <span className="text-stone-300">•</span>
                                <span className="text-stone-500 truncate">{member.club}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bio snippet */}
                      <p className="text-xs text-stone-600 line-clamp-2 bg-stone-50 p-3 border border-stone-200/60 mb-4 italic">
                        &quot;{member.bio || 'Neniu bio havigita'}&quot;
                      </p>

                      {/* Details row */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 text-stone-600">
                        <div>
                          <span className="text-stone-400 font-bold uppercase tracking-wider text-[9px] block">
                            Esperanto Nivelo
                          </span>
                          <span className="font-bold text-stone-800">{member.eoLevel || 'Progresanto'}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 font-bold uppercase tracking-wider text-[9px] block">
                            Lingvoj
                          </span>
                          <span className="font-bold text-stone-800 uppercase">
                            {member.languages?.join(', ') || 'EO'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls Bar */}
                    <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="px-3 py-1.5 border border-stone-300 text-stone-700 hover:bg-stone-100 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-500" />
                        <span>Detaloj</span>
                      </button>

                      <button
                        onClick={() => handleToggleVerification(member)}
                        disabled={actionLoading === member.id}
                        className={`px-4 py-1.5 font-bold text-xs uppercase tracking-wider text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50 ${
                          member.verified
                            ? 'bg-stone-700 hover:bg-stone-800'
                            : 'bg-green-700 hover:bg-green-800'
                        }`}
                      >
                        {actionLoading === member.id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : member.verified ? (
                          <>
                            <UserX className="w-3.5 h-3.5" />
                            <span>Demeti Verifikon</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Verifiki Profilon (Admin)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Member Detail Modal */}
      {selectedMember && (
        <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      {/* Register Modal */}
      {registerModalOpen && (
        <RegisterModal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)} />
      )}
    </div>
  );
}
