import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ExternalLink, 
  Mail, 
  RotateCw, 
  Download, 
  Award, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  X,
  ShieldCheck,
  Building,
  Terminal,
  RefreshCw
} from 'lucide-react';
import { Application, AdminStats, ApplicationStatus, EmailStatus } from '../../types/careers';
import { Language } from '../../types';

interface AdminRecruitmentDashboardProps {
  lang: Language;
  onClose?: () => void;
  highlightAppId?: string | null;
}

export const AdminRecruitmentDashboard: React.FC<AdminRecruitmentDashboardProps> = ({
  lang,
  onClose,
  highlightAppId
}) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [retryingEmailId, setRetryingEmailId] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, appsRes] = await Promise.all([
        fetch('/api/careers/admin/stats'),
        fetch(`/api/careers/admin/applications?status=${statusFilter}&search=${encodeURIComponent(search)}&department=${encodeURIComponent(departmentFilter)}`)
      ]);

      const statsData = await statsRes.json();
      const appsData = await appsRes.json();

      if (statsData.success) setStats(statsData.stats);
      if (appsData.success) {
        setApplications(appsData.applications);
        if (highlightAppId) {
          const matched = appsData.applications.find((a: Application) => a.id === highlightAppId);
          if (matched) setSelectedApp(matched);
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter, departmentFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handleUpdateStatus = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      const res = await fetch(`/api/careers/admin/applications/${appId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, application_status: newStatus } : a))
        );
        if (selectedApp && selectedApp.id === appId) {
          setSelectedApp((prev) => (prev ? { ...prev, application_status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error('Failed updating status:', err);
    }
  };

  const handleRetryEmail = async (appId: string) => {
    try {
      setRetryingEmailId(appId);
      const res = await fetch(`/api/careers/admin/applications/${appId}/retry-email`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed retrying email:', err);
    } finally {
      setRetryingEmailId(null);
    }
  };

  const exportCSV = () => {
    if (applications.length === 0) return;
    const headers = [
      'Application ID',
      'Candidate Name',
      'Email',
      'Phone',
      'Location',
      'LinkedIn URL',
      'Position',
      'Department',
      'Division',
      'Assessment Profile',
      'Best Score (%)',
      'Latest Correct',
      'Attempts',
      'Application Status',
      'Email Status',
      'Submitted At'
    ];

    const rows = applications.map((a) => [
      a.id,
      `"${a.candidate.full_name}"`,
      a.candidate.email,
      a.candidate.phone_optional || '',
      `"${a.candidate.city_optional || ''}, ${a.candidate.country}"`,
      `"${a.candidate.linkedin_url}"`,
      `"${a.job_title}"`,
      `"${a.department}"`,
      `"${a.division}"`,
      a.assessment_profile,
      a.best_score.toFixed(2),
      `${a.latest_correct}/${a.total_questions}`,
      a.attempt_count,
      a.application_status,
      a.email_status,
      a.submitted_at
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kraefegg_recruitment_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-[#070A12]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Terminal className="w-4 h-4" />
            <span>KRAEFEGG M.O. & PENTAHYDRA SYSTEMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
            {lang === 'pt' ? 'Painel de Gestão de Recrutamento & Avaliações' : 'Recruitment & Assessment Operations Dashboard'}
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {lang === 'pt'
              ? 'Supervisão técnica de candidaturas, scores de 6 questões, status de e-mail e deliberações humanas.'
              : 'Technical overview of candidate applications, 6Q scores, email transmission states, and human reviews.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Atualizar dados"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={exportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'pt' ? 'Exportar CSV' : 'Export CSV'}</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Candidaturas</div>
            <div className="text-2xl font-mono font-bold text-white mt-1">{stats.total_applications}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Vagas Abertas</div>
            <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">{stats.open_positions}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Assessments</div>
            <div className="text-2xl font-mono font-bold text-white mt-1">{stats.assessments_completed}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Média Geral</div>
            <div className="text-2xl font-mono font-bold text-sky-400 mt-1">{stats.average_score}%</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-emerald-400 uppercase">&ge; 70% Qualif.</div>
            <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{stats.qualified_count}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-amber-400 uppercase">50-69% Desenv.</div>
            <div className="text-2xl font-mono font-bold text-amber-400 mt-1">{stats.developing_count}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">&lt; 50% Threshold</div>
            <div className="text-2xl font-mono font-bold text-slate-400 mt-1">{stats.below_threshold_count}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-[10px] font-mono text-cyan-400 uppercase">E-mails (Env/Pend/Falha)</div>
            <div className="text-sm font-mono font-bold mt-2">
              <span className="text-emerald-400">{stats.email_sent_count}</span> /{' '}
              <span className="text-amber-400">{stats.email_pending_count}</span> /{' '}
              <span className="text-rose-400">{stats.email_failed_count}</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'pt' ? 'Filtrar por candidato, email ou cargo...' : 'Filter by candidate, email or job...'}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </form>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">{lang === 'pt' ? 'Todos os Status' : 'All Statuses'}</option>
            <option value="PENDING_REVIEW">PENDING REVIEW</option>
            <option value="UNDER_REVIEW">UNDER REVIEW</option>
            <option value="SHORTLISTED">SHORTLISTED</option>
            <option value="BELOW_THRESHOLD">BELOW THRESHOLD</option>
            <option value="REJECTED">REJECTED</option>
            <option value="WITHDRAWN">WITHDRAWN</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#070A12]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Candidato</th>
              <th className="py-3 px-4">Cargo & Divisão</th>
              <th className="py-3 px-4">LinkedIn</th>
              <th className="py-3 px-4">Score (6Q)</th>
              <th className="py-3 px-4">Tentativas</th>
              <th className="py-3 px-4">Status de Revisão</th>
              <th className="py-3 px-4">Status E-mail</th>
              <th className="py-3 px-4">Data</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs font-sans">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-500 font-mono text-xs">
                  {lang === 'pt' ? 'Nenhuma candidatura registrada com os filtros atuais.' : 'No applications found matching criteria.'}
                </td>
              </tr>
            ) : (
              applications.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                const score = app.best_score || 0;
                let scoreBadge = 'text-emerald-400 bg-emerald-950/60 border-emerald-800';
                if (score < 50) scoreBadge = 'text-rose-400 bg-rose-950/60 border-rose-800';
                else if (score < 70) scoreBadge = 'text-amber-400 bg-amber-950/60 border-amber-800';

                return (
                  <tr
                    key={app.id}
                    className={`hover:bg-slate-900/40 transition-colors ${
                      isSelected ? 'bg-cyan-950/20' : ''
                    }`}
                  >
                    {/* Candidate */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{app.candidate.full_name}</div>
                      <div className="text-[11px] font-mono text-slate-400">{app.candidate.email}</div>
                    </td>

                    {/* Job & Division */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-200">{app.job_title}</div>
                      <div className="text-[10px] font-mono text-cyan-400">{app.division} &bull; {app.department}</div>
                    </td>

                    {/* LinkedIn */}
                    <td className="py-3 px-4">
                      <a
                        href={app.candidate.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-mono text-[11px]"
                      >
                        <span>Perfil</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    {/* Score */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${scoreBadge}`}>
                        {score.toFixed(2)}% ({app.latest_correct}/6)
                      </span>
                    </td>

                    {/* Attempts */}
                    <td className="py-3 px-4 font-mono text-slate-400">
                      #{app.attempt_count || 0}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-4">
                      <select
                        value={app.application_status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                        className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="PENDING_REVIEW">PENDING_REVIEW</option>
                        <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                        <option value="SHORTLISTED">SHORTLISTED</option>
                        <option value="BELOW_THRESHOLD">BELOW_THRESHOLD</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="WITHDRAWN">WITHDRAWN</option>
                      </select>
                    </td>

                    {/* Email Status */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                            app.email_status === 'SENT'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : app.email_status === 'FAILED'
                              ? 'bg-rose-950 text-rose-400 border-rose-800'
                              : 'bg-amber-950 text-amber-400 border-amber-800'
                          }`}
                        >
                          {app.email_status}
                        </span>
                        {app.email_status === 'FAILED' && (
                          <button
                            onClick={() => handleRetryEmail(app.id)}
                            disabled={retryingEmailId === app.id}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                            title="Reenviar e-mail"
                          >
                            <RotateCw className={`w-3 h-3 ${retryingEmailId === app.id ? 'animate-spin' : ''}`} />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {new Date(app.submitted_at).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-cyan-300 hover:text-cyan-200 cursor-pointer"
                      >
                        Inspecionar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Candidate Inspector Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#070A12] p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute right-5 top-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-8">
              <div className="text-[10px] font-mono text-cyan-400 uppercase">
                {selectedApp.id} &bull; {selectedApp.division}
              </div>
              <h2 className="text-2xl font-heading font-bold text-white">
                {selectedApp.candidate.full_name}
              </h2>
              <p className="text-xs font-mono text-slate-400">
                {selectedApp.job_title} &bull; {selectedApp.department}
              </p>
            </div>

            {/* Candidate Details */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">E-mail</span>
                <span className="text-slate-200 font-mono">{selectedApp.candidate.email}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">LinkedIn</span>
                <a
                  href={selectedApp.candidate.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-mono"
                >
                  <span>Abrir Perfil</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Telefone</span>
                <span className="text-slate-300">{selectedApp.candidate.phone_optional || 'Não informado'}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Localidade</span>
                <span className="text-slate-300">{selectedApp.candidate.city_optional || '-'}, {selectedApp.candidate.country}</span>
              </div>
            </div>

            {/* Assessment Score Details */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase">
                Desempenho no Assessment Técnico (6 Questões)
              </h4>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-mono font-black text-cyan-400">
                    {selectedApp.best_score.toFixed(2)}%
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    {selectedApp.latest_correct} de {selectedApp.total_questions} acertos
                  </div>
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 text-right">Tentativas Totais</div>
                  <div className="text-xl font-mono font-bold text-white text-right">
                    #{selectedApp.attempt_count}
                  </div>
                </div>
              </div>
            </div>

            {/* Attempts History */}
            {selectedApp.attempts.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase">
                  Histórico de Tentativas
                </h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {selectedApp.attempts.map((att, idx) => (
                    <div
                      key={att.id || idx}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono flex items-center justify-between text-slate-300"
                    >
                      <span>Tentativa #{att.attempt_number} ({att.correct_answers}/6)</span>
                      <span className="text-cyan-400 font-bold">{att.score.toFixed(2)}%</span>
                      <span className="text-slate-500 text-[10px]">{new Date(att.completed_at).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notification Email Status */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase">Notificação ao Kraefegg M.O.</div>
                <div className="text-xs font-mono font-bold text-slate-200 mt-0.5 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Status: {selectedApp.email_status}</span>
                </div>
                {selectedApp.email_sent_at && (
                  <div className="text-[10px] font-mono text-slate-500">
                    Enviado em: {new Date(selectedApp.email_sent_at).toLocaleString()}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleRetryEmail(selectedApp.id)}
                disabled={retryingEmailId === selectedApp.id}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCw className={`w-3.5 h-3.5 ${retryingEmailId === selectedApp.id ? 'animate-spin' : ''}`} />
                <span>Reenviar</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
