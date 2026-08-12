'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import { useLanguage } from '@/context/LanguageContext';
import { MemberItem } from '@/lib/data';
import { UserCheck, ShieldCheck, Sparkles, UserPlus, ArrowRight } from 'lucide-react';

export default function JoinPage() {
  const { t } = useLanguage();
  const [registerOpen, setRegisterOpen] = useState(false);

  const [name, setName] = useState('');
  const [country, setCountry] = useState('Spain');
  const [countryCode, setCountryCode] = useState('ES');
  const [role, setRole] = useState<'Player' | 'Coach' | 'Referee' | 'Organizer' | 'Researcher' | 'Scout' | 'Fan'>('Player');
  const [eoLevel, setEoLevel] = useState<'Komencanto' | 'Progresanto' | 'Spertulo' | 'Aglina / Denaska'>('Progresanto');
  const [position, setPosition] = useState('');
  const [club, setClub] = useState('');
  const [languages, setLanguages] = useState('eo, en');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !country) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 flex flex-col font-sans selection:bg-green-100">
      <Navbar onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          
          <div className="bg-white p-8 sm:p-12 border border-stone-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 border border-green-300 text-green-800 mx-auto flex items-center justify-center">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h2 className="serif text-3xl font-normal text-stone-900">
                  Gratulon, {name}!
                </h2>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Via profilo sukcese kreiĝis en la oficiala adresaro de IKEF Futbalo!
                </p>
                <div className="pt-4">
                  <a
                    href="/direktorio"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    <span>Vidi Adresaron Nun</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-green-700 font-bold text-[10px] uppercase tracking-[0.25em] mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Oficiala Membara Aliĝo</span>
                  </div>
                  <h1 className="serif text-3xl sm:text-4xl font-normal text-stone-900">
                    Kreu Vian Profilon
                  </h1>
                  <p className="text-xs text-stone-500 mt-1">
                    Formu parton de la internacia Esperantista futbal-komunumo kaj malkovru novajn ŝancojn.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                      Nomo & Antaŭnomo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ekz. Marc Valls"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                      Lando & Kodo *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Hispanio"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="col-span-2 px-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                      />
                      <input
                        type="text"
                        maxLength={2}
                        placeholder="ES"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                        className="px-3 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs uppercase text-center font-bold bg-[#fcfaf7]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                      Rolo / Primary Role *
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7] font-medium"
                    >
                      <option value="Player">Ludanto (Player)</option>
                      <option value="Coach">Trejnisto (Coach)</option>
                      <option value="Referee">Arbitraciisto (Referee)</option>
                      <option value="Organizer">Organizanto (Organizer)</option>
                      <option value="Researcher">Esploristo (Researcher)</option>
                      <option value="Scout">Skolto (Scout)</option>
                      <option value="Fan">Amatoro / Ŝatanto (Fan)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                      Esperanto-Nivelo *
                    </label>
                    <select
                      value={eoLevel}
                      onChange={(e) => setEoLevel(e.target.value as any)}
                      className="w-full px-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7] font-medium"
                    >
                      <option value="Komencanto">Komencanto (A1-A2)</option>
                      <option value="Progresanto">Progresanto (B1-B2)</option>
                      <option value="Spertulo">Spertulo (C1)</option>
                      <option value="Aglina / Denaska">Aglina / Denaska (C2)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                      Retpoŝto / Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vi@ekzemplo.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                      Lingvoj (komo-separitaj)
                    </label>
                    <input
                      type="text"
                      placeholder="eo, en, es, fr"
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                    Priskribo & Futbala Fono / Bio
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Priskribu vian sperton pri futbalo kaj vian pasion por Esperanto..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                  />
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-green-700 hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Konservi kaj Aliĝi</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onAddMember={() => {}}
      />

      <Footer />
    </div>
  );
}
