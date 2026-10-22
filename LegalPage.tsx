import React, { useState } from 'react';
import { Language, NavRoute } from '../types';
import { Scale, Lock, FileText, Cookie, Shield, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LegalPageProps {
  lang: Language;
  onNavigate: (route: NavRoute) => void;
  section?: 'privacy' | 'terms' | 'cookies' | 'intellectual-property' | 'confidentiality' | 'security';
}

export const LegalPage: React.FC<LegalPageProps> = ({ lang, onNavigate, section = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<string>(section);

  React.useEffect(() => {
    if (section) {
      setActiveTab(section);
    }
  }, [section]);

  const tabs = [
    { id: 'privacy', label: lang === 'pt' ? 'Política de Privacidade' : 'Privacy Policy', icon: Lock },
    { id: 'terms', label: lang === 'pt' ? 'Termos de Uso' : 'Terms of Use', icon: FileText },
    { id: 'cookies', label: lang === 'pt' ? 'Gestão de Cookies' : 'Cookie Policy', icon: Cookie },
    { id: 'intellectual-property', label: lang === 'pt' ? 'Propriedade Intelectual' : 'Intellectual Property', icon: Scale },
    { id: 'confidentiality', label: lang === 'pt' ? 'Confidencialidade & Sigilo' : 'Confidentiality', icon: KeyRound },
    { id: 'security', label: lang === 'pt' ? 'Divulgação de Segurança' : 'Security Disclosure', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Scale className="w-3.5 h-3.5" />
            <span>KRAEFEGG M.O. • LEGAL & COMPLIANCE REPOSITORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
            {lang === 'pt' ? 'Termos Legais, Privacidade & Segurança' : 'Legal Terms, Privacy & Security'}
          </h1>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            {lang === 'pt'
              ? 'Documentação jurídica, diretrizes de privacidade de dados em conformidade com a LGPD (Lei 13.709/2018), termos de uso dos portais institucionais e programa de divulgação responsável de segurança.'
              : 'Official legal documentation, LGPD data protection compliance terms, website terms of service, and responsible security disclosure guidelines.'}
          </p>
        </div>

        {/* Tab Selection */}
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

        {/* Active Tab Panel */}
        <div className="bg-[#090E17] border border-white/[0.08] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-6">
          {activeTab === 'privacy' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white font-heading">
                  {lang === 'pt' ? 'Política de Privacidade e Proteção de Dados Pessoais (LGPD)' : 'Privacy Policy (LGPD Compliance)'}
                </h2>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-1 rounded">VIGÊNCIA: 2026</span>
              </div>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading">1. Compromisso Institucional</h3>
                <p>
                  A Kraefegg M.O. reconhece a importância fundamental da privacidade e da proteção de dados pessoais. Esta política descreve como tratamos as informações coletadas através de nossos formulários de contato, portais de demonstração e telemetrias operacionais, em observância irrestrita à Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading">2. Dados Coletados e Finalidade</h3>
                <p>
                  Coletamos exclusivamente os dados necessários para o atendimento técnico e comercial de projetos corporativos: nome, e-mail corporativo, telefone, empresa e escopo de interesse. Não comercializamos, compartilhamos ou monetizamos dados pessoais com terceiros sob qualquer hipótese.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white font-heading">3. Direitos do Titular</h3>
                <p>
                  Conforme o Art. 18 da LGPD, você possui o direito de solicitar a qualquer momento a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou a revogação do consentimento através do canal oficial: <strong className="text-cyan-400 font-mono">legal@kraefegg.com</strong> ou <strong className="text-cyan-400 font-mono">admin@kraefegg.com</strong>.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white font-heading">Termos e Condições de Uso</h2>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-1 rounded">V2.4</span>
              </div>

              <p>
                Ao acessar e utilizar as páginas e demonstrações interativas da Kraefegg M.O., você concorda em cumprir estes Termos de Uso. O conteúdo, demonstrações conceituais e ferramentas computacionais disponibilizadas têm finalidade estritamente institucional e técnica.
              </p>
              <p>
                Demonstrações assinaladas como <strong className="text-amber-400 font-mono">PROTOTYPE</strong> ou <strong className="text-amber-400 font-mono">CONCEPT</strong> destinam-se à avaliação de viabilidade técnica e não constituem garantias comerciais de performance sem homologação contratual prévia.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white font-heading">Gestão de Cookies & Armazenamento Local</h2>
              </div>
              <p>
                Utilizamos cookies estritamente necessários para a navegação segura, memorização da preferência de idioma (Português/Inglês) e persistência de sessões seguras. Não empregamos rastreadores invasivos de terceiros para publicidade direcionada.
              </p>
            </div>
          )}

          {activeTab === 'intellectual-property' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white font-heading">Propriedade Intelectual & Marcas</h2>
              </div>
              <p>
                Os logotipos, marcas nominais, esquemas de circuitos, designs visuais, códigos-fonte e materiais técnicos de <strong className="text-white">KRAEFEGG M.O.</strong>, <strong className="text-white">PentaHydra Systems</strong> e <strong className="text-white">Oxygen Ecosystem</strong> são ativos intelectuais protegidos pela legislação brasileira e convenções internacionais de propriedade industrial.
              </p>
            </div>
          )}

          {activeTab === 'confidentiality' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white font-heading">Confidencialidade por Concepção (Confidentiality by Design)</h2>
              </div>
              <p>
                Todas as informações fornecidas por parceiros e contratantes para estudos de viabilidade, inventários ambientais periciais, modelos de mina ou plantas fabris são tratadas com sigilo estrito e salvaguardadas por Acordos de Não Divulgação (NDA) formais.
              </p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold text-white font-heading">Programa de Divulgação Responsável de Segurança (Vulnerability Disclosure)</h2>
              </div>
              <p>
                Valorizamos a contribuição de pesquisadores de segurança. Caso identifique qualquer vulnerabilidade em nossos sistemas web ou APIs públicas, solicitamos que nos comunique imediatamente através de <strong className="text-cyan-400 font-mono">security@kraefegg.com</strong> antes de qualquer divulgação pública, para que possamos atuar na mitigação rápida.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
