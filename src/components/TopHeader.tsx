import React, { useState } from 'react';
import { Globe, MapPin, User, ChevronDown, Sparkles, Building2, Shield, LogIn } from 'lucide-react';
import { SupportedLanguage, UserProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { translateCountry, translateRole } from '../utils/localization';

interface TopHeaderProps {
  currentUser: UserProfile;
  lang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  onOpenAuthModal: () => void;
}

const COUNTRIES = [
  { name: 'Finland', code: 'FI', flag: '🇫🇮' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'Uruguay', code: 'UY', flag: '🇺🇾' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
  { name: 'China', code: 'CN', flag: '🇨🇳' },
];

const LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'es', label: 'Español (ES)', flag: '🇪🇸' },
  { code: 'en', label: 'English (EN)', flag: '🇬🇧' },
  { code: 'fi', label: 'Suomi (FI)', flag: '🇫🇮' },
  { code: 'de', label: 'Deutsch (DE)', flag: '🇩🇪' },
  { code: 'pt', label: 'Português (PT)', flag: '🇧🇷' },
];

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentUser,
  lang,
  onLanguageChange,
  selectedCountry,
  onCountryChange,
  onOpenAuthModal,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCountryMenu, setShowCountryMenu] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const currentCountryObj = COUNTRIES.find(c => c.name === selectedCountry) || COUNTRIES[0];

  return (
    <header className="bg-white border-b border-slate-200/90 px-4 md:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Brand title and tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5">
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 font-heading">
            {t.brand_title}
          </h1>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 rounded border border-emerald-200/70">
            {t.global_portal || 'Global Portal'}
          </span>
        </div>
        <p className="text-xs text-slate-500 hidden md:block">
          {t.brand_tagline}
        </p>
      </div>

      {/* Right controls: Country, Language, User profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Country Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCountryMenu(!showCountryMenu);
              setShowLangMenu(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
            title={t.select_country}
          >
            <span className="text-sm">{currentCountryObj.flag}</span>
            <span className="hidden lg:inline">{translateCountry(currentCountryObj.name, lang)}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showCountryMenu && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in-50 zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t.select_country}
              </div>
              {COUNTRIES.map(c => (
                <button
                  key={c.code}
                  onClick={() => {
                    onCountryChange(c.name);
                    setShowCountryMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                    c.name === selectedCountry ? 'font-semibold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{translateCountry(c.name, lang)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowCountryMenu(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
            title={t.language_label}
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold uppercase">{lang}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in-50 zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t.language_label}
              </div>
              {LANGUAGES.map(l => (
                <button
                  key={l.code}
                  onClick={() => {
                    onLanguageChange(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                    l.code === lang ? 'font-semibold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Persona & Role Selector */}
        <button
          onClick={onOpenAuthModal}
          className="flex items-center gap-2 pl-2 pr-3 py-1 bg-slate-50 hover:bg-emerald-50/60 rounded-full border border-slate-200/90 hover:border-emerald-300 transition-all cursor-pointer group"
          title={t.persona_modal_title}
        >
          {currentUser.avatarUrl ? (
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.name} 
              className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-600/30"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs ring-1 ring-emerald-600/30">
              {currentUser.name.charAt(0)}
            </div>
          )}

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-800 leading-tight group-hover:text-emerald-900 truncate max-w-[120px]">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-slate-500 capitalize">
              {translateRole(currentUser.role, lang)}
            </span>
          </div>

          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700" />
        </button>
      </div>
    </header>
  );
};
