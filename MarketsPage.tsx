import React, { useState, useEffect } from 'react';
import { NavRoute, Language, MarketId } from '../types';
import { strategicMarketsData } from '../data/marketsData';
import { projectsData } from '../data/projectsData';
import {
  Server, Atom, Flame, SunMedium, Activity, Anchor,
  CheckCircle2, ArrowUpRight, Calculator, ShieldCheck,
  ChevronRight, Layers, Sliders, Cpu, Leaf, Wrench, Building2,
  Calendar, FileText, Info, Award
} from 'lucide-react';

interface MarketsPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
  initialMarketId?: string;
}

export const MarketsPage: React.FC<MarketsPageProps> = ({
  onNavigate,
  lang,
  initialMarketId,
}) => {
  const [activeMarketId, setActiveMarketId] = useState<MarketId>('datacenter-solar');

  useEffect(() => {
    if (initialMarketId) {
      const found = strategicMarketsData.find(m => m.id === initialMarketId);
      if (found) {
        setActiveMarketId(found.id);
      }
    }
  }, [initialMarketId]);

  const activeMarket = strategicMarketsData.find(m => m.id === activeMarketId) || strategicMarketsData[0];

  // Interactive Calculator State
  const [calcValue, setCalcValue] = useState<number>(activeMarket.calculatorConfig.defaultValue);

  // Update calc value when market switches
  useEffect(() => {
    setCalcValue(activeMarket.calculatorConfig.defaultValue);
  }, [activeMarketId]);

  const getMarketIcon = (id: MarketId, className: string = 'w-5 h-5') => {
    switch (id) {
      case 'datacenter-solar':
        return <Server className={className} />;
      case 'green-hydrogen':
        return <Atom className={className} />;
      case 'biomethane':
        return <Flame className={className} />;
      case 'solar-plants':
        return <SunMedium className={className} />;
      case 'environmental-monitoring':
        return <Activity className={className} />;
      case 'ports-maritime':
        return <Anchor className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  // Associated Projects
  const linkedProjects = projectsData.filter(p => activeMarket.relatedProjectIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'pt' ? 'MERCADOS ESTRATÉGICOS INTEGRADOS' : 'INTEGRATED STRATEGIC MARKETS'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
          {lang === 'pt'
            ? 'Engenharia de Missão Crítica para os Grandes Mercados da Década'
            : 'Mission-Critical Engineering for the Decade’s Anchor Markets'}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {lang === 'pt'
            ? 'A convergência entre infraestrutura pesada, transição energética e inteligência biológica. Integramos projetos completos para Data Centers com usina solar dedicada, usinas de Hidrogênio Verde, Biometano agroindustrial, complexos solares fotovoltaicos, monitoramento ambiental contínuo e operações portuárias de águas profundas.'
            : 'The convergence of heavy infrastructure, energy transition, and ecological intelligence. We engineer turnkey solutions for solar-powered Data Centers, Green Hydrogen hubs, agroindustrial Biomethane, utility-scale Solar, continuous Environmental Telemetry, and Deep-Sea Port operations.'}
        </p>
      </div>

      {/* 6 Markets Selector Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            {lang === 'pt' ? 'Selecione o Mercado / Vertical Estratégica' : 'Select Market / Strategic Vertical'}
          </span>
          <span className="text-xs font-mono text-cyan-400">
            6 {lang === 'pt' ? 'Setores Estruturados' : 'Turnkey Sectors'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {strategicMarketsData.map((market) => {
            const isSelected = market.id === activeMarketId;
            return (
              <button
                key={market.id}
                onClick={() => setActiveMarketId(market.id)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/70 to-slate-900/90 border-cyan-500 shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-300" />
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}>
                      {getMarketIcon(market.id, 'w-4 h-4')}
                    </div>
                    <div>
                      <div className={`text-xs font-mono uppercase font-bold tracking-wider ${
                        isSelected ? 'text-cyan-400' : 'text-slate-400'
                      }`}>
                        {lang === 'pt' ? market.badge : market.badgeEn}
                      </div>
                      <h3 className={`text-sm font-bold mt-0.5 leading-snug ${
                        isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {lang === 'pt' ? market.shortTitle : market.shortTitleEn}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Market Main Feature Display */}
      <div className="rounded-2xl bg-gradient-to-b from-[#0B132B]/90 via-[#070B14] to-[#04060A] border border-cyan-500/30 overflow-hidden shadow-2xl space-y-10 p-6 sm:p-10">
        {/* Market Top Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              {getMarketIcon(activeMarket.id, 'w-3.5 h-3.5 text-cyan-400')}
              <span>{lang === 'pt' ? activeMarket.badge : activeMarket.badgeEn}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white leading-tight">
              {lang === 'pt' ? activeMarket.title : activeMarket.titleEn}
            </h2>

            <p className="text-sm sm:text-base text-cyan-200/90 font-mono font-medium leading-relaxed">
              {lang === 'pt' ? activeMarket.tagline : activeMarket.taglineEn}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'pt' ? activeMarket.fullOverview : activeMarket.fullOverviewEn}
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <span>{lang === 'pt' ? 'Solicitar Proposta Técnica / RFP' : 'Request Technical RFP'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('market-simulator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'pt' ? 'Simulador de Dimensionamento' : 'Sizing Simulator'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group">
              <img
                src={activeMarket.heroImage}
                alt={activeMarket.title}
                className="w-full h-72 sm:h-84 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between text-slate-300 font-mono text-[11px]">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ENGINEERING COMPLIANCE</span>
                  </span>
                  <span>KRAEFEGG M.O.</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {lang === 'pt' ? activeMarket.shortDescription : activeMarket.shortDescriptionEn}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Solutions Technical Breakdown */}
        <div className="space-y-4 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'pt' ? '4 Soluções de Engenharia Integrada' : '4 Integrated Engineering Solutions'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeMarket.coreSolutions.map((sol, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-[10px]">
                    0{idx + 1}
                  </span>
                  <span className="text-white text-sm font-bold group-hover:text-cyan-300 transition-colors">
                    {lang === 'pt' ? sol.title : sol.titleEn}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pl-7">
                  {lang === 'pt' ? sol.description : sol.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Sizing & ROI Calculator */}
        <div
          id="market-simulator"
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-950/30 via-slate-900/80 to-slate-950 border border-cyan-500/40 space-y-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {lang === 'pt' ? activeMarket.calculatorConfig.title : activeMarket.calculatorConfig.titleEn}
                </h3>
                <div className="text-xs font-mono text-cyan-400">
                  {lang === 'pt' ? 'Dimensionamento Preliminar Instantâneo' : 'Instant Sizing & Yield Model'}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 self-start sm:self-auto">
              ALGORITMO DE ENGENHARIA KRAEFEGG
            </span>
          </div>

          {/* Slider input */}
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-bold">
                {lang === 'pt' ? activeMarket.calculatorConfig.inputLabel : activeMarket.calculatorConfig.inputLabelEn}
              </span>
              <span className="text-cyan-300 font-bold text-sm bg-cyan-950/80 px-3 py-1 rounded border border-cyan-500/30">
                {calcValue} {activeMarket.calculatorConfig.unit}
              </span>
            </div>
            <input
              type="range"
              min={activeMarket.calculatorConfig.min}
              max={activeMarket.calculatorConfig.max}
              step={activeMarket.calculatorConfig.step}
              value={calcValue}
              onChange={(e) => setCalcValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Min: {activeMarket.calculatorConfig.min} {activeMarket.calculatorConfig.unit}</span>
              <span>Max: {activeMarket.calculatorConfig.max} {activeMarket.calculatorConfig.unit}</span>
            </div>
          </div>

          {/* 3 Calculated Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-1">
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                {lang === 'pt' ? activeMarket.calculatorConfig.output1Label : activeMarket.calculatorConfig.output1LabelEn}
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono">
                {activeMarket.calculatorConfig.output1Formula(calcValue)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-1">
              <div className="text-[10px] font-mono text-teal-400 uppercase font-bold tracking-wider">
                {lang === 'pt' ? activeMarket.calculatorConfig.output2Label : activeMarket.calculatorConfig.output2LabelEn}
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono">
                {activeMarket.calculatorConfig.output2Formula(calcValue)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                {lang === 'pt' ? activeMarket.calculatorConfig.output3Label : activeMarket.calculatorConfig.output3LabelEn}
              </div>
              <div className="text-base sm:text-lg font-bold text-emerald-300 font-mono">
                {activeMarket.calculatorConfig.output3Formula(calcValue)}
              </div>
            </div>
          </div>
        </div>

        {/* 4-Phase Implementation Engineering Roadmap */}
        <div className="space-y-5 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'pt' ? 'Roteiro de Implantação EPC: 4 Fases de Engenharia' : 'EPC Deployment Roadmap: 4 Engineering Phases'}</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              TURN-KEY DELIVERY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeMarket.engineeringPhases.map((phase) => (
              <div
                key={phase.phaseNumber}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center justify-center">
                      {phase.phaseNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                      {lang === 'pt' ? phase.duration : phase.durationEn}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2">
                    {lang === 'pt' ? phase.name : phase.nameEn}
                  </h4>
                  <ul className="space-y-1.5 pt-2">
                    {(lang === 'pt' ? phase.deliverables : phase.deliverablesEn).map((deliv, dIdx) => (
                      <li key={dIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specs & Regulatory Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800/80">
          {/* Left: Technical Specs Table */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'pt' ? 'Parâmetros Técnicos & SLAs de Engenharia' : 'Technical Benchmarks & Engineering SLAs'}</span>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60">
              <div className="divide-y divide-slate-800/80">
                {activeMarket.technicalSpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="p-3 sm:p-3.5 flex items-center justify-between text-xs gap-3">
                    <span className="text-slate-300 font-medium">
                      {lang === 'pt' ? spec.label : spec.labelEn}
                    </span>
                    <div className="text-right">
                      <div className="font-mono font-bold text-cyan-300">
                        {spec.value}
                      </div>
                      {spec.detail && (
                        <div className="text-[10px] text-slate-400">
                          {lang === 'pt' ? spec.detail : spec.detailEn}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Regulatory Compliance & Codes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'pt' ? 'Normas Regulatórias & Códigos Internacionais' : 'Regulatory Codes & Standards'}</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
              {activeMarket.regulatoryStandards.map((std, rIdx) => (
                <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="font-mono text-[11px]">{std}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tri-Pillar Synergy (Kraefegg + PentaHydra + Oxygen) */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'pt' ? 'Sinergia Integrada dos 3 Pilares Kraefegg' : 'Integrated 3-Pillar Kraefegg Synergy'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeMarket.synergies.map((syn, yIdx) => {
              const colorClasses = 
                syn.pillar === 'KRAEFEGG M.O.'
                  ? 'border-cyan-500/30 text-cyan-400'
                  : syn.pillar === 'PENTAHYDRA'
                  ? 'border-rose-500/30 text-rose-400'
                  : 'border-emerald-500/30 text-emerald-400';
              return (
                <div key={yIdx} className={`p-4 rounded-xl bg-slate-900/60 border ${colorClasses} space-y-2`}>
                  <div className="text-xs font-mono font-bold tracking-wider">
                    {syn.pillar}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {lang === 'pt' ? syn.contribution : syn.contributionEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Linked Flagship Projects / Case Studies */}
        {linkedProjects.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'pt' ? 'Projetos Emblemáticos Relacionados' : 'Related Flagship Projects'}</span>
              </div>
              <button
                onClick={() => onNavigate('/projects')}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>{lang === 'pt' ? 'Ver Todos os Projetos' : 'Explore All Projects'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {linkedProjects.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2 flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 font-bold">
                        {p.location}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {p.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {lang === 'pt' ? p.name : p.nameEn}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {lang === 'pt' ? p.solution : p.solutionEn}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs font-mono text-slate-400">
                    <span className="text-emerald-400 text-[11px] font-semibold line-clamp-1">
                      {lang === 'pt' ? p.impact : p.impactEn}
                    </span>
                    <button
                      onClick={() => onNavigate('/projects')}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                    >
                      <span>{lang === 'pt' ? 'Detalhes' : 'Case'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom RFP Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">
              {lang === 'pt'
                ? `Pronto para estruturar o seu projeto de ${activeMarket.shortTitle}?`
                : `Ready to structure your ${activeMarket.shortTitleEn} project?`}
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              {lang === 'pt'
                ? 'Nossos engenheiros chefes e especialistas de mercado analisam sua demanda técnica com confidencialidade (NDA) e elaboram a viabilidade preliminar.'
                : 'Our principal engineers and market specialists assess your technical requirements under strict NDA to formulate preliminary engineering feasibility.'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{lang === 'pt' ? 'Iniciar Consulta Técnica' : 'Start Technical Consultation'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
