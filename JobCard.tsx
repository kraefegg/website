import React from 'react';
import { MapPin, Clock, Briefcase, Award, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';
import { Job } from '../../types/careers';
import { Language } from '../../types';

interface JobCardProps {
  job: Job;
  lang: Language;
  onViewDetails: (job: Job) => void;
  onApply: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  lang,
  onViewDetails,
  onApply
}) => {
  const isPentaHydra = job.division === 'PentaHydra Systems';

  return (
    <div className="group relative rounded-2xl border border-slate-800 bg-[#070A12] hover:border-cyan-500/40 p-6 transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/5 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${
                isPentaHydra
                  ? 'bg-cyan-950/80 text-cyan-400 border-cyan-800'
                  : 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
              }`}
            >
              {job.division}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
              {job.seniority}
            </span>
          </div>

          {/* DEMO / SAMPLE BADGE */}
          {job.is_demo && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/80" title="Demonstração técnica da plataforma de recrutamento">
              DEMO / SAMPLE
            </span>
          )}
        </div>

        {/* Title and Department */}
        <div>
          <h3 className="text-lg font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">
            {lang === 'pt' ? job.title : job.titleEn}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {job.department}
          </p>
        </div>

        {/* Metadata: Location, Mode, Type */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs font-mono text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className={job.work_mode === 'REMOTE' ? 'text-emerald-400 font-semibold' : ''}>
              {job.work_mode === 'REMOTE'
                ? (lang === 'pt' ? '🏠 Remoto - Home Office' : '🏠 Remote - Home Office')
                : job.work_mode === 'HYBRID'
                ? (lang === 'pt' ? '🏢 Híbrido' : '🏢 Hybrid')
                : job.work_mode === 'FIELD'
                ? (lang === 'pt' ? '⛏️ Campo' : '⛏️ Field')
                : (lang === 'pt' ? 'Presencial' : 'On-site')}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>
              {job.employment_type === 'FULL_TIME'
                ? (lang === 'pt' ? 'Tempo Integral' : 'Full-Time')
                : job.employment_type === 'PART_TIME'
                ? (lang === 'pt' ? 'Meio Período' : 'Part-Time')
                : (lang === 'pt' ? 'Contrato / Consultoria' : 'Contract / Consulting')}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs font-sans text-slate-300 line-clamp-2 leading-relaxed">
          {lang === 'pt' ? job.description : job.descriptionEn}
        </p>

        {/* Technical Skills Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {job.technical_skills.slice(0, 5).map((skill, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
            >
              {skill}
            </span>
          ))}
          {job.technical_skills.length > 5 && (
            <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-500">
              +{job.technical_skills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>{lang === 'pt' ? 'Teste Técnico 6Q' : '6Q Assessment'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(job)}
            className="px-3.5 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
          >
            {lang === 'pt' ? 'Detalhes' : 'Details'}
          </button>
          <button
            onClick={() => onApply(job)}
            className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-cyan-500 hover:bg-cyan-400 transition-all cursor-pointer shadow-md shadow-cyan-500/10"
          >
            {lang === 'pt' ? 'Candidatar-se' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};
