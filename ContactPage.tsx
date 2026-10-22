import React, { useState } from 'react';
import { NavRoute, Language } from '../types';
import { KRAEFEGG_EMAILS, FOUNDER_INFO } from '../data/contactsData';
import { contactI18n, localize } from '../data/pageTranslations';
import { 
  Mail, Phone, Send, CheckCircle2, ShieldCheck, 
  Copy, ExternalLink, Search, Check
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, lang }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    area: 'PentaHydra Agency Technologies & Systems',
    timeline: 'Immediate (1-3 months)',
    message: '',
    ndaRequested: false,
  });

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const areas = [
    'PentaHydra Agency Technologies & Systems (IA & IoT)',
    'Engenharia Multidisciplinar & Obras Civis',
    'Oxygen Ecosystem (Meio Ambiente & Carbono)',
    'Portos, Marítimo & MARPOL',
    'Mineração, Geotecnia & BESS',
    'Energia & Sistemas de Potência',
    'Indústria 4.0 & Automação Crítica',
    'Auditoria de Cibersegurança OT & Defesa',
    'Agronegócio & Florestal',
    'Acordo de Confidencialidade (NDA) & Parcerias',
  ];

  const categories = [
    { 
      id: 'all', 
      label: {
        pt: 'Todos (21)', en: 'All (21)', es: 'Todos (21)', de: 'Alle (21)', fr: 'Tous (21)', 
        ru: 'Все (21)', nl: 'Alle (21)', zh: '全部 (21)', he: 'הכל (21)', sv: 'Alla (21)', fi: 'Kaikki (21)'
      } 
    },
    { 
      id: 'founder', 
      label: {
        pt: 'Fundador', en: 'Founder', es: 'Fundador', de: 'Gründer', fr: 'Fondateur', 
        ru: 'Основатель', nl: 'Oprichter', zh: '创始人专席', he: 'מייסד', sv: 'Grundare', fi: 'Perustaja'
      } 
    },
    { 
      id: 'executive', 
      label: {
        pt: 'Diretoria & Finanças', en: 'Executive & Billing', es: 'Directorio y Finanzas', de: 'Direktion & Finanzen', fr: 'Direction & Finances', 
        ru: 'Директорат и финансы', nl: 'Directie & Financiën', zh: '执行董事会与商务财务', he: 'הנהלה וכספים', sv: 'Ledning & Ekonomi', fi: 'Johto & Talous'
      } 
    },
    { 
      id: 'technology', 
      label: {
        pt: 'PentaHydra & IA', en: 'PentaHydra & Tech', es: 'PentaHydra y Tech', de: 'PentaHydra & KI', fr: 'PentaHydra & IA', 
        ru: 'PentaHydra и ИИ', nl: 'PentaHydra & AI', zh: 'PentaHydra 智能与系统', he: 'PentaHydra ו-AI', sv: 'PentaHydra & AI', fi: 'PentaHydra & AI'
      } 
    },
    { 
      id: 'engineering', 
      label: {
        pt: 'Engenharia & Portos', en: 'Engineering & Ports', es: 'Ingeniería y Puertos', de: 'Engineering & Häfen', fr: 'Ingénierie & Ports', 
        ru: 'Инженерия и порты', nl: 'Engineering & Havens', zh: '重特大工程与智慧港口', he: 'הנדסה ונמלים', sv: 'Konstruktion & Hamnar', fi: 'Insinöörityö & Satamat'
      } 
    },
    { 
      id: 'environment', 
      label: {
        pt: 'Oxygen & ESG', en: 'Oxygen & ESG', es: 'Oxygen y ESG', de: 'Oxygen & ESG', fr: 'Oxygen & ESG', 
        ru: 'Oxygen и ESG', nl: 'Oxygen & ESG', zh: 'Oxygen 生态资产与碳汇', he: 'Oxygen ו-ESG', sv: 'Oxygen & ESG', fi: 'Oxygen & ESG'
      } 
    },
    { 
      id: 'governance', 
      label: {
        pt: 'Jurídico & Compliance', en: 'Legal & Compliance', es: 'Jurídico y Cumplimiento', de: 'Recht & Compliance', fr: 'Juridique & Conformité', 
        ru: 'Юридический отдел и комплаенс', nl: 'Juridisch & Compliance', zh: '法务合规与反商业贿赂', he: 'משפטי וציות', sv: 'Juridik & Efterlevnad', fi: 'Lakiasiat & Vaatimustenmukaisuus'
      } 
    },
    { 
      id: 'institutional', 
      label: {
        pt: 'Carreiras & Mídia', en: 'Careers & Media', es: 'Carreras y Medios', de: 'Karriere & Medien', fr: 'Carrières & Médias', 
        ru: 'Карьера и медиа', nl: 'Carrière & Media', zh: '人才招募与新闻发言', he: 'קריירה ותקשורת', sv: 'Karriär & Media', fi: 'Ura & Media'
      } 
    },
  ];

  const filteredEmails = KRAEFEGG_EMAILS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. Page Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{localize(lang, contactI18n.badge)}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-black text-white leading-tight">
          {localize(lang, contactI18n.title)}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {localize(lang, contactI18n.subtitle)}
        </p>
      </div>

      {/* 2. Spotlight: Founder & Lead Systems Developer Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0B0F1A] border-2 border-cyan-500/40 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-cyan-950 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                {localize(lang, contactI18n.founderBadge)}
              </span>
              <span className="text-xs font-mono text-slate-400">
                KRAEFEGG M.O. • PENTAHYDRA • OXYGEN
              </span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-white">
                {FOUNDER_INFO.name}
              </h2>
              <div className="text-cyan-400 font-mono text-sm font-semibold mt-1">
                {lang === 'pt' ? FOUNDER_INFO.titlePt : FOUNDER_INFO.title}
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {lang === 'pt' ? FOUNDER_INFO.bio : FOUNDER_INFO.bioEn}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Direct Founder Email */}
              <div className="flex items-center gap-2 p-2 px-3 rounded-xl bg-slate-900 border border-slate-700/80">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white select-all">
                  {FOUNDER_INFO.email}
                </span>
                <button
                  onClick={() => handleCopyEmail(FOUNDER_INFO.email)}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copiar e-mail"
                >
                  {copiedEmail === FOUNDER_INFO.email ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* LinkedIn Button */}
              <a
                href={FOUNDER_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                <span>LinkedIn /railsonarruda-engineering</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Founder Quick Direct Contacts */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-black/50 border border-cyan-500/30 space-y-4">
            <div className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{localize(lang, contactI18n.directLine)}</span>
            </div>

            <div className="space-y-2.5">
              {FOUNDER_INFO.telephones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.raw}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400 transition-all text-xs font-mono group"
                >
                  <span className="font-bold text-white group-hover:text-cyan-300">{phone.display}</span>
                  <span className="text-[10px] text-slate-400">{phone.region}</span>
                </a>
              ))}
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-400 border-t border-slate-800">
              {localize(lang, contactI18n.founderNotice)}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official Channels: Telephones & Socials Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Telephone 1 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">TELEFONE (61)</span>
            <Phone className="w-4 h-4 text-cyan-400" />
          </div>
          <a
            href="tel:+5561998850946"
            className="text-lg font-mono font-bold text-white hover:text-cyan-300 transition-colors block"
          >
            +55 (61) 99885-0946
          </a>
          <div className="text-[11px] font-mono text-cyan-400">Brasília / Centro-Oeste</div>
        </div>

        {/* Telephone 2 */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">TELEFONE (83)</span>
            <Phone className="w-4 h-4 text-cyan-400" />
          </div>
          <a
            href="tel:+5583999194789"
            className="text-lg font-mono font-bold text-white hover:text-cyan-300 transition-colors block"
          >
            +55 (83) 99919-4789
          </a>
          <div className="text-[11px] font-mono text-cyan-400">Nordeste / Nacional</div>
        </div>

        {/* Telegram */}
        <a
          href="https://t.me/Kraefegg"
          target="_blank"
          rel="noopener noreferrer"
          className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-400/60 transition-all space-y-2 group cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">TELEGRAM OFICIAL</span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
          </div>
          <div className="text-lg font-mono font-bold text-white group-hover:text-cyan-300">
            @Kraefegg
          </div>
          <div className="text-[11px] font-mono text-slate-400">t.me/Kraefegg</div>
        </a>

        {/* Instagram & YouTube */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase">
            {lang === 'pt' ? 'MÍDIAS SOCIAIS' : 'MEDIA CHANNELS'}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/kraefegg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-pink-400 border border-slate-700 text-xs font-mono font-bold transition-all text-center"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/@kraefegg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-red-400 border border-slate-700 text-xs font-mono font-bold transition-all text-center"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

      {/* 4. Complete Directory: 21 Kraefegg Domain Emails */}
      <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-[#070B14] to-[#04060A] border border-slate-800 p-8 sm:p-10 space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold uppercase mb-2">
              KRAEFEGG DOMAIN // 21 OFFICIAL CONTACTS
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              {localize(lang, contactI18n.directoryTitle)}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {localize(lang, contactI18n.directorySubtitle)}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={localize(lang, contactI18n.searchPlaceholder)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {localize(lang, cat.label)}
            </button>
          ))}
        </div>

        {/* Emails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmails.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all space-y-3 flex flex-col justify-between group ${
                item.category === 'founder'
                  ? 'bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                  : item.category === 'technology'
                  ? 'bg-rose-950/20 border-rose-900/40 hover:border-rose-500/50'
                  : item.category === 'environment'
                  ? 'bg-emerald-950/20 border-emerald-900/40 hover:border-emerald-500/50'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 uppercase">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleCopyEmail(item.email)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copiar e-mail"
                  >
                    {copiedEmail === item.email ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <h4 className="text-sm font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {lang === 'pt' ? item.label : item.labelEn}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {lang === 'pt' ? item.description : item.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href={`mailto:${item.email}`}
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors truncate max-w-[200px]"
                >
                  {item.email}
                </a>
                <a
                  href={`mailto:${item.email}`}
                  className="p-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30"
                  title="Enviar mensagem"
                >
                  <Mail className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Project Briefing Submission Form & Guarantee */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {localize(lang, contactI18n.success.title)}
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {localize(lang, contactI18n.success.text)}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs uppercase cursor-pointer"
              >
                {localize(lang, contactI18n.success.reset)}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-bold text-white">
                  {localize(lang, contactI18n.formTitle)}
                </h3>
                <p className="text-xs text-slate-400">
                  {localize(lang, contactI18n.formSubtitle)}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {localize(lang, contactI18n.labels.name)}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    placeholder="Seu nome / Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {localize(lang, contactI18n.labels.organization)}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    placeholder="Nome da empresa / Company"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {localize(lang, contactI18n.labels.email)}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    placeholder="corporate.email@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    {localize(lang, contactI18n.labels.phone)}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    placeholder="+55 (11) 9..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  {localize(lang, contactI18n.labels.area)}
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {areas.map((a, i) => (
                    <option key={i} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  {localize(lang, contactI18n.labels.message)}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  placeholder="Engineering scope, specifications, timeframe..."
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="nda"
                  checked={formData.ndaRequested}
                  onChange={(e) => setFormData({ ...formData, ndaRequested: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-400"
                />
                <label htmlFor="nda" className="text-xs text-slate-300 cursor-pointer">
                  {localize(lang, contactI18n.labels.nda)}
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{localize(lang, contactI18n.labels.submit)}</span>
              </button>
            </form>
          )}
        </div>

        {/* Rigor & Confidentiality Policy */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>{localize(lang, contactI18n.confidentiality.title)}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {localize(lang, contactI18n.confidentiality.text)}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">
              {localize(lang, contactI18n.globalDesk.title)}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {localize(lang, contactI18n.globalDesk.text)}
            </p>
            <div className="pt-2 text-[11px] font-mono text-cyan-400">
              {localize(lang, contactI18n.globalDesk.sla)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

