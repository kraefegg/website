import React, { useState } from 'react';
import { NavRoute, Language } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MarketplaceQuoteRequest } from '../../types/marketplace';
import { 
  FileText, Mail, Phone, Building2, MapPin, Calendar, 
  Send, Copy, Check, ArrowLeft, ShieldCheck, Sun, Wrench, 
  Sparkles, CheckCircle2, MessageSquare, AlertCircle
} from 'lucide-react';

interface MarketplaceRequestPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const MarketplaceRequestPage: React.FC<MarketplaceRequestPageProps> = ({ onNavigate, lang }) => {
  const { cartItems, totalItems, totalKwp, setLastSubmittedRequest, showToast, clearCart } = useMarketplace();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    cnpjCpf: '',
    email: '',
    phone: '',
    city: '',
    state: 'SP',
    projectType: 'industrial',
    targetTimeline: '30-60-dias',
    installationSite: 'telhado-metalico',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedManifest, setCopiedManifest] = useState(false);

  const generateProtocol = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `ORD-KLG-${year}-${random}`;
  };

  const composeOrderManifest = (protocol: string) => {
    const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    let manifest = `============================================================\n`;
    manifest += `KRAEFEGG M.O. — SOLICITAÇÃO OFICIAL DE COTAÇÃO & ENGENHARIA\n`;
    manifest += `============================================================\n\n`;
    manifest += `PROTOCOLO: ${protocol}\n`;
    manifest += `DATA/HORA: ${now}\n`;
    manifest += `DESTINATÁRIO: kraefegg.mos3@gmail.com\n`;
    manifest += `DIRETRIZ COMERCIAL: Proposta Técnica Formal (Sem Preço Público em Tela)\n\n`;

    manifest += `------------------------------------------------------------\n`;
    manifest += `1. DADOS DO CLIENTE / SOLICITANTE\n`;
    manifest += `------------------------------------------------------------\n`;
    manifest += `Nome: ${formData.name || 'Não informado'}\n`;
    manifest += `Empresa / Razão Social: ${formData.company || 'Não informado'}\n`;
    manifest += `CNPJ / CPF: ${formData.cnpjCpf || 'Não informado'}\n`;
    manifest += `E-mail: ${formData.email || 'Não informado'}\n`;
    manifest += `Telefone/WhatsApp: ${formData.phone || 'Não informado'}\n`;
    manifest += `Localidade: ${formData.city || 'Não informada'} - ${formData.state}\n\n`;

    manifest += `------------------------------------------------------------\n`;
    manifest += `2. ESPECIFICAÇÃO DO PROJETO\n`;
    manifest += `------------------------------------------------------------\n`;
    manifest += `Tipo de Aplicação: ${formData.projectType}\n`;
    manifest += `Prazo Desejado: ${formData.targetTimeline}\n`;
    manifest += `Local de Instalação: ${formData.installationSite}\n`;
    manifest += `Observações Adicionais:\n${formData.notes || 'Nenhuma observação informada.'}\n\n`;

    manifest += `------------------------------------------------------------\n`;
    manifest += `3. ITENS SELECIONADOS NO MARKETPLACE (${cartItems.length} tipos, ${totalItems} un.)\n`;
    manifest += `------------------------------------------------------------\n`;

    if (cartItems.length === 0) {
      manifest += `(Nenhum item adicionado ao carrinho; solicitação de consultoria geral)\n`;
    } else {
      cartItems.forEach((item, idx) => {
        manifest += `[Item ${idx + 1}] ${item.type === 'product' ? 'EQUIPAMENTO' : 'SERVIÇO'}: ${item.title}\n`;
        manifest += `  - Quantidade: ${item.quantity} un.\n`;
        if (item.powerKwp) {
          manifest += `  - Potência: ${item.powerKwp} kWp (Total acumulado: ${(item.powerKwp * item.quantity).toFixed(2)} kWp)\n`;
        }
        if (item.type === 'product') {
          if (item.details.inverterBrand) manifest += `  - Inversor: ${item.details.inverterBrand} (${item.details.inverterModel || ''})\n`;
          if (item.details.moduleBrand) manifest += `  - Módulos: ${item.details.moduleBrand}\n`;
          if (item.details.voltage) manifest += `  - Tensão/Fase: ${item.details.voltage} / ${item.details.phase || ''}\n`;
          if (item.details.officialSupplier) manifest += `  - Fornecedor Homologado: ${item.details.officialSupplier}\n`;
        }
        if (item.type === 'service') {
          if (item.details.disciplines && item.details.disciplines.length > 0) {
            manifest += `  - Disciplinas Selecionadas: ${item.details.disciplines.join(', ')}\n`;
          }
          if (item.details.customScope) {
            manifest += `  - Escopo Customizado: ${item.details.customScope}\n`;
          }
        }
        manifest += `\n`;
      });
    }

    if (totalKwp > 0) {
      manifest += `POTÊNCIA SOLAR TOTAL ACUMULADA: ${totalKwp.toFixed(2)} kWp\n\n`;
    }

    manifest += `============================================================\n`;
    manifest += `KRAEFEGG M.O. — Engenharia Multidisciplinar & Transição Energética\n`;
    manifest += `Parceria Oficial de Equipamentos: Aldo Solar\n`;
    manifest += `Contato Oficial: kraefegg.mos3@gmail.com\n`;
    manifest += `============================================================\n`;

    return manifest;
  };

  const handleCopyManifest = () => {
    const protocol = generateProtocol();
    const manifest = composeOrderManifest(protocol);
    navigator.clipboard.writeText(manifest);
    setCopiedManifest(true);
    showToast('Manifesto técnico copiado para a área de transferência!');
    setTimeout(() => setCopiedManifest(false), 2500);
  };

  const handleSubmitRequest = async (channel: 'email' | 'whatsapp') => {
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast('Por favor, preencha ao menos Nome e E-mail.');
      return;
    }

    setIsSubmitting(true);
    const protocol = generateProtocol();
    const manifest = composeOrderManifest(protocol);
    const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const quoteRequest: MarketplaceQuoteRequest = {
      protocol,
      createdAt: new Date().toISOString(),
      submittedAtFormatted: now,
      recipientEmail: 'kraefegg.mos3@gmail.com',
      name: formData.name,
      company: formData.company,
      cnpjCpf: formData.cnpjCpf,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      projectType: formData.projectType,
      targetTimeline: formData.targetTimeline,
      installationSite: formData.installationSite,
      selectedEngineeringServices: [
        'Projeto Executivo Elétrico',
        'Homologação na Concessionária',
        'Emissão de ART',
      ],
      notes: formData.notes,
      items: cartItems,
      totalItemCount: totalItems,
      totalKwp,
      status: 'SUBMITTED',
    };

    // Store in backend API
    try {
      await fetch('/api/marketplace/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteRequest),
      });
    } catch (err) {
      console.warn('Could not post to backend API, continuing client flow', err);
    }

    // Save to local context
    setLastSubmittedRequest(quoteRequest);

    // Channel actions
    if (channel === 'email') {
      const subject = encodeURIComponent(`KRAEFEGG M.O. — Cotação Técnica [${protocol}]: ${formData.company || formData.name}`);
      const body = encodeURIComponent(manifest);
      window.location.href = `mailto:kraefegg.mos3@gmail.com?subject=${subject}&body=${body}`;
    } else if (channel === 'whatsapp') {
      const waText = encodeURIComponent(manifest);
      window.open(`https://wa.me/5511999999999?text=${waText}`, '_blank');
    }

    // Clear cart and navigate to success page
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      onNavigate('/marketplace/success');
    }, 600);
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
          <button 
            onClick={() => onNavigate('/marketplace/cart')}
            className="hover:text-cyan-400 cursor-pointer transition-colors"
          >
            {lang === 'pt' ? 'Carrinho' : 'Cart'}
          </button>
          <span>/</span>
          <span className="text-cyan-300 font-bold">
            {lang === 'pt' ? 'Solicitação de Orçamento (RFP)' : 'Quote Request Form'}
          </span>
        </div>

        {/* Header Strip */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#060D1E] via-slate-900 to-[#070912] border-2 border-cyan-500/30 shadow-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>PROTOCOLO TÉCNICO FORMAL • SEM PREÇOS PÚBLICOS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-black text-white">
            {lang === 'pt' ? 'Formulário de Cotação Técnica & Engenharia' : 'Technical RFP & Engineering Quote Form'}
          </h1>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed font-sans">
            {lang === 'pt'
              ? 'Preencha os dados institucionais da sua empresa para que nossa diretoria de engenharia elabore sua proposta técnica detalhada com memorial descritivo, dimensionamento elétrico e validação logística da Aldo Solar.'
              : 'Complete your company details so our engineering board can draft your comprehensive proposal with technical memos, electrical sizing, and Aldo Solar logistics.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <span>E-mail Oficial Destinatário: <strong className="text-white">kraefegg.mos3@gmail.com</strong></span>
            <span>•</span>
            <span>Prazo Médio de Resposta: <strong className="text-cyan-300">24 a 48h úteis</strong></span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Fields (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              {/* Section 1: Contact Info */}
              <div className="space-y-4">
                <h3 className="text-base font-heading font-bold text-white uppercase font-mono tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                  1. {lang === 'pt' ? 'Dados do Solicitante & Empresa' : 'Requester & Company Details'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">
                      {lang === 'pt' ? 'Nome Completo *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Carlos Eduardo Silveira"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">
                      {lang === 'pt' ? 'Empresa / Razão Social' : 'Company Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Ex: Indústrias Metálicas Paulista S/A"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">
                      {lang === 'pt' ? 'CNPJ ou CPF' : 'Tax ID (CNPJ / CPF)'}
                    </label>
                    <input
                      type="text"
                      value={formData.cnpjCpf}
                      onChange={(e) => setFormData({ ...formData, cnpjCpf: e.target.value })}
                      placeholder="00.000.000/0001-00"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">
                      {lang === 'pt' ? 'E-mail Corporativo *' : 'Corporate Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="carlos@empresa.com.br"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">
                      {lang === 'pt' ? 'Telefone / WhatsApp' : 'Phone / WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+55 (11) 99999-9999"
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-1.5">
                      <label className="text-slate-300 block">{lang === 'pt' ? 'Cidade' : 'City'}</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="São Paulo"
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-slate-300 block">{lang === 'pt' ? 'UF' : 'State'}</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                        placeholder="SP"
                        maxLength={2}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans uppercase text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Technical Parameters */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-base font-heading font-bold text-white uppercase font-mono tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                  2. {lang === 'pt' ? 'Parâmetros Técnicos do Projeto' : 'Technical Project Scope'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">{lang === 'pt' ? 'Segmento do Projeto' : 'Segment'}</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    >
                      <option value="industrial">Autossuficiência Industrial (ACL)</option>
                      <option value="utility">Grande Usina Centralizada (UFV)</option>
                      <option value="datacenter">Data Center de Missão Crítica</option>
                      <option value="h2v">Hidrogênio Verde (H2V)</option>
                      <option value="comercial">Comercial / Agro / PME</option>
                      <option value="consultoria-pura">Consultoria & Engenharia Pura</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">{lang === 'pt' ? 'Prazo de Implantação' : 'Timeline'}</label>
                    <select
                      value={formData.targetTimeline}
                      onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    >
                      <option value="imediato">Imediato (&lt; 30 dias)</option>
                      <option value="30-60-dias">Curto Prazo (30 a 60 dias)</option>
                      <option value="90-180-dias">Médio Prazo (90 a 180 dias)</option>
                      <option value="estudo-viabilidade">Fase de Estudo e Orçamento</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 block">{lang === 'pt' ? 'Local de Instalação' : 'Mounting Site'}</label>
                    <select
                      value={formData.installationSite}
                      onChange={(e) => setFormData({ ...formData, installationSite: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                    >
                      <option value="telhado-metalico">Telhado Metálico / Trapézio</option>
                      <option value="solo-estacas">Solo (Estacas / Concreto)</option>
                      <option value="carport-estacionamento">Carport / Estacionamento Solar</option>
                      <option value="telha-fibrocimento">Telha Fibrocimento / Cerâmica</option>
                      <option value="a-definir">A Definir em Visita Técnica</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-slate-300 block text-xs font-mono">
                    {lang === 'pt' ? 'Observações e Requisitos Técnicos Especiais:' : 'Technical Notes & Special Requirements:'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={lang === 'pt' 
                      ? 'Informe particularidades como subestação existente, concessionária de energia (Enel, CPFL, Cemig, etc.), consumo médio mensal em kWh ou demanda contratada...'
                      : 'Provide details like existing substation, local utility, monthly kWh consumption, or contracted peak demand...'}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Review & Dispatch Actions (Col 3) */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/95 border-2 border-cyan-500/40 space-y-5 shadow-2xl sticky top-24">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 uppercase font-bold">
                  EXPEDIÇÃO FORMAL
                </span>
                <h3 className="text-lg font-heading font-black text-white">
                  {lang === 'pt' ? 'Encaminhar Ordem' : 'Dispatch Order'}
                </h3>
              </div>

              {/* Items summary */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Itens Selecionados:</span>
                  <span className="text-cyan-300 font-bold">{totalItems} un.</span>
                </div>
                {totalKwp > 0 && (
                  <div className="flex justify-between text-slate-300">
                    <span>Potência Total:</span>
                    <span className="text-amber-400 font-bold">{totalKwp.toFixed(2)} kWp</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Destino Oficial:</span>
                  <span className="text-white font-bold truncate">kraefegg.mos3@gmail.com</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmitRequest('email')}
                  className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
                >
                  <Mail className="w-4 h-4" />
                  <span>{lang === 'pt' ? 'Enviar Ordem por E-mail Oficial' : 'Send via Official Email'}</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmitRequest('whatsapp')}
                  className="w-full py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'pt' ? 'Enviar via WhatsApp Técnico' : 'Send via Technical WhatsApp'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyManifest}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-mono text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition-colors"
                >
                  {copiedManifest ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{lang === 'pt' ? 'Manifesto Copiado!' : 'Manifest Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'pt' ? 'Copiar Manifesto Completo' : 'Copy Full Manifest'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>COMPLIANCE KRAEFEGG</span>
                </div>
                <p>
                  {lang === 'pt'
                    ? 'Sua solicitação gera um protocolo formal com rastreabilidade interna.'
                    : 'Your request generates a formal protocol with internal traceability.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
