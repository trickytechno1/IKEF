'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { MemberItem } from '@/lib/data';
import { X, UserCheck, ShieldCheck, Sparkles, Lock, Mail, AlertCircle, RefreshCw } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember?: (member: MemberItem) => void;
}

export default function RegisterModal({ isOpen, onClose, onAddMember }: RegisterModalProps) {
  const { t } = useLanguage();
  const { registerMember, signUp } = useAuth();

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
  const [password, setPassword] = useState('');
  
  // Anti-spam security controls
  const [botField, setBotField] = useState(''); // Honeypot field
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [mathNum1, setMathNum1] = useState(() => Math.floor(Math.random() * 8) + 3);
  const [mathNum2, setMathNum2] = useState(() => Math.floor(Math.random() * 7) + 2);
  const [formOpenedAt] = useState<number>(() => Date.now());
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 3;
    const n2 = Math.floor(Math.random() * 7) + 2;
    setMathNum1(n1);
    setMathNum2(n2);
    setSecurityAnswer('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Anti-spam honeypot check (hidden input must remain empty)
    if (botField.trim() !== '') {
      setErrorMsg('Spam-sistemo detektis aŭtomatan robotojn (Honeypot Trigger). Aliĝo malpermesita.');
      return;
    }

    // 2. Dynamic math challenge check
    const expectedSum = (mathNum1 + mathNum2).toString();
    if (securityAnswer.trim() !== expectedSum) {
      setErrorMsg(`Nevalida sekureca respondo! Bonvolu kalkuli: ${mathNum1} + ${mathNum2} = ?`);
      return;
    }

    // 3. Time-trap check (reject instant automated form submission under 2 seconds)
    if (Date.now() - formOpenedAt < 2000) {
      setErrorMsg('Aŭtomata roboto detektita (tro rapida aliĝo). Bonvolu provi denove.');
      return;
    }

    // 4. Content link and spam keyword filter
    const linkRegex = /(https?:\/\/|www\.|\[url=|ftp:\/\/)/i;
    const spamKeywordsRegex = /(casino|poker|viagra|crypto|telegram\.me|wa\.me|sex|porn|loan|escort|payday|buy-online)/i;

    if (linkRegex.test(name) || linkRegex.test(bio) || linkRegex.test(club)) {
      setErrorMsg('Sekureca filtrilo: Ligiloj (URLs) ne estas permesitaj en profilo por malhelpi spamon.');
      return;
    }

    if (spamKeywordsRegex.test(name) || spamKeywordsRegex.test(bio) || spamKeywordsRegex.test(club)) {
      setErrorMsg('Sekureca filtrilo: Suspektinda enhavo aŭ spam-ŝlosilvortoj detektitaj.');
      return;
    }

    if (!name || !country || !email) {
      setErrorMsg('Bonvolu plenigi ĉiujn devigaĵojn.');
      return;
    }

    if (password && password.length < 6) {
      setErrorMsg('La pasvorto devas esti almenaŭ 6-simbola (almenaŭ 6 karakteroj).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Optional Firebase Auth sign up if password provided
      if (password) {
        const authRes = await signUp(email, password);
        if (!authRes.success) {
          setErrorMsg(authRes.message);
          setIsSubmitting(false);
          return;
        }
      }

      const roleEoMap: Record<string, string> = {
        Player: 'Ludanto',
        Coach: 'Trejnisto',
        Referee: 'Arbitraciisto',
        Organizer: 'Organizanto',
        Researcher: 'Esploristo',
        Scout: 'Skolto',
        Fan: 'Amatoro'
      };

      // Real-time Firestore registration
      const result = await registerMember({
        name,
        email,
        country,
        countryCode: countryCode || 'ES',
        role,
        roleEo: roleEoMap[role] || role,
        languages: languages.split(',').map(s => s.trim().toLowerCase()).filter(Boolean),
        eoLevel,
        position: position || (role === 'Player' ? 'Pilkisto' : role),
        club: club || 'IKEF Futbalo Member',
        bio: bio || 'Antaŭenigante futbalon kaj Esperanton en nia komunumo!',
        botField,
        securityChallengeAnswer: securityAnswer
      });

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2200);
      } else {
        setErrorMsg(result.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Eraro dum registrado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 border border-green-300 text-green-800 mx-auto flex items-center justify-center">
              <UserCheck className="w-8 h-8" />
            </div>
            <h3 className="serif text-2xl font-normal text-stone-900">
              Gratulon, {name}!
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
              Via profilo estas sukcese kreiĝinta kaj registrita en la real-tempa Firestore datumbazo!
            </p>
            <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Pendanta Admin-Konfirmo</span>
              </div>
              <p className="text-[11px] font-medium text-amber-800">
                (Profile must be verified by admin for full official verification badge)
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-green-700 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Oficiala Membara Aliĝo & Firestore</span>
              </div>
              <h2 className="serif text-2xl sm:text-3xl font-normal text-stone-900">
                {t('hero.cta.primary')}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Eniru la oficialan reton de Esperantistaj futbalistoj. Sekurigita per kontraŭ-spama filtrilo.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* HONEYPOT FIELD FOR BOT PROTECTION (HIDDEN FROM HUMANS) */}
            <div className="hidden" aria-hidden="true">
              <label>Ne plenigu ĉi tiun kampon / Leave empty:</label>
              <input
                type="text"
                tabIndex={-1}
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Name */}
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
                className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
              />
            </div>

            {/* Country & Code */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                  Lando *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ekz. Hispanio, USA"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                  ISO-Kodo (2 literoj)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="ES, US, FR"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs uppercase bg-[#fcfaf7]"
                />
              </div>
            </div>

            {/* Role & Esperanto Level */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                  Rolo *
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                >
                  <option value="Player">Ludanto (Player)</option>
                  <option value="Coach">Trejnisto (Coach)</option>
                  <option value="Referee">Arbitraciisto (Referee)</option>
                  <option value="Organizer">Organizanto (Organizer)</option>
                  <option value="Researcher">Esploristo (Researcher)</option>
                  <option value="Scout">Skolto (Scout)</option>
                  <option value="Fan">Amatoro (Fan)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                  EO-Nivelo *
                </label>
                <select
                  value={eoLevel}
                  onChange={(e) => setEoLevel(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                >
                  <option value="Komencanto">Komencanto (A1-A2)</option>
                  <option value="Progresanto">Progresanto (B1-B2)</option>
                  <option value="Spertulo">Spertulo (C1)</option>
                  <option value="Aglina / Denaska">Aglina / Denaska (C2)</option>
                </select>
              </div>
            </div>

            {/* Email & Optional Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                  Retpoŝto *
                </label>
                <input
                  type="email"
                  required
                  placeholder="vi@ekzemplo.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                  Pasvorto (laŭvola por Konto)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">
                Priskribo
              </label>
              <textarea
                rows={2}
                placeholder="Rakontu ion pri via futbala sperto kaj intereso pri Esperanto..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-[#fcfaf7]"
              />
            </div>

            {/* SECURITY CHALLENGE TO PREVENT SPAM & ROBOTS */}
            <div className="p-3 bg-stone-100 border border-stone-300 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-stone-800 text-[11px] font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5 text-green-700" />
                  <span>Sekureca Kontrolo / Anti-Robot Filter</span>
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-[10px] text-green-800 hover:text-green-950 flex items-center gap-1 underline font-medium"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Nova demando</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-700">
                Por sekurigi la datumbazon kontraŭ robotoj, bonvolu kalkuli: <strong className="text-stone-900 text-xs px-1.5 py-0.5 bg-stone-200 border border-stone-300">{mathNum1} + {mathNum2} = ?</strong>
              </p>
              <input
                type="text"
                required
                placeholder="Entajpu la rezulton (ekz. ciferon)..."
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-300 focus:border-green-700 outline-none text-xs bg-white font-bold"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 text-xs font-bold uppercase tracking-wider text-stone-700 hover:bg-stone-100 transition-colors"
              >
                Nuligi
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Konservas...' : 'Konservi en Firestore'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
