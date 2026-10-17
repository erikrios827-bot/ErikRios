import React from 'react';
import { CheckCircle2, Bookmark, Heart, MessageSquare, ChevronRight, MapPin, Wrench, Calendar, Sparkles } from 'lucide-react';
import { GoodPractice, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getLocalizedPractice, translateCategory } from '../utils/localization';

interface PracticeCardProps {
  practice: GoodPractice;
  onSelect: (practice: GoodPractice) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (practiceId: string, e: React.MouseEvent) => void;
  lang: SupportedLanguage;
  layout?: 'card' | 'row';
}

export const PracticeCard: React.FC<PracticeCardProps> = ({
  practice,
  onSelect,
  isBookmarked = false,
  onToggleBookmark,
  lang,
  layout = 'card',
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const p = getLocalizedPractice(practice, lang);
  const isValidated = p.status === 'published';
  const displayCategory = translateCategory(p.category, lang);

  if (layout === 'row') {
    return (
      <div 
        onClick={() => onSelect(p)}
        className="group bg-white rounded-xl border border-slate-200/90 hover:border-emerald-500/70 shadow-xs hover:shadow-md transition-all duration-200 p-3.5 flex items-center gap-4 cursor-pointer"
      >
        {/* Thumbnail */}
        <div className="w-24 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 relative">
          <img 
            src={p.afterImage || p.beforeImage} 
            alt={p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          {p.beforeImage && (
            <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/60 text-white px-1 rounded backdrop-blur-xs">
              {lang === 'es' ? 'Antes/Después' : 'Before/After'}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
              {p.title}
            </h3>
            {isValidated && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {t.validated_badge}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 mb-2">
            {p.subtitle || p.solutionDescription}
          </p>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <Wrench className="w-3 h-3 text-slate-400" />
              {displayCategory}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {p.country}
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {p.year}
            </span>
          </div>
        </div>

        {/* Arrow affordance */}
        <div className="shrink-0 text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    );
  }

  // Standard Card view
  return (
    <div 
      onClick={() => onSelect(p)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/70 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Image Banner */}
      <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
        <img 
          src={p.afterImage || p.beforeImage} 
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Validated Pill & Code */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {isValidated ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-950 bg-emerald-400/95 px-2.5 py-0.5 rounded-full shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-950" />
              {t.validated_badge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-950 bg-amber-400/95 px-2.5 py-0.5 rounded-full shadow-xs">
              {lang === 'es' ? 'En Revisión' : 'Review in Progress'}
            </span>
          )}
        </div>

        {onToggleBookmark && (
          <button 
            onClick={(e) => onToggleBookmark(p.id, e)}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
            title={t.save}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-400 text-emerald-400' : ''}`} />
          </button>
        )}

        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
          <span className="font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
            {p.code}
          </span>
          <span className="text-[11px] font-medium drop-shadow-sm">
            {p.site}, {p.country}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1.5">
            <span>{displayCategory}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">{p.year}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug mb-1.5">
            {p.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {p.subtitle || p.problemStatement}
          </p>
        </div>

        {/* Footer info & reactions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            {p.authorAvatar ? (
              <img 
                src={p.authorAvatar} 
                alt={p.authorName}
                className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-200"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                {p.authorName.charAt(0)}
              </div>
            )}
            <span className="truncate max-w-[110px] text-[11px] font-medium text-slate-700">
              {p.authorName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              {p.reactions.length}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-slate-400" />
              {p.comments.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
