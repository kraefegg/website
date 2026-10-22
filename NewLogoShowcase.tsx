import React, { useState } from 'react';
import { Sparkles, Eye, Download, ShieldCheck, Check, Layers, Cpu, Leaf, ZoomIn } from 'lucide-react';
import { KraefeggLogo, KraefeggSymbol } from './KraefeggLogo';

interface NewLogoShowcaseProps {
  className?: string;
}

export const NewLogoShowcase: React.FC<NewLogoShowcaseProps> = ({ className = '' }) => {
  const [activeView, setActiveView] = useState<'new' | 'compare'>('new');
  const [zoomModal, setZoomModal] = useState<boolean>(false);

  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-[#070C16] border border-cyan-500/40 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>NOVO DESIGN SYSTEM • LOGOTIPO TECNOLÓGICO OFICIAL KRAEFEGG</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight">
              Evolução da Identidade Visual Tecnológica
            </h3>
          </div>

          {/* Toggle View */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('new')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeView === 'new'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Novo Logo Tech
            </button>
            <button
              onClick={() => setActiveView('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeView === 'compare'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Comparar com Original
            </button>
          </div>
        </div>

        {/* Display Area */}
        {activeView === 'new' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Logo Image Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-slate-950/80 border border-cyan-500/30 relative group shadow-inner">
              <img
                src="/kraefegg-new-tech-logo.jpg"
                alt="Novo Logo Tecnológico Kraefegg M.O."
                referrerPolicy="no-referrer"
                className="max-h-72 w-auto object-contain rounded-xl shadow-[0_0_35px_rgba(6,182,212,0.35)] transition-transform duration-500 group-hover:scale-105"
              />
              <span className="mt-3 text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/40">
                OCTANE RENDER • HIGH-TECH PRESERVATION
              </span>
            </div>

            {/* Architectural Breakdown */}
            <div className="lg:col-span-7 space-y-4 text-xs">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white font-heading">
                  Preservação Integral dos Elementos Fundamentais
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  O novo logotipo eleva os traços emblemáticos originais a uma dimensão de engenharia de precisão com acabamento em titânio escovado, circuitos cibernéticos de alta densidade e folha de bio-engenharia com microrramificações eletroluminescentes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-cyan-400 font-mono">
                    <Cpu className="w-4 h-4" />
                    <span>Letra K em Titânio & Circuitos</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Nodos cibernéticos que irradiam à esquerda, simbolizando IoT industrial, dados em tempo real e arquitetura de sistemas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 font-mono">
                    <Leaf className="w-4 h-4" />
                    <span>Folha Ecológica Central</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Símbolo de engenharia ambiental, restauração de biomas e Oxygen Ecosystem, com nervuras eletrônicas iluminadas.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/20 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-400 font-mono">
                    <Sparkles className="w-4 h-4" />
                    <span>Facetas Dourada & Vermelha</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Chevrons angulares facetados em amarelo âmbar (energia & transição) e vermelho carmim (indústria & mineração).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-slate-300 font-mono">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Tipografia & Barra Espectral</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    KRAEFEGG em metal usinado, barra de calibração espectral e subtítulo: TECHNOLOGY • DATA • AI • ENVIRONMENTAL ENGINEERING.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Comparison View */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col items-center text-center">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">LOGO DE REFERÊNCIA ORIGINAL</span>
              <img
                src="/KRAEFEGG TECH LOGO.png"
                alt="Logo Original"
                referrerPolicy="no-referrer"
                className="max-h-60 w-auto object-contain rounded-lg border border-slate-800 p-2"
              />
              <p className="text-xs text-slate-400 max-w-xs">
                Estrutura original fornecida contendo a composição emblemática K, folha e chevrons.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/70 border border-cyan-500/40 space-y-3 flex flex-col items-center text-center relative shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">NOVO LOGO TECNOLÓGICO GERADO</span>
              <img
                src="/kraefegg-new-tech-logo.jpg"
                alt="Novo Logo Tecnológico"
                referrerPolicy="no-referrer"
                className="max-h-60 w-auto object-contain rounded-lg border border-cyan-500/30 p-2 shadow-lg"
              />
              <p className="text-xs text-cyan-300 max-w-xs">
                Renderização tecnológica hiper-detalhada com preservação rigorosa de todos os traços, proporções e cores.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
