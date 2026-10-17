import React from 'react';
import { 
  BarChart3, 
  Globe2, 
  Building2, 
  Users, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Award,
  Layers,
  Heart,
  FileCheck
} from 'lucide-react';
import { GoodPractice, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { translateCategory, translateCountry } from '../utils/localization';

interface InsightsViewProps {
  practices: GoodPractice[];
  lang: SupportedLanguage;
}

export const InsightsView: React.FC<InsightsViewProps> = ({ practices, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const published = practices.filter(p => p.status === 'published');
  const pending = practices.filter(p => p.status === 'pending_approval' || p.status === 'under_review');
  const rejected = practices.filter(p => p.status === 'rejected');

  const countries = Array.from(new Set(published.map(p => p.country)));
  const sites = Array.from(new Set(published.map(p => p.site)));
  const authors = Array.from(new Set(practices.map(p => p.authorEmail)));

  // Category counts
  const categoryCounts: Record<string, number> = {};
  published.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  // Country counts
  const countryCounts: Record<string, number> = {};
  published.forEach(p => {
    countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;
  });

  // Top sites
  const siteCounts: Record<string, number> = {};
  published.forEach(p => {
    siteCounts[p.site] = (siteCounts[p.site] || 0) + 1;
  });
  const sortedSites = Object.entries(siteCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-700" />
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              {t.insights_title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.insights_desc}
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          {t.last_synced} {t.today}, {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase text-slate-500">{t.kpi_validated}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {published.length}
          </div>
          <div className="text-[10px] text-emerald-700 font-medium mt-1">
            {t.kpi_unanimous}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase text-slate-500">{t.kpi_countries}</span>
            <Globe2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {countries.length}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {t.kpi_active_regions}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase text-slate-500">{t.kpi_sites}</span>
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {sites.length}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {t.kpi_mills_terminals}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase text-slate-500">{t.kpi_contributors}</span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {authors.length}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {t.kpi_verified_authors}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase text-slate-500">{t.kpi_in_review}</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {pending.length}
          </div>
          <div className="text-[10px] text-amber-600 mt-1">
            {t.kpi_under_voting}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase text-slate-500">{t.kpi_total_views}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {practices.reduce((acc, p) => acc + (p.viewsCount || 0), 0)}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {t.kpi_knowledge_queries}
          </div>
        </div>
      </div>

      {/* Grid of Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Breakdown by Category */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            {t.by_pillar_title}
          </h3>

          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / (published.length || 1)) * 100);
              const localizedCat = translateCategory(cat, lang);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{localizedCat}</span>
                    <span className="font-mono text-slate-500">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Breakdown by Country */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-blue-700" />
            {t.by_country_title}
          </h3>

          <div className="space-y-3">
            {Object.entries(countryCounts).map(([country, count]) => {
              const pct = Math.round((count / (published.length || 1)) * 100);
              return (
                <div key={country} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{translateCountry(country, lang)}</span>
                    <span className="font-mono text-slate-500">{count} {t.filter_practices.toLowerCase()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Contributing Sites & Recognition */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            {t.top_mills_title}
          </h3>
          <span className="text-xs text-slate-400">{t.top_mills_sub}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sortedSites.slice(0, 3).map(([siteName, count], idx) => (
            <div key={siteName} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                #{idx + 1}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{siteName}</p>
                <p className="text-[11px] text-slate-500">{count} {t.published_solutions_count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
