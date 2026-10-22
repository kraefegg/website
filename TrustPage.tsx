import React, { useState } from 'react';
import { Language, NavRoute } from '../types';
import { 
  ShieldCheck, Lock, Cpu, Eye, FileText, AlertTriangle, 
  RefreshCw, CheckCircle2, UserCheck, Truck, Scale, ShieldAlert,
  ArrowRight, Search, Download, ExternalLink, HelpCircle
} from 'lucide-react';

interface TrustPageProps {
  lang: Language;
  onNavigate: (route: NavRoute) => void;
  subSection?: string;
}

export const TrustPage: React.FC<TrustPageProps> = ({ lang, onNavigate, subSection = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<string>(subSection || 'overview');
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    if (subSection) {
      setActiveTab(subSection);
    }
  }, [subSection]);

  const pillars = [
    { id: 'overview', title: lang === 'pt' ? 'Visão Geral' : 'Overview', icon: ShieldCheck },
    { id: 'data-protection', title: lang === 'pt' ? 'Proteção de Dados & LGPD' : 'Data Protection', icon: Lock },
    { id: 'information-security', title: lang === 'pt' ? 'Segurança da Informação' : 'Information Security', icon: FileText },
    { id: 'cybersecurity', title: lang === 'pt' ? 'Cibersegurança Industrial' : 'Cybersecurity', icon: ShieldAlert },
    { id: 'ai-governance', title: lang === 'pt' ? 'Governança de IA' : 'AI Governance', icon: Cpu },
    { id: 'ethics', title: lang === 'pt' ? 'Código de Ética' : 'Code of Ethics', icon: Scale },
    { id: 'compliance', title: lang === 'pt' ? 'Compliance & Integridade' : 'Compliance & Integrity', icon: CheckCircle2 },
    { id: 'anti-bribery', title: lang === 'pt' ? 'Anticorrupção' : 'Anti-Bribery', icon: ShieldCheck },
    { id: 'business-continuity', title: lang === 'pt' ? 'Continuidade de Negócios' : 'Business Continuity', icon: RefreshCw },
    { id: 'risk-management', title: lang === 'pt' ? 'Gestão de Riscos' : 'Risk Management', icon: ShieldAlert },
    { id: 'professional-responsibility', title: lang === 'pt' ? 'Responsabilidade Técnica' : 'Technical Responsibility', icon: UserCheck },
    { id: 'suppliers', title: lang === 'pt' ? 'Governança de Fornecedores' : 'Supplier Governance', icon: Truck },
    { id: 'report', title: lang === 'pt' ? 'Canal de Denúncias' : 'Reporting Channel', icon: AlertTriangle },
  ];

  const trustStatus = [
    { name: lang === 'pt' ? 'Governança de Dados (LGPD/GDPR)' : 'Data Governance (LGPD/GDPR)', status: 'IMPLEMENTED', badge: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30' },
    { name: lang === 'pt' ? 'Princípios de IA Responsável & Supervisão Humana' : 'Responsible AI & Human Oversight', status: 'IMPLEMENTED', badge: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30' },
    { name: lang === 'pt' ? 'Criptografia em Repouso & Trânsito (AES-256 / TLS 1.3)' : 'Encryption at Rest & Transit (AES-256 / TLS 1.3)', status: 'IMPLEMENTED', badge: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30' },
    { name: lang === 'pt' ? 'Framework de Continuidade Operacional & DR' : 'Business Continuity & DR Framework', status: 'CONTINUOUS IMPROVEMENT', badge: 'bg-blue-950/80 text-blue-400 border-blue-500/30' },
    { name: lang === 'pt' ? 'Canal de Ética & Integridade Institucional' : 'Institutional Ethics & Whistleblowing', status: 'IMPLEMENTED', badge: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30' },
    { name: lang === 'pt' ? 'Auditoria de Segurança de Edge & IoT Industrial' : 'Industrial Edge & IoT Security Audit', status: 'UNDER REVIEW', badge: 'bg-amber-950/80 text-amber-400 border-amber-500/30' },
  ];

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>KRAEFEGG TRUST CENTER • INSTITUTIONAL SECURITY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
            {lang === 'pt' ? 'Centro de Confiança & Governança' : 'Trust Center & Governance'}
          </h1>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            {lang === 'pt'
              ? 'Segurança, privacidade de dados, integridade operacional e governança de inteligência artificial. Na Kraefegg M.O., a conformidade técnica e a responsabilidade profissional são pilares inegociáveis de cada projeto de engenharia.'
              : 'Security, data privacy, operational integrity, and artificial intelligence governance. At Kraefegg M.O., technical compliance and professional responsibility are non-negotiable foundations of every engineering engagement.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {pillars.map((p) => {
            const Icon = p.icon;
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] font-semibold'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content */}
        <div className="bg-[#090E17] border border-white/[0.08] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          {activeTab === 'overview' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
                  <Lock className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">
                    {lang === 'pt' ? 'Proteção & Privacidade' : 'Data Privacy'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'pt'
                      ? 'Conformidade irrestrita com a LGPD e GDPR. Princípio de minimização e retenção estrita de dados.'
                      : 'Full alignment with LGPD and GDPR. Data minimization and strict retention policies.'}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/60 border border-blue-500/20 space-y-3">
                  <ShieldAlert className="w-8 h-8 text-blue-400" />
                  <h3 className="text-base font-bold text-white">
                    {lang === 'pt' ? 'Cibersegurança' : 'Cybersecurity'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'pt'
                      ? 'Defesa em profundidade para redes industriais (OT), dispositivos edge e plataformas em nuvem.'
                      : 'Defense-in-depth for operational technology (OT), industrial edge, and cloud.'}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/60 border border-emerald-500/20 space-y-3">
                  <Cpu className="w-8 h-8 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">
                    {lang === 'pt' ? 'Supervisão de IA' : 'AI Oversight'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'pt'
                      ? 'A IA potencializa o especialista humano. Decisões de engenharia e ambientais requerem validação técnica.'
                      : 'AI augments human professionals. Engineering and environmental decisions mandate certified sign-off.'}
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-slate-900/60 border border-amber-500/20 space-y-3">
                  <Scale className="w-8 h-8 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    {lang === 'pt' ? 'Ética & Integridade' : 'Ethics & Integrity'}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'pt'
                      ? 'Tolerância zero a desvios éticos ou corrupção. Rastreabilidade documental completa.'
                      : 'Zero tolerance for bribery or unethical conduct. Complete document traceability.'}
                  </p>
                </div>
              </div>

              {/* Real-time Status Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-heading">
                    {lang === 'pt' ? 'Matriz de Status de Conformidade Institucional' : 'Institutional Compliance Status Matrix'}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-1 rounded">
                    STATUS VERIFIED: 2026
                  </span>
                </div>

                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden">
                  {trustStatus.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/40 hover:bg-slate-900/70 transition-colors gap-2">
                      <span className="text-sm font-medium text-slate-200">{item.name}</span>
                      <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md border inline-block w-fit ${item.badge}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onNavigate('/policies')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'pt' ? 'Acessar Biblioteca de Políticas (20)' : 'Access Policy Library (20)'}</span>
                </button>

                <button
                  onClick={() => setReportModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all cursor-pointer border border-slate-700"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'pt' ? 'Canal Confidencial de Manifestações' : 'Confidential Ethics Channel'}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'data-protection' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white font-heading">
                {lang === 'pt' ? 'Governança & Proteção de Dados (LGPD / GDPR)' : 'Data Governance & Protection'}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {lang === 'pt'
                  ? 'A Kraefegg M.O. adota o padrão de Privacidade por Design e por Padrão (Privacy by Design and by Default). Todo dado coletado através de interfaces operacionais, telemetrias de campo ou portais institucionais possui finalidade estritamente técnica e legítima base legal.'
                  : 'Kraefegg M.O. adheres strictly to Privacy by Design and by Default. Any data gathered through operational interfaces, field telemetry, or institutional platforms serves clearly defined technical purposes with valid legal grounding.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-cyan-400 text-sm">{lang === 'pt' ? 'Classificação de Informação' : 'Information Classification'}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'pt'
                      ? 'Níveis definidos: Pública, Interna, Confidencial e Restrita. Acesso restrito com controle RBAC (Role-Based Access Control) e trilhas de auditoria.'
                      : 'Tiers defined: Public, Internal, Confidential, and Restricted. Role-based access control with complete audit logs.'}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-cyan-400 text-sm">{lang === 'pt' ? 'Direitos dos Titulares' : 'Data Subject Rights'}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'pt'
                      ? 'Canal ágil para confirmação, acesso, retificação, anonimização ou exclusão de dados através de legal@kraefegg.com ou privacidade institucional.'
                      : 'Direct channel for confirmation, access, correction, anonymization, or deletion via legal@kraefegg.com.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-governance' && (
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono">
                AI AUGMENTS HUMAN EXPERTISE • SUPERVISÃO HUMANA OBRIGATÓRIA
              </div>
              <h2 className="text-2xl font-bold text-white font-heading">
                {lang === 'pt' ? 'Diretrizes Éticas de Inteligência Artificial' : 'AI Governance Framework'}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {lang === 'pt'
                  ? 'Os algoritmos e modelos de IA desenvolvidos pela divisão PentaHydra Systems atuam como sistemas de apoio e amplificação cognitiva. Sob nenhuma hipótese um modelo generativo substitui a assinatura e a responsabilidade de um engenheiro ou perito qualificado registrado.'
                  : 'AI algorithms and machine learning pipelines engineered by PentaHydra Systems function strictly as cognitive augmentation systems. Under no circumstance does an AI model replace the certified validation of a licensed engineer or accredited environmental specialist.'}
              </p>
              
              <div className="p-6 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
                <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
                  {lang === 'pt' ? 'Pilares de IA Responsável Kraefegg' : 'Kraefegg Responsible AI Pillars'}
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Transparência e Explicabilidade algorítmica</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Prevenção e mitigação de viés de treinamento</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Isolamento total de dados proprietários de clientes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Rastreabilidade de inferências e relatórios periciais</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-white font-heading">
                {lang === 'pt' ? 'Canal Institucional de Manifestação & Integridade' : 'Institutional Ethics & Reporting Channel'}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {lang === 'pt'
                  ? 'Canal seguro e anônimo para reporte de desvios éticos, violações de privacidade, preocupações ambientais ou não conformidades técnicas. Garantia integral de não retaliação.'
                  : 'Secure and anonymous channel for reporting ethics violations, privacy breaches, environmental concerns, or technical non-compliances. Strict zero-retaliation guarantee.'}
              </p>

              {reportSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{lang === 'pt' ? 'Manifestação registrada com sucesso' : 'Report submitted successfully'}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">
                    Protocolo criptografado: KRF-ETH-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setReportSuccess(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      {lang === 'pt' ? 'Categoria do Relato' : 'Category'}
                    </label>
                    <select className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200">
                      <option>Ética e Conduta Profissional</option>
                      <option>Conflito de Interesses</option>
                      <option>Preocupação Ambiental / Risco de Campo</option>
                      <option>Segurança da Informação / Dados</option>
                      <option>Conformidade Regulatória</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      {lang === 'pt' ? 'Descrição dos Fatos (detalhes técnicos e evidências)' : 'Description'}
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder={lang === 'pt' ? 'Descreva o ocorrido de maneira objetiva...' : 'Describe facts objectively...'}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:border-cyan-400"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <input type="checkbox" id="anon" defaultChecked className="rounded border-slate-700" />
                    <label htmlFor="anon">{lang === 'pt' ? 'Manter manifestação estritamente anônima' : 'Keep report anonymous'}</label>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    {lang === 'pt' ? 'Submeter Relato com Criptografia' : 'Submit Encrypted Report'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Fallback for other tabs */}
          {['information-security', 'cybersecurity', 'ethics', 'compliance', 'anti-bribery', 'business-continuity', 'risk-management', 'professional-responsibility', 'suppliers'].includes(activeTab) && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white font-heading capitalize">
                {pillars.find((p) => p.id === activeTab)?.title}
              </h2>
              <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {lang === 'pt'
                    ? 'Diretriz formalizada dentro do Sistema de Gestão Integrada (SGI) da Kraefegg M.O., cobrindo procedimentos operacionais padrão, controles de risco prévios, aprovação multinível e documentação rastreável.'
                    : 'Formalized directive within Kraefegg M.O. Integrated Management System (IMS), governing standard operating procedures, preemptive risk assessments, multilevel approvals, and traceable records.'}
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-cyan-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Documentação controlada e auditada pela divisão de Compliance & Legal.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
