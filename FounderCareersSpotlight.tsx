import React from 'react';
import { Award, CheckCircle, ExternalLink, Cpu, Shield, Database, Compass, Radio, Terminal, FileCode, Layers } from 'lucide-react';
import { Language } from '../../types';

interface FounderCareersSpotlightProps {
  lang: Language;
}

export const FounderCareersSpotlight: React.FC<FounderCareersSpotlightProps> = ({ lang }) => {
  const credentials = [
    { title: 'Gen-AI & AI Engineering', org: 'DIO / Cloud & LLMs', icon: Cpu },
    { title: 'Data Analytics & Graph Modeling', org: 'Neo4j / PostgreSQL', icon: Database },
    { title: 'Cybersecurity & Zero Trust', org: 'ISA/IEC 62443 / OT Security', icon: Shield },
    { title: 'Prompt Engineering & Guardrails', org: 'Deterministic Prompt Architecture', icon: Terminal },
    { title: 'Assisted-GenAI Backend Systems', org: 'Node.js / Python / Microservices', icon: FileCode },
    { title: 'Automation Systems Analyst', org: 'SENAI / PLCs & SCADA', icon: Radio },
    { title: 'Network Security Analyst', org: 'SENAI / Critical Infrastructures', icon: Shield },
    { title: 'Embedded Systems & Edge AI', org: 'HUB PNAAT / FIT Tecnologia', icon: Cpu },
    { title: 'Environmental Engineering & PRAD', org: 'CREA / Recuperação de Bacias', icon: Compass },
    { title: 'Environmental Forensics & Auditing', org: 'ASTM E1527-21 / Due Diligence', icon: Award },
    { title: 'Mining Drilling & Tailings Safety', org: 'Estabilidade & Dam Safety', icon: Layers },
    { title: 'Regulatory Impact Analysis', org: 'Conformidade ANEEL / ONS / ANM', icon: CheckCircle }
  ];

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-[#070A12] p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden">
      {/* Decorative accent light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Section Tag */}
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'pt' ? 'LIDERANÇA TÉCNICA INSTITUCIONAL' : 'TECHNICAL LEADERSHIP'}</span>
        </div>

        {/* Profile Card Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-900 p-0.5 shadow-lg shadow-cyan-500/10">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl sm:text-2xl font-heading font-black text-cyan-300">
                RA
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Railson Arruda
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                  CREA / Technical Lead
                </span>
              </div>
              <p className="text-sm font-mono text-cyan-300 mt-0.5">
                Founder & Technical Director | KRAEFEGG M.O.
              </p>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/railson-arruda/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            <span>linkedin.com/in/railson-arruda</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Professional Headline */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800/80">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            {lang === 'pt' ? 'Posicionamento & Headline Profissional' : 'Professional Positioning Headline'}
          </div>
          <p className="text-sm sm:text-base font-sans font-medium text-slate-200 leading-relaxed italic">
            &ldquo;Technical Director | ESG, Environmental & Energy Transition Advisory | Risk Management | Regulatory Compliance | Mining & Infrastructure | AI-Enabled Solutions & Prompt Engineering | GeoAI | Digital Systems & Data Analytics&rdquo;
          </p>
        </div>

        {/* Multidisciplinary Philosophy */}
        <div className="space-y-3">
          <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300">
            {lang === 'pt'
              ? 'A Filosofia de Convergência da Kraefegg'
              : 'The Kraefegg Multidisciplinary Convergence'}
          </h4>
          <p className="text-sm text-slate-400 font-sans leading-relaxed">
            {lang === 'pt'
              ? 'Na Kraefegg M.O. e PentaHydra Systems, não construímos IA e software desconectados do mundo físico. Nossa organização foi concebida na confluência de problemas reais de alta complexidade: descarbonização, usinas solares centralizadas, segurança de barragens de mineração, conformidade portuária MARPOL, recuperação hidrológica de bacias e cibersegurança de redes industriais críticas. Buscamos profissionais técnicos que queiram resolver desafios com rigor científico, código de qualidade e impacto tangível.'
              : 'At Kraefegg M.O. and PentaHydra Systems, we do not build AI or software detached from physical reality. Our organization was conceived at the confluence of high-complexity real-world challenges: decarbonization, utility-scale solar plants, mining dam safety, MARPOL seaport compliance, hydrological basin restoration, and industrial network cybersecurity. We look for technical professionals who want to tackle challenges with scientific rigor, high-quality code, and tangible impact.'}
          </p>
        </div>

        {/* Technical Domain Badges Grid */}
        <div className="pt-2">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">
            {lang === 'pt' ? 'Matriz de Domínios Técnicos & Certificações' : 'Technical Domains & Certifications Matrix'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {credentials.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{c.title}</div>
                    <div className="text-[10px] font-mono text-slate-400">{c.org}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
