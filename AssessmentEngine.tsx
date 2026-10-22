import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, ChevronRight, ChevronLeft, Send, AlertCircle, HelpCircle, Shield, Award } from 'lucide-react';
import { AssessmentQuestionPublic, Job } from '../../types/careers';
import { Language } from '../../types';

interface AssessmentEngineProps {
  applicationId: string;
  job: Job;
  lang: Language;
  onAssessmentCompleted: (result: {
    score: number;
    correctCount: number;
    totalQuestions: number;
    passedThreshold: boolean;
    nextAttemptAt: string | null;
    message: string;
    applicationStatus: string;
  }) => void;
  onCancel: () => void;
}

export const AssessmentEngine: React.FC<AssessmentEngineProps> = ({
  applicationId,
  job,
  lang,
  onAssessmentCompleted,
  onCancel
}) => {
  const [questions, setQuestions] = useState<AssessmentQuestionPublic[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/careers/assessment/${job.id}/start`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to load assessment questions.');
        }
        setQuestions(data.questions);
      } catch (err: any) {
        setError(err.message || 'Error loading questions.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [job.id]);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = answeredCount === questions.length && questions.length === 6;

  const handleSubmitAssessment = async () => {
    if (!allAnswered) {
      setError(
        lang === 'pt'
          ? 'Por favor, responda a todas as 6 questões antes de submeter.'
          : 'Please answer all 6 questions before submitting.'
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const questionIds = questions.map((q) => q.id);
      const answers = questions.map((_, idx) => selectedAnswers[idx]);

      const res = await fetch('/api/careers/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          questionIds,
          answers
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed evaluating assessment.');
      }

      onAssessmentCompleted({
        score: data.score,
        correctCount: data.correctCount,
        totalQuestions: 6,
        passedThreshold: data.passedThreshold,
        nextAttemptAt: data.nextAttemptAt,
        message: data.message,
        applicationStatus: data.applicationStatus
      });
    } catch (err: any) {
      setError(err.message || 'Error submitting assessment.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <div className="text-center space-y-3 p-8 rounded-2xl border border-slate-800 bg-[#070A12]">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="text-sm font-mono text-cyan-300">
            {lang === 'pt' ? 'Gerando cadernos de questões (6Q)...' : 'Generating dynamic question set (6Q)...'}
          </div>
          <div className="text-xs font-mono text-slate-500">
            KRAEFEGG M.O. / TECHNICAL EVALUATION CORE
          </div>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-md w-full p-6 rounded-2xl border border-rose-800/80 bg-[#070A12] space-y-4 text-center">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-lg font-heading font-bold text-white">
            {lang === 'pt' ? 'Falha ao carregar avaliação' : 'Failed to load assessment'}
          </h3>
          <p className="text-xs font-mono text-slate-300">{error}</p>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-slate-900 text-slate-200 text-xs font-mono hover:bg-slate-800"
          >
            {lang === 'pt' ? 'Voltar' : 'Go Back'}
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const currentAnswer = selectedAnswers[currentIndex];

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'EASY':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
      case 'MEDIUM':
        return 'text-amber-400 bg-amber-950/60 border-amber-800';
      case 'HARD':
        return 'text-rose-400 bg-rose-950/60 border-rose-800';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-[#070A12] p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                {lang === 'pt' ? 'Avaliação Técnica' : 'Technical Assessment'} &bull; {job.assessment_profile}
              </span>
            </div>
            <h3 className="text-base font-heading font-bold text-white mt-1">
              {job.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {answeredCount} / {questions.length} {lang === 'pt' ? 'respondidas' : 'answered'}
            </span>
            <button
              onClick={onCancel}
              className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
            >
              {lang === 'pt' ? 'Sair' : 'Exit'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-400 font-bold">
              {lang === 'pt' ? 'QUESTÃO' : 'QUESTION'} {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-slate-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        {currentQ && (
          <div className="space-y-5">
            {/* Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${getDifficultyColor(currentQ.difficulty)}`}>
                {currentQ.difficulty}
              </span>
              {currentQ.skills.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
                  {s}
                </span>
              ))}
            </div>

            {/* Question Statement */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-sm sm:text-base font-sans text-white font-medium leading-relaxed">
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIndex) => {
                const isSelected = currentAnswer === optIndex;
                const letter = String.fromCharCode(65 + optIndex);

                return (
                  <button
                    key={optIndex}
                    type="button"
                    onClick={() => handleSelectOption(optIndex)}
                    className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/80 text-white shadow-lg shadow-cyan-500/5'
                        : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-xs sm:text-sm font-sans leading-relaxed flex-1">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Errors if any */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Anterior' : 'Previous'}</span>
          </button>

          {/* Question Index Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-cyan-400 bg-cyan-500'
                      : isAnswered
                      ? 'bg-emerald-500/80'
                      : 'bg-slate-800'
                  }`}
                  title={`Questão ${idx + 1}`}
                />
              );
            })}
          </div>

          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'pt' ? 'Próxima' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={submitting || !allAnswered}
              onClick={handleSubmitAssessment}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-400/20 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {submitting
                  ? (lang === 'pt' ? 'Avaliando no Servidor...' : 'Evaluating on Server...')
                  : (lang === 'pt' ? 'Finalizar & Submeter (6/6)' : 'Finish & Submit (6/6)')}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
