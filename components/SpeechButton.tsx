'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeechButtonProps {
  text: string;
  lang?: string;
  className?: string;
}

export default function SpeechButton({ text, lang = 'eo', className = '' }: SpeechButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // Attempt Esperanto or default voice
    utterance.lang = lang === 'eo' ? 'eo' : 'en-US';
    utterance.rate = 0.9;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={handleSpeak}
      className={`p-1.5 rounded-md hover:bg-emerald-100 text-green-700 transition-colors flex items-center justify-center cursor-pointer ${className}`}
      title={`Aŭskulti elpronon: "${text}"`}
      aria-label={`Pronounce ${text}`}
    >
      {speaking ? (
        <VolumeX className="w-4 h-4 text-emerald-800 animate-pulse" />
      ) : (
        <Volume2 className="w-4 h-4" />
      )}
    </button>
  );
}
