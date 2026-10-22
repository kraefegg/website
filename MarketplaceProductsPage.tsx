import React, { useState, useMemo } from 'react';
import { NavRoute, Language, SolarProductItem } from '../../types';
import { solarProductsData, OFFICIAL_SOLAR_PARTNERSHIP } from '../../data/solarProductsData';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Sun, Search, ShoppingCart, Check, ChevronRight, ShieldCheck, 
  Wrench, ArrowRight, Zap, Factory, Server, Atom, CheckCircle2, 
  SlidersHorizontal, Plus, Minus
} from 'lucide-react';

interface MarketplaceProductsPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const MarketplaceProductsPage: React.FC<MarketplaceProductsPageProps> = ({ onNavigate, lang }) => {
  const { addProductToCart, totalItems, totalKwp } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInverter, setSelectedInverter] = useState<string>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const cur = prev[id] || 1;
      const next = cur + delta;
      return { ...prev, [id]: next > 0 ? next : 1 };
    });
  };

  const handleAddToCart = (product: SolarProductItem) => {
    const qty = quantities[product.id] || 1;
    addProductToCart(product, qty);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const filteredProducts = useMemo(() => {
    return solarProductsData.filter((prod) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        prod.code.toLowerCase().includes(q) ||
        prod.name.toLowerCase().includes(q) ||
        prod.systemModel.toLowerCase().includes(q) ||
        prod.inverterBrand.toLowerCase().includes(q) ||
        prod.moduleBrand.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchesInverter = selectedInverter === 'all' || prod.inverterBrand.toLowerCase() === selectedInverter.toLowerCase();
      const matchesPhase = selectedPhase === 'all' || prod.phase.toLowerCase().includes(selectedPhase.toLowerCase());

      return matchesSearch && matchesCat && matchesInverter && matchesPhase;
    });
  }, [searchQuery, selectedCategory, selectedInverter, selectedPhase]);

  const inverterBrands = ['GoodWe', 'CHINT', 'Growatt', 'Solplanet'];

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button 
            onClick={() => onNavigate('/marketplace')}
            className="hover:text-amber-400 cursor-pointer transition-colors"
          >
            Marketplace
          </button>
          <span>/</span>
          <span className="text-amber-300 font-bold">
            {lang === 'pt' ? 'Equipamentos & Geradores Solares (Aldo Solar)' : 'Solar Equipment & Generators (Aldo Solar)'}
          </span>
        </div>

        {/* Official Partnership Hero Strip */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0C1222] via-[#141208] to-[#0A0D16] border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>FORNECEDOR HOMOLOGADO • ALDO SOLAR & KRAEFEGG M.O.</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black text-white">
                {lang === 'pt' ? 'Catálogo de Equipamentos Fotovoltaicos' : 'Photovoltaic Equipment Catalog'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-sans">
                {lang === 'pt'
                  ? 'A Kraefegg M.O. presta serviços de engenharia de alta complexidade e a Aldo Solar é nossa fornecedora oficial de equipamentos fotovoltaicos. Selecione os geradores para compor sua ordem de orçamento técnico.'
                  : 'Kraefegg M.O. delivers consultative engineering and Aldo Solar serves as our official equipment supplier. Select generators to build your formal quote order.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('/marketplace/servicos')}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>{lang === 'pt' ? 'Ver Serviços de Engenharia' : 'Engineering Services'}</span>
              </button>

              <button
                onClick={() => onNavigate('/marketplace/cart')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-amber-500/20"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{lang === 'pt' ? 'Ver Carrinho' : 'View Cart'} ({totalItems})</span>
                {totalKwp > 0 && <span className="font-mono text-[11px] font-bold">| {totalKwp.toFixed(1)} kWp</span>}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Diretriz Comercial: <strong className="text-amber-300">Sem Exibição de Preços Públicos</strong> • Cotações encaminhadas para <strong className="text-white">kraefegg.mos3@gmail.com</strong></span>
            </span>
            <span className="text-cyan-300 font-bold">Garantia Linear de 30 Anos nos Módulos TOPCon</span>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'pt' ? 'Código, marca ou modelo...' : 'Search code, brand, model...'}
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">{lang === 'pt' ? 'Todas as Categorias' : 'All Categories'}</option>
              <option value="distributed">{lang === 'pt' ? 'Geração Distribuída' : 'Distributed Generation'}</option>
              <option value="commercial">{lang === 'pt' ? 'Comercial & PME' : 'Commercial & SME'}</option>
              <option value="industrial">{lang === 'pt' ? 'Industrial & Agronegócio' : 'Industrial & Agro'}</option>
              <option value="utility_h2v_datacenter">{lang === 'pt' ? 'Grandes Usinas / H2V / Data Center' : 'Utility Scale / H2V / Data Center'}</option>
            </select>

            {/* Inverter Brand Select */}
            <select
              value={selectedInverter}
              onChange={(e) => setSelectedInverter(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">{lang === 'pt' ? 'Todos os Inversores' : 'All Inverters'}</option>
              {inverterBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            {/* Phase Select */}
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="all">{lang === 'pt' ? 'Todas as Fases' : 'All Phases'}</option>
              <option value="monofásico">{lang === 'pt' ? 'Monofásico 220V' : 'Single Phase 220V'}</option>
              <option value="trifásico">{lang === 'pt' ? 'Trifásico (220V / 380V)' : 'Three Phase (220V / 380V)'}</option>
            </select>
          </div>
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const qty = quantities[prod.id] || 1;
            return (
              <div
                key={prod.id}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded">
                      CÓD: {prod.code}
                    </span>
                    <div className="flex items-center gap-1 text-cyan-300 font-mono font-bold text-xs bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{prod.powerKwp} kWp</span>
                    </div>
                  </div>

                  {/* Title & Model */}
                  <div>
                    <h3 className="text-base font-heading font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {prod.name}
                    </h3>
                    <div className="text-[11px] font-mono text-slate-400 mt-1 line-clamp-1">
                      {prod.systemModel}
                    </div>
                  </div>

                  {/* Specs List */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Inversor:</span>
                      <span className="text-slate-200 font-medium">{prod.inverterBrand} ({prod.inverterModel})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Módulos:</span>
                      <span className="text-slate-200 font-medium truncate max-w-[170px]">{prod.moduleBrand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tensão / Fase:</span>
                      <span className="text-slate-300">{prod.voltage} • {prod.phase}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800">
                      <span className="text-slate-500">Preço:</span>
                      <span className="text-amber-400 font-bold">Sob Cotação</span>
                    </div>
                  </div>
                </div>

                {/* Quantity and Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-slate-400">{lang === 'pt' ? 'Qtd:' : 'Qty:'}</span>
                    <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleQtyChange(prod.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-white w-6 text-center">{qty}</span>
                      <button
                        type="button"
                        onClick={() => handleQtyChange(prod.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(prod)}
                      className={`flex-1 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        addedItems[prod.id]
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                      }`}
                    >
                      {addedItems[prod.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>{lang === 'pt' ? 'Adicionado!' : 'Added!'}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{lang === 'pt' ? 'Adicionar' : 'Add to Cart'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(`/marketplace/produtos/${prod.id}`)}
                    className="w-full py-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer text-center"
                  >
                    {lang === 'pt' ? 'Ficha Técnica Completa' : 'Full Technical Datasheet'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
