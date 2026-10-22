import React from 'react';
import { NavRoute, Language } from '../types';
import { OxygenLogo } from '../components/common/OxygenLogo';
import { 
  Leaf, ShieldCheck, 
  ArrowRight, Satellite, 
  Droplets, Globe
} from 'lucide-react';
import { oxygenI18n, localize } from '../data/pageTranslations';

interface OxygenPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const OxygenPage: React.FC<OxygenPageProps> = ({ onNavigate, lang }) => {
  const pillarsIcons = [ShieldCheck, Leaf, Satellite, Droplets];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Header Hero */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Emerald Glow */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <OxygenLogo size="lg" showSubtitle={false} />
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-black text-white leading-tight">
              {localize(lang, oxygenI18n.heroTitle1)}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                {localize(lang, oxygenI18n.heroTitleHighlight)}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {localize(lang, oxygenI18n.heroSubtitle)}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="https://oxygen-earth-os.base44.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_-5px_rgba(16,185,129,0.7)] cursor-pointer flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                <span>{localize(lang, oxygenI18n.accessEarthOs)}</span>
                <Globe className="w-4 h-4" />
              </a>

              <button
                onClick={() => onNavigate('/services')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{localize(lang, oxygenI18n.environmentalServices)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                <span>{localize(lang, oxygenI18n.structureEsg)}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-emerald-500/30 relative">
            <img
              src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80"
              alt="Oxygen Ecosystem Forest Telemetry"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
                {localize(lang, oxygenI18n.radarSarTag)}
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {localize(lang, oxygenI18n.biometricMonitoring)}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {localize(lang, oxygenI18n.biomassPrecision)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Methodological Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-left space-y-2">
          <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            {localize(lang, oxygenI18n.scientificRigor)}
          </div>
          <h2 className="text-3xl font-heading font-black text-white">
            {localize(lang, oxygenI18n.beyondCompliance)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {oxygenI18n.pillars.map((pillar, idx) => {
            const Icon = pillarsIcons[idx] || Leaf;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#06110D] border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 group shadow-lg"
              >
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 w-fit">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-heading font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {localize(lang, pillar.title)}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {localize(lang, pillar.desc)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Metrics Summary Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-cyan-950/40 border border-emerald-500/30 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-300">14.8M ha</div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              {localize(lang, oxygenI18n.metrics.monitored)}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-white">100%</div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              {localize(lang, oxygenI18n.metrics.forensic)}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-cyan-400">1.2M tCO2e</div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              {localize(lang, oxygenI18n.metrics.biocarbon)}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-400">94%</div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              {localize(lang, oxygenI18n.metrics.recovery)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
