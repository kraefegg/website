import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, AlertCircle, Clock, Users, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { Language } from '../../types';

interface AssessmentResultViewProps {
  score: number;
  correctCount: number;
  totalQuestions: number;
  passedThreshold: boolean;
  nextAttemptAt: string | null;
  message: string;
  applicationStatus: string;
  lang: Language;
  onClose: () => void;
  onJoinTalentNetwork: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  score,
  correctCount,
  totalQuestions,
  passedThreshold,
  nextAttemptAt,
  message,
  applicationStatus,
  lang,
  onClose,
  onJoinTalentNetwork
}) => {
  const [remainingSecs, setRemainingSecs] = useState<number>(() => {
    if (!nextAttemptAt) return 0;
    const diff = Math.ceil((new Date(nextAttemptAt).getTime() - Date.now()) / 1000);
    return Math.max(0, diff);
  });

  useEffect(() => {
    if (!nextAttemptAt) return;
    const interval = setInterval(() => {
      const diff = Math.ceil((new Date(nextAttemptAt).getTime() - Date.now()) / 1000);
      setRemainingSecs(Math.max(0, diff));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextAttemptAt]);

  const formatCountdown = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Determine status display
  let statusBadge = {
    title: lang === 'pt' ? 'QUALIFICADO PARA REVISÃO' : 'QUALIFIED FOR REVIEW',
    color: 'bg-cyan-950/80 text-cyan-400 border-cyan-700',
    description: lang === 'pt'
      ? 'Excelente desempenho técnico. Sua candidatura foi indexada prioritariamente para revisão da equipe de recrutamento da Kraefegg M.O.'
      : 'Outstanding technical performance. Your application has been prioritized for review by the Kraefegg M.O. recruitment team.'
  };

  if (score >= 50 && score < 70) {
    statusBadge = {
      title: lang === 'pt' ? 'PERFIL EM DESENVOLVIMENTO' : 'DEVELOPING PROFILE',
      color: 'bg-amber-950/80 text-amber-400 border-amber-700',
      description: lang === 'pt'
        ? 'Sua avaliação demonstrou fundamentos técnicos relevantes. Seu currículo e histórico serão analisados em conjunto com as demandas da posição.'
        : 'Your evaluation demonstrated relevant technical foundations. Your resume and track record will be analyzed in context with position demands.'
    };
  } else if (score < 50) {
    statusBadge = {
      title: lang === 'pt' ? 'ABAIXO DO THRESHOLD ATUAL' : 'BELOW CURRENT ASSESSMENT THRESHOLD',
      color: 'bg-slate-900 text-slate-300 border-slate-700',
      description: lang === 'pt'
        ? 'O resultado obtido ficou abaixo da pontuação de corte para esta oportunidade específica. Uma nova tentativa poderá ser realizada após o período de 24 horas.'
        : 'The result obtained was below the cutoff threshold for this specific role. Another attempt may be performed after the 24-hour period.'
    };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#070A12] p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-center">
        {/* Top Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg">
          {score >= 70 ? (
            <Award className="w-8 h-8 text-cyan-400" />
          ) : score >= 50 ? (
            <FileCheck className="w-8 h-8 text-amber-400" />
          ) : (
            <Clock className="w-8 h-8 text-slate-400" />
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border mb-1">
            <span className={statusBadge.color}>{statusBadge.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
            {lang === 'pt' ? 'Avaliação Técnica Concluída' : 'Technical Assessment Completed'}
          </h2>
          <p className="text-xs font-mono text-slate-400 max-w-lg mx-auto">
            {statusBadge.description}
          </p>
        </div>

        {/* Score Display Card */}
        <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {lang === 'pt' ? 'Pontuação Final' : 'Final Score'}
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-black text-cyan-400 mt-1">
              {score.toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {lang === 'pt' ? 'Acertos' : 'Correct Answers'}
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-black text-white mt-1">
              {correctCount} <span className="text-xl text-slate-500">/ {totalQuestions}</span>
            </div>
          </div>
        </div>

        {/* Retake Countdown if locked */}
        {nextAttemptAt && remainingSecs > 0 && (
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 max-w-md mx-auto space-y-2 text-left">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold uppercase">
              <Clock className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Janela de Reteste (24 Horas)' : 'Retake Window (24 Hours)'}</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {lang === 'pt'
                ? 'Conforme nossa política de integridade, um novo teste para esta vaga poderá ser realizado em:'
                : 'Under our assessment integrity policy, a new attempt for this position will be available in:'}
            </p>
            <div className="text-center py-2 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-xl font-bold text-amber-400">
              {formatCountdown(remainingSecs)}
            </div>
          </div>
        )}

        {/* Institutional Principle: Human Final Decision */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-left space-y-2 text-xs font-sans text-slate-400 leading-relaxed">
          <div className="flex items-center gap-2 text-cyan-400 font-mono font-semibold uppercase text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Compromisso com a Decisão Humana' : 'Commitment to Human Review'}</span>
          </div>
          <p>
            {lang === 'pt'
              ? 'Na Kraefegg M.O., o teste objetivo é apenas uma entre várias métricas. Nenhuma candidatura é descartada exclusivamente por algoritmos; avaliamos trajetórias profissionais completas, portfólios, registros de classe (CREA/CRQ) e aderência cultural aos nossos projetos multidisciplinares.'
              : 'At Kraefegg M.O., the objective assessment is merely one of multiple evaluation metrics. No application is discarded solely by algorithms; we evaluate complete trajectories, portfolios, board certifications, and cultural alignment.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-semibold transition-colors cursor-pointer"
          >
            {lang === 'pt' ? 'Ver Outras Vagas' : 'View Other Positions'}
          </button>

          <button
            onClick={() => {
              onClose();
              onJoinTalentNetwork();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Ingressar na Rede de Talentos' : 'Join Talent Network'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
