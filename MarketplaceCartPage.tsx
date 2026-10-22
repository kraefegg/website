import React, { useState } from 'react';
import { NavRoute, Language } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, 
  Wrench, Sun, ShieldCheck, Check, Sparkles, AlertCircle, FileText
} from 'lucide-react';

interface MarketplaceCartPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const MarketplaceCartPage: React.FC<MarketplaceCartPageProps> = ({ onNavigate, lang }) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalKwp 
  } = useMarketplace();

  // Additional Engineering Services Checkbox list
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Projeto Executivo Elétrico & Homologação na Concessionária',
    'Emissão de ART por Engenheiro Habilitado (CREA/CONFEA)',
  ]);

  const engineeringAddons = [
    'Estudo de Viabilidade Técnica e Econômica (EVTE / LCOE)',
    'Projeto Executivo Elétrico & Homologação na Concessionária',
    'Emissão de ART por Engenheiro Habilitado (CREA/CONFEA)',
    'Supervisão EPC e Comissionamento Técnico em Campo',
    'Integração SCADA & Telemetria Industrial (PentaHydra)',
    'Licenciamento e Gestão de Conformidade Ambiental (Oxygen)',
  ];

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) => 
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <button 
            onClick={() => onNavigate('/marketplace')}
            className="hover:text-cyan-400 cursor-pointer transition-colors"
          >
            Marketplace
          </button>
          <span>/</span>
          <span className="text-cyan-300 font-bold">
            {lang === 'pt' ? 'Ordem de Cotação (Carrinho)' : 'Quote Cart'}
          </span>
        </div>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{lang === 'pt' ? 'CARRINHO DE PROPOSTA TÉCNICA' : 'TECHNICAL QUOTE CART'}</span>
            </div>
            <h1 className="text-3xl font-heading font-black text-white">
              {lang === 'pt' ? 'Sua Ordem de Cotação' : 'Your Quote Request Order'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {lang === 'pt'
                ? 'Revise os produtos e serviços selecionados antes de submeter sua solicitação formal de orçamento.'
                : 'Review your selected equipment and engineering services before submitting your formal RFP.'}
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 hover:bg-rose-950/40 text-rose-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>{lang === 'pt' ? 'Limpar Carrinho' : 'Clear Cart'}</span>
            </button>
          )}
        </div>

        {/* If Cart is Empty */}
        {cartItems.length === 0 ? (
          <div className="p-12 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-heading font-bold text-white">
                {lang === 'pt' ? 'Seu carrinho de cotação está vazio' : 'Your quote cart is empty'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                {lang === 'pt'
                  ? 'Navegue pelo nosso catálogo de serviços de engenharia ou equipamentos solares para montar sua ordem técnica.'
                  : 'Browse our engineering services or solar equipment catalogs to assemble your technical RFP.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/marketplace/servicos')}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-cyan-500/20"
              >
                <Wrench className="w-4 h-4" />
                <span>{lang === 'pt' ? 'Ver Serviços de Engenharia' : 'Browse Services'}</span>
              </button>
              <button
                onClick={() => onNavigate('/marketplace/equipamentos')}
                className="px-5 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>{lang === 'pt' ? 'Ver Equipamentos Solares' : 'Browse Solar Equipment'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Non-Empty Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List (Col 1 & 2) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                          item.type === 'product' 
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30' 
                            : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/30'
                        }`}>
                          {item.type === 'product' ? <Sun className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                              item.type === 'product' ? 'bg-amber-950 text-amber-300' : 'bg-cyan-950 text-cyan-300'
                            }`}>
                              {item.type === 'product' ? 'EQUIPAMENTO FOTOVOLTAICO' : 'SERVIÇO DE ENGENHARIA'}
                            </span>
                            {item.powerKwp && (
                              <span className="text-[11px] font-mono font-bold text-cyan-300">
                                {item.powerKwp} kWp un.
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading font-bold text-base text-white">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-xs text-slate-400 font-mono">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                        title={lang === 'pt' ? 'Remover item' : 'Remove item'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Specific Details */}
                    {item.type === 'product' && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/80 text-[11px] font-mono text-slate-300">
                        {item.details.inverterBrand && (
                          <div>
                            <span className="text-slate-500 block">Inversor:</span>
                            <span>{item.details.inverterBrand}</span>
                          </div>
                        )}
                        {item.details.moduleBrand && (
                          <div>
                            <span className="text-slate-500 block">Módulo:</span>
                            <span className="truncate block">{item.details.moduleBrand}</span>
                          </div>
                        )}
                        {item.details.voltage && (
                          <div>
                            <span className="text-slate-500 block">Tensão:</span>
                            <span>{item.details.voltage}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {item.type === 'service' && item.details.disciplines && item.details.disciplines.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-950/80 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block">
                          {lang === 'pt' ? 'Disciplinas Incluídas:' : 'Included Disciplines:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.details.disciplines.map((d, dIdx) => (
                            <span key={dIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.details.customScope && (
                      <div className="p-2.5 rounded-xl bg-slate-950/60 text-xs font-sans text-slate-300 italic border border-slate-800/80">
                        "{item.details.customScope}"
                      </div>
                    )}

                    {/* Footer Row: Quantity & Power */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono">
                      <span className="text-amber-400 font-bold">
                        Preço sob Cotação Formal
                      </span>

                      {item.type === 'product' ? (
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">Qtd:</span>
                          <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-bold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          {item.powerKwp && (
                            <span className="text-cyan-300 font-bold ml-1">
                              = {(item.powerKwp * item.quantity).toFixed(2)} kWp
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400">1 Escopo Técnico</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Add-ons Checklist */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider font-mono text-cyan-400">
                    {lang === 'pt' ? 'Serviços de Engenharia Homologados (Opcional)' : 'Authorized Engineering Add-ons (Optional)'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'pt'
                      ? 'Assinale os serviços de engenharia que você deseja incluir na minuta de proposta técnica'
                      : 'Check the engineering services you wish to include in your technical proposal draft'}
                  </p>
                </div>

                <div className="space-y-2">
                  {engineeringAddons.map((addon, idx) => {
                    const isChecked = selectedAddons.includes(addon);
                    return (
                      <label
                        key={idx}
                        onClick={() => toggleAddon(addon)}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                          isChecked 
                            ? 'bg-cyan-950/30 border-cyan-500/40 text-white' 
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-sans font-medium">{addon}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quote Summary Sidebar (Col 3) */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/90 border-2 border-cyan-500/40 space-y-5 shadow-2xl sticky top-24">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 uppercase font-bold">
                    RESUMO DA ORDEM
                  </span>
                  <h3 className="text-xl font-heading font-black text-white">
                    {lang === 'pt' ? 'Orçamento Técnico' : 'Technical Quote'}
                  </h3>
                </div>

                {/* Metrics */}
                <div className="space-y-3 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Total de Itens:</span>
                    <span className="text-white font-bold">{totalItems} un.</span>
                  </div>

                  {totalKwp > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span>Potência Solar Acumulada:</span>
                      <span className="text-cyan-300 font-bold">{totalKwp.toFixed(2)} kWp</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span>Serviços de Engenharia:</span>
                    <span className="text-slate-200 font-bold">{selectedAddons.length} selecionados</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-300">Regime Financeiro:</span>
                    <span className="text-amber-400 text-xs font-mono">Preço sob Cotação</span>
                  </div>
                </div>

                {/* Notice */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed font-sans space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>DIRETRIZ CORPORATIVA</span>
                  </div>
                  <p>
                    {lang === 'pt'
                      ? 'Ao avançar, seus itens serão compilados em uma solicitação encaminhada para kraefegg.mos3@gmail.com com emissão de protocolo.'
                      : 'By proceeding, your items will be compiled into an RFP forwarded to kraefegg.mos3@gmail.com with a generated tracking protocol.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => onNavigate('/marketplace/request')}
                    className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    <span>{lang === 'pt' ? 'Avançar para Solicitação Formal' : 'Proceed to Formal Request'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('/marketplace')}
                    className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer text-center"
                  >
                    {lang === 'pt' ? 'Continuar Escolhendo Itens' : 'Continue Browsing'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
