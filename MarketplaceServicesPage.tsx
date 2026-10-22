import React, { useState, useMemo } from 'react';
import { NavRoute, Language, ServiceCategory } from '../../types';
import { servicesData } from '../../data/servicesData';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Search, Wrench, Leaf, Zap, Cpu, Factory, Pickaxe, Trees, 
  Sprout, Anchor, Compass, Building2, Layers, ShoppingCart, 
  Check, ArrowRight, ChevronRight, ShieldCheck, Sun
} from 'lucide-react';

interface MarketplaceServicesPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
  initialCategory?: string;
}

export const MarketplaceServicesPage: React.FC<MarketplaceServicesPageProps> = ({ 
  onNavigate, 
  lang,
  initialCategory = 'all'
}) => {
  const { addServiceToCart, totalItems } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [addedServices, setAddedServices] = useState<Record<string, boolean>>({});

  const getCategoryIcon = (iconName: string, className: string = 'w-5 h-5') => {
    switch (iconName) {
      case 'Wrench': return <Wrench className={`${className} text-cyan-400`} />;
      case 'Leaf': return <Leaf className={`${className} text-emerald-400`} />;
      case 'Zap': return <Zap className={`${className} text-amber-400`} />;
      case 'Cpu': return <Cpu className={`${className} text-rose-400`} />;
      case 'Factory': return <Factory className={`${className} text-blue-400`} />;
      case 'Pickaxe': return <Pickaxe className={`${className} text-orange-400`} />;
      case 'Trees': return <Trees className={`${className} text-emerald-400`} />;
      case 'Sprout': return <Sprout className={`${className} text-green-400`} />;
      case 'Anchor': return <Anchor className={`${className} text-cyan-400`} />;
      case 'Compass': return <Compass className={`${className} text-indigo-400`} />;
      case 'Building2': return <Building2 className={`${className} text-teal-400`} />;
      default: return <Layers className={`${className} text-cyan-400`} />;
    }
  };

  const handleAddService = (svc: ServiceCategory) => {
    addServiceToCart({
      id: svc.id,
      title: lang === 'pt' ? svc.title : svc.titleEn,
      category: svc.categoryKey,
      disciplines: (lang === 'pt' ? svc.disciplines : svc.disciplinesEn).slice(0, 4),
    });
    setAddedServices((prev) => ({ ...prev, [svc.id]: true }));
    setTimeout(() => {
      setAddedServices((prev) => ({ ...prev, [svc.id]: false }));
    }, 2000);
  };

  const filteredServices = useMemo(() => {
    return servicesData.filter((svc) => {
      const matchesCategory = selectedCategory === 'all' || svc.id === selectedCategory;
      const q = searchQuery.toLowerCase();
      const title = (lang === 'pt' ? svc.title : svc.titleEn).toLowerCase();
      const desc = (lang === 'pt' ? svc.shortDescription : svc.shortDescriptionEn).toLowerCase();
      const disciplines = (lang === 'pt' ? svc.disciplines : svc.disciplinesEn).join(' ').toLowerCase();

      const matchesSearch = !q || title.includes(q) || desc.includes(q) || disciplines.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, lang]);

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button 
            onClick={() => onNavigate('/marketplace')}
            className="hover:text-cyan-400 cursor-pointer transition-colors"
          >
            Marketplace
          </button>
          <span>/</span>
          <span className="text-cyan-300 font-bold">
            {lang === 'pt' ? 'Serviços de Engenharia' : 'Engineering Services'}
          </span>
        </div>

        {/* Header Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#070D1C] to-slate-900 border border-cyan-500/30 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'pt' ? '11 VERTICAIS TÉCNICAS • ENGENHARIA KRAEFEGG M.O.' : '11 TECHNICAL VERTICALS • KRAEFEGG M.O. ENGINEERING'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-black text-white">
              {lang === 'pt' ? 'Catálogo de Serviços de Engenharia' : 'Engineering Services Catalog'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {lang === 'pt'
                ? 'Selecione os serviços técnicos e disciplinas de engenharia desejados para compor sua ordem de cotação. Preços emitidos sob análise técnica e ART.'
                : 'Select the technical services and engineering disciplines to assemble your quote request. Formal proposals provided under technical review and PE stamping.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/marketplace/equipamentos')}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>{lang === 'pt' ? 'Ver Equipamentos Solares' : 'View Solar Equipment'}</span>
            </button>

            <button
              onClick={() => onNavigate('/marketplace/cart')}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Ver Carrinho' : 'View Cart'} ({totalItems})</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'pt' ? 'Buscar serviço ou disciplina...' : 'Search service or discipline...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Price Rule Badge */}
            <div className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{lang === 'pt' ? 'Preços sob proposta técnica • Sem custos em tela' : 'Prices on technical RFP • No public pricing'}</span>
            </div>
          </div>

          {/* Category Chips Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {lang === 'pt' ? 'Todas as Verticais' : 'All Verticals'} ({servicesData.length})
            </button>

            {servicesData.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setSelectedCategory(svc.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === svc.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {getCategoryIcon(svc.iconName, 'w-3.5 h-3.5')}
                <span>{lang === 'pt' ? svc.title : svc.titleEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group"
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/80 group-hover:border-cyan-500/40 transition-colors">
                    {getCategoryIcon(svc.iconName, 'w-6 h-6')}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded uppercase font-bold">
                    {svc.categoryKey}
                  </span>
                </div>

                {/* Title & Short Description */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {lang === 'pt' ? svc.title : svc.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 mt-2 font-sans leading-relaxed">
                    {lang === 'pt' ? svc.shortDescription : svc.shortDescriptionEn}
                  </p>
                </div>

                {/* Main Disciplines */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    {lang === 'pt' ? 'Disciplinas Principais:' : 'Core Disciplines:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'pt' ? svc.disciplines : svc.disciplinesEn).slice(0, 4).map((d, dIdx) => (
                      <span 
                        key={dIdx} 
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/50"
                      >
                        {d}
                      </span>
                    ))}
                    {(lang === 'pt' ? svc.disciplines : svc.disciplinesEn).length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded text-cyan-400 font-mono">
                        +{(lang === 'pt' ? svc.disciplines : svc.disciplinesEn).length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlight Metric */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 truncate max-w-[170px]">
                    {lang === 'pt' ? svc.highlightMetric.label : svc.highlightMetric.labelEn}
                  </span>
                  <span className="text-cyan-300 font-bold">
                    {svc.highlightMetric.value}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleAddService(svc)}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    addedServices[svc.id]
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {addedServices[svc.id] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{lang === 'pt' ? 'Adicionado à Cotação!' : 'Added to Quote!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{lang === 'pt' ? 'Adicionar à Cotação' : 'Add to Quote Cart'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onNavigate(`/marketplace/servicos/${svc.id}`)}
                  className="w-full py-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{lang === 'pt' ? 'Ver Escopo & Disciplinas' : 'View Scope & Disciplines'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
