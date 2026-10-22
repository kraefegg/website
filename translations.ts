import { Language, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Espanhol', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Alemão', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Francês', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ru', name: 'Russo', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'nl', name: 'Neerlandês', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'zh', name: 'Chinês', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'he', name: 'Hebraico', nativeName: 'עברית', flag: '🇮🇱', direction: 'rtl' },
  { code: 'sv', name: 'Sueco', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'fi', name: 'Finlandês', nativeName: 'Suomi', flag: '🇫🇮' },
];

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    showcases: string;
    pentahydra: string;
    oxygen: string;
    partners: string;
    news: string;
    careers: string;
    contact: string;
    exploreCapabilities: string;
    talkToAI: string;
    startConversation: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    headlinePart3: string;
    headlinePart4: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    replayReel: string;
    videoTelemetry: string;
  };
  pentahydra: {
    name: string;
    tagline: string;
    divisionBadge: string;
    subtitle: string;
    exploreCta: string;
  };
  founder: {
    badge: string;
    role: string;
    name: string;
    linkedin: string;
    contactFounder: string;
    bio: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    allEmailsBadge: string;
    phonesBadge: string;
    socialsBadge: string;
    copyEmail: string;
    copied: string;
    directLine: string;
    formTitle: string;
  };
  footer: {
    tagline: string;
    substatement: string;
    copyright: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Institucional',
      services: 'Serviços & Engenharia',
      projects: 'Projetos',
      showcases: 'Showcases & Lab',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Parceiros',
      news: 'Notícias & Insights',
      careers: 'Carreiras',
      contact: 'Contato',
      exploreCapabilities: 'Explorar Capacidades',
      talkToAI: 'Assistente Kraefegg IA',
      startConversation: 'Iniciar Conversa',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // ORGANIZAÇÃO MULTIDISCIPLINAR',
      headlinePart1: 'ENGINEERING.',
      headlinePart2: 'INTELLIGENCE.',
      headlinePart3: 'TECHNOLOGY.',
      headlinePart4: 'IMPACT.',
      subtitle: 'A Kraefegg M.O. integra engenharia multidisciplinar, inteligência ambiental e tecnologia avançada para projetar soluções para sistemas complexos do mundo real.',
      primaryCta: 'EXPLORAR CAPACIDADES',
      secondaryCta: 'VER PROJETOS',
      replayReel: 'REPRODUZIR REEL CINEMÁTICO',
      videoTelemetry: 'BROADCAST MULTIDISCIPLINAR // KRAEFEGG M.O. GLOBAL OPS',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'DIVISÃO TECNOLÓGICA // AGÊNCIA DE SISTEMAS & IA',
      subtitle: 'Desenvolvimento proprietário em Edge AI, sistemas embarcados, IoT industrial, robótica e cibersegurança operacional.',
      exploreCta: 'EXPLORAR PENTAHYDRA',
    },
    founder: {
      badge: 'LIDERANÇA EXECUTIVA & DESENVOLVIMENTO',
      role: 'Fundador & Desenvolvedor de Sistemas',
      name: 'Railson Arruda',
      linkedin: 'Perfil no LinkedIn',
      contactFounder: 'Contato Direto com o Fundador',
      bio: 'Engenheiro de sistemas e arquiteto de tecnologia. Fundador da Kraefegg M.O., lidera a federação multidisciplinar integrando grandes obras de engenharia, sistemas cognitivos avançados com a PentaHydra e economia regenerativa com o Oxygen Ecosystem.',
    },
    contact: {
      badge: 'CANAIS OFICIAIS // KRAEFEGG DOMAIN',
      title: 'Contatos & Diretório Corporativo',
      subtitle: 'Comunique-se diretamente com a diretoria, o fundador ou os departamentos especializados através dos e-mails oficiais do domínio kraefegg.com.',
      allEmailsBadge: 'TODOS OS 21 E-MAILS DO DOMÍNIO KRAEFEGG',
      phonesBadge: 'CENTRAL TELEFÔNICA DIRETA',
      socialsBadge: 'REDES INSTITUCIONAIS & MENSAGERIA',
      copyEmail: 'Copiar E-mail',
      copied: 'Copiado!',
      directLine: 'Linha Telefônica',
      formTitle: 'Transmitir Briefing Técnico',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Engenharia • Tecnologia • Meio Ambiente • Inteligência Industrial',
      copyright: '© Kraefegg M.O. Multi Office. Todos os direitos reservados.',
      privacy: 'Privacidade & Proteção de Dados',
      terms: 'Termos de Conformidade',
      cookies: 'Políticas de Cookies',
    },
  },

  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services & Engineering',
      projects: 'Projects',
      showcases: 'Showcases & Lab',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Partners',
      news: 'News & Insights',
      careers: 'Careers',
      contact: 'Contact',
      exploreCapabilities: 'Explore Capabilities',
      talkToAI: 'Kraefegg AI Assistant',
      startConversation: 'Start a Conversation',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // MULTIDISCIPLINARY ORGANIZATION',
      headlinePart1: 'ENGINEERING.',
      headlinePart2: 'INTELLIGENCE.',
      headlinePart3: 'TECHNOLOGY.',
      headlinePart4: 'IMPACT.',
      subtitle: 'Kraefegg M.O. integrates multidisciplinary engineering, environmental intelligence, and advanced technology to design solutions for complex real-world systems.',
      primaryCta: 'EXPLORE CAPABILITIES',
      secondaryCta: 'VIEW PROJECTS',
      replayReel: 'PLAY CINEMATIC REEL',
      videoTelemetry: 'MULTIDISCIPLINARY BROADCAST // KRAEFEGG M.O. GLOBAL OPS',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'TECHNOLOGY DIVISION // SYSTEMS & AI AGENCY',
      subtitle: 'Proprietary engineering in Edge AI, embedded mission-critical hardware, industrial IoT, robotics, and operational cybersecurity.',
      exploreCta: 'EXPLORE PENTAHYDRA',
    },
    founder: {
      badge: 'EXECUTIVE LEADERSHIP & SYSTEMS ARCHITECTURE',
      role: 'Founder & Lead Systems Developer',
      name: 'Railson Arruda',
      linkedin: 'LinkedIn Profile',
      contactFounder: 'Contact Founder Directly',
      bio: 'Systems engineer and technology architect. Founder of Kraefegg M.O., directing the multidisciplinary federation merging physical engineering, cognitive systems via PentaHydra, and ecological intelligence through Oxygen Ecosystem.',
    },
    contact: {
      badge: 'OFFICIAL CHANNELS // KRAEFEGG DOMAIN',
      title: 'Corporate Contacts & Directory',
      subtitle: 'Connect directly with executive leadership, the founder, or specialized departmental desks via official @kraefegg.com domain mailboxes.',
      allEmailsBadge: 'ALL 21 KRAEFEGG DOMAIN EMAILS',
      phonesBadge: 'DIRECT TELEPHONE CENTRAL',
      socialsBadge: 'OFFICIAL NETWORKS & CHANNELS',
      copyEmail: 'Copy Email',
      copied: 'Copied!',
      directLine: 'Direct Line',
      formTitle: 'Submit Technical Briefing',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Engineering • Technology • Environment • Industrial Intelligence',
      copyright: '© Kraefegg M.O. Multi Office. All rights reserved.',
      privacy: 'Privacy & Data Protection',
      terms: 'Compliance Terms',
      cookies: 'Cookie Policies',
    },
  },

  es: {
    nav: {
      home: 'Inicio',
      about: 'Institucional',
      services: 'Servicios e Ingeniería',
      projects: 'Proyectos',
      showcases: 'Showcases & Lab',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Socios',
      news: 'Noticias e Insights',
      careers: 'Carreras',
      contact: 'Contacto',
      exploreCapabilities: 'Explorar Capacidades',
      talkToAI: 'Asistente Kraefegg IA',
      startConversation: 'Iniciar Conversación',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // ORGANIZACIÓN MULTIDISCIPLINAR',
      headlinePart1: 'INGENIERÍA.',
      headlinePart2: 'INTELIGENCIA.',
      headlinePart3: 'TECNOLOGÍA.',
      headlinePart4: 'IMPACTO.',
      subtitle: 'Kraefegg M.O. integra ingeniería multidisciplinaria, inteligencia ambiental y tecnología avanzada para diseñar soluciones para sistemas complejos del mundo real.',
      primaryCta: 'EXPLORAR CAPACIDADES',
      secondaryCta: 'VER PROYECTOS',
      replayReel: 'REPRODUCIR REEL CINEMATOGRÁFICO',
      videoTelemetry: 'TRANSMISIÓN MULTIDISCIPLINAR // KRAEFEGG M.O. OPS GLOBALES',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'DIVISIÓN TECNOLÓGICA // AGENCIA DE SISTEMAS & IA',
      subtitle: 'Desarrollo en Edge AI, sistemas embebidos de misión crítica, IoT industrial, robótica y ciberseguridad operativa.',
      exploreCta: 'EXPLORAR PENTAHYDRA',
    },
    founder: {
      badge: 'LIDERAZGO EJECUTIVO Y DESARROLLO',
      role: 'Fundador y Desarrollador de Sistemas',
      name: 'Railson Arruda',
      linkedin: 'Perfil de LinkedIn',
      contactFounder: 'Contactar al Fundador Directamente',
      bio: 'Ingeniero de sistemas y arquitecto tecnológico. Fundador de Kraefegg M.O., dirige la federación multidisciplinaria uniendo ingeniería pesada, sistemas cognitivos mediante PentaHydra y regeneración ecológica con Oxygen Ecosystem.',
    },
    contact: {
      badge: 'CANALES OFICIALES // DOMINIO KRAEFEGG',
      title: 'Contactos y Directorio Corporativo',
      subtitle: 'Comuníquese directamente con la dirección ejecutiva, el fundador o los departamentos especializados mediante los correos oficiales del dominio kraefegg.com.',
      allEmailsBadge: 'LOS 21 CORREOS DEL DOMINIO KRAEFEGG',
      phonesBadge: 'CENTRAL TELEFÓNICA DIRECTA',
      socialsBadge: 'REDES OFICIALES Y MENSAJERÍA',
      copyEmail: 'Copiar Correo',
      copied: '¡Copiado!',
      directLine: 'Línea Telefónica',
      formTitle: 'Transmitir Briefing Técnico',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Ingeniería • Tecnología • Medio Ambiente • Inteligencia Industrial',
      copyright: '© Kraefegg M.O. Multi Office. Todos los derechos reservados.',
      privacy: 'Privacidad y Protección de Datos',
      terms: 'Términos de Conformidad',
      cookies: 'Política de Cookies',
    },
  },

  de: {
    nav: {
      home: 'Startseite',
      about: 'Über uns',
      services: 'Leistungen & Ingenieurwesen',
      projects: 'Projekte',
      showcases: 'Showcases & Lab',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Partner',
      news: 'Nachrichten & Einblicke',
      careers: 'Karriere',
      contact: 'Kontakt',
      exploreCapabilities: 'Kompetenzen erkunden',
      talkToAI: 'Kraefegg KI-Assistent',
      startConversation: 'Gespräch beginnen',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // MULTIDISZIPLINÄRE ORGANISATION',
      headlinePart1: 'INGENIEURWESEN.',
      headlinePart2: 'INTELLIGENZ.',
      headlinePart3: 'TECHNOLOGIE.',
      headlinePart4: 'WIRKUNG.',
      subtitle: 'Kraefegg M.O. integriert multidisziplinäre Ingenieurwissenschaften, Umweltintelligenz und fortschrittliche Technologie zur Lösung komplexer industrieller Herausforderungen.',
      primaryCta: 'KOMPETENZEN ERKUNDEN',
      secondaryCta: 'PROJEKTE ANSEHEN',
      replayReel: 'CINEMATIC REEL ABSPIELEN',
      videoTelemetry: 'MULTIDISZIPLINÄRE ÜBERTRAGUNG // KRAEFEGG M.O. GLOBAL OPS',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'TECHNOLOGIEABTEILUNG // SYSTEM- & KI-AGENTUR',
      subtitle: 'Entwicklung in Edge AI, missionskritischen eingebetteten Systemen, industriellem IoT, Robotik und operativer Cybersicherheit.',
      exploreCta: 'PENTAHYDRA ENTDECKEN',
    },
    founder: {
      badge: 'EXEKUTIVE FÜHRUNG & SYSTEMARCHITEKTUR',
      role: 'Gründer & Leitender Systementwickler',
      name: 'Railson Arruda',
      linkedin: 'LinkedIn-Profil',
      contactFounder: 'Gründer direkt kontaktieren',
      bio: 'Systemingenieur und Technologiearchitekt. Gründer von Kraefegg M.O., leitet die multidisziplinäre Integration von Ingenieurbauwerken, kognitiven KI-Systemen mit PentaHydra und ökologischer Intelligenz mit Oxygen Ecosystem.',
    },
    contact: {
      badge: 'OFFIZIELLE KANÄLE // KRAEFEGG DOMAIN',
      title: 'Unternehmenskontakte & Verzeichnis',
      subtitle: 'Kontaktieren Sie die Geschäftsleitung, den Gründer oder Fachabteilungen direkt über die offiziellen E-Mail-Adressen der Domäne kraefegg.com.',
      allEmailsBadge: 'ALLE 21 E-MAILS DER DOMÄNE KRAEFEGG',
      phonesBadge: 'DIREKTE TELEFONZENTRALE',
      socialsBadge: 'OFFIZIELLE NETZWERKE & CHANNELS',
      copyEmail: 'E-Mail kopieren',
      copied: 'Kopiert!',
      directLine: 'Telefonleitung',
      formTitle: 'Technisches Briefing einreichen',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Ingenieurwesen • Technologie • Umwelt • Industrielle Intelligenz',
      copyright: '© Kraefegg M.O. Multi Office. Alle Rechte vorbehalten.',
      privacy: 'Datenschutz & Datensicherheit',
      terms: 'Compliance-Richtlinien',
      cookies: 'Cookie-Richtlinien',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      about: 'Institutionnel',
      services: 'Services & Ingénierie',
      projects: 'Projets',
      showcases: 'Showcases & Lab',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Partenaires',
      news: 'Actualités & Analyses',
      careers: 'Carrières',
      contact: 'Contact',
      exploreCapabilities: 'Explorer les Capacités',
      talkToAI: 'Assistant Kraefegg IA',
      startConversation: 'Démarrer un Dialogue',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // ORGANISATION MULTIDISCIPLINAIRE',
      headlinePart1: 'INGÉNIERIE.',
      headlinePart2: 'INTELLIGENCE.',
      headlinePart3: 'TECHNOLOGIE.',
      headlinePart4: 'IMPACT.',
      subtitle: 'Kraefegg M.O. associe l’ingénierie multidisciplinaire, l’intelligence environnementale et la haute technologie pour résoudre les défis des systèmes réels complexes.',
      primaryCta: 'EXPLORER LES CAPACITÉS',
      secondaryCta: 'VOIR LES PROJETS',
      replayReel: 'LIRE LA BANDE CINÉMATIQUE',
      videoTelemetry: 'DIFFUSION MULTIDISCIPLINAIRE // KRAEFEGG M.O. OPS GLOBALES',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'DIVISION TECHNOLOGIE // AGENCE SYSTÈMES & IA',
      subtitle: 'Ingénierie avancée en Edge AI, systèmes embarqués de mission critique, IoT industriel, robotique et cybersécurité opérationnelle.',
      exploreCta: 'DÉCOUVRIR PENTAHYDRA',
    },
    founder: {
      badge: 'DIRECTION EXÉCUTIVE & CONCEPTION SYSTÈME',
      role: 'Fondateur & Développeur Système Principal',
      name: 'Railson Arruda',
      linkedin: 'Profil LinkedIn',
      contactFounder: 'Contacter le Fondateur',
      bio: 'Ingénieur systèmes et architecte technologique. Fondateur de Kraefegg M.O., il dirige l’intégration multidisciplinaire unissant grands chantiers industriels, IA de pointe avec PentaHydra et régénération écologique avec Oxygen Ecosystem.',
    },
    contact: {
      badge: 'CANAUX OFFICIELS // DOMAINE KRAEFEGG',
      title: 'Contacts & Annuaire d’Entreprise',
      subtitle: 'Communiquez directement avec la direction générale, le fondateur ou les départements spécialisés via les adresses officielles du domaine kraefegg.com.',
      allEmailsBadge: 'LES 21 ADRESSES DU DOMAINE KRAEFEGG',
      phonesBadge: 'CENTRALE TÉLÉPHONIQUE DIRECTE',
      socialsBadge: 'RÉSEAUX INSTITUTIONNELS & MESSAGERIE',
      copyEmail: 'Copier l’adresse',
      copied: 'Copié !',
      directLine: 'Ligne Téléphonique',
      formTitle: 'Transmettre le Briefing Technique',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Ingénierie • Technologie • Environnement • Intelligence Industrielle',
      copyright: '© Kraefegg M.O. Multi Office. Tous droits réservés.',
      privacy: 'Confidentialité & Protection des Données',
      terms: 'Conditions de Conformité',
      cookies: 'Politique des Cookies',
    },
  },

  ru: {
    nav: {
      home: 'Главная',
      about: 'О компании',
      services: 'Услуги и инженерия',
      projects: 'Проекты',
      showcases: 'Лаборатория',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Партнеры',
      news: 'Новости и аналитика',
      careers: 'Карьера',
      contact: 'Контакты',
      exploreCapabilities: 'Возможности',
      talkToAI: 'ИИ-ассистент Kraefegg',
      startConversation: 'Связаться с нами',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // МУЛЬТИДИСЦИПЛИНАРНАЯ ОРГАНИЗАЦИЯ',
      headlinePart1: 'ИНЖЕНЕРИЯ.',
      headlinePart2: 'ИНТЕЛЛЕКТ.',
      headlinePart3: 'ТЕХНОЛОГИИ.',
      headlinePart4: 'РЕЗУЛЬТАТ.',
      subtitle: 'Kraefegg M.O. объединяет многопрофильную инженерию, экологический интеллект и передовые технологии для решения задач сложных инфраструктурных систем.',
      primaryCta: 'ИЗУЧИТЬ ВОЗМОЖНОСТИ',
      secondaryCta: 'СМОТРЕТЬ ПРОЕКТЫ',
      replayReel: 'СМОТРЕТЬ ВИДЕО',
      videoTelemetry: 'ГЛОБАЛЬНЫЕ ОПЕРАЦИИ // KRAEFEGG M.O.',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'ТЕХНОЛОГИЧЕСКОЕ ПОДРАЗДЕЛЕНИЕ // АГЕНТСТВО СИСТЕМ И ИИ',
      subtitle: 'Периферийный ИИ (Edge AI), критически важные встроенные системы, промышленный IoT, робототехника и кибербезопасность.',
      exploreCta: 'ОТКРЫТЬ PENTAHYDRA',
    },
    founder: {
      badge: 'РУКОВОДСТВО И АРХИТЕКТУРА СИСТЕМ',
      role: 'Основатель и ведущий разработчик систем',
      name: 'Railson Arruda',
      linkedin: 'Профиль в LinkedIn',
      contactFounder: 'Прямая связь с основателем',
      bio: 'Системный инженер и архитектор технологий. Основатель Kraefegg M.O., руководит интеграцией тяжелой инженерии, когнитивных систем PentaHydra и экологического мониторинга Oxygen Ecosystem.',
    },
    contact: {
      badge: 'ОФИЦИАЛЬНЫЕ КАНАЛЫ // ДОМЕН KRAEFEGG',
      title: 'Корпоративные контакты и справочник',
      subtitle: 'Свяжитесь напрямую с руководством, основателем или профильными отделами через официальные почтовые адреса домена kraefegg.com.',
      allEmailsBadge: 'ВСЕ 21 E-MAIL АДРЕС ДОМЕНА KRAEFEGG',
      phonesBadge: 'ПРЯМАЯ ТЕЛЕФОННАЯ ЛИНИЯ',
      socialsBadge: 'СОЦИАЛЬНЫЕ СЕТИ И МЕССЕНДЖЕРЫ',
      copyEmail: 'Скопировать E-mail',
      copied: 'Скопировано!',
      directLine: 'Телефон',
      formTitle: 'Отправить техническое задание',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Инженерия • Технологии • Экология • Промышленный интеллект',
      copyright: '© Kraefegg M.O. Multi Office. Все права защищены.',
      privacy: 'Конфиденциальность и защита данных',
      terms: 'Условия комплаенса',
      cookies: 'Политика файлов cookie',
    },
  },

  nl: {
    nav: {
      home: 'Home',
      about: 'Over Ons',
      services: 'Diensten & Engineering',
      projects: 'Projecten',
      showcases: 'Showcases & Lab',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Partners',
      news: 'Nieuws & Inzichten',
      careers: 'Carrières',
      contact: 'Contact',
      exploreCapabilities: 'Capaciteiten Ontdekken',
      talkToAI: 'Kraefegg AI-Assistent',
      startConversation: 'Start een Gesprek',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // MULTIDISCIPLINAIR CONGLOMERAAT',
      headlinePart1: 'ENGINEERING.',
      headlinePart2: 'INTELLIGENTIE.',
      headlinePart3: 'TECHNOLOGIE.',
      headlinePart4: 'IMPACT.',
      subtitle: 'Kraefegg M.O. integreert multidisciplinaire engineering, ecologische intelligentie en geavanceerde technologie voor complexe fysieke systemen.',
      primaryCta: 'CAPACITEITEN VERKENNEN',
      secondaryCta: 'PROJECTEN BEKIJKEN',
      replayReel: 'SPEEL CINEMATISCHE REEL',
      videoTelemetry: 'MULTIDISCIPLINAIR BERICHT // KRAEFEGG M.O. WERELDWIJD',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'TECHNOLOGIEDIVISIE // SYSTEMEN & AI-AGENTSCHAP',
      subtitle: 'Eigen technologie in Edge AI, embedded hardware, industriële IoT, robotica en operationele cyberbeveiliging.',
      exploreCta: 'ONTDEK PENTAHYDRA',
    },
    founder: {
      badge: 'LEIDERSCHAP & SYSTEEMONTWIKKELING',
      role: 'Oprichter & Hoofdontwikkelaar Systemen',
      name: 'Railson Arruda',
      linkedin: 'LinkedIn-profiel',
      contactFounder: 'Rechtstreeks Contact met de Oprichter',
      bio: 'Systeemingenieur en technologiearchitect. Oprichter van Kraefegg M.O., leidt de integratie van zware infrastructuur, cognitieve AI via PentaHydra en ecologisch herstel via Oxygen Ecosystem.',
    },
    contact: {
      badge: 'OFFICIËLE KANALEN // KRAEFEGG DOMEIN',
      title: 'Zakelijke Contacten & Adressenlijst',
      subtitle: 'Neem rechtstreeks contact op met de directie, de oprichter of gespecialiseerde afdelingen via officiële @kraefegg.com e-mailadressen.',
      allEmailsBadge: 'ALLE 21 E-MAILS VAN HET KRAEFEGG DOMEIN',
      phonesBadge: 'DIRECTE TELEFOONCENTRALE',
      socialsBadge: 'OFFICIËLE NETWERKEN & KANALEN',
      copyEmail: 'Kopieer E-mail',
      copied: 'Gekopieerd!',
      directLine: 'Telefoonlijn',
      formTitle: 'Technisch Briefing Indienen',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Engineering • Technologie • Milieu • Industriële Intelligentie',
      copyright: '© Kraefegg M.O. Multi Office. Alle rechten voorbehouden.',
      privacy: 'Privacy & Gegevensbescherming',
      terms: 'Nalevingsvoorwaarden',
      cookies: 'Cookiebeleid',
    },
  },

  zh: {
    nav: {
      home: '首页',
      about: '机构介绍',
      services: '工程与咨询服务',
      projects: '工程案例',
      showcases: '展示与实验室',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: '合作伙伴',
      news: '新闻与洞见',
      careers: '加入我们',
      contact: '联系我们',
      exploreCapabilities: '探索核心能力',
      talkToAI: 'Kraefegg AI 助手',
      startConversation: '发起对话',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // 多学科综合工程技术机构',
      headlinePart1: '工程基石。',
      headlinePart2: '智能感知。',
      headlinePart3: '前沿科技。',
      headlinePart4: '深远影响。',
      subtitle: 'Kraefegg M.O. 深度融合多学科重型工程、环境智能与先进算法，为现实世界的复杂系统量身构建高可靠性解决方案。',
      primaryCta: '探索核心技术',
      secondaryCta: '浏览工程项目',
      replayReel: '播放全景展示片',
      videoTelemetry: '多学科实时遥测 // KRAEFEGG M.O. 全球运营',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: '前沿科技事业群 // 系统与人工智能机构',
      subtitle: '自主研发边缘计算人工智能（Edge AI）、关键任务嵌入式系统、工业级物联网及工业级网络安全系统。',
      exploreCta: '深入了解 PENTAHYDRA',
    },
    founder: {
      badge: '企业统筹与系统架构领导层',
      role: '创始人兼首席系统开发者',
      name: 'Railson Arruda',
      linkedin: '领英个人主页',
      contactFounder: '直接联系创始人',
      bio: '系统工程师与技术架构专家。Kraefegg M.O. 创始人，统筹指导重型物理工程、PentaHydra 尖端AI系统与 Oxygen 生态智能的全面融合与落地。',
    },
    contact: {
      badge: '官方指定联系渠道 // KRAEFEGG 域名邮箱',
      title: '企业联络中心与官方通讯录',
      subtitle: '通过官方 kraefegg.com 域名邮箱直接联系执行董事会、创始人或各专业工程技术部。',
      allEmailsBadge: 'KRAEFEGG 域名下全部 21 个官方专属邮箱',
      phonesBadge: '直接通讯热线',
      socialsBadge: '官方社交网络与即时通讯',
      copyEmail: '复制邮箱地址',
      copied: '已复制！',
      directLine: '专线电话',
      formTitle: '提交工程技术需求',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: '精密工程 • 前沿科技 • 生态智能 • 工业级智慧',
      copyright: '© Kraefegg M.O. Multi Office. 保留所有权利。',
      privacy: '隐私权与数据合规',
      terms: '合规准则',
      cookies: 'Cookie 政策',
    },
  },

  he: {
    nav: {
      home: 'בית',
      about: 'אודות הארגון',
      services: 'שירותים והנדסה',
      projects: 'פרויקטים',
      showcases: 'מעבדה ותצוגה',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'שותפים',
      news: 'חדשות ותובנות',
      careers: 'קריירה',
      contact: 'צור קשר',
      exploreCapabilities: 'גלה יכולות',
      talkToAI: 'עוזר בינה מלאכותית Kraefegg',
      startConversation: 'התחל שיחה',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // ארגון רב-תחומי בינלאומי',
      headlinePart1: 'הנדסה.',
      headlinePart2: 'אינטליגנציה.',
      headlinePart3: 'טכנולוגיה.',
      headlinePart4: 'השפעה.',
      subtitle: 'Kraefegg M.O. משלבת הנדסה רב-תחומית, תבונה סביבתית וטכנולוגיה מתקדמת לתכנון פתרונות אמינים עבור מערכות מורכבות בעולם האמיתי.',
      primaryCta: 'חקור יכולות',
      secondaryCta: 'צפה בפרויקטים',
      replayReel: 'הפעל סרטון תדמית',
      videoTelemetry: 'שידור רב-תחומי // KRAEFEGG M.O. פעילות גלובלית',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'חטיבת טכנולוגיה // סוכנות מערכות ובינה מלאכותית',
      subtitle: 'פיתוח מתקדם בבינה מלאכותית בקצה (Edge AI), חומרה משובצת מחשב קריטית, אינטרנט של הדברים לתעשייה ואבטחת סייבר תפעולית.',
      exploreCta: 'גלה את PENTAHYDRA',
    },
    founder: {
      badge: 'מנהיגות ניהולית ופיתוח מערכות',
      role: 'מייסד ומפתח מערכות ראשי',
      name: 'Railson Arruda',
      linkedin: 'פרופיל לינקדאין',
      contactFounder: 'פנייה ישירה למייסד',
      bio: 'מהנדס מערכות וארכיטקט טכנולוגי. מייסד Kraefegg M.O., המוביל את החזון הרב-תחומי המאחד הנדסה כבדה, בינה מלאכותית מתקדמת באמצעות PentaHydra ואינטליגנציה אקולוגית עם Oxygen Ecosystem.',
    },
    contact: {
      badge: 'ערוצים רשמיים // דומיין KRAEFEGG',
      title: 'אנשי קשר ומדריך תאגידי',
      subtitle: 'צרו קשר ישיר עם ההנהלה הבכירה, המייסד או המחלקות הייעודיות באמצעות כתובות הדוא"ל הרשמיות של הדומיין kraefegg.com.',
      allEmailsBadge: 'כל 21 כתובות הדוא"ל של דומיין KRAEFEGG',
      phonesBadge: 'מרכזיית טלפון ישירה',
      socialsBadge: 'ערוצי תקשורת ורשתות רשמיות',
      copyEmail: 'העתק כתובת',
      copied: 'הועתק!',
      directLine: 'קו טלפון ישיר',
      formTitle: 'שליחת תדריך טכני',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'הנדסה • טכנולוגיה • סביבה • אינטליגנציה תעשייתית',
      copyright: '© Kraefegg M.O. Multi Office. כל הזכויות שמורות.',
      privacy: 'פרטיות ואבטחת מידע',
      terms: 'תנאי ציות ותקינה',
      cookies: 'מדיניות קובצי Cookie',
    },
  },

  sv: {
    nav: {
      home: 'Hem',
      about: 'Om Oss',
      services: 'Tjänster & Ingenjörskonst',
      projects: 'Projekt',
      showcases: 'Showcases & Lab',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Partners',
      news: 'Nyheter & Insikter',
      careers: 'Karriär',
      contact: 'Kontakt',
      exploreCapabilities: 'Utforska Kapacitet',
      talkToAI: 'Kraefegg AI-Assistent',
      startConversation: 'Starta Dialog',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // MULTIDISCIPLINÄR ORGANISATION',
      headlinePart1: 'INGENJÖRSKONST.',
      headlinePart2: 'INTELLIGENS.',
      headlinePart3: 'TEKNOLOGI.',
      headlinePart4: 'PÅVERKAN.',
      subtitle: 'Kraefegg M.O. integrerar multidisciplinär ingenjörskonst, miljöintelligens och avancerad teknik för att lösa komplexa utmaningar i verkliga system.',
      primaryCta: 'UTFORSKA KAPACITET',
      secondaryCta: 'SE PROJEKT',
      replayReel: 'SPELA FILMREEL',
      videoTelemetry: 'MULTIDISCIPLINÄR SÄNDNING // KRAEFEGG M.O. GLOBAL DRIFT',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'TEKNIKDIVISION // SYSTEM- & AI-AGENCY',
      subtitle: 'Proprietär utveckling inom Edge AI, uppdragskritiska inbyggda system, industriell IoT, robotik och operativ cybersäkerhet.',
      exploreCta: 'UTFORSKA PENTAHYDRA',
    },
    founder: {
      badge: 'LEDARSKAP & SYSTEMARKITEKTUR',
      role: 'Grundare & Huvudsystemutvecklare',
      name: 'Railson Arruda',
      linkedin: 'LinkedIn-profil',
      contactFounder: 'Kontakta Grundaren Direkt',
      bio: 'Systemingenjör och teknisk arkitekt. Grundare av Kraefegg M.O., som leder den multidisciplinära samordningen mellan tung infrastruktur, kognitiva system via PentaHydra och miljöregenerering via Oxygen Ecosystem.',
    },
    contact: {
      badge: 'OFFICIELLA KANALER // KRAEFEGG-DOMÄN',
      title: 'Företagskontakter & Register',
      subtitle: 'Kommunicera direkt med företagsledningen, grundaren eller specialiserade avdelningar via officiella e-postadresser under domänen kraefegg.com.',
      allEmailsBadge: 'ALLA 21 E-POSTADRESSER I KRAEFEGG-DOMÄNEN',
      phonesBadge: 'DIREKT TELEFONVÄXEL',
      socialsBadge: 'OFFICIELLA NÄTVERK & KANALER',
      copyEmail: 'Kopiera E-post',
      copied: 'Kopierad!',
      directLine: 'Telefonlinje',
      formTitle: 'Skicka Tekniskt Briefing',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Ingenjörskonst • Teknologi • Miljö • Industriell Intelligens',
      copyright: '© Kraefegg M.O. Multi Office. Alla rättigheter förbehållna.',
      privacy: 'Integritet & Dataskydd',
      terms: 'Efterlevnadsvillkor',
      cookies: 'Cookie-policy',
    },
  },

  fi: {
    nav: {
      home: 'Etusivu',
      about: 'Organisaatio',
      services: 'Palvelut & Insinöörityö',
      projects: 'Projektit',
      showcases: 'Showcases & Lab',
      pentahydra: 'PentaHydra Agency Technologies & Systems',
      oxygen: 'Oxygen Ecosystem',
      partners: 'Kumppanit',
      news: 'Uutiset & Näkemykset',
      careers: 'Ura',
      contact: 'Yhteystiedot',
      exploreCapabilities: 'Tutustu Osaamiseen',
      talkToAI: 'Kraefegg AI -Avustaja',
      startConversation: 'Aloita Keskustelu',
    },
    hero: {
      badge: 'KRAEFEGG M.O. // MONIALAINEN ORGANISAATIO',
      headlinePart1: 'INSINÖÖRITYÖ.',
      headlinePart2: 'ÄLYKKYYS.',
      headlinePart3: 'TEKNOLOGIA.',
      headlinePart4: 'VAIKUTTAVUUS.',
      subtitle: 'Kraefegg M.O. yhdistää monialaisen insinööriosaamisen, ympäristöälyn ja kehittyneen teknologian suunnitellakseen ratkaisuja todellisen maailman monimutkaisiin järjestelmiin.',
      primaryCta: 'TUTUSTU OSAAMISEEN',
      secondaryCta: 'KATSO PROJEKTIT',
      replayReel: 'KATSO ESITTELYVIDEO',
      videoTelemetry: 'MONIALAINEN LÄHETYS // KRAEFEGG M.O. GLOBAALIT TOIMINNOT',
    },
    pentahydra: {
      name: 'PentaHydra',
      tagline: 'Agency Technologies & Systems',
      divisionBadge: 'TEKNOLOGIADIVISIOONA // JÄRJESTELMÄ- JA TEKOÄLYTOIMISTO',
      subtitle: 'Oma kehitystyö Edge AI:ssa, kriittisissä sulautetuissa järjestelmissä, teollisessa IoT:ssä, robotiikassa ja kyberturvallisuudessa.',
      exploreCta: 'TUTUSTU PENTAHYDRAAN',
    },
    founder: {
      badge: 'JOHTO & JÄRJESTELMÄARKKITEHTUURI',
      role: 'Perustaja & Pääjärjestelmäkehittäjä',
      name: 'Railson Arruda',
      linkedin: 'LinkedIn-profiili',
      contactFounder: 'Ota suoraan yhteyttä perustajaan',
      bio: 'Järjestelmäinsinööri ja teknologia-arkkitehti. Kraefegg M.O.:n perustaja, joka johtaa monialaista kokonaisuutta yhdistäen vaativan fyysisen insinöörityön, kognitiiviset AI-järjestelmät PentaHydran kautta ja ekologisen ennallistamisen Oxygen Ecosystemin avulla.',
    },
    contact: {
      badge: 'VIRALLISET KANAVAT // KRAEFEGG-VERKKOTUNNUS',
      title: 'Yrityksen Yhteystiedot & Hakemisto',
      subtitle: 'Ota suoraan yhteyttä johtoon, perustajaan tai erikoisosastoihin virallisten kraefegg.com-sähköpostiosoitteiden kautta.',
      allEmailsBadge: 'KAIKKI 21 KRAEFEGG-VERKKOTUNNUKSEN SÄHKÖPOSTIA',
      phonesBadge: 'SUORA PUHELINKESKUS',
      socialsBadge: 'VIRALLISET VERKOSTOT & VIESTINTÄ',
      copyEmail: 'Kopioi Sähköposti',
      copied: 'Kopioitu!',
      directLine: 'Puhelinlinja',
      formTitle: 'Lähetä Tekninen Briefing',
    },
    footer: {
      tagline: 'Engineering. Intelligence. Technology. Impact.',
      substatement: 'Insinöörityö • Teknologia • Ympäristö • Teollinen Älykkyys',
      copyright: '© Kraefegg M.O. Multi Office. Kaikki oikeudet pidätetään.',
      privacy: 'Tietosuoja ja Tietoturva',
      terms: 'Vaatimustenmukaisuuden Ehdot',
      cookies: 'Evästekäytäntö',
    },
  },
};

export const getTranslation = (lang: Language): TranslationSchema => {
  return translations[lang] || translations.en;
};
