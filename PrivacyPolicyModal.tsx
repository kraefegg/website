import React, { useState } from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Language } from '../../types';

interface PrivacyPolicyModalProps {
  lang: Language;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  lang,
  onClose
}) => {
  const [requestEmail, setRequestEmail] = useState('');
  const [requestType, setRequestType] = useState<'ACCESS' | 'RECTIFY' | 'DELETE'>('ACCESS');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDataSubjectRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestEmail.trim()) return;

    setLoading(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/careers/privacy/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: requestEmail.trim(),
          requestType
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg(
          lang === 'pt'
            ? `Solicitação (${requestType}) registrada com sucesso para ${requestEmail}. O comitê de privacidade responderá formalmente.`
            : `Request (${requestType}) registered for ${requestEmail}. Our data privacy officer will respond accordingly.`
        );
      }
    } catch (err: any) {
      setStatusMsg('Error processing request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-[#070A12] p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'pt' ? 'GOVERNANÇA & PRIVACIDADE DE DADOS' : 'DATA GOVERNANCE & PRIVACY'}</span>
          </div>
          <h2 className="text-2xl font-heading font-bold text-white">
            {lang === 'pt' ? 'Aviso de Privacidade para Candidatos (LGPD / Global)' : 'Recruitment Privacy Notice (LGPD / Global)'}
          </h2>
          <p className="text-xs font-mono text-slate-400">
            KRAEFEGG M.O. &bull; PENTAHYDRA SYSTEMS &bull; Versão 2.4 (2026)
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-4 text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-mono font-bold text-cyan-300 uppercase text-xs">
              1. Finalidade Exclusiva do Tratamento
            </h4>
            <p>
              Os dados coletados (nome completo, e-mail corporativo/pessoal, URL do perfil LinkedIn, telefone, localização e resultados das avaliações técnicas de 6 questões) são tratados <strong>exclusivamente</strong> para processos de recrutamento, seleção, verificação de aderência técnica e conexão de talentos com vagas da Kraefegg M.O. e PentaHydra Systems.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-mono font-bold text-cyan-300 uppercase text-xs">
              2. Prazo de Retenção de Dados (730 Dias)
            </h4>
            <p>
              Em conformidade com as melhores práticas institucionais e regulatórias, os registros de candidatura e tentativas de avaliação são mantidos pelo prazo padrão de <strong>730 dias (2 anos)</strong> a partir do último consentimento ou submissão. Após esse período, os dados são automaticamente expurgados ou anonimizados para estatísticas agregadas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-mono font-bold text-cyan-300 uppercase text-xs">
              3. Decisão Humana e Avaliação Não-Discriminatória
            </h4>
            <p>
              Nossa organização rejeita terminantemente decisões de eliminação automatizada sem supervisão técnica qualificada. Os testes objetivos servem como subsídio padronizado para mitigar vieses inconscientes, sendo analisados em conjunto com portfólios, registros em órgãos profissionais (CREA/CRQ) e entrevistas técnicas conduzidas por engenheiros.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h4 className="font-mono font-bold text-cyan-300 uppercase text-xs">
              4. Segurança da Informação & Sigilo
            </h4>
            <p>
              Todos os dados trafegam por canais criptografados em trânsito (TLS 1.3) e repousam em servidores seguros. O acesso às informações é restrito a recrutadores autorizados e à diretoria técnica responsável pelas áreas demandantes.
            </p>
          </div>
        </div>

        {/* Interactive Data Subject Rights Request */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase font-bold">
            <Lock className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Exercício de Direitos do Titular (LGPD Art. 18)' : 'Data Subject Rights (LGPD / GDPR)'}</span>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            {lang === 'pt'
              ? 'Você tem o direito de solicitar a confirmação de existência, acesso, retificação ou exclusão permanente dos seus dados de candidatura a qualquer momento.'
              : 'You have the right to request access, rectification, or permanent deletion of your application records at any time.'}
          </p>

          <form onSubmit={handleDataSubjectRequest} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="email"
                  required
                  value={requestEmail}
                  onChange={(e) => setRequestEmail(e.target.value)}
                  placeholder={lang === 'pt' ? 'Seu e-mail cadastrado...' : 'Your registered email...'}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <select
                  value={requestType}
                  onChange={(e: any) => setRequestType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="ACCESS">{lang === 'pt' ? 'Acessar Dados' : 'Access Data'}</option>
                  <option value="RECTIFY">{lang === 'pt' ? 'Retificar Dados' : 'Rectify Data'}</option>
                  <option value="DELETE">{lang === 'pt' ? 'Excluir Registros' : 'Delete Records'}</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer border border-slate-700"
              >
                {loading ? 'Enviando...' : (lang === 'pt' ? 'Registrar Solicitação Formal' : 'Submit Formal Request')}
              </button>
            </div>

            {statusMsg && (
              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                {statusMsg}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs uppercase font-mono cursor-pointer"
          >
            {lang === 'pt' ? 'Entendido' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
