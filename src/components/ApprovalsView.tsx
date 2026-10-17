import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  UserCheck, 
  Eye, 
  FileEdit, 
  MessageSquare,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { GoodPractice, SupportedLanguage, UserProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getLocalizedPractice, translateCategory, translateStatus } from '../utils/localization';

interface ApprovalsViewProps {
  practices: GoodPractice[];
  currentUser: UserProfile;
  lang: SupportedLanguage;
  onSelectPractice: (practice: GoodPractice) => void;
  onReviewDecision: (
    practiceId: string, 
    approverId: string, 
    decision: 'approved' | 'rejected' | 'changes_requested', 
    comments: string
  ) => void;
}

export const ApprovalsView: React.FC<ApprovalsViewProps> = ({
  practices,
  currentUser,
  lang,
  onSelectPractice,
  onReviewDecision,
}) => {
  const [selectedPracticeId, setSelectedPracticeId] = useState<string | null>(null);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<'approved' | 'rejected' | 'changes_requested'>('approved');
  const [decisionComment, setDecisionComment] = useState('');
  const [selectedApproverId, setSelectedApproverId] = useState(currentUser.id);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const pendingOrInReview = practices.filter(p => 
    p.status === 'pending_approval' || 
    p.status === 'under_review' || 
    p.status === 'changes_requested' ||
    p.status === 'rejected'
  );

  const openDecisionModal = (practiceId: string, decision: 'approved' | 'rejected' | 'changes_requested', approverId?: string) => {
    setSelectedPracticeId(practiceId);
    setCurrentDecision(decision);
    setDecisionComment('');
    setSelectedApproverId(approverId || currentUser.id);
    setDecisionModalOpen(true);
  };

  const handleConfirmDecision = () => {
    if (!selectedPracticeId) return;

    if (currentDecision === 'rejected' && !decisionComment.trim()) {
      const msg = lang === 'es'
        ? 'El comentario de justificación técnica es obligatorio al rechazar una propuesta (según política corporativa).'
        : lang === 'fi'
        ? 'Tekninen perustelukommentti on pakollinen hylättäessä ehdotus (konserniohjeen mukaisesti).'
        : lang === 'de'
        ? 'Eine fachliche Begründung ist bei einer Ablehnung verpflichtend (Konzernrichtlinie).'
        : lang === 'pt'
        ? 'O comentário de justificativa técnica é obrigatório ao rejeitar uma proposta (conforme política corporativa).'
        : 'Justification comment is mandatory when rejecting a practice (as required by corporate policy).';
      alert(msg);
      return;
    }

    onReviewDecision(selectedPracticeId, selectedApproverId, currentDecision, decisionComment.trim());
    setDecisionModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              {t.consensus_engine_title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {t.consensus_engine_desc}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700" />
            <span>{pendingOrInReview.filter(p => p.status !== 'rejected').length} {t.pending_reviews_badge}</span>
          </div>
        </div>
      </div>

      {/* Review Queue List */}
      <div className="space-y-4">
        {pendingOrInReview.length > 0 ? (
          pendingOrInReview.map((origPractice) => {
            const practice = getLocalizedPractice(origPractice, lang);
            const approvedCount = practice.approvers.filter(a => a.decision === 'approved').length;
            const totalApprovers = practice.approvers.length;
            const hasRejection = practice.approvers.some(a => a.decision === 'rejected');
            const displayCat = translateCategory(practice.category, lang);

            return (
              <div 
                key={practice.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4 hover:border-emerald-500/50 transition-colors"
              >
                {/* Top Title & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img 
                        src={practice.afterImage || practice.beforeImage} 
                        alt="" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400 font-semibold">{practice.code}</span>
                        <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {displayCat}
                        </span>
                        <span className="text-xs text-slate-500">· {practice.site}, {practice.country}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {practice.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {t.submitted_by} <strong>{practice.authorName}</strong> ({practice.authorRole}) {t.on_date} {practice.createdAt}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="text-right shrink-0">
                    {hasRejection ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        {t.status_rejected_badge}
                      </span>
                    ) : practice.status === 'published' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {t.status_published_badge}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        <Clock className="w-3.5 h-3.5" />
                        {approvedCount}/{totalApprovers} {t.status_under_review_badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Approver Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
                  {practice.approvers.map((approver, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border text-xs space-y-1.5 transition-colors ${
                        approver.decision === 'approved'
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : approver.decision === 'rejected'
                          ? 'bg-rose-50/50 border-rose-200'
                          : approver.decision === 'changes_requested'
                          ? 'bg-amber-50/50 border-amber-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 truncate max-w-[130px]">{approver.approverName}</span>
                        {approver.decision === 'approved' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {approver.decision === 'rejected' && <XCircle className="w-4 h-4 text-rose-600" />}
                        {approver.decision === 'pending' && <Clock className="w-3.5 h-3.5 text-slate-400" />}
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{approver.approverRole}</p>
                      
                      <div className="flex items-center justify-between pt-1">
                        <span className={`text-[10px] font-bold uppercase ${
                          approver.decision === 'approved' ? 'text-emerald-700' :
                          approver.decision === 'rejected' ? 'text-rose-700' : 'text-slate-500'
                        }`}>
                          {translateStatus(approver.decision, lang)}
                        </span>

                        {/* Interactive testing toggle for each reviewer persona */}
                        {approver.decision === 'pending' && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openDecisionModal(practice.id, 'approved', approver.approverId)}
                              className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold cursor-pointer"
                              title={t.btn_approve_role}
                            >
                              {t.btn_approve_role}
                            </button>
                            <button
                              onClick={() => openDecisionModal(practice.id, 'rejected', approver.approverId)}
                              className="px-2 py-0.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold cursor-pointer"
                              title={t.btn_reject_role}
                            >
                              {t.btn_reject_role}
                            </button>
                          </div>
                        )}
                      </div>

                      {approver.comments && (
                        <p className="text-[10px] text-slate-600 italic bg-white/70 p-1.5 rounded border border-slate-200 mt-1">
                          "{approver.comments}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onSelectPractice(practice)}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-900 flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t.btn_inspect_proposal}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openDecisionModal(practice.id, 'approved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.btn_cast_approval}</span>
                    </button>

                    <button
                      onClick={() => openDecisionModal(practice.id, 'rejected')}
                      className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>{t.btn_reject_reason}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">{t.no_submissions_pending}</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t.no_submissions_pending_desc}
            </p>
          </div>
        )}
      </div>

      {/* Decision Dialog Modal */}
      {decisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              {currentDecision === 'approved' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {currentDecision === 'rejected' && <XCircle className="w-5 h-5 text-rose-600" />}
              {currentDecision === 'changes_requested' && <AlertCircle className="w-5 h-5 text-amber-600" />}
              <span>
                {currentDecision === 'approved' ? t.dialog_confirm_approval : currentDecision === 'rejected' ? t.dialog_reject_proposal : t.dialog_request_changes}
              </span>
            </h3>

            <p className="text-xs text-slate-600">
              {currentDecision === 'rejected'
                ? t.dialog_reject_note
                : t.dialog_approve_note}
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.dialog_comment_label} {currentDecision === 'rejected' && '*'}
              </label>
              <textarea
                rows={3}
                required={currentDecision === 'rejected'}
                value={decisionComment}
                onChange={(e) => setDecisionComment(e.target.value)}
                placeholder={currentDecision === 'rejected' ? t.dialog_comment_placeholder_reject : t.dialog_comment_placeholder_approve}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDecisionModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {t.dialog_cancel}
              </button>

              <button
                type="button"
                onClick={handleConfirmDecision}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer ${
                  currentDecision === 'rejected'
                    ? 'bg-rose-700 hover:bg-rose-800'
                    : 'bg-emerald-700 hover:bg-emerald-800'
                }`}
              >
                {t.dialog_confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
