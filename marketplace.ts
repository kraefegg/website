import { SolarProductItem, BudgetOrderForm } from '../types';

export interface MarketplaceCartItem {
  id: string; // unique cart item id (e.g. cart-xxx)
  type: 'product' | 'service';
  itemId: string; // product code or service category id
  title: string;
  subtitle?: string;
  category: string;
  quantity: number;
  powerKwp?: number; // accumulated power per unit for solar equipment
  details: {
    systemModel?: string;
    inverterBrand?: string;
    inverterModel?: string;
    moduleBrand?: string;
    moduleModel?: string;
    voltage?: string;
    phase?: string;
    structureType?: string;
    disciplines?: string[];
    customScope?: string;
    officialSupplier?: string;
  };
}

export interface MarketplaceQuoteRequest {
  protocol: string;
  createdAt: string;
  submittedAtFormatted: string;
  recipientEmail: string;
  // Contact & Company Data
  name: string;
  company: string;
  cnpjCpf?: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  // Technical Project Data
  projectType: string;
  targetTimeline: string;
  installationSite?: string;
  selectedEngineeringServices: string[];
  notes: string;
  // Cart Items & Metrics
  items: MarketplaceCartItem[];
  totalItemCount: number;
  totalKwp: number;
  // Status
  status: 'SUBMITTED' | 'IN_REVIEW' | 'PROPOSAL_GENERATED';
}

export interface EngineeringServicePackage {
  id: string;
  title: string;
  titleEn: string;
  categoryKey: string;
  iconName: string;
  shortDescription: string;
  shortDescriptionEn: string;
  disciplines: string[];
  disciplinesEn: string[];
  deliverables: string[];
  deliverablesEn: string[];
  standards: string[];
  techStack: string[];
  industriesServed: string[];
  highlightMetric: {
    value: string;
    label: string;
    labelEn: string;
  };
}
