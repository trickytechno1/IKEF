'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Database, RefreshCw, Sparkles, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DatabaseControlBar() {
  const { members, triggerSampleRegistration, cleanAndResetDb } = useAuth();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const pendingCount = members.filter((m) => !m.verified).length;

  const handleSampleRegistration = async () => {
    setLoading(true);
    setNotification(null);
    try {
      const res = await triggerSampleRegistration();
      if (res.success) {
        setNotification(`Sukcesa aliĝo! ${res.name} aldonita al Firestore realtempe.`);
      }
    } catch (err: any) {
      setNotification(`Eraro: ${err.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleCleanDb = async () => {
    if (!confirm('Ĉu vi certas ke vi volas purigi kaj re-komencigi la datumbazon kun puraj real-tempaj datumoj?')) return;
    setLoading(true);
    setNotification(null);
    try {
      const ok = await cleanAndResetDb();
      if (ok) {
        setNotification('Datumbazo sukcese purigita kaj restarigita kun puraj komencaj rekordoj!');
      } else {
        setNotification('Ne eblis purigi la datumbazon.');
      }
    } catch (err: any) {
      setNotification(`Eraro: ${err.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="bg-stone-900 text-stone-200 border-b border-stone-800 text-xs py-2 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-400 uppercase tracking-widest text-[10px]">
            Firebase Firestore Reala Tempo
          </span>
          <span className="text-stone-500 hidden md:inline">|</span>
          <span className="text-stone-400 text-[11px] hidden md:inline">
            Aktivaj Membroj: <strong className="text-stone-100">{members.length}</strong>
          </span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/admin"
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold text-[10px] uppercase tracking-wider rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
            title="Iri al Administrejo de Membraj Profiloj"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-stone-950" />
            <span>Admin Portal</span>
            {pendingCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-stone-950 text-amber-400 rounded-full text-[9px] font-black">
                {pendingCount}
              </span>
            )}
          </Link>

          <button
            onClick={handleSampleRegistration}
            disabled={loading}
            className="px-2.5 py-1 bg-green-700 hover:bg-green-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-xs flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
            title="Krei provan uzanto-aliĝon por testado"
          >
            <Sparkles className="w-3 h-3" />
            <span>+ Krei Ekzemplan Aliĝon</span>
          </button>

          <button
            onClick={handleCleanDb}
            disabled={loading}
            className="px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-bold text-[10px] uppercase tracking-wider border border-stone-700 rounded-xs flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
            title="Purigi test-rekordojn kaj restartigi datumbazon"
          >
            <Trash2 className="w-3 h-3 text-red-400" />
            <span>Purigi Datumbazon</span>
          </button>
        </div>

      </div>

      {notification && (
        <div className="max-w-7xl mx-auto mt-1.5 p-2 bg-green-950/80 border border-green-800 text-green-200 text-[11px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}
