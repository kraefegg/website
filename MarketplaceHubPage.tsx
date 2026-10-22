import React, { useState } from 'react';
import { NavRoute, Language } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { solarProductsData, OFFICIAL_SOLAR_PARTNERSHIP } from '../../data/solarProductsData';
import { servicesData } from '../../data/servicesData';
import { 
  Sun, Wrench, ShieldCheck, ArrowRight, Zap, ShoppingCart, 
  CheckCircle2, Sparkles, Building2, Cpu, Factory, ChevronRight, 
  ExternalLink, FileText, Check, Phone, Mail, Award, Compass, Search
} from 'lucide-react';

interface MarketplaceHubPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const MarketplaceHubPage: React.FC<MarketplaceHubPageProps> = ({ onNavigate, lang }) => {
  const { totalItems, totalKwp, addProductToCart, addServiceToCart } = useMarketplace();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleAddProduct = (prod: any) => {
    addProductToCart(prod, 1);
    setAddedItems((prev) => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [prod.id]: false }));
    }, 2000);
  };

  const handleAddService = (svc: any) => {
    addServiceToCart({
      id: svc.id,
      title: lang === 'pt' ? svc.title : svc.titleEn,
      category: svc.categoryKey,
      disciplines: (lang === 'pt' ? svc.disciplines : svc.disciplinesEn).slice(0, 3),
    });
    setAddedItems((prev) => ({ ...prev, [svc.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [svc.id]: false }));
    }, 2000);
  };

  // Featured equipment (subset of 3 prominent solar generators)
  const featuredEquipment = solarProductsData.slice(0, 3);
  // Featured services (subset of 3 strategic verticals)
  const featuredServices = servicesData.filter(s => ['energy', 'technology', 'engineering'].includes(s.id));

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-14">
      {/* 1. Header & Official Institutional Identity */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Directives Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-bold tracking-wider uppercase">
              {lang === 'pt' ? 'PORTAL OFICIAL DE COTAÇÕES & ENGENHARIA KRAEFEGG M.O.' : 'OFFICIAL KRAEFEGG M.O. ENGINEERING & RFP PORTAL'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-amber-950/70 border border-amber-500/40 text-amber-300 font-bold">
              {lang === 'pt' ? 'DIRETRIZ: SEM PREÇO PÚBLICO • COTAÇÃO SOB DEMANDA' : 'DIRECTIVE: NO PUBLIC PRICE • RFP ON DEMAND'}
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Destinatário: <strong className="text-white">kraefegg.mos3@gmail.com</strong>
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060A14] via-[#091226] to-[#05070B] border-2 border-cyan-500/30 p-8 sm:p-12 shadow-2xl space-y-8">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>MARKETPLACE CORPORATIVO • ENGENHARIA & EQUIPAMENTOS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-tight">
              {lang === 'pt' ? (
                <>Soluções de Engenharia & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">Equipamentos Técnicos</span> Homologados</>
              ) : (
                <>Engineering Solutions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">Tier-1 Equipment</span> Systems</>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {lang === 'pt' ? (
                <>
                  A <strong className="text-white">Kraefegg M.O.</strong> presta serviços de engenharia consultiva, projetos executivos, homologação junto a concessionárias e comissionamento de campo, enquanto a <strong className="text-amber-400">Aldo Solar</strong> atua como nossa fornecedora oficial de equipamentos fotovoltaicos de classe mundial. Monte seu carrinho técnico e submeta sua cotação formal diretamente à nossa diretoria de engenharia.
                </>
              ) : (
                <>
                  <strong className="text-white">Kraefegg M.O.</strong> provides consultative engineering services, detailed designs, utility approvals, and EPC commissioning, while <strong className="text-amber-400">Aldo Solar</strong> serves as our official tier-1 photovoltaic equipment supplier. Assemble your technical quote cart and submit your formal RFP directly to our engineering board.
                </>
              )}
            </p>
          </div>

          {/* Core Action Navigation Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('/marketplace/servicos')}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2.5 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Explorar Serviços de Engenharia' : 'Explore Engineering Services'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/marketplace/equipamentos')}
              className="px-6 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold text-sm flex items-center gap-2.5 transition-all cursor-pointer"
            >
              <Sun className="w-4 h-4 text-amber-400" />
              <span>{lang === 'pt' ? 'Catálogo de Equipamentos (Aldo Solar)' : 'Equipment Catalog (Aldo Solar)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {totalItems > 0 && (
              <button
                onClick={() => onNavigate('/marketplace/cart')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-white font-mono text-sm flex items-center gap-2.5 transition-all cursor-pointer ml-auto"
              >
                <ShoppingCart className="w-4 h-4 text-cyan-400" />
                <span>
                  {lang === 'pt' ? 'Ver Ordem de Cotação' : 'View Quote Cart'} ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                </span>
                {totalKwp > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                    {totalKwp.toFixed(1)} kWp
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Dual Marketplace Entry Portals */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-heading font-black text-white">
              {lang === 'pt' ? 'Estrutura Central do Marketplace' : 'Core Marketplace Portals'}
            </h2>
            <p className="text-xs font-mono text-slate-400">
              {lang === 'pt' ? 'Selecione a categoria para compor sua solicitação estruturada' : 'Select a domain to build your structured technical request'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portal A: Serviços de Engenharia */}
          <div 
            onClick={() => onNavigate('/marketplace/servicos')}
            className="p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#080E1E] border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group shadow-xl space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Wrench className="w-32 h-32 text-cyan-400" />
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="p-3.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                <Wrench className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                11 VERTICAIS TÉCNICAS
              </span>
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-heading font-black text-white group-hover:text-cyan-300 transition-colors">
                {lang === 'pt' ? 'Serviços de Engenharia & Consultoria' : 'Engineering & Consulting Services'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {lang === 'pt'
                  ? 'Projetos elétricos executivos, estudos de viabilidade EVTE/LCOE, homologação junto a concessionárias de energia, emissão de ART por engenheiro habilitado, comissionamento e supervisão EPC.'
                  : 'Executive electrical designs, EVTE/LCOE feasibility, utility interconnection approvals, certified PE stamping, on-site commissioning and EPC supervision.'}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-cyan-300 relative z-10">
              <span>{lang === 'pt' ? 'Ver catálogo de disciplinas e escopos' : 'Browse disciplines and technical scope'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal B: Equipamentos Solares & Industriais (Aldo Solar) */}
          <div 
            onClick={() => onNavigate('/marketplace/equipamentos')}
            className="p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#171206] border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer group shadow-xl space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sun className="w-32 h-32 text-amber-400" />
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/40 text-amber-400">
                <Sun className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                ALDO SOLAR HOMOLOGADO
              </span>
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-heading font-black text-white group-hover:text-amber-300 transition-colors">
                {lang === 'pt' ? 'Equipamentos & Geradores Fotovoltaicos' : 'Photovoltaic Generators & Equipment'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {lang === 'pt'
                  ? 'Catálogo técnico de geradores fotovoltaicos Aldo Solar: inversores GoodWe, Growatt, CHINT e Solplanet; módulos de ultra-alta eficiência Jinko Tiger Neo N-Type TOPCon bifaciais com 30 anos de garantia.'
                  : 'Official technical catalog of Aldo Solar generators: GoodWe, Growatt, CHINT and Solplanet inverters; Jinko Tiger Neo N-Type TOPCon bifacial modules with 30-year performance warranties.'}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-amber-300 relative z-10">
              <span>{lang === 'pt' ? 'Ver catálogo de geradores e especificações' : 'Browse generators and technical specs'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Four Strategic Pillars of Application */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            {lang === 'pt' ? 'VERTICAIS DE APLICAÇÃO ESTRATÉGICA' : 'STRATEGIC VERTICAL APPLICATION'}
          </span>
          <h2 className="text-2xl font-heading font-black text-white mt-1">
            {lang === 'pt' ? 'Engenharia para Missões de Alta Demanda' : 'High-Demand Mission Engineering'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OFFICIAL_SOLAR_PARTNERSHIP.strategicSegments.map((seg, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-sm text-white leading-snug">
                {seg.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {seg.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Featured Equipment Showcase (Direct Add to Cart) */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
              {lang === 'pt' ? 'DESTAQUES DO CATÁLOGO TÉCNICO' : 'TECHNICAL CATALOG HIGHLIGHTS'}
            </span>
            <h2 className="text-2xl font-heading font-black text-white mt-1">
              {lang === 'pt' ? 'Geradores Fotovoltaicos em Destaque' : 'Featured Photovoltaic Generators'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/marketplace/equipamentos')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{lang === 'pt' ? 'Ver Todos os Equipamentos' : 'View All Equipment'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEquipment.map((prod) => (
            <div 
              key={prod.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded">
                    CÓD: {prod.code}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {prod.powerKwp} kWp
                  </span>
                </div>

                <h3 className="font-bold text-base text-white leading-snug">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {prod.description}
                </p>

                <div className="space-y-1 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inversor:</span>
                    <span className="text-slate-200 font-semibold">{prod.inverterBrand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Módulos:</span>
                    <span className="text-slate-200 truncate max-w-[160px]">{prod.moduleBrand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Preço:</span>
                    <span className="text-amber-400 font-bold">Sob Cotação</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleAddProduct(prod)}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    addedItems[prod.id]
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                  }`}
                >
                  {addedItems[prod.id] ? (
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
                  onClick={() => onNavigate(`/marketplace/produtos/${prod.id}`)}
                  className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer text-center"
                >
                  {lang === 'pt' ? 'Ver Ficha Técnica Completa' : 'View Full Datasheet'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Featured Engineering Services Packages */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              {lang === 'pt' ? 'SERVIÇOS DE ENGENHARIA KRAEFEGG M.O.' : 'KRAEFEGG M.O. ENGINEERING PACKAGES'}
            </span>
            <h2 className="text-2xl font-heading font-black text-white mt-1">
              {lang === 'pt' ? 'Pacotes de Consultoria e Homologação' : 'Consulting & Stamping Packages'}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/marketplace/servicos')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{lang === 'pt' ? 'Ver Todas as 11 Verticais' : 'View All 11 Verticals'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((svc) => (
            <div 
              key={svc.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded">
                    ENGENHARIA OFICIAL
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {svc.highlightMetric.value}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white leading-snug">
                  {lang === 'pt' ? svc.title : svc.titleEn}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3">
                  {lang === 'pt' ? svc.shortDescription : svc.shortDescriptionEn}
                </p>

                <div className="space-y-1 pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Disciplinas Inclusas:</div>
                  <div className="flex flex-wrap gap-1">
                    {(lang === 'pt' ? svc.disciplines : svc.disciplinesEn).slice(0, 3).map((d, dIdx) => (
                      <span key={dIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleAddService(svc)}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    addedItems[svc.id]
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {addedItems[svc.id] ? (
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
                  className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer text-center"
                >
                  {lang === 'pt' ? 'Ver Detalhes do Escopo' : 'View Scope Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Bottom Banner & Fast Forward to RFP */}
      <div className="max-w-7xl mx-auto">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-[#0b162c] to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-heading font-black text-white">
              {lang === 'pt' ? 'Pronto para formalizar sua ordem de cotação?' : 'Ready to formalize your technical RFP?'}
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              {lang === 'pt'
                ? 'Seus dados e especificações serão formatados em um manifesto técnico enviado diretamente para a diretoria técnica (kraefegg.mos3@gmail.com).'
                : 'Your specifications and selections will be compiled into a technical manifest forwarded directly to our engineering board.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('/marketplace/cart')}
              className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Ir para o Carrinho' : 'Go to Quote Cart'} ({totalItems})</span>
            </button>

            <button
              onClick={() => onNavigate('/marketplace/request')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-mono flex items-center gap-2 cursor-pointer border border-slate-700"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'pt' ? 'Preencher Formulário RFP' : 'Fill RFP Form'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
