import React, { useState } from 'react';
import { X, Users, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

interface TalentNetworkModalProps {
  lang: Language;
  onClose: () => void;
  onOpenPrivacyPolicy: () => void;
}

const TALENT_AREAS = [
  'Artificial Intelligence & Autonomous Agents',
  'Generative AI & Prompt Engineering',
  'Data Engineering & Graph Databases',
  'Cybersecurity & OT Industrial Security',
  'Embedded Systems & Firmware (C/Rust)',
  'Edge AI & Computer Vision (NVIDIA Jetson)',
  'Environmental Engineering & PRAD',
  'Civil & Structural Engineering',
  'Renewable Energy & Solar Plants',
  'Mining Geotechnics & Dam Safety',
  'GeoAI & Satellite Remote Sensing',
  'Maritime & Seaport Systems (MARPOL)',
  'ESG, Carbon Accounting & Compliance',
  'Environmental Forensics & Auditing',
  'Project Management & PMO'
];

export const TalentNetworkModal: React.FC<TalentNetworkModalProps> = ({
  lang,
  onClose,
  onOpenPrivacyPolicy
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [preferRemote, setPreferRemote] = useState(true);
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !linkedinUrl.trim()) {
      setError(lang === 'pt' ? 'Preencha Nome, E-mail e LinkedIn.' : 'Fill Name, Email, and LinkedIn.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError(lang === 'pt' ? 'Endereço de e-mail inválido.' : 'Invalid email address.');
      return;
    }

    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w\-_%]+\/?.*$/i;
    if (!linkedinRegex.test(linkedinUrl.trim())) {
      setError(
        lang === 'pt'
          ? 'URL do LinkedIn inválida (https://www.linkedin.com/in/...)'
          : 'Invalid LinkedIn URL (https://www.linkedin.com/in/...)'
      );
      return;
    }

    if (!consent) {
      setError(
        lang === 'pt'
          ? 'O consentimento para registro na Rede de Talentos é obrigatório.'
          : 'Consent to Talent Network registration is required.'
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const finalNotes = preferRemote
        ? `[Preferência de Atuação: 100% Remoto - Home Office] ${notes}`.trim()
        : notes.trim();

      const res = await fetch('/api/careers/talent-pool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          linkedinUrl,
          areasOfInterest: selectedAreas.length > 0 ? selectedAreas : ['General Engineering'],
          notes: finalNotes,
          consent
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed joining talent pool');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Error joining talent network.');
    } finally {
      setLoading(false);
    }
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

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-700 flex items-center justify-center mx-auto text-cyan-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white">
              {lang === 'pt' ? 'Conexão Realizada com Sucesso!' : 'Successfully Connected!'}
            </h3>
            <p className="text-sm font-sans text-slate-300 max-w-md mx-auto leading-relaxed">
              {lang === 'pt'
                ? 'Seu perfil foi adicionado à Rede Global de Talentos da Kraefegg M.O. e PentaHydra Systems. Entraremos em contato assim que novas oportunidades compatíveis com seu histórico forem abertas.'
                : 'Your profile has been added to the Kraefegg M.O. & PentaHydra Systems Global Talent Network. We will reach out when matching opportunities arise.'}
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase font-mono cursor-pointer"
              >
                {lang === 'pt' ? 'Concluir' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>{lang === 'pt' ? 'REDE GLOBAL DE TALENTOS' : 'GLOBAL TALENT NETWORK'}</span>
              </div>
              <h2 className="text-2xl font-heading font-bold text-white">
                {lang === 'pt' ? 'Conecte-se com o Futuro da Engenharia' : 'Connect with the Future of Engineering'}
              </h2>
              <p className="text-xs font-mono text-slate-400">
                {lang === 'pt'
                  ? 'Não encontrou a posição exata no momento? Deixe seu perfil no radar da nossa diretoria técnica.'
                  : 'Didn’t find the exact opening right now? Keep your profile on our technical leadership’s radar.'}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">
                {lang === 'pt' ? 'Nome Completo *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ex: Dra. Juliana Menezes"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {lang === 'pt' ? 'E-mail *' : 'Email *'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juliana@exemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">
                  {lang === 'pt' ? 'LinkedIn Profile URL *' : 'LinkedIn Profile URL *'}
                </label>
                <input
                  type="url"
                  required
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-mono text-slate-300 block">
                {lang === 'pt' ? 'Áreas de Interesse Técnico (Selecione uma ou mais)' : 'Technical Areas of Interest (Select one or more)'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                {TALENT_AREAS.map((area, i) => {
                  const isChecked = selectedAreas.includes(area);
                  return (
                    <label
                      key={i}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs font-mono cursor-pointer border transition-colors ${
                        isChecked
                          ? 'bg-cyan-950/50 border-cyan-700 text-cyan-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleArea(area)}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span className="truncate">{area}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Notes / Experience */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-400">
                {lang === 'pt' ? 'Breve Resumo Profissional ou Link de Portfólio (Opcional)' : 'Brief Background / Portfolio Links (Optional)'}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  lang === 'pt'
                    ? 'Destaques técnicos, links de GitHub, publicações ou teses...'
                    : 'Technical highlights, GitHub links, publications or thesis...'
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Remote / Home Office Preference */}
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/50">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferRemote}
                  onChange={(e) => setPreferRemote(e.target.checked)}
                  className="rounded border-emerald-700 text-emerald-500 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-mono font-semibold text-emerald-300">
                  🏠 {lang === 'pt' ? 'Priorizar oportunidades e convites 100% Remotos / Home Office' : 'Prioritize 100% Remote / Home Office opportunities'}
                </span>
              </label>
            </div>

            {/* Consent Checkbox */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs font-sans text-slate-300">
                  {lang === 'pt' ? (
                    <>
                      Autorizo o armazenamento dos meus dados na Rede de Talentos da Kraefegg M.O. / PentaHydra Systems por até 730 dias, conforme a{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyPolicy}
                        className="text-cyan-400 underline hover:text-cyan-300"
                      >
                        Política de Privacidade
                      </button>
                      .
                    </>
                  ) : (
                    <>
                      I authorize Kraefegg M.O. / PentaHydra Systems to retain my profile in the Talent Network for up to 730 days under the{' '}
                      <button
                        type="button"
                        onClick={onOpenPrivacyPolicy}
                        className="text-cyan-400 underline hover:text-cyan-300"
                      >
                        Privacy Policy
                      </button>
                      .
                    </>
                  )}
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800"
              >
                {lang === 'pt' ? 'Cancelar' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-500 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? (lang === 'pt' ? 'Gravando...' : 'Saving...') : (lang === 'pt' ? 'Ingressar na Rede' : 'Join Talent Network')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
