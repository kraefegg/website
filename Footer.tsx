import React from 'react';
import { NavRoute, Language } from '../../types';
import { KraefeggLogo } from '../common/KraefeggLogo';
import { PentahydraEmblem } from '../common/PentahydraLogo';
import { OxygenLogo } from '../common/OxygenLogo';
import { ArrowUpRight, ShieldCheck, Mail, MapPin, Globe, Cpu, Leaf, Sun } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const industries: { name: string; nameEn: string; route: NavRoute }[] = [
    { name: 'Mineração & Geologia', nameEn: 'Mining & Geology', route: '/services/mining' },
    { name: 'Meio Ambiente & Restauração', nameEn: 'Environment & Restoration', route: '/services/environment' },
    { name: 'Energia & Transição', nameEn: 'Energy & Transition', route: '/services/energy' },
    { name: 'Florestal & Carbono', nameEn: 'Forestry & Carbon', route: '/services/forestry' },
    { name: 'Agricultura de Precisão', nameEn: 'Precision Agriculture', route: '/services/agriculture' },
    { name: 'Indústria 4.0 & Automação', nameEn: 'Industry 4.0 & Automation', route: '/services/industry' },
    { name: 'Infraestrutura Crítica', nameEn: 'Critical Infrastructure', route: '/services/infrastructure' },
    { name: 'Portos Inteligentes', nameEn: 'Smart Ports', route: '/services/ports-maritime' },
    { name: 'Marítimo & Batimetria', nameEn: 'Maritime & Bathymetry', route: '/services/ports-maritime' },
    { name: 'Offshore, Óleo & Gás', nameEn: 'Offshore Oil & Gas', route: '/services/offshore-oil-gas' },
    { name: 'Segurança Operacional', nameEn: 'Operational Safety', route: '/services/safety' },
    { name: 'Governança ESG & Métricas', nameEn: 'ESG Governance', route: '/services/esg' },
  ];

  const handleNav = (route: NavRoute) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030508] border-t border-white/[0.08] text-slate-400 overflow-hidden pt-16 pb-12">
      {/* Subtle background tech grid lines */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Upper Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/[0.06]">
          {/* Column 1: Institutional Brand Lockup */}
          <div className="lg:col-span-2 space-y-4">
            <KraefeggLogo variant="full" size="lg" />

            <p className="text-sm text-slate-300 max-w-md leading-relaxed pt-2">
              {lang === 'pt'
                ? 'A Kraefegg M.O. é uma organização profissional e tecnológica multidisciplinar que integra engenharia pesada, inteligência ambiental, transição energética, mineração, infraestrutura, operações marítimas, IA e sistemas digitais de alta confiabilidade.'
                : 'Kraefegg M.O. is a multidisciplinary professional and technology organization integrating heavy engineering, environmental intelligence, energy transition, mining, infrastructure, maritime operations, AI, and resilient digital systems.'}
            </p>

            {/* Global presence badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                Américas • Europa • Ásia
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                ISO / ESG Governance
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase mb-4">
              {lang === 'pt' ? 'NAVEGAÇÃO INSTITUCIONAL' : 'INSTITUTIONAL NAVIGATION'}
            </h3>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Início', labelEn: 'Home', route: '/' as NavRoute },
                { label: 'Institucional & Filosofia', labelEn: 'About & Philosophy', route: '/about' as NavRoute },
                { label: 'Serviços & Engenharia', labelEn: 'Services & Engineering', route: '/services' as NavRoute },
                { label: 'Projetos Realizados', labelEn: 'Projects Portfolio', route: '/projects' as NavRoute },
                { label: 'Showcases & Inovação', labelEn: 'Showcases & Innovation', route: '/showcases' as NavRoute },
                { label: 'Rede de Parceiros', labelEn: 'Partners Network', route: '/partners' as NavRoute },
                { label: 'Notícias & Insights', labelEn: 'News & Insights', route: '/news' as NavRoute },
                { label: 'Carreiras & Talentos', labelEn: 'Careers & Talent', route: '/careers' as NavRoute },
              ].map((item) => (
                <li key={item.route}>
                  <button
                    onClick={() => handleNav(item.route)}
                    className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'pt' ? item.label : item.labelEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dedicated Ecosystem Units */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase mb-4">
              {lang === 'pt' ? 'ECOSSISTEMAS DEDICADOS' : 'DEDICATED ECOSYSTEMS'}
            </h3>
            <div className="space-y-4 text-xs">
              {/* PentaHydra Unit */}
              <button
                onClick={() => handleNav('/pentahydra')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-rose-900/40 hover:border-rose-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <PentahydraEmblem size={32} />
                  <div>
                    <div className="font-bold text-white group-hover:text-rose-400 transition-colors">
                      PentaHydra
                    </div>
                    <div className="text-[10px] text-rose-400/90 font-mono tracking-wider uppercase">
                      Agency Technologies & Systems
                    </div>
                  </div>
                </div>
              </button>

              {/* Oxygen Unit */}
              <button
                onClick={() => handleNav('/oxygen-ecosystem')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-emerald-900/40 hover:border-emerald-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <OxygenLogo size="sm" showSubtitle={false} />
                  <div>
                    <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                      OXYGEN ECOSYSTEM
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Restoration • ESG • Carbon
                    </div>
                  </div>
                </div>
              </button>

              {/* Marketplace Unit */}
              <button
                onClick={() => handleNav('/marketplace')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-amber-900/40 hover:border-amber-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-amber-400 transition-colors">
                      MARKETPLACE
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Kraefegg & Aldo Solar
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Column 4: Key Industries */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-200 uppercase mb-4">
              {lang === 'pt' ? 'SETORES ATENDIDOS (12)' : 'INDUSTRIES SERVED (12)'}
            </h3>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-400">
              {industries.map((ind, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav(ind.route)}
                    className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-500/60" />
                    <span>{lang === 'pt' ? ind.name : ind.nameEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand Statement Banner */}
        <div className="py-8 border-b border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xl md:text-2xl font-heading font-black tracking-widest text-white">
              ENGINEERING. INTELLIGENCE. TECHNOLOGY. IMPACT.
            </div>
            <div className="text-xs font-mono text-cyan-400 mt-1">
              KRAEFEGG M.O. // MULTI OFFICE GLOBAL INSTITUTION
            </div>
          </div>

          <button
            onClick={() => handleNav('/contact')}
            className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 font-mono text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2"
          >
            <span>{lang === 'pt' ? 'INICIAR PROJETO CONOSCO' : 'INITIATE PROJECT WITH US'}</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* Lower Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} KRAEFEGG M.O. Multi Office. Todos os direitos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => handleNav('/legal/privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {lang === 'pt' ? 'Privacidade & LGPD' : 'Privacy & Data Protection'}
            </button>
            <button
              onClick={() => handleNav('/legal/terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {lang === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
            </button>
            <button
              onClick={() => handleNav('/legal/cookies')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {lang === 'pt' ? 'Políticas de Cookies' : 'Cookie Policy'}
            </button>
            <button
              onClick={() => handleNav('/trust')}
              className="hover:text-cyan-400 transition-colors cursor-pointer font-mono text-[11px]"
            >
              TRUST CENTER
            </button>
            <button
              onClick={() => handleNav('/policies')}
              className="hover:text-cyan-400 transition-colors cursor-pointer font-mono text-[11px]"
            >
              20 POLÍTICAS
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
