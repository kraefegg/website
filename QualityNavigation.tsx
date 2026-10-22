import React, { useState, useEffect } from 'react';
import { 
  Eye, Type, Sun, Moon, Volume2, VolumeX, 
  RotateCcw, Sparkles, Check, X, 
  HelpCircle, Keyboard, ZoomIn, ZoomOut,
  Sliders, Shield, Play, Pause, Square
} from 'lucide-react';
import { Language, NavRoute } from '../../types';

interface QualityNavigationProps {
  lang: Language;
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  isOpen: boolean;
  onToggle: () => void;
}

type FontSizeOption = 'sm' | 'md' | 'lg' | 'xl';

export const QualityNavigation: React.FC<QualityNavigationProps> = ({
  lang,
  currentRoute,
  onNavigate,
  isOpen,
  onToggle,
}) => {
  // Stored preferences with defaults
  const [fontSize, setFontSize] = useState<FontSizeOption>(() => {
    return (localStorage.getItem('kmo_a11y_fontsize') as FontSizeOption) || 'md';
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('kmo_a11y_contrast') === 'true';
  });
  const [monochrome, setMonochrome] = useState<boolean>(() => {
    return localStorage.getItem('kmo_a11y_monochrome') === 'true';
  });
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(() => {
    return localStorage.getItem('kmo_a11y_dyslexia') === 'true';
  });
  const [highlightLinks, setHighlightLinks] = useState<boolean>(() => {
    return localStorage.getItem('kmo_a11y_links') === 'true';
  });
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return localStorage.getItem('kmo_a11y_motion') === 'true';
  });

  // Speech synthesis state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Apply classes to documentElement
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    root.classList.remove('a11y-font-sm', 'a11y-font-md', 'a11y-font-lg', 'a11y-font-xl');
    root.classList.add(`a11y-font-${fontSize}`);
    localStorage.setItem('kmo_a11y_fontsize', fontSize);

    // Contrast
    if (highContrast) {
      root.classList.add('a11y-contrast-high');
      localStorage.setItem('kmo_a11y_contrast', 'true');
    } else {
      root.classList.remove('a11y-contrast-high');
      localStorage.setItem('kmo_a11y_contrast', 'false');
    }

    // Monochrome
    if (monochrome) {
      root.classList.add('a11y-monochrome');
      localStorage.setItem('kmo_a11y_monochrome', 'true');
    } else {
      root.classList.remove('a11y-monochrome');
      localStorage.setItem('kmo_a11y_monochrome', 'false');
    }

    // Dyslexia font
    if (dyslexicFont) {
      root.classList.add('a11y-dyslexia');
      localStorage.setItem('kmo_a11y_dyslexia', 'true');
    } else {
      root.classList.remove('a11y-dyslexia');
      localStorage.setItem('kmo_a11y_dyslexia', 'false');
    }

    // Highlight links
    if (highlightLinks) {
      root.classList.add('a11y-highlight-links');
      localStorage.setItem('kmo_a11y_links', 'true');
    } else {
      root.classList.remove('a11y-highlight-links');
      localStorage.setItem('kmo_a11y_links', 'false');
    }

    // Reduced motion
    if (reducedMotion) {
      root.classList.add('a11y-reduced-motion');
      localStorage.setItem('kmo_a11y_motion', 'true');
    } else {
      root.classList.remove('a11y-reduced-motion');
      localStorage.setItem('kmo_a11y_motion', 'false');
    }
  }, [fontSize, highContrast, monochrome, dyslexicFont, highlightLinks, reducedMotion]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If Alt is pressed
      if (e.altKey) {
        if (e.key.toLowerCase() === 'a') {
          e.preventDefault();
          onToggle();
        } else if (e.key === '1') {
          e.preventDefault();
          onNavigate('/');
        } else if (e.key === '2') {
          e.preventDefault();
          onNavigate('/services');
        } else if (e.key === '3') {
          e.preventDefault();
          onNavigate('/pentahydra');
        } else if (e.key === '4') {
          e.preventDefault();
          onNavigate('/oxygen-ecosystem');
        } else if (e.key === '5') {
          e.preventDefault();
          onNavigate('/trust');
        } else if (e.key.toLowerCase() === 'c') {
          e.preventDefault();
          onNavigate('/contact');
        }
      }

      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNavigate, onToggle]);

  // Speech Reader
  const handleReadPage = () => {
    if (!speechSupported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Generate descriptive text based on current route
    let textToRead = '';
    if (lang === 'pt') {
      textToRead = `Você está na página institucional da Kraefegg Multi Office. Rota atual: ${currentRoute}. `;
      if (currentRoute === '/') {
        textToRead += 'Engenharia, Inteligência Ambiental, Tecnologia Avançada e Impacto Operacional. Atuamos com 12 verticais de engenharia, os ecossistemas PentaHydra e Oxygen, e governança corporativa de alto nível.';
      } else if (currentRoute.startsWith('/services')) {
        textToRead += 'Matriz Técnica de Serviços da Kraefegg M.O. Compreendendo Engenharia Multidisciplinar, Mineração, Meio Ambiente, Energia, Infraestrutura, Marítimo e Indústria 4.0.';
      } else if (currentRoute.startsWith('/pentahydra')) {
        textToRead += 'PentaHydra Agency: Tecnologia e Sistemas Avançados. Inteligência Artificial Generativa Física, Engenharia de Dados em tempo real, Cibersegurança Industrial OT e Edge AI.';
      } else if (currentRoute.startsWith('/oxygen')) {
        textToRead += 'Oxygen Ecosystem: Inteligência Ambiental, Restauração Ecológica PRAD, Estratégia ESG e Ativos de Bio-Carbono de alta integridade.';
      } else if (currentRoute.startsWith('/trust')) {
        textToRead += 'Trust Center da Kraefegg. Doze pilares de integridade institucional, proteção de dados LGPD, compliance anticorrupção e repositório de vinte políticas corporativas.';
      } else {
        textToRead += 'Explore as seções da página utilizando a tecla Tab para navegar ou atalhos de teclado.';
      }
    } else {
      textToRead = `You are on the Kraefegg Multi Office institutional portal. Current route: ${currentRoute}. `;
      if (currentRoute === '/') {
        textToRead += 'Engineering, Environmental Intelligence, Advanced Technology, and Operational Impact across 12 industrial verticals, PentaHydra Agency, and Oxygen Ecosystem.';
      } else {
        textToRead += 'Explore page sections using the Tab key or accessible keyboard shortcuts.';
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleStopSpeech = () => {
    if (speechSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleResetAll = () => {
    setFontSize('md');
    setHighContrast(false);
    setMonochrome(false);
    setDyslexicFont(false);
    setHighlightLinks(false);
    setReducedMotion(false);
    handleStopSpeech();
  };

  return (
    <>
      {/* Floating Accessibility Trigger Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-cyan-950/90 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer group flex items-center gap-2"
        aria-label={lang === 'pt' ? 'Abrir menu de acessibilidade e navegação assistida' : 'Open accessibility & assistive navigation menu'}
        title="Quality Navigation & Acessibilidade (Alt + A)"
      >
        <Eye className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-mono font-bold tracking-wider hidden md:inline pr-1">
          {lang === 'pt' ? 'ACESSIBILIDADE' : 'ACCESSIBILITY'}
        </span>
      </button>

      {/* Main Accessibility Modal Dialog */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-dialog-title"
        >
          <div className="relative w-full max-w-xl rounded-2xl bg-[#060A14] border border-cyan-500/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="a11y-dialog-title" className="text-sm font-mono font-bold text-white tracking-wider uppercase">
                    {lang === 'pt' ? 'Navegação Assistida & Acessibilidade' : 'Quality Navigation & Accessibility'}
                  </h2>
                  <p className="text-[11px] font-mono text-cyan-400">
                    WCAG 2.1 AA • e-MAG • ISO 40500
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetAll}
                  className="px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-1 transition-colors"
                  title={lang === 'pt' ? 'Redefinir todas as preferências' : 'Reset all settings'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Redefinir' : 'Reset'}</span>
                </button>

                <button
                  onClick={onToggle}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                  aria-label="Fechar janela"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body Settings */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm">
              {/* 1. Voice Reader / Text to Speech */}
              {speechSupported && (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Volume2 className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-xs font-mono text-slate-200 uppercase">
                        {lang === 'pt' ? 'Leitor de Tela / Síntese de Áudio' : 'Screen Audio Narrator'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                      NATIVO FREE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'pt'
                      ? 'Ouça a síntese vocal da página atual e orientações de navegação sem necessidade de extensões.'
                      : 'Listen to spoken guidance and page summaries natively in your browser without external tools.'}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReadPage}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-rose-950 border border-rose-500 text-rose-300'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-current" />
                          <span>{lang === 'pt' ? 'Parar Leitura' : 'Stop Reading'}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{lang === 'pt' ? 'Ler Página Atual' : 'Read This Page'}</span>
                        </>
                      )}
                    </button>
                    {isSpeaking && (
                      <span className="text-[11px] font-mono text-cyan-400 animate-pulse flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        {lang === 'pt' ? 'Narrando...' : 'Speaking...'}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* 2. Font Size Scaling */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-xs font-mono text-slate-200 uppercase">
                      {lang === 'pt' ? 'Tamanho da Tipografia' : 'Text Sizing'}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">
                    {fontSize === 'sm' && '100%'}
                    {fontSize === 'md' && '115%'}
                    {fontSize === 'lg' && '130%'}
                    {fontSize === 'xl' && '145%'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'sm', label: '100%', sub: lang === 'pt' ? 'Padrão' : 'Default' },
                    { id: 'md', label: '115%', sub: lang === 'pt' ? 'Médio' : 'Medium' },
                    { id: 'lg', label: '130%', sub: lang === 'pt' ? 'Grande' : 'Large' },
                    { id: 'xl', label: '145%', sub: lang === 'pt' ? 'Extra' : 'X-Large' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFontSize(opt.id as FontSizeOption)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        fontSize === opt.id
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-mono">{opt.label}</div>
                      <div className="text-[10px] text-slate-500">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Visual & Cognitive Toggles */}
              <div className="space-y-3">
                <span className="font-bold text-xs font-mono text-slate-200 uppercase">
                  {lang === 'pt' ? 'Filtros Visuais & Cognitivos' : 'Visual & Cognitive Filters'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* High Contrast */}
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      highContrast
                        ? 'bg-cyan-950/70 border-cyan-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-2">
                        <Sun className="w-3.5 h-3.5 text-yellow-400" />
                        <span>{lang === 'pt' ? 'Alto Contraste' : 'High Contrast'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {lang === 'pt' ? 'Contraste máximo preto/ciano WCAG AAA' : 'Maximum WCAG AAA luminance'}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      highContrast ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {highContrast && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Monochrome / Daltonismo */}
                  <button
                    onClick={() => setMonochrome(!monochrome)}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      monochrome
                        ? 'bg-cyan-950/70 border-cyan-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-2">
                        <Moon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lang === 'pt' ? 'Escala de Cinza' : 'Monochrome'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {lang === 'pt' ? 'Para daltonismo e sensibilidade a luz' : 'For color-blindness & light strain'}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      monochrome ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {monochrome && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Dyslexia font */}
                  <button
                    onClick={() => setDyslexicFont(!dyslexicFont)}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      dyslexicFont
                        ? 'bg-cyan-950/70 border-cyan-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-2">
                        <Type className="w-3.5 h-3.5 text-teal-400" />
                        <span>{lang === 'pt' ? 'Fonte para Dislexia' : 'Dyslexia Friendly'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {lang === 'pt' ? 'Espaçamento ampliado e glifos nítidos' : 'Wider tracking and distinct glyphs'}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      dyslexicFont ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {dyslexicFont && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>

                  {/* Highlight links */}
                  <button
                    onClick={() => setHighlightLinks(!highlightLinks)}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      highlightLinks
                        ? 'bg-cyan-950/70 border-cyan-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{lang === 'pt' ? 'Destacar Links & Ações' : 'Highlight Targets'}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {lang === 'pt' ? 'Contornos nítidos em botões e links' : 'High-visibility click outlines'}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                      highlightLinks ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
                    }`}>
                      {highlightLinks && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                </div>
              </div>

              {/* 4. Keyboard Navigation Shortcuts Map */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Keyboard className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-xs font-mono text-slate-200 uppercase">
                      {lang === 'pt' ? 'Atalhos de Teclado (Alt + Tecla)' : 'Keyboard Navigation (Alt + Key)'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold">Alt + 1:</span> <span className="text-slate-300">Home</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold">Alt + 2:</span> <span className="text-slate-300">Serviços</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold">Alt + 3:</span> <span className="text-slate-300">PentaHydra</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold">Alt + 4:</span> <span className="text-slate-300">Oxygen</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold">Alt + 5:</span> <span className="text-slate-300">Trust Center</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-cyan-400 font-bold">Alt + C:</span> <span className="text-slate-300">Contato</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800 col-span-2 sm:col-span-3">
                    <span className="text-cyan-400 font-bold">Alt + A:</span> <span className="text-slate-300">Abrir/Fechar este Painel de Acessibilidade</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>{lang === 'pt' ? 'Suas preferências ficam salvas neste dispositivo' : 'Preferences are saved on this device'}</span>
              <button
                onClick={onToggle}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer"
              >
                {lang === 'pt' ? 'Concluir' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
