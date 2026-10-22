export interface ContactEmail {
  email: string;
  label: string;
  labelEn: string;
  category: 'executive' | 'founder' | 'technology' | 'engineering' | 'environment' | 'governance' | 'institutional';
  description: string;
  descriptionEn: string;
}

export const KRAEFEGG_EMAILS: ContactEmail[] = [
  // Founder & Developer
  {
    email: 'railson.arruda@kraefegg.com',
    label: 'Railson Arruda — Fundador & Desenvolvedor de Sistemas',
    labelEn: 'Railson Arruda — Founder & Lead Systems Developer',
    category: 'founder',
    description: 'Canal executivo direto com o fundador e arquiteto de sistemas.',
    descriptionEn: 'Direct executive channel with the founder and lead systems architect.',
  },
  // Executive & Corporate
  {
    email: 'executive.business@kraefegg.com',
    label: 'Diretoria Executiva & Negócios Globais',
    labelEn: 'Executive Business & Global Strategy',
    category: 'executive',
    description: 'Parcerias corporativas, contratos internacionais e expansão.',
    descriptionEn: 'Corporate partnerships, international contracts and global expansion.',
  },
  {
    email: 'admin@kraefegg.com',
    label: 'Administração Central & Operações',
    labelEn: 'Central Administration & Operations',
    category: 'executive',
    description: 'Gestão administrativa e coordenação de unidades operacionais.',
    descriptionEn: 'Administrative governance and operational unit coordination.',
  },
  {
    email: 'office.mo@kraefegg.com',
    label: 'Multi Office — Sede Institucional',
    labelEn: 'Multi Office — Institutional Headquarters',
    category: 'executive',
    description: 'Comunicação institucional do conglomerado Kraefegg M.O.',
    descriptionEn: 'Institutional coordination for Kraefegg M.O. multi-office structure.',
  },
  {
    email: 'billing@kraefegg.com',
    label: 'Faturamento & Departamento Financeiro',
    labelEn: 'Billing & Financial Operations',
    category: 'executive',
    description: 'Faturamento, contabilidade corporativa e liquidação de projetos.',
    descriptionEn: 'Corporate invoicing, financial reporting, and project accounting.',
  },

  // Technology & PentaHydra Systems
  {
    email: 'technology.ai@kraefegg.com',
    label: 'PentaHydra — Inteligência Artificial & Tecnologia',
    labelEn: 'PentaHydra — Artificial Intelligence & Technology',
    category: 'technology',
    description: 'Engenharia de IA generativa, visão computacional e gêmeos digitais.',
    descriptionEn: 'Generative AI engineering, computer vision and cybernetic digital twins.',
  },
  {
    email: 'security@kraefegg.com',
    label: 'Segurança da Informação & Cibersegurança OT',
    labelEn: 'Information Security & OT Cybersecurity',
    category: 'technology',
    description: 'Auditoria de segurança para redes críticas portuárias e industriais.',
    descriptionEn: 'Security auditing for critical seaport, mining and industrial networks.',
  },
  {
    email: 'researching@kraefegg.com',
    label: 'Pesquisa Aplicada & Modelagem Científica',
    labelEn: 'Applied Research & Scientific Modeling',
    category: 'technology',
    description: 'P&D em física computacional, simulação de fluidos e algoritmos.',
    descriptionEn: 'R&D in computational physics, fluid simulation, and proprietary algorithms.',
  },
  {
    email: 'support@kraefegg.com',
    label: 'Suporte Técnico & Telemetria Industrial',
    labelEn: 'Technical Support & Industrial Telemetry',
    category: 'technology',
    description: 'Atendimento técnico a clientes e monitoramento de ativos conectados.',
    descriptionEn: 'Client technical support, system maintenance and telemetry diagnostics.',
  },

  // Multidisciplinary Engineering
  {
    email: 'projects.engineering@kraefegg.com',
    label: 'Projetos de Engenharia Multidisciplinar',
    labelEn: 'Multidisciplinary Engineering Projects',
    category: 'engineering',
    description: 'Coordenação de projetos executivos de infraestrutura e engenharia pesada.',
    descriptionEn: 'Executive engineering projects, structural calculation and execution.',
  },
  {
    email: 'consulting@kraefegg.com',
    label: 'Consultoria Técnica Especializada',
    labelEn: 'Specialized Technical Consulting',
    category: 'engineering',
    description: 'Assessoria de alta precisão para indústrias e infraestrutura complexa.',
    descriptionEn: 'High-precision engineering advisory for heavy industry and infrastructure.',
  },
  {
    email: 'consulting-maritime.port@kraefegg.com',
    label: 'Consultoria Marítima & Engenharia Portuária',
    labelEn: 'Maritime & Seaport Engineering Advisory',
    category: 'engineering',
    description: 'Engenharia naval, batimetria, atracação e conformidade portuária.',
    descriptionEn: 'Naval engineering, bathymetry, berthing systems and port compliance.',
  },
  {
    email: 'energy.mining@kraefegg.com',
    label: 'Energia & Geotecnia de Mineração',
    labelEn: 'Energy & Mining Geotechnics',
    category: 'engineering',
    description: 'Sistemas BESS, subestações, estabilidade de taludes e descaracterização.',
    descriptionEn: 'BESS storage, high-voltage substations, slope stability and mining tech.',
  },
  {
    email: 'procurement@kraefegg.com',
    label: 'Suprimentos Técnicos & Compras Globais',
    labelEn: 'Technical Procurement & Global Supply',
    category: 'engineering',
    description: 'Aquisição de sensores, equipamentos industriais e matérias-primas.',
    descriptionEn: 'Sourcing of specialized sensors, heavy equipment and components.',
  },

  // Environment & Oxygen Ecosystem
  {
    email: 'environment@kraefegg.com',
    label: 'Inteligência Ambiental & Licenciamento',
    labelEn: 'Environmental Intelligence & Licensing',
    category: 'environment',
    description: 'Estudos EIA/RIMA, sensoriamento por satélite e perícias ecológicas.',
    descriptionEn: 'Environmental impact studies, orbital remote sensing and bio-forensics.',
  },
  {
    email: 'esg@kraefegg.com',
    label: 'Governança ESG & Economia do Carbono',
    labelEn: 'ESG Governance & Carbon Economy',
    category: 'environment',
    description: 'Geração de créditos de carbono, métricas GHG e auditoria climática.',
    descriptionEn: 'Carbon credit certification, GHG inventory, and sustainability audits.',
  },

  // Governance & Partnerships
  {
    email: 'legal@kraefegg.com',
    label: 'Assessoria Jurídica & Acordos de Confidencialidade (NDA)',
    labelEn: 'Legal Counsel & Mutual NDA Agreements',
    category: 'governance',
    description: 'Elaboração de minutas contratuais, NDAs e proteção de IP.',
    descriptionEn: 'Contract drafting, mutual NDAs, and intellectual property defense.',
  },
  {
    email: 'compliance@kraefegg.com',
    label: 'Conformidade Regulatória & Comitê de Ética',
    labelEn: 'Regulatory Compliance & Ethics Board',
    category: 'governance',
    description: 'Auditoria de padrões internacionais, ISO, LGPD e anticorrupção.',
    descriptionEn: 'International standards audits, ISO, privacy, and anti-corruption compliance.',
  },
  {
    email: 'partnerships@kraefegg.com',
    label: 'Alianças Estratégicas & Consórcios',
    labelEn: 'Strategic Alliances & Consortia',
    category: 'governance',
    description: 'Joint ventures com centros de pesquisa, indústrias e governos.',
    descriptionEn: 'Joint ventures with research centers, industrial leaders, and institutions.',
  },

  // Institutional
  {
    email: 'careers@kraefegg.com',
    label: 'Carreiras, Talentos & Engenheiros',
    labelEn: 'Careers, Talent & Engineering Recruitment',
    category: 'institutional',
    description: 'Recrutamento de especialistas seniores, pesquisadores e estagiários.',
    descriptionEn: 'Recruitment for senior engineers, researchers, and technical fellows.',
  },
  {
    email: 'marketing@kraefegg.com',
    label: 'Comunicação Institucional & Imprensa',
    labelEn: 'Corporate Communications & Press Relations',
    category: 'institutional',
    description: 'Relações públicas, publicações científicas e assessoria de imprensa.',
    descriptionEn: 'Public relations, technical publications, and press inquiries.',
  },
];

export const FOUNDER_INFO = {
  name: 'Railson Arruda',
  headline: 'Technical Director | ESG, Environmental & Energy Transition Advisory | Risk Management | Regulatory Compliance | Mining & Infrastructure | AI-Enabled Solutions & Prompt Engineering | GeoAI | Digital Systems & Data Analytics',
  title: 'Founder & Technical Director',
  titlePt: 'Fundador & Diretor Técnico',
  company: 'Kraefegg M.O. Multi Office',
  email: 'railson.arruda@kraefegg.com',
  directOrderEmail: 'kraefegg.mos3@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/railsonarruda-engineering/',
  telephones: [
    { display: '+55 (61) 99885-0946', raw: '+5561998850946', region: 'Distrito Federal (Brasília)' },
    { display: '+55 (83) 99919-4789', raw: '+5583999194789', region: 'Paraíba / Nordeste' },
  ],
  bio: 'Fundador e Diretor Técnico da Kraefegg M.O. — Multi Office, liderando a integração multidisciplinar entre engenharia física pesada, inteligência artificial (PentaHydra Systems), governança ambiental contínua (Oxygen Ecosystem), mineração, transição energética e infraestrutura crítica.',
  bioEn: 'Founder & Technical Director of Kraefegg M.O. — Multi Office, leading multidisciplinary convergence across heavy engineering, industrial artificial intelligence (PentaHydra Systems), continuous environmental intelligence (Oxygen Ecosystem), mining, energy transition, and critical infrastructure.',
  academicAndCertifications: [
    {
      institution: 'HUB PNAAT - FIT Tecnologia',
      program: 'Training Certification in Embedded Systems and Edge Artificial Intelligence (Edge AI) — PNAAT',
      category: 'Embedded Systems, IoT & Edge AI',
      credentialType: 'Especialização Tecnológica',
      badgeColor: 'cyan',
    },
    {
      institution: 'Ecole Schneider Electric',
      program: 'Alternative Power Generation Technologies, Tecnologia em Sistemas de Energia, ANEEL',
      category: 'Sistemas de Energia & Geração Alternativa',
      credentialType: 'Certificação Industrial Global',
      badgeColor: 'amber',
    },
    {
      institution: 'Ecole Schneider Electric',
      program: 'Análise de Impacto Regulatório (AIR) - Setor de Energia, Tecnologia em Sistemas de Energia',
      category: 'Regulação Setorial & Compliance ANEEL',
      credentialType: 'Conformidade Regulatória',
      badgeColor: 'amber',
    },
    {
      institution: 'DIO (Digital Innovation One)',
      program: 'Gen-AI, Data, Cyber, AI Engineer',
      category: 'Inteligência Artificial Generativa & Engenharia de Dados',
      credentialType: 'Formação Avançada AI Engineer',
      badgeColor: 'rose',
    },
    {
      institution: 'DIO (Digital Innovation One)',
      program: 'Cybersecurity Specialist, Cybersecurity',
      category: 'Segurança Cibernética & Proteção de Redes',
      credentialType: 'Especialista em Cibersegurança',
      badgeColor: 'rose',
    },
    {
      institution: 'DIO (Digital Innovation One)',
      program: 'Neo4j Data Analytics with Graphs Training Certification',
      category: 'Data Analytics com Grafos & Topologias Complexas',
      credentialType: 'Análise Avançada de Grafos',
      badgeColor: 'rose',
    },
    {
      institution: 'Faculdade SENAI Fatesg / SENAI GO',
      program: 'Automation Systems Analyst - Analista de Sistemas de Automação, System Analysis',
      category: 'Sistemas de Automação & Controle Industrial',
      credentialType: 'Analista de Sistemas de Automação',
      badgeColor: 'blue',
    },
    {
      institution: 'SENAI GO',
      program: 'Analista de Segurança em Redes de Computadores, Cybersecurity & Sistemas de Redes',
      category: 'Infraestrutura Crítica de Redes & Ciberdefesa',
      credentialType: 'Analista de Redes & Cibersegurança',
      badgeColor: 'blue',
    },
    {
      institution: 'SESI SENAI Catalão',
      program: 'Assisted-GenAI Back-end Dev.',
      category: 'Desenvolvimento Back-end Assistido por IA Generativa',
      credentialType: 'Engenharia de Software & IA',
      badgeColor: 'indigo',
    },
    {
      institution: 'Faculdade SENAI Fatesg',
      program: 'Sondagem na Mineração: Fundamentos e Técnicas',
      category: 'Engenharia de Minas & Geotécnica Operacional',
      credentialType: 'Sondagem & Geotecnia',
      badgeColor: 'emerald',
    },
  ],
};

export const CONTACT_CHANNELS = {
  telephones: [
    { display: '+55 (61) 99885-0946', raw: '+5561998850946', region: 'Brasília / Centro-Oeste' },
    { display: '+55 (83) 99919-4789', raw: '+5583999194789', region: 'Nordeste / Nacional' },
  ],
  socials: [
    {
      name: 'LinkedIn',
      handle: 'railsonarruda-engineering',
      url: 'https://www.linkedin.com/in/railsonarruda-engineering/',
      type: 'professional',
    },
    {
      name: 'Telegram',
      handle: 'Kraefegg',
      url: 'https://t.me/Kraefegg',
      type: 'messaging',
    },
    {
      name: 'Instagram',
      handle: '@kraefegg',
      url: 'https://instagram.com/kraefegg',
      type: 'social',
    },
    {
      name: 'YouTube',
      handle: '@kraefegg',
      url: 'https://youtube.com/@kraefegg',
      type: 'video',
    },
  ],
};
