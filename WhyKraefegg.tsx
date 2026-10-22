import React from 'react';
import { Cpu, Compass, Globe, Users, ArrowUpRight, Zap, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

interface WhyKraefeggProps {
  lang: Language;
}

export const WhyKraefegg: React.FC<WhyKraefeggProps> = ({ lang }) => {
  const pillars = [
    {
      title: 'PENTAHYDRA SYSTEMS',
      subtitle: lang === 'pt' ? 'Inteligência Ciberfísica & Software' : 'Cyber-Physical Intelligence & Software',
      icon: Cpu,
      color: 'from-cyan-500/20 to-sky-500/5',
      borderColor: 'border-cyan-500/30',
      tagColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800',
      description: lang === 'pt'
        ? 'Desenvolva agentes de IA autônomos, sistemas embarcados de borda com baixa latência, arquiteturas de grafos e cibersegurança industrial para infraestruturas críticas.'
        : 'Engineer autonomous AI agents, low-latency edge embedded systems, knowledge graph architectures, and industrial OT cybersecurity for critical infrastructures.'
    },
    {
      title: 'ENGINEERING & PHYSICAL ASSETS',
      subtitle: lang === 'pt' ? 'Mundo Físico & Transição Energética' : 'Physical World & Energy Transition',
      icon: Compass,
      color: 'from-amber-500/20 to-orange-500/5',
      borderColor: 'border-amber-500/30',
      tagColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
      description: lang === 'pt'
        ? 'Resolva problemas geotécnicos complexos, segurança de barragens de mineração, usinas solares centralizadas com BESS e engenharia naval para portos descarbonizados.'
        : 'Solve complex geotechnical challenges, mining dam safety, utility-scale solar PV with BESS, and naval engineering for decarbonized deep-water ports.'
    },
    {
      title: 'OXYGEN ECOSYSTEM & PRAD',
      subtitle: lang === 'pt' ? 'Inteligência Planetária & MRV' : 'Planetary Intelligence & MRV',
      icon: Globe,
      color: 'from-emerald-500/20 to-teal-500/5',
      borderColor: 'border-emerald-500/30',
      tagColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800',
      description: lang === 'pt'
        ? 'Tecnologias de observação da Terra (GeoAI), contenção de voçorocas, inventários de carbono florestal auditáveis e monitoramento contínuo de bacias hidrográficas.'
        : 'Earth observation technologies (GeoAI), gully erosion stabilization, auditable forest carbon inventories, and continuous watershed telemetry.'
    },
    {
      title: 'MULTIDISCIPLINARY NETWORK',
      subtitle: lang === 'pt' ? 'Além do Código Convencional' : 'Beyond Conventional Code',
      icon: Users,
      color: 'from-purple-500/20 to-indigo-500/5',
      borderColor: 'border-purple-500/30',
      tagColor: 'text-purple-400 bg-purple-950/60 border-purple-800',
      description: lang === 'pt'
        ? 'Não contratamos apenas programadores tradicionais: unimos Engenheiros, Cientistas de Dados, Peritos Ambientais, Pesquisadores de Borda e Especialistas de Campo.'
        : 'We do not recruit only traditional developers: we unite Engineers, Data Scientists, Environmental Forensics Auditors, Edge Researchers, and Field Specialists.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
            {lang === 'pt' ? 'POR QUE A KRAEFEGG?' : 'WHY KRAEFEGG?'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            {lang === 'pt' ? 'Engenharia. Inteligência. Tecnologia. Impacto.' : 'Engineering. Intelligence. Technology. Impact.'}
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400 max-w-md">
          {lang === 'pt'
            ? 'Uma cultura construída para pessoas técnicas que prosperam onde o software encontra o mundo físico.'
            : 'A culture built for technical minds that thrive where software meets the physical world.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl border ${p.borderColor} bg-gradient-to-br ${p.color} p-6 sm:p-7 relative overflow-hidden transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`px-2.5 py-1 rounded text-[10px] font-mono border uppercase tracking-wider font-semibold ${p.tagColor}`}>
                  {p.title}
                </span>
              </div>

              <h3 className="text-lg font-heading font-bold text-white mb-2">
                {p.subtitle}
              </h3>
              <p className="text-sm font-sans text-slate-300 leading-relaxed">
                {p.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
