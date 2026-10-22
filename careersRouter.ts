import { Router, Request, Response } from 'express';
import { careersStore } from './store';
import { recruitmentEmailService } from './emailService';
import { AssessmentQuestionPublic, ApplicationStatus } from '../types/careers';

export const careersRouter = Router();

// ==========================================
// 1. GET /api/careers/jobs
// ==========================================
careersRouter.get('/jobs', (req: Request, res: Response) => {
  try {
    const { category, department, work_mode, employment_type, search } = req.query;
    let jobs = careersStore.getJobs();

    if (category && typeof category === 'string' && category !== 'ALL') {
      jobs = jobs.filter((j) => j.category === category);
    }
    if (department && typeof department === 'string') {
      jobs = jobs.filter((j) => j.department.toLowerCase().includes(department.toLowerCase()));
    }
    if (work_mode && typeof work_mode === 'string' && work_mode !== 'ALL') {
      jobs = jobs.filter((j) => j.work_mode === work_mode);
    }
    if (employment_type && typeof employment_type === 'string' && employment_type !== 'ALL') {
      jobs = jobs.filter((j) => j.employment_type === employment_type);
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      const isRemoteQuery = q.includes('home office') || q.includes('homeoffice') || q.includes('remot');
      jobs = jobs.filter(
        (j) =>
          (isRemoteQuery && j.work_mode === 'REMOTE') ||
          j.title.toLowerCase().includes(q) ||
          j.titleEn.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.technical_skills.some((s) => s.toLowerCase().includes(q)) ||
          j.division.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to load positions. Please try again.' });
  }
});

// ==========================================
// 2. GET /api/careers/jobs/:id
// ==========================================
careersRouter.get('/jobs/:id', (req: Request, res: Response) => {
  try {
    const job = careersStore.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Position not found.' });
    }
    res.json({ success: true, job });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to load this position.' });
  }
});

// ==========================================
// 3. POST /api/careers/apply (Step 1 & 2)
// ==========================================
careersRouter.post('/apply', (req: Request, res: Response) => {
  try {
    const { jobId, fullName, email, linkedinUrl, phone, city, country, consent } = req.body;

    if (!jobId || !fullName || !email || !linkedinUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: Full Name, Email, and LinkedIn URL are mandatory.'
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address format.' });
    }

    // Validate LinkedIn URL
    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w\-_%]+\/?.*$/i;
    if (!linkedinRegex.test(linkedinUrl)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid LinkedIn URL format. Please provide a valid URL like: https://www.linkedin.com/in/username'
      });
    }

    // Validate mandatory consent
    if (!consent) {
      return res.status(400).json({
        success: false,
        error: 'Consent to data processing for recruitment purposes is required.'
      });
    }

    const job = careersStore.getJobById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Referenced position not found.' });
    }

    const { application, isNew } = careersStore.createOrUpdateApplication(
      {
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        linkedin_url: linkedinUrl.trim(),
        phone_optional: phone ? phone.trim() : undefined,
        city_optional: city ? city.trim() : undefined,
        country: country ? country.trim() : 'Brasil',
        consent: Boolean(consent)
      },
      job
    );

    // Check 24h lock
    let retakeLocked = false;
    let lockExpiresAt: string | null = null;
    let remainingSeconds = 0;

    if (application.next_attempt_at) {
      const lockUntil = new Date(application.next_attempt_at).getTime();
      const now = Date.now();
      if (now < lockUntil) {
        retakeLocked = true;
        lockExpiresAt = application.next_attempt_at;
        remainingSeconds = Math.ceil((lockUntil - now) / 1000);
      }
    }

    res.json({
      success: true,
      applicationId: application.id,
      candidate: application.candidate,
      isNew,
      retakeLocked,
      lockExpiresAt,
      remainingSeconds,
      bestScore: application.best_score,
      attemptCount: application.attempt_count
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Your application could not be completed.' });
  }
});

// ==========================================
// 4. GET /api/careers/assessment/:jobId/start
// Returns exactly 6 questions without correct answers!
// ==========================================
careersRouter.get('/assessment/:jobId/start', (req: Request, res: Response) => {
  try {
    const job = careersStore.getJobById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ success: false, error: 'Position not found.' });
    }

    const serverQuestions = careersStore.selectSixQuestions(job.assessment_profile);

    // CRITICAL: Filter out correct_answer and explanation before sending to client!
    const publicQuestions: AssessmentQuestionPublic[] = serverQuestions.map((q) => ({
      id: q.id,
      assessment_profile: q.assessment_profile,
      difficulty: q.difficulty,
      question: q.question,
      options: q.options,
      skills: q.skills
    }));

    res.json({
      success: true,
      jobId: job.id,
      jobTitle: job.title,
      assessmentProfile: job.assessment_profile,
      threshold: job.assessment_threshold,
      totalQuestions: 6,
      questions: publicQuestions
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to start technical assessment.' });
  }
});

// ==========================================
// 5. POST /api/careers/assessment/submit
// Server-side scoring calculation & 24h lock enforcement
// ==========================================
careersRouter.post('/assessment/submit', async (req: Request, res: Response) => {
  try {
    const { applicationId, questionIds, answers } = req.body;

    if (!applicationId || !Array.isArray(questionIds) || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payload: applicationId, questionIds (array of 6), and answers (array of 6) are required.'
      });
    }

    if (questionIds.length !== 6 || answers.length !== 6) {
      return res.status(400).json({
        success: false,
        error: 'The assessment strictly requires exactly 6 answered questions.'
      });
    }

    // Evaluate answers server-side
    const result = careersStore.evaluateAssessment(applicationId, questionIds, answers);

    // Trigger corporate notification email asynchronously
    recruitmentEmailService.dispatchApplicationNotification(result.application).catch((emailErr) => {
      console.warn('[CareersRouter] Asynchronous email dispatch error:', emailErr);
    });

    res.json({
      success: true,
      applicationId: result.application.id,
      score: result.score,
      correctCount: result.correctCount,
      totalQuestions: 6,
      passedThreshold: result.passedThreshold,
      assessmentStatus: result.application.assessment_status,
      applicationStatus: result.application.application_status,
      nextAttemptAt: result.nextAttemptAt,
      attemptNumber: result.attempt.attempt_number,
      message: result.passedThreshold
        ? 'Your assessment has been submitted successfully. Your application will be reviewed by the KRAEFEGG M.O. recruitment team.'
        : 'Your result is below the current assessment threshold. Depending on the position, another attempt may become available after 24 hours.'
    });
  } catch (err: any) {
    if (err.message && err.message.startsWith('RETAKE_LOCKED')) {
      return res.status(429).json({
        success: false,
        retakeLocked: true,
        error: err.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Unable to submit your assessment. Please try again.'
    });
  }
});

// ==========================================
// 6. GET /api/careers/retake-status/:applicationId
// Authoritative server timestamp check
// ==========================================
careersRouter.get('/retake-status/:applicationId', (req: Request, res: Response) => {
  try {
    const app = careersStore.getApplicationById(req.params.applicationId);
    if (!app) {
      return res.status(404).json({ success: false, error: 'Application not found.' });
    }

    const now = Date.now();
    let isLocked = false;
    let remainingSeconds = 0;

    if (app.next_attempt_at) {
      const lockUntil = new Date(app.next_attempt_at).getTime();
      if (now < lockUntil) {
        isLocked = true;
        remainingSeconds = Math.ceil((lockUntil - now) / 1000);
      }
    }

    res.json({
      success: true,
      applicationId: app.id,
      isLocked,
      remainingSeconds,
      nextAttemptAt: app.next_attempt_at,
      lastAttemptAt: app.last_attempt_at,
      attemptCount: app.attempt_count,
      bestScore: app.best_score
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to retrieve retake status.' });
  }
});

// ==========================================
// 7. POST /api/careers/talent-pool
// Join Talent Network
// ==========================================
careersRouter.post('/talent-pool', (req: Request, res: Response) => {
  try {
    const { fullName, email, linkedinUrl, areasOfInterest, skills, notes, consent } = req.body;

    if (!fullName || !email || !linkedinUrl) {
      return res.status(400).json({
        success: false,
        error: 'Full Name, Email, and LinkedIn URL are mandatory.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address format.' });
    }

    const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[\w\-_%]+\/?.*$/i;
    if (!linkedinRegex.test(linkedinUrl)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid LinkedIn URL (https://www.linkedin.com/in/...)'
      });
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        error: 'Consent to data processing is required.'
      });
    }

    const entry = careersStore.addToTalentPool({
      full_name: fullName.trim(),
      email: email.trim().toLowerCase(),
      linkedin_url: linkedinUrl.trim(),
      areas_of_interest: Array.isArray(areasOfInterest) ? areasOfInterest : ['GENERAL'],
      skills: Array.isArray(skills) ? skills : [],
      notes: notes ? notes.trim() : undefined,
      consent: Boolean(consent)
    });

    res.json({
      success: true,
      message: 'Successfully registered in KRAEFEGG M.O. Global Talent Network.',
      entry
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to join Talent Network. Please try again.' });
  }
});

// ==========================================
// 8. GET /api/careers/admin/stats
// ==========================================
careersRouter.get('/admin/stats', (req: Request, res: Response) => {
  try {
    const stats = careersStore.getAdminStats();
    res.json({ success: true, stats });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to load recruitment statistics.' });
  }
});

// ==========================================
// 9. GET /api/careers/admin/applications
// ==========================================
careersRouter.get('/admin/applications', (req: Request, res: Response) => {
  try {
    const { status, search, minScore, maxScore, department } = req.query;
    let apps = careersStore.getAllApplications();

    if (status && typeof status === 'string' && status !== 'ALL') {
      apps = apps.filter((a) => a.application_status === status);
    }
    if (department && typeof department === 'string') {
      apps = apps.filter((a) => a.department.toLowerCase().includes(department.toLowerCase()));
    }
    if (minScore && !isNaN(Number(minScore))) {
      apps = apps.filter((a) => a.best_score >= Number(minScore));
    }
    if (maxScore && !isNaN(Number(maxScore))) {
      apps = apps.filter((a) => a.best_score <= Number(maxScore));
    }
    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      apps = apps.filter(
        (a) =>
          a.candidate.full_name.toLowerCase().includes(q) ||
          a.candidate.email.toLowerCase().includes(q) ||
          a.job_title.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: apps.length,
      applications: apps
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to load applications list.' });
  }
});

// ==========================================
// 10. POST /api/careers/admin/applications/:id/status
// ==========================================
careersRouter.post('/admin/applications/:id/status', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const allowed: ApplicationStatus[] = [
      'PENDING_REVIEW',
      'UNDER_REVIEW',
      'SHORTLISTED',
      'BELOW_THRESHOLD',
      'REJECTED',
      'WITHDRAWN'
    ];

    if (!status || !allowed.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid application status provided.' });
    }

    const updated = careersStore.updateApplicationStatus(req.params.id, status, 'admin');
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Application not found.' });
    }

    res.json({ success: true, application: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to update status.' });
  }
});

// ==========================================
// 11. POST /api/careers/admin/applications/:id/retry-email
// ==========================================
careersRouter.post('/admin/applications/:id/retry-email', async (req: Request, res: Response) => {
  try {
    const result = await recruitmentEmailService.retryDispatch(req.params.id);
    res.json({ success: result.success, result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Failed retrying email dispatch.' });
  }
});

// ==========================================
// 12. GET /api/careers/admin/audit-logs
// ==========================================
careersRouter.get('/admin/audit-logs', (req: Request, res: Response) => {
  try {
    const logs = careersStore.getAuditLogs();
    res.json({ success: true, logs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to load audit logs.' });
  }
});

// ==========================================
// 13. POST /api/careers/privacy/request (LGPD / Privacy)
// ==========================================
careersRouter.post('/privacy/request', (req: Request, res: Response) => {
  try {
    const { email, requestType } = req.body;
    if (!email || !requestType) {
      return res.status(400).json({ success: false, error: 'Email and requestType are required.' });
    }
    const result = careersStore.handleDataSubjectRequest(email, requestType);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Unable to process privacy request.' });
  }
});
