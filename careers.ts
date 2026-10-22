export type JobStatus = 'DRAFT' | 'OPEN' | 'PAUSED' | 'CLOSED' | 'ARCHIVED';

export type WorkMode = 'REMOTE' | 'HYBRID' | 'ONSITE' | 'FIELD' | 'PROJECT_BASED';

export type EmploymentType = 
  | 'FULL_TIME' 
  | 'PART_TIME' 
  | 'CONTRACT' 
  | 'PROJECT' 
  | 'INTERNSHIP' 
  | 'FREELANCE' 
  | 'TALENT_POOL';

export type JobCategory = 
  | 'PENTAHYDRA SYSTEMS'
  | 'ENGINEERING'
  | 'ENVIRONMENT & ESG'
  | 'MINING & GEOINTELLIGENCE'
  | 'FORESTRY & AGRICULTURE'
  | 'MARITIME & OFFSHORE'
  | 'ENERGY'
  | 'DIGITAL ENGINEERING'
  | 'FORENSICS & AUDITING'
  | 'PROJECTS & BUSINESS'
  | 'CORPORATE';

export type AssessmentProfile = 
  | 'AI_ENGINEERING'
  | 'GEN_AI'
  | 'DATA'
  | 'CYBERSECURITY'
  | 'EMBEDDED'
  | 'IOT'
  | 'EDGE_AI'
  | 'SOFTWARE'
  | 'ENVIRONMENTAL_ENGINEERING'
  | 'MINING'
  | 'GEOAI'
  | 'RENEWABLE_ENERGY'
  | 'MARITIME'
  | 'ESG'
  | 'FORESTRY'
  | 'CIVIL_ENGINEERING'
  | 'FORENSICS_AUDIT'
  | 'PROJECT_MANAGEMENT';

export type ApplicationStatus = 
  | 'PENDING_REVIEW'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'BELOW_THRESHOLD'
  | 'REJECTED'
  | 'WITHDRAWN';

export type AssessmentStatus = 
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'RETAKE_LOCKED'
  | 'EXPIRED';

export type EmailStatus = 'PENDING' | 'SENT' | 'FAILED';

export interface Job {
  id: string;
  title: string;
  titleEn: string;
  department: string;
  division: string; // e.g. 'Kraefegg M.O.' or 'PentaHydra Systems'
  category: JobCategory;
  location: string;
  work_mode: WorkMode;
  employment_type: EmploymentType;
  seniority: 'JUNIOR' | 'MID_LEVEL' | 'SENIOR' | 'SPECIALIST' | 'LEAD' | 'PRINCIPAL';
  description: string;
  descriptionEn: string;
  responsibilities: string[];
  requirements: string[];
  preferred_skills: string[];
  technical_skills: string[];
  professional_registration_required?: string; // e.g. 'CREA/CONFEA', 'CRBio', 'CRQ'
  education_required: string;
  assessment_profile: AssessmentProfile;
  assessment_threshold: number; // default 70
  status: JobStatus;
  is_demo: boolean; // true for sample vacancies
  created_at: string;
  updated_at: string;
  closing_date?: string;
}

export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  linkedin_url: string;
  phone_optional?: string;
  city_optional?: string;
  country: string;
  consent: boolean;
  created_at: string;
}

export interface AssessmentQuestionPublic {
  id: string;
  assessment_profile: AssessmentProfile;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  question: string;
  options: string[];
  skills: string[];
}

export interface AssessmentAttempt {
  id: string;
  application_id: string;
  attempt_number: number;
  started_at: string;
  completed_at: string;
  score: number; // percentage rounded to 2 decimal places e.g. 83.33
  correct_answers: number; // e.g. 5
  total_questions: number; // exactly 6
  status: 'STARTED' | 'COMPLETED' | 'ABANDONED' | 'INVALID';
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  action: 
    | 'application_created'
    | 'assessment_started'
    | 'assessment_completed'
    | 'score_calculated'
    | 'retake_locked'
    | 'retake_unlocked'
    | 'email_sent'
    | 'email_failed'
    | 'email_retried'
    | 'admin_viewed_application'
    | 'admin_exported_data'
    | 'talent_pool_joined'
    | 'privacy_request_received';
  details: string;
  timestamp: string;
  actor?: string;
}

export interface Application {
  id: string;
  candidate_id: string;
  job_id: string;
  candidate: Candidate;
  job_title: string;
  department: string;
  division: string;
  linkedin_url: string;
  application_status: ApplicationStatus;
  assessment_status: AssessmentStatus;
  assessment_profile: AssessmentProfile;
  best_score: number;
  latest_score: number;
  latest_correct: number;
  total_questions: number;
  attempt_count: number;
  last_attempt_at: string | null;
  next_attempt_at: string | null;
  can_retake: boolean;
  retake_wait_seconds?: number;
  submitted_at: string;
  created_at: string;
  updated_at: string;
  email_status: EmailStatus;
  email_sent_at?: string;
  email_error?: string;
  attempts: AssessmentAttempt[];
  audit_logs: AuditLogEntry[];
}

export interface TalentPoolCandidate {
  id: string;
  full_name: string;
  email: string;
  linkedin_url: string;
  areas_of_interest: string[];
  skills: string[];
  notes?: string;
  consent: boolean;
  created_at: string;
}

export interface AdminStats {
  total_applications: number;
  open_positions: number;
  assessments_completed: number;
  average_score: number;
  qualified_count: number; // score >= 70%
  developing_count: number; // 50 - 69.99%
  below_threshold_count: number; // < 50%
  email_sent_count: number;
  email_pending_count: number;
  email_failed_count: number;
  recent_applications: Application[];
}
