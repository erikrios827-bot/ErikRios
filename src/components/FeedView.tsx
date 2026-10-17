import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  PlusCircle, 
  CheckCircle2, 
  FileText, 
  Users, 
  Database, 
  Sparkles, 
  Globe2, 
  ShieldCheck, 
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { GoodPractice, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PracticeCard } from './PracticeCard';

interface FeedViewProps {
  practices: GoodPractice[];
  onSelectPractice: (practice: GoodPractice) => void;
  onNavigate: (view: string) => void;
  onSearchSubmit: (query: string) => void;
  onOpenSubmitModal: () => void;
  lang: SupportedLanguage;
  bookmarks: string[];
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({
  practices,
  onSelectPractice,
  onNavigate,
  onSearchSubmit,
  onOpenSubmitModal,
  lang,
  bookmarks,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const getSampleChips = (): string[] => {
    switch (lang) {
      case 'es':
        return [
          'Trabajo en altura',
          'Seguridad en autoelevadores',
          'Mantenimiento seguro',
          'Resguardo de máquinas',
          'Químicos y EPP',
          'Bloqueo LOTO'
        ];
      case 'fi':
        return [
          'Korkealla työskentely',
          'Trukkiturvallisuus',
          'Turvallinen kunnossapito',
          'Konesuojaukset',
          'Kemikaalit ja suojain',
          'LOTO-lukitus'
        ];
      case 'de':
        return [
          'Arbeiten in der Höhe',
          'Staplersicherheit',
          'Sichere Instandhaltung',
          'Maschinenschutz',
          'Gefahrstoffe & PSA',
          'LOTO-Verfahren'
        ];
      case 'pt':
        return [
          'Trabalho em altura',
          'Segurança com empilhadeiras',
          'Manutenção segura',
          'Proteção de máquinas',
          'Produtos químicos e EPI',
          'Bloqueio LOTO'
        ];
      default:
        return [
          'Working at height',
          'Forklift safety',
          'Maintenance safety',
          'Machine guarding',
          'Chemical handling & PPE',
          'LOTO procedures'
        ];
    }
  };

  const sampleChips = getSampleChips();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery.trim());
    }
  };

  const validatedPractices = practices.filter(p => p.status === 'published');
  const featured = validatedPractices.slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Section matching Left Screen of Imagen8.png */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#072618] via-[#0B3523] to-[#0A2F1F] text-white shadow-xl min-h-[380px] lg:min-h-[420px] flex flex-col justify-between p-6 sm:p-10 border border-emerald-900/50">
        {/* Background Industrial Image with gradient overlay */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-40 lg:opacity-85 pointer-events-none mix-blend-luminosity lg:mix-blend-normal">
          <img 
            src="/src/assets/images/upm_hero_industrial_worker_1792173502973.jpg" 
            alt="UPM Industrial Safety" 
            className="w-full h-full object-cover object-center lg:object-right"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#072618] via-[#072618]/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-md border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {t.hero_tag}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight">
            {t.hero_welcome}
          </h2>

          <p className="text-base sm:text-lg text-emerald-100/90 font-normal leading-relaxed max-w-xl">
            {t.hero_sub}
          </p>

          {/* Search Input Box */}
          <form onSubmit={handleSearch} className="pt-2">
            <div className="relative max-w-xl flex items-center shadow-2xl">
              <div className="absolute left-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search_placeholder}
                className="w-full pl-12 pr-14 py-3.5 sm:py-4 rounded-full bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-emerald-500/40 font-medium transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                title={t.nav_search}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Try for example chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-emerald-200/90">
            <span className="font-medium text-emerald-300">{t.try_example}</span>
            {sampleChips.map((chip) => (
              <button
                key={chip}
                onClick={() => onSearchSubmit(chip)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/10 hover:border-emerald-300/40 transition-colors cursor-pointer backdrop-blur-xs font-medium"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Tagline on desktop */}
        <div className="relative z-10 hidden lg:block pt-4 border-t border-emerald-900/40 text-emerald-300/80 text-xs font-mono">
          {t.experience_tagline} · {t.verified_consensus}
        </div>
      </div>

      {/* Two Action Cards matching Imagen8.png */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Find practice card */}
        <div 
          onClick={() => onNavigate('search')}
          className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {t.find_practice_title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                {t.find_practice_desc}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-emerald-700 group-hover:text-white flex items-center justify-center text-slate-400 transition-all shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Share practice card */}
        <div 
          onClick={onOpenSubmitModal}
          className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-500 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                {t.share_practice_title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                {t.share_practice_desc}
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-blue-700 group-hover:text-white flex items-center justify-center text-slate-400 transition-all shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Featured Practices Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              {t.featured_practices}
            </h3>
            <p className="text-xs text-slate-500">
              {t.featured_practices_sub}
            </p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
          >
            {t.view_all}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((practice) => (
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
      </div>

      {/* 4. Submission & Approval Process Diagram matching Bottom of Imagen8.png */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            {t.step_process_title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.step_process_subtitle}
          </p>
        </div>

        {/* Horizontal workflow steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              1
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {t.step_1}
              </p>
              <p className="text-[11px] text-slate-500">{t.step_1_sub}</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
            <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              2
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {t.step_2}
              </p>
              <p className="text-[11px] text-slate-500">{t.step_2_sub}</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950 leading-tight">
                {t.step_3}
              </p>
              <p className="text-[11px] text-emerald-700">{t.step_3_sub}</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
              4
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {t.step_4}
              </p>
              <p className="text-[11px] text-slate-300">{t.step_4_sub}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits row matching Bottom Right of Imagen8.png */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="shrink-0">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
            {t.benefits_title}
          </span>
          <h4 className="text-lg font-bold text-white font-heading mt-0.5">
            {t.operational_excellence_engine}
          </h4>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-200">{t.benefit_1}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-900/60 text-purple-400 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-200">{t.benefit_2}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900/60 text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-200">{t.benefit_3}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-900/60 text-amber-400 flex items-center justify-center shrink-0">
              <Globe2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-200">{t.benefit_4}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
