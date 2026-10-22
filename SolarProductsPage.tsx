import React, { useState, useMemo } from 'react';
import { NavRoute, Language, SolarProductItem, BudgetOrderForm } from '../types';
import { solarProductsData, OFFICIAL_SOLAR_PARTNERSHIP } from '../data/solarProductsData';
import { 
  Sun, Zap, ShieldCheck, CheckCircle2, Plus, Minus, Trash2, 
  Send, Mail, Phone, Copy, Check, ArrowRight, ExternalLink, 
  Search, SlidersHorizontal, Cpu, Factory, Server, Atom, 
  Layers, ChevronRight, FileText, Sparkles, Building2, Wrench
} from 'lucide-react';

interface SolarProductsPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const SolarProductsPage: React.FC<SolarProductsPageProps> = ({ onNavigate, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInverter, setSelectedInverter] = useState<string>('all');
  const [detailModalProduct, setDetailModalProduct] = useState<SolarProductItem | null>(null);

  // Budget Order Cart State
  const [selectedCart, setSelectedCart] = useState<Record<string, number>>({});
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [orderSentSuccess, setOrderSentSuccess] = useState(false);
  const [copiedProtocol, setCopiedProtocol] = useState(false);

  // Form State
  const [formData, setFormData] = useState<BudgetOrderForm>({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    projectType: 'Autossuficiência Energética Industrial',
    estimatedKwp: '',
    targetTimeline: 'Imediato (1 a 3 meses)',
    selectedServices: [
      'Projeto Executivo Elétrico & Homologação na Concessionária',
      'Emissão de ART por Engenheiro Habilitado',
    ],
    notes: '',
  });

  const availableEngineeringServices = [
    'Estudo de Viabilidade Técnica e Financeira (EVTE / LCOE)',
    'Projeto Executivo Elétrico & Homologação na Concessionária',
    'Emissão de ART (Anotação de Responsabilidade Técnica)',
    'Supervisão EPC e Comissionamento Técnico em Campo',
    'Integração SCADA Industrial & Telemetria em Tempo Real (PentaHydra)',
    'Licenciamento e Conformidade Ambiental (Oxygen Ecosystem)',
    'Modelagem Dinâmica Solar para Data Centers / Hidrogênio Verde',
  ];

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return solarProductsData.filter((prod) => {
      const matchesSearch = 
        !searchQuery ||
        prod.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.systemModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.inverterBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.moduleBrand.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = 
        selectedCategory === 'all' || prod.category === selectedCategory;

      const matchesInverter = 
        selectedInverter === 'all' || 
        prod.inverterBrand.toLowerCase().includes(selectedInverter.toLowerCase());

      return matchesSearch && matchesCat && matchesInverter;
    });
  }, [searchQuery, selectedCategory, selectedInverter]);

  // Cart helper functions
  const addToCart = (product: SolarProductItem) => {
    setSelectedCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    setIsOrderDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setSelectedCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSelectedCart((prev) => {
      const current = prev[productId] || 0;
      const nextVal = current + delta;
      if (nextVal <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: nextVal };
    });
  };

  const selectedItemsList = useMemo(() => {
    return Object.entries(selectedCart).map(([id, qty]) => {
      const item = solarProductsData.find((p) => p.id === id)!;
      return { product: item, quantity: qty };
    }).filter((entry) => !!entry.product);
  }, [selectedCart]);

  const totalSelectedKwp = useMemo(() => {
    return selectedItemsList.reduce(
      (acc, item) => acc + item.product.powerKwp * item.quantity, 
      0
    );
  }, [selectedItemsList]);

  const totalItemCount = useMemo(() => {
    return selectedItemsList.reduce((acc, item) => acc + item.quantity, 0);
  }, [selectedItemsList]);

  // Generate unique order protocol
  const orderProtocol = useMemo(() => {
    return `ORD-KLG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  const handleToggleService = (svc: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(svc);
      return {
        ...prev,
        selectedServices: exists 
          ? prev.selectedServices.filter(s => s !== svc)
          : [...prev.selectedServices, svc]
      };
    });
  };

  // Compose Email Text
  const composeOrderManifest = () => {
    const header = `ORDEM DE ORÇAMENTO TÉCNICO • KRAEFEGG M.O. & ALDO SOLAR\nProtocolo: ${orderProtocol}\nData: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}\nDestinatário Oficial: ${OFFICIAL_SOLAR_PARTNERSHIP.orderRecipientEmail}\n\n`;
    
    const clientSection = `--- DADOS DO CLIENTE / SOLICITANTE ---\nNome: ${formData.name || 'Não informado'}\nEmpresa: ${formData.company || 'Não informado'}\nE-mail: ${formData.email || 'Não informado'}\nTelefone/WhatsApp: ${formData.phone || 'Não informado'}\nLocalização: ${formData.city}/${formData.state || 'Não informado'}\nTipo de Aplicação: ${formData.projectType}\nPrazo Previsto: ${formData.targetTimeline}\n\n`;
    
    const productsSection = `--- EQUIPAMENTOS SELECIONADOS (FORNECEDOR OFICIAL ALDO SOLAR) ---\n` +
      selectedItemsList.map((item, idx) => 
        `${idx + 1}. [Código ${item.product.code}] ${item.product.name}\n   Modelo: ${item.product.systemModel}\n   Potência Unitária: ${item.product.powerKwp} kWp | Quantidade: ${item.quantity} un.\n   Inversor: ${item.product.inverterBrand} (${item.product.inverterModel})\n   Módulos: ${item.product.moduleBrand} ${item.product.moduleModel} (${item.product.moduleEfficiency})\n   Estrutura: ${item.product.structureType}\n`
      ).join('\n') + `\nPOTÊNCIA TOTAL ACUMULADA: ${totalSelectedKwp.toFixed(2)} kWp\n(Preço sob cotação oficial com engenharia - Conforme diretriz sem exibição de preço público)\n\n`;

    const servicesSection = `--- SERVIÇOS DE ENGENHARIA KRAEFEGG M.O. SOLICITADOS ---\n` +
      (formData.selectedServices.length > 0 
        ? formData.selectedServices.map(s => `• ${s}`).join('\n')
        : 'Nenhum serviço de engenharia adicional assinalado.') + `\n\n`;

    const notesSection = `--- OBSERVAÇÕES COMPLEMENTARES ---\n${formData.notes || 'Sem observações adicionais.'}\n\n--- DIRETRIZ INSTITUCIONAL ---\nA Kraefegg M.O. presta serviços de engenharia e Aldo Solar é a fornecedora oficial de equipamentos. Ordem gerada via portal institucional Kraefegg M.O.`;

    return header + clientSection + productsSection + servicesSection + notesSection;
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`[Ordem de Orçamento Solar] ${orderProtocol} - ${formData.company || formData.name || 'Cliente Solar'}`);
    const body = encodeURIComponent(composeOrderManifest());
    const mailtoUrl = `mailto:${OFFICIAL_SOLAR_PARTNERSHIP.orderRecipientEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
    setOrderSentSuccess(true);
  };

  const handleSendWhatsApp = () => {
    const rawText = composeOrderManifest();
    const encodedText = encodeURIComponent(rawText);
    const targetPhone = '5561998850946'; // Direção técnica
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    setOrderSentSuccess(true);
  };

  const handleCopyManifest = () => {
    navigator.clipboard.writeText(composeOrderManifest());
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Official Partnership Hero Banner */}
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060A14] via-[#091022] to-[#05070B] border-2 border-amber-500/40 p-8 sm:p-12 shadow-2xl space-y-8">
          {/* Background Atmospheric Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>PARCERIA OFICIAL HOMOLOGADA • KRAEFEGG M.O. & ALDO SOLAR</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded bg-black/60 border border-slate-700 text-slate-300 text-[11px] font-mono">
                {lang === 'pt' ? 'DIRETRIZ DE PRIVACIDADE: PREÇO SOB COTAÇÃO' : 'PRIVACY DIRECTIVE: PRICE ON RFP'}
              </span>
              <span className="px-3 py-1 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold">
                ORDEM → kraefegg.mos3@gmail.com
              </span>
            </div>
          </div>

          {/* Title & Core Statement */}
          <div className="relative z-10 space-y-4 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-tight">
              Marketplace de Equipamentos Solares & Serviços de Engenharia
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              <strong className="text-amber-400">A Kraefegg M.O. presta serviços de engenharia</strong> (projetos executivos, parecer de acesso, estudos de viabilidade, ART e comissionamento) e a <strong className="text-white">Aldo Solar é nossa fornecedora oficial de equipamentos</strong>. Selecione os produtos para montar sua ordem de orçamento e encaminhar diretamente para nossa diretoria técnica.
            </p>
          </div>

          {/* 4 Strategic Segments Pillars */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            {OFFICIAL_SOLAR_PARTNERSHIP.strategicSegments.map((seg, sIdx) => (
              <div 
                key={sIdx}
                className="p-4 rounded-xl bg-black/40 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2 group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                  <h2 className="text-xs font-mono font-bold text-amber-300 leading-tight">
                    {seg.title}
                  </h2>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  {seg.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Action Navigation Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('/services')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-cyan-300 transition-colors"
              >
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ver Matriz Geral de Serviços de Engenharia</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('/markets/datacenter-solar')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 hover:border-amber-400 text-amber-300 transition-colors"
              >
                <Server className="w-3.5 h-3.5 text-amber-400" />
                <span>Solar para Data Centers</span>
              </button>
              <button
                onClick={() => onNavigate('/markets/green-hydrogen')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 hover:border-emerald-400 text-emerald-300 transition-colors"
              >
                <Atom className="w-3.5 h-3.5 text-emerald-400" />
                <span>Solar para H₂ Verde</span>
              </button>
            </div>

            {totalItemCount > 0 && (
              <button
                onClick={() => setIsOrderDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Ver Ordem de Orçamento ({totalItemCount} itens • {totalSelectedKwp.toFixed(2)} kWp)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Filter and Search Controls */}
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código (ex: 589640-9), GoodWe, Jinko, Leapton, kWp..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition-colors font-mono"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtrar:
            </span>
            {[
              { id: 'all', label: 'Todos os Equipamentos' },
              { id: 'distributed', label: 'Residencial & Comercial (0.6 a 3.1 kWp)' },
              { id: 'commercial', label: 'Comercial & PME (3.7 a 5 kWp)' },
              { id: 'industrial', label: 'Autossuficiência Industrial' },
              { id: 'utility_h2v_datacenter', label: 'Usinas Solares / Data Center / H2V' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                    : 'bg-black/40 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Informational Sub-strip: No price policy explanation */}
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs font-mono text-cyan-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>
              <strong>Política Comercial de Precisão:</strong> Valores monetários não são expostos publicamente. As cotações são calculadas com condições exclusivas de integrador parceiro Aldo Solar e associadas aos serviços de engenharia da Kraefegg M.O.
            </span>
          </div>
          <span className="hidden sm:inline-block text-slate-400">
            Total listado: {filteredProducts.length} sistemas
          </span>
        </div>
      </div>

      {/* 3. Products Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const inCartCount = selectedCart[product.id] || 0;

            return (
              <div
                key={product.id}
                className={`relative flex flex-col rounded-2xl bg-gradient-to-b from-[#080D1A] to-[#04060C] border transition-all duration-300 overflow-hidden group ${
                  inCartCount > 0 
                    ? 'border-amber-500/70 shadow-[0_0_25px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/50' 
                    : 'border-slate-800 hover:border-slate-700 shadow-xl'
                }`}
              >
                {/* Top Visual Header with Distributor Badge */}
                <div className="p-5 pb-3 border-b border-slate-800/80 bg-black/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500/40 text-[10px] font-mono text-amber-400 font-bold tracking-wider uppercase">
                      Aldo Solar
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Cód: <strong className="text-white">{product.code}</strong>
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold">
                    {product.phase} • {product.voltage}
                  </span>
                </div>

                {/* Main Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-heading font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400 font-semibold leading-relaxed">
                      {product.systemModel}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Technical Spec Box */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/60">
                      <div className="text-[10px] text-slate-400 uppercase">Potência Nominal</div>
                      <div className="text-sm font-bold text-amber-400 mt-0.5">{product.powerKwp} kWp</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/60">
                      <div className="text-[10px] text-slate-400 uppercase">Inversor</div>
                      <div className="text-xs font-bold text-white truncate mt-0.5">{product.inverterBrand}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/60">
                      <div className="text-[10px] text-slate-400 uppercase">Módulos</div>
                      <div className="text-xs font-bold text-slate-200 truncate mt-0.5">{product.moduleBrand}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/60">
                      <div className="text-[10px] text-slate-400 uppercase">Eficiência</div>
                      <div className="text-xs font-bold text-emerald-400 mt-0.5">{product.moduleEfficiency}</div>
                    </div>
                  </div>

                  {/* Pricing Placeholder Strip (Strict User Rule: Não exiba preço) */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Cotação & Orçamento</div>
                      <div className="text-xs font-mono font-bold text-amber-300">Sob Demanda de Engenharia</div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-1 rounded border border-cyan-500/30">
                      Sem Preço Público
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setDetailModalProduct(product)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-mono text-slate-200 transition-colors text-center cursor-pointer"
                    >
                      Ver Composição
                    </button>

                    {inCartCount === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Adicionar</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-amber-950/70 border border-amber-500/50 rounded-xl px-2 py-1">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-6 h-6 rounded bg-black/60 text-amber-300 flex items-center justify-center hover:bg-black transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-amber-300 px-1">
                          {inCartCount}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-6 h-6 rounded bg-black/60 text-amber-300 flex items-center justify-center hover:bg-black transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Floating / Docked Quick Access Cart Strip (When items selected) */}
      {totalItemCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-bottom-5 duration-200 w-[min(92vw,460px)]">
          <button
            onClick={() => setIsOrderDrawerOpen(true)}
            className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-2xl shadow-amber-500/40 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 fill-current text-slate-950" />
              </div>
              <div className="text-left">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-900">Ordem de Orçamento</div>
                <div className="text-sm font-extrabold">{totalItemCount} Equipamento(s) • {totalSelectedKwp.toFixed(2)} kWp</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 shrink-0" />
          </button>
        </div>
      )}

      {/* 5. Detail Modal ("Ver Composição") */}
      {detailModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#080D1A] border-2 border-amber-500/50 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 text-xs font-mono font-bold border border-amber-500/40">
                    Fornecedor: Aldo Solar
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Código: <strong className="text-white">{detailModalProduct.code}</strong>
                  </span>
                </div>
                <h3 className="text-xl font-heading font-black text-white mt-2">
                  {detailModalProduct.name}
                </h3>
                <div className="text-xs font-mono text-cyan-400 mt-0.5">
                  {detailModalProduct.systemModel}
                </div>
              </div>

              <button
                onClick={() => setDetailModalProduct(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Technical Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="text-slate-400 text-[10px]">POTÊNCIA</div>
                <div className="text-amber-400 font-bold text-sm mt-1">{detailModalProduct.powerKwp} kWp</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="text-slate-400 text-[10px]">REDE / FASE</div>
                <div className="text-white font-bold text-sm mt-1">{detailModalProduct.phase}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="text-slate-400 text-[10px]">TENSÃO</div>
                <div className="text-cyan-400 font-bold text-sm mt-1">{detailModalProduct.voltage}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="text-slate-400 text-[10px]">GARANTIA MÓDULO</div>
                <div className="text-emerald-400 font-bold text-sm mt-1">30 Anos</div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Memorial Descritivo & Aplicação
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-black/30 p-4 rounded-xl border border-slate-800">
                {detailModalProduct.description}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Destaques Tecnológicos do Kit
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {detailModalProduct.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Services included from Kraefegg */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Serviços de Engenharia Kraefegg M.O. Disponíveis
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {detailModalProduct.engineeringServicesAvailable.map((svc, sIdx) => (
                  <div key={sIdx} className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{svc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Preço: <strong className="text-amber-400">Consulte Orçamento Oficial</strong>
              </span>

              <button
                onClick={() => {
                  addToCart(detailModalProduct);
                  setDetailModalProduct(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs font-mono hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar à Ordem de Orçamento</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Budget Order Drawer / Form ("Ordem de Orçamento") */}
      {isOrderDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl h-full bg-[#080C16] border-l-2 border-amber-500/50 p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-950 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase">
                  <span>ORDEM DE ORÇAMENTO TÉCNICO</span>
                </div>
                <h3 className="text-2xl font-heading font-black text-white mt-2">
                  Memorial de Equipamentos & Serviços
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Protocolo: <span className="text-cyan-400 font-bold">{orderProtocol}</span> • Destino: <span className="text-amber-300 font-bold">{OFFICIAL_SOLAR_PARTNERSHIP.orderRecipientEmail}</span>
                </div>
              </div>

              <button
                onClick={() => setIsOrderDrawerOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Selected Equipment Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 uppercase tracking-wider font-bold">
                  Equipamentos Selecionados ({totalItemCount})
                </span>
                <span className="text-amber-400 font-bold">
                  Potência Total: {totalSelectedKwp.toFixed(2)} kWp
                </span>
              </div>

              {selectedItemsList.length === 0 ? (
                <div className="p-6 rounded-2xl bg-black/40 border border-slate-800 text-center space-y-2">
                  <Sun className="w-8 h-8 text-slate-600 mx-auto" />
                  <div className="text-sm font-mono text-slate-400">Nenhum equipamento selecionado ainda.</div>
                  <div className="text-xs text-slate-500">Selecione geradores no catálogo para compor sua ordem.</div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {selectedItemsList.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="p-3.5 rounded-xl bg-black/40 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-amber-400 font-bold">
                            [{product.code}]
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            {product.powerKwp} kWp • {product.phase}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white truncate mt-0.5">
                          {product.name}
                        </div>
                        <div className="text-[11px] font-mono text-cyan-400 truncate">
                          Inversor: {product.inverterBrand} | Painel: {product.moduleBrand}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-5 h-5 rounded bg-black text-amber-300 flex items-center justify-center hover:bg-slate-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-white px-1">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-5 h-5 rounded bg-black text-amber-300 flex items-center justify-center hover:bg-slate-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
                          title="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Engineering Services Selection Checklist */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Serviços de Engenharia Kraefegg M.O. para Agregar à Ordem
              </div>
              <div className="space-y-2">
                {availableEngineeringServices.map((svc, idx) => {
                  const checked = formData.selectedServices.includes(svc);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleService(svc)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs font-mono transition-colors flex items-center gap-2.5 cursor-pointer ${
                        checked
                          ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                          : 'bg-black/30 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        checked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
                      }`}>
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-tight">{svc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Client Information Form */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Dados do Solicitante / Contratante
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">NOME COMPLETO *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome ou responsável"
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">EMPRESA / RAZÃO SOCIAL</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Empresa, Indústria ou Autônomo"
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">E-MAIL CORPORATIVO *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contato@empresa.com"
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">TELEFONE / WHATSAPP *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(XX) XXXXX-XXXX"
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">CIDADE / UF</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ex: Brasília/DF, Campina Grande/PB..."
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-[10px] block mb-1">TIPO DE PROJETO</label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-800 text-white focus:outline-none focus:border-amber-500/60"
                  >
                    <option value="Autossuficiência Energética Industrial">Autossuficiência Industrial (Autoprodução)</option>
                    <option value="Usinas Solares para Produção de Hidrogênio Verde">Usinas Solares para H₂ Verde</option>
                    <option value="Solar + BESS para Data Centers">Solar + BESS para Data Centers</option>
                    <option value="Geração Distribuída Comercial & Residencial">Geração Distribuída Comercial</option>
                    <option value="Usinas Fotovoltaicas de Grande Porte">Usina de Grande Porte (Centralizada)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-[10px] font-mono block mb-1">OBSERVAÇÕES TÉCNICAS / ESPECIFICAÇÕES DE CAMPO</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Informações sobre conexão à concessionária, nível de tensão, área disponível em m² ou hectares, etc."
                  className="w-full p-2.5 rounded-xl bg-black/60 border border-slate-800 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/60"
                />
              </div>
            </div>

            {/* Transmission Action Strip */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs font-mono text-amber-300">
                A ordem será formalizada e endereçada diretamente à caixa postal oficial <strong>kraefegg.mos3@gmail.com</strong> com cópia para nossa diretoria de engenharia e fornecedor Aldo Solar.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs font-mono hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Transmitir por E-mail (kraefegg.mos3@gmail.com)</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmitir via WhatsApp Oficial</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyManifest}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedProtocol ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Memorial Copiado para Área de Transferência!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copiar Memorial Completo da Ordem</span>
                  </>
                )}
              </button>
            </div>

            {orderSentSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 text-xs font-mono space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Ordem de Orçamento Transmitida com Sucesso!</span>
                </div>
                <p>
                  Sua requisição sob protocolo <strong>{orderProtocol}</strong> foi aberta e encaminhada para <strong>kraefegg.mos3@gmail.com</strong>. Nosso corpo de engenheiros entrará em contato em até 24 horas úteis com o memorial de cálculo e cotação homologada Aldo Solar.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
