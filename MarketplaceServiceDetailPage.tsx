import React, { useState } from 'react';
import { NavRoute, Language } from '../../types';
import { servicesData } from '../../data/servicesData';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Wrench, Leaf, Zap, Cpu, Factory, Pickaxe, Trees, 
  Sprout, Anchor, Compass, Building2, Layers, ArrowLeft, 
  Check, ShoppingCart, ShieldCheck, CheckCircle2, ChevronRight,
  FileText, ArrowRight
} from 'lucide-react';

interface MarketplaceServiceDetailPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
  serviceId: string;
}

export const MarketplaceServiceDetailPage: React.FC<MarketplaceServiceDetailPageProps> = ({
  onNavigate,
  lang,
  serviceId,
}) => {
  const { addServiceToCart, totalItems } = useMarketplace();
  const service = servicesData.find((s) => s.id === serviceId) || servicesData[0];

  const allDisciplines = lang === 'pt' ? service.disciplines : service.disciplinesEn;
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>(allDisciplines.slice(0, 3));
  const [customScope, setCustomScope] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  const toggleDiscipline = (disc: string) => {
    setSelectedDisciplines((prev) => 
      prev.includes(disc) ? prev.filter((d) => d !== disc) : [...prev, disc]
    );
  };

  const selectAllDisciplines = () => {
    setSelectedDisciplines(allDisciplines);
  };

  const handleAddToCart = () => {
    addServiceToCart({
      id: `${service.id}-${Date.now()}`,
      title: lang === 'pt' ? service.title : service.titleEn,
      category: service.categoryKey,
      disciplines: selectedDisciplines,
      customScope: customScope.trim() || undefined,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const getCategoryIcon = (iconName: string, className: string = 'w-6 h-6') => {
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

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button 
            onClick={() => onNavigate('/marketplace')}
            className="hover:text-cyan-400 cursor-pointer transition-colors"
          >
            Marketplace
          </button>
          <span>/</span>
          <button 
            onClick={() => onNavigate('/marketplace/servicos')}
            className="hover:text-cyan-400 cursor-pointer transition-colors"
          >
            {lang === 'pt' ? 'Serviços' : 'Services'}
          </button>
          <span>/</span>
          <span className="text-cyan-300 font-bold truncate max-w-[200px] sm:max-w-none">
            {lang === 'pt' ? service.title : service.titleEn}
          </span>
        </div>

        {/* Hero Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#070E20] via-slate-900 to-[#05070B] border-2 border-cyan-500/30 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40">
                {getCategoryIcon(service.iconName, 'w-8 h-8')}
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                  VERTICAL TÉCNICA OFICIAL • KRAEFEGG M.O.
                </span>
                <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">
                  {lang === 'pt' ? service.title : service.titleEn}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                {lang === 'pt' ? 'PREÇO SOB COTAÇÃO TÉCNICA' : 'PRICE ON FORMAL RFP'}
              </span>
            </div>
          </div>

          <p className="text-base text-slate-300 leading-relaxed max-w-4xl font-sans">
            {lang === 'pt' ? service.shortDescription : service.shortDescriptionEn}
          </p>

          {/* Metric Pill */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">
              {lang === 'pt' ? service.highlightMetric.label : service.highlightMetric.labelEn}:
            </span>
            <span className="text-cyan-300 font-bold text-sm">
              {service.highlightMetric.value}
            </span>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1 & 2: Disciplines & Scope Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Disciplines Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <h2 className="text-lg font-heading font-bold text-white">
                    {lang === 'pt' ? 'Selecione as Disciplinas Desejadas' : 'Select Required Disciplines'}
                  </h2>
                  <p className="text-xs text-slate-400 font-sans">
                    {lang === 'pt' 
                      ? 'Assinale quais especialidades devem constar na proposta técnica de engenharia'
                      : 'Check the specialized technical areas to be included in your proposal'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={selectAllDisciplines}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  {lang === 'pt' ? 'Marcar Todas' : 'Select All'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allDisciplines.map((disc, idx) => {
                  const isChecked = selectedDisciplines.includes(disc);
                  return (
                    <label
                      key={idx}
                      onClick={() => toggleDiscipline(disc)}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-cyan-950/40 border-cyan-500/50 text-white' 
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border shrink-0 transition-colors ${
                        isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-sans font-medium leading-snug">{disc}</span>
                    </label>
                  );
                })}
              </div>

              {/* Custom Scope Requirements Note */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <label className="block text-xs font-mono text-slate-300">
                  {lang === 'pt' ? 'Observações do Memorial Descritivo (Opcional):' : 'Custom Scope Notes (Optional):'}
                </label>
                <textarea
                  value={customScope}
                  onChange={(e) => setCustomScope(e.target.value)}
                  placeholder={lang === 'pt' ? 'Descreva o local da obra, prazos desejados, potência estimada ou restrições técnicas específicas...' : 'Describe project location, required timeline, estimated capacity, or technical constraints...'}
                  rows={3}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
              </div>

              {/* Add to Cart CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isAdded
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>{lang === 'pt' ? 'Serviço Adicionado à Cotação!' : 'Service Added to Quote!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>
                        {lang === 'pt' ? 'Adicionar Serviço à Cotação' : 'Add Service to Quote'} ({selectedDisciplines.length} {selectedDisciplines.length === 1 ? 'disciplina' : 'disciplinas'})
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tech Stack & Standards */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-heading font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
                {lang === 'pt' ? 'Instrumentação, Softwares & Tech Stack' : 'Instrumentation, Tools & Tech Stack'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Summary Sidebar & Industries */}
          <div className="space-y-6">
            {/* Direct Order Actions */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-5 shadow-xl sticky top-24">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 uppercase font-bold">
                  ORÇAMENTO FORMAL
                </span>
                <h3 className="text-base font-heading font-black text-white">
                  {lang === 'pt' ? 'Solicitação Estruturada' : 'Structured Quote Request'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {lang === 'pt'
                    ? 'Propostas elaboradas com memorial de cálculo, cronograma físico-financeiro e emissão de ART.'
                    : 'Formal proposals drafted with engineering memos, schedule, and official PE stamping.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Itens no Carrinho:</span>
                  <span className="text-cyan-400 font-bold">{totalItems}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Destino da Ordem:</span>
                  <span className="text-slate-200">kraefegg.mos3@gmail.com</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/marketplace/cart')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'pt' ? 'Ver Ordem de Cotação' : 'View Quote Cart'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/marketplace/request')}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Preencher Formulário RFP' : 'Fill RFP Form'}</span>
                </button>
              </div>
            </div>

            {/* Industries Served */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                {lang === 'pt' ? 'Indústrias & Mercados Atendidos:' : 'Target Industries:'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {service.industriesServed.map((ind, iIdx) => (
                  <span key={iIdx} className="text-[11px] px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Projects */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                {lang === 'pt' ? 'Cases & Projetos Relacionados:' : 'Related Project Cases:'}
              </h3>
              <div className="space-y-2">
                {service.relatedProjects.map((p, pIdx) => (
                  <div key={pIdx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 font-mono">
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
