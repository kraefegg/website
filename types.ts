export type Language = 
  | 'en' 
  | 'es' 
  | 'de' 
  | 'fr' 
  | 'ru' 
  | 'pt' 
  | 'nl' 
  | 'zh' 
  | 'he' 
  | 'sv' 
  | 'fi';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  direction?: 'ltr' | 'rtl';
}

export type NavRoute = 
  | '/'
  | '/about'
  | '/vision-mission'
  | '/governance'
  | '/leadership'
  | '/corporate-structure'
  | '/network'
  | '/services'
  | '/marketplace'
  | '/marketplace/servicos'
  | '/marketplace/equipamentos'
  | '/marketplace/cart'
  | '/marketplace/request'
  | '/marketplace/success'
  | '/products'
  | '/solar-products'
  | '/markets'
  | '/markets/datacenter-solar'
  | '/markets/green-hydrogen'
  | '/markets/biomethane'
  | '/markets/solar-plants'
  | '/markets/environmental-monitoring'
  | '/markets/ports-maritime'
  | '/projects'
  | '/showcases'
  | '/pentahydra'
  | '/oxygen-ecosystem'
  | '/trust'
  | '/policies'
  | '/policies/document-control'
  | '/legal/privacy'
  | '/legal/terms'
  | '/legal/cookies'
  | '/legal/intellectual-property'
  | '/legal/confidentiality'
  | '/security'
  | '/responsible-business'
  | '/research'
  | '/partners'
  | '/news'
  | '/careers'
  | '/contact'
  | string;

export type MarketId = 
  | 'datacenter-solar'
  | 'green-hydrogen'
  | 'biomethane'
  | 'solar-plants'
  | 'environmental-monitoring'
  | 'ports-maritime';

export interface MarketSpecification {
  label: string;
  labelEn: string;
  value: string;
  detail?: string;
  detailEn?: string;
}

export interface MarketEngineeringPhase {
  phaseNumber: number;
  name: string;
  nameEn: string;
  duration: string;
  durationEn: string;
  deliverables: string[];
  deliverablesEn: string[];
}

export interface StrategicMarket {
  id: MarketId;
  title: string;
  titleEn: string;
  shortTitle: string;
  shortTitleEn: string;
  badge: string;
  badgeEn: string;
  iconName: string;
  tagline: string;
  taglineEn: string;
  heroImage: string;
  shortDescription: string;
  shortDescriptionEn: string;
  fullOverview: string;
  fullOverviewEn: string;
  coreSolutions: {
    title: string;
    titleEn: string;
    description: string;
    descriptionEn: string;
    icon: string;
  }[];
  engineeringPhases: MarketEngineeringPhase[];
  technicalSpecs: MarketSpecification[];
  regulatoryStandards: string[];
  synergies: {
    pillar: 'KRAEFEGG M.O.' | 'PENTAHYDRA' | 'OXYGEN ECOSYSTEM';
    contribution: string;
    contributionEn: string;
  }[];
  calculatorConfig: {
    title: string;
    titleEn: string;
    inputLabel: string;
    inputLabelEn: string;
    unit: string;
    min: number;
    max: number;
    defaultValue: number;
    step: number;
    output1Label: string;
    output1LabelEn: string;
    output1Formula: (v: number) => string;
    output2Label: string;
    output2LabelEn: string;
    output2Formula: (v: number) => string;
    output3Label: string;
    output3LabelEn: string;
    output3Formula: (v: number) => string;
  };
  relatedProjectIds: string[];
  relatedDisciplines: string[];
}

export type IndustryKey =
  | 'mining'
  | 'environment'
  | 'energy'
  | 'forestry'
  | 'agriculture'
  | 'industry'
  | 'infrastructure'
  | 'ports'
  | 'maritime'
  | 'logistics'
  | 'offshore'
  | 'safety'
  | 'ai'
  | 'data'
  | 'iot';

export interface ServiceCategory {
  id: string;
  categoryKey: string;
  title: string;
  titleEn: string;
  iconName: string;
  shortDescription: string;
  shortDescriptionEn: string;
  disciplines: string[];
  disciplinesEn: string[];
  techStack: string[];
  industriesServed: string[];
  relatedProjects: string[];
  highlightMetric?: {
    value: string;
    label: string;
    labelEn: string;
  };
}

export type ProjectCategory =
  | 'ALL'
  | 'ENGINEERING'
  | 'ENVIRONMENT'
  | 'ENERGY'
  | 'MINING'
  | 'MARITIME'
  | 'TECHNOLOGY'
  | 'INDUSTRY'
  | 'AGRO'
  | 'FORESTRY';

export interface ProjectItem {
  id: string;
  name: string;
  nameEn: string;
  industry: string;
  industryEn: string;
  category: Exclude<ProjectCategory, 'ALL'>;
  location: string;
  technology: string[];
  challenge: string;
  challengeEn: string;
  solution: string;
  solutionEn: string;
  impact: string;
  impactEn: string;
  badge: 'REAL PROJECT' | 'CASE STUDY' | 'DEMO' | 'PROTOTYPE' | 'LIVE PLATFORM' | 'LIVE OBSERVATORY' | 'SCADA INDUSTRIAL';
  imageUrl: string;
  featured?: boolean;
  liveUrl?: string;
  runCommand?: string;
}

export interface SolarProductItem {
  id: string;
  code: string;
  name: string;
  systemModel: string;
  powerKwp: number;
  phase: 'MONOFÁSICO' | 'TRIFÁSICO' | 'TRIFÁSICO INDUSTRIAL';
  voltage: string;
  inverterBrand: 'GoodWe' | 'CHINT' | 'Growatt' | 'Solplanet' | 'Industrial Central' | string;
  inverterModel: string;
  moduleBrand: string;
  moduleModel: string;
  moduleEfficiency: string;
  moduleWarranty: string;
  structureType: string;
  application: string;
  category: 'distributed' | 'commercial' | 'industrial' | 'utility_h2v_datacenter';
  description: string;
  features: string[];
  officialSupplier: string;
  engineeringServicesAvailable: string[];
}

export interface BudgetOrderItem {
  product: SolarProductItem;
  quantity: number;
}

export interface BudgetOrderForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  projectType: string;
  estimatedKwp?: string;
  targetTimeline: string;
  selectedServices: string[];
  notes: string;
}

export interface ShowcaseDemo {
  id: string;
  title: string;
  titleEn: string;
  domain: string;
  type: 'DEMO' | 'CONCEPT' | 'SIMULATION' | 'PROTOTYPE';
  description: string;
  descriptionEn: string;
  interactiveType: 'cv_vision' | 'digital_twin' | 'gis_telemetry' | 'port_logistics' | 'smart_irrigation' | 'edge_iot';
  metrics: { label: string; labelEn: string; value: string; unit?: string }[];
  status: 'ONLINE' | 'ACTIVE' | 'CALIBRATING' | 'STREAMING';
}

export interface NewsArticle {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  date: string;
  readingTime: string;
  readingTimeEn: string;
  heroImage: string;
  summary: string;
  summaryEn: string;
  content: string[];
  contentEn: string[];
  tags: string[];
}

export interface CareerRole {
  id: string;
  title: string;
  titleEn: string;
  area: string;
  areaEn: string;
  type: string;
  typeEn: string;
  location: string;
  experience: string;
  skills: string[];
  status: 'OPEN' | 'COLLABORATION';
}

export interface PartnerItem {
  id: string;
  name: string;
  category: 'Strategic' | 'Technology' | 'Engineering' | 'Research' | 'Institutional';
  categoryEn: string;
  description: string;
  descriptionEn: string;
  focus: string;
  isPlaceholder?: boolean;
}
