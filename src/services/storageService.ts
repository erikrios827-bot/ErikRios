import { GoodPractice, UserProfile, SystemAuditLog, SupportedLanguage } from '../types';
import { INITIAL_PRACTICES, INITIAL_USERS, INITIAL_DOMAINS, INITIAL_AUDIT_LOGS } from '../data/initialData';

const STORAGE_KEYS = {
  PRACTICES: 'upm_safety_practices_v3',
  CURRENT_USER: 'upm_current_user_v3',
  USERS: 'upm_users_v3',
  DOMAINS: 'upm_domains_v3',
  AUDIT_LOGS: 'upm_audit_logs_v3',
  LANGUAGE: 'upm_language_v3',
  COUNTRY: 'upm_country_v3',
  BOOKMARKS: 'upm_user_bookmarks_v3',
};

class StorageService {
  private get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn('Storage read failed', e);
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }

  // Practices
  getPractices(): GoodPractice[] {
    const practices = this.get<GoodPractice[]>(STORAGE_KEYS.PRACTICES, INITIAL_PRACTICES);
    // Enrich with INITIAL_PRACTICES localized translations and ensure latest multilingual dictionaries
    return practices.map(p => {
      const initial = INITIAL_PRACTICES.find(ip => ip.id === p.id);
      if (initial && initial.localized) {
        return { 
          ...p, 
          localized: {
            ...initial.localized,
            ...(p.localized || {})
          }
        };
      }
      return p;
    });
  }

  getPracticeById(id: string): GoodPractice | undefined {
    return this.getPractices().find(p => p.id === id);
  }

  savePractices(practices: GoodPractice[]): void {
    this.set(STORAGE_KEYS.PRACTICES, practices);
  }

  createPractice(practiceData: Partial<GoodPractice>, currentUser: UserProfile): GoodPractice {
    const practices = this.getPractices();
    const count = practices.length + 1;
    const year = new Date().getFullYear();
    const code = `SKP-${year}-${String(count).padStart(4, '0')}`;

    // Select designated 4 approvers
    const allUsers = this.getUsers();
    const defaultApprovers = allUsers
      .filter(u => u.role === 'approver')
      .slice(0, 4)
      .map(u => ({
        approverId: u.id,
        approverName: u.name,
        approverEmail: u.email,
        approverRole: u.department,
        decision: 'pending' as const,
      }));

    const newPractice: GoodPractice = {
      id: `p_${Date.now()}`,
      code,
      title: practiceData.title || 'Untitled Practice',
      subtitle: practiceData.subtitle || '',
      category: practiceData.category || 'Safety',
      country: practiceData.country || currentUser.country || 'Finland',
      countryCode: practiceData.countryCode || 'FI',
      site: practiceData.site || currentUser.site || 'Global Site',
      year,
      implementationDate: practiceData.implementationDate || new Date().toISOString().split('T')[0],
      version: '1.0',
      status: 'pending_approval',
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorEmail: currentUser.email,
      authorRole: currentUser.department || 'Employee',
      authorAvatar: currentUser.avatarUrl,
      createdAt: new Date().toISOString().split('T')[0],
      
      problemStatement: practiceData.problemStatement || '',
      initialSituation: practiceData.initialSituation || '',
      hazardIdentified: practiceData.hazardIdentified || '',
      potentialConsequences: practiceData.potentialConsequences || '',
      affectedScope: practiceData.affectedScope || '',

      rootCauseAnalysis: practiceData.rootCauseAnalysis || '',
      causeType: practiceData.causeType || 'technical',

      solutionDescription: practiceData.solutionDescription || '',
      actionDetails: practiceData.actionDetails || '',
      resourcesUsed: practiceData.resourcesUsed || '',
      applicabilityNote: practiceData.applicabilityNote || 'Requires local site risk assessment.',
      isReplicable: practiceData.isReplicable ?? true,

      resultsSummary: practiceData.resultsSummary || '',
      quantitativeImpact: practiceData.quantitativeImpact || '',
      qualitativeBenefits: practiceData.qualitativeBenefits || '',
      isVerified: false,

      beforeImage: practiceData.beforeImage,
      afterImage: practiceData.afterImage || '/src/assets/images/blade_protection_slitter_1792173516267.jpg',
      additionalImages: practiceData.additionalImages || [],
      documents: practiceData.documents || [
        { name: `${practiceData.title?.replace(/\s+/g, '_') || 'Practice'}_Standard.pdf`, size: '1.8 MB', type: 'application/pdf' }
      ],

      tags: practiceData.tags || ['Continuous Improvement', 'Safety'],
      riskType: practiceData.riskType || 'Operational safety',
      processType: practiceData.processType || 'Operations',
      equipmentType: practiceData.equipmentType || 'Standard machinery',
      practiceType: practiceData.practiceType || 'good_practice',

      approvers: defaultApprovers,
      revisionCount: 1,
      reactions: [],
      comments: [],
      bookmarksCount: 0,
      viewsCount: 1,
    };

    const updated = [newPractice, ...practices];
    this.savePractices(updated);
    this.logAction(currentUser, 'submit', newPractice.id, newPractice.code, `Submitted new proposal: ${newPractice.title}`);
    return newPractice;
  }

  // Unanimous Approval Flow Engine
  submitReviewDecision(
    practiceId: string,
    approverId: string,
    decision: 'approved' | 'rejected' | 'changes_requested',
    comments: string,
    currentUser: UserProfile
  ): GoodPractice | null {
    const practices = this.getPractices();
    const index = practices.findIndex(p => p.id === practiceId);
    if (index === -1) return null;

    const practice = { ...practices[index] };
    const approverIndex = practice.approvers.findIndex(a => a.approverId === approverId);
    
    if (approverIndex === -1) {
      // If user is admin acting on behalf or approver
      practice.approvers.push({
        approverId: currentUser.id,
        approverName: currentUser.name,
        approverEmail: currentUser.email,
        approverRole: currentUser.department,
        decision,
        decisionDate: new Date().toISOString().split('T')[0],
        comments,
      });
    } else {
      practice.approvers[approverIndex] = {
        ...practice.approvers[approverIndex],
        decision,
        decisionDate: new Date().toISOString().split('T')[0],
        comments,
      };
    }

    // Evaluate Unanimous Rule:
    // If ANY approver rejected, practice becomes REJECTED immediately!
    if (decision === 'rejected') {
      practice.status = 'rejected';
      practice.rejectionReason = comments;
      this.logAction(currentUser, 'reject', practice.id, practice.code, `Proposal rejected with reason: "${comments}"`);
    } else if (decision === 'changes_requested') {
      practice.status = 'changes_requested';
      this.logAction(currentUser, 'edit', practice.id, practice.code, `Requested changes: "${comments}"`);
    } else {
      // If approved, check if ALL assigned approvers are approved
      const totalApprovers = practice.approvers.length;
      const approvedCount = practice.approvers.filter(a => a.decision === 'approved').length;
      const hasAnyPending = practice.approvers.some(a => a.decision === 'pending');

      if (approvedCount === totalApprovers && totalApprovers >= 3) {
        practice.status = 'published';
        practice.publishedAt = new Date().toISOString().split('T')[0];
        practice.isVerified = true;
        this.logAction(currentUser, 'publish', practice.id, practice.code, `Unanimous approval reached (${approvedCount}/${totalApprovers}). Published to global hub!`);
      } else if (hasAnyPending) {
        practice.status = 'under_review';
        this.logAction(currentUser, 'approve', practice.id, practice.code, `Approved by ${currentUser.name} (${approvedCount}/${totalApprovers} approvals)`);
      }
    }

    practices[index] = practice;
    this.savePractices(practices);
    return practice;
  }

  // Resubmit practice after changes requested or rejected
  resubmitPractice(practiceId: string, updatedFields: Partial<GoodPractice>, currentUser: UserProfile): GoodPractice | null {
    const practices = this.getPractices();
    const index = practices.findIndex(p => p.id === practiceId);
    if (index === -1) return null;

    const practice = { ...practices[index], ...updatedFields };
    // Reset all approvers back to pending for unanimous re-evaluation
    practice.approvers = practice.approvers.map(a => ({
      ...a,
      decision: 'pending',
      decisionDate: undefined,
      comments: undefined,
    }));
    practice.status = 'pending_approval';
    practice.revisionCount = (practice.revisionCount || 1) + 1;
    practice.rejectionReason = undefined;

    practices[index] = practice;
    this.savePractices(practices);
    this.logAction(currentUser, 'submit', practice.id, practice.code, `Resubmitted revised version (Rev ${practice.revisionCount})`);
    return practice;
  }

  // Social interactions
  toggleReaction(practiceId: string, userId: string, type: 'useful' | 'excellent' | 'inspiring' | 'replicable'): GoodPractice | null {
    const practices = this.getPractices();
    const index = practices.findIndex(p => p.id === practiceId);
    if (index === -1) return null;

    const practice = { ...practices[index] };
    const existingIndex = practice.reactions.findIndex(r => r.userId === userId && r.type === type);

    if (existingIndex > -1) {
      practice.reactions = practice.reactions.filter((_, i) => i !== existingIndex);
    } else {
      practice.reactions = [...practice.reactions, { userId, type }];
    }

    practices[index] = practice;
    this.savePractices(practices);
    return practice;
  }

  addComment(practiceId: string, text: string, currentUser: UserProfile): GoodPractice | null {
    const practices = this.getPractices();
    const index = practices.findIndex(p => p.id === practiceId);
    if (index === -1) return null;

    const practice = { ...practices[index] };
    const newComment = {
      id: `c_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.department || currentUser.role,
      userAvatar: currentUser.avatarUrl,
      date: new Date().toISOString().split('T')[0],
      text,
    };
    practice.comments = [...practice.comments, newComment];
    practices[index] = practice;
    this.savePractices(practices);
    return practice;
  }

  toggleBookmark(practiceId: string, userId: string): boolean {
    const bookmarks = this.get<Record<string, string[]>>(STORAGE_KEYS.BOOKMARKS, {});
    const userBookmarks = bookmarks[userId] || [];
    const isBookmarked = userBookmarks.includes(practiceId);

    let updatedList: string[];
    if (isBookmarked) {
      updatedList = userBookmarks.filter(id => id !== practiceId);
    } else {
      updatedList = [...userBookmarks, practiceId];
    }
    bookmarks[userId] = updatedList;
    this.set(STORAGE_KEYS.BOOKMARKS, bookmarks);

    // Update count in practice
    const practices = this.getPractices();
    const pIdx = practices.findIndex(p => p.id === practiceId);
    if (pIdx > -1) {
      practices[pIdx].bookmarksCount = Math.max(0, (practices[pIdx].bookmarksCount || 0) + (isBookmarked ? -1 : 1));
      this.savePractices(practices);
    }

    return !isBookmarked;
  }

  getUserBookmarks(userId: string): string[] {
    const bookmarks = this.get<Record<string, string[]>>(STORAGE_KEYS.BOOKMARKS, {});
    return bookmarks[userId] || [];
  }

  incrementView(practiceId: string): void {
    const practices = this.getPractices();
    const index = practices.findIndex(p => p.id === practiceId);
    if (index > -1) {
      practices[index].viewsCount = (practices[index].viewsCount || 0) + 1;
      this.savePractices(practices);
    }
  }

  // Users & Auth
  getUsers(): UserProfile[] {
    return this.get<UserProfile[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  }

  getCurrentUser(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]); // Erik Ríos by default for rich showcase
  }

  setCurrentUser(user: UserProfile): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  // Domains
  getAllowedDomains(): string[] {
    return this.get<string[]>(STORAGE_KEYS.DOMAINS, INITIAL_DOMAINS);
  }

  addAllowedDomain(domain: string, currentUser: UserProfile): boolean {
    const clean = domain.trim().toLowerCase().replace(/^@/, '');
    const domains = this.getAllowedDomains();
    if (domains.includes(clean)) return false;
    const updated = [...domains, clean];
    this.set(STORAGE_KEYS.DOMAINS, updated);
    this.logAction(currentUser, 'domain_update', undefined, undefined, `Added authorized corporate domain: @${clean}`);
    return true;
  }

  removeAllowedDomain(domain: string, currentUser: UserProfile): void {
    const domains = this.getAllowedDomains();
    const updated = domains.filter(d => d !== domain);
    this.set(STORAGE_KEYS.DOMAINS, updated);
    this.logAction(currentUser, 'domain_update', undefined, undefined, `Removed authorized corporate domain: @${domain}`);
  }

  isEmailDomainAllowed(email: string): boolean {
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const domain = parts[1].toLowerCase();
    return this.getAllowedDomains().includes(domain);
  }

  // Preferences
  getLanguage(): SupportedLanguage {
    return this.get<SupportedLanguage>(STORAGE_KEYS.LANGUAGE, 'es');
  }

  setLanguage(lang: SupportedLanguage): void {
    this.set(STORAGE_KEYS.LANGUAGE, lang);
  }

  getCountry(): string {
    return this.get<string>(STORAGE_KEYS.COUNTRY, 'Finland');
  }

  setCountry(country: string): void {
    this.set(STORAGE_KEYS.COUNTRY, country);
  }

  // Audit Log
  getAuditLogs(): SystemAuditLog[] {
    return this.get<SystemAuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  private logAction(
    user: UserProfile, 
    action: SystemAuditLog['action'], 
    practiceId?: string, 
    practiceCode?: string, 
    details: string = ''
  ): void {
    const logs = this.getAuditLogs();
    const newLog: SystemAuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: user.id,
      userName: user.name,
      action,
      practiceId,
      practiceCode,
      details,
    };
    this.set(STORAGE_KEYS.AUDIT_LOGS, [newLog, ...logs]);
  }
}

export const storageService = new StorageService();
