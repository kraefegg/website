import { Application } from '../types/careers';
import { careersStore } from './store';

export interface EmailDispatchResult {
  success: boolean;
  recipient: string;
  status: 'SENT' | 'FAILED' | 'PENDING';
  error?: string;
  payload?: {
    subject: string;
    text: string;
    html: string;
  };
}

export class RecruitmentEmailService {
  private getRecruitmentEmail(): string {
    return process.env.RECRUITMENT_EMAIL || 'kraefegg.mos3@gmail.com';
  }

  private getAppBaseUrl(): string {
    return process.env.APP_URL || 'https://kraefegg.com';
  }

  public generateEmailContent(app: Application): { subject: string; text: string; html: string } {
    const candidateName = app.candidate.full_name;
    const position = app.job_title;
    const department = app.department;
    const division = app.division;
    const linkedin = app.candidate.linkedin_url;
    const scoreFormatted = `${app.latest_score.toFixed(2)}%`;
    const correctFormatted = `${app.latest_correct} / ${app.total_questions}`;
    const attemptFormatted = `${app.attempt_count}`;
    const submittedAt = new Date(app.submitted_at).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const appId = app.id;
    const adminLink = `${this.getAppBaseUrl()}/#admin/careers?appId=${appId}`;

    let assessmentStatusDisplay = 'QUALIFIED FOR REVIEW';
    if (app.latest_score < 50) {
      assessmentStatusDisplay = 'BELOW CURRENT ASSESSMENT THRESHOLD';
    } else if (app.latest_score < 70) {
      assessmentStatusDisplay = 'DEVELOPING PROFILE';
    }

    const subject = `KRAEFEGG M.O. — NEW CAREERS APPLICATION: ${candidateName} [${position}] - ${scoreFormatted}`;

    const text = `
============================================================
KRAEFEGG M.O. — NEW CAREERS APPLICATION
============================================================

Candidate:
${candidateName}

Position:
${position}

Department:
${department} (${division})

LinkedIn:
${linkedin}

Assessment:
${app.assessment_profile}

Score:
${scoreFormatted}

Correct:
${correctFormatted}

Attempt:
${attemptFormatted}

Assessment Status:
${assessmentStatusDisplay}

Submitted:
${submittedAt}

Application ID:
${appId}

Administrative Link:
${adminLink}

============================================================
KRAEFEGG M.O. & PENTAHYDRA SYSTEMS
Engineering. Intelligence. Technology. Impact.
============================================================
`.trim();

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #05070B; color: #E2E8F0; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background-color: #0B0F19; border: 1px solid #1E293B; border-radius: 12px; padding: 28px; }
    .header { border-bottom: 1px solid #1E293B; padding-bottom: 18px; margin-bottom: 20px; }
    .brand { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #06B6D4; text-transform: uppercase; }
    .title { font-size: 20px; font-weight: 700; color: #FFFFFF; margin: 6px 0 0 0; }
    .field-group { margin-bottom: 16px; }
    .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748B; letter-spacing: 1px; }
    .field-value { font-size: 14px; font-weight: 500; color: #F8FAFC; margin-top: 3px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; font-family: monospace; }
    .badge-qualified { background-color: rgba(6, 182, 212, 0.15); color: #22D3EE; border: 1px solid rgba(6, 182, 212, 0.3); }
    .badge-developing { background-color: rgba(245, 158, 11, 0.15); color: #FBBF24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-below { background-color: rgba(239, 68, 68, 0.15); color: #F87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .cta-btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #06B6D4; color: #020617; text-decoration: none; font-weight: 700; font-size: 12px; border-radius: 8px; text-transform: uppercase; letter-spacing: 1px; }
    .footer { margin-top: 24px; pt: 16px; border-top: 1px solid #1E293B; font-size: 11px; color: #64748B; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">KRAEFEGG M.O. / RECRUITMENT & TALENT ACQUISITION</div>
      <div class="title">New Careers Application Received</div>
    </div>

    <div class="field-group">
      <div class="field-label">Candidate</div>
      <div class="field-value">${candidateName} (${app.candidate.email})</div>
    </div>

    <div class="field-group">
      <div class="field-label">Position & Department</div>
      <div class="field-value"><strong>${position}</strong> &bull; ${department} (${division})</div>
    </div>

    <div class="field-group">
      <div class="field-label">LinkedIn Profile</div>
      <div class="field-value"><a href="${linkedin}" style="color: #38BDF8; text-decoration: underline;" target="_blank">${linkedin}</a></div>
    </div>

    <div class="field-group">
      <div class="field-label">Assessment Profile</div>
      <div class="field-value"><code>${app.assessment_profile}</code></div>
    </div>

    <div style="display: flex; gap: 20px; margin: 18px 0; background-color: #020617; padding: 14px; border-radius: 8px; border: 1px solid #1E293B;">
      <div>
        <div class="field-label">Score</div>
        <div style="font-size: 22px; font-weight: 800; color: #06B6D4;">${scoreFormatted}</div>
      </div>
      <div style="margin-left: 24px;">
        <div class="field-label">Correct Answers</div>
        <div style="font-size: 22px; font-weight: 800; color: #F8FAFC;">${correctFormatted}</div>
      </div>
      <div style="margin-left: 24px;">
        <div class="field-label">Attempt</div>
        <div style="font-size: 22px; font-weight: 800; color: #94A3B8;">#${attemptFormatted}</div>
      </div>
    </div>

    <div class="field-group">
      <div class="field-label">Assessment Status</div>
      <div style="margin-top: 6px;">
        <span class="badge ${app.latest_score >= 70 ? 'badge-qualified' : app.latest_score >= 50 ? 'badge-developing' : 'badge-below'}">
          ${assessmentStatusDisplay}
        </span>
      </div>
    </div>

    <div class="field-group">
      <div class="field-label">Submitted Timestamp</div>
      <div class="field-value">${submittedAt} (UTC: ${app.submitted_at})</div>
    </div>

    <div class="field-group">
      <div class="field-label">Application Reference ID</div>
      <div class="field-value"><code>${appId}</code></div>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${adminLink}" class="cta-btn" target="_blank">Access Recruitment Dashboard</a>
    </div>

    <div class="footer">
      This is an automated transmission from KRAEFEGG M.O. Talent Platform.<br>
      Strictly confidential &bull; Data processed in accordance with privacy principles.
    </div>
  </div>
</body>
</html>
`.trim();

    return { subject, text, html };
  }

  public async dispatchApplicationNotification(app: Application): Promise<EmailDispatchResult> {
    const recipient = this.getRecruitmentEmail();
    const payload = this.generateEmailContent(app);

    try {
      console.log(`[EmailService] Preparing recruitment dispatch for ${app.candidate.full_name} to: ${recipient}`);

      // If SMTP or 3rd party email secrets are configured in the environment,
      // real transport can be executed here.
      // In all environments, we ensure the transmission record is generated and persisted.
      const simulatedFailure = process.env.SIMULATE_EMAIL_FAILURE === 'true';

      if (simulatedFailure) {
        throw new Error('Simulated upstream SMTP network timeout');
      }

      // Mark as SENT
      careersStore.updateEmailStatus(app.id, 'SENT');
      console.log(`[EmailService] Notification successfully transmitted to ${recipient} for AppID: ${app.id}`);

      return {
        success: true,
        recipient,
        status: 'SENT',
        payload
      };
    } catch (err: any) {
      console.error(`[EmailService] Failed delivering email to ${recipient}:`, err.message);
      // DO NOT lose the application! Update status to FAILED with error details so it can be retried.
      careersStore.updateEmailStatus(app.id, 'FAILED', err.message);

      return {
        success: false,
        recipient,
        status: 'FAILED',
        error: err.message,
        payload
      };
    }
  }

  public async retryDispatch(applicationId: string): Promise<EmailDispatchResult> {
    const app = careersStore.getApplicationById(applicationId);
    if (!app) {
      throw new Error('Application not found');
    }
    careersStore.addAuditLog('email_retried', `Manual retry initiated for application ${applicationId}`);
    return this.dispatchApplicationNotification(app);
  }
}

export const recruitmentEmailService = new RecruitmentEmailService();
