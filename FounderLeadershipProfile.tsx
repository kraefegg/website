import React from 'react';
import { Language } from '../../types';
import { FOUNDER_INFO } from '../../data/contactsData';
import {
  ExternalLink,
  Mail,
  Phone,
  Cpu,
  Layers,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Zap,
  Mountain,
  TreePine,
  Sprout,
  Anchor,
  Factory,
  Radio,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface FounderLeadershipProfileProps {
  lang: Language;
}

export const FounderLeadershipProfile: React.FC<FounderLeadershipProfileProps> = ({ lang }) => {
  return (
    <div className="space-y-12">
      {/* 1. Main Header & Bio Spotlight */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060911] via-slate-950 to-[#0A101D] border-2 border-cyan-500/40 p-8 sm:p-12 shadow-2xl space-y-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{lang === 'pt' ? 'LIDERANÇA INSTITUCIONAL & DIRETORIA TÉCNICA' : 'EXECUTIVE LEADERSHIP & TECHNICAL DIRECTION'}</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              RAILSON ARRUDA
            </h1>
            <h2 className="text-base sm:text-xl font-mono font-bold text-cyan-400 mt-2 leading-relaxed">
              {lang === 'pt'
                ? 'Fundador & Diretor Técnico | Engenharia, Tecnologia, IA e Inteligência Ambiental'
                : 'Founder & Technical Director | Engineering, Technology, AI & Environmental Intelligence'}
            </h2>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              <strong className="text-white">Railson Arruda</strong> é fundador e Diretor Técnico da{' '}
              <strong className="text-cyan-300">Kraefegg M.O. — Multi Office</strong>, organização multidisciplinar voltada à integração entre{' '}
              <span className="text-white font-medium">engenharia, tecnologia, inteligência artificial, dados, sistemas digitais, energia, mineração, infraestrutura e gestão ambiental</span>.
            </p>

            <p>
              Engenheiro Ambiental, com formação técnica em Meio Ambiente e formação complementar em{' '}
              <strong className="text-emerald-300">Perícia e Auditoria Ambiental, Engenharia de Segurança do Trabalho, Mineralogia, Engenharia Florestal, Energias Renováveis e Gestão de Obras</strong>,
              combina visão técnica de campo, governança regulatória e desenvolvimento tecnológico avançado.
            </p>

            <p>
              Atua na convergência entre o <strong className="text-cyan-300">mundo físico da engenharia pesada</strong> e as{' '}
              <strong className="text-rose-300">camadas digitais de alta tecnologia</strong>, unindo formação em{' '}
              <span className="text-white font-medium">AI Engineering e Cybersecurity pela DIO</span>, qualificação como{' '}
              <span className="text-white font-medium">Analista de Sistemas de Automação e Redes pelo SENAI/GO</span>, e aperfeiçoamento em{' '}
              <span className="text-white font-medium">Embedded Systems, IoT e Edge AI pelo FIT Tecnologia/PNAAT</span>.
            </p>
          </div>

          {/* Operational Loop Quote Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-300 font-bold block">
              METODOLOGIA OPERACIONAL & ENGENHARIA DE PRECISÃO
            </span>
            <div className="text-xs sm:text-sm md:text-base font-mono font-bold text-white tracking-wider flex flex-wrap items-center gap-2">
              <span className="text-cyan-400">OBSERVAR</span>
              <span className="text-slate-500">→</span>
              <span className="text-cyan-400">MEDIR</span>
              <span className="text-slate-500">→</span>
              <span className="text-emerald-400">CONECTAR</span>
              <span className="text-slate-500">→</span>
              <span className="text-emerald-400">ANALISAR</span>
              <span className="text-slate-500">→</span>
              <span className="text-amber-400">PREVER</span>
              <span className="text-slate-500">→</span>
              <span className="text-amber-400">DECIDIR</span>
              <span className="text-slate-500">→</span>
              <span className="text-rose-400">AUTOMATIZAR</span>
              <span className="text-slate-500">→</span>
              <span className="text-rose-400">MONITORAR</span>
            </div>
          </div>

          {/* Action & Contact Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={FOUNDER_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-blue-500/25 cursor-pointer"
            >
              <span>LinkedIn /railsonarruda-engineering</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${FOUNDER_INFO.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 font-mono text-xs font-semibold transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{FOUNDER_INFO.email}</span>
            </a>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
              {FOUNDER_INFO.telephones.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.raw}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-black/60 border border-cyan-500/30 hover:border-cyan-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{phone.display}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Posicionamento Profissional & Interseção */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-[#070B14] border border-white/[0.08] shadow-xl space-y-5">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">
          <Compass className="w-4 h-4" />
          <span>POSICIONAMENTO PROFISSIONAL (LINKEDIN HEADLINE)</span>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-xs sm:text-sm font-mono text-slate-200 leading-relaxed font-semibold">
          {FOUNDER_INFO.headline}
        </div>

        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block">
            {lang === 'pt' ? 'Interseção de atuação corporativa e institucional:' : 'Corporate & institutional focus intersection:'}
          </span>
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-rose-950/60 border border-cyan-500/30 text-center">
            <span className="text-xs sm:text-sm md:text-base font-mono font-extrabold tracking-widest text-white">
              ENGINEERING + TECHNOLOGY + DATA + AI + ENVIRONMENT + INFRASTRUCTURE
            </span>
          </div>
        </div>
      </div>

      {/* 2.1 FORMAÇÃO, CERTIFICAÇÕES & QUALIFICAÇÕES TÉCNICAS */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>QUALIFICAÇÃO TÉCNICA, FORMAÇÃO & CERTIFICAÇÕES OFICIAIS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
            Credenciamento & Certificações Industriais Homologadas
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Formação multidisciplinar integrando Engenharia Ambiental, Cibersegurança OT, Inteligência Artificial Generativa, Sistemas de Automação Industrial, Sistemas Embarcados e Regulação Setorial de Energia:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FOUNDER_INFO.academicAndCertifications.map((cert, cIdx) => {
            const getBorderAndBg = (color: string) => {
              switch (color) {
                case 'cyan':
                  return 'border-cyan-500/30 bg-cyan-950/10 hover:border-cyan-400/60';
                case 'amber':
                  return 'border-amber-500/30 bg-amber-950/10 hover:border-amber-400/60';
                case 'rose':
                  return 'border-rose-500/30 bg-rose-950/10 hover:border-rose-400/60';
                case 'blue':
                  return 'border-blue-500/30 bg-blue-950/10 hover:border-blue-400/60';
                case 'emerald':
                  return 'border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-400/60';
                default:
                  return 'border-slate-800 bg-slate-900/40 hover:border-slate-700';
              }
            };

            const getBadgeColor = (color: string) => {
              switch (color) {
                case 'cyan': return 'text-cyan-400 bg-cyan-950 border-cyan-500/40';
                case 'amber': return 'text-amber-400 bg-amber-950 border-amber-500/40';
                case 'rose': return 'text-rose-400 bg-rose-950 border-rose-500/40';
                case 'blue': return 'text-blue-400 bg-blue-950 border-blue-500/40';
                case 'emerald': return 'text-emerald-400 bg-emerald-950 border-emerald-500/40';
                default: return 'text-slate-400 bg-slate-900 border-slate-700';
              }
            };

            return (
              <div
                key={cIdx}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${getBorderAndBg(cert.badgeColor)}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {cert.institution}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getBadgeColor(cert.badgeColor)}`}>
                      {cert.credentialType}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 leading-snug">
                    {cert.program}
                  </h4>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Área: <strong className="text-slate-300">{cert.category}</strong></span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. KRAEFEGG M.O. (MULTI OFFICE) - Disciplinas */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            <Layers className="w-4 h-4" />
            <span>ORGANIZAÇÃO MULTIDISCIPLINAR INTEGRADA</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
            KRAEFEGG M.O. (MULTI OFFICE)
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Sob sua direção técnica, a Kraefegg M.O. foi estruturada como uma organização multidisciplinar integrada, operando em 8 macrodisciplinas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'ENGINEERING',
              icon: HardHat,
              color: 'text-amber-400',
              border: 'border-amber-500/30',
              desc: 'Engenharia mecânica, civil, estrutural, elétrica, automação, geotécnica e de segurança do trabalho.',
            },
            {
              title: 'ENVIRONMENTAL & ESG',
              icon: Leaf,
              color: 'text-emerald-400',
              border: 'border-emerald-500/30',
              desc: 'Licenciamento ambiental, perícia, auditoria, conformidade regulatória, gestão hídrica, créditos de carbono e governança socioambiental.',
            },
            {
              title: 'ENERGY',
              icon: Zap,
              color: 'text-yellow-400',
              border: 'border-yellow-500/30',
              desc: 'Usinas solares fotovoltaicas (centralizadas e distribuídas), hidrogênio verde (H2V), biometano, biomassa e transição energética.',
            },
            {
              title: 'MINING & GEOINTELLIGENCE',
              icon: Mountain,
              color: 'text-orange-400',
              border: 'border-orange-500/30',
              desc: 'Geoprocessamento, sensoriamento remoto por satélite, estabilidade de taludes, monitoramento geomecânico e gestão de passivos minerais.',
            },
            {
              title: 'FORESTRY & RESTORATION',
              icon: TreePine,
              color: 'text-green-400',
              border: 'border-green-500/30',
              desc: 'Manejo florestal sustentável, restauração de biomas (Cerrado, Caatinga, Mata Atlântica e Amazônia) e mensuração biométrica.',
            },
            {
              title: 'AGRICULTURE & SMART SYSTEMS',
              icon: Sprout,
              color: 'text-lime-400',
              border: 'border-lime-500/30',
              desc: 'Agricultura de precisão, telemetria de solo, bioinsumos, irrigação automatizada e monitoramento agrometeorológico.',
            },
            {
              title: 'PORTS, MARITIME & LOGISTICS',
              icon: Anchor,
              color: 'text-cyan-400',
              border: 'border-cyan-500/30',
              desc: 'Engenharia portuária, monitoramento oceanográfico, calado dinâmico, logística integrada e eletrificação de cais (shore power).',
            },
            {
              title: 'INDUSTRY & INFRASTRUCTURE',
              icon: Factory,
              color: 'text-rose-400',
              border: 'border-rose-500/30',
              desc: 'Auditoria de integridade física, instrumentação industrial, automação de processos e redução de riscos operacionais.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-slate-900/80 border ${item.border} hover:bg-slate-800/80 transition-all space-y-3`}
            >
              <div className="flex items-center gap-2.5">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <h4 className="font-heading font-bold text-white text-xs sm:text-sm tracking-wider">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Divisions: PentaHydra Systems & Oxygen Ecosystem */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PentaHydra Systems */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#120710] via-slate-950 to-[#0B0813] border-2 border-rose-500/40 shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950 border border-rose-500/40 text-rose-300 text-[10px] font-mono uppercase font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>PENTAHYDRA SYSTEMS</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white">
              AI • DATA • CYBER • EMBEDDED • IoT • EDGE AI
            </h3>
            <p className="text-xs text-slate-300">
              Divisão tecnológica e digital da Kraefegg, desenvolvendo soluções proprietárias e integradas:
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-black/50 border border-rose-500/20 space-y-1">
              <strong className="text-rose-300 font-mono uppercase text-[11px] block">Artificial Intelligence</strong>
              <p>Agentes inteligentes de engenharia, modelos preditivos para manutenção industrial, processamento de linguagem natural técnica e engenharia de prompt para laudos automatizados.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-rose-500/20 space-y-1">
              <strong className="text-rose-300 font-mono uppercase text-[11px] block">Industrial IoT & Embedded Systems</strong>
              <p>Sensores robustecidos, telemetria em tempo real para ambientes remotos e severos (mineração, portos, usinas solares).</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-rose-500/20 space-y-1">
              <strong className="text-rose-300 font-mono uppercase text-[11px] block">Edge AI</strong>
              <p>Processamento de inferência na borda, permitindo tomada de decisão autônoma em milissegundos sem dependência de conectividade em nuvem.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-rose-500/20 space-y-1">
              <strong className="text-rose-300 font-mono uppercase text-[11px] block">Cybersecurity & Redes Industriais</strong>
              <p>Proteção de sistemas supervisórios (SCADA), redes industriais convergentes (TI/TO) e conformidade com normas de segurança cibernética crítica.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-rose-500/20 space-y-1">
              <strong className="text-rose-300 font-mono uppercase text-[11px] block">GeoAI & Sensoriamento Remoto</strong>
              <p>Integração entre imagens de satélite, dados de drones, LiDAR e algoritmos de deep learning para monitoramento territorial e ambiental contínuo.</p>
            </div>
          </div>
        </div>

        {/* Oxygen Ecosystem */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#06150F] via-slate-950 to-[#05110E] border-2 border-emerald-500/40 shadow-2xl space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono uppercase font-bold">
              <Leaf className="w-3.5 h-3.5" />
              <span>OXYGEN ECOSYSTEM</span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white">
              INTELIGÊNCIA AMBIENTAL INTEGRADA
            </h3>
            <p className="text-xs text-slate-300">
              Ecossistema ambiental, regulatório e de sustentabilidade da Kraefegg, dedicado a:
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/20 space-y-1">
              <strong className="text-emerald-300 font-mono uppercase text-[11px] block">Monitoramento Contínuo</strong>
              <p>Redes de telemetria ambiental (qualidade da água, do ar, efluentes e emissões) integradas em tempo real.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/20 space-y-1">
              <strong className="text-emerald-300 font-mono uppercase text-[11px] block">Ativos Ambientais & Descarbonização</strong>
              <p>Estruturação técnica de projetos de créditos de carbono, créditos de biodiversidade e métricas ESG auditáveis.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/20 space-y-1">
              <strong className="text-emerald-300 font-mono uppercase text-[11px] block">Conformidade Legal & Licenciamento</strong>
              <p>Gestão de processos regulatórios complexos perante órgãos ambientais federais (IBAMA), estaduais e municipais.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/20 space-y-1">
              <strong className="text-emerald-300 font-mono uppercase text-[11px] block">Restauração Ecológica de Precisão</strong>
              <p>Projetos de recomposição vegetal com rastreabilidade digital, monitoramento biométrico por satélite e garantia de sobrevivência de mudas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. MODELO DE INTELIGÊNCIA INTEGRADA KRAEFEGG */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-cyan-500/40 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            ARQUITETURA FÍSICO-DIGITAL
          </span>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
            MODELO DE INTELIGÊNCIA INTEGRADA KRAEFEGG
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            A metodologia concebida por Railson Arruda conecta os ativos do mundo real ao poder computacional:
          </p>
        </div>

        {/* Interactive Architecture Schema */}
        <div className="p-6 rounded-2xl bg-[#04070E] border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
          <div className="min-w-[650px] space-y-3">
            <div className="flex justify-between items-center text-cyan-300 font-bold border-b border-slate-800 pb-2">
              <span>[MUNDO FÍSICO: Engenharia / Sensores IoT / Satélites]</span>
              <span className="text-rose-400">[MUNDO DIGITAL: Edge AI / Nuvem / Modelos Preditivos]</span>
            </div>
            <div className="text-center py-4 text-slate-300">
              <div className="grid grid-cols-5 gap-2 text-center text-[11px] font-bold">
                <div className="p-3 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                  OBSERVAR & MEDIR
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  CONECTAR & PROCESSAR
                </div>
                <div className="p-3 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-indigo-300">
                  ANALISAR & PREVER
                </div>
                <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300">
                  DECIDIR
                </div>
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300">
                  AUTOMATIZAR & MONITORAR
                </div>
              </div>
              <div className="mt-3 text-emerald-400 font-bold text-xs">
                ▲ VALIDAÇÃO FINAL COM RESPONSABILIDADE TÉCNICA (ART) & AUDITORIA HUMANA ▲
              </div>
            </div>
          </div>
        </div>

        {/* 5 Layer Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          {[
            {
              layer: 'Camada 01',
              title: 'Engenharia & Campo',
              desc: 'Instrumentação direta, inspeção técnica, medições físicas, amostragem e ensaios laboratoriais.',
            },
            {
              layer: 'Camada 02',
              title: 'Conectividade & IoT',
              desc: 'Redes de sensores, telemetria remota (LoRaWAN, 4G/5G, satelital) e aquisição contínua de dados.',
            },
            {
              layer: 'Camada 03',
              title: 'Dados & Processamento',
              desc: 'Estruturação de pipelines de dados em tempo real, validação estatística e normalização.',
            },
            {
              layer: 'Camada 04',
              title: 'Inteligência Artificial',
              desc: 'Modelos preditivos, visão computacional, algoritmos de otimização e inferência via Edge AI.',
            },
            {
              layer: 'Camada 05',
              title: 'Decisão & ART',
              desc: 'Decisões suportadas por IA, formalizadas e validadas por engenheiros habilitados com emissão de ART.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{item.layer}</span>
              <h5 className="text-xs font-bold text-white font-heading">{item.title}</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. O DIFERENCIAL - Comparative Matrix */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            MATRIZ COMPETITIVA DE MERCADO
          </span>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
            O DIFERENCIAL
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            A maior parte do mercado opera de forma fragmentada: empresas de TI desenvolvem software sem compreender a física dos ativos industriais e ambientais; escritórios de engenharia tradicionais elaboram projetos sem aproveitar a automação, a ciência de dados e a inteligência artificial. A Kraefegg M.O., sob a liderança de Railson Arruda, elimina essa lacuna ao integrar:
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-900/90 text-slate-300 font-mono text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-5">Dimensão</th>
                  <th className="py-4 px-5 text-slate-400">Engenharia Tradicional</th>
                  <th className="py-4 px-5 text-slate-400">Empresas de TI / Software</th>
                  <th className="py-4 px-5 text-cyan-300 bg-cyan-950/40">KRAEFEGG M.O.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-5 font-bold text-white">Conhecimento Físico</td>
                  <td className="py-3.5 px-5 text-slate-400">Alto</td>
                  <td className="py-3.5 px-5 text-slate-400">Baixo</td>
                  <td className="py-3.5 px-5 text-cyan-300 font-bold bg-cyan-950/20">Avançado (Multi-disciplinar)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-5 font-bold text-white">Tecnologia & IA</td>
                  <td className="py-3.5 px-5 text-slate-400">Baixo</td>
                  <td className="py-3.5 px-5 text-slate-400">Alto</td>
                  <td className="py-3.5 px-5 text-rose-300 font-bold bg-cyan-950/20">Nativo (PentaHydra Systems)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-5 font-bold text-white">Inteligência Ambiental</td>
                  <td className="py-3.5 px-5 text-slate-400">Pontual</td>
                  <td className="py-3.5 px-5 text-slate-400">Inexistente</td>
                  <td className="py-3.5 px-5 text-emerald-300 font-bold bg-cyan-950/20">Contínua (Oxygen Ecosystem)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-5 font-bold text-white">Responsabilidade Legal (ART)</td>
                  <td className="py-3.5 px-5 text-slate-400">Sim</td>
                  <td className="py-3.5 px-5 text-slate-400">Não</td>
                  <td className="py-3.5 px-5 text-amber-300 font-bold bg-cyan-950/20">Sim (todas as soluções)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-5 font-bold text-white">Tempo de Resposta</td>
                  <td className="py-3.5 px-5 text-slate-400">Semanas / Meses</td>
                  <td className="py-3.5 px-5 text-slate-400">N/A</td>
                  <td className="py-3.5 px-5 text-white font-bold bg-cyan-950/20">Tempo Real / Preditivo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 7. RESPONSABILIDADE TÉCNICA E INTELIGÊNCIA ARTIFICIAL */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 border border-cyan-500/30 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>DIRETRIZ DE ENGENHARIA RESPONSÁVEL</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
            RESPONSABILIDADE TÉCNICA E INTELIGÊNCIA ARTIFICIAL
          </h3>
        </div>

        <blockquote className="p-6 rounded-2xl bg-black/60 border-l-4 border-cyan-400 space-y-3">
          <p className="text-sm sm:text-base md:text-lg font-mono font-medium text-cyan-100 italic leading-relaxed">
            &ldquo;A inteligência artificial não substitui a responsabilidade técnica do engenheiro. Ela amplifica a precisão, acelera a análise e antecipa falhas — mas a validação final, a ética e a assinatura legal permanecem humanas.&rdquo;
          </p>
          <footer className="text-xs font-mono font-bold text-cyan-400 uppercase">
            — Railson Arruda, Fundador & Diretor Técnico
          </footer>
        </blockquote>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Todas as soluções desenvolvidas pela Kraefegg M.O., PentaHydra Systems e Oxygen Ecosystem operam sob o modelo <strong className="text-white">Human-in-the-Loop</strong>, garantindo que nenhum algoritmo atue sem supervisão técnica qualificada.
        </p>
      </div>

      {/* 8. VISÃO INSTITUCIONAL */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-[#07131B] to-slate-950 border border-cyan-500/50 shadow-2xl space-y-4">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
          VISÃO DE LONGO PRAZO
        </span>
        <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
          Construir a Organização de Maior Rigor e Impacto do Hemisfério Sul
        </h3>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-4xl">
          Construir a organização mais respeitada do Hemisfério Sul na convergência entre <strong className="text-cyan-300">engenharia pesada, inteligência artificial e inteligência ambiental</strong>, demonstrando que o desenvolvimento industrial, a eficiência energética e a integridade ecológica não são objetivos conflitantes — mas vetores que se potencializam mutuamente quando mediados por tecnologia de ponta e rigor científico.
        </p>
      </div>
    </div>
  );
};
