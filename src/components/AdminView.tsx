import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Plus, 
  Trash2, 
  Users, 
  FileText, 
  History, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { SupportedLanguage, SystemAuditLog, UserProfile } from '../types';
import { storageService } from '../services/storageService';
import { TRANSLATIONS } from '../data/translations';
import { translateDepartment } from '../utils/localization';

interface AdminViewProps {
  currentUser: UserProfile;
  lang: SupportedLanguage;
}

export const AdminView: React.FC<AdminViewProps> = ({ currentUser, lang }) => {
  const [domains, setDomains] = useState<string[]>(storageService.getAllowedDomains());
  const [newDomain, setNewDomain] = useState('');
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(storageService.getAuditLogs());
  const [activeTab, setActiveTab] = useState<'domains' | 'approvers' | 'audit'>('domains');

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const users = storageService.getUsers();
  const designatedApprovers = users.filter(u => u.role === 'approver');

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.trim()) return;
    const ok = storageService.addAllowedDomain(newDomain.trim(), currentUser);
    if (ok) {
      setDomains(storageService.getAllowedDomains());
      setAuditLogs(storageService.getAuditLogs());
      setNewDomain('');
    } else {
      const msg = lang === 'es'
        ? 'El dominio ya está registrado.'
        : lang === 'fi'
        ? 'Verkkotunnus on jo rekisteröity.'
        : lang === 'de'
        ? 'Die Domäne ist bereits registriert.'
        : lang === 'pt'
        ? 'O domínio já está registrado.'
        : 'Domain is already registered.';
      alert(msg);
    }
  };

  const handleRemoveDomain = (domain: string) => {
    if (domains.length <= 1) {
      const msg = lang === 'es'
        ? 'Debe permanecer al menos un dominio corporativo activo.'
        : lang === 'fi'
        ? 'Vähintään yhden valtuutetun toimialueen on pysyttävä aktiivisena.'
        : lang === 'de'
        ? 'Mindestens eine autorisierte Unternehmensdomäne muss aktiv bleiben.'
        : lang === 'pt'
        ? 'Pelo menos um domínio corporativo deve permanecer ativo.'
        : 'At least one authorized domain must remain active.';
      alert(msg);
      return;
    }
    storageService.removeAllowedDomain(domain, currentUser);
    setDomains(storageService.getAllowedDomains());
    setAuditLogs(storageService.getAuditLogs());
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-800" />
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              {t.admin_title}
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.admin_desc}
          </p>
        </div>

        <div className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold">
          Admin: {currentUser.name}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('domains')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'domains'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.tab_domains} ({domains.length})
        </button>

        <button
          onClick={() => setActiveTab('approvers')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'approvers'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.tab_approvers} ({designatedApprovers.length})
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t.tab_audit} ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: DOMAINS */}
      {activeTab === 'domains' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              {t.domains_section_title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.domains_section_desc}
            </p>
          </div>

          <form onSubmit={handleAddDomain} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 text-slate-400 font-mono text-sm">@</span>
              <input
                type="text"
                placeholder="ej. upm.com"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.btn_add_domain}</span>
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {domains.map((dom) => (
              <div 
                key={dom}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-700" />
                  <span className="font-mono text-xs font-bold text-slate-900">@{dom}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-1.5 py-0.2 rounded font-semibold">
                    {lang === 'es' ? 'Autorizado' : lang === 'fi' ? 'Valtuutettu' : lang === 'de' ? 'Autorisiert' : lang === 'pt' ? 'Autorizado' : 'Authorized'}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveDomain(dom)}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Remove domain"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: APPROVERS */}
      {activeTab === 'approvers' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              {t.approvers_section_title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.approvers_section_desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {designatedApprovers.map((lead) => (
              <div key={lead.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{lead.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{translateDepartment(lead.department, lang)}</p>
                  <p className="text-[10px] font-mono text-emerald-800">{lead.email}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                  {t.lead_reviewer_badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-700" />
              {t.audit_section_title}
            </h3>
            <span className="text-xs text-slate-400 font-mono">{t.audit_immutable_tag}</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {auditLogs.map((log) => (
              <div 
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.userName}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded-full ${
                      log.action === 'publish' ? 'bg-emerald-100 text-emerald-800' :
                      log.action === 'reject' ? 'bg-rose-100 text-rose-800' :
                      log.action === 'submit' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {log.action}
                    </span>
                    {log.practiceCode && (
                      <span className="font-mono text-slate-500">{log.practiceCode}</span>
                    )}
                  </div>
                  <p className="text-slate-600 mt-1">{log.details}</p>
                </div>
                <span className="font-mono text-[10px] text-slate-400 whitespace-nowrap">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
