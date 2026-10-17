import React from 'react';
import { 
  Home, 
  Search, 
  PlusCircle, 
  BookOpen, 
  BarChart3, 
  ShieldCheck, 
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  lang: SupportedLanguage;
  pendingApprovalsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  lang,
  pendingApprovalsCount,
}) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const navItems = [
    { id: 'home', label: t.nav_home, icon: Home },
    { id: 'search', label: t.nav_search, icon: Search },
    { id: 'share', label: t.nav_share, icon: PlusCircle, isHighlight: true },
    { id: 'contributions', label: t.nav_contributions, icon: BookOpen },
    { id: 'insights', label: t.nav_insights, icon: BarChart3 },
    { 
      id: 'approvals', 
      label: t.nav_approvals, 
      icon: ShieldCheck, 
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined 
    },
    { id: 'help', label: t.nav_help, icon: HelpCircle },
  ];

  return (
    <aside className="w-20 md:w-24 bg-[#092B1D] text-slate-200 flex flex-col items-center py-5 select-none shrink-0 border-r border-[#0D3F2A] z-30 transition-all duration-200">
      {/* UPM Griffin / Crest Brand Logo */}
      <div 
        onClick={() => onNavigate('home')}
        className="flex flex-col items-center cursor-pointer group mb-7 text-center"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-950/40 p-2 group-hover:scale-105 transition-transform duration-200">
          {/* UPM Botanical Griffin stylized SVG */}
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-white">
            <path 
              d="M24 4C14 4 6 12 6 22c0 9 6 16.5 14 18.5V32h-4v-4h4v-3c0-4 2.5-6.5 6.5-6.5 2 0 3.5.3 4 .5v4h-2.5c-2 0-2.5 1-2.5 2.5v2.5h5l-.8 4h-4.2v8.8C35.5 39 42 31.5 42 22 42 12 34 4 24 4z" 
              fill="currentColor"
            />
            <circle cx="24" cy="14" r="3" fill="#D1FAE5" />
          </svg>
        </div>
        <span className="text-white font-bold tracking-widest text-xs mt-1.5 font-heading">
          UPM
        </span>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 flex flex-col items-center gap-3 w-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              className={`w-full py-2.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-150 relative group ${
                isActive
                  ? 'bg-emerald-600/30 text-white shadow-sm ring-1 ring-emerald-500/50'
                  : item.isHighlight
                  ? 'text-emerald-300 hover:bg-emerald-800/40 hover:text-white'
                  : 'text-slate-300/80 hover:bg-emerald-950/70 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-300' : ''}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full ring-2 ring-[#092B1D] font-mono animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium text-center line-clamp-1 leading-tight tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom status indicator */}
      <div className="pt-4 border-t border-[#0D3F2A]/60 w-full flex flex-col items-center">
        <div 
          onClick={() => onNavigate('approvals')}
          className="cursor-pointer flex flex-col items-center text-emerald-400/80 hover:text-emerald-300 text-[10px]"
          title="Consensus Approval Engine Active"
        >
          <ShieldAlert className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono">v2.4</span>
        </div>
      </div>
    </aside>
  );
};
