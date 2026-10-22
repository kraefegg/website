import fs from 'fs';
import path from 'path';
import { 
  Job, 
  Candidate, 
  Application, 
  AssessmentAttempt, 
  TalentPoolCandidate, 
  AuditLogEntry, 
  AdminStats, 
  AssessmentProfile,
  ApplicationStatus,
  EmailStatus
} from '../types/careers';
import { INITIAL_JOBS } from './data/jobsData';
import { QUESTION_BANK, ServerQuestion } from './data/questionBank';

interface DatabaseSchema {
  jobs: Job[];
  candidates: Candidate[];
  applications: Application[];
  talent_pool: TalentPoolCandidate[];
  audit_logs: AuditLogEntry[];
  settings: {
    questions_per_assessment: number;
    retake_wait_hours: number;
    assessment_threshold: number;
    candidate_data_retention_days: number;
  };
}

const DB_FILE = path.join(process.cwd(), 'src', 'server', 'data', 'careers-db.json');

class CareersStore {
  private db: DatabaseSchema;

  constructor() {
    this.db = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure all initial jobs exist and stay updated with work_mode & location
        for (const job of INITIAL_JOBS) {
          const existingIdx = parsed.jobs.findIndex((j: Job) => j.id === job.id);
          if (existingIdx >= 0) {
            parsed.jobs[existingIdx].work_mode = job.work_mode;
            parsed.jobs[existingIdx].location = job.location;
          } else {
            parsed.jobs.push(job);
          }
        }
        this.saveDatabase(parsed);
        return parsed;
      }
    } catch (err) {
      console.warn('[CareersStore] Failed reading database file, initializing defaults:', err);
    }

    const initialData: DatabaseSchema = {
      jobs: [...INITIAL_JOBS],
      candidates: [],
      applications: [],
      talent_pool: [],
      audit_logs: [],
      settings: {
        questions_per_assessment: 6,
        retake_wait_hours: 24,
        assessment_threshold: 70,
        candidate_data_retention_days: 730
      }
    };
    this.saveDatabase(initialData);
    return initialData;
  }

  private saveDatabase(dataToSave?: DatabaseSchema): void {
    try {
      const data = dataToSave || this.db;
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[CareersStore] Failed to persist database to disk:', err);
    }
  }

  public getJobs(): Job[] {
    return this.db.jobs;
  }

  public getJobById(id: string): Job | undefined {
    return this.db.jobs.find((j) => j.id === id);
  }

  public getSettings() {
    return this.db.settings;
  }

  public addAuditLog(action: AuditLogEntry['action'], details: string, actor: string = 'system') {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      action,
      details,
      timestamp: new Date().toISOString(),
      actor
    };
    this.db.audit_logs.unshift(entry);
    // Keep max 1000 audit logs
    if (this.db.audit_logs.length > 1000) {
      this.db.audit_logs = this.db.audit_logs.slice(0, 1000);
    }
    this.saveDatabase();
    return entry;
  }

  public getAuditLogs(): AuditLogEntry[] {
    return this.db.audit_logs;
  }

  public getQuestionsForProfile(profile: AssessmentProfile): ServerQuestion[] {
    const list = QUESTION_BANK.filter((q) => q.assessment_profile === profile);
    if (list.length >= 6) {
      return list;
    }
    // Fallback if profile has fewer than 6 questions: mix with AI_ENGINEERING or SOFTWARE
    const fallback = QUESTION_BANK.filter((q) => q.assessment_profile === 'AI_ENGINEERING' || q.assessment_profile === 'SOFTWARE');
    const combined = [...list, ...fallback];
    return combined.slice(0, 6);
  }

  /**
   * Selects exactly 6 questions dynamically:
   * 2 Easy, 3 Medium, 1 Hard (or best matching distribution)
   */
  public selectSixQuestions(profile: AssessmentProfile): ServerQuestion[] {
    const pool = this.getQuestionsForProfile(profile);
    const easy = pool.filter((q) => q.difficulty === 'EASY');
    const medium = pool.filter((q) => q.difficulty === 'MEDIUM');
    const hard = pool.filter((q) => q.difficulty === 'HARD');

    const selected: ServerQuestion[] = [];
    const usedIds = new Set<string>();

    const addQuestion = (q: ServerQuestion | undefined) => {
      if (q && !usedIds.has(q.id)) {
        selected.push(q);
        usedIds.add(q.id);
      }
    };

    // Pick 2 Easy
    for (let i = 0; i < 2; i++) {
      if (easy[i]) addQuestion(easy[i]);
    }
    // Pick 3 Medium
    for (let i = 0; i < 3; i++) {
      if (medium[i]) addQuestion(medium[i]);
    }
    // Pick 1 Hard
    for (let i = 0; i < 1; i++) {
      if (hard[i]) addQuestion(hard[i]);
    }

    // Fill up to exactly 6 if any category was short
    for (const q of pool) {
      if (selected.length === 6) break;
      addQuestion(q);
    }

    return selected.slice(0, 6);
  }

  public findApplication(candidateEmail: string, jobId: string): Application | undefined {
    return this.db.applications.find(
      (a) => a.candidate.email.toLowerCase() === candidateEmail.toLowerCase() && a.job_id === jobId
    );
  }

  public getApplicationById(id: string): Application | undefined {
    return this.db.applications.find((a) => a.id === id);
  }

  public getAllApplications(): Application[] {
    return this.db.applications;
  }

  public createOrUpdateApplication(
    candidateData: Omit<Candidate, 'id' | 'created_at'>,
    job: Job
  ): { application: Application; isNew: boolean } {
    let app = this.findApplication(candidateData.email, job.id);
    const now = new Date().toISOString();

    if (app) {
      // Update candidate details if needed
      app.candidate.full_name = candidateData.full_name;
      app.candidate.linkedin_url = candidateData.linkedin_url;
      app.candidate.phone_optional = candidateData.phone_optional;
      app.candidate.city_optional = candidateData.city_optional;
      app.candidate.country = candidateData.country;
      app.candidate.consent = candidateData.consent;
      app.updated_at = now;
      this.saveDatabase();
      return { application: app, isNew: false };
    }

    const candidateId = `cand-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const candidate: Candidate = {
      id: candidateId,
      ...candidateData,
      created_at: now
    };
    this.db.candidates.push(candidate);

    const appId = `app-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const newApp: Application = {
      id: appId,
      candidate_id: candidate.id,
      job_id: job.id,
      candidate,
      job_title: job.title,
      department: job.department,
      division: job.division,
      linkedin_url: candidate.linkedin_url,
      application_status: 'PENDING_REVIEW',
      assessment_status: 'NOT_STARTED',
      assessment_profile: job.assessment_profile,
      best_score: 0,
      latest_score: 0,
      latest_correct: 0,
      total_questions: 6,
      attempt_count: 0,
      last_attempt_at: null,
      next_attempt_at: null,
      can_retake: true,
      submitted_at: now,
      created_at: now,
      updated_at: now,
      email_status: 'PENDING',
      attempts: [],
      audit_logs: []
    };

    this.db.applications.unshift(newApp);
    this.addAuditLog('application_created', `Application created for ${candidate.full_name} (${candidate.email}) on position ${job.title}`, candidate.email);
    this.saveDatabase();
    return { application: newApp, isNew: true };
  }

  /**
   * Server-side evaluation of the 6 answers
   */
  public evaluateAssessment(
    applicationId: string,
    questionIds: string[],
    answers: number[] // 0-indexed answers submitted by candidate
  ): {
    application: Application;
    attempt: AssessmentAttempt;
    score: number;
    correctCount: number;
    totalQuestions: number;
    passedThreshold: boolean;
    nextAttemptAt: string | null;
  } {
    const app = this.getApplicationById(applicationId);
    if (!app) {
      throw new Error('Application not found');
    }

    const now = new Date();
    const nowIso = now.toISOString();

    // Check 24-hour retake lock
    if (app.next_attempt_at) {
      const lockUntil = new Date(app.next_attempt_at).getTime();
      if (now.getTime() < lockUntil) {
        const remainingSeconds = Math.ceil((lockUntil - now.getTime()) / 1000);
        throw new Error(`RETAKE_LOCKED: Another attempt is locked until ${app.next_attempt_at}. Remaining seconds: ${remainingSeconds}`);
      }
    }

    if (questionIds.length !== 6 || answers.length !== 6) {
      throw new Error('Invalid assessment: exactly 6 questions and answers are required.');
    }

    // Verify answers strictly on server
    let correctCount = 0;
    for (let i = 0; i < 6; i++) {
      const qId = questionIds[i];
      const answerIndex = answers[i];
      const questionDef = QUESTION_BANK.find((q) => q.id === qId);
      if (questionDef && questionDef.correct_answer === answerIndex) {
        correctCount++;
      }
    }

    // Mathematical precision: Each question = 16.6666667%
    // 6/6 = 100.00%
    // 5/6 = 83.33%
    // 4/6 = 66.67%
    // 3/6 = 50.00%
    // 2/6 = 33.33%
    // 1/6 = 16.67%
    // 0/6 = 0.00%
    let score = 0;
    if (correctCount === 6) score = 100.00;
    else if (correctCount === 5) score = 83.33;
    else if (correctCount === 4) score = 66.67;
    else if (correctCount === 3) score = 50.00;
    else if (correctCount === 2) score = 33.33;
    else if (correctCount === 1) score = 16.67;
    else score = 0.00;

    const job = this.getJobById(app.job_id);
    const threshold = job ? job.assessment_threshold : this.db.settings.assessment_threshold;
    const passedThreshold = score >= threshold;

    let nextAttemptAt: string | null = null;
    let canRetake = true;

    if (!passedThreshold) {
      // 24-hour lock rule
      const nextDate = new Date(now.getTime() + this.db.settings.retake_wait_hours * 60 * 60 * 1000);
      nextAttemptAt = nextDate.toISOString();
      canRetake = false;
      this.addAuditLog('retake_locked', `24-hour retake lock activated for ${app.candidate.email} until ${nextAttemptAt}`);
    }

    const attemptNumber = (app.attempt_count || 0) + 1;
    const attempt: AssessmentAttempt = {
      id: `att-${Date.now()}-${attemptNumber}`,
      application_id: app.id,
      attempt_number: attemptNumber,
      started_at: app.last_attempt_at || nowIso,
      completed_at: nowIso,
      score,
      correct_answers: correctCount,
      total_questions: 6,
      status: 'COMPLETED',
      created_at: nowIso
    };

    app.attempts.push(attempt);
    app.attempt_count = attemptNumber;
    app.latest_score = score;
    app.latest_correct = correctCount;
    app.best_score = Math.max(app.best_score || 0, score);
    app.last_attempt_at = nowIso;
    app.next_attempt_at = nextAttemptAt;
    app.can_retake = canRetake;
    app.assessment_status = passedThreshold ? 'COMPLETED' : 'RETAKE_LOCKED';
    
    // Status update: do not automatically reject!
    if (passedThreshold) {
      app.application_status = 'UNDER_REVIEW';
    } else if (score >= 50) {
      app.application_status = 'PENDING_REVIEW';
    } else {
      app.application_status = 'BELOW_THRESHOLD';
    }

    app.updated_at = nowIso;

    this.addAuditLog(
      'score_calculated', 
      `Assessment evaluated for ${app.candidate.full_name}: ${correctCount}/6 correct (${score}%) - Status: ${app.application_status}`,
      app.candidate.email
    );

    this.saveDatabase();

    return {
      application: app,
      attempt,
      score,
      correctCount,
      totalQuestions: 6,
      passedThreshold,
      nextAttemptAt
    };
  }

  public updateEmailStatus(applicationId: string, status: EmailStatus, error?: string) {
    const app = this.getApplicationById(applicationId);
    if (app) {
      app.email_status = status;
      if (status === 'SENT') {
        app.email_sent_at = new Date().toISOString();
        this.addAuditLog('email_sent', `Recruitment email dispatched successfully for application ${applicationId}`);
      } else if (status === 'FAILED') {
        app.email_error = error || 'Transmission failed';
        this.addAuditLog('email_failed', `Failed sending notification email: ${error}`);
      }
      this.saveDatabase();
    }
  }

  public addToTalentPool(candidateData: Omit<TalentPoolCandidate, 'id' | 'created_at'>): TalentPoolCandidate {
    const entry: TalentPoolCandidate = {
      id: `tp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      ...candidateData,
      created_at: new Date().toISOString()
    };
    this.db.talent_pool.unshift(entry);
    this.addAuditLog('talent_pool_joined', `Candidate ${candidateData.full_name} (${candidateData.email}) joined the Talent Network. Areas: ${candidateData.areas_of_interest.join(', ')}`);
    this.saveDatabase();
    return entry;
  }

  public getTalentPool(): TalentPoolCandidate[] {
    return this.db.talent_pool;
  }

  public updateApplicationStatus(applicationId: string, status: ApplicationStatus, actor: string = 'admin'): Application | null {
    const app = this.getApplicationById(applicationId);
    if (!app) return null;
    app.application_status = status;
    app.updated_at = new Date().toISOString();
    this.addAuditLog('application_created', `Application status changed to ${status} for candidate ${app.candidate.full_name}`, actor);
    this.saveDatabase();
    return app;
  }

  public getAdminStats(): AdminStats {
    const apps = this.db.applications;
    const completedApps = apps.filter((a) => a.attempts.length > 0);
    const avgScore = completedApps.length > 0
      ? Number((completedApps.reduce((acc, curr) => acc + (curr.best_score || 0), 0) / completedApps.length).toFixed(2))
      : 0;

    return {
      total_applications: apps.length,
      open_positions: this.db.jobs.filter((j) => j.status === 'OPEN').length,
      assessments_completed: completedApps.length,
      average_score: avgScore,
      qualified_count: apps.filter((a) => a.best_score >= 70).length,
      developing_count: apps.filter((a) => a.best_score >= 50 && a.best_score < 70).length,
      below_threshold_count: apps.filter((a) => a.attempts.length > 0 && a.best_score < 50).length,
      email_sent_count: apps.filter((a) => a.email_status === 'SENT').length,
      email_pending_count: apps.filter((a) => a.email_status === 'PENDING').length,
      email_failed_count: apps.filter((a) => a.email_status === 'FAILED').length,
      recent_applications: apps.slice(0, 10)
    };
  }

  public handleDataSubjectRequest(email: string, requestType: 'ACCESS' | 'RECTIFY' | 'DELETE'): { success: boolean; message: string } {
    const now = new Date().toISOString();
    this.addAuditLog('privacy_request_received', `Data Subject Request (${requestType}) received for ${email}`);
    
    if (requestType === 'DELETE') {
      // Soft-delete/anonymize candidate data according to privacy policy
      this.db.applications = this.db.applications.filter((a) => a.candidate.email.toLowerCase() !== email.toLowerCase());
      this.db.candidates = this.db.candidates.filter((c) => c.email.toLowerCase() !== email.toLowerCase());
      this.db.talent_pool = this.db.talent_pool.filter((tp) => tp.email.toLowerCase() !== email.toLowerCase());
      this.saveDatabase();
      return { success: true, message: `Candidate records for ${email} have been permanently removed.` };
    }

    return { success: true, message: `Request ${requestType} registered. Our data governance committee will review and respond within legal terms.` };
  }
}

export const careersStore = new CareersStore();
