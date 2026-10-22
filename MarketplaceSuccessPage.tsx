import React, { useState } from 'react';
import { NavRoute, Language } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { 
  CheckCircle2, Copy, Check, ArrowRight, Printer, MessageSquare, 
  ShieldCheck, Sun, Wrench, Mail, Calendar, FileText
} from 'lucide-react';

interface MarketplaceSuccessPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const MarketplaceSuccessPage: React.FC<MarketplaceSuccessPageProps> = ({ onNavigate, lang }) => {
  const { lastSubmittedRequest, showToast } = useMarketplace();
  const [copied, setCopied] = useState(false);

  const protocol = lastSubmittedRequest?.protocol || `ORD-KLG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateFormatted = lastSubmittedRequest?.submittedAtFormatted || new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const handleCopyProtocol = () => {
    navigator.clipboard.writeText(protocol);
    setCopied(true);
    showToast('Protocolo copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#071324] via-slate-900 to-[#060912] border-2 border-emerald-500/40 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase">
              {lang === 'pt' ? 'SOLICITAÇÃO REGISTRADA COM SUCESSO' : 'QUOTE REQUEST SUCCESSFULLY REGISTERED'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">
              {lang === 'pt' ? 'Ordem de Cotação Encaminhada' : 'Quote Request Forwarded'}
            </h1>
            <p className="text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
              {lang === 'pt'
                ? 'Sua solicitação técnica foi compilada e encaminhada para nossa diretoria de engenharia e para a área de homologação da Aldo Solar.'
                : 'Your technical quote request has been compiled and forwarded to our engineering board and Aldo Solar logistics.'}
            </p>
          </div>

          {/* Protocol Display Box */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 max-w-md mx-auto space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              {lang === 'pt' ? 'PROTOCOLO OFICIAL DE RASTREABILIDADE' : 'OFFICIAL TRACKING PROTOCOL'}
            </span>
            <div className="text-2xl font-mono font-black text-cyan-300 tracking-wider">
              {protocol}
            </div>
            <div className="pt-2 flex items-center justify-center gap-3 text-xs font-mono text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{dateFormatted}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleCopyProtocol}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'pt' ? 'Protocolo Copiado!' : 'Protocol Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>{lang === 'pt' ? 'Copiar Protocolo' : 'Copy Protocol'}</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span>{lang === 'pt' ? 'Imprimir Comprovante' : 'Print Receipt'}</span>
            </button>
          </div>
        </div>

        {/* Request Summary Data (if present) */}
        {lastSubmittedRequest && (
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-sm font-heading font-bold text-white uppercase font-mono tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
              {lang === 'pt' ? 'Resumo da Solicitação' : 'Request Summary'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block">Solicitante:</span>
                <span className="text-white font-bold">{lastSubmittedRequest.name}</span>
                {lastSubmittedRequest.company && (
                  <span className="text-slate-400 block">{lastSubmittedRequest.company}</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block">E-mail:</span>
                <span className="text-white font-bold">{lastSubmittedRequest.email}</span>
                {lastSubmittedRequest.phone && (
                  <span className="text-slate-400 block">{lastSubmittedRequest.phone}</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block">Localidade:</span>
                <span className="text-white font-bold">{lastSubmittedRequest.city || 'São Paulo'} - {lastSubmittedRequest.state || 'SP'}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block">Destinatário Oficial:</span>
                <span className="text-cyan-300 font-bold">{lastSubmittedRequest.recipientEmail}</span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps SLA Timeline */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-sm font-heading font-bold text-white uppercase font-mono tracking-wider text-cyan-400">
            {lang === 'pt' ? 'Próximos Passos & Prazos (SLA)' : 'Next Steps & SLA'}
          </h3>

          <div className="space-y-3 text-xs font-sans text-slate-300">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <div className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-mono font-bold shrink-0 text-[11px]">
                1
              </div>
              <div className="space-y-0.5">
                <strong className="text-white block font-mono">Triagem & Dimensionamento de Engenharia</strong>
                <p className="text-slate-400">
                  Nossos engenheiros elétricos analisam a viabilidade do ponto de conexão e a curva de geração solar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <div className="w-6 h-6 rounded-full bg-amber-950 text-amber-400 border border-amber-500/40 flex items-center justify-center font-mono font-bold shrink-0 text-[11px]">
                2
              </div>
              <div className="space-y-0.5">
                <strong className="text-white block font-mono">Reserva Logística Aldo Solar</strong>
                <p className="text-slate-400">
                  Verificação de disponibilidade dos inversores e módulos bifaciais em centro de distribuição.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60">
              <div className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono font-bold shrink-0 text-[11px]">
                3
              </div>
              <div className="space-y-0.5">
                <strong className="text-white block font-mono">Envio da Proposta Comercial Formal</strong>
                <p className="text-slate-400">
                  Em até 24 a 48 horas úteis, você receberá a proposta formal por e-mail com minuta de ART inclusa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Return CTA */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('/marketplace')}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 transition-all"
          >
            <span>{lang === 'pt' ? 'Voltar ao Marketplace' : 'Back to Marketplace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
