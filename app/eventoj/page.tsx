'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { EventItem } from '@/lib/data';
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  Share2,
  Clock,
  Sparkles,
  Trophy,
  Video
} from 'lucide-react';

export default function EventsPage() {
  const { lang, t } = useLanguage();
  const { events: realTimeEvents } = useAuth();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<number[]>([]);

  const handleToggleAttendance = (id: number) => {
    setJoinedEvents((prev) => {
      const isJoined = prev.includes(id);
      if (isJoined) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const events = realTimeEvents;


  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 flex flex-col font-sans selection:bg-green-100">
      <Navbar onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1">
        
        {/* Banner */}
        <section className="bg-[#fcfaf7] text-stone-900 py-10 md:py-14 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-300 text-green-700 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Kongresoj & Matĉoj</span>
            </div>
            <h1 className="serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight">
              {t('ev.page.title')}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
              {t('ev.page.subtitle')}
            </p>
          </div>
        </section>

        {/* Events Schedule Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="space-y-6">
            {events.map((ev) => {
              const isJoined = joinedEvents.includes(ev.id);
              const title = lang === 'eo' ? ev.titleEo : ev.titleEn;
              const desc = lang === 'eo' ? ev.descriptionEo : ev.descriptionEn;

              return (
                <div
                  key={ev.id}
                  className="editorial-card p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-extrabold border border-green-200">
                        {ev.type}
                      </span>
                      <span className="flex items-center gap-1 text-stone-600 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {ev.date}
                      </span>
                      <span className="flex items-center gap-1 text-stone-600 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {ev.location}
                      </span>
                    </div>

                    <h2 className="serif text-2xl sm:text-3xl font-normal text-stone-900">
                      {title}
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                      {desc}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-stone-500 font-bold uppercase tracking-wider pt-2">
                      <Users className="w-4 h-4 text-green-700" />
                      <span>{ev.attendeesCount} Partoprenantoj anoncitaj</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                    <button
                      onClick={() => handleToggleAttendance(ev.id)}
                      className={`px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                        isJoined
                          ? 'bg-green-50 text-green-800 border-green-300'
                          : 'bg-green-700 hover:bg-green-800 text-white border-green-700'
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 ${isJoined ? 'text-green-700' : 'text-white'}`} />
                      <span>{isJoined ? 'Vi Partoprenos ★' : 'Anonci Partoprenon'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

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
