'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  Globe,
  Menu,
  X,
  UserPlus,
  BookOpen,
  Users,
  Briefcase,
  Calendar,
  Home,
  Shield,
  Star
} from 'lucide-react';

interface NavbarProps {
  onOpenRegister?: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.home'), icon: Home },
    { href: '/vortaro', label: t('nav.vocabulary'), icon: BookOpen },
    { href: '/direktorio', label: t('nav.directory'), icon: Users },
    { href: '/sancoj', label: t('nav.opportunities'), icon: Briefcase },
    { href: '/eventoj', label: t('nav.events'), icon: Calendar },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand & Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-green-700 rounded-sm flex items-center justify-center shrink-0">
                <span className="text-white font-extrabold text-xs tracking-tighter">IK</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-tighter text-xl uppercase text-stone-900">
                    IKEF <span className="text-green-700">Futbalo</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-xs text-[9px] font-bold bg-green-100 text-green-800 uppercase tracking-widest border border-green-200">
                    EO
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-medium tracking-tight hidden sm:block">
                  futbalo.ikef.org • Futbala Sekcio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-stone-500">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors py-1 ${
                      active
                        ? 'text-green-700 border-b-2 border-green-700 font-extrabold'
                        : 'hover:text-stone-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Actions Right */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex gap-1 text-[10px] font-bold border border-stone-300 rounded-sm px-2.5 py-1.5 hover:border-stone-400 transition-colors cursor-pointer bg-stone-50/50"
              title="Ŝanĝi Lingvon / Switch Language"
            >
              <span className={lang === 'eo' ? 'text-green-700 font-extrabold' : 'text-stone-400'}>
                EO
              </span>
              <span className="text-stone-300">/</span>
              <span className={lang === 'en' ? 'text-green-700 font-extrabold' : 'text-stone-400'}>
                EN
              </span>
            </button>

            {/* Create Profile CTA */}
            {onOpenRegister ? (
              <button
                onClick={onOpenRegister}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                {t('hero.cta.primary')}
              </button>
            ) : (
              <Link
                href="/aligi"
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                {t('hero.cta.primary')}
              </Link>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-sm border border-stone-300 text-[10px] font-bold text-stone-700"
            >
              {lang.toUpperCase()}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-stone-200 px-6 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 text-xs font-bold uppercase tracking-wider border-b border-stone-200/60 ${
                  active
                    ? 'text-green-700 font-extrabold'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenRegister) onOpenRegister();
              }}
              className="w-full py-2.5 rounded-sm bg-green-700 text-white font-bold text-xs uppercase tracking-wider text-center"
            >
              {t('hero.cta.primary')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
