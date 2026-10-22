import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, AlertCircle, Clock, CheckCircle2, Terminal } from 'lucide-react';
import { Job, Candidate } from '../../types/careers';
import { Language } from '../../types';

interface ApplyWizardProps {
  job: Job;
  lang: Language;
  onClose: () => void;
  onStartAssessment: (applicationId: string, candidateData: any) => void;
  onOpenPrivacyPolicy: () => void;
}

export const ApplyWizard: React.FC<ApplyWizardProps> = ({
  job,
  lang,
  onClose,
  onStartAssessment,
  onOpenPrivacyPolicy
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retakeLocked, setRetakeLocked] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      setError(lang === 'pt' ? 'Por favor, informe seu Nome Completo.' : 'Please provide your Full Name.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError(lang === 'pt' ? 'Por favor, informe um endereço de e-mail válido.' : 'Please enter a valid email address.');
      return false;
    }
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w\-_%]+\/?.*$/i;
    if (!linkedinRegex.test(linkedinUrl.trim())) {
      setError(
        lang === 'pt'
          ? 'URL do LinkedIn inválida. Utilize o formato: https://www.linkedin.com/in/seu-perfil'
          : 'Invalid LinkedIn URL. Please use format: https://www.linkedin.com/in/your-profile'
      );
      return false;
    }
    if (!consent) {
      setError(
        lang === 'pt'
          ? 'O consentimento para tratamento de dados de candidatura é obrigatório.'
          : 'Consent to data processing is required.'
      );
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: job.id,
          fullName,
          email,
          linkedinUrl,
          phone,
          city,
          country,
          consent
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application');
      }

      if (data.retakeLocked) {
        setRetakeLocked(true);
        setRemainingSeconds(data.remainingSeconds);
        setLoading(false);
        return;
      }

      onStartAssessment(data.applicationId, {
        fullName,
        email,
        linkedinUrl,
        phone,
        city,
        country
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#070A12] p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 border border-cyan-800 uppercase">
              {job.division}
            </span>
            {job.work_mode === 'REMOTE' ? (
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-700">
                🏠 {lang === 'pt' ? '100% Remoto - Home Office' : '100% Remote - Home Office'}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-slate-900 border border-slate-700">
                {job.work_mode}
              </span>
            )}
            <span className="text-xs font-mono text-slate-400">
              {lang === 'pt' ? 'Etapa 1 de 2: Dados do Candidato' : 'Step 1 of 2: Candidate Profile'}
            </span>
          </div>

          <h2 className="text-2xl font-heading font-bold text-white">
            {lang === 'pt' ? 'Candidatura:' : 'Application:'} {lang === 'pt' ? job.title : job.titleEn}
          </h2>
          <p className="text-xs font-mono text-slate-400">
            {lang === 'pt'
              ? 'Preencha seus dados para iniciar o assessment técnico de 6 questões.'
              : 'Complete your profile to unlock the 6-question technical assessment.'}
          </p>
        </div>

        {/* Retake Locked Warning */}
        {retakeLocked ? (
          <div className="p-6 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-heading font-bold text-amber-300">
                  {lang === 'pt' ? 'Janela de Espera de 24 Horas Ativa' : '24-Hour Retake Window Active'}
                </h4>
                <p className="text-xs font-sans text-slate-300 mt-1 leading-relaxed">
                  {lang === 'pt'
                    ? 'Identificamos que você realizou esta avaliação técnica recentemente. Para assegurar a integridade do processo seletivo, uma nova tentativa fica disponível 24 horas após a anterior.'
                    : 'We detected a recent technical evaluation attempt. To ensure assessment integrity, a retake becomes available 24 hours after the previous attempt.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center">
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                {lang === 'pt' ? 'Tempo restante para desbloqueio' : 'Time remaining until unlock'}
              </div>
              <div className="text-2xl font-mono font-black text-amber-400 mt-1">
                {formatTime(remainingSeconds)}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs cursor-pointer"
              >
                {lang === 'pt' ? 'Entendido / Fechar' : 'Understood / Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>{lang === 'pt' ? 'Nome Completo *' : 'Full Name *'}</span>
                <span className="text-[10px] text-slate-500">{lang === 'pt' ? 'Obrigatório' : 'Required'}</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ex: Dr. Lucas Silveira"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>{lang === 'pt' ? 'E-mail Corporativo ou Pessoal *' : 'Email Address *'}</span>
                <span className="text-[10px] text-slate-500">{lang === 'pt' ? 'Obrigatório' : 'Required'}</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* LinkedIn Profile URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>{lang === 'pt' ? 'URL do Perfil do LinkedIn *' : 'LinkedIn Profile URL *'}</span>
                <span className="text-[10px] text-cyan-400">https://linkedin.com/in/...</span>
              </label>
              <input
                type="url"
                required
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/seu-perfil"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Phone & City (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">
                  {lang === 'pt' ? 'Telefone / WhatsApp (Opcional)' : 'Phone (Optional)'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+55 (11) 99999-9999"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">
                  {lang === 'pt' ? 'Cidade & Estado (Opcional)' : 'City & State (Optional)'}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="ex: Belo Horizonte, MG"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Consent & Privacy Notice */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer w-4 h-4"
                />
                <span className="text-xs font-sans text-slate-300 leading-relaxed">
                  {lang === 'pt' ? (
                    <>
                      Autorizo o processamento dos meus dados para fins de recrutamento técnico pela <strong>KRAEFEGG M.O.</strong> e <strong>PENTAHYDRA SYSTEMS</strong>, com retenção por até 730 dias conforme a{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyPolicy}
                        className="text-cyan-400 underline hover:text-cyan-300"
                      >
                        Política de Privacidade & LGPD
                      </button>
                      .
                    </>
                  ) : (
                    <>
                      I authorize data processing for technical recruitment by <strong>KRAEFEGG M.O.</strong> and <strong>PENTAHYDRA SYSTEMS</strong>, retained up to 730 days under the{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyPolicy}
                        className="text-cyan-400 underline hover:text-cyan-300"
                      >
                        Privacy Policy & LGPD
                      </button>
                      .
                    </>
                  )}
                </span>
              </label>
            </div>

            {/* Assessment Warning Notice */}
            <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs font-mono text-cyan-300 flex items-center gap-2.5">
              <Terminal className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'pt'
                  ? 'A próxima etapa contém 6 questões técnicas objetivas (perfil ' + job.assessment_profile + '). O score será avaliado pelo servidor.'
                  : 'The next step contains 6 technical objective questions (profile ' + job.assessment_profile + '). The score is evaluated by the server.'}
              </span>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                {lang === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-500 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <span>{loading ? (lang === 'pt' ? 'Processando...' : 'Processing...') : (lang === 'pt' ? 'Iniciar Avaliação Técnica (6Q)' : 'Start Technical Assessment (6Q)')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
