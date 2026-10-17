export type PracticeStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'under_review' 
  | 'changes_requested' 
  | 'rejected' 
  | 'approved' 
  | 'published';

export type PracticeCategory =
  | 'Safety'
  | 'Quality'
  | 'Productivity'
  | 'Efficiency'
  | '5S & Workplace'
  | 'Environment'
  | 'Wellbeing & Ergonomics'
  | 'Maintenance'
  | 'Digitalisation & Automation'
  | 'Cost Reduction'
  | 'Standardisation'
  | 'Chemical'
  | 'Logistics';

export interface ApproverDecision {
  approverId: string;
  approverName: string;
  approverEmail: string;
  approverRole: string;
  avatarUrl?: string;
  decision: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  decisionDate?: string;
  comments?: string;
}

export interface PracticeComment {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar?: string;
  date: string;
  text: string;
}

export interface PracticeReaction {
  userId: string;
  type: 'useful' | 'excellent' | 'inspiring' | 'replicable';
}

export interface GoodPractice {
  id: string;
  code: string; // e.g. SKP-2024-0156
  title: string;
  subtitle: string;
  category: PracticeCategory;
  country: string;
  countryCode: string;
  site: string; // e.g. Kymi Mill, Fray Bentos, Augsburg
  year: number;
  implementationDate: string;
  version: string;
  status: PracticeStatus;
  
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorRole: string;
  authorAvatar?: string;
  createdAt: string;
  publishedAt?: string;

  // Problem statement
  problemStatement: string;
  initialSituation: string;
  hazardIdentified: string;
  potentialConsequences: string;
  affectedScope: string;

  // Root cause
  rootCauseAnalysis: string;
  causeType: 'technical' | 'procedural' | 'organizational' | 'human_factors' | 'equipment';

  // Solution
  solutionDescription: string;
  actionDetails: string;
  resourcesUsed?: string;
  applicabilityNote: string;
  isReplicable: boolean;

  // Results & Impact
  resultsSummary: string;
  quantitativeImpact?: string;
  qualitativeBenefits: string;
  measurementPeriod?: string;
  isVerified: boolean;

  // Visual evidence
  beforeImage?: string;
  afterImage: string;
  additionalImages?: string[];
  documents?: { name: string; size: string; type: string }[];

  // Taxonomies
  tags: string[];
  riskType: string;
  processType: string;
  equipmentType: string;
  practiceType: 'good_practice' | 'lesson_learned' | 'standard_procedure';

  // Workflow
  approvers: ApproverDecision[];
  revisionCount: number;
  rejectionReason?: string;

  // Social
  reactions: PracticeReaction[];
  comments: PracticeComment[];
  bookmarksCount: number;
  viewsCount: number;

  // Multilingual content overrides
  localized?: Partial<Record<SupportedLanguage, {
    title?: string;
    subtitle?: string;
    category?: PracticeCategory;
    problemStatement?: string;
    initialSituation?: string;
    hazardIdentified?: string;
    potentialConsequences?: string;
    rootCauseAnalysis?: string;
    solutionDescription?: string;
    actionDetails?: string;
    resourcesUsed?: string;
    resultsSummary?: string;
    quantitativeImpact?: string;
    qualitativeBenefits?: string;
    applicabilityNote?: string;
    tags?: string[];
    riskType?: string;
    processType?: string;
    equipmentType?: string;
    authorRole?: string;
    causeType?: 'technical' | 'procedural' | 'organizational' | 'human_factors' | 'equipment';
    approvers?: ApproverDecision[];
    comments?: PracticeComment[];
    documents?: { name: string; size: string; type: string }[];
  }>>;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'safety_expert' | 'approver' | 'admin' | 'guest';
  department: string;
  country: string;
  site: string;
  avatarUrl?: string;
  isAuthorizedDomain: boolean;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'submit' | 'approve' | 'reject' | 'publish' | 'edit' | 'domain_update' | 'role_change';
  practiceId?: string;
  practiceCode?: string;
  details: string;
}

export type SupportedLanguage = 'en' | 'es' | 'fi' | 'de' | 'pt';
