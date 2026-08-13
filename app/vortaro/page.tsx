'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegisterModal from '@/components/RegisterModal';
import SpeechButton from '@/components/SpeechButton';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { VocabItem, MemberItem } from '@/lib/data';
import {
  Search,
  BookOpen,
  Volume2,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Filter,
  Check,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export default function VocabularyPage() {
  const { lang, t } = useLanguage();
  const { vocabulary: realTimeVocab } = useAuth();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Ĉiuj');
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const categories = [
    'Ĉiuj',
    'Taktiko',
    'Tekniko',
    'Rolo',
    'Organizo',
    'Ekipaĵo',
    'Reguloj',
    'Evento'
  ];

  // Filtered vocabulary list
  const filteredVocab = useMemo(() => {
    return realTimeVocab.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Ĉiuj' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.termEo.toLowerCase().includes(q) ||
        item.termEn.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [realTimeVocab, searchQuery, selectedCategory]);


  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextCard = () => {
    setShowAnswer(false);
    setCardIndex((prev) => (prev + 1) % filteredVocab.length);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-stone-900 flex flex-col font-sans selection:bg-green-100">
      <Navbar onOpenRegister={() => setRegisterOpen(true)} />

      <main className="flex-1">
        
        {/* Header Banner */}
        <section className="bg-[#fcfaf7] text-stone-900 py-10 md:py-14 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-300 text-green-700 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Faka Terminologio</span>
                </div>
                <h1 className="serif text-4xl sm:text-5xl font-normal text-stone-900 tracking-tight">
                  {t('voc.title')}
                </h1>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl leading-relaxed">
                  {t('voc.subtitle')}
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setFlashcardMode(!flashcardMode)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xs border transition-all flex items-center gap-2 cursor-pointer ${
                    flashcardMode
                      ? 'bg-green-700 text-white border-green-700'
                      : 'bg-white border-stone-300 text-stone-800 hover:border-stone-400'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{flashcardMode ? 'Listo Mode' : 'Flashcard Lernilo'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          
          {flashcardMode ? (
            /* FLASHCARD STUDY MODE */
            <div className="max-w-2xl mx-auto my-6">
              <div className="editorial-card p-8 sm:p-10 text-center space-y-6">
                
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-200 pb-4">
                  <span>Vorto {cardIndex + 1} el {filteredVocab.length}</span>
                  <span className="px-2.5 py-1 bg-green-50 text-green-800 border border-green-200">
                    {filteredVocab[cardIndex]?.category}
                  </span>
                </div>

                {filteredVocab.length > 0 ? (
                  <>
                    <div className="py-8 space-y-4">
                      <h2 className="serif text-4xl sm:text-5xl font-normal text-stone-900">
                        {filteredVocab[cardIndex].termEo}
                      </h2>
                      
                      <div className="flex justify-center">
                        <SpeechButton
                          text={filteredVocab[cardIndex].termEo}
                          className="p-2.5 bg-stone-100 rounded-full border border-stone-300 hover:bg-stone-200"
                        />
                      </div>

                      {showAnswer ? (
                        <div className="pt-6 border-t border-stone-200 space-y-2">
                          <p className="serif text-2xl font-normal text-green-700">
                            {filteredVocab[cardIndex].termEn}
                          </p>
                          <p className="text-xs text-stone-600 italic">
                            &quot;{filteredVocab[cardIndex].definitionEo}&quot;
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAnswer(true)}
                          className="mt-4 px-5 py-2.5 bg-stone-100 border border-stone-300 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Montri Tradukon / Show Answer
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                      <button
                        onClick={() => {
                          setShowAnswer(false);
                          setCardIndex((prev) => (prev > 0 ? prev - 1 : filteredVocab.length - 1));
                        }}
                        className="px-4 py-2 border border-stone-300 text-xs font-bold uppercase tracking-wider text-stone-700 hover:bg-stone-100"
                      >
                        ← Antaŭa
                      </button>

                      <button
                        onClick={handleNextCard}
                        className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Sekva Vorto →
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-stone-500 py-10">Neniu vorto trovita.</p>
                )}

              </div>
            </div>
          ) : (
            /* SEARCH & LIST VIEW */
            <>
              {/* Search Bar & Category Filter Bar */}
              <div className="bg-white p-6 border border-stone-200 mb-8 space-y-4">
                
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('voc.search')}
                    className="w-full pl-11 pr-4 py-3 border border-stone-300 focus:border-green-700 outline-none text-xs font-medium bg-[#fcfaf7]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
                    >
                      Nuligi
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest shrink-0 mr-1 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    Kategorio:
                  </span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                        selectedCategory === cat
                          ? 'bg-green-700 text-white border-green-700'
                          : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-200 font-semibold">
                  <span>{t('voc.count')}: <strong className="text-stone-900">{filteredVocab.length}</strong></span>
                  {bookmarkedIds.length > 0 && (
                    <span className="text-green-700 font-bold uppercase text-[10px] tracking-wider">
                      ★ Konservitaj vortoj: {bookmarkedIds.length}
                    </span>
                  )}
                </div>
              </div>

              {/* VOCABULARY LIST GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVocab.map((item) => {
                  const isBookmarked = bookmarkedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`editorial-card p-6 flex flex-col justify-between transition-all ${
                        isBookmarked ? 'border-green-700 bg-green-50/10' : ''
                      }`}
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-extrabold uppercase tracking-wider border border-green-200">
                            {item.category}
                          </span>

                          <div className="flex items-center gap-1">
                            <SpeechButton text={item.termEo} />
                            <button
                              onClick={() => toggleBookmark(item.id)}
                              className="p-1 text-stone-400 hover:text-green-700 transition-colors"
                              title="Konservi vorton"
                            >
                              {isBookmarked ? (
                                <BookmarkCheck className="w-4 h-4 text-green-700 fill-green-100" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Terms */}
                        <h3 className="serif text-2xl font-normal text-stone-900">
                          {item.termEo}
                        </h3>

                        <p className="text-xs font-bold text-green-700 uppercase tracking-wider mt-0.5">
                          {item.termEn}
                        </p>

                        {/* Definition & Example */}
                        {item.definitionEo && (
                          <p className="text-xs text-stone-600 mt-3 pt-3 border-t border-stone-200 leading-relaxed">
                            {item.definitionEo}
                          </p>
                        )}

                        {item.exampleEo && (
                          <p className="text-[11px] text-stone-500 italic mt-2 bg-stone-100/70 p-2.5 border border-stone-200">
                            &quot;{item.exampleEo}&quot;
                          </p>
                        )}
                      </div>

                      <div className="mt-5 pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                        <span>IKEF Vortaro</span>
                        <span className="text-green-700">#EO</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredVocab.length === 0 && (
                <div className="text-center py-16 bg-white border border-stone-200 my-6 space-y-3">
                  <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
                  <h3 className="serif text-xl text-stone-900">Neniu vorto trovita</h3>
                  <p className="text-xs text-stone-500">
                    Provu ŝanĝi la serĉvorton aŭ elekti alian kategorion.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Ĉiuj');
                    }}
                    className="mt-2 px-4 py-2 bg-green-700 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Rekomenci serĉon</span>
                  </button>
                </div>
              )}
            </>
          )}

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
