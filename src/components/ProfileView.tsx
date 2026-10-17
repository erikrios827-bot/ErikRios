import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Building2, 
  Mail, 
  ShieldCheck, 
  Bookmark, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { GoodPractice, SupportedLanguage, UserProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PracticeCard } from './PracticeCard';
import { getLocalizedPractice, translateStatus, translateCountry, translateDepartment } from '../utils/localization';

interface ProfileViewProps {
  currentUser: UserProfile;
  practices: GoodPractice[];
  bookmarks: string[];
  onSelectPractice: (practice: GoodPractice) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  lang: SupportedLanguage;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  practices,
  bookmarks,
  onSelectPractice,
  onToggleBookmark,
  lang,
}) => {
  const [tab, setTab] = useState<'my_published' | 'in_review' | 'bookmarks'>('my_published');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const myPractices = practices.filter(p => p.authorEmail.toLowerCase() === currentUser.email.toLowerCase());
  const myPublished = myPractices.filter(p => p.status === 'published');
  const myInReview = myPractices.filter(p => p.status !== 'published');
  const bookmarkedPractices = practices.filter(p => bookmarks.includes(p.id));

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {currentUser.avatarUrl ? (
          <img 
            src={currentUser.avatarUrl} 
            alt={currentUser.name} 
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-600/30 shadow-xs shrink-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-2xl shadow-xs shrink-0">
            {currentUser.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                {currentUser.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {translateDepartment(currentUser.department, lang)}
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 self-center sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t.verified_member}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 pt-1">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {currentUser.email}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {translateCountry(currentUser.country, lang)}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {currentUser.site}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setTab('my_published')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            tab === 'my_published'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.tab_my_published} ({myPublished.length})
        </button>

        <button
          onClick={() => setTab('in_review')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            tab === 'in_review'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.tab_proposals_review} ({myInReview.length})
        </button>

        <button
          onClick={() => setTab('bookmarks')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            tab === 'bookmarks'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.tab_saved_favorites} ({bookmarkedPractices.length})
        </button>
      </div>

      {/* Tab Contents */}
      {tab === 'my_published' && (
        <div className="space-y-4">
          {myPublished.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPublished.map((practice) => (
                <PracticeCard
                  key={practice.id}
                  practice={practice}
                  onSelect={onSelectPractice}
                  isBookmarked={bookmarks.includes(practice.id)}
                  onToggleBookmark={onToggleBookmark}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
              {t.no_published_user}
            </div>
          )}
        </div>
      )}

      {tab === 'in_review' && (
        <div className="space-y-4">
          {myInReview.length > 0 ? (
            myInReview.map((origPractice) => {
              const practice = getLocalizedPractice(origPractice, lang);
              return (
                <div 
                  key={practice.id}
                  onClick={() => onSelectPractice(practice)}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 cursor-pointer space-y-3 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 font-semibold">{practice.code}</span>
                    <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                      practice.status === 'rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      practice.status === 'changes_requested' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {translateStatus(practice.status, lang)}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{practice.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{practice.problemStatement}</p>

                  {practice.rejectionReason && (
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900">
                      <strong>{t.reviewer_feedback_label}</strong> "{practice.rejectionReason}"
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <span>{t.revision_number}{practice.revisionCount}</span>
                    <span className="font-semibold text-emerald-800">
                      {practice.approvers.filter(a => a.decision === 'approved').length}/4 {t.status_under_review_badge}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
              {t.no_in_review_user}
            </div>
          )}
        </div>
      )}

      {tab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedPractices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedPractices.map((practice) => (
                <PracticeCard
                  key={practice.id}
                  practice={practice}
                  onSelect={onSelectPractice}
                  isBookmarked={true}
                  onToggleBookmark={onToggleBookmark}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
              {t.no_bookmarks_user}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
