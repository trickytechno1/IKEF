'use client';

import React, { useState } from 'react';
import { MemberItem } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { X, Mail, ShieldCheck, Clock, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

interface MemberModalProps {
  member: MemberItem | null;
  onClose: () => void;
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  const { verifyMemberByAdmin } = useAuth();
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

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

  const handleAdminVerifyToggle = async () => {
    setIsVerifying(true);
    setAdminNotice(null);
    try {
      const newStatus = !member.verified;
      const ok = await verifyMemberByAdmin(member.id, newStatus);
      if (ok) {
        setAdminNotice(newStatus ? 'Profilo sukcese verifikita de administranto!' : 'Verifiko de profilo nuligita de administranto.');
      } else {
        setAdminNotice('Eraro dum ĝisdatigo de verifiko.');
      }
    } catch (err: any) {
      setAdminNotice(`Eraro: ${err.message}`);
    } finally {
      setIsVerifying(false);
      setTimeout(() => setAdminNotice(null), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Status Badge */}
        <div className="mb-4">
          {member.verified ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-300 text-green-800 text-[11px] font-bold">
              <ShieldCheck className="w-4 h-4 text-green-700" />
              <span>Verifikita de Administranto (Admin Verified)</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-bold">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Profilo devas esti kontrolita de administranto (Awaiting Admin Verification)</span>
            </div>
          )}
        </div>

        {/* Member Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`w-16 h-16 ${member.avatarBg || 'bg-green-800'} text-white flex items-center justify-center text-2xl font-black shrink-0`}>
            {member.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="serif text-2xl font-bold text-stone-900">{member.name}</h3>
              {member.verified && (
                <span title="IKEF Verifikita Membro de Administranto">
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
                  className="px-2 py-0.5 text-[10px] font-bold bg-stone-100 text-stone-700 uppercase border border-stone-200"
                >
                  {l}
                </span>
              ))}
              <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-800 border border-green-200">
                EO: {member.eoLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 bg-stone-50 border border-stone-200 text-xs">
          <div>
            <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px] block">Klubo / Organizo</span>
            <span className="font-bold text-stone-900">{member.club || 'IKEF Futbalo'}</span>
          </div>
          <div>
            <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px] block">Pozicio / Fako</span>
            <span className="font-bold text-stone-900">{member.position || member.role}</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Pri la membro / Bio</h4>
          <p className="text-xs text-stone-800 leading-relaxed bg-white p-3 border border-stone-200">
            {member.bio}
          </p>
        </div>

        {/* Admin Quick Action Button */}
        <div className="mb-6 p-3 bg-stone-100 border border-stone-300 text-xs flex items-center justify-between gap-3">
          <div>
            <span className="font-bold text-stone-900 text-[11px] block">Administranta Kontrolo</span>
            <span className="text-[10px] text-stone-600 block">
              {member.verified ? 'Profilo estas verifikita' : 'Profilo devas esti kontrolita de administranto'}
            </span>
          </div>
          <button
            onClick={handleAdminVerifyToggle}
            disabled={isVerifying}
            className={`px-3 py-1.5 font-bold text-[10px] uppercase tracking-wider text-white transition-colors cursor-pointer shrink-0 ${
              member.verified ? 'bg-stone-700 hover:bg-stone-800' : 'bg-green-700 hover:bg-green-800'
            }`}
          >
            {isVerifying ? 'Ĝisdatigante...' : member.verified ? 'Demeti Verifikon' : 'Verifiki Profilon (Admin)'}
          </button>
        </div>

        {adminNotice && (
          <div className="mb-6 p-2.5 bg-green-50 border border-green-300 text-green-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
            <span>{adminNotice}</span>
          </div>
        )}

        {/* Send message form */}
        <div className="border-t border-stone-200 pt-5">
          <h4 className="text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-green-700" />
            <span>Sendi Rektan Mesaĝon per IKEF Reto</span>
          </h4>

          {sent ? (
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
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
                className="w-full px-3.5 py-2.5 border border-stone-300 focus:border-green-700 outline-none text-xs"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100"
                >
                  Fermi
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
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

