import React, { useState, useEffect } from 'react';
import { NavRoute, Language } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { KraefeggAIAssistant } from './components/common/KraefeggAIAssistant';
import { QualityNavigation } from './components/common/QualityNavigation';
import { TrafficCampaignAgent } from './components/common/TrafficCampaignAgent';
import { CampaignWelcomeBanner } from './components/common/CampaignWelcomeBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ShowcasesPage } from './pages/ShowcasesPage';
import { PentahydraPage } from './pages/PentahydraPage';
import { OxygenPage } from './pages/OxygenPage';
import { PartnersPage } from './pages/PartnersPage';
import { NewsPage } from './pages/NewsPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { TrustPage } from './pages/TrustPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { CorporateGovernancePage } from './pages/CorporateGovernancePage';
import { ResponsibleBusinessPage } from './pages/ResponsibleBusinessPage';
import { ResearchPage } from './pages/ResearchPage';
import { LegalPage } from './pages/LegalPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Marketplace Kraefegg M.O. Ecosystem
import { MarketplaceProvider } from './context/MarketplaceContext';
import { MarketplaceHubPage } from './pages/marketplace/MarketplaceHubPage';
import { MarketplaceServicesPage } from './pages/marketplace/MarketplaceServicesPage';
import { MarketplaceServiceDetailPage } from './pages/marketplace/MarketplaceServiceDetailPage';
import { MarketplaceProductsPage } from './pages/marketplace/MarketplaceProductsPage';
import { MarketplaceProductDetailPage } from './pages/marketplace/MarketplaceProductDetailPage';
import { MarketplaceCartPage } from './pages/marketplace/MarketplaceCartPage';
import { MarketplaceRequestPage } from './pages/marketplace/MarketplaceRequestPage';
import { MarketplaceSuccessPage } from './pages/marketplace/MarketplaceSuccessPage';

function MainApp() {
  const [currentRoute, setCurrentRoute] = useState<NavRoute>('/');
  const [lang, setLang] = useState<Language>('pt');
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [isA11yOpen, setIsA11yOpen] = useState<boolean>(false);
  const [isTrafficAgentOpen, setIsTrafficAgentOpen] = useState<boolean>(false);

  // Sync hash routing supporting deep routes and UTM query params
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '');
      const path = rawHash.split('?')[0] || '/';
      const normalized = path.startsWith('/') ? path : '/' + path;
      if (normalized === '/admin/careers' || normalized.startsWith('/admin/careers')) {
        setCurrentRoute('/careers');
      } else if (normalized.startsWith('/')) {
        setCurrentRoute(normalized as NavRoute);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (route: NavRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === '/' ? '' : route;
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  const handleSelectLanguage = (newLang: Language) => {
    setLang(newLang);
    document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const renderActivePage = () => {
    // Marketplace Routes
    if (currentRoute === '/marketplace') {
      return <MarketplaceHubPage onNavigate={handleNavigate} lang={lang} />;
    }
    if (currentRoute === '/marketplace/servicos') {
      return <MarketplaceServicesPage onNavigate={handleNavigate} lang={lang} />;
    }
    if (currentRoute.startsWith('/marketplace/servicos/')) {
      const serviceId = currentRoute.replace('/marketplace/servicos/', '');
      return <MarketplaceServiceDetailPage onNavigate={handleNavigate} lang={lang} serviceId={serviceId} />;
    }
    if (currentRoute === '/marketplace/equipamentos' || currentRoute === '/marketplace/produtos') {
      return <MarketplaceProductsPage onNavigate={handleNavigate} lang={lang} />;
    }
    if (currentRoute.startsWith('/marketplace/produtos/') || currentRoute.startsWith('/marketplace/equipamentos/')) {
      const productId = currentRoute.replace('/marketplace/produtos/', '').replace('/marketplace/equipamentos/', '');
      return <MarketplaceProductDetailPage onNavigate={handleNavigate} lang={lang} productId={productId} />;
    }
    if (currentRoute === '/marketplace/cart') {
      return <MarketplaceCartPage onNavigate={handleNavigate} lang={lang} />;
    }
    if (currentRoute === '/marketplace/request') {
      return <MarketplaceRequestPage onNavigate={handleNavigate} lang={lang} />;
    }
    if (currentRoute === '/marketplace/success') {
      return <MarketplaceSuccessPage onNavigate={handleNavigate} lang={lang} />;
    }

    if (currentRoute.startsWith('/trust')) {
      const sub = currentRoute.replace('/trust/', '').replace('/trust', '') || 'overview';
      return <TrustPage onNavigate={handleNavigate} lang={lang} subSection={sub} />;
    }

    if (currentRoute === '/policies' || currentRoute === '/policies/document-control') {
      return <PoliciesPage onNavigate={handleNavigate} lang={lang} />;
    }

    if (currentRoute === '/governance') {
      return <CorporateGovernancePage onNavigate={handleNavigate} lang={lang} section="governance" />;
    }
    if (currentRoute === '/vision-mission') {
      return <CorporateGovernancePage onNavigate={handleNavigate} lang={lang} section="vision-mission" />;
    }
    if (currentRoute === '/leadership') {
      return <CorporateGovernancePage onNavigate={handleNavigate} lang={lang} section="leadership" />;
    }
    if (currentRoute === '/corporate-structure') {
      return <CorporateGovernancePage onNavigate={handleNavigate} lang={lang} section="corporate-structure" />;
    }
    if (currentRoute === '/network') {
      return <CorporateGovernancePage onNavigate={handleNavigate} lang={lang} section="network" />;
    }

    if (currentRoute === '/responsible-business') {
      return <ResponsibleBusinessPage onNavigate={handleNavigate} lang={lang} />;
    }

    if (currentRoute === '/research') {
      return <ResearchPage onNavigate={handleNavigate} lang={lang} />;
    }

    if (currentRoute.startsWith('/legal/') || currentRoute === '/security') {
      const sub = (currentRoute.replace('/legal/', '').replace('/', '') || 'privacy') as any;
      return <LegalPage onNavigate={handleNavigate} lang={lang} section={sub} />;
    }

    if (currentRoute.startsWith('/services')) {
      const cat = currentRoute.replace('/services/', '').replace('/services', '') || 'all';
      return <ServicesPage onNavigate={handleNavigate} lang={lang} initialCategory={cat} />;
    }

    if (currentRoute.startsWith('/pentahydra')) {
      return <PentahydraPage onNavigate={handleNavigate} lang={lang} />;
    }

    if (currentRoute.startsWith('/oxygen')) {
      return <OxygenPage onNavigate={handleNavigate} lang={lang} />;
    }

    if (currentRoute.startsWith('/projects')) {
      return <ProjectsPage onNavigate={handleNavigate} lang={lang} />;
    }

    if (currentRoute.startsWith('/showcases')) {
      return <ShowcasesPage onNavigate={handleNavigate} lang={lang} />;
    }

    switch (currentRoute) {
      case '/':
        return (
          <HomePage
            onNavigate={handleNavigate}
            lang={lang}
            onOpenAI={() => setIsAIOpen(true)}
          />
        );
      case '/about':
        return <AboutPage onNavigate={handleNavigate} lang={lang} />;
      case '/partners':
        return <PartnersPage onNavigate={handleNavigate} lang={lang} />;
      case '/news':
        return <NewsPage onNavigate={handleNavigate} lang={lang} />;
      case '/careers':
        return <CareersPage onNavigate={handleNavigate} lang={lang} />;
      case '/contact':
        return <ContactPage onNavigate={handleNavigate} lang={lang} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            lang={lang}
            onOpenAI={() => setIsAIOpen(true)}
          />
        );
    }
  };

  return (
    <div 
      dir={lang === 'he' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 relative"
    >
      {/* Accessible Skip to Content Link (Keyboard Navigation) */}
      <a href="#main-content" className="a11y-skip-link">
        {lang === 'pt' ? 'Pular para o conteúdo principal' : 'Skip to main content'}
      </a>

      {/* Campaign Inbound Welcome Banner (When visitor lands via UTM) */}
      <CampaignWelcomeBanner
        lang={lang}
        onNavigate={handleNavigate}
      />

      {/* Institutional Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={toggleLanguage}
        onSelectLang={handleSelectLanguage}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenA11y={() => setIsA11yOpen(true)}
        onOpenTrafficAgent={() => setIsTrafficAgentOpen(true)}
      />

      {/* Main Page Body */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <ErrorBoundary key={currentRoute}>
          {renderActivePage()}
        </ErrorBoundary>
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} lang={lang} />

      {/* Kraefegg Intelligence Assistant Modal */}
      <KraefeggAIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        lang={lang}
      />

      {/* Quality Navigation & Accessibility Assistant */}
      <QualityNavigation
        lang={lang}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isOpen={isA11yOpen}
        onToggle={() => setIsA11yOpen(!isA11yOpen)}
      />

      {/* Autonomous Paid Traffic & Ad Growth Agent */}
      <TrafficCampaignAgent
        lang={lang}
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isOpen={isTrafficAgentOpen}
        onToggle={() => setIsTrafficAgentOpen(!isTrafficAgentOpen)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MarketplaceProvider>
        <MainApp />
      </MarketplaceProvider>
    </ErrorBoundary>
  );
}
