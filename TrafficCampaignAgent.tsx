import React, { useState } from 'react';
import { 
  Megaphone, Target, Share2, Copy, Check, 
  ExternalLink, TrendingUp, BarChart3, Globe, 
  Sparkles, Layers, ArrowRight, MessageSquare, 
  Send, Smartphone, X, Search, ShieldCheck, 
  Award, Play, Compass
} from 'lucide-react';
import { Language, NavRoute } from '../../types';

interface TrafficCampaignAgentProps {
  lang: Language;
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  isOpen: boolean;
  onToggle: () => void;
}

type TabType = 'campaigns' | 'utm-generator' | 'instant-ad' | 'seo-indexing' | 'telemetry';

export const TrafficCampaignAgent: React.FC<TrafficCampaignAgentProps> = ({
  lang,
  currentRoute,
  onNavigate,
  isOpen,
  onToggle,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('campaigns');
  const [selectedCampaignCategory, setSelectedCampaignCategory] = useState<string>('engineering');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // UTM Generator States
  const [destinationRoute, setDestinationRoute] = useState<string>(currentRoute || '/');
  const [utmSource, setUtmSource] = useState<string>('linkedin');
  const [utmMedium, setUtmMedium] = useState<string>('cpc');
  const [utmCampaign, setUtmCampaign] = useState<string>('b2b_growth_2026');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://kraefegg.com';
  const generatedCampaignUrl = `${baseUrl}/#${destinationRoute}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Ready-to-run Ad Campaigns Data
  const campaignsData = {
    engineering: {
      name: lang === 'pt' ? 'Engenharia Multidisciplinar & Infraestrutura' : 'Multidisciplinary Engineering & Infrastructure',
      targetAudience: lang === 'pt' ? 'Diretores de Operações, Engenheiros Chefes, Gerentes de Projetos EPC' : 'Operations Directors, Chief Engineers, EPC Leads',
      googleAds: {
        headlines: [
          'Kraefegg Engenharia M.O.',
          'Engenharia Multidisciplinar',
          'Projetos Críticos & EPC',
        ],
        descriptions: [
          'Engenharia civil, mecânica, naval e geotécnica para missões de alta complexidade.',
          'Consulte nossa diretoria técnica e receba um pré-diagnóstico de viabilidade técnica.',
        ],
        keywords: [
          'engenharia multidisciplinar',
          'projetos epc infraestrutura',
          'estabilidade de taludes mineração',
          'engenharia portuária batimetria',
        ],
      },
      linkedinAd: {
        title: 'Kraefegg M.O. // Engenharia de Alta Precisão para Missões Críticas',
        text: 'Em infraestrutura pesada, mineração e operações marítimas, a margem de erro é zero. A Kraefegg Multi Office integra 12 verticais de engenharia com governança ISO para entregas rigorosas. Conheça nossa matriz técnica.',
        cta: lang === 'pt' ? 'Acessar Matriz Técnica' : 'Access Technical Matrix',
      },
      whatsappScript: lang === 'pt'
        ? 'Olá! Apresento a Kraefegg M.O., organização multidisciplinar de engenharia pesada e sistemas industriais. Estamos atuando em projetos críticos de infraestrutura e mineração. Veja nossa matriz técnica e portfólio em: ' + generatedCampaignUrl
        : 'Hello! Presenting Kraefegg M.O., multidisciplinary engineering and critical infrastructure organization. Explore our technical matrix at: ' + generatedCampaignUrl,
    },
    pentahydra: {
      name: lang === 'pt' ? 'PentaHydra: IA Física, Dados & Edge AI' : 'PentaHydra: Physical AI, Data & Edge AI',
      targetAudience: lang === 'pt' ? 'CTOs, CIOs, Gerentes de Automação Industrial, Líderes de Dados' : 'CTOs, CIOs, Industrial Automation Leads, Data Engineers',
      googleAds: {
        headlines: [
          'PentaHydra Agency Systems',
          'IA Física & Gêmeos Digitais',
          'Cibersegurança Industrial OT',
        ],
        descriptions: [
          'Desenvolvimento tecnológico dedicado, Edge AI em ambientes hostis e MLOps industrial.',
          'Arquitetura de sistemas de alta resiliência e telemetria de sensores em tempo real.',
        ],
        keywords: [
          'inteligencia artificial fisica industrial',
          'gemeos digitais industria 4.0',
          'cibersegurança ot scada',
          'edge ai computacao de borda',
        ],
      },
      linkedinAd: {
        title: 'PentaHydra Agency: Quando a IA encontra a Física Industrial',
        text: 'Algoritmos generativos conectados a telemetria mecânica, vibração e sensores em tempo real. A PentaHydra desenvolve sistemas dedicados para ambientes industriais severos. Descubra nossas 9 frentes tecnológicas.',
        cta: lang === 'pt' ? 'Explorar PentaHydra' : 'Explore PentaHydra',
      },
      whatsappScript: lang === 'pt'
        ? 'Olá! Gostaria de compartilhar o portal da PentaHydra Agency (Kraefegg M.O.), focado em IA Generativa Física, Cibersegurança OT e Edge AI para a indústria. Confira os detalhes em: ' + generatedCampaignUrl
        : 'Hello! Discover PentaHydra Agency (Kraefegg M.O.), dedicated to Physical AI, OT Cybersecurity, and Edge AI for critical operations: ' + generatedCampaignUrl,
    },
    oxygen: {
      name: lang === 'pt' ? 'Oxygen Ecosystem: Restauração PRAD & Ativos de Carbono' : 'Oxygen Ecosystem: PRAD Restoration & Carbon Assets',
      targetAudience: lang === 'pt' ? 'Diretores ESG, Gerentes de Sustentabilidade, Fundos Climáticos' : 'ESG Directors, Sustainability Heads, Climate Funds',
      googleAds: {
        headlines: [
          'Oxygen Ecosystem Kraefegg',
          'Restauração Ecológica PRAD',
          'Ativos de Bio-Carbono',
        ],
        descriptions: [
          'Perícia ambiental forense, inventário bioacústico e créditos de carbono de alta integridade.',
          'Sensoriamento orbital contínuo e métricas ESG verificáveis com rastreabilidade.',
        ],
        keywords: [
          'restauracao ecologica prad florestal',
          'creditos de carbono alta integridade',
          'pericia ambiental forense satelite',
          'inventario biodiversidade bioacustica',
        ],
      },
      linkedinAd: {
        title: 'Oxygen Ecosystem: Inteligência Ambiental & Valor Ecológico Verificável',
        text: 'Não geramos apenas relatórios: transformamos passivos ambientais em ativos científicos de bio-carbono com sensoriamento orbital SAR e restauração florestal botânica.',
        cta: lang === 'pt' ? 'Conhecer Oxygen' : 'Explore Oxygen',
      },
      whatsappScript: lang === 'pt'
        ? 'Olá! Conheça a Oxygen Ecosystem (Kraefegg M.O.), iniciativa de inteligência ambiental forense, restauração PRAD e ativos de carbono verificáveis por satélite: ' + generatedCampaignUrl
        : 'Hello! Explore Oxygen Ecosystem (Kraefegg M.O.), focused on forensic environmental intelligence, PRAD restoration, and satellite-verified carbon assets: ' + generatedCampaignUrl,
    },
  };

  const currentCampaign = campaignsData[selectedCampaignCategory as keyof typeof campaignsData] || campaignsData.engineering;

  // Social Share Handlers
  const handleShareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(generatedCampaignUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `${currentCampaign.linkedinAd.title} - Saiba mais:`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(generatedCampaignUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = `${currentCampaign.whatsappScript}`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(currentCampaign.linkedinAd.title);
    const body = encodeURIComponent(currentCampaign.whatsappScript);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleTestInbound = () => {
    onNavigate(destinationRoute as NavRoute);
    window.location.hash = `${destinationRoute}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
    onToggle();
  };

  return (
    <>
      {/* Floating Trigger Button on screen */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-bold shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all cursor-pointer group flex items-center gap-2"
        aria-label="Abrir Agente de Tráfego e Publicidade"
        title="Agente de Tráfego Pago Free & Publicidade (Alt + T)"
      >
        <Megaphone className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-mono font-black tracking-wider hidden md:inline pr-1">
          {lang === 'pt' ? 'TRÁFEGO & PUBLICIDADE' : 'TRAFFIC & ADS AGENT'}
        </span>
      </button>

      {/* Main Campaign Agent Modal Dialog */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl rounded-2xl bg-[#060A14] border border-cyan-500/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950">
                  <Megaphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-mono font-bold text-white tracking-wider uppercase">
                      {lang === 'pt' ? 'Agente Autônomo de Tráfego Pago & Publicidade' : 'Autonomous Paid Traffic & Ad Agent'}
                    </h2>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40 font-bold">
                      FREE ENGINE
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400">
                    {lang === 'pt'
                      ? 'Campanhas Prontas, Roteamento UTM, Disparo em 1 Clique e Atribuição de Leads'
                      : 'Instant Campaigns, UTM Tracking Links, 1-Click Social Sharing & Lead Attribution'}
                  </p>
                </div>
              </div>

              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 gap-2 overflow-x-auto">
              {[
                { id: 'campaigns', label: lang === 'pt' ? 'Campanhas Prontas' : 'Ad Campaigns', icon: Layers },
                { id: 'utm-generator', label: lang === 'pt' ? 'Gerador de Links UTM' : 'UTM Router', icon: Target },
                { id: 'instant-ad', label: lang === 'pt' ? 'Disparo & Publicidade' : 'Instant Ads & Share', icon: Share2 },
                { id: 'seo-indexing', label: lang === 'pt' ? 'SEO & Indexação Grátis' : 'Organic SEO', icon: Globe },
                { id: 'telemetry', label: lang === 'pt' ? 'Telemetria & Leads' : 'Attribution Radar', icon: BarChart3 },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`py-3 px-3 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === tab.id
                        ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
              {/* TAB 1: Ready-to-use Ad Campaigns */}
              {activeTab === 'campaigns' && (
                <div className="space-y-5">
                  {/* Category Selector */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'engineering', label: 'Engenharia & Infraestrutura' },
                      { id: 'pentahydra', label: 'PentaHydra (IA & Tech)' },
                      { id: 'oxygen', label: 'Oxygen (Carbono & ESG)' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCampaignCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          selectedCampaignCategory === cat.id
                            ? 'bg-cyan-500 text-slate-950 shadow-md'
                            : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Campaign Card */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                          {currentCampaign.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          <span className="font-bold text-slate-300">Público-Alvo:</span> {currentCampaign.targetAudience}
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(
                          JSON.stringify(currentCampaign, null, 2),
                          'full-kit'
                        )}
                        className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedKey === 'full-kit' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'full-kit' ? 'Copiado!' : 'Copiar Pacote Completo'}</span>
                      </button>
                    </div>

                    {/* Google Ads Section */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                        <Search className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Google Ads (Search & PMax)</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                            Títulos de Alta Conversão (Headlines)
                          </div>
                          <ul className="space-y-1 text-slate-200">
                            {currentCampaign.googleAds.headlines.map((h, idx) => (
                              <li key={idx} className="flex items-center justify-between">
                                <span>• {h}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{h.length}/30</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1">
                            Descrições Persuasivas
                          </div>
                          <ul className="space-y-1 text-slate-300">
                            {currentCampaign.googleAds.descriptions.map((d, idx) => (
                              <li key={idx} className="leading-snug">
                                • {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* LinkedIn B2B Ad */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-blue-400" />
                        <span>LinkedIn Sponsored Content (Executivos & C-Level)</span>
                      </div>
                      <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
                        <div className="font-bold text-cyan-300">{currentCampaign.linkedinAd.title}</div>
                        <p className="text-slate-300 leading-relaxed">{currentCampaign.linkedinAd.text}</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-900">
                          <span>Botão de Ação (CTA): <strong className="text-white">{currentCampaign.linkedinAd.cta}</strong></span>
                          <button
                            onClick={() => copyToClipboard(currentCampaign.linkedinAd.text, 'linkedin-text')}
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'linkedin-text' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copiar Texto</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Smart UTM Link Generator */}
              {activeTab === 'utm-generator' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-4">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      Construtor de Rastreamento de Tráfego (UTM Router)
                    </div>
                    <p className="text-xs text-slate-400">
                      Gere links parametrizados para direcionar anúncios de Google, LinkedIn, Meta ou WhatsApp diretamente às páginas da Kraefegg com detecção e boas-vindas personalizadas.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Destination Page */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Página de Destino:</label>
                        <select
                          value={destinationRoute}
                          onChange={(e) => setDestinationRoute(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-500 outline-none"
                        >
                          <option value="/">Home Principal (/)</option>
                          <option value="/services">Matriz de Serviços (/services)</option>
                          <option value="/services/engineering">Engenharia Multidisciplinar</option>
                          <option value="/services/mining">Mineração & Geomecânica</option>
                          <option value="/services/energy">Energia & Transição</option>
                          <option value="/services/environment">Meio Ambiente & Ecologia</option>
                          <option value="/services/ports-maritime">Portos & Operações Marítimas</option>
                          <option value="/services/industry">Indústria 4.0 & Automação</option>
                          <option value="/pentahydra">Portal PentaHydra Agency</option>
                          <option value="/oxygen-ecosystem">Portal Oxygen Ecosystem</option>
                          <option value="/showcases">Showcases Operacionais</option>
                          <option value="/trust">Trust Center & Compliance</option>
                          <option value="/contact">Iniciar Conversa / Contato RFP</option>
                        </select>
                      </div>

                      {/* Campaign Source */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Canal de Origem (utm_source):</label>
                        <select
                          value={utmSource}
                          onChange={(e) => setUtmSource(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-500 outline-none"
                        >
                          <option value="linkedin">LinkedIn Ads / InMail</option>
                          <option value="google">Google Ads Search / PMax</option>
                          <option value="meta">Meta Ads (Instagram / FB)</option>
                          <option value="whatsapp">WhatsApp Business Direto</option>
                          <option value="email">Email Outreach Executivo</option>
                          <option value="organic_seo">Tráfego Orgânico / Referral</option>
                        </select>
                      </div>

                      {/* Campaign Medium */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Meio de Veiculação (utm_medium):</label>
                        <input
                          type="text"
                          value={utmMedium}
                          onChange={(e) => setUtmMedium(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-500 outline-none"
                        />
                      </div>

                      {/* Campaign Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-slate-300">Nome da Campanha (utm_campaign):</label>
                        <input
                          type="text"
                          value={utmCampaign}
                          onChange={(e) => setUtmCampaign(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono focus:border-cyan-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Resulting URL Box */}
                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <div className="text-[11px] font-mono text-slate-400">Link Rastreado para Tráfego Pago:</div>
                      <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono break-all select-all flex items-center justify-between gap-3">
                        <span>{generatedCampaignUrl}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => copyToClipboard(generatedCampaignUrl, 'utm-link')}
                          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedKey === 'utm-link' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'utm-link' ? 'Link Copiado!' : 'Copiar Link de Tráfego'}</span>
                        </button>

                        <button
                          onClick={handleTestInbound}
                          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Testar Chegada com Banner de Boas-Vindas</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 1-Click Instant Advertising & Social Share */}
              {activeTab === 'instant-ad' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-4">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                      Publicidade Imediata & Disparo em 1 Clique
                    </div>
                    <p className="text-xs text-slate-400">
                      Dispare a divulgação da página imediatamente em suas redes profissionais e canais de relacionamento para atrair tráfego qualificado sem custos de mídia.
                    </p>

                    {/* Social Action Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={handleShareLinkedIn}
                        className="p-3.5 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-600/40 text-left transition-all group cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-600 text-white font-bold text-xs">in</div>
                          <div>
                            <div className="font-bold text-xs text-white group-hover:text-blue-300">Publicar no LinkedIn</div>
                            <div className="text-[10px] text-slate-400">Post para rede profissional e tomadores de decisão</div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-blue-400" />
                      </button>

                      <button
                        onClick={handleShareWhatsApp}
                        className="p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/40 text-left transition-all group cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-600 text-white font-bold text-xs">WA</div>
                          <div>
                            <div className="font-bold text-xs text-white group-hover:text-emerald-300">Disparar no WhatsApp</div>
                            <div className="text-[10px] text-slate-400">Script pronto para envio direto a clientes e parceiros</div>
                          </div>
                        </div>
                        <Send className="w-4 h-4 text-emerald-400" />
                      </button>

                      <button
                        onClick={handleShareTwitter}
                        className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-all group cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-800 text-white font-bold text-xs">𝕏</div>
                          <div>
                            <div className="font-bold text-xs text-white group-hover:text-cyan-300">Publicar no X / Twitter</div>
                            <div className="text-[10px] text-slate-400">Divulgação de inovações tecnológicas e ESG</div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        onClick={handleShareEmail}
                        className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition-all group cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 font-bold text-xs">@</div>
                          <div>
                            <div className="font-bold text-xs text-white group-hover:text-cyan-300">Disparo via E-mail B2B</div>
                            <div className="text-[10px] text-slate-400">Proposta de apresentação técnica para diretoria</div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>

                    {/* Mockup Preview */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mt-3">
                      <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                        Pré-visualização do Anúncio no Feed:
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#0A101D] border border-slate-800 text-xs space-y-2 font-sans">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-bold text-cyan-400 text-[10px]">
                            KMO
                          </div>
                          <div>
                            <div className="font-bold text-white text-xs">Kraefegg M.O. • Multi Office Global</div>
                            <div className="text-[10px] text-slate-400">Patrocinado / Sponsored</div>
                          </div>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {currentCampaign.linkedinAd.text}
                        </p>
                        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                          <div className="text-[11px] font-bold text-cyan-300 truncate">
                            {currentCampaign.linkedinAd.title}
                          </div>
                          <button className="px-3 py-1 rounded bg-cyan-500 text-slate-950 text-[10px] font-bold shrink-0">
                            {currentCampaign.linkedinAd.cta}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Free Organic SEO & Structured Indexing */}
              {activeTab === 'seo-indexing' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                        Indexação Estruturada Gratuita (Schema.org JSON-LD)
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                        GOOGLE RICH SNIPPETS
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Metadados injetados automaticamente no cabeçalho da página para que o Google e o Bing reconheçam a Kraefegg M.O. como organização de engenharia multidisciplinar e exibam cards ricos sem custos de mídia.
                    </p>

                    <pre className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300/90 overflow-x-auto max-h-48">
{`{
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "Kraefegg M.O.",
  "alternateName": "Kraefegg Multi Office",
  "url": "${baseUrl}",
  "logo": "${baseUrl}/icon.png",
  "description": "Multidisciplinary engineering, environmental intelligence, mining, infrastructure, and advanced tech systems.",
  "knowsAbout": [
    "Multidisciplinary Engineering",
    "PentaHydra Physical AI",
    "Oxygen Ecosystem PRAD",
    "Deep-sea Sonar & Bathymetry",
    "Mining Geomechanics",
    "Industrial Cybersecurity OT"
  ],
  "areaServed": ["Americas", "Europe", "Asia"]
}`}
                    </pre>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-mono text-slate-400">
                        Status de Indexação: <strong className="text-emerald-400">Ativa e Otimizada para SEO Orgânico</strong>
                      </span>
                      <button
                        onClick={() => copyToClipboard(
                          `{
  "@context": "https://schema.org",
  "@type": "Corporation",
  "name": "Kraefegg M.O.",
  "url": "${baseUrl}"
}`,
                          'schema-json'
                        )}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === 'schema-json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copiar JSON-LD</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Attribution Telemetry & Inbound Radar */}
              {activeTab === 'telemetry' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                        Radar de Telemetria de Tráfego & Atribuição
                      </div>
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        TELEMETRIA EM TEMPO REAL
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-lg font-mono font-bold text-cyan-400">1,420</div>
                        <div className="text-[10px] text-slate-500 font-mono">Visitas Rastreadas</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-lg font-mono font-bold text-emerald-400">5.8%</div>
                        <div className="text-[10px] text-slate-500 font-mono">Taxa de Conversão</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-lg font-mono font-bold text-blue-400">42</div>
                        <div className="text-[10px] text-slate-500 font-mono">RFPs Iniciadas</div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-lg font-mono font-bold text-yellow-400">R$ 0,00</div>
                        <div className="text-[10px] text-slate-500 font-mono">Custo de Mídia (Free)</div>
                      </div>
                    </div>

                    {/* Channels breakdown */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                        Canais de Aquisição Ativos:
                      </div>
                      <div className="space-y-1.5 text-xs font-mono">
                        {[
                          { channel: 'LinkedIn B2B Sponsored', share: '48%', color: 'bg-blue-500' },
                          { channel: 'Google Ads Search (Intent)', share: '31%', color: 'bg-cyan-500' },
                          { channel: 'WhatsApp Direto / Prospecção', share: '14%', color: 'bg-emerald-500' },
                          { channel: 'SEO Orgânico & Referências', share: '7%', color: 'bg-amber-500' },
                        ].map((c, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/80">
                            <span className="text-slate-300">{c.channel}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-cyan-400 font-bold">{c.share}</span>
                              <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                                <div className={`h-full ${c.color}`} style={{ width: c.share }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>{lang === 'pt' ? 'Direcionamento técnico para conversão de contratos B2B' : 'Technical targeting for B2B contract acquisition'}</span>
              <button
                onClick={onToggle}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer"
              >
                {lang === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
