import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  User, 
  Globe, 
  Check, 
  Mail, 
  ArrowRight, 
  KeyRound, 
  Building2,
  AlertCircle
} from 'lucide-react';
import { UserProfile, SupportedLanguage } from '../types';
import { INITIAL_USERS } from '../data/initialData';
import { storageService } from '../services/storageService';
import { TRANSLATIONS } from '../data/translations';
import { translateDepartment, translateRole } from '../utils/localization';

interface AuthRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  lang: SupportedLanguage;
}

export const AuthRoleModal: React.FC<AuthRoleModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'personas' | 'login'>('personas');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  if (!isOpen) return null;

  const allowedDomains = storageService.getAllowedDomains();

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!emailInput.trim()) {
      const msg = lang === 'es'
        ? 'Por favor ingresa tu correo corporativo.'
        : lang === 'fi'
        ? 'Anna yrityssähköpostiosoitteesi.'
        : lang === 'de'
        ? 'Bitte geben Sie Ihre geschäftliche E-Mail-Adresse ein.'
        : lang === 'pt'
        ? 'Por favor, insira seu e-mail corporativo.'
        : 'Please enter your corporate email.';
      setLoginError(msg);
      return;
    }

    const isAllowed = storageService.isEmailDomainAllowed(emailInput.trim());

    if (!isAllowed) {
      const msg = lang === 'es' 
        ? `Dominio no autorizado. Dominios permitidos: ${allowedDomains.map(d => '@' + d).join(', ')}. (Puedes agregar nuevos dominios en el panel de Administración).`
        : lang === 'fi'
        ? `Toimialue ei ole valtuutettu. Sallitut toimialueet: ${allowedDomains.map(d => '@' + d).join(', ')}.`
        : lang === 'de'
        ? `Domäne nicht autorisiert. Erlaubte Domänen: ${allowedDomains.map(d => '@' + d).join(', ')}.`
        : lang === 'pt'
        ? `Domínio não autorizado. Domínios permitidos: ${allowedDomains.map(d => '@' + d).join(', ')}.`
        : `Domain not authorized. Allowed domains: ${allowedDomains.map(d => '@' + d).join(', ')}.`;
      setLoginError(msg);
      return;
    }

    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      name: nameInput.trim() || emailInput.split('@')[0].replace('.', ' '),
      email: emailInput.trim(),
      role: 'employee',
      department: lang === 'es' ? 'Operaciones Corporativas' : 'Corporate Operations',
      country: 'Global',
      site: 'UPM Facility',
      isAuthorizedDomain: true,
    };

    onSelectUser(newUser);
    onClose();
  };

  const getRoleLabel = (role: string) => {
    const key = `role_${role}`;
    return t[key] || role;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {t.persona_modal_title}
            </h3>
            <p className="text-xs text-slate-500">
              {t.persona_modal_sub}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('personas')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'personas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tab_quick_personas}
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.tab_corp_login}
          </button>
        </div>

        {/* TAB 1: PERSONAS */}
        {activeTab === 'personas' && (
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {INITIAL_USERS.map((user) => {
              const isSelected = currentUser.id === user.id;

              return (
                <div
                  key={user.id}
                  onClick={() => {
                    onSelectUser(user);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-emerald-600/30"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">{user.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500">{translateDepartment(user.department, lang)}</p>
                      <p className="text-[10px] font-mono text-emerald-800">{user.email}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'approver' ? 'bg-amber-100 text-amber-800' :
                    user.role === 'guest' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: CORPORATE LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
              <strong>{t.allowed_domains_label}</strong> {allowedDomains.map(d => '@' + d).join(', ')}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.full_name_label}
              </label>
              <input
                type="text"
                placeholder="ej. Maria Gonzalez"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t.corp_email_label}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="ej. maria.gonzalez@upm.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-mono"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{t.btn_signin_verify}</span>
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{t.public_mode_active}</span>
          <span>{t.security_standard}</span>
        </div>

      </div>
    </div>
  );
};
