import React, { useState } from 'react';
import { NavRoute, Language, SolarProductItem } from '../../types';
import { solarProductsData } from '../../data/solarProductsData';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  Sun, Zap, ShieldCheck, Check, ShoppingCart, ArrowLeft, 
  Layers, Factory, Award, Building2, Plus, Minus, ArrowRight, FileText
} from 'lucide-react';

interface MarketplaceProductDetailPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
  productId: string;
}

export const MarketplaceProductDetailPage: React.FC<MarketplaceProductDetailPageProps> = ({
  onNavigate,
  lang,
  productId,
}) => {
  const { addProductToCart, totalItems } = useMarketplace();
  const product = solarProductsData.find((p) => p.id === productId || p.code === productId) || solarProductsData[0];
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addProductToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button 
            onClick={() => onNavigate('/marketplace')}
            className="hover:text-amber-400 cursor-pointer transition-colors"
          >
            Marketplace
          </button>
          <span>/</span>
          <button 
            onClick={() => onNavigate('/marketplace/equipamentos')}
            className="hover:text-amber-400 cursor-pointer transition-colors"
          >
            {lang === 'pt' ? 'Equipamentos' : 'Equipment'}
          </button>
          <span>/</span>
          <span className="text-amber-300 font-bold truncate max-w-[200px] sm:max-w-none">
            {product.code} - {product.name}
          </span>
        </div>

        {/* Hero Header */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0F1626] via-[#161208] to-[#0A0D16] border-2 border-amber-500/40 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/40">
                <Sun className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider">
                  ALDO SOLAR HOMOLOGADO • CÓDIGO {product.code}
                </span>
                <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
                  {product.name}
                </h1>
                <div className="text-xs font-mono text-slate-300 mt-1">
                  {product.systemModel}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-sm">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{product.powerKwp} kWp Total</span>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                PREÇO SOB COTAÇÃO
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl font-sans">
            {product.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
            <span>Aplicação: <strong className="text-white">{product.application}</strong></span>
            <span>•</span>
            <span>Fornecedor Homologado: <strong className="text-amber-300">{product.officialSupplier}</strong></span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Technical Specifications (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Spec Matrix Table */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <h2 className="text-lg font-heading font-bold text-white border-b border-slate-800 pb-3">
                {lang === 'pt' ? 'Ficha Técnica Detalhada do Gerador' : 'Detailed Generator Technical Datasheet'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block uppercase">{lang === 'pt' ? 'Potência de Geração:' : 'Generation Power:'}</span>
                  <span className="text-cyan-300 font-bold text-sm">{product.powerKwp} kWp</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block uppercase">{lang === 'pt' ? 'Fase & Tensão:' : 'Phase & Voltage:'}</span>
                  <span className="text-white font-bold">{product.phase} ({product.voltage})</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block uppercase">{lang === 'pt' ? 'Inversor Fotovoltaico:' : 'Solar Inverter:'}</span>
                  <span className="text-white font-bold">{product.inverterBrand}</span>
                  <span className="text-slate-400 block text-[11px]">{product.inverterModel}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block uppercase">{lang === 'pt' ? 'Módulos Fotovoltaicos:' : 'Solar Modules:'}</span>
                  <span className="text-white font-bold">{product.moduleBrand}</span>
                  <span className="text-slate-400 block text-[11px]">{product.moduleModel}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block uppercase">{lang === 'pt' ? 'Eficiência do Módulo:' : 'Module Efficiency:'}</span>
                  <span className="text-emerald-400 font-bold">{product.moduleEfficiency}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block uppercase">{lang === 'pt' ? 'Garantia de Performance:' : 'Performance Warranty:'}</span>
                  <span className="text-amber-300 font-bold text-[11px]">{product.moduleWarranty}</span>
                </div>

                <div className="sm:col-span-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block uppercase">{lang === 'pt' ? 'Estrutura & Fixação:' : 'Mounting Structure:'}</span>
                  <span className="text-white font-medium">{product.structureType}</span>
                </div>
              </div>
            </div>

            {/* Key Features List */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-heading font-bold text-white uppercase font-mono tracking-wider text-amber-400">
                {lang === 'pt' ? 'Destaques Construtivos & Proteções' : 'Constructive Highlights & Protections'}
              </h3>
              <div className="space-y-2">
                {product.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-sans text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart & Quote Action Box (Col 3) */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border-2 border-amber-500/40 space-y-5 shadow-xl sticky top-24">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 uppercase font-bold">
                  ORÇAMENTO DIRETO
                </span>
                <h3 className="text-lg font-heading font-black text-white">
                  {lang === 'pt' ? 'Adicionar à Cotação' : 'Add to Quote Cart'}
                </h3>
                <p className="text-xs text-slate-400 font-sans">
                  {lang === 'pt'
                    ? 'Esta ordem será encaminhada diretamente para a engenharia da Kraefegg M.O. para emissão de proposta oficial.'
                    : 'This order will be dispatched directly to Kraefegg M.O. engineering for an official proposal.'}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{lang === 'pt' ? 'Quantidade de Sistemas:' : 'Quantity of Systems:'}</span>
                  <span className="text-cyan-300 font-bold">{(product.powerKwp * quantity).toFixed(2)} kWp</span>
                </div>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-lg font-bold text-white w-12 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isAdded
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>{lang === 'pt' ? 'Adicionado com Sucesso!' : 'Successfully Added!'}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>{lang === 'pt' ? 'Adicionar à Cotação' : 'Add to Quote Cart'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/marketplace/cart')}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'pt' ? 'Ver Carrinho Completo' : 'View Quote Cart'} ({totalItems})</span>
                </button>
              </div>

              {/* Destination Notice */}
              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <span>Destino formal: <strong className="text-slate-200">kraefegg.mos3@gmail.com</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
