import React, { useState } from 'react';
import { NavRoute, Language, ProjectCategory } from '../types';
import { projectsData } from '../data/projectsData';
import { Search, Filter, ArrowUpRight, MapPin, Cpu, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, lang }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const categories: { key: ProjectCategory; label: string; labelEn: string }[] = [
    { key: 'ALL', label: 'TODOS', labelEn: 'ALL' },
    { key: 'ENGINEERING', label: 'ENGENHARIA', labelEn: 'ENGINEERING' },
    { key: 'ENVIRONMENT', label: 'MEIO AMBIENTE', labelEn: 'ENVIRONMENT' },
    { key: 'ENERGY', label: 'ENERGIA', labelEn: 'ENERGY' },
    { key: 'MINING', label: 'MINERAÇÃO', labelEn: 'MINING' },
    { key: 'MARITIME', label: 'MARÍTIMO & PORTOS', labelEn: 'MARITIME & PORTS' },
    { key: 'TECHNOLOGY', label: 'TECNOLOGIA & IA', labelEn: 'TECHNOLOGY & AI' },
    { key: 'INDUSTRY', label: 'INDÚSTRIA 4.0', labelEn: 'INDUSTRY 4.0' },
    { key: 'AGRO', label: 'AGRONEGÓCIO', labelEn: 'AGRIBUSINESS' },
    { key: 'FORESTRY', label: 'FLORESTAL', labelEn: 'FORESTRY' },
  ];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCat = activeCategory === 'ALL' || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const name = (lang === 'pt' ? p.name : p.nameEn).toLowerCase();
    const challenge = (lang === 'pt' ? p.challenge : p.challengeEn).toLowerCase();
    const loc = p.location.toLowerCase();
    const tech = p.technology.join(' ').toLowerCase();

    const matchesQuery = !q || name.includes(q) || challenge.includes(q) || loc.includes(q) || tech.includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span>PORTFÓLIO DE PROJETOS & CASOS REAIS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white">
          {lang === 'pt'
            ? 'Operações, Casos de Estudo & Demonstrações'
            : 'Operations, Case Studies & Deployments'}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {lang === 'pt'
            ? 'Conheça o impacto mensurável de nossas soluções multidisciplinares em portos marítimos, bacias hidrográficas, minas remotas e infraestrutura de alta criticidade.'
            : 'Explore the measurable impact of our multidisciplinary solutions across seaports, river basins, remote mines, and critical infrastructure.'}
        </p>
      </div>

      {/* LIVE PLATFORMS SPOTLIGHT BANNER */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>PORTFÓLIO OPERACIONAL • SISTEMAS EM PRODUÇÃO LIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              {lang === 'pt' ? 'Plataformas & Observatórios em Tempo Real' : 'Real-Time Platforms & Observatories'}
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
            Ambientes Ativos de Produção & Demonstração Técnica
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Oxygen Earth OS */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#04100D] via-slate-950 to-[#02070A] border-2 border-emerald-500/40 p-6 shadow-xl space-y-4 group hover:border-emerald-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE PLATFORM</span>
              </span>
              <span className="text-xs font-mono text-slate-400">oxygen-earth-os.base44.app</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-heading font-bold text-white group-hover:text-emerald-300 transition-colors">
                Oxygen Ecosystem — Earth OS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sistema operacional planetário para monitoramento ecológico contínuo, MRV científico de carbono, modelagem de biomassa florestal e inteligência de regeneração de biomas.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">Sentinel Satellites</span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">Bioacústica IA</span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">MRV Auditável</span>
              </div>

              <a
                href="https://oxygen-earth-os.base44.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-600/20 cursor-pointer shrink-0"
              >
                <span>Acessar Plataforma</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. SmartPortos Brasil */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#040C16] via-slate-950 to-[#02050A] border-2 border-cyan-500/40 p-6 shadow-xl space-y-4 group hover:border-cyan-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-[11px] font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>LIVE PLATFORM</span>
              </span>
              <span className="text-xs font-mono text-slate-400">smart-portos-brasil.base44.app</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                SmartPortos Brasil
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Plataforma de inteligência portuária integrada para conformidade com normas MARPOL, vigilância ambiental de baías, telemetria oceanográfica multiparamétrica e rastreabilidade AIS.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">Normas MARPOL</span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">Edge Vision</span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">AIS Tracker</span>
              </div>

              <a
                href="https://smart-portos-brasil.base44.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-600/20 cursor-pointer shrink-0"
              >
                <span>Acessar Plataforma</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3. AIO·OBSERVATORY Caraúbas–PB */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#120B04] via-slate-950 to-[#0A0502] border-2 border-amber-500/40 p-6 shadow-xl space-y-4 group hover:border-amber-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>LIVE OBSERVATORY</span>
              </span>
              <span className="text-xs font-mono text-slate-400">kraefegg.github.io/AIO-Observatory</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-heading font-bold text-white group-hover:text-amber-300 transition-colors">
                AIO·OBSERVATORY — PRAD Caraúbas–PB (5,73 km²)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Observatório de sensoriamento remoto multiespectral e modelagem GeoAI aplicado à recuperação de áreas degradadas (PRAD) na Caatinga paraibana, abrangendo 5,73 km² de semiárido.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">5,73 km² Caatinga</span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">NDVI / NDRE</span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">GeoAI</span>
              </div>

              <a
                href="https://kraefegg.github.io/AIO-Observatory/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-amber-600/20 cursor-pointer shrink-0"
              >
                <span>Abrir Observatório</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 4. 1AQUAH2 SCADA Industrial */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#10040A] via-slate-950 to-[#070204] border-2 border-rose-500/40 p-6 shadow-xl space-y-4 group hover:border-rose-400 transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-[11px] font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>SCADA INDUSTRIAL</span>
              </span>
              <span className="text-xs font-mono text-slate-400">kraefegg.github.io/1aquah2-scada</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-heading font-bold text-white group-hover:text-rose-300 transition-colors">
                1AQUAH2 — SCADA Industrial H₂ Verde & SWRO
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Plataforma SCADA industrial completa para produção de H₂ verde via eletrolisador PEM e dessalinização SWRO — com motor de inteligência artificial embarcado. Zero dependências. Executável nativamente via <code className="bg-black px-1.5 py-0.5 rounded text-rose-300 font-mono">python3 run.py</code>.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">PEM Electrolyzer</span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800">SWRO Desal</span>
                <span className="bg-black/50 px-2 py-0.5 rounded border border-slate-800 text-rose-300">python3 run.py</span>
              </div>

              <a
                href="https://kraefegg.github.io/1aquah2-scada/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-rose-600/20 cursor-pointer shrink-0"
              >
                <span>Acessar SCADA Live</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'pt'
                  ? 'Buscar por localidade, tecnologia ou desafio...'
                  : 'Search by location, technology, or challenge...'
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="text-xs font-mono text-slate-400">
            {filteredProjects.length} {lang === 'pt' ? 'operações catalogadas' : 'cataloged operations'}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lang === 'pt' ? cat.label : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-[#070B14] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
          >
            {/* Project Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-black/60" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                    project.badge === 'REAL PROJECT'
                      ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50'
                      : project.badge === 'CASE STUDY'
                      ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/50'
                      : 'bg-rose-950/90 text-rose-300 border border-rose-500/50'
                  }`}
                >
                  {project.badge}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate max-w-[180px]">{project.location}</span>
                </span>
                <span className="text-[11px] text-slate-400">{project.industry}</span>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {lang === 'pt' ? project.name : project.nameEn}
                </h3>

                {/* Challenge & Solution */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-mono text-rose-400 font-semibold block uppercase text-[10px]">
                      {lang === 'pt' ? 'DESAFIO TÉCNICO:' : 'TECHNICAL CHALLENGE:'}
                    </span>
                    <p className="text-slate-400 leading-relaxed line-clamp-3">
                      {lang === 'pt' ? project.challenge : project.challengeEn}
                    </p>
                  </div>

                  <div className="pt-1">
                    <span className="font-mono text-cyan-400 font-semibold block uppercase text-[10px]">
                      {lang === 'pt' ? 'SOLUÇÃO INTEGRADA:' : 'INTEGRATED SOLUTION:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed line-clamp-3">
                      {lang === 'pt' ? project.solution : project.solutionEn}
                    </p>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap gap-1">
                  {project.technology.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact Banner & Live Link */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs text-emerald-300 font-mono">
                  <div className="font-bold uppercase text-[10px] text-emerald-400 mb-0.5">
                    {lang === 'pt' ? 'IMPACTO COMPROVADO:' : 'PROVEN IMPACT:'}
                  </div>
                  <div>{lang === 'pt' ? project.impact : project.impactEn}</div>
                </div>

                {project.liveUrl && (
                  <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                    {project.runCommand && (
                      <span className="text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-1 rounded border border-slate-800">
                        {project.runCommand}
                      </span>
                    )}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-colors shadow-md ml-auto"
                    >
                      <span>Acessar Sistema Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
