'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { UserCheck, ShieldCheck, Sparkles, UserPlus, ArrowRight, Lock, AlertCircle } from 'lucide-react';

export default function JoinPage() {
  const { t } = useLanguage();
  const { registerMember, signUp } = useAuth();
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
  const [password, setPassword] = useState('');

  // Anti-spam security controls
  const [botField, setBotField] = useState(''); // Honeypot field
  const [securityAnswer, setSecurityAnswer] = useState(''); // Math challenge: 4 + 3 = 7

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Anti-spam honeypot check
    if (botField.trim() !== '') {
      setErrorMsg('Spam-sistemo detektis robotojn. Aliĝo malpermesita.');
      return;
    }

    // 2. Security challenge check
    if (securityAnswer.trim() !== '7') {
      setErrorMsg('Nevalida sekureca respondo! Bonvolu kalkuli: 4 + 3 = 7.');
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
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Via profilo estas sukcese kreiĝinta kaj konservita en la oficiala Firestore datumbazo!
                </p>
                <div className="p-3.5 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold max-w-md mx-auto space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Pendanta Administranta Konfirmo</span>
                  </div>
                  <p className="text-[11px] font-medium text-amber-800">
                    Profile must be verified by admin for official badge verification.
                  </p>
                </div>
                <div className="pt-4">
                  <a
                    href="/direktorio"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider transition-all"
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
                    Formu parton de la internacia Esperantista futbal-komunumo kaj konservu vian profilon en reala tempo.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* HONEYPOT FIELD FOR BOT PROTECTION */}
                <div className="hidden" aria-hidden="true">
                  <label>Ne plenigu ĉi tiun kampon:</label>
                  <input
                    type="text"
                    tabIndex={-1}
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    autoComplete="off"
                  />
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
                      Pasvorto (por Ensalutado)
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                {/* SECURITY CHALLENGE FOR BOT & SPAM DUMPING PROTECTION */}
                <div className="p-4 bg-stone-100 border border-stone-300 space-y-2">
                  <div className="flex items-center gap-1.5 text-stone-900 text-xs font-bold uppercase tracking-wider">
                    <Lock className="w-4 h-4 text-green-700" />
                    <span>Sekureca Kontrolo / Anti-Spam Protection</span>
                  </div>
                  <p className="text-xs text-stone-600">
                    Por protekti la datumbazon kontraŭ senutila spamo kaj robotoj, kiom estas <strong>4 + 3</strong>?
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="Entajpu la sekurecan ciferon (ekz. 7)"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="w-full px-4 py-2 border border-stone-300 focus:border-green-700 outline-none text-xs bg-white font-bold"
                  />
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-green-700 hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isSubmitting ? 'Konservas...' : 'Konservi en Firestore'}</span>
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
      />

      <Footer />
    </div>
  );
}
