import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  Filter, 
  Sparkles, 
  X, 
  ChevronDown, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { GoodPractice, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PracticeCard } from './PracticeCard';
import { 
  getLocalizedPractice, 
  translateRiskType, 
  translateProcessType, 
  translateEquipmentType, 
  translateCountry 
} from '../utils/localization';

interface SearchViewProps {
  practices: GoodPractice[];
  initialQuery?: string;
  onSelectPractice: (practice: GoodPractice) => void;
  lang: SupportedLanguage;
  bookmarks: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  practices,
  initialQuery = '',
  onSelectPractice,
  lang,
  bookmarks,
  onToggleBookmark,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'practices' | 'lessons' | 'documents'>('all');
  
  // Filters
  const [riskFilter, setRiskFilter] = useState('all');
  const [processFilter, setProcessFilter] = useState('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [siteFilter, setSiteFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'views'>('relevance');

  // AI Assistant Search State
  const [isSearchingAi, setIsSearchingAi] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    summary?: string;
    matchedPracticeIds?: string[];
    recommendations?: { practiceId: string; whyUseful: string; cautionNote: string }[];
    suggestedFollowUps?: string[];
  } | null>(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  useEffect(() => {
    if (initialQuery && initialQuery !== query) {
      setQuery(initialQuery);
      triggerAiSearch(initialQuery);
    }
  }, [initialQuery]);

  const triggerAiSearch = async (searchPrompt: string) => {
    if (!searchPrompt.trim()) return;
    setIsSearchingAi(true);
    setAiAnalysis(null);

    try {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchPrompt,
          practices: practices.filter(p => p.status === 'published').map(p => getLocalizedPractice(p, lang)),
          language: lang,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiAnalysis(data);
      }
    } catch (e) {
      console.warn('AI search backend error', e);
    } finally {
      setIsSearchingAi(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerAiSearch(query);
  };

  const clearAllFilters = () => {
    setQuery('');
    setRiskFilter('all');
    setProcessFilter('all');
    setEquipmentFilter('all');
    setCountryFilter('all');
    setSiteFilter('all');
    setYearFilter('all');
    setActiveTab('all');
    setAiAnalysis(null);
  };

  const publishedPractices = practices.filter(p => p.status === 'published');

  const filteredPractices = publishedPractices.filter((origP) => {
    const p = getLocalizedPractice(origP, lang);

    if (activeTab === 'practices' && p.practiceType !== 'good_practice') return false;
    if (activeTab === 'lessons' && p.practiceType !== 'lesson_learned') return false;
    if (activeTab === 'documents' && (!p.documents || p.documents.length === 0)) return false;

    if (riskFilter !== 'all' && origP.riskType !== riskFilter) return false;
    if (processFilter !== 'all' && origP.processType !== processFilter) return false;
    if (equipmentFilter !== 'all' && origP.equipmentType !== equipmentFilter) return false;
    if (countryFilter !== 'all' && origP.country !== countryFilter) return false;
    if (siteFilter !== 'all' && origP.site !== siteFilter) return false;
    if (yearFilter !== 'all' && String(origP.year) !== yearFilter) return false;

    if (query.trim()) {
      const q = query.toLowerCase();
      if (aiAnalysis?.matchedPracticeIds?.includes(p.id)) return true;

      const titleMatch = p.title.toLowerCase().includes(q) || origP.title.toLowerCase().includes(q);
      const subtitleMatch = p.subtitle?.toLowerCase().includes(q) || origP.subtitle?.toLowerCase().includes(q);
      const probMatch = p.problemStatement.toLowerCase().includes(q) || origP.problemStatement.toLowerCase().includes(q);
      const solMatch = p.solutionDescription.toLowerCase().includes(q) || origP.solutionDescription.toLowerCase().includes(q);
      const tagMatch = p.tags.some(tag => tag.toLowerCase().includes(q)) || origP.tags.some(tag => tag.toLowerCase().includes(q));
      const countryMatch = p.country.toLowerCase().includes(q) || origP.country.toLowerCase().includes(q);
      const siteMatch = p.site.toLowerCase().includes(q);
      const catMatch = p.category.toLowerCase().includes(q);

      return titleMatch || subtitleMatch || probMatch || solMatch || tagMatch || countryMatch || siteMatch || catMatch;
    }

    return true;
  });

  const sortedPractices = [...filteredPractices].sort((a, b) => {
    if (sortBy === 'newest') return (b.year || 0) - (a.year || 0);
    if (sortBy === 'views') return (b.viewsCount || 0) - (a.viewsCount || 0);
    return 0;
  });

  const availableRisks = Array.from(new Set(publishedPractices.map(p => p.riskType).filter(Boolean)));
  const availableProcesses = Array.from(new Set(publishedPractices.map(p => p.processType).filter(Boolean)));
  const availableEquipments = Array.from(new Set(publishedPractices.map(p => p.equipmentType).filter(Boolean)));
  const availableCountries = Array.from(new Set(publishedPractices.map(p => p.country).filter(Boolean)));
  const availableSites = Array.from(new Set(publishedPractices.map(p => p.site).filter(Boolean)));
  const availableYears = Array.from(new Set(publishedPractices.map(p => String(p.year)).filter(Boolean)));

  const hasActiveFilters = 
    riskFilter !== 'all' || 
    processFilter !== 'all' || 
    equipmentFilter !== 'all' || 
    countryFilter !== 'all' || 
    siteFilter !== 'all' || 
    yearFilter !== 'all' || 
    Boolean(query);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center shadow-xs">
          <div className="absolute left-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search_placeholder}
            className="w-full pl-12 pr-14 py-3.5 rounded-2xl bg-white border border-slate-200/90 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-3 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all font-medium shadow-xs"
          />
          <button
            type="submit"
            disabled={isSearchingAi}
            className="absolute right-2 w-10 h-10 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            title={t.nav_search}
          >
            {isSearchingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>

      {/* Tabs with counts */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'all'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
          }`}
        >
          {t.filter_all} ({publishedPractices.length})
        </button>

        <button
          onClick={() => setActiveTab('practices')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'practices'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
          }`}
        >
          {t.filter_practices} ({publishedPractices.filter(p => p.practiceType === 'good_practice').length})
        </button>

        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'lessons'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
          }`}
        >
          {t.filter_lessons} ({publishedPractices.filter(p => p.practiceType === 'lesson_learned').length})
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
          }`}
        >
          {t.filter_documents} ({publishedPractices.filter(p => p.documents && p.documents.length > 0).length})
        </button>
      </div>

      {/* Filter Row */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {/* Risk Type Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">{t.filter_risk}: {t.filter_all}</option>
            {availableRisks.map(r => (
              <option key={r} value={r}>{translateRiskType(r, lang)}</option>
            ))}
          </select>

          {/* Process Filter */}
          <select
            value={processFilter}
            onChange={(e) => setProcessFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">{t.filter_process}: {t.filter_all}</option>
            {availableProcesses.map(p => (
              <option key={p} value={p}>{translateProcessType(p, lang)}</option>
            ))}
          </select>

          {/* Equipment Filter */}
          <select
            value={equipmentFilter}
            onChange={(e) => setEquipmentFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">{t.filter_equipment}: {t.filter_all}</option>
            {availableEquipments.map(eq => (
              <option key={eq} value={eq}>{translateEquipmentType(eq, lang)}</option>
            ))}
          </select>

          {/* Country Filter */}
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">{t.filter_country}: {t.filter_all}</option>
            {availableCountries.map(c => (
              <option key={c} value={c}>{translateCountry(c, lang)}</option>
            ))}
          </select>

          {/* Site Filter */}
          <select
            value={siteFilter}
            onChange={(e) => setSiteFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="all">{t.filter_site}: {t.filter_all}</option>
            {availableSites.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="all">{t.filter_year}: {t.filter_all}</option>
            {availableYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold ml-auto px-2 py-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              {t.clear_all}
            </button>
          )}
        </div>
      </div>

      {/* AI Search Reasoning Drawer */}
      {isSearchingAi && (
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-3 animate-pulse">
          <Sparkles className="w-5 h-5 text-emerald-700 animate-spin" />
          <div className="text-xs text-emerald-900 font-medium">
            {t.search_reasoning_msg}
          </div>
        </div>
      )}

      {aiAnalysis && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-slate-50 border border-emerald-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              {t.ai_synthesis_title}
            </div>
            <button 
              onClick={() => setAiAnalysis(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-slate-800 leading-relaxed font-normal">
            {aiAnalysis.summary}
          </p>

          {/* Industrial Caution Notice */}
          <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">{t.safety_caution_title} </span>
              {t.safety_caution_text}
            </div>
          </div>

          {/* Follow-up Prompts */}
          {aiAnalysis.suggestedFollowUps && aiAnalysis.suggestedFollowUps.length > 0 && (
            <div className="pt-2 border-t border-emerald-200/60 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">{t.related_queries}</span>
              {aiAnalysis.suggestedFollowUps.map((fu, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(fu);
                    triggerAiSearch(fu);
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50 text-[11px] font-medium"
                >
                  {fu}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results Header: Count & Sort */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="text-sm font-bold text-slate-800">
          {sortedPractices.length} {t.validated_practices_found}
        </h3>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>{t.sort_by}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer"
          >
            <option value="relevance">{t.sort_relevance}</option>
            <option value="newest">{t.sort_newest}</option>
            <option value="views">{t.sort_views}</option>
          </select>
        </div>
      </div>

      {/* Results List */}
      {sortedPractices.length > 0 ? (
        <div className="space-y-3">
          {sortedPractices.map((practice) => (
            <PracticeCard
              key={practice.id}
              practice={practice}
              onSelect={onSelectPractice}
              isBookmarked={bookmarks.includes(practice.id)}
              onToggleBookmark={onToggleBookmark}
              lang={lang}
              layout="row"
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200/90 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">
            {t.no_results_found}
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t.no_results_desc}
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            {t.clear_all}
          </button>
        </div>
      )}
    </div>
  );
};
