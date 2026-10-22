import React, { useState, useEffect } from 'react';
import { Megaphone, ArrowRight, X, Sparkles, ShieldCheck } from 'lucide-react';
import { NavRoute, Language } from '../../types';

interface CampaignWelcomeBannerProps {
  lang: Language;
  onNavigate: (route: NavRoute) => void;
}

export const CampaignWelcomeBanner: React.FC<CampaignWelcomeBannerProps> = ({
  lang,
  onNavigate,
}) => {
  const [campaignInfo, setCampaignInfo] = useState<{
    source: string;
    campaign: string;
    target: string;
  } | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check URL search or hash for UTMs
    const checkUTM = () => {
      const fullUrl = window.location.href;
      const urlParams = new URLSearchParams(window.location.search);
      let source = urlParams.get('utm_source');
      let campaign = urlParams.get('utm_campaign');

      // Check inside hash as well (e.g. #/services/mining?utm_source=linkedin)
      if (!source && fullUrl.includes('utm_source=')) {
        const hashQuery = fullUrl.split('?')[1];
        if (hashQuery) {
          const hashParams = new URLSearchParams(hashQuery);
          source = hashParams.get('utm_source');
          campaign = hashParams.get('utm_campaign');
        }
      }

      if (source) {
        setCampaignInfo({
          source: source.toUpperCase(),
          campaign: campaign ? campaign.replace(/_/g, ' ') : 'CAMPANHA INSTITUCIONAL',
          target: window.location.hash.split('?')[0].replace('#', '') || '/',
        });
      }
    };

    checkUTM();
    window.addEventListener('hashchange', checkUTM);
    return () => window.removeEventListener('hashchange', checkUTM);
  }, []);

  if (!campaignInfo || dismissed) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-b border-cyan-500/50 py-2.5 px-4 text-xs font-mono shadow-lg animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-slate-200">
          <span className="p-1 rounded bg-cyan-500/20 text-cyan-400 shrink-0">
            <Megaphone className="w-3.5 h-3.5" />
          </span>
          <span className="text-cyan-300 font-bold">
            [{campaignInfo.source}]
          </span>
          <span className="text-slate-300">
            {lang === 'pt'
              ? `Você acessou através da campanha "${campaignInfo.campaign}". Atendimento técnico prioritário ativado.`
              : `Welcome via campaign "${campaignInfo.campaign}". Priority engineering briefing enabled.`}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('/contact')}
            className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{lang === 'pt' ? 'Solicitar Proposta Prioritária' : 'Request Priority RFP'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
