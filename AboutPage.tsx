import React from 'react';
import { NavRoute, Language } from '../types';
import { KraefeggLogo } from '../components/common/KraefeggLogo';
import { ShieldCheck, Globe, CheckCircle2, ChevronRight, Layers, Target, Compass, Award } from 'lucide-react';
import { FounderLeadershipProfile } from '../components/institutional/FounderLeadershipProfile';
import { aboutI18n, localize } from '../data/pageTranslations';

interface AboutPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span>{localize(lang, aboutI18n.badge)}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white leading-tight">
          {localize(lang, aboutI18n.title)}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {localize(lang, aboutI18n.subtitle)}
        </p>
      </div>

      {/* Multi-Office Architecture Definition */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 to-[#070B14] border border-white/[0.08] shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <KraefeggLogo variant="horizontal" size="lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          <div className="space-y-3">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>{localize(lang, aboutI18n.multiOfficeConcept)}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {localize(lang, aboutI18n.multiOfficeDesc)}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-400" />
              <span>{localize(lang, aboutI18n.pentahydraConcept)}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {localize(lang, aboutI18n.pentahydraDesc)}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>{localize(lang, aboutI18n.oxygenConcept)}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {localize(lang, aboutI18n.oxygenDesc)}
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Values & Rigor */}
      <div className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
          {localize(lang, aboutI18n.principlesTitle)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: localize(lang, aboutI18n.principles.rigor.title),
              desc: localize(lang, aboutI18n.principles.rigor.desc),
              icon: Award,
            },
            {
              title: localize(lang, aboutI18n.principles.ethics.title),
              desc: localize(lang, aboutI18n.principles.ethics.desc),
              icon: ShieldCheck,
            },
            {
              title: localize(lang, aboutI18n.principles.sustainability.title),
              desc: localize(lang, aboutI18n.principles.sustainability.desc),
              icon: CheckCircle2,
            },
            {
              title: localize(lang, aboutI18n.principles.footprint.title),
              desc: localize(lang, aboutI18n.principles.footprint.desc),
              icon: Globe,
            },
          ].map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <val.icon className="w-6 h-6 text-cyan-400" />
              <h4 className="text-base font-heading font-bold text-white">{val.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Institutional Leadership & Technical Direction Profile */}
      <FounderLeadershipProfile lang={lang} />

      {/* Global Presence Map & Compliance Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-bold text-white">
            {localize(lang, aboutI18n.ctaTitle)}
          </h3>
          <p className="text-xs text-slate-300">
            {localize(lang, aboutI18n.ctaSubtitle)}
          </p>
        </div>

        <button
          onClick={() => onNavigate('/services')}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <span>{localize(lang, aboutI18n.ctaButton)}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

