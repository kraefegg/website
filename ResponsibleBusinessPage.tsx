import React from 'react';
import { Language, NavRoute } from '../types';
import { Leaf, Users, ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

interface ResponsibleBusinessPageProps {
  lang: Language;
  onNavigate: (route: NavRoute) => void;
}

export const ResponsibleBusinessPage: React.FC<ResponsibleBusinessPageProps> = ({ lang, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Leaf className="w-3.5 h-3.5" />
            <span>KRAEFEGG M.O. • ESG & RESPONSIBLE BUSINESS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
            {lang === 'pt' ? 'Negócios Responsáveis & Compromisso ESG' : 'Responsible Business & ESG Commitment'}
          </h1>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            {lang === 'pt'
              ? 'Como organização de engenharia e tecnologia, integramos sustentabilidade ambiental profunda, desenvolvimento humano ético e governança corporativa transparente em cada projeto.'
              : 'As an engineering and technology organization, we embed profound ecological sustainability, ethical human development, and transparent corporate governance across every project.'}
          </p>
        </div>

        {/* 3 Pillars: E - S - G */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* E - Environmental */}
          <div className="p-8 rounded-2xl bg-[#090E17] border border-emerald-500/30 space-y-6 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">PILAR AMBIENTAL</span>
              <h3 className="text-xl font-bold text-white font-heading mt-1">Meio Ambiente & Clima</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Restauração ecológica ativa (PRAD) e inventários de biodiversidade</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Gestão inteligente de bacias hidrográficas e efluentes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Eficiência energética e transição para matrizes renováveis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sensoriamento remoto contínuo para prevenção de desmatamento</span>
              </li>
            </ul>
          </div>

          {/* S - Social */}
          <div className="p-8 rounded-2xl bg-[#090E17] border border-blue-500/30 space-y-6 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block">PILAR SOCIAL</span>
              <h3 className="text-xl font-bold text-white font-heading mt-1">Pessoas & Segurança</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Segurança ocupacional com risco zero em operações industriais</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Desenvolvimento profissional contínuo em engenharia de ponta</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Respeito estrito aos direitos humanos na cadeia de fornecimento</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Engajamento transparente com comunidades lindeiras a obras</span>
              </li>
            </ul>
          </div>

          {/* G - Governance */}
          <div className="p-8 rounded-2xl bg-[#090E17] border border-cyan-500/30 space-y-6 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">PILAR GOVERNANÇA</span>
              <h3 className="text-xl font-bold text-white font-heading mt-1">Integridade & Dados</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Código de ética e compliance anticorrupção inegociável</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Segurança da informação e privacidade de dados (LGPD)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Supervisão humana compulsória sobre algoritmos de IA</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Trilhas de auditoria documental e pericial completas</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA to Trust Center */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white font-heading">
              {lang === 'pt' ? 'Deseja auditar nossas políticas formais?' : 'Want to review our formal policies?'}
            </h4>
            <p className="text-xs text-slate-400">
              Acesse o Centro de Confiança para verificar diretrizes de segurança, privacidade e código de ética.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/trust')}
            className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all shrink-0 cursor-pointer"
          >
            Acessar Trust Center
          </button>
        </div>
      </div>
    </div>
  );
};
