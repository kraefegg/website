import { NewsArticle } from '../types';

export const newsData: NewsArticle[] = [
  {
    id: 'art-1',
    title: 'A Convergência entre Gêmeos Digitais e Edge AI na Gestão Portuária 4.0',
    titleEn: 'The Convergence of Digital Twins and Edge AI in Port 4.0 Operations',
    category: 'Maritime & AI',
    date: '10 Setembro 2026',
    readingTime: '6 min',
    readingTimeEn: '6 min read',
    heroImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
    summary: 'Como a infraestrutura de visão computacional na borda desenvolvida pela PentaHydra Systems reduz drasticamente o tempo de atracação e assegura o cumprimento integral dos parâmetros ambientais da convenção MARPOL.',
    summaryEn: 'How edge computer vision infrastructure engineered by PentaHydra Systems drastically cuts turnaround times while ensuring complete compliance with MARPOL environmental protocols.',
    content: [
      'A gestão moderna de complexos portuários e hidroviários atingiu um patamar de complexidade em que decisões baseadas em relatórios estáticos ou inspeções visuais manuais tornaram-se insuficientes para mitigar riscos operacionais e ambientais.',
      'Na Kraefegg M.O., desenvolvemos uma abordagem onde sensores físicos instalados nos cabeços de amarração, boias limnológicas autônomas e câmeras de alta sensibilidade no espectro visível e infravermelho alimentam nós Edge AI locais.',
      'A inferência na borda permite que descargas anômalas ou variações bruscas de tensão mecânica em cabos sejam processadas em menos de 10 milissegundos, gerando notificações imediatas para as autoridades portuárias antes que qualquer dano estrutural ou contaminação ocorra.',
      'Essa síntese entre engenharia mecânica naval, inteligência artificial e rigor regulatório consolida o novo paradigma dos Portos Verdes da próxima década.'
    ],
    contentEn: [
      'Modern seaport and terminal governance has reached a tier of complexity where decisions reliant on static reports or periodic human inspections can no longer mitigate severe operational and ecological risks.',
      'At Kraefegg M.O., we have designed an architecture where physical strain sensors on mooring bollards, autonomous oceanographic buoys, and multi-spectrum optical/infrared sensors feed local PentaHydra Edge AI nodes.',
      'Edge inference allows anomalous water discharges or rapid cable tension spikes to be calculated within 10 milliseconds, sending actionable alarms to harbor masters before structural or environmental incidents can take place.',
      'This synthesis of marine mechanical engineering, computational AI, and regulatory rigor anchors the standard for next-generation Green Ports.'
    ],
    tags: ['Edge AI', 'Smart Ports', 'MARPOL', 'PentaHydra', 'Maritime']
  },
  {
    id: 'art-2',
    title: 'Monitoramento InSAR e Geomecânica Preditiva para Segurança de Barragens',
    titleEn: 'InSAR Satellite Telemetry and Predictive Geomechanics in Dam Safety',
    category: 'Mining & Geotechnical',
    date: '28 Agosto 2026',
    readingTime: '8 min',
    readingTimeEn: '8 min read',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    summary: 'A combinação de radar orbital interferométrico com telemetria subterrânea de poro-pressão estabelece o mais rigoroso patamar de segurança em estruturas de contenção de rejeitos.',
    summaryEn: 'Combining satellite radar interferometry with subterranean pore pressure telemetry delivers the highest standard of structural integrity in tailings containment facilities.',
    content: [
      'A integridade de estruturas geotécnicas de grande escala requer sensoriamento contínuo em múltiplas escalas espaciais e temporais. A interferometria por radar de abertura sintética (InSAR) fornece mapeamentos milimétricos da superfície a cada passagem orbital.',
      'Contudo, o diferencial técnico da Kraefegg reside em correlacionar esses deslocamentos superficiais com sensores piezométricos de corda vibrante inseridos no interior do maciço terroso.',
      'Utilizando os algoritmos de fusão de dados da PentaHydra, o sistema é capaz de prever cenários de liquefação ou percolação anômala com até 72 horas de antecedência aos métodos convencionais.',
      'O resultado é a tranquilidade das comunidades adjacentes, compliance irrestrito com a Agência Nacional de Mineração (ANM) e salvaguarda permanente do meio ambiente.'
    ],
    contentEn: [
      'The integrity of large-scale geotechnical containment structures requires continuous sensing across multiple spatial and temporal resolutions. Synthetic Aperture Radar interferometry (InSAR) supplies sub-millimetric surface deformation tracking with every satellite pass.',
      'However, Kraefegg M.O.’s core differentiator lies in correlating these surface movements directly with vibrating-wire piezometric arrays anchored deep within the embankment core.',
      'Employing PentaHydra data fusion algorithms, the system flags potential liquefaction risks or anomalous internal hydraulic gradients up to 72 hours earlier than traditional monitoring methods.',
      'This grants downstream communities true peace of mind, ensures full regulatory compliance with international mining guidelines (ICOLD/GISTM), and protects surrounding biomes.'
    ],
    tags: ['InSAR', 'Mining Safety', 'Geotechnics', 'Tailings', 'PentaHydra']
  },
  {
    id: 'art-3',
    title: 'Oxygen Ecosystem: Valoração Científica de Ativos Ecológicos e Biodiversidade',
    titleEn: 'Oxygen Ecosystem: Scientific Valuation of Ecological Assets and Biodiversity',
    category: 'Environment & ESG',
    date: '15 Agosto 2026',
    readingTime: '5 min',
    readingTimeEn: '5 min read',
    heroImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Superando o modelo de compensação puramente burocrático: como a quantificação genômica, LiDAR e bioacústica transformam a recuperação florestal em valor econômico auditável.',
    summaryEn: 'Beyond purely paper-based offsets: how genomic testing, LiDAR, and bioacoustics convert ecosystem restoration into verifiable institutional economic value.',
    content: [
      'Durante décadas, a preservação ambiental corporativa foi tratada primordialmente como um centro de custo punitivo ou obrigação meramente burocrática vinculada a termos de ajustamento de conduta.',
      'A Oxygen Ecosystem, braço de inteligência ambiental da Kraefegg M.O., inova ao conceber a restauração ecológica como uma cadeia produtiva de alta precisão tecnológica.',
      'Através do mapeamento com sensores LiDAR de densidade superior a 60 pontos por metro quadrado e sensores bioacústicos neurais capazes de identificar espécies-chave de polinizadores e aves de sub-bosque, geramos séries históricas invioláveis.',
      'Com essa comprovação empírica, empresas investidoras acessam mercados de capitais verdes internacionais (Green Bonds) com taxas de juros significativamente reduzidas.'
    ],
    contentEn: [
      'For decades, corporate environmental stewardship was predominantly treated as a punitive cost center or paper compliance exercise tied to remediation decrees.',
      'The Oxygen Ecosystem, the environmental intelligence initiative of Kraefegg M.O., revolutionizes this paradigm by engineering ecological restoration as a high-precision technology asset class.',
      'By pairing high-density aerial LiDAR scanning (exceeding 60 points per square meter) with neural bioacoustic listening nodes that recognize key indicator pollinator and songbird species, we produce tamper-proof empirical environmental audits.',
      'Armed with this verifiable scientific data, industrial sponsors access top-tier international green bond facilities at heavily discounted debt yields.'
    ],
    tags: ['Oxygen Ecosystem', 'Biodiversity', 'Carbon Credits', 'ESG', 'Restoration']
  }
];
