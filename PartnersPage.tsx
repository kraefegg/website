import React from 'react';
import { NavRoute, Language } from '../types';
import { partnersData } from '../data/partnersData';
import { Globe, ShieldCheck, ArrowUpRight, Cpu, Wrench, GraduationCap, Building2 } from 'lucide-react';

interface PartnersPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate, lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span>ALIANÇAS ESTRATÉGICAS INSTITUCIONAIS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          {lang === 'pt' ? 'Rede de Cooperação Técnica' : 'Technical Cooperation Network'}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {lang === 'pt'
            ? 'A Kraefegg M.O. articula consórcios e alianças de pesquisa aplicada com desenvolvedores de hardware de ponta, operadores orbitais de satélites e entidades regulatórias globais.'
            : 'Kraefegg M.O. fosters applied research consortia and technical partnerships with advanced hardware manufacturers, orbital satellite constellations, and global standards bodies.'}
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnersData.map((ptn) => (
          <div
            key={ptn.id}
            className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-[#070B14] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
                  {lang === 'pt' ? ptn.category : ptn.categoryEn}
                </span>
                <Globe className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </div>

              <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                {ptn.name}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'pt' ? ptn.description : ptn.descriptionEn}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase">
                {lang === 'pt' ? 'Eixo de Cooperação:' : 'Cooperation Focus:'}
              </div>
              <div className="text-xs font-mono text-slate-300">
                {ptn.focus}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Network Callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/30 to-slate-950 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-bold text-white">
            {lang === 'pt' ? 'Interesse em integrar o consórcio técnico da Kraefegg?' : 'Interested in joining Kraefegg’s technical consortium?'}
          </h3>
          <p className="text-xs text-slate-300">
            {lang === 'pt'
              ? 'Conectamos fabricantes de tecnologia, universidades de engenharia e operadores industriais.'
              : 'We connect technology manufacturers, engineering universities, and industrial operators.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('/contact')}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <span>{lang === 'pt' ? 'ESTABELECER PARCERIA' : 'ESTABLISH PARTNERSHIP'}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
