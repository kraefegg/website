import React, { useState, useRef, useEffect } from 'react';
import { NavRoute, Language } from '../../types';
import { KraefeggLogo } from '../common/KraefeggLogo';
import { PentahydraEmblem } from '../common/PentahydraLogo';
import { OxygenLogo } from '../common/OxygenLogo';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../data/translations';
import { 
  Menu, X, Globe, Bot, ChevronDown, ChevronRight,
  ExternalLink, Sparkles, Layers, ShieldCheck, 
  Cpu, Leaf, Building2, Check, Wrench, Zap, 
  Pickaxe, Trees, Sprout, Anchor, Factory, Lock, 
  FileText, AlertTriangle, RefreshCw, UserCheck, 
  Truck, ArrowUpRight, Compass, Users, Award, 
  HardHat, Radio, Satellite, Scale, KeyRound, Shield,
  Eye, Megaphone, Target, Sun, ShoppingCart
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

interface NavbarProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  lang: Language;
  onToggleLang?: () => void;
  onSelectLang?: (lang: Language) => void;
  onOpenAI: () => void;
  onOpenA11y?: () => void;
  onOpenTrafficAgent?: () => void;
}

type DropdownKey = 'company' | 'services' | 'marketplace' | 'pentahydra' | 'oxygen' | 'trust' | 'more' | null;

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  lang,
  onToggleLang,
  onSelectLang,
  onOpenAI,
  onOpenA11y,
  onOpenTrafficAgent,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const { totalItems } = useMarketplace();

  const langMenuRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const t = getTranslation(lang);
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Click outside and Escape key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectLanguage = (newLang: Language) => {
    if (onSelectLang) {
      onSelectLang(newLang);
    } else if (onToggleLang) {
      onToggleLang();
    }
    setLangDropdownOpen(false);
  };

  const handleLinkClick = (route: NavRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  // 12 Services Domains
  const serviceDomains = [
    // Column 1: Heavy Engineering & Infrastructure
    {
      group: lang === 'pt' ? 'Engenharia Pesada & Infraestrutura' : 'Heavy Engineering & Infrastructure',
      items: [
        {
          id: 'engineering',
          title: lang === 'pt' ? 'Engenharia Multidisciplinar' : 'Multidisciplinary Engineering',
          desc: lang === 'pt' ? 'Civil, mecânica, elétrica, naval, geológica' : 'Civil, mechanical, electrical, naval',
          icon: Wrench,
          route: '/services/engineering',
          color: 'text-cyan-400',
        },
        {
          id: 'industry',
          title: lang === 'pt' ? 'Indústria 4.0 & Automação' : 'Industry 4.0 & Automation',
          desc: lang === 'pt' ? 'Manutenção preditiva, vibração, robótica' : 'Predictive maintenance, vibration, robotics',
          icon: Factory,
          route: '/services/industry',
          color: 'text-blue-400',
        },
        {
          id: 'infrastructure',
          title: lang === 'pt' ? 'Infraestrutura Crítica' : 'Critical Infrastructure',
          desc: lang === 'pt' ? 'Pontes, túneis, rodovias, saneamento' : 'Bridges, tunnels, highways, sanitation',
          icon: Building2,
          route: '/services/infrastructure',
          color: 'text-teal-400',
        },
        {
          id: 'safety',
          title: lang === 'pt' ? 'Segurança Operacional' : 'Operational Safety',
          desc: lang === 'pt' ? 'Engenharia de segurança, HAZOP, NR/OSHA' : 'Safety engineering, HAZOP, OSHA',
          icon: HardHat,
          route: '/services/safety',
          color: 'text-amber-400',
        },
      ],
    },
    // Column 2: Earth Sciences, Environment & Agro
    {
      group: lang === 'pt' ? 'Geociências & Sustentabilidade' : 'Earth Sciences & Sustainability',
      items: [
        {
          id: 'environment',
          title: lang === 'pt' ? 'Meio Ambiente & Ecologia' : 'Environment & Ecology',
          desc: lang === 'pt' ? 'Licenciamento, perícia forense, PRAD' : 'Licensing, forensics, restoration',
          icon: Leaf,
          route: '/services/environment',
          color: 'text-emerald-400',
        },
        {
          id: 'mining',
          title: lang === 'pt' ? 'Mineração & Geomecânica' : 'Mining & Geomechanics',
          desc: lang === 'pt' ? 'Estabilidade de taludes, cavas, estéreis' : 'Slope stability, pit modeling, tailings',
          icon: Pickaxe,
          route: '/services/mining',
          color: 'text-orange-400',
        },
        {
          id: 'forestry',
          title: lang === 'pt' ? 'Silvicultura & Florestal' : 'Silviculture & Forestry',
          desc: lang === 'pt' ? 'Inventário contínuo, biomassa, satélite' : 'Inventory, biomass, satellite analytics',
          icon: Trees,
          route: '/services/forestry',
          color: 'text-green-400',
        },
        {
          id: 'agriculture',
          title: lang === 'pt' ? 'Agricultura de Precisão' : 'Precision Agriculture',
          desc: lang === 'pt' ? 'Drones multiespectrais, hídrico, solo' : 'Multispectral drones, water, soil',
          icon: Sprout,
          route: '/services/agriculture',
          color: 'text-lime-400',
        },
      ],
    },
    // Column 3: Maritime, Energy & Advanced Systems
    {
      group: lang === 'pt' ? 'Energia, Marítimo & Tecnologia' : 'Energy, Maritime & Technology',
      items: [
        {
          id: 'energy',
          title: lang === 'pt' ? 'Energia & Transição' : 'Energy & Transition',
          desc: lang === 'pt' ? 'Solar, BESS, microredes, Data Centers' : 'Solar, BESS, microgrids, Data Centers',
          icon: Zap,
          route: '/services/energy',
          color: 'text-yellow-400',
        },
        {
          id: 'ports-maritime',
          title: lang === 'pt' ? 'Portos & Operações Marítimas' : 'Ports & Maritime Operations',
          desc: lang === 'pt' ? 'Batimetria multifeixe, berços, dragagem' : 'Multibeam bathymetry, dredging, berths',
          icon: Anchor,
          route: '/services/ports-maritime',
          color: 'text-sky-400',
        },
        {
          id: 'offshore-oil-gas',
          title: lang === 'pt' ? 'Offshore, Óleo & Gás' : 'Offshore Oil & Gas',
          desc: lang === 'pt' ? 'FPSOs, integridade subsea, ATEX, sonar' : 'FPSOs, subsea integrity, ATEX, sonar',
          icon: Compass,
          route: '/services/offshore-oil-gas',
          color: 'text-indigo-400',
        },
        {
          id: 'technology',
          title: lang === 'pt' ? 'PentaHydra: Tecnologia & IA' : 'PentaHydra: Tech & AI',
          desc: lang === 'pt' ? 'IA física, gêmeos digitais, Edge AI' : 'Physical AI, digital twins, Edge AI',
          icon: Cpu,
          route: '/services/technology',
          color: 'text-rose-400',
        },
        {
          id: 'esg',
          title: lang === 'pt' ? 'Governança ESG & Métricas' : 'ESG Governance & Metrics',
          desc: lang === 'pt' ? 'Relatórios verificáveis, auditoria GRI' : 'Verifiable reporting, GRI auditing',
          icon: ShieldCheck,
          route: '/services/esg',
          color: 'text-emerald-400',
        },
      ],
    },
  ];

  // 9 PentaHydra Tech Areas
  const pentahydraAreas = [
    { label: lang === 'pt' ? 'Desenvolvimento Tecnológico Dedicado' : 'Dedicated Technology Development', route: '/pentahydra/technology-development' },
    { label: lang === 'pt' ? 'Inteligência Artificial Generativa Física' : 'Generative Physical AI', route: '/pentahydra/gen-ai' },
    { label: lang === 'pt' ? 'Engenharia de Dados em Tempo Real' : 'Real-Time Data Engineering', route: '/pentahydra/data' },
    { label: lang === 'pt' ? 'Cibersegurança Industrial OT/IT' : 'OT/IT Industrial Cybersecurity', route: '/pentahydra/cybersecurity' },
    { label: lang === 'pt' ? 'Engenharia de IA & MLOps' : 'AI Engineering & MLOps', route: '/pentahydra/ai-engineering' },
    { label: lang === 'pt' ? 'Sistemas Embarcados Resilientes' : 'Resilient Embedded Systems', route: '/pentahydra/embedded' },
    { label: lang === 'pt' ? 'IoT Industrial & Telemetria LoRaWAN' : 'Industrial IoT & Sensors', route: '/pentahydra/iot' },
    { label: lang === 'pt' ? 'Edge AI em Ambientes Hostis' : 'Edge AI in Harsh Environments', route: '/pentahydra/edge-ai' },
    { label: lang === 'pt' ? 'Automação & Gêmeos Digitais' : 'Digital Twins & Automation', route: '/pentahydra/automation' },
  ];

  // 6 Oxygen Ecosystem Areas
  const oxygenAreas = [
    { label: lang === 'pt' ? 'Perícia Forense & Inteligência Ambiental' : 'Environmental Intelligence & Forensics', route: '/oxygen/environmental-intelligence' },
    { label: lang === 'pt' ? 'PRAD & Restauração Ecológica Científica' : 'Ecological Restoration & PRAD', route: '/oxygen/restoration' },
    { label: lang === 'pt' ? 'Estratégia ESG & Métricas Verificáveis' : 'ESG Strategy & Verifiable Metrics', route: '/oxygen/esg' },
    { label: lang === 'pt' ? 'Inventário & Monitoramento de Biodiversidade' : 'Biodiversity Inventory & Telemetry', route: '/oxygen/biodiversity' },
    { label: lang === 'pt' ? 'Geração de Ativos de Bio-Carbono' : 'High-Integrity Bio-Carbon Assets', route: '/oxygen/carbon' },
    { label: lang === 'pt' ? 'Sensoriamento Orbital SAR & Drones LiDAR' : 'Continuous Orbital SAR Monitoring', route: '/oxygen/monitoring' },
  ];

  // 12 Trust Pillars
  const trustPillars = [
    { label: lang === 'pt' ? 'Proteção de Dados & LGPD' : 'Data Protection & LGPD', route: '/trust/data-protection', icon: Lock },
    { label: lang === 'pt' ? 'Segurança da Informação' : 'Information Security', route: '/trust/information-security', icon: FileText },
    { label: lang === 'pt' ? 'Cibersegurança Industrial OT' : 'Industrial Cybersecurity', route: '/trust/cybersecurity', icon: Shield },
    { label: lang === 'pt' ? 'Governança Ética de IA' : 'Ethical AI Governance', route: '/trust/ai-governance', icon: Cpu },
    { label: lang === 'pt' ? 'Código de Ética e Conduta' : 'Code of Ethics & Conduct', route: '/trust/ethics', icon: Scale },
    { label: lang === 'pt' ? 'Compliance & Integridade' : 'Compliance & Anti-Bribery', route: '/trust/compliance', icon: Check },
    { label: lang === 'pt' ? 'Políticas Anticorrupção' : 'Anti-Bribery Directives', route: '/trust/anti-bribery', icon: ShieldCheck },
    { label: lang === 'pt' ? 'Canal de Denúncias Seguro' : 'Whistleblowing Channel', route: '/trust/report', icon: AlertTriangle },
    { label: lang === 'pt' ? 'Continuidade Operacional & DR' : 'Business Continuity & DR', route: '/trust/business-continuity', icon: RefreshCw },
    { label: lang === 'pt' ? 'Gestão de Riscos Corporativos' : 'Enterprise Risk Management', route: '/trust/risk-management', icon: HardHat },
    { label: lang === 'pt' ? 'Responsabilidade Técnica & ARTs' : 'Professional Responsibility', route: '/trust/professional-responsibility', icon: UserCheck },
    { label: lang === 'pt' ? 'Governança de Fornecedores' : 'Supplier Chain Integrity', route: '/trust/suppliers', icon: Truck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#05070B]/95 backdrop-blur-xl relative">
      {/* Top micro-bar for institutional status and global reach */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1.5 border-b border-white/[0.04] text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            KRAEFEGG M.O. MULTI OFFICE GLOBAL NETWORK
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">
            {lang === 'pt'
              ? 'Engenharia • Tecnologia • Meio Ambiente • Inteligência Industrial'
              : 'Engineering • Technology • Environment • Industrial Intelligence'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Quality Navigation (Acessibilidade) */}
          {onOpenA11y && (
            <button
              onClick={onOpenA11y}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 hover:text-white transition-colors cursor-pointer text-[10px]"
              title="Acessibilidade & Navegação Assistida (Alt + A)"
            >
              <Eye className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'pt' ? 'ACESSIBILIDADE' : 'A11Y'}</span>
            </button>
          )}

          {/* Quick Paid Traffic & Growth Agent */}
          {onOpenTrafficAgent && (
            <button
              onClick={onOpenTrafficAgent}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-300 hover:text-white transition-colors cursor-pointer text-[10px]"
              title="Agente de Tráfego Pago & Campanhas (Alt + T)"
            >
              <Megaphone className="w-3 h-3 text-blue-400" />
              <span>{lang === 'pt' ? 'TRÁFEGO & ADS' : 'ADS AGENT'}</span>
            </button>
          )}

          <span className="text-slate-600">|</span>

          {/* 11 Languages Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 shadow-sm"
              aria-label="Select language"
            >
              <span className="text-xs">{currentLangObj.flag}</span>
              <span className="font-semibold text-cyan-300 text-xs font-mono">{currentLangObj.code.toUpperCase()}</span>
              <span className="text-slate-400 text-[10px] hidden sm:inline">({currentLangObj.nativeName})</span>
              <ChevronDown className="w-3 h-3 text-cyan-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-60 p-2 rounded-xl bg-[#090E17]/98 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl z-50 grid grid-cols-1 gap-1">
                <div className="text-[10px] font-mono text-cyan-400 px-2 py-1 uppercase tracking-wider border-b border-slate-800">
                  Select Language / Idioma (11)
                </div>
                <div className="max-h-64 overflow-y-auto space-y-0.5 pt-1">
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleSelectLanguage(l.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        lang === l.code
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-bold'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.nativeName}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div 
        ref={navContainerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative"
      >
        {/* Brand Logo Lockup */}
        <button
          onClick={() => handleLinkClick('/')}
          className="text-left cursor-pointer group transition-opacity hover:opacity-95 shrink-0"
          aria-label="Kraefegg M.O. Home"
        >
          <KraefeggLogo variant="horizontal" size="sm" className="sm:hidden" />
          <KraefeggLogo variant="horizontal" size="md" className="hidden sm:inline-flex" />
        </button>

        {/* Desktop Primary Navigation with Sophisticated Mega Menus */}
        <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1" role="menubar">
          {/* 1. HOME */}
          <button
            onClick={() => handleLinkClick('/')}
            className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-medium tracking-wide rounded-md transition-all cursor-pointer whitespace-nowrap ${
              currentRoute === '/'
                ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {t.nav.home}
          </button>

          {/* 2. COMPANY (Mega Dropdown) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'company' ? null : 'company')}
              aria-expanded={activeDropdown === 'company'}
              className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-semibold tracking-wide rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                ['/about', '/vision-mission', '/governance', '/leadership', '/corporate-structure', '/network', '/responsible-business', '/research'].includes(currentRoute) || activeDropdown === 'company'
                  ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{lang === 'pt' ? 'EMPRESA' : 'COMPANY'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform ${activeDropdown === 'company' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'company' && (
              <div 
                className="absolute top-full left-0 mt-2 w-[min(540px,90vw)] max-h-[82vh] overflow-y-auto p-5 rounded-2xl bg-[#080C16]/98 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'pt' ? 'Estrutura Institucional & Governança' : 'Corporate Architecture & Governance'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">KRAEFEGG M.O.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
                  {[
                    { title: lang === 'pt' ? 'Visão, Missão & Valores' : 'Vision, Mission & Values', desc: lang === 'pt' ? 'Princípios perenes e horizontes estratégicos' : 'Perennial principles & horizons', route: '/vision-mission', icon: Compass },
                    { title: lang === 'pt' ? 'Governança Corporativa' : 'Corporate Governance', desc: lang === 'pt' ? 'Comitês, compliance e conselhos' : 'Board oversight & compliance cycles', route: '/governance', icon: ShieldCheck },
                    { title: lang === 'pt' ? 'Liderança Executiva & Técnica' : 'Leadership & Directors', desc: lang === 'pt' ? 'Diretoria técnica multidisciplinar' : 'Executive & technical leads', route: '/leadership', icon: Users },
                    { title: lang === 'pt' ? 'Estrutura do Ecossistema' : 'Corporate Structure', desc: lang === 'pt' ? 'Holdings, unidades e subsidiárias' : 'Holdings & operational entities', route: '/corporate-structure', icon: Layers },
                    { title: lang === 'pt' ? 'Rede Global de Hubs' : 'Global Hubs Network', desc: lang === 'pt' ? 'Operações em Américas, Europa e Ásia' : 'Presence in Americas, Europe & Asia', route: '/network', icon: Globe },
                    { title: lang === 'pt' ? 'Sobre a Kraefegg M.O.' : 'About Kraefegg M.O.', desc: lang === 'pt' ? 'História, filosofia e rigor técnico' : 'Philosophy, origins & credentials', route: '/about', icon: Award },
                    { title: lang === 'pt' ? 'Negócios Responsáveis & ESG' : 'Responsible Business & ESG', desc: lang === 'pt' ? 'Compromissos climáticos e comunitários' : 'ESG commitments & stewardship', route: '/responsible-business', icon: Leaf },
                    { title: lang === 'pt' ? 'Pesquisa Aplicada & P&D' : 'Applied Research & R&D', desc: lang === 'pt' ? 'Laboratório de patentes e validação' : 'Patents & prototype validation', route: '/research', icon: Cpu },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.route}
                        onClick={() => handleLinkClick(item.route)}
                        className="text-left p-2.5 rounded-xl bg-slate-900/40 hover:bg-cyan-950/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all group cursor-pointer"
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 rounded-lg bg-slate-800/80 group-hover:bg-cyan-500/20 text-cyan-400 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-slate-400 line-clamp-1 leading-tight mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. SERVICES (12+ Domains Mega Grid - Positioned cleanly under navbar) */}
          <div 
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
              aria-expanded={activeDropdown === 'services'}
              className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-semibold tracking-wide rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentRoute.startsWith('/services') || activeDropdown === 'services'
                  ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{lang === 'pt' ? 'SERVIÇOS' : 'SERVICES'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'services' && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[min(920px,95vw)] max-h-[calc(100vh-120px)] overflow-y-auto p-6 rounded-2xl bg-[#080C16]/98 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    <Wrench className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'pt' ? 'Matriz Técnica: 12 Verticais de Engenharia & Operações' : 'Technical Matrix: 12 Engineering & Operations Verticals'}</span>
                  </div>
                  <button
                    onClick={() => handleLinkClick('/services')}
                    className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'pt' ? 'Ver Todos os Serviços' : 'Explore Full Matrix'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3 Thematic Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
                  {serviceDomains.map((group, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-1 font-bold">
                        {group.group}
                      </div>
                      <div className="space-y-1.5">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleLinkClick(item.route)}
                              className="w-full text-left p-2 rounded-lg bg-slate-900/30 hover:bg-slate-800/80 border border-slate-800/60 hover:border-cyan-500/40 transition-all group cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                                <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                                  {item.title}
                                </span>
                              </div>
                              <div className="text-[10px] text-slate-500 truncate pl-5">
                                {item.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Quick Callout Bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {lang === 'pt' ? 'Capacidade Técnica para Missões Críticas' : 'Mission-Critical Engineering Capacity'}
                  </span>
                  <button
                    onClick={() => handleLinkClick('/contact')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'pt' ? 'Solicitar Proposta Técnica' : 'Request Technical RFP'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. PROJECTS */}
          <button
            onClick={() => handleLinkClick('/projects')}
            className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-medium tracking-wide rounded-md transition-all cursor-pointer whitespace-nowrap ${
              currentRoute.startsWith('/projects')
                ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {t.nav.projects}
          </button>

          {/* 5. SHOWCASES */}
          <button
            onClick={() => handleLinkClick('/showcases')}
            className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-medium tracking-wide rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentRoute.startsWith('/showcases')
                ? 'text-rose-300 bg-rose-950/50 border border-rose-500/40 shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)] font-bold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>{t.nav.showcases}</span>
          </button>

          {/* 5.5 MARKETPLACE (Engineering & Equipment RFP Dropdown) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('marketplace')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'marketplace' ? null : 'marketplace')}
              aria-expanded={activeDropdown === 'marketplace'}
              className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-semibold tracking-wide rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentRoute.startsWith('/marketplace') || activeDropdown === 'marketplace'
                  ? 'text-amber-300 bg-amber-950/50 border border-amber-500/40 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)] font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>MARKETPLACE</span>
              <ChevronDown className={`w-3.5 h-3.5 text-amber-400 transition-transform ${activeDropdown === 'marketplace' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'marketplace' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[min(500px,90vw)] z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('marketplace')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-5 rounded-2xl bg-[#080C16]/98 border border-amber-500/40 shadow-2xl backdrop-blur-2xl space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>{lang === 'pt' ? 'Marketplace Oficial • Kraefegg M.O. & Aldo Solar' : 'Official Marketplace • Kraefegg & Aldo Solar'}</span>
                    </div>
                    <button
                      onClick={() => handleLinkClick('/marketplace')}
                      className="text-xs font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'pt' ? 'Ver Hub' : 'View Hub'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => handleLinkClick('/marketplace/servicos')}
                      className="text-left p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 transition-all group cursor-pointer space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                          {lang === 'pt' ? 'Serviços de Engenharia' : 'Engineering Services'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 leading-snug">
                        {lang === 'pt' ? '11 verticais: elétrico, civil, ART e homologação' : '11 verticals: electrical, civil, PE stamping, EVTE'}
                      </div>
                    </button>

                    <button
                      onClick={() => handleLinkClick('/marketplace/equipamentos')}
                      className="text-left p-3 rounded-xl bg-slate-900/60 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/40 transition-all group cursor-pointer space-y-1"
                    >
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white group-hover:text-amber-300">
                          {lang === 'pt' ? 'Equipamentos (Aldo Solar)' : 'Equipment (Aldo Solar)'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 leading-snug">
                        {lang === 'pt' ? 'Geradores solares, inversores e módulos bifaciais' : 'Solar generators, inverters and bifacial TOPCon modules'}
                      </div>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 text-[11px]">
                      {lang === 'pt' ? 'Sem preços públicos • Proposta por projeto' : 'No public pricing • Proposal per project'}
                    </span>
                    <button
                      onClick={() => handleLinkClick('/marketplace/cart')}
                      className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{lang === 'pt' ? 'Ordem de Cotação' : 'Quote Cart'} ({totalItems})</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6. PENTAHYDRA SYSTEMS (Tech Ecosystem Dropdown) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('pentahydra')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'pentahydra' ? null : 'pentahydra')}
              aria-expanded={activeDropdown === 'pentahydra'}
              className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-semibold tracking-wide rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentRoute.startsWith('/pentahydra') || activeDropdown === 'pentahydra'
                  ? 'text-rose-300 bg-rose-950/40 border border-rose-500/40'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <PentahydraEmblem size={18} />
              <span>PENTAHYDRA</span>
              <ChevronDown className={`w-3.5 h-3.5 text-rose-400 transition-transform ${activeDropdown === 'pentahydra' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'pentahydra' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[min(480px,90vw)] z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('pentahydra')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-5 rounded-2xl bg-[#080C16]/98 border border-rose-500/40 shadow-2xl backdrop-blur-2xl max-h-[80vh] overflow-y-auto">
                  {/* Header Lockup */}
                  <button
                    onClick={() => handleLinkClick('/pentahydra')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-rose-500/30 hover:border-rose-400/60 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <PentahydraEmblem size={28} />
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">
                          PentaHydra Agency
                        </div>
                        <div className="text-[10px] text-rose-400/90 font-mono tracking-wider uppercase">
                          Technologie & Systems
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-500/40 flex items-center gap-1">
                      <span>PORTAL</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </button>

                  <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase pt-3 pb-1 border-b border-slate-800">
                    {lang === 'pt' ? '9 Áreas Tecnológicas Integradas' : '9 Integrated Technology Areas'}
                  </div>

                  {/* 9 Tech Areas List */}
                  <div className="grid grid-cols-1 gap-1 pt-2">
                    {pentahydraAreas.map((area, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLinkClick(area.route)}
                        className="text-left px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-rose-950/40 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="group-hover:translate-x-1 transition-transform flex items-center gap-2 truncate">
                          <span className="w-1 h-1 rounded-full bg-rose-500/60 group-hover:bg-rose-400" />
                          {area.label}
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-rose-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 7. OXYGEN ECOSYSTEM (Eco Ecosystem Dropdown) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('oxygen')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'oxygen' ? null : 'oxygen')}
              aria-expanded={activeDropdown === 'oxygen'}
              className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-semibold tracking-wide rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentRoute.startsWith('/oxygen') || activeDropdown === 'oxygen'
                  ? 'text-emerald-300 bg-emerald-950/40 border border-emerald-500/40'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>OXYGEN</span>
              <ChevronDown className={`w-3.5 h-3.5 text-emerald-400 transition-transform ${activeDropdown === 'oxygen' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'oxygen' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[min(480px,90vw)] z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('oxygen')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-5 rounded-2xl bg-[#080C16]/98 border border-emerald-500/40 shadow-2xl backdrop-blur-2xl max-h-[80vh] overflow-y-auto">
                  {/* Header Lockup */}
                  <button
                    onClick={() => handleLinkClick('/oxygen-ecosystem')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-emerald-500/30 hover:border-emerald-400/60 transition-all text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <OxygenLogo size="sm" showSubtitle={false} showText={false} />
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors truncate">
                          OXYGEN ECOSYSTEM
                        </div>
                        <div className="text-[10px] text-emerald-400/90 font-mono tracking-wider uppercase truncate">
                          Restoration • ESG • Carbon Assetization
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1 shrink-0">
                      <span>PORTAL</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </button>

                  <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase pt-3 pb-1 border-b border-slate-800">
                    {lang === 'pt' ? '6 Áreas Ecológicas & Climáticas' : '6 Ecological & Climate Verticals'}
                  </div>

                  {/* 6 Eco Areas List */}
                  <div className="grid grid-cols-1 gap-1 pt-2">
                    {oxygenAreas.map((area, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLinkClick(area.route)}
                        className="text-left px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-emerald-950/40 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <span className="group-hover:translate-x-1 transition-transform flex items-center gap-2 truncate">
                          <span className="w-1 h-1 rounded-full bg-emerald-500/60 group-hover:bg-emerald-400" />
                          {area.label}
                        </span>
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 8. TRUST CENTER (Centered Mega Menu - Positioned cleanly under navbar) */}
          <div 
            onMouseEnter={() => handleMouseEnter('trust')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'trust' ? null : 'trust')}
              aria-expanded={activeDropdown === 'trust'}
              className={`px-2.5 2xl:px-3 py-1.5 text-[11px] 2xl:text-xs font-semibold tracking-wide rounded-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentRoute.startsWith('/trust') || currentRoute.startsWith('/policies') || currentRoute.startsWith('/legal') || currentRoute === '/security' || activeDropdown === 'trust'
                  ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>TRUST CENTER</span>
              <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform ${activeDropdown === 'trust' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'trust' && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[min(840px,95vw)] max-h-[calc(100vh-120px)] overflow-y-auto p-5 rounded-2xl bg-[#080C16]/98 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('trust')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'pt' ? 'Centro de Confiança, Integridade & Políticas Corporativas' : 'Trust Center, Integrity & Corporate Policies'}</span>
                  </div>
                  <button
                    onClick={() => handleLinkClick('/trust')}
                    className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'pt' ? 'Visão Geral do Trust Center' : 'Trust Center Overview'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4">
                  {/* Left Column: 12 Trust Pillars (Cols 7) */}
                  <div className="md:col-span-7 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      {lang === 'pt' ? '12 Pilares de Governança & Segurança' : '12 Governance & Security Pillars'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {trustPillars.map((p, idx) => {
                        const Icon = p.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(p.route)}
                            className="text-left p-2 rounded-lg bg-slate-900/30 hover:bg-cyan-950/40 border border-slate-800/60 hover:border-cyan-500/40 transition-colors flex items-center gap-2 group cursor-pointer"
                          >
                            <Icon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="text-[11px] text-slate-300 group-hover:text-white truncate">
                              {p.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Policies Repository & Legal Repos (Cols 5) */}
                  <div className="md:col-span-5 space-y-2 md:border-l border-slate-800 md:pl-4">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      {lang === 'pt' ? 'Repositório & Normas Formais' : 'Formal Repository & Policies'}
                    </div>

                    <div className="space-y-1.5">
                      {/* 20 Policies Card */}
                      <button
                        onClick={() => handleLinkClick('/policies')}
                        className="w-full text-left p-2.5 rounded-xl bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400/60 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-bold text-xs text-white group-hover:text-cyan-300">
                            {lang === 'pt' ? 'Repositório das 20 Políticas' : '20 Corporate Policies'}
                          </div>
                          <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/40">
                            20 DOCS
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {lang === 'pt' ? 'Políticas corporativas em conformidade com ISO' : 'ISO-compliant corporate policies repository'}
                        </div>
                      </button>

                      {/* Legal links */}
                      <div className="pt-1 space-y-1">
                        {[
                          { title: lang === 'pt' ? 'Controle Documental SGI' : 'IMS Document Control', route: '/policies/document-control' },
                          { title: lang === 'pt' ? 'Política de Privacidade' : 'Privacy Policy (LGPD)', route: '/legal/privacy' },
                          { title: lang === 'pt' ? 'Termos de Uso' : 'Terms of Use', route: '/legal/terms' },
                          { title: lang === 'pt' ? 'Gestão de Cookies' : 'Cookie Management', route: '/legal/cookies' },
                          { title: lang === 'pt' ? 'Propriedade Intelectual' : 'Intellectual Property', route: '/legal/intellectual-property' },
                          { title: lang === 'pt' ? 'Confidencialidade & Sigilo' : 'Non-Disclosure & Confidentiality', route: '/legal/confidentiality' },
                          { title: lang === 'pt' ? 'Padrões de Cibersegurança' : 'Security Standards', route: '/security' },
                        ].map((leg, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(leg.route)}
                            className="w-full text-left px-2 py-1 rounded text-[11px] font-mono text-slate-400 hover:text-cyan-300 hover:bg-slate-900/60 transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>{leg.title}</span>
                            <ChevronRight className="w-3 h-3 text-slate-600" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 9. MORE (Partners, News, Careers) */}
          <div 
            className="relative"
            onMouseEnter={() => handleMouseEnter('more')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
              aria-expanded={activeDropdown === 'more'}
              className={`px-2 2xl:px-2.5 py-1.5 text-[11px] 2xl:text-xs font-semibold tracking-wide rounded-md transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                ['/partners', '/news', '/careers'].includes(currentRoute) || activeDropdown === 'more'
                  ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span>{lang === 'pt' ? 'MAIS' : 'MORE'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'more' && (
              <div 
                className="absolute top-full right-0 mt-2 w-48 p-2 rounded-xl bg-[#080C16]/98 border border-slate-700/80 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseEnter={() => handleMouseEnter('more')}
                onMouseLeave={handleMouseLeave}
              >
                {[
                  { label: t.nav.partners, route: '/partners' },
                  { label: t.nav.news, route: '/news' },
                  { label: t.nav.careers, route: '/careers' },
                ].map((item) => (
                  <button
                    key={item.route}
                    onClick={() => handleLinkClick(item.route)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons: AI Assistant & Contact CTA (Visible only on xl+ screens) */}
        <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5 shrink-0">
          {/* Marketplace Cart Quick Button */}
          <button
            onClick={() => handleLinkClick('/marketplace/cart')}
            className={`flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap text-[11px] 2xl:text-xs font-mono font-medium ${
              totalItems > 0 
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)]'
                : 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-cyan-500/40 hover:text-white'
            }`}
            title="Ver Ordem de Cotação"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'pt' ? 'COTAÇÃO' : 'QUOTE CART'}</span>
            {totalItems > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/80 to-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white text-[11px] 2xl:text-xs font-mono font-medium transition-all shadow-[0_0_15px_-4px_rgba(6,182,212,0.35)] cursor-pointer whitespace-nowrap"
            title="Ask Kraefegg AI Assistant"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{t.nav.talkToAI}</span>
          </button>

          <button
            onClick={() => handleLinkClick('/contact')}
            className="px-3 2xl:px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-[11px] 2xl:text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_-3px_rgba(6,182,212,0.5)] cursor-pointer whitespace-nowrap"
          >
            {t.nav.startConversation}
          </button>
        </div>

        {/* Mobile Menu & Quick Lang Toggles */}
        <div className="flex xl:hidden items-center gap-2 shrink-0">
          {/* Quick Mobile Cart Button */}
          <button
            onClick={() => handleLinkClick('/marketplace/cart')}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-400 relative cursor-pointer"
            aria-label="Marketplace Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Quick Lang Switcher Mobile */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
              aria-label="Select Language"
            >
              <span>{currentLangObj.flag}</span>
              <span className="font-bold">{currentLangObj.code.toUpperCase()}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-xl bg-[#090E17]/98 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl z-50 grid grid-cols-1 gap-1">
                <div className="text-[10px] font-mono text-cyan-400 px-2 py-1 uppercase tracking-wider border-b border-slate-800">
                  Select Language / Idioma (11)
                </div>
                <div className="max-h-64 overflow-y-auto space-y-0.5 pt-1">
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleSelectLanguage(l.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        lang === l.code
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 font-bold'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm">{l.flag}</span>
                        <span>{l.nativeName}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenAI}
            className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Backdrop overlay for open mega dropdown */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 top-24 bg-black/50 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* Fully Responsive Mobile Menu Drawer with Accordions */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#070B14] border-b border-slate-800 px-5 py-6 space-y-5 max-h-[85vh] overflow-y-auto">
          {/* Assistive Toolbar in Mobile */}
          <div className="grid grid-cols-2 gap-2">
            {onOpenA11y && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenA11y();
                }}
                className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>ACESSIBILIDADE</span>
              </button>
            )}

            {onOpenTrafficAgent && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrafficAgent();
                }}
                className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-blue-300 font-mono text-xs font-bold flex items-center justify-center gap-2"
              >
                <Megaphone className="w-4 h-4 text-blue-400" />
                <span>TRÁFEGO & ADS</span>
              </button>
            )}
          </div>

          {/* Language Selection Grid (11 Languages) */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase">
              SELECIONE O IDIOMA / LANGUAGES (11)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleSelectLanguage(l.code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                    lang === l.code
                      ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span className="truncate">{l.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Core Links */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => handleLinkClick('/')}
              className={`p-2.5 rounded-lg text-xs font-bold text-center border ${
                currentRoute === '/' ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50' : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => handleLinkClick('/projects')}
              className={`p-2.5 rounded-lg text-xs font-bold text-center border ${
                currentRoute.startsWith('/projects') ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50' : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
            >
              PROJETOS
            </button>
            <button
              onClick={() => handleLinkClick('/showcases')}
              className={`p-2.5 rounded-lg text-xs font-bold text-center border ${
                currentRoute.startsWith('/showcases') ? 'bg-rose-950 text-rose-300 border-rose-500/50' : 'bg-slate-900 text-slate-300 border-slate-800'
              }`}
            >
              SHOWCASES
            </button>
          </div>

          {/* Mobile Marketplace Direct Block */}
          <div className="border border-amber-500/40 rounded-xl overflow-hidden bg-gradient-to-r from-amber-950/40 to-slate-900/60 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>MARKETPLACE OFICIAL</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-500/30">
                ALDO SOLAR
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => handleLinkClick('/marketplace/servicos')}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 hover:text-cyan-300 text-left cursor-pointer"
              >
                Serviços (11)
              </button>
              <button
                onClick={() => handleLinkClick('/marketplace/equipamentos')}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 hover:text-amber-300 text-left cursor-pointer"
              >
                Equipamentos
              </button>
              <button
                onClick={() => handleLinkClick('/marketplace')}
                className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 hover:text-white text-left cursor-pointer"
              >
                Hub Geral
              </button>
              <button
                onClick={() => handleLinkClick('/marketplace/cart')}
                className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 font-bold text-left flex items-center justify-between cursor-pointer"
              >
                <span>Ordem Cotação</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px]">{totalItems}</span>
              </button>
            </div>
          </div>

          {/* Accordion 1: Company */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
            <button
              onClick={() => toggleMobileAccordion('company')}
              className="w-full flex items-center justify-between p-3.5 text-xs font-mono font-bold text-slate-200 tracking-wider uppercase text-left"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'pt' ? 'EMPRESA & GOVERNANÇA' : 'COMPANY & GOVERNANCE'}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileAccordion === 'company' ? 'rotate-180' : ''}`} />
            </button>

            {mobileAccordion === 'company' && (
              <div className="p-3 bg-slate-950/80 border-t border-slate-800 space-y-1 text-xs">
                {[
                  { label: lang === 'pt' ? 'Visão, Missão & Valores' : 'Vision, Mission & Values', route: '/vision-mission' },
                  { label: lang === 'pt' ? 'Governança Corporativa' : 'Corporate Governance', route: '/governance' },
                  { label: lang === 'pt' ? 'Liderança Executiva & Técnica' : 'Leadership Structure', route: '/leadership' },
                  { label: lang === 'pt' ? 'Estrutura Societária' : 'Corporate Structure', route: '/corporate-structure' },
                  { label: lang === 'pt' ? 'Rede Global de Hubs' : 'Global Hubs Network', route: '/network' },
                  { label: lang === 'pt' ? 'Sobre a Kraefegg M.O.' : 'About Us', route: '/about' },
                  { label: lang === 'pt' ? 'Negócios Responsáveis & ESG' : 'Responsible Business', route: '/responsible-business' },
                  { label: lang === 'pt' ? 'Pesquisa Aplicada & P&D' : 'Applied Research', route: '/research' },
                ].map((item) => (
                  <button
                    key={item.route}
                    onClick={() => handleLinkClick(item.route)}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 2: Services (12+ Domains) */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
            <button
              onClick={() => toggleMobileAccordion('services')}
              className="w-full flex items-center justify-between p-3.5 text-xs font-mono font-bold text-slate-200 tracking-wider uppercase text-left"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'pt' ? 'SERVIÇOS (12 DOMÍNIOS)' : 'SERVICES (12 DOMAINS)'}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileAccordion === 'services' ? 'rotate-180' : ''}`} />
            </button>

            {mobileAccordion === 'services' && (
              <div className="p-3 bg-slate-950/80 border-t border-slate-800 space-y-1 text-xs">
                <button
                  onClick={() => handleLinkClick('/services')}
                  className="w-full text-left px-3 py-2 rounded-lg bg-cyan-950/50 text-cyan-300 font-bold mb-2 border border-cyan-500/30"
                >
                  {lang === 'pt' ? '→ Ver Matriz Completa de Serviços' : '→ View Complete Services Matrix'}
                </button>
                {[
                  { label: lang === 'pt' ? 'Engenharia Multidisciplinar' : 'Multidisciplinary Engineering', route: '/services/engineering' },
                  { label: lang === 'pt' ? 'Meio Ambiente & Biodiversidade' : 'Environment & Ecology', route: '/services/environment' },
                  { label: lang === 'pt' ? 'Energia & Transição' : 'Energy & Transition', route: '/services/energy' },
                  { label: lang === 'pt' ? 'PentaHydra: Tecnologia & IA' : 'Technology & AI', route: '/services/technology' },
                  { label: lang === 'pt' ? 'Mineração & Geomecânica' : 'Mining & Geomechanics', route: '/services/mining' },
                  { label: lang === 'pt' ? 'Silvicultura & Florestal' : 'Forestry & Silviculture', route: '/services/forestry' },
                  { label: lang === 'pt' ? 'Agricultura de Precisão' : 'Precision Agriculture', route: '/services/agriculture' },
                  { label: lang === 'pt' ? 'Indústria 4.0 & Automação' : 'Industry 4.0 & Automation', route: '/services/industry' },
                  { label: lang === 'pt' ? 'Infraestrutura Crítica' : 'Critical Infrastructure', route: '/services/infrastructure' },
                  { label: lang === 'pt' ? 'Portos & Operações Marítimas' : 'Ports & Maritime', route: '/services/ports-maritime' },
                  { label: lang === 'pt' ? 'Offshore, Óleo & Gás' : 'Offshore Oil & Gas', route: '/services/offshore-oil-gas' },
                  { label: lang === 'pt' ? 'Segurança Operacional' : 'Operational Safety', route: '/services/safety' },
                  { label: lang === 'pt' ? 'Governança ESG & Métricas' : 'ESG Governance', route: '/services/esg' },
                ].map((item) => (
                  <button
                    key={item.route}
                    onClick={() => handleLinkClick(item.route)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 3: PentaHydra Systems */}
          <div className="border border-rose-900/40 rounded-xl overflow-hidden bg-rose-950/20">
            <button
              onClick={() => toggleMobileAccordion('pentahydra')}
              className="w-full flex items-center justify-between p-3.5 text-xs font-mono font-bold text-rose-200 tracking-wider uppercase text-left"
            >
              <div className="flex items-center gap-2">
                <PentahydraEmblem size={20} />
                <span>PENTAHYDRA SYSTEMS (9 ÁREAS)</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-rose-400 transition-transform ${mobileAccordion === 'pentahydra' ? 'rotate-180' : ''}`} />
            </button>

            {mobileAccordion === 'pentahydra' && (
              <div className="p-3 bg-slate-950/80 border-t border-rose-900/40 space-y-1 text-xs">
                <button
                  onClick={() => handleLinkClick('/pentahydra')}
                  className="w-full text-left px-3 py-2 rounded-lg bg-rose-950/50 text-rose-300 font-bold mb-2 border border-rose-500/30"
                >
                  {lang === 'pt' ? '→ Portal PentaHydra Agency' : '→ PentaHydra Agency Portal'}
                </button>
                {pentahydraAreas.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(item.route)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:text-rose-300 hover:bg-slate-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 4: Oxygen Ecosystem */}
          <div className="border border-emerald-900/40 rounded-xl overflow-hidden bg-emerald-950/20">
            <button
              onClick={() => toggleMobileAccordion('oxygen')}
              className="w-full flex items-center justify-between p-3.5 text-xs font-mono font-bold text-emerald-200 tracking-wider uppercase text-left"
            >
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>OXYGEN ECOSYSTEM (6 ÁREAS)</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${mobileAccordion === 'oxygen' ? 'rotate-180' : ''}`} />
            </button>

            {mobileAccordion === 'oxygen' && (
              <div className="p-3 bg-slate-950/80 border-t border-emerald-900/40 space-y-1 text-xs">
                <button
                  onClick={() => handleLinkClick('/oxygen-ecosystem')}
                  className="w-full text-left px-3 py-2 rounded-lg bg-emerald-950/50 text-emerald-300 font-bold mb-2 border border-emerald-500/30"
                >
                  {lang === 'pt' ? '→ Portal Oxygen Ecosystem' : '→ Oxygen Ecosystem Portal'}
                </button>
                {oxygenAreas.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(item.route)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:text-emerald-300 hover:bg-slate-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 5: Trust Center & Policies */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
            <button
              onClick={() => toggleMobileAccordion('trust')}
              className="w-full flex items-center justify-between p-3.5 text-xs font-mono font-bold text-slate-200 tracking-wider uppercase text-left"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>TRUST CENTER & 20 POLÍTICAS</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileAccordion === 'trust' ? 'rotate-180' : ''}`} />
            </button>

            {mobileAccordion === 'trust' && (
              <div className="p-3 bg-slate-950/80 border-t border-slate-800 space-y-1 text-xs">
                <button
                  onClick={() => handleLinkClick('/trust')}
                  className="w-full text-left px-3 py-2 rounded-lg bg-cyan-950/50 text-cyan-300 font-bold border border-cyan-500/30 mb-1"
                >
                  {lang === 'pt' ? '→ Centro de Confiança & Segurança' : '→ Trust Center Overview'}
                </button>
                <button
                  onClick={() => handleLinkClick('/policies')}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-900 text-cyan-300 font-bold border border-slate-700 mb-2"
                >
                  {lang === 'pt' ? '→ Repositório de 20 Políticas Formais' : '→ 20 Formal Corporate Policies'}
                </button>
                {trustPillars.slice(0, 8).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLinkClick(item.route)}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Additional Institutional Links */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => handleLinkClick('/partners')}
              className="p-2 rounded-lg bg-slate-900 text-xs font-medium text-slate-300 text-center"
            >
              {t.nav.partners}
            </button>
            <button
              onClick={() => handleLinkClick('/news')}
              className="p-2 rounded-lg bg-slate-900 text-xs font-medium text-slate-300 text-center"
            >
              {t.nav.news}
            </button>
            <button
              onClick={() => handleLinkClick('/careers')}
              className="p-2 rounded-lg bg-slate-900 text-xs font-medium text-slate-300 text-center"
            >
              {t.nav.careers}
            </button>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('/contact')}
              className="w-full py-3 text-center rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_-3px_rgba(6,182,212,0.5)]"
            >
              {t.nav.startConversation}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
