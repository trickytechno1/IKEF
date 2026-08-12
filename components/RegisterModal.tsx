'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MemberItem } from '@/lib/data';
import { X, UserCheck, ShieldCheck, Sparkles, Flag, Globe } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: MemberItem) => void;
}

export default function RegisterModal({ isOpen, onClose, onAddMember }: RegisterModalProps) {
  const { t } = useLanguage();

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !country) return;

    const roleEoMap: Record<string, string> = {
      Player: 'Ludanto',
      Coach: 'Trejnisto',
      Referee: 'Arbitraciisto',
      Organizer: 'Organizanto',
      Researcher: 'Esploristo',
      Scout: 'Skolto',
      Fan: 'Amatoro'
    };

    const newMember: MemberItem = {
      id: Date.now(),
      name,
      country,
      countryCode: countryCode || 'UN',
      role,
      roleEo: roleEoMap[role] || role,
      languages: languages.split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
      eoLevel,
      position: position || (role === 'Player' ? 'Golejo / Mezkampo' : role),
      club: club || 'IKEF Futbalo Member',
      bio: bio || 'Antaŭenigante futbalon kaj Esperanton en nia komunumo!',
      email: email || 'membro@ikef.org',
      verified: true,
      avatarBg: 'bg-emerald-700'
    };

    onAddMember(newMember);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-green-800 mx-auto flex items-center justify-center">
              <UserCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Gratulon, {name}!
            </h3>
            <p className="text-sm text-slate-600">
              Via profilo sukcese kreiĝis kaj estas videbla en la membara adresaro de IKEF Futbalo!
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-800 text-xs font-bold border border-green-200">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              Kontrolita Membro de IKEF
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Aliĝo al IKEF Futbalo</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                {t('hero.cta.primary')}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Eniru la oficialan reton de Esperantistaj futbalistoj, trejnistoj kaj amatoroj.
              </p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomo & Antaŭnomo / Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="ekz. Marc Valls"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none text-sm"
              />
            </div>

            {/* Country & Code */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lando / Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ekz. Hispanio, USA, Brazilo"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kodo (ISO 2)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="ES, US, FR, BR"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none text-sm uppercase"
                />
              </div>
            </div>

            {/* Role & Esperanto Level */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rolo / Primary Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-white"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Esperanto-Nivelo *
                </label>
                <select
                  value={eoLevel}
                  onChange={(e) => setEoLevel(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none text-sm bg-white"
                >
                  <option value="Komencanto">Komencanto (A1-A2)</option>
                  <option value="Progresanto">Progresanto (B1-B2)</option>
                  <option value="Spertulo">Spertulo (C1)</option>
                  <option value="Aglina / Denaska">Aglina / Denaska (C2)</option>
                </select>
              </div>
            </div>

            {/* Position / Club */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pozicio (se ludanto)
                </label>
                <input
                  type="text"
                  placeholder="ekz. Striker, Midfielder"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Klubo / Organizo
                </label>
                <input
                  type="text"
                  placeholder="ekz. Loka teamo aŭ IKEF"
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-sm"
                />
              </div>
            </div>

            {/* Languages & Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lingvoj (komo-separitaj)
                </label>
                <input
                  type="text"
                  placeholder="eo, en, es, fr"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-sm"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-sm"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mallonga Priskribo / Bio
              </label>
              <textarea
                rows={2}
                placeholder="Rakontu ion pri via futbala sperto kaj intereso pri Esperanto..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-green-600 outline-none text-sm"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Nuligi
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-green-700 hover:bg-green-800 text-white text-xs font-bold shadow-md shadow-green-800/20 transition-all cursor-pointer"
              >
                Konservi & Aliĝi
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
