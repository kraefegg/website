import React from 'react';
import { X, MapPin, Briefcase, Clock, Award, Shield, CheckCircle2, ArrowRight, Terminal } from 'lucide-react';
import { Job } from '../../types/careers';
import { Language } from '../../types';

interface JobDetailModalProps {
  job: Job | null;
  lang: Language;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  lang,
  onClose,
  onApply
}) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-[#070A12] p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold text-cyan-400 bg-cyan-950 border border-cyan-800">
              {job.division}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
              {job.category}
            </span>
            {job.is_demo && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-amber-300 bg-amber-950/60 border border-amber-800">
                DEMO / SAMPLE POSITION
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            {lang === 'pt' ? job.title : job.titleEn}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              <span>{job.work_mode}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{job.employment_type}</span>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans">
          {lang === 'pt' ? job.description : job.descriptionEn}
        </div>

        {/* Technical Assessment Notice */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
          <Terminal className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs font-mono text-slate-300 space-y-1">
            <div className="font-bold text-cyan-300">
              {lang === 'pt' ? 'AVALIAÇÃO TÉCNICA OBRIGATÓRIA (6 QUESTÕES)' : 'MANDATORY TECHNICAL ASSESSMENT (6 QUESTIONS)'}
            </div>
            <p className="text-slate-400">
              {lang === 'pt'
                ? `Esta vaga inclui um assessment técnico objetivo com 6 questões dinâmicas de engenharia para o perfil ${job.assessment_profile}. O score é calculado no servidor e a candidatura é encaminhada para o comitê técnico.`
                : `This position includes an objective 6-question engineering assessment for profile ${job.assessment_profile}. The score is verified on the server and submitted to the technical committee.`}
            </p>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {lang === 'pt' ? 'Principais Responsabilidades' : 'Key Responsibilities'}
          </h4>
          <ul className="space-y-1.5">
            {job.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            {lang === 'pt' ? 'Requisitos & Qualificações' : 'Requirements & Qualifications'}
          </h4>
          <ul className="space-y-1.5">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Professional Registration & Education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {job.professional_registration_required && (
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                {lang === 'pt' ? 'Registro Profissional' : 'Professional Board Registration'}
              </div>
              <div className="text-xs font-semibold text-amber-400 mt-0.5">
                {job.professional_registration_required}
              </div>
            </div>
          )}
          {job.education_required && (
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                {lang === 'pt' ? 'Formação Mínima' : 'Education'}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">
                {job.education_required}
              </div>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-slate-400 uppercase">
            {lang === 'pt' ? 'Competências Técnicas' : 'Technical Skills'}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {job.technical_skills.map((s, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            {lang === 'pt' ? 'Fechar' : 'Close'}
          </button>
          <button
            onClick={() => {
              onClose();
              onApply(job);
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-500 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <span>{lang === 'pt' ? 'Candidatar-se a esta vaga' : 'Apply for this position'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
