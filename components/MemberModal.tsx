'use client';

import React, { useState } from 'react';
import { MemberItem } from '@/lib/data';
import { X, Mail, ShieldCheck, Globe, Trophy, Award, Send, CheckCircle2 } from 'lucide-react';

interface MemberModalProps {
  member: MemberItem | null;
  onClose: () => void;
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!member) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Member Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl ${member.avatarBg || 'bg-emerald-700'} text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0`}>
            {member.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900">{member.name}</h3>
              {member.verified && (
                <span title="IKEF Verified Member">
                  <ShieldCheck className="w-5 h-5 text-green-700 fill-green-100" />
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-green-800 flex items-center gap-2 mt-0.5">
              <span>{member.roleEo} ({member.role})</span>
              <span>•</span>
              <span>{member.country} ({member.countryCode})</span>
            </p>
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {member.languages.map((l) => (
                <span
                  key={l}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase"
                >
                  {l}
                </span>
              ))}
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">
                EO: {member.eoLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Klubo / Organizo</span>
            <span className="font-bold text-slate-800">{member.club || 'IKEF Futbalo'}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">Pozicio / Fako</span>
            <span className="font-bold text-slate-800">{member.position || member.role}</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pri la membro / Bio</h4>
          <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
            {member.bio}
          </p>
        </div>

        {/* Send message form */}
        <div className="border-t border-slate-100 pt-5">
          <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-green-700" />
            <span>Sendi Rektan Mesaĝon per IKEF Reto</span>
          </h4>

          {sent ? (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-700" />
              <span>Mesaĝo sukcese sendita al {member.name}!</span>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3">
              <textarea
                rows={3}
                required
                placeholder={`Skribu mesaĝon esperante al ${member.name}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-green-600 outline-none text-xs"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Fermi
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Sendi Mesaĝon</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
