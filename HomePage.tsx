import React, { useState } from 'react';
import { NavRoute, Language } from '../types';
import { CinematicVideoPlayer } from '../components/media/CinematicVideoPlayer';
import { KraefeggLogo } from '../components/common/KraefeggLogo';
import { PentahydraEmblem } from '../components/common/PentahydraLogo';
import { OxygenLogo } from '../components/common/OxygenLogo';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { showcasesData } from '../data/showcasesData';
import { strategicMarketsData } from '../data/marketsData';
import { homeI18n, localize } from '../data/pageTranslations';
import { 
  ArrowRight, ShieldCheck, Cpu, Leaf, Globe, 
  Layers, Terminal, CheckCircle2, ChevronRight, 
  Play, Sparkles, Activity, Anchor, Zap, Pickaxe,
  Wrench, Building2, ExternalLink, Server, Atom, Flame,
  SunMedium, ArrowUpRight, Calculator
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
  onOpenAI: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  lang,
  onOpenAI,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'engineering' | 'tech' | 'environment'>('all');
  const [selectedMarketId, setSelectedMarketId] = useState<string>('datacenter-solar');

  return (
    <div className="space-y-24 pb-20">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Column: Core Institutional Typography */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Kraefegg M.O. Official Brand Emblem */}
            <div className="flex flex-wrap items-center gap-4">
              <img
                src="/kraefegg-new-tech-logo.jpg"
                alt="KRAEFEGG M.O. Logo Tecnológico"
                referrerPolicy="no-referrer"
                className="h-16 w-auto max-w-[260px] object-contain rounded-xl border border-cyan-500/40 bg-slate-950/90 p-1.5 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/KRAEFEGG TECH LOGO.png';
                }}
              />
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 font-mono text-xs shadow-inner">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>KRAEFEGG M.O. // MULTIDISCIPLINARY ORGANIZATION</span>
              </div>
            </div>

            {/* Cinematic 4-Part Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-black tracking-tight leading-[1.05] text-white">
              <span className="block text-white">ENGINEERING.</span>
              <span className="block text-cyan-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                INTELLIGENCE.
              </span>
              <span className="block text-gradient-cyan">TECHNOLOGY.</span>
              <span className="block text-slate-400">IMPACT.</span>
            </h1>

            {/* Subtitle Statement */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
              {localize(lang, homeI18n.corporateSection.subtitle) || (lang === 'pt'
                ? 'A Kraefegg M.O. integra engenharia multidisciplinar, inteligência ambiental e tecnologia avançada para projetar soluções para sistemas complexos do mundo real.'
                : 'Kraefegg M.O. integrates multidisciplinary engineering, environmental intelligence, and advanced technology to design solutions for complex real-world systems.')}
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('/services')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] cursor-pointer flex items-center gap-2.5"
              >
                <span>{localize(lang, homeI18n.ecosystemSection.discoverKraefegg) || (lang === 'pt' ? 'EXPLORAR CAPACIDADES' : 'EXPLORE CAPABILITIES')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/projects')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
              >
                <span>{localize(lang, homeI18n.projectsSection.viewAll) || (lang === 'pt' ? 'VER PROJETOS' : 'VIEW PROJECTS')}</span>
              </button>

              <button
                onClick={() => onNavigate('/solar-products')}
                className="px-5 py-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/50 font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer flex items-center gap-2"
              >
                <SunMedium className="w-4 h-4 text-amber-400" />
                <span>{lang === 'pt' ? 'PRODUTOS SOLARES' : lang === 'es' ? 'HARDWARE SOLAR' : lang === 'de' ? 'SOLAR-HARDWARE' : lang === 'fr' ? 'MATÉRIEL SOLAIRE' : lang === 'zh' ? '光伏硬件系统' : 'SOLAR HARDWARE'}</span>
              </button>

              <button
                onClick={onOpenAI}
                className="px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-xs font-mono transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'pt' ? 'IA Institucional' : lang === 'es' ? 'IA Institucional' : lang === 'de' ? 'KI-Assistent' : lang === 'fr' ? 'Assistant IA' : lang === 'zh' ? '机构智能助手' : 'AI Assistant'}</span>
              </button>
            </div>

            {/* Quick stats micro-strip */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/[0.08] max-w-xl text-left">
              <div>
                <div className="text-xl sm:text-2xl font-heading font-black text-cyan-300">120+</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  {localize(lang, homeI18n.metrics.disciplines)}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-heading font-black text-white">240+</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  {localize(lang, homeI18n.metrics.simulations)}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-heading font-black text-emerald-400">99.98%</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  {localize(lang, homeI18n.metrics.uptime)}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Column: User's Cinematic Motion Reel Player */}
          <div className="lg:col-span-5 w-full">
            <div className="relative">
              {/* Outer decorative tech brackets */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-500" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-rose-500" />

              <CinematicVideoPlayer
                title="PENTAHYDRA × KRAEFEGG REEL"
                subtitle="OFFICIAL MOTION ASSET // REAL-WORLD EMBEDDED AI & MULTIDISCIPLINARY OPS"
                autoplay={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC MARKETS & CRITICAL INFRASTRUCTURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{localize(lang, homeI18n.marketsSection.badge)}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
              {localize(lang, homeI18n.marketsSection.title)}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {localize(lang, homeI18n.marketsSection.subtitle)}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/markets')}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase transition-all shadow-lg hover:shadow-cyan-500/30 shrink-0 cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>{localize(lang, homeI18n.marketsSection.exploreAll)}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Strategic Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategicMarketsData.map((market) => {
            const isSelected = selectedMarketId === market.id;
            return (
              <div
                key={market.id}
                onClick={() => {
                  setSelectedMarketId(market.id);
                  onNavigate('/markets');
                }}
                className={`group rounded-2xl p-6 bg-gradient-to-b from-slate-900/90 to-[#070B14] border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-xl ${
                  isSelected
                    ? 'border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                    : 'border-slate-800 hover:border-cyan-500/60 hover:-translate-y-1'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-0.5 rounded uppercase">
                      {lang === 'pt' ? market.badge : market.badgeEn}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {lang === 'pt' ? market.shortTitle : market.shortTitleEn}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {lang === 'pt' ? market.tagline : market.taglineEn}
                    </p>
                  </div>

                  <div className="pt-2 grid grid-cols-3 gap-2 border-t border-slate-800/80">
                    {market.technicalSpecs.slice(0, 3).map((spec, sIdx) => (
                      <div key={sIdx} className="p-2 rounded-lg bg-black/40 text-center">
                        <div className="text-xs font-mono font-black text-cyan-400">{spec.value}</div>
                        <div className="text-[9px] font-mono text-slate-400 truncate">
                          {lang === 'pt' ? spec.label : spec.labelEn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:underline">
                  <span>{localize(lang, homeI18n.marketsSection.viewSpec)}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. INSTITUTIONAL POSITIONING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-[#060911] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                {localize(lang, homeI18n.corporateSection.badge)}
              </span>

              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">
                {localize(lang, homeI18n.corporateSection.title)}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
                {lang === 'pt'
                  ? 'A Kraefegg M.O. não é uma empresa de software convencional nem um escritório isolado de projetos. Integramos mais de 120 disciplinas que vão da engenharia mecânica naval, civil e geotécnica até redes neurais embarcadas em hardware industrial, visão computacional marítima e sensoriamento de restauração florestal com rigor científico.'
                  : 'Kraefegg M.O. is neither a standard software vendor nor an isolated design bureau. We integrate over 120 technical fields spanning naval, civil, and geotechnical engineering to mission-hardened embedded neural hardware, maritime computer vision, and scientific forest restoration.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onNavigate('/about')}
                className="w-full py-3.5 px-5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-mono text-xs tracking-wider uppercase border border-slate-600/50 transition-all flex items-center justify-between cursor-pointer"
              >
                <span>{localize(lang, homeI18n.corporateSection.discoverInstitution)}</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                onClick={() => onNavigate('/services')}
                className="w-full py-3.5 px-5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 font-mono text-xs tracking-wider uppercase border border-cyan-500/40 transition-all flex items-center justify-between cursor-pointer"
              >
                <span>{localize(lang, homeI18n.corporateSection.viewVerticals)}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BRAND ARCHITECTURE / ECOSYSTEM UNITS (Section 3) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-block text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            {localize(lang, homeI18n.ecosystemSection.badge)}
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
            {localize(lang, homeI18n.ecosystemSection.title)}
          </h2>
          <p className="text-sm text-slate-400">
            {localize(lang, homeI18n.ecosystemSection.subtitle)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Kraefegg M.O. */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#090E17] border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <img
                  src="/kraefegg-new-tech-logo.jpg"
                  alt="KRAEFEGG M.O. Multi Office"
                  referrerPolicy="no-referrer"
                  className="h-16 sm:h-20 w-auto max-w-[220px] object-contain rounded-xl border border-cyan-500/40 bg-slate-950 p-1.5 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/kraefegg-tech-logo.png';
                  }}
                />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase">
                  CORE BRAND
                </span>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                  KRAEFEGG M.O.
                </h3>
                <div className="text-xs font-mono text-slate-400 tracking-wider">
                  MULTI OFFICE // ENGENHARIA & CONSULTORIA
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {localize(lang, homeI18n.ecosystemSection.kraefeggDesc)}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="px-2 py-0.5 bg-slate-800 rounded">Civil & Estrutural</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded">Geotecnia</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded">Naval & Portos</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('/services')}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-semibold flex items-center justify-between cursor-pointer"
              >
                <span>{localize(lang, homeI18n.ecosystemSection.discoverKraefegg)}</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Card 2: PentaHydra Agency Technologies & Systems */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#110B13] to-[#0A0710] border border-rose-500/40 hover:border-rose-400 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <img
                  src="/Π (3).jpg"
                  alt="PentaHydra Agency Technologies & Systems"
                  referrerPolicy="no-referrer"
                  className="h-16 sm:h-20 w-auto max-w-[200px] object-contain rounded-lg border border-rose-500/30 bg-black/60 p-1.5 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/pentahydra-system-logo.jpg';
                  }}
                />
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-500/40 uppercase font-semibold">
                  AGENCY TECH
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-heading font-black text-white group-hover:text-rose-300 transition-colors">
                  PentaHydra
                </h3>
                <div className="text-xs font-mono font-bold text-rose-400 tracking-[0.2em] uppercase mt-0.5">
                  Agency Technologies & Systems
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {localize(lang, homeI18n.ecosystemSection.pentahydraDesc)}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="px-2 py-0.5 bg-slate-800 rounded">Edge AI (4ms)</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded">Digital Twins</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded">Cibersegurança OT</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('/pentahydra')}
                className="w-full py-2.5 px-4 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs font-mono font-semibold flex items-center justify-between border border-rose-500/40 cursor-pointer"
              >
                <span>{localize(lang, homeI18n.ecosystemSection.discoverPentahydra)}</span>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>

          {/* Card 3: Oxygen Ecosystem */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 via-[#07130F] to-[#040C09] border border-emerald-500/40 hover:border-emerald-400 transition-all flex flex-col justify-between group shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <OxygenLogo size="md" showSubtitle={false} showText={false} />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase">
                  ENVIRONMENTAL UNIT
                </span>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-emerald-300 transition-colors">
                  OXYGEN ECOSYSTEM
                </h3>
                <div className="text-xs font-mono text-emerald-300/80 tracking-wider">
                  ENVIRONMENT // ESG & RESTORATION
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {localize(lang, homeI18n.ecosystemSection.oxygenDesc)}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="px-2 py-0.5 bg-slate-800 rounded">PRAD Científico</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded">LiDAR Bio-Carbono</span>
                <span className="px-2 py-0.5 bg-slate-800 rounded">Ativos ESG</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('/oxygen-ecosystem')}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 text-xs font-mono font-semibold flex items-center justify-between border border-emerald-500/40 cursor-pointer"
              >
                <span>{localize(lang, homeI18n.ecosystemSection.discoverOxygen)}</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED REAL-WORLD PROJECTS (Section 5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {localize(lang, homeI18n.projectsSection.badge)}
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mt-1">
              {localize(lang, homeI18n.projectsSection.title)}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/projects')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{localize(lang, homeI18n.projectsSection.viewAll)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsData.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="rounded-xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/40">
                    {project.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 font-mono flex items-center justify-between">
                  <span>{project.industry}</span>
                  <span className="text-slate-400">{project.location.split(',')[0]}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {lang === 'pt' ? project.name : project.nameEn}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {lang === 'pt' ? project.challenge : project.challengeEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-mono text-emerald-400">
                    <span className="font-bold">{localize(lang, homeI18n.projectsSection.impactLabel)}</span>
                    {lang === 'pt' ? project.impact : project.impactEn}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SHOWCASES & LAB PREVIEW WITH LIVE INTERACTIVE TELEMETRY (Section 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 rounded-2xl bg-[#060910] border border-cyan-500/30 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>PENTAHYDRA INNOVATION LAB // LIVE TELEMETRY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
                {localize(lang, homeI18n.labSection.title)}
              </h2>
            </div>

            <button
              onClick={() => onNavigate('/showcases')}
              className="px-4 py-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono hover:bg-cyan-900 transition-colors cursor-pointer"
            >
              {localize(lang, homeI18n.labSection.openLab)}
            </button>
          </div>

          {/* Quick interactive live grid showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 items-center">
            <div className="space-y-4">
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                DEMO: MARITIME & PORT COMPUTER VISION
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {lang === 'pt'
                  ? 'Classificação Multimodal na Borda (Edge AI) para Portos Inteligentes'
                  : 'Edge AI Multimodal Computer Vision for Industrial Ports'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'pt'
                  ? 'Processamento autônomo com redes neurais convolucionais otimizadas via TensorRT para hardware industrial. O sistema inspeciona continuamente contêineres de cargas perigosas (IMO) e identifica resíduos ou manchas de óleo na água dos berços.'
                  : 'Autonomous inference with TensorRT-accelerated convolutional neural networks on ruggedized industrial hardware. Continuously inspects dangerous cargo containers (IMO) and detects water sheen or oil spills in active berths.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-lg font-mono font-bold text-cyan-300">3.8 ms</div>
                  <div className="text-[10px] text-slate-400">Latência Edge</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-lg font-mono font-bold text-emerald-400">99.4%</div>
                  <div className="text-[10px] text-slate-400">Precisão</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-lg font-mono font-bold text-white">60 FPS</div>
                  <div className="text-[10px] text-slate-400">Fluxo Tempo Real</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-lg font-mono font-bold text-rose-400">MARPOL</div>
                  <div className="text-[10px] text-slate-400">Certificado</div>
                </div>
              </div>
            </div>

            {/* Simulated Live Console HUD */}
            <div className="rounded-xl bg-black border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-500">
                <span>FEED: /dev/video0_harbor_berth_04</span>
                <span className="text-emerald-400">STATUS: ACTIVE INFERENCE</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-cyan-300/90">
                <div>[00:00:14.2] &gt; Frame 4820 captured | Resolution: 3840x2160</div>
                <div>[00:00:14.2] &gt; Model: PENTAHYDRA-PORT-V4.2 | Backend: TensorRT 10.1</div>
                <div>[00:00:14.3] &gt; Object 01: [IMO-CLASS-3 FLAMMABLE LIQUID] - Conf: 99.8%</div>
                <div>[00:00:14.3] &gt; Object 02: [WATER SURFACE WATER SHEEN: NEGATIVE]</div>
                <div>[00:00:14.4] &gt; Berth Mooring Bollard Stress: 142 kN (SAFE THRESHOLD)</div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span>ENCRYPTION: AES-256-GCM (OT ISOLATED)</span>
                <span>TELEMETRY RATE: 100 Hz</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-950 to-blue-950/60 border border-cyan-500/40 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
            {localize(lang, homeI18n.ctaSection.title)}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {localize(lang, homeI18n.ctaSection.subtitle)}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-8 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_-5px_rgba(6,182,212,0.5)] cursor-pointer"
            >
              {localize(lang, homeI18n.ctaSection.briefingCta)}
            </button>

            <button
              onClick={onOpenAI}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>{localize(lang, homeI18n.ctaSection.chatAiCta)}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
