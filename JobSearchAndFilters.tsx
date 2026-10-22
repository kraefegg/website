import React from 'react';
import { Search, Filter, X, Briefcase, MapPin } from 'lucide-react';
import { JobCategory, WorkMode } from '../../types/careers';
import { Language } from '../../types';

interface JobSearchAndFiltersProps {
  lang: Language;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedWorkMode: string;
  onWorkModeChange: (mode: string) => void;
  totalFiltered: number;
  onClearFilters: () => void;
}

const CATEGORIES: { key: string; labelPt: string; labelEn: string }[] = [
  { key: 'ALL', labelPt: 'Todas as Áreas', labelEn: 'All Categories' },
  { key: 'PENTAHYDRA SYSTEMS', labelPt: 'PentaHydra Systems', labelEn: 'PentaHydra Systems' },
  { key: 'ENGINEERING', labelPt: 'Engenharia Civil/Estrutural', labelEn: 'Civil & Structural Eng.' },
  { key: 'ENVIRONMENT & ESG', labelPt: 'Meio Ambiente & ESG', labelEn: 'Environment & ESG' },
  { key: 'MINING & GEOINTELLIGENCE', labelPt: 'Mineração & GeoAI', labelEn: 'Mining & GeoAI' },
  { key: 'FORESTRY & AGRICULTURE', labelPt: 'Florestal & Carbono', labelEn: 'Forestry & Agriculture' },
  { key: 'MARITIME & OFFSHORE', labelPt: 'Marítimo & Portos', labelEn: 'Maritime & Seaports' },
  { key: 'ENERGY', labelPt: 'Energia Renovável & Solar', labelEn: 'Renewable Energy & Solar' },
  { key: 'FORENSICS & AUDITING', labelPt: 'Perícia & Auditoria', labelEn: 'Forensics & Auditing' },
  { key: 'PROJECTS & BUSINESS', labelPt: 'Gestão de Projetos (PMO)', labelEn: 'Project Management' }
];

const WORK_MODES: { key: string; labelPt: string; labelEn: string }[] = [
  { key: 'ALL', labelPt: 'Todos os Modelos de Trabalho', labelEn: 'All Work Modes' },
  { key: 'REMOTE', labelPt: '🏠 Remoto - Home Office (Todas)', labelEn: '🏠 Remote - Home Office (All)' },
  { key: 'HYBRID', labelPt: '🏢 Híbrido', labelEn: '🏢 Hybrid' },
  { key: 'ONSITE', labelPt: 'Presencial', labelEn: 'On-site' },
  { key: 'FIELD', labelPt: 'Campo / Operacional', labelEn: 'Field' }
];

export const JobSearchAndFilters: React.FC<JobSearchAndFiltersProps> = ({
  lang,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedWorkMode,
  onWorkModeChange,
  totalFiltered,
  onClearFilters
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'ALL' || selectedWorkMode !== 'ALL';

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-[#070A12] p-5 sm:p-6 shadow-xl">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              lang === 'pt'
                ? 'Buscar por cargo, competência (Python, PRAD, Solar, SCADA, GeoAI)...'
                : 'Search by title, skill (Python, PRAD, Solar, SCADA, GeoAI)...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Work Mode Dropdown */}
        <div className="sm:w-64">
          <select
            value={selectedWorkMode}
            onChange={(e) => onWorkModeChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          >
            {WORK_MODES.map((wm) => (
              <option key={wm.key} value={wm.key}>
                {lang === 'pt' ? wm.labelPt : wm.labelEn}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Toggle: Home Office / Remoto (Todas) */}
        <button
          type="button"
          onClick={() => onWorkModeChange(selectedWorkMode === 'REMOTE' ? 'ALL' : 'REMOTE')}
          className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-2 border ${
            selectedWorkMode === 'REMOTE'
              ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
              : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60 hover:bg-emerald-900/50 hover:border-emerald-500'
          }`}
        >
          <span>🏠</span>
          <span>{lang === 'pt' ? 'Vagas Remotas (Home Office)' : 'Remote Jobs (Home Office)'}</span>
        </button>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {lang === 'pt' ? cat.labelPt : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Status Bar / Active Filters */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
        <div>
          <span>{totalFiltered}</span> {lang === 'pt' ? 'vagas encontradas' : 'positions found'}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>{lang === 'pt' ? 'Limpar Filtros' : 'Clear Filters'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
