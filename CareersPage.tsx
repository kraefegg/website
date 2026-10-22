import React, { useState, useEffect } from 'react';
import { NavRoute, Language } from '../types';
import { Job } from '../types/careers';
import { CareersHero } from '../components/careers/CareersHero';
import { FounderCareersSpotlight } from '../components/careers/FounderCareersSpotlight';
import { WhyKraefegg } from '../components/careers/WhyKraefegg';
import { JobSearchAndFilters } from '../components/careers/JobSearchAndFilters';
import { JobCard } from '../components/careers/JobCard';
import { JobDetailModal } from '../components/careers/JobDetailModal';
import { ApplyWizard } from '../components/careers/ApplyWizard';
import { AssessmentEngine } from '../components/careers/AssessmentEngine';
import { AssessmentResultView } from '../components/careers/AssessmentResultView';
import { TalentNetworkModal } from '../components/careers/TalentNetworkModal';
import { PrivacyPolicyModal } from '../components/careers/PrivacyPolicyModal';
import { AdminRecruitmentDashboard } from '../components/careers/AdminRecruitmentDashboard';
import { Lock, LayoutDashboard, Briefcase, Users, ShieldCheck } from 'lucide-react';
import { careersI18n, localize } from '../data/pageTranslations';

interface CareersPageProps {
  onNavigate: (route: NavRoute) => void;
  lang: Language;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate, lang }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedWorkMode, setSelectedWorkMode] = useState('ALL');

  // Modals & Flow States
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  
  // Active Assessment State
  const [activeAssessmentAppId, setActiveAssessmentAppId] = useState<string | null>(null);
  const [activeAssessmentJob, setActiveAssessmentJob] = useState<Job | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    passedThreshold: boolean;
    nextAttemptAt: string | null;
    message: string;
    applicationStatus: string;
  } | null>(null);

  // Aux Modals
  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [highlightAppId, setHighlightAppId] = useState<string | null>(null);

  // Check URL hash for admin deep links like #admin/careers or ?appId=..., and remote query
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('admin/careers')) {
      setIsAdminViewOpen(true);
      const urlParams = new URLSearchParams(hash.split('?')[1]);
      const appId = urlParams.get('appId');
      if (appId) {
        setHighlightAppId(appId);
      }
    }
    if (hash.includes('remote') || hash.includes('homeoffice') || hash.includes('mode=REMOTE')) {
      setSelectedWorkMode('REMOTE');
    }
  }, []);

  // Fetch jobs from server
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/careers/jobs');
        const data = await res.json();
        if (data.success && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        }
      } catch (err) {
        console.error('Failed fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs locally for instant UI responsiveness
  const filteredJobs = jobs.filter((job) => {
    if (selectedCategory !== 'ALL' && job.category !== selectedCategory) {
      return false;
    }
    if (selectedWorkMode !== 'ALL' && job.work_mode !== selectedWorkMode) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const isRemoteQuery = q.includes('home office') || q.includes('homeoffice') || q.includes('remot');
      if (isRemoteQuery && job.work_mode === 'REMOTE') {
        return true;
      }
      const matchTitle = job.title.toLowerCase().includes(q) || job.titleEn.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q) || job.descriptionEn.toLowerCase().includes(q);
      const matchSkills = job.technical_skills.some((s) => s.toLowerCase().includes(q));
      const matchDivision = job.division.toLowerCase().includes(q);
      const matchDept = job.department.toLowerCase().includes(q);
      const matchLocation = job.location.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchSkills && !matchDivision && !matchDept && !matchLocation) {
        return false;
      }
    }
    return true;
  });

  const handleStartAssessment = (applicationId: string, candidateData: any) => {
    if (selectedJobForApply) {
      setActiveAssessmentAppId(applicationId);
      setActiveAssessmentJob(selectedJobForApply);
      setSelectedJobForApply(null);
    }
  };

  const handleAssessmentCompleted = (result: any) => {
    setActiveAssessmentAppId(null);
    setAssessmentResult(result);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Top Administration & Navigation Toolbar */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Briefcase className="w-4 h-4 text-cyan-400" />
          <span>KRAEFEGG M.O. CAREERS & TALENT NETWORK</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPrivacyModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{localize(lang, careersI18n.privacyLgpd)}</span>
          </button>

          <button
            onClick={() => setIsAdminViewOpen(!isAdminViewOpen)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all cursor-pointer ${
              isAdminViewOpen
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{isAdminViewOpen ? localize(lang, careersI18n.viewCareersPortal) : localize(lang, careersI18n.adminDashboard)}</span>
          </button>
        </div>
      </div>

      {isAdminViewOpen ? (
        /* Admin Recruitment Dashboard */
        <AdminRecruitmentDashboard
          lang={lang}
          highlightAppId={highlightAppId}
          onClose={() => setIsAdminViewOpen(false)}
        />
      ) : (
        /* Standard Careers Portal */
        <>
          {/* Section 1: Hero Banner */}
          <CareersHero
            lang={lang}
            openCount={jobs.length}
            onExploreJobs={() => {
              const el = document.getElementById('jobs-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onSelectRemoteJobs={() => {
              setSelectedWorkMode('REMOTE');
              const el = document.getElementById('jobs-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onJoinTalentNetwork={() => setIsTalentModalOpen(true)}
          />

          {/* Section 2: Founder Leadership Spotlight */}
          <FounderCareersSpotlight lang={lang} />

          {/* Section 3: Why Kraefegg & Multidisciplinary Convergence */}
          <WhyKraefegg lang={lang} />

          {/* Section 4: Job Search and Open Positions */}
          <div id="jobs-section" className="space-y-6 pt-4 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  {localize(lang, careersI18n.oppBadge)}
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  {localize(lang, careersI18n.oppTitle)}
                </h2>
              </div>
              <p className="text-xs font-mono text-slate-400 max-w-sm">
                {localize(lang, careersI18n.oppDesc)}
              </p>
            </div>

            {/* Filter Bar */}
            <JobSearchAndFilters
              lang={lang}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedWorkMode={selectedWorkMode}
              onWorkModeChange={setSelectedWorkMode}
              totalFiltered={filteredJobs.length}
              onClearFilters={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedWorkMode('ALL');
              }}
            />

            {/* Positions Grid */}
            {loading ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <div className="text-xs font-mono text-slate-400">
                  {localize(lang, careersI18n.loadingPositions)}
                </div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="py-16 text-center space-y-4 rounded-2xl border border-slate-800 bg-[#070A12] p-8">
                <Users className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-heading font-bold text-white">
                  {localize(lang, careersI18n.noPositionsTitle)}
                </h3>
                <p className="text-xs font-mono text-slate-400 max-w-md mx-auto">
                  {localize(lang, careersI18n.noPositionsDesc)}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('ALL');
                      setSelectedWorkMode('ALL');
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono hover:bg-slate-800 cursor-pointer"
                  >
                    {localize(lang, careersI18n.clearFilters)}
                  </button>
                  <button
                    onClick={() => setIsTalentModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono hover:bg-cyan-400 cursor-pointer"
                  >
                    {localize(lang, careersI18n.joinTalentNetwork)}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    lang={lang}
                    onViewDetails={(j) => setSelectedJobForDetail(j)}
                    onApply={(j) => setSelectedJobForApply(j)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* MODALS */}

      {/* 1. Job Details Modal */}
      <JobDetailModal
        job={selectedJobForDetail}
        lang={lang}
        onClose={() => setSelectedJobForDetail(null)}
        onApply={(job) => {
          setSelectedJobForDetail(null);
          setSelectedJobForApply(job);
        }}
      />

      {/* 2. Candidate Application Form Wizard */}
      {selectedJobForApply && (
        <ApplyWizard
          job={selectedJobForApply}
          lang={lang}
          onClose={() => setSelectedJobForApply(null)}
          onStartAssessment={handleStartAssessment}
          onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)}
        />
      )}

      {/* 3. Assessment Engine (6 Questions) */}
      {activeAssessmentAppId && activeAssessmentJob && (
        <AssessmentEngine
          applicationId={activeAssessmentAppId}
          job={activeAssessmentJob}
          lang={lang}
          onAssessmentCompleted={handleAssessmentCompleted}
          onCancel={() => {
            setActiveAssessmentAppId(null);
            setActiveAssessmentJob(null);
          }}
        />
      )}

      {/* 4. Assessment Result View */}
      {assessmentResult && (
        <AssessmentResultView
          score={assessmentResult.score}
          correctCount={assessmentResult.correctCount}
          totalQuestions={assessmentResult.totalQuestions}
          passedThreshold={assessmentResult.passedThreshold}
          nextAttemptAt={assessmentResult.nextAttemptAt}
          message={assessmentResult.message}
          applicationStatus={assessmentResult.applicationStatus}
          lang={lang}
          onClose={() => setAssessmentResult(null)}
          onJoinTalentNetwork={() => {
            setAssessmentResult(null);
            setIsTalentModalOpen(true);
          }}
        />
      )}

      {/* 5. Talent Network Modal */}
      {isTalentModalOpen && (
        <TalentNetworkModal
          lang={lang}
          onClose={() => setIsTalentModalOpen(false)}
          onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)}
        />
      )}

      {/* 6. Privacy Policy & LGPD Modal */}
      {isPrivacyModalOpen && (
        <PrivacyPolicyModal
          lang={lang}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      )}
    </div>
  );
};
