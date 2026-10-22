import React from 'react';
import { ArrowRight, Terminal, Users } from 'lucide-react';
import { Language } from '../../types';
import { careersI18n, localize } from '../../data/pageTranslations';

interface CareersHeroProps {
  lang: Language;
  onExploreJobs: () => void;
  onJoinTalentNetwork: () => void;
  onSelectRemoteJobs?: () => void;
  openCount: number;
}

export const CareersHero: React.FC<CareersHeroProps> = ({
  lang,
  onExploreJobs,
  onJoinTalentNetwork,
  onSelectRemoteJobs,
  openCount
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0B101E] via-[#070A12] to-[#04060A] p-8 sm:p-12 lg:p-16 shadow-2xl">
      {/* Background Engineering Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#0ea5e915_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e915_1px,transparent_1px)] bg-[size:32px_32px]" 
      />

      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider uppercase">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>KRAEFEGG M.O. & PENTAHYDRA SYSTEMS</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{openCount} {localize(lang, careersI18n.openPositions)}</span>
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white leading-tight">
            CAREERS.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
              {localize(lang, careersI18n.heroTitle)}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans max-w-3xl leading-relaxed">
            {localize(lang, careersI18n.heroSubtitle)}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={onExploreJobs}
            className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2.5 cursor-pointer"
          >
            <span>{localize(lang, careersI18n.viewOpenPositions)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onSelectRemoteJobs && (
            <button
              onClick={onSelectRemoteJobs}
              className="px-6 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/50 hover:border-emerald-400 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2.5 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <span className="text-base leading-none">🏠</span>
              <span>{lang === 'pt' ? 'Vagas Remotas (Home Office)' : 'Remote / Home Office Jobs'}</span>
            </button>
          )}

          <button
            onClick={onJoinTalentNetwork}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>{localize(lang, careersI18n.joinTalentNetwork)}</span>
          </button>
        </div>

        {/* Discipline Convergence Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">11</div>
            <div className="text-xs font-mono text-slate-400 uppercase mt-0.5">
              {localize(lang, careersI18n.metricDivisions)}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-cyan-400">100%</div>
            <div className="text-xs font-mono text-slate-400 uppercase mt-0.5">
              {localize(lang, careersI18n.metricRealWorld)}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">6/6</div>
            <div className="text-xs font-mono text-slate-400 uppercase mt-0.5">
              {localize(lang, careersI18n.metricAssessment)}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-emerald-400">Human</div>
            <div className="text-xs font-mono text-slate-400 uppercase mt-0.5">
              {localize(lang, careersI18n.metricHumanDecision)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
