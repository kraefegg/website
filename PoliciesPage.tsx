import React, { useState } from 'react';
import { Language, NavRoute } from '../types';
import { FileText, Search, ShieldCheck, Download, Eye, CheckCircle2, Clock, Lock, ChevronRight, X } from 'lucide-react';

interface PoliciesPageProps {
  lang: Language;
  onNavigate: (route: NavRoute) => void;
}

interface PolicyRecord {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  version: string;
  status: 'PUBLISHED' | 'APPROVED' | 'UNDER REVIEW';
  owner: string;
  approver: string;
  classification: 'PUBLIC' | 'INTERNAL' | 'RESTRICTED';
  effectiveDate: string;
  reviewDate: string;
  summary: string;
  summaryEn: string;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ lang, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyRecord | null>(null);

  const policies: PolicyRecord[] = [
    {
      id: '1',
      code: 'KRF-POL-001',
      title: '01 — Código de Conduta e Ética Institucional',
      titleEn: '01 — Institutional Code of Conduct & Ethics',
      version: 'v2.1',
      status: 'PUBLISHED',
      owner: 'Comitê de Ética & Legal',
      approver: 'Diretoria Executiva',
      classification: 'PUBLIC',
      effectiveDate: '2025-01-15',
      reviewDate: '2026-01-15',
      summary: 'Estabelece os padrões inegociáveis de retidão, integridade, transparência e responsabilidade técnica que regem todas as operações da Kraefegg M.O.',
      summaryEn: 'Defines the non-negotiable standards of integrity, transparency, and technical responsibility governing all Kraefegg M.O. activities.'
    },
    {
      id: '2',
      code: 'KRF-POL-002',
      title: '02 — Política de Privacidade e Tratamento de Dados',
      titleEn: '02 — Privacy & Personal Data Processing Policy',
      version: 'v2.0',
      status: 'PUBLISHED',
      owner: 'Data Protection Officer (DPO)',
      approver: 'Comitê de Governança',
      classification: 'PUBLIC',
      effectiveDate: '2025-02-01',
      reviewDate: '2026-02-01',
      summary: 'Diretrizes de conformidade integral com a LGPD (Lei 13.709/2018) e GDPR para dados de colaboradores, clientes e parceiros.',
      summaryEn: 'Comprehensive compliance standards under LGPD and GDPR for employees, clients, and partners.'
    },
    {
      id: '3',
      code: 'KRF-POL-003',
      title: '03 — Política de Proteção e Classificação de Dados',
      titleEn: '03 — Data Protection & Classification Policy',
      version: 'v1.4',
      status: 'PUBLISHED',
      owner: 'Arquitetura de Segurança',
      approver: 'Liderança Técnica',
      classification: 'PUBLIC',
      effectiveDate: '2025-03-10',
      reviewDate: '2026-03-10',
      summary: 'Define os níveis de sensibilidade da informação (Pública, Interna, Confidencial, Restrita) e controles criptográficos exigidos.',
      summaryEn: 'Establishes data sensitivity tiers (Public, Internal, Confidential, Restricted) and mandatory cryptographic controls.'
    },
    {
      id: '4',
      code: 'KRF-POL-004',
      title: '04 — Política de Segurança da Informação (PSI)',
      titleEn: '04 — Information Security Policy',
      version: 'v2.3',
      status: 'PUBLISHED',
      owner: 'InfoSec Lead',
      approver: 'Diretoria de Tecnologia',
      classification: 'PUBLIC',
      effectiveDate: '2025-01-20',
      reviewDate: '2026-01-20',
      summary: 'Padrões de controle de acesso, gestão de identidade, políticas de senhas fortes, proteção contra intrusão e resposta a incidentes.',
      summaryEn: 'Access control standards, identity governance, password rules, intrusion protection, and incident response.'
    },
    {
      id: '5',
      code: 'KRF-POL-005',
      title: '05 — Política de Cibersegurança em Sistemas Industriais e IoT',
      titleEn: '05 — Industrial Cybersecurity & IoT Systems Policy',
      version: 'v1.8',
      status: 'APPROVED',
      owner: 'PentaHydra Security Lab',
      approver: 'Liderança Técnica',
      classification: 'PUBLIC',
      effectiveDate: '2025-04-05',
      reviewDate: '2026-04-05',
      summary: 'Salvaguardas cibernéticas específicas para controladores industriais, sensores edge de telemetria e redes portuárias/minerárias.',
      summaryEn: 'Specific cyber defenses for industrial controllers, telemetry edge sensors, and port/mining infrastructure.'
    },
    {
      id: '6',
      code: 'KRF-POL-006',
      title: '06 — Política de Inteligência Artificial Responsável',
      titleEn: '06 — Responsible Artificial Intelligence Policy',
      version: 'v2.0',
      status: 'PUBLISHED',
      owner: 'PentaHydra AI Lab',
      approver: 'Comitê de Ética & IA',
      classification: 'PUBLIC',
      effectiveDate: '2025-05-12',
      reviewDate: '2026-05-12',
      summary: 'Princípios de transparência algorítmica, mitigação de vieses, explicabilidade e a obrigatoriedade da supervisão e chancela humana.',
      summaryEn: 'Algorithmic transparency principles, bias mitigation, explainability, and mandatory human professional sign-off.'
    },
    {
      id: '7',
      code: 'KRF-POL-007',
      title: '07 — Política de Sustentabilidade e Gestão Ambiental',
      titleEn: '07 — Environmental Management & Sustainability Policy',
      version: 'v1.9',
      status: 'PUBLISHED',
      owner: 'Oxygen Ecosystem Lead',
      approver: 'Diretoria de Operações',
      classification: 'PUBLIC',
      effectiveDate: '2025-02-18',
      reviewDate: '2026-02-18',
      summary: 'Diretrizes de mitigação de impacto ambiental, recuperação florestal, neutralidade carbônica e monitoramento hidrológico pericial.',
      summaryEn: 'Impact mitigation rules, forest restoration guidelines, carbon neutrality goals, and hydrological monitoring standards.'
    },
    {
      id: '8',
      code: 'KRF-POL-008',
      title: '08 — Política de Governança ESG',
      titleEn: '08 — ESG Governance Policy',
      version: 'v1.5',
      status: 'PUBLISHED',
      owner: 'Comitê de Sustentabilidade',
      approver: 'Conselho Consultivo',
      classification: 'PUBLIC',
      effectiveDate: '2025-03-01',
      reviewDate: '2026-03-01',
      summary: 'Estruturação de métricas quantificáveis de Environmental, Social and Governance nas atividades de engenharia e consultoria.',
      summaryEn: 'Quantifiable ESG metrics integration into engineering and technical advisory operations.'
    },
    {
      id: '9',
      code: 'KRF-POL-009',
      title: '09 — Política do Sistema de Gestão da Qualidade (SGQ)',
      titleEn: '09 — Quality Management System Policy',
      version: 'v2.0',
      status: 'APPROVED',
      owner: 'Gerência de Qualidade',
      approver: 'Diretoria Executiva',
      classification: 'PUBLIC',
      effectiveDate: '2025-01-10',
      reviewDate: '2026-01-10',
      summary: 'Processos de auditoria interna, validação de entregáveis técnicos, controle de revisões e melhoria contínua de projetos.',
      summaryEn: 'Internal audits, engineering deliverable verification, revision controls, and continuous quality improvement.'
    },
    {
      id: '10',
      code: 'KRF-POL-010',
      title: '10 — Política de Compliance e Integridade Regulatória',
      titleEn: '10 — Regulatory Compliance & Integrity Policy',
      version: 'v1.7',
      status: 'PUBLISHED',
      owner: 'Divisão de Compliance',
      approver: 'Diretoria Executiva',
      classification: 'PUBLIC',
      effectiveDate: '2025-02-15',
      reviewDate: '2026-02-15',
      summary: 'Mapeamento de obrigações normativas, licenças ambientais, resoluções de órgãos de classe (CREA/CONFEA) e compliance corporativo.',
      summaryEn: 'Regulatory obligation tracking, environmental permits, professional council standards, and corporate compliance.'
    },
    {
      id: '11',
      code: 'KRF-POL-011',
      title: '11 — Política Anticorrupção e Antissuborno',
      titleEn: '11 — Anti-Bribery & Anti-Corruption Policy',
      version: 'v2.0',
      status: 'PUBLISHED',
      owner: 'Comitê de Integridade',
      approver: 'Diretoria Executiva',
      classification: 'PUBLIC',
      effectiveDate: '2025-01-15',
      reviewDate: '2026-01-15',
      summary: 'Tolerância zero com qualquer forma de propina, pagamento de facilitação ou vantagem indevida em contratos públicos ou privados.',
      summaryEn: 'Zero tolerance for bribery, facilitation payments, or undue advantages across all public and private contracts.'
    },
    {
      id: '12',
      code: 'KRF-POL-012',
      title: '12 — Política de Gestão de Conflito de Interesses',
      titleEn: '12 — Conflict of Interest Management Policy',
      version: 'v1.3',
      status: 'PUBLISHED',
      owner: 'Recursos Humanos & Compliance',
      approver: 'Diretoria de Integridade',
      classification: 'PUBLIC',
      effectiveDate: '2025-03-20',
      reviewDate: '2026-03-20',
      summary: 'Declaração formal periódica de interesses, segregação de funções críticas e resolução imparcial de potenciais impedimentos.',
      summaryEn: 'Mandatory periodic declarations of interest, segregation of duties, and objective resolution protocols.'
    },
    {
      id: '13',
      code: 'KRF-POL-013',
      title: '13 — Código de Conduta para Fornecedores e Prestadores',
      titleEn: '13 — Supplier & Vendor Code of Conduct',
      version: 'v1.6',
      status: 'PUBLISHED',
      owner: 'Procurement & Suprimentos',
      approver: 'Diretoria Financeira',
      classification: 'PUBLIC',
      effectiveDate: '2025-04-01',
      reviewDate: '2026-04-01',
      summary: 'Requisitos compulsórios de direitos humanos, condições de trabalho seguro, não trabalho infantil e conformidade ambiental para terceiros.',
      summaryEn: 'Mandatory supplier requirements regarding human rights, workplace safety, anti-child labor, and ecological compliance.'
    },
    {
      id: '14',
      code: 'KRF-POL-014',
      title: '14 — Política de Canal de Denúncias e Proteção ao Relator',
      titleEn: '14 — Whistleblower & Reporter Protection Policy',
      version: 'v2.0',
      status: 'PUBLISHED',
      owner: 'Ouvidoria & Ética',
      approver: 'Diretoria Executiva',
      classification: 'PUBLIC',
      effectiveDate: '2025-01-15',
      reviewDate: '2026-01-15',
      summary: 'Garantia expressa de anonimato, sigilo processual e proibição estrita de qualquer forma de retaliação a denunciantes de boa-fé.',
      summaryEn: 'Strict confidentiality guarantees, anonymity safeguards, and total prohibition of retaliation against whistleblowers.'
    },
    {
      id: '15',
      code: 'KRF-POL-015',
      title: '15 — Política de Continuidade de Negócios e Disaster Recovery',
      titleEn: '15 — Business Continuity & Disaster Recovery Policy',
      version: 'v1.4',
      status: 'APPROVED',
      owner: 'Infraestrutura & Resiliência',
      approver: 'Diretoria de Tecnologia',
      classification: 'INTERNAL',
      effectiveDate: '2025-05-01',
      reviewDate: '2026-05-01',
      summary: 'Planos de contingência para falhas de datacenter, recuperação de telemetrias críticas em campo e tempos de RTO/RPO operacionais.',
      summaryEn: 'Contingency plans for infrastructure failure, field telemetry restoration, and verified RTO/RPO recovery benchmarks.'
    },
    {
      id: '16',
      code: 'KRF-POL-016',
      title: '16 — Política de Gestão Integrada de Riscos Corporativos',
      titleEn: '16 — Enterprise Risk Management (ERM) Policy',
      version: 'v1.5',
      status: 'PUBLISHED',
      owner: 'Comitê de Riscos',
      approver: 'Conselho Consultivo',
      classification: 'PUBLIC',
      effectiveDate: '2025-03-15',
      reviewDate: '2026-03-15',
      summary: 'Identificação precoce, mensuração de impacto, planos de tratamento e monitoramento de riscos operacionais, climáticos e cibernéticos.',
      summaryEn: 'Early identification, impact assessment, mitigation plans, and monitoring of operational, climate, and cyber risks.'
    },
    {
      id: '17',
      code: 'KRF-POL-017',
      title: '17 — Política de Propriedade Intelectual e Patentes',
      titleEn: '17 — Intellectual Property & Patents Policy',
      version: 'v1.2',
      status: 'PUBLISHED',
      owner: 'P&D e Jurídico',
      approver: 'Diretoria Executiva',
      classification: 'PUBLIC',
      effectiveDate: '2025-02-10',
      reviewDate: '2026-02-10',
      summary: 'Proteção de marcas, algoritmos, designs industriais, patentes e segredos tecnológicos gerados pela Kraefegg M.O.',
      summaryEn: 'Protection of trademarks, algorithms, industrial designs, patent filings, and proprietary technology secrets.'
    },
    {
      id: '18',
      code: 'KRF-POL-018',
      title: '18 — Política de Confidencialidade e Não Divulgação (NDA)',
      titleEn: '18 — Confidentiality & Non-Disclosure Policy',
      version: 'v2.1',
      status: 'PUBLISHED',
      owner: 'Jurídico Corporativo',
      approver: 'Diretoria Executiva',
      classification: 'PUBLIC',
      effectiveDate: '2025-01-20',
      reviewDate: '2026-01-20',
      summary: 'Salvaguarda de dados operacionais confidenciais, relatórios de auditoria ambiental e formulações de clientes sob sigilo contratual.',
      summaryEn: 'Safeguarding confidential operational data, environmental audit findings, and client proprietary specifications.'
    },
    {
      id: '19',
      code: 'KRF-POL-019',
      title: '19 — Política de Uso Aceitável de Ativos e Tecnologia',
      titleEn: '19 — Acceptable Use of Technology & Assets Policy',
      version: 'v1.6',
      status: 'PUBLISHED',
      owner: 'Tecnologia da Informação',
      approver: 'Diretoria de Tecnologia',
      classification: 'INTERNAL',
      effectiveDate: '2025-04-10',
      reviewDate: '2026-04-10',
      summary: 'Normas para utilização ética e segura de estações de trabalho, acessos a VPNs, dispositivos móveis e infraestruturas em nuvem.',
      summaryEn: 'Rules for secure and ethical usage of workstations, VPN access, mobile endpoints, and cloud infrastructure.'
    },
    {
      id: '20',
      code: 'KRF-POL-020',
      title: '20 — Política de Desenvolvimento Tecnológico Responsável',
      titleEn: '20 — Responsible Technology Development Policy',
      version: 'v1.1',
      status: 'APPROVED',
      owner: 'Liderança de Engenharia de Sistemas',
      approver: 'Diretoria Executiva',
      classification: 'PUBLIC',
      effectiveDate: '2025-06-01',
      reviewDate: '2026-06-01',
      summary: 'Princípios de engenharia sustentável, eficiência energética computacional e segurança integrada desde a concepção de sistemas.',
      summaryEn: 'Sustainable engineering principles, computational energy efficiency, and security-by-design standards.'
    },
  ];

  const filtered = policies.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.code.toLowerCase().includes(term) ||
      p.title.toLowerCase().includes(term) ||
      p.titleEn.toLowerCase().includes(term) ||
      p.summary.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-4 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>KRAEFEGG CORPORATE GOVERNANCE • 20 OFFICIAL POLICIES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-heading">
            {lang === 'pt' ? 'Biblioteca de Políticas Corporativas' : 'Corporate Policy Library'}
          </h1>
          <p className="text-slate-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            {lang === 'pt'
              ? 'Conjunto formal de 20 políticas e diretrizes normativas do Grupo Kraefegg M.O. e suas divisões tecnológicas e ambientais, com rastreabilidade de versões, controle de aprovações e classificação de segurança.'
              : 'Formal repository of 20 normative policies and governance standards of Kraefegg M.O. and its technological and environmental divisions, complete with version traceability and security classifications.'}
          </p>
        </div>

        {/* Search & Document Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={lang === 'pt' ? 'Buscar por código, título ou palavra-chave...' : 'Search by code, title or keyword...'}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-cyan-400 font-bold">{filtered.length}</span>
            <span>{lang === 'pt' ? 'documentos catalogados' : 'documents cataloged'}</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              SGI AUDITED
            </span>
          </div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((policy) => (
            <div
              key={policy.id}
              className="p-6 rounded-xl bg-[#090E17] border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded">
                    {policy.code}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {policy.version}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                      {policy.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {lang === 'pt' ? policy.title : policy.titleEn}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {lang === 'pt' ? policy.summary : policy.summaryEn}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">{policy.classification}</span>
                <button
                  onClick={() => setSelectedPolicy(policy)}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Ver Ficha Técnica' : 'View Spec'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Policy Inspection */}
        {selectedPolicy && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0A0F1D] border border-cyan-500/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <button
                onClick={() => setSelectedPolicy(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/40">
                    {selectedPolicy.code}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">
                    {selectedPolicy.version} • {selectedPolicy.status}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white font-heading">
                  {lang === 'pt' ? selectedPolicy.title : selectedPolicy.titleEn}
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {lang === 'pt' ? selectedPolicy.summary : selectedPolicy.summaryEn}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-t border-slate-800 pt-4">
                <div>
                  <span className="text-slate-500 block">{lang === 'pt' ? 'Responsável / Custodiante:' : 'Document Owner:'}</span>
                  <span className="text-slate-200 font-semibold">{selectedPolicy.owner}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'pt' ? 'Instância de Aprovação:' : 'Approving Body:'}</span>
                  <span className="text-slate-200 font-semibold">{selectedPolicy.approver}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'pt' ? 'Data de Vigência:' : 'Effective Date:'}</span>
                  <span className="text-slate-200">{selectedPolicy.effectiveDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{lang === 'pt' ? 'Ciclo de Revisão:' : 'Review Cycle:'}</span>
                  <span className="text-slate-200">{selectedPolicy.reviewDate}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  CLASSIFICAÇÃO: {selectedPolicy.classification}
                </span>
                <button
                  onClick={() => setSelectedPolicy(null)}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono uppercase"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
