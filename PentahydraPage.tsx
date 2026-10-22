import React from 'react';
import { NavRoute, Language } from '../types';
import { CinematicVideoPlayer } from '../components/media/CinematicVideoPlayer';
import { pentahydraI18n, localize } from '../data/pageTranslations';
import { 
  Cpu, ArrowRight, Zap, Anchor, 
  Pickaxe, Leaf, Sprout, Factory 
} from 'lucide-react';

interface PentahydraPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const PentahydraPage: React.FC<PentahydraPageProps> = ({ onNavigate, lang }) => {
  const techPillars = [
    {
      title: 'Edge AI & Embedded Intelligence',
      desc: {
        pt: 'Inferência neural em tempo real (< 4.2ms) em hardware industrial (NVIDIA Jetson, Edge TPUs) para ambientes hostis e com conectividade intermitente.',
        en: 'Sub-4.2ms neural inference executed on ruggedized industrial hardware (NVIDIA Jetson, Edge TPUs) in harsh or disconnected operational environments.',
        es: 'Inferencia neural en tiempo real (< 4.2ms) en hardware industrial para ambientes hostiles y conectividad intermitente.',
        de: 'Echtzeit-Neuronale Inferenz (< 4.2ms) auf robuster Industrie-Hardware für anspruchsvolle Betriebsumgebungen.',
        fr: 'Inférence neuronale en temps réel (< 4.2ms) sur matériel industriel durci pour environnements hostiles.',
        ru: 'Нейросетевой вывод в реальном времени (< 4.2 мс) на промышленном оборудовании в жестких условиях эксплуатации.',
        nl: 'Realtime neurale inferentie (< 4.2ms) op industriële hardware voor zware operationele omstandigheden.',
        zh: '在工业加固硬件（NVIDIA Jetson / Edge TPU）上运行毫秒级边缘智能推理（< 4.2ms），无惧离线与严苛工业环境。',
        he: 'הסקת בינה מלאכותית בזמן אמת (< 4.2ms) על חומרה תעשייתית קשיחה בסביבות קשות.',
        sv: 'Neural inferens i realtid (< 4.2ms) på robust hårdvara för krävande miljöer.',
        fi: 'Reaaliaikainen neuroverkkopäättely (< 4.2ms) kestävässä teollisuuslaitteistossa vaativissa ympäristöissä.',
      },
      badge: 'LATÊNCIA < 4ms',
    },
    {
      title: 'Zero-Trust Industrial Cybersecurity',
      desc: {
        pt: 'Proteção de redes OT e sistemas legados SCADA contra ransomware e injeção de pacotes Modbus/Profinet sem adicionar latência à linha fabril.',
        en: 'Protection of operational OT networks and SCADA infrastructure against ransomware and malicious protocol injection without line latency.',
        es: 'Protección de redes OT e infraestructura SCADA contra ransomware e inyección de paquetes sin latencia adicional.',
        de: 'Schutz von OT-Netzwerken und SCADA-Infrastruktur gegen Ransomware und Protokoll-Injektionen ohne Linienverzögerung.',
        fr: 'Protection des réseaux OT et SCADA contre les rançongiciels et l’injection de paquets sans latence de ligne.',
        ru: 'Защита технологических сетей АСУ ТП и SCADA от вымогателей и инъекций протоколов Modbus/Profinet с нулевой задержкой.',
        nl: 'Beveiliging van OT-netwerken en SCADA-infrastructuur tegen ransomware en protocolinjectie zonder lijnvertraging.',
        zh: '零信任工业控制与运行技术 (OT) 网络安全架构，全向防御勒索病毒及工控协议注入攻击，对产线零增加时延。',
        he: 'הגנה על רשתות OT ותשתיות SCADA מפני כופרה והזרקת פרוטוקולים ללא תוספת השהיה.',
        sv: 'Skydd av OT-nätverk och SCADA-infrastruktur mot ransomware och protokollinjektion utan linjefördröjning.',
        fi: 'OT-verkkojen ja SCADA-infrastruktuurin suojaus kiristyshaittaohjelmilta ilman linjaviivettä.',
      },
      badge: 'IEC 62443',
    },
    {
      title: 'Autonomous Digital Twins',
      desc: {
        pt: 'Modelagem paramétrica 3D contínua sincronizada a centenas de sensores físicos para previsão de fadiga estrutural e falhas térmicas.',
        en: 'Parametric continuous 3D modeling synchronized with hundreds of physical telemetry nodes for structural fatigue and thermal failure prediction.',
        es: 'Modelado paramétrico 3D continuo sincronizado con sensores físicos para predicción de fatiga estructural.',
        de: 'Parametrische kontinuierliche 3D-Modellierung, synchronisiert mit hunderten physischen Telemetrieknoten zur Ausfallvorhersage.',
        fr: 'Modélisation 3D paramétrique continue synchronisée avec des centaines de capteurs pour la prévision de fatigue structurelle.',
        ru: 'Параметрическое непрерывное 3D-моделирование, синхронизированное с датчиками для прогнозирования усталости конструкций.',
        nl: 'Parametrische 3D-modellering gesynchroniseerd met sensoren voor het voorspellen van structurele metaalmoeheid en thermische storingen.',
        zh: '高保真参数化连续三维数字孪生，毫秒级同步数百路实体物理遥测节点，精准预警结构疲劳与热过载故障。',
        he: 'מידול פרמטרי 3D רציף המסונכרן עם מאות חיישנים לחיזוי עייפות מבנית וכשלים תרמיים.',
        sv: 'Parametrisk kontinuerlig 3D-modellering synkroniserad med sensorer för strukturell utmattningsprognos.',
        fi: 'Parametrinen jatkuva 3D-mallinnus synkronoituna anturiverkkoon rakenteellisen väsymisen ja lämpövikojen ennustamiseksi.',
      },
      badge: 'REAL-TIME 100Hz',
    },
    {
      title: 'Industrial IoT & Sensor Networks',
      desc: {
        pt: 'Redes de telemetria LoRaWAN 915MHz de longo alcance (15+ km), boias limnológicas, estações meteorológicas e sondas subterrâneas.',
        en: 'Long-range LoRaWAN telemetry networks (15+ km), autonomous limnological sensor buoys, weather stations, and subterranean probes.',
        es: 'Redes de telemetría LoRaWAN de largo alcance (15+ km), boyas limnológicas y sondas subterráneas.',
        de: 'Weitbereichs-LoRaWAN-Telemetrienetze (15+ km), autonome limnologische Bojen, Wetterstationen und Tiefsonden.',
        fr: 'Réseaux de télémesure LoRaWAN longue portée (15+ km), bouées limnologiques autonomes et sondes souterraines.',
        ru: 'Сверхдальние телеметрические сети LoRaWAN (15+ км), автономные гидрологические буи, метеостанции и подземные зонды.',
        nl: 'Langeafstands-LoRaWAN-telemetrienetwerken (15+ km), autonome limnologische boeien en ondergrondse sondes.',
        zh: '超远距离 LoRaWAN 工业物联网专网（覆盖半径 15+ 公里）、自主式水文水质监测浮标、全天候气象站与地下深层传感探针。',
        he: 'רשתות טלמטריה LoRaWAN לטווח ארוך (15+ ק"מ), מצופים לימנולוגיים, תחנות מזג אוויר וגלאים תת-קרקעיים.',
        sv: 'Långdistans LoRaWAN-telemetrinät (15+ km), autonoma limnologiska bojar och marksonder.',
        fi: 'Pitkän kantaman LoRaWAN-telemetriaverkot (15+ km), autonomiset limnologiset poijut ja maanalaiset mittapäät.',
      },
      badge: 'LORA / 4G / SAT',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. High-Impact Cinematic Hero */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Neon Glow accents */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Enlarged Official Logo & Brand Lockup */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-2xl bg-slate-950/80 border border-rose-500/40 shadow-[0_0_35px_rgba(244,63,94,0.25)]">
              <img
                src="/Π (3).jpg"
                alt="PentaHydra Agency Technologies & Systems"
                referrerPolicy="no-referrer"
                className="h-28 sm:h-36 w-auto max-w-[280px] object-contain rounded-xl border border-rose-500/50 bg-black/90 p-2 shadow-[0_0_30px_rgba(244,63,94,0.4)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/pentahydra-system-logo.jpg';
                }}
              />
              <div className="space-y-1">
                <div className="text-3xl sm:text-5xl font-heading font-black tracking-wide text-white drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                  PentaHydra
                </div>
                <div className="text-sm sm:text-base font-mono font-bold tracking-[0.24em] text-rose-400 uppercase">
                  Agency Technologies & Systems
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-black text-white leading-tight">
              {localize(lang, pentahydraI18n.heroTitle)}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {localize(lang, pentahydraI18n.heroSubtitle)}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('/showcases')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_-5px_rgba(244,63,94,0.5)] cursor-pointer flex items-center gap-2"
              >
                <span>{localize(lang, pentahydraI18n.experienceLab)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('/contact')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-mono text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                <span>{localize(lang, pentahydraI18n.developTech)}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <CinematicVideoPlayer
              title="PENTAHYDRA REEL // OFFICIAL BROADCAST"
              subtitle="CYBER MATRIX & EMBEDDED REAL-WORLD SYSTEMS"
              defaultMode="cyber"
            />
          </div>
        </div>
      </section>

      {/* 2. Core Technological Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-left space-y-2">
          <div className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase">
            {localize(lang, pentahydraI18n.techPillarsBadge)}
          </div>
          <h2 className="text-3xl font-heading font-black text-white">
            {localize(lang, pentahydraI18n.techPillarsTitle)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0A0710] border border-slate-800 hover:border-rose-500/40 transition-all space-y-4 group shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-500/30 text-rose-400">
                  <Cpu className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-950 text-rose-300 border border-rose-900/50">
                  {p.badge}
                </span>
              </div>

              <h3 className="text-xl font-heading font-bold text-white group-hover:text-rose-300 transition-colors">
                {p.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {localize(lang, p.desc)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Real-World Physical Applications Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#060810] border border-white/[0.08] space-y-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {localize(lang, pentahydraI18n.deployBadge)}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
              {localize(lang, pentahydraI18n.deployTitle)}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: localize(lang, pentahydraI18n.industries.ports), icon: Anchor },
              { label: localize(lang, pentahydraI18n.industries.mining), icon: Pickaxe },
              { label: localize(lang, pentahydraI18n.industries.agribusiness), icon: Sprout },
              { label: localize(lang, pentahydraI18n.industries.energy), icon: Zap },
              { label: localize(lang, pentahydraI18n.industries.manufacturing), icon: Factory },
              { label: localize(lang, pentahydraI18n.industries.environment), icon: Leaf },
            ].map((v, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center space-y-2"
              >
                <v.icon className="w-6 h-6 text-rose-400 mx-auto" />
                <div className="text-xs font-mono text-slate-200 font-semibold">{v.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

