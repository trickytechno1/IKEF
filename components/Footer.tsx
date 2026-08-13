'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, ExternalLink, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-stone-700 py-12 border-t border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-stone-200">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-700 rounded-sm flex items-center justify-center text-white font-extrabold text-xs">
                IK
              </div>
              <div>
                <span className="text-lg font-bold tracking-tighter uppercase text-stone-900">
                  IKEF <span className="text-green-700">Futbalo</span>
                </span>
                <span className="block text-[10px] font-medium text-stone-400 uppercase tracking-wider">
                  {t('nav.subtitle')} • futbalo.ikef.org
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 max-w-md leading-relaxed">
              {t('footer.motto')}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-600 pt-2">
              <a 
                href="https://ikef.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-green-700 transition-colors uppercase tracking-wider text-[10px]"
              >
                <Globe className="w-3.5 h-3.5 text-green-700" />
                {t('footer.mainSite')} (ikef.org)
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a 
                href="mailto:esperantofk@gmail.com" 
                className="inline-flex items-center gap-1.5 hover:text-green-700 transition-colors uppercase tracking-wider text-[10px]"
              >
                <Mail className="w-3.5 h-3.5 text-green-700" />
                esperantofk@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-extrabold text-stone-900 uppercase tracking-[0.2em] mb-4">
              {t('footer.quicklinks')}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-green-700 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/vortaro" className="hover:text-green-700 transition-colors">
                  {t('nav.vocabulary')} (Esperanta Vortaro)
                </Link>
              </li>
              <li>
                <Link href="/direktorio" className="hover:text-green-700 transition-colors">
                  {t('nav.directory')} (Membara Adresaro)
                </Link>
              </li>
              <li>
                <Link href="/sancoj" className="hover:text-green-700 transition-colors">
                  {t('nav.opportunities')} (Real Valladolid C)
                </Link>
              </li>
              <li>
                <Link href="/eventoj" className="hover:text-green-700 transition-colors">
                  {t('nav.events')} (UK 2026 Matĉoj)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-green-700 transition-colors font-bold text-green-800">
                  Administrejo (Admin Portal)
                </Link>
              </li>
            </ul>
          </div>

          {/* About IKEF */}
          <div>
            <h3 className="text-[10px] font-extrabold text-stone-900 uppercase tracking-[0.2em] mb-4">
              IKEF Sekcio
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-3">
              Internacia Komerca kaj Ekonomia Strebado (IKEF) subtenas la uzadon de Esperanto en komerco, ekonomio kaj sporta kunlaboro tutmonde.
            </p>
            <div className="p-3 bg-stone-100/80 border border-stone-200 text-[11px]">
              <span className="font-bold text-green-700 block uppercase tracking-wider mb-0.5">Esperanto ★ Sporto</span>
              <span className="text-stone-600">Respekto, amikeco kaj honesta ludo en ĉiuj kontinentoj.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">
          <div>{t('footer.copy')}</div>
          <div className="flex items-center gap-2">
            <span>Projekto de</span>
            <a href="https://ikef.org" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
              IKEF.ORG
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

