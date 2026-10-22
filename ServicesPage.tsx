import React, { useState } from 'react';
import { NavRoute, Language, ServiceCategory } from '../types';
import { servicesData } from '../data/servicesData';
import { 
  Search, Wrench, Leaf, Zap, Cpu, Factory, 
  Pickaxe, Trees, Sprout, Anchor, Compass, Building2, 
  ChevronRight, ArrowUpRight, CheckCircle2, Layers 
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
  initialCategory?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, lang, initialCategory = 'all' }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-5 h-5 text-cyan-400" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-rose-400" />;
      case 'Factory': return <Factory className="w-5 h-5 text-blue-400" />;
      case 'Pickaxe': return <Pickaxe className="w-5 h-5 text-orange-400" />;
      case 'Trees': return <Trees className="w-5 h-5 text-emerald-400" />;
      case 'Sprout': return <Sprout className="w-5 h-5 text-green-400" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-cyan-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-indigo-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-teal-400" />;
      default: return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredServices = servicesData.filter((svc) => {
    const matchesCategory = selectedCategory === 'all' || svc.id === selectedCategory;
    const q = searchQuery.toLowerCase();
    const title = (lang === 'pt' ? svc.title : svc.titleEn).toLowerCase();
    const desc = (lang === 'pt' ? svc.shortDescription : svc.shortDescriptionEn).toLowerCase();
    const disciplines = (lang === 'pt' ? svc.disciplines : svc.disciplinesEn).join(' ').toLowerCase();

    const matchesSearch = !q || title.includes(q) || desc.includes(q) || disciplines.includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span>MATRIZ DE CAPACIDADES TÉCNICAS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          {lang === 'pt'
            ? 'Serviços, Engenharia & Verticais Tecnológicas'
            : 'Services, Engineering & Technology Verticals'}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {lang === 'pt'
            ? 'Estruturamos nossas soluções em 11 áreas integradas. Da precisão de cálculo de estruturas pesadas e conformidade ambiental à inteligência artificial embarcada na borda operacional.'
            : 'We organize our operations across 11 integrated sectors. From high-load structural calculation and environmental compliance to operational edge artificial intelligence.'}
        </p>
      </div>

      {/* Marketplace Switcher: Serviços vs. Produtos: Equipamentos Solares (Aldo Solar) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-[#0a1226] to-slate-950 border-2 border-cyan-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40">
              PARCERIA OFICIAL ALDO SOLAR & KRAEFEGG M.O.
            </span>
            <h2 className="text-xl font-heading font-black text-white">
              {lang === 'pt' ? 'Marketplace: Serviços de Engenharia & Equipamentos Solares' : 'Marketplace: Engineering Services & Solar Equipment'}
            </h2>
            <p className="text-xs text-slate-300">
              {lang === 'pt'
                ? 'A Kraefegg M.O. presta serviços de engenharia e a Aldo Solar é fornecedora oficial de equipamentos fotovoltaicos para usinas solares, autossuficiência energética, data centers e produção de hidrogênio verde.'
                : 'Kraefegg M.O. provides engineering services and Aldo Solar is the official supplier of photovoltaic equipment for solar plants, energy self-sufficiency, data centers, and green hydrogen production.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('/services')}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold shadow-lg shadow-cyan-500/20"
            >
              1. {lang === 'pt' ? 'Serviços de Engenharia' : 'Engineering Services'}
            </button>
            <button
              onClick={() => onNavigate('/products')}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>2. {lang === 'pt' ? 'Produtos: Equipamentos Solares' : 'Products: Solar Equipment'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
          <span>Orçamentos e RFPs técnicos formalizados diretamente para: <strong className="text-cyan-300">kraefegg.mos3@gmail.com</strong></span>
          <span className="text-amber-400">Sem Exibição de Preço Público • Seleção & Ordem de Orçamento</span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Field */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'pt'
                  ? 'Buscar por disciplina (ex: MARPOL, InSAR, BESS)...'
                  : 'Search by discipline (e.g., MARPOL, InSAR, BESS)...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="text-xs font-mono text-slate-400 self-end md:self-center">
            {filteredServices.length} {lang === 'pt' ? 'verticais encontradas' : 'verticals found'}
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {lang === 'pt' ? 'TODAS AS 11 VERTICAIS' : 'ALL 11 VERTICALS'}
          </button>
          {servicesData.map((svc) => (
            <button
              key={svc.id}
              onClick={() => setSelectedCategory(svc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                selectedCategory === svc.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{lang === 'pt' ? svc.title.split(':')[0] : svc.titleEn.split(':')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredServices.map((service) => {
          const isExpanded = expandedService === service.id;
          const disciplines = lang === 'pt' ? service.disciplines : service.disciplinesEn;

          return (
            <div
              key={service.id}
              className="rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-[#080D18] border border-slate-800 hover:border-slate-700 transition-all p-6 sm:p-8 flex flex-col justify-between space-y-6 group shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
                    {getCategoryIcon(service.iconName)}
                  </div>

                  {service.highlightMetric && (
                    <div className="text-right">
                      <div className="text-lg font-heading font-black text-cyan-300">
                        {service.highlightMetric.value}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {lang === 'pt'
                          ? service.highlightMetric.label
                          : service.highlightMetric.labelEn}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {lang === 'pt' ? service.title : service.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    {lang === 'pt' ? service.shortDescription : service.shortDescriptionEn}
                  </p>
                </div>

                {/* Sub-disciplines List */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    {lang === 'pt' ? 'Disciplinas Integradas:' : 'Integrated Disciplines:'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                    {(isExpanded ? disciplines : disciplines.slice(0, 6)).map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>

                  {disciplines.length > 6 && (
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : service.id)}
                      className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 mt-1 cursor-pointer"
                    >
                      {isExpanded
                        ? (lang === 'pt' ? 'Recolher disciplinas' : 'Collapse disciplines')
                        : `+ ${disciplines.length - 6} ${lang === 'pt' ? 'outras disciplinas' : 'more disciplines'}`}
                    </button>
                  )}
                </div>

                {/* Tech stack badge strip */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-500 uppercase mb-1.5">
                    {lang === 'pt' ? 'Instrumentação & Tech Stack:' : 'Instrumentation & Tech Stack:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-[11px] font-mono text-slate-400">
                  {lang === 'pt' ? 'Atendimento: Corporativo & Industrial' : 'Service: Industrial & Enterprise'}
                </div>

                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-cyan-950 text-cyan-300 hover:text-white border border-slate-700 hover:border-cyan-500/50 text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === 'pt' ? 'Solicitar Proposta' : 'Request Proposal'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
