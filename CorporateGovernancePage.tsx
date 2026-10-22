import React, { useState } from 'react';
import { Language, NavRoute } from '../types';
import { 
  Building2, Compass, Award, Users, Globe2, ShieldCheck, 
  ArrowRight, CheckCircle2, ChevronRight, Layers, Cpu, Leaf, Linkedin, Mail, Phone
} from 'lucide-react';
import { PentahydraEmblem } from '../components/common/PentahydraLogo';
import { OxygenLogo } from '../components/common/OxygenLogo';
import { FounderLeadershipProfile } from '../components/institutional/FounderLeadershipProfile';

interface CorporateGovernancePageProps {
  lang: Language;
  onNavigate: (route: NavRoute) => void;
  section?: 'vision-mission' | 'governance' | 'leadership' | 'corporate-structure' | 'network';
}

export const CorporateGovernancePage: React.FC<CorporateGovernancePageProps> = ({ 
  lang, 
  onNavigate, 
  section = 'governance' 
}) => {
  const [activeTab, setActiveTab] = useState<string>(section);

  React.useEffect(() => {
    if (section) {
      setActiveTab(section);
    }
  }, [section]);

  const tabs = [
    { id: 'vision-mission', label: lang === 'pt' ? 'Visão, Missão & Valores' : 'Vision, Mission & Values', icon: Compass },
    { id: 'governance', label: lang === 'pt' ? 'Governança Corporativa' : 'Corporate Governance', icon: ShieldCheck },
    { id: 'leadership', label: lang === 'pt' ? 'Liderança Executiva & Técnica' : 'Leadership Structure', icon: Users },
    { id: 'corporate-structure', label: lang === 'pt' ? 'Estrutura do Ecossistema' : 'Corporate Structure', icon: Layers },
    { id: 'network', label: lang === 'pt' ? 'Rede Global de Hubs' : 'Global Hubs Network', icon: Globe2 },
  ];

  const strategicPrinciples = [
    { title: 'Excelência Técnica', titleEn: 'Technical Excellence', desc: 'Rigor matemático, normas técnicas e validação empírica em todos os projetos.' },
    { title: 'Integridade Inegociável', titleEn: 'Non-Negotiable Integrity', desc: 'A integridade faz parte da engenharia. Rastreabilidade documental completa.' },
    { title: 'Inovação Aplicada', titleEn: 'Applied Innovation', desc: 'P&D voltado a resolver complexidades físicas reais com tecnologia escalável.' },
    { title: 'Responsabilidade Ambiental', titleEn: 'Environmental Responsibility', desc: 'Engenharia regenerativa e monitoramento pericial de biomas e recursos hídricos.' },
    { title: 'Segurança por Concepção', titleEn: 'Security by Design', desc: 'Resiliência cibernética e operacional intrínseca a cada linha de código e circuito.' },
    { title: 'Supervisão Humana de IA', titleEn: 'Human Oversight of AI', desc: 'A IA potencializa o perito humano; responsabilidade profissional qualificada.' },
    { title: 'Decisões Baseadas em Evidências', titleEn: 'Evidence-Based Decisions', desc: 'Modelagem analítica respaldada por telemetria fidedigna e dados reais.' },
    { title: 'Geração de Valor de Longo Prazo', titleEn: 'Long-Term Value Creation', desc: 'Soluções sustentáveis que perpassam ciclos econômicos com perenidade.' },
  ];

  const governanceCycle = [
    { step: '01', title: 'GOVERNANCE', desc: 'Diretrizes do Conselho & Políticas Corporativas' },
    { step: '02', title: 'RISK', desc: 'Matriz de Riscos Físicos, Digitais e Regulatórios' },
    { step: '03', title: 'CONTROL', desc: 'Protocolos de Segurança, RBAC & Segregação' },
    { step: '04', title: 'EXECUTION', desc: 'Engenharia de Campo, Sistemas & Algoritmos' },
    { step: '05', title: 'MONITORING', desc: 'Auditorias Técnicas, Telemetria & Indicadores' },
    { step: '06', title: 'IMPROVEMENT', desc: 'Revisão Contínua, Atualização de Padrões' },
  ];

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Building2 className="w-3.5 h-3.5" />
            <span>KRAEFEGG M.O. MULTI OFFICE • CORPORATE GOVERNANCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
            {lang === 'pt' ? 'Governança, Visão & Estrutura' : 'Governance, Vision & Structure'}
          </h1>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            {lang === 'pt'
              ? 'Estrutura institucional, pilares estratégicos de integridade e a articulação entre as unidades especializadas Kraefegg M.O., PentaHydra Systems e Oxygen Ecosystem.'
              : 'Institutional architecture, strategic integrity principles, and operational synergy between Kraefegg M.O., PentaHydra Systems, and Oxygen Ecosystem.'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Content */}
        <div className="bg-[#090E17] border border-white/[0.08] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
          {/* TAB 1: VISION, MISSION & PRINCIPLES */}
          {activeTab === 'vision-mission' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 sm:p-8 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-4">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">MISSÃO INSTITUCIONAL</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    {lang === 'pt' ? 'Engenharia e Inteligência para Sistemas Reais' : 'Engineering & Intelligence for Real-World Systems'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {lang === 'pt'
                      ? 'Integrar engenharia multidisciplinar, inteligência artificial avançada, telemetria de precisão e governança socioambiental para resolver os desafios operacionais e ecológicos mais complexos da indústria, energia, infraestrutura e sustentabilidade planetária.'
                      : 'Integrate multidisciplinary engineering, advanced artificial intelligence, precision telemetry, and ESG governance to resolve the most complex industrial and ecological challenges across infrastructure, energy, and planetary sustainability.'}
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-xl bg-slate-900/60 border border-emerald-500/30 space-y-4">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">VISÃO DE FUTURO</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                    {lang === 'pt' ? 'Liderança Global em Inteligência Industrial e Ambiental' : 'Global Leadership in Industrial & Environmental Intelligence'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {lang === 'pt'
                      ? 'Ser a autoridade técnica de referência internacional em soluções de engenharia conectada e inteligência ambiental, consolidando ecossistemas onde o avanço produtivo e a regeneração de biomas coexistem com métricas auditáveis e perenes.'
                      : 'To stand as the international benchmark in connected engineering and environmental intelligence, anchoring ecosystems where productive acceleration and ecological regeneration coexist with verified, audit-proof metrics.'}
                  </p>
                </div>
              </div>

              {/* Strategic Principles Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-heading">
                  {lang === 'pt' ? '8 Princípios Estratégicos e Técnicos' : '8 Strategic & Technical Principles'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {strategicPrinciples.map((sp, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
                      <span className="text-[10px] font-mono text-cyan-400">P-0{idx + 1}</span>
                      <h4 className="font-bold text-sm text-white">{lang === 'pt' ? sp.title : sp.titleEn}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{sp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOVERNANCE CYCLE */}
          {activeTab === 'governance' && (
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white font-heading">
                  {lang === 'pt' ? 'Ciclo de Governança, Risco & Controle' : 'Governance, Risk & Control Lifecycle'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'pt'
                    ? 'Nosso modelo de gestão é estruturado em seis estágios contínuos que garantem conformidade técnica, segurança cibernética e validação pericial em cada fase de execução.'
                    : 'Our operational governance is structured into six continuous stages ensuring technical compliance, cyber resilience, and certified validation at every execution milestone.'}
                </p>
              </div>

              {/* Diagram */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {governanceCycle.map((g, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-cyan-500/20 text-center space-y-2 relative">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                      FASE {g.step}
                    </span>
                    <div className="font-bold text-sm text-white font-heading">{g.title}</div>
                    <div className="text-[11px] text-slate-400 leading-tight">{g.desc}</div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-white font-mono uppercase tracking-wider text-cyan-400">
                  {lang === 'pt' ? 'Comitês Estruturados de Controle' : 'Structured Governance Committees'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-3 bg-slate-950 rounded border border-slate-800">
                    <div className="font-bold text-white mb-1">Comitê de Ética & Integridade</div>
                    <div className="text-slate-400 text-[11px]">Supervisão do canal de denúncias, políticas anticorrupção e conflitos de interesse.</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800">
                    <div className="font-bold text-white mb-1">Comitê Técnico & IA Responsável</div>
                    <div className="text-slate-400 text-[11px]">Homologação de modelos preditivos, segurança de dados industriais e ARTs de engenharia.</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800">
                    <div className="font-bold text-white mb-1">Comitê de Sustentabilidade & ESG</div>
                    <div className="text-slate-400 text-[11px]">Auditoria de métricas ambientais, projetos PRAD e conformidade regulatória.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEADERSHIP */}
          {activeTab === 'leadership' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-heading">
                  {lang === 'pt' ? 'Quadro de Liderança Executiva & Técnica' : 'Executive & Technical Leadership'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {lang === 'pt'
                    ? 'Corpo diretivo e coordenações setoriais responsáveis pela precisão técnica dos projetos globais da Kraefegg M.O.'
                    : 'Executive council and sector leads responsible for engineering precision across Kraefegg M.O. global operations.'}
                </p>
              </div>

              {/* Comprehensive Founder & Technical Director Institutional Profile */}
              <FounderLeadershipProfile lang={lang} />

              {/* Technical Leadership Architecture */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">DIRETORIA TÉCNICA</span>
                  <div className="font-bold text-sm text-white">Engenharia & Infraestrutura</div>
                  <p className="text-xs text-slate-400">Validação estrutural, civil, elétrica, mecânica e homologação pericial de campo.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-rose-400 uppercase">PENTAHYDRA SYSTEMS</span>
                  <div className="font-bold text-sm text-white">Tecnologia & IA Industrial</div>
                  <p className="text-xs text-slate-400">Arquitetura de dados, sistemas de edge computing, cibersegurança OT e automação.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">OXYGEN ECOSYSTEM</span>
                  <div className="font-bold text-sm text-white">Engenharia Ambiental & ESG</div>
                  <p className="text-xs text-slate-400">Projetos de PRAD, sensoriamento remoto via satélite, inventários de carbono e biomas.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 uppercase">GOVERNANÇA & JURÍDICO</span>
                  <div className="font-bold text-sm text-white">Compliance & Riscos</div>
                  <p className="text-xs text-slate-400">Gestão normativa, integridade contratual, proteção de dados e auditoria regulatória.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CORPORATE STRUCTURE */}
          {activeTab === 'corporate-structure' && (
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h3 className="text-xl font-bold text-white font-heading">
                  {lang === 'pt' ? 'Arquitetura do Ecossistema Kraefegg' : 'Kraefegg Ecosystem Architecture'}
                </h3>
                <p className="text-xs text-slate-400">
                  Três pilares integrados compondo uma organização multidisciplinar singular.
                </p>
              </div>

              {/* Visual 3 Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-400">
                      MO
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">KRAEFEGG M.O.</div>
                      <div className="text-[10px] text-cyan-400 font-mono">ORGANIZAÇÃO CENTRAL</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Consultoria técnica de alto impacto, projetos de engenharia, mineração, energia, portos, marinha e infraestrutura industrial complexa.
                  </p>
                  <button onClick={() => onNavigate('/services')} className="text-xs font-mono text-cyan-400 flex items-center gap-1 hover:underline">
                    <span>Ver Catálogo de Serviços</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/80 border border-rose-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <PentahydraEmblem size={40} />
                    <div>
                      <div className="font-bold text-white text-base">PentaHydra</div>
                      <div className="text-[10px] text-rose-400 font-mono">Agency Technologies & Systems</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Braço de tecnologia avançada: inteligência artificial generativa e preditiva, engenharia de dados, IoT industrial, edge computing e cibersegurança.
                  </p>
                  <button onClick={() => onNavigate('/pentahydra')} className="text-xs font-mono text-rose-400 flex items-center gap-1 hover:underline">
                    <span>Explorar PentaHydra</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-4">
                  <div className="flex items-center gap-3">
                    <OxygenLogo size="sm" showSubtitle={false} />
                    <div>
                      <div className="font-bold text-white text-base">OXYGEN ECOSYSTEM</div>
                      <div className="text-[10px] text-emerald-400 font-mono">INTEUGÊNCIA AMBIENTAL & ESG</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Plataforma de inteligência ecológica: sensoriamento remoto, restauração florestal (PRAD), monitoramento hídrico, inventários de carbono e valor sustentável.
                  </p>
                  <button onClick={() => onNavigate('/oxygen-ecosystem')} className="text-xs font-mono text-emerald-400 flex items-center gap-1 hover:underline">
                    <span>Explorar Oxygen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: GLOBAL NETWORK */}
          {activeTab === 'network' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white font-heading">
                  {lang === 'pt' ? 'Rede Global de Hubs Operacionais' : 'Global Operational Hubs Network'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {lang === 'pt'
                    ? 'Articulação descentralizada para suporte a operações industriais, logísticas e ambientais internacionais.'
                    : 'Decentralized presence providing continuous support for industrial, maritime, and environmental operations.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">Hub Américas</h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">BRASIL / ESTRATÉGICO</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Sede operacional para projetos de engenharia industrial, mineração, agronegócio de precisão e recuperação ambiental de biomas.
                  </p>
                  <div className="text-[11px] font-mono text-slate-500">
                    Cidades de referência: Brasília / Paraíba / São Paulo
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">Hub Europa</h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">P&D / PARCERIAS</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Articulação de pesquisa tecnológica, regulamentação ambiental internacional e parcerias em automação industrial e transição energética.
                  </p>
                  <div className="text-[11px] font-mono text-slate-500">
                    Conexões: Alemanha / Holanda / Suécia
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">Hub Ásia-Pacífico</h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">HARDWARE / EMBARCADOS</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Prototipagem de sistemas embarcados, fornecimento de componentes de telemetria e colaboração em logística portuária inteligente.
                  </p>
                  <div className="text-[11px] font-mono text-slate-500">
                    Conexões: Japão / Singapura / Coréia do Sul
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
