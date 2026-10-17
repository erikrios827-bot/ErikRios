import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  TrendingUp, 
  Check, 
  FileText, 
  Download, 
  ThumbsUp, 
  Award, 
  Lightbulb, 
  Repeat, 
  Send, 
  User, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Layers, 
  Copy,
  ExternalLink,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { GoodPractice, SupportedLanguage, UserProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { getLocalizedPractice, translateCategory, translateStatus } from '../utils/localization';

interface PracticeDetailModalProps {
  practice: GoodPractice;
  onClose: () => void;
  currentUser: UserProfile;
  lang: SupportedLanguage;
  isBookmarked: boolean;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  onToggleReaction: (practiceId: string, type: 'useful' | 'excellent' | 'inspiring' | 'replicable') => void;
  onAddComment: (practiceId: string, text: string) => void;
  onSelectRelatedPractice?: (practice: GoodPractice) => void;
}

export const PracticeDetailModal: React.FC<PracticeDetailModalProps> = ({
  practice,
  onClose,
  currentUser,
  lang,
  isBookmarked,
  onToggleBookmark,
  onToggleReaction,
  onAddComment,
  onSelectRelatedPractice,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'photos' | 'implementation' | 'approval'>('overview');
  const [newComment, setNewComment] = useState('');
  const [showShareToast, setShowShareToast] = useState(false);
  const [compareMode, setCompareMode] = useState<'after' | 'before' | 'split'>('after');
  
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const p = getLocalizedPractice(practice, lang);
  const isValidated = p.status === 'published';
  const displayCategory = translateCategory(p.category, lang);

  const userReactions = p.reactions.filter(r => r.userId === currentUser.id).map(r => r.type);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(p.id, newComment.trim());
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Top Action Bar matching Right Screen of Imagen8.png */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 sticky top-0 z-20">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back_to_results}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t.share}</span>
            </button>

            <button
              onClick={(e) => onToggleBookmark(p.id, e)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors shadow-2xs cursor-pointer ${
                isBookmarked 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-700 text-emerald-700' : ''}`} />
              <span>{isBookmarked ? t.saved : t.save}</span>
            </button>

            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg ml-2 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Share Feedback Toast */}
        {showShareToast && (
          <div className="bg-emerald-800 text-white text-xs px-4 py-2 text-center font-medium animate-in fade-in duration-150">
            {t.share_copied}
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Header Block matching Right Screen */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              {isValidated ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold tracking-tight">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  {t.upm_validated}
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-tight">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  {t.under_unanimous_review}
                </div>
              )}
              <span className="font-mono text-xs text-slate-400 font-semibold">
                ID: {p.code}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
              {p.title}
            </h2>

            <p className="text-sm text-slate-600 font-normal leading-relaxed">
              {p.subtitle}
            </p>

            {/* Metadata Pill/Row matching screenshot */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-slate-800">
                <Wrench className="w-3.5 h-3.5 text-emerald-700" />
                {displayCategory}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                {p.site}, {p.country}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1 text-slate-800">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                {p.year}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="font-mono text-slate-600">
                {t.version_label} {p.version}
              </span>
            </div>
          </div>

          {/* Navigation Tabs matching Right Screen */}
          <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'overview'
                  ? 'border-emerald-800 text-emerald-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.tab_overview}
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'photos'
                  ? 'border-emerald-800 text-emerald-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.tab_photos}
            </button>

            <button
              onClick={() => setActiveTab('implementation')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === 'implementation'
                  ? 'border-emerald-800 text-emerald-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.tab_implementation}
            </button>

            <button
              onClick={() => setActiveTab('approval')}
              className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'approval'
                  ? 'border-emerald-800 text-emerald-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.tab_approval}</span>
              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-mono text-[10px]">
                {p.approvers.filter(a => a.decision === 'approved').length}/{p.approvers.length}
              </span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW matching layout in Right Screen */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Structured Text */}
              <div className="lg:col-span-7 space-y-6">
                {/* Risk Section */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wide">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{t.risk}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal bg-amber-50/50 p-3 rounded-xl border border-amber-200/60">
                    {p.hazardIdentified || p.problemStatement}
                  </p>
                  {p.potentialConsequences && (
                    <p className="text-xs text-slate-500 pl-3">
                      <strong className="text-slate-700">
                        {lang === 'es' ? 'Consecuencias:' : lang === 'fi' ? 'Seuraukset:' : lang === 'de' ? 'Folgen:' : lang === 'pt' ? 'Consequências:' : 'Consequences:'}
                      </strong> {p.potentialConsequences}
                    </p>
                  )}
                </div>

                {/* Solution Section */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wide">
                    <Wrench className="w-4 h-4 text-emerald-700" />
                    <span>{t.solution}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal bg-emerald-50/40 p-3 rounded-xl border border-emerald-200/60 whitespace-pre-line">
                    {p.solutionDescription}
                    {p.actionDetails && `\n\n${p.actionDetails}`}
                  </p>
                </div>

                {/* Results Section */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wide">
                    <TrendingUp className="w-4 h-4 text-blue-700" />
                    <span>{t.results}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal bg-blue-50/40 p-3 rounded-xl border border-blue-200/60">
                    {p.resultsSummary}
                  </p>
                  {p.quantitativeImpact && (
                    <div className="text-xs font-semibold text-emerald-800 bg-emerald-100/60 px-3 py-1.5 rounded-lg border border-emerald-200">
                      ⚡ {lang === 'es' ? 'Impacto Medido:' : lang === 'fi' ? 'Mitattu vaikuttavuus:' : lang === 'de' ? 'Gemessene Wirkung:' : lang === 'pt' ? 'Impacto Medido:' : 'Measured Impact:'} {p.quantitativeImpact}
                    </div>
                  )}
                </div>

                {/* Applicability Section */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase tracking-wide">
                    <Check className="w-4 h-4 text-purple-700" />
                    <span>{t.applicability}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {p.applicabilityNote}
                  </p>
                </div>

                {/* Technical Documents */}
                {p.documents && p.documents.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                      <FileText className="w-4 h-4 text-rose-600" />
                      <span>{t.documents}</span>
                    </div>
                    {p.documents.map((doc, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{doc.name}</p>
                            <p className="text-[10px] text-slate-400">{doc.size} · PDF Standard</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => alert(`${t.download_doc} ${doc.name}`)}
                          className="p-2 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Visual Evidence Gallery matching Right Screen */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs bg-slate-100">
                  <div className="h-64 sm:h-72 w-full relative">
                    <img 
                      src={compareMode === 'before' && p.beforeImage ? p.beforeImage : p.afterImage} 
                      alt={p.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                      {compareMode === 'before' ? t.condition_before : t.condition_after}
                    </div>
                  </div>

                  {/* Toggle between Before and After if both exist */}
                  {p.beforeImage && (
                    <div className="p-2 bg-slate-50 border-t border-slate-200 flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCompareMode('before')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          compareMode === 'before' 
                            ? 'bg-amber-600 text-white' 
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t.btn_before}
                      </button>
                      <button
                        onClick={() => setCompareMode('after')}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          compareMode === 'after' 
                            ? 'bg-emerald-700 text-white' 
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t.btn_after}
                      </button>
                    </div>
                  )}
                </div>

                {/* Additional gallery thumbnails */}
                {p.beforeImage && (
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      onClick={() => setCompareMode('before')}
                      className={`h-24 rounded-xl overflow-hidden border-2 cursor-pointer relative ${
                        compareMode === 'before' ? 'border-amber-500' : 'border-slate-200 opacity-80'
                      }`}
                    >
                      <img 
                        src={p.beforeImage} 
                        alt="Before" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 text-white px-1 rounded">{t.btn_before}</span>
                    </div>

                    <div 
                      onClick={() => setCompareMode('after')}
                      className={`h-24 rounded-xl overflow-hidden border-2 cursor-pointer relative ${
                        compareMode === 'after' ? 'border-emerald-600' : 'border-slate-200 opacity-80'
                      }`}
                    >
                      <img 
                        src={p.afterImage} 
                        alt="After" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 text-white px-1 rounded">{t.btn_after}</span>
                    </div>
                  </div>
                )}

                {/* Author attribution box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  {p.authorAvatar ? (
                    <img 
                      src={p.authorAvatar} 
                      alt={p.authorName} 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/30"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                      {p.authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">{t.author_box_label}</span>
                    <p className="text-xs font-bold text-slate-900">{p.authorName}</p>
                    <p className="text-[11px] text-slate-500">{p.authorRole} · {p.site}</p>
                    <p className="text-[10px] font-mono text-emerald-800">{p.authorEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHOTOS & VIDEOS FULL */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {p.beforeImage && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-900 uppercase">{t.condition_before}</span>
                    <div className="h-72 rounded-2xl overflow-hidden border border-amber-200 bg-slate-900">
                      <img 
                        src={p.beforeImage} 
                        alt="Before condition" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-xs text-slate-500">{p.initialSituation || p.problemStatement}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-900 uppercase">{t.condition_after}</span>
                  <div className="h-72 rounded-2xl overflow-hidden border border-emerald-300 bg-slate-900">
                    <img 
                      src={p.afterImage} 
                      alt="After solution" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-xs text-slate-500">{p.solutionDescription}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IMPLEMENTATION */}
          {activeTab === 'implementation' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  {lang === 'es' ? 'Hoja de Ruta de Implementación Técnica' : lang === 'fi' ? 'Tekninen käyttöönottosuunnitelma' : lang === 'de' ? 'Technischer Implementierungsplan' : lang === 'pt' ? 'Roteiro de Implementação Técnica' : 'Technical Implementation Roadmap'}
                </h4>
                <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">
                      {lang === 'es' ? '1. Diseño CAD y Prototipado 3D' : lang === 'fi' ? '1. CAD-suunnittelu ja 3D-prototyyppi' : lang === 'de' ? '1. CAD-Konstruktion & 3D-Prototyping' : lang === 'pt' ? '1. Projeto CAD e Prototipagem 3D' : '1. CAD Design & Prototyping'}
                    </span>
                    {lang === 'es' 
                      ? 'Modelado en CAD y validación en impresora 3D antes de fabricar la pieza final en polímero POM-C de alta resistencia al impacto.'
                      : lang === 'fi'
                      ? '3D-tulostettu prototyyppi ennen lopullisen iskulujan POM-C-polymeerikotelon koneistamista.'
                      : lang === 'de'
                      ? '3D-Druck des Prototyps vor der CNC-Fertigung des schlagfesten POM-C-Gehäuses.'
                      : lang === 'pt'
                      ? 'Prototipagem 3D antes da usinagem definitiva do invólucro em polímero POM-C de alto impacto.'
                      : '3D printed initial prototype using PETG material before CNC milling the final POM-C high-impact housing.'}
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">
                      {lang === 'es' ? '2. Capacitación y Estandarización de Trabajo' : lang === 'fi' ? '2. Käyttäjäkoulutus ja työohjeistus' : lang === 'de' ? '2. Bedienerschulung & Standardarbeitsanweisung' : lang === 'pt' ? '2. Treinamento Operacional e Instrução Padrão' : '2. Operator Training & Standard Work'}
                    </span>
                    {lang === 'es'
                      ? 'Capacitación a todos los turnos de operación y emisión de la instrucción técnica oficial de trabajo.'
                      : lang === 'fi'
                      ? 'Koulutus kaikille vuoroille ja vahvistettu virallinen työohje.'
                      : lang === 'de'
                      ? 'Sicherheitsunterweisung aller Schichten und Freigabe der offiziellen Standard-Arbeitsanweisung.'
                      : lang === 'pt'
                      ? 'Treinamento ministrado a todos os turnos e homologação da instrução de trabalho padrão.'
                      : 'Conducted tool-box talks with all operating shifts and validated standard work instruction.'}
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">
                      {lang === 'es' ? '3. Gestión del Cambio (MoC)' : lang === 'fi' ? '3. Muutoksenhallinta (MoC)' : lang === 'de' ? '3. Management of Change (MoC)' : lang === 'pt' ? '3. Gestão de Mudanças (MoC)' : '3. Management of Change (MoC)'}
                    </span>
                    {lang === 'es'
                      ? 'Aprobación completa en el comité de gestión de cambio de la planta sin observaciones pendientes.'
                      : lang === 'fi'
                      ? 'Tehtaan muutoksenhallintakatselmus suoritettu ilman avoimia riskejä.'
                      : lang === 'de'
                      ? 'Vollständige Freigabe durch den MOC-Ausschuss des Werks ohne offene Punkte.'
                      : lang === 'pt'
                      ? 'Aprovação concluída no comitê de gestão de mudanças da fábrica sem pendências.'
                      : 'Passed full plant MoC review with zero unresolved hazard flags.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: UNANIMOUS APPROVAL AUDIT LOG */}
          {activeTab === 'approval' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  {lang === 'es' 
                    ? 'Estado de Aprobación por Consenso Corporativo' 
                    : lang === 'fi'
                    ? 'Konsernin yksimielisen hyväksynnän tila'
                    : lang === 'de'
                    ? 'Status des einstimmigen Konzern-Konsenses'
                    : lang === 'pt'
                    ? 'Status de Aprovação por Consenso Corporativo'
                    : 'Corporate Consensus Approval Status'}
                </h4>
                <p className="text-xs text-slate-500">
                  {lang === 'es'
                    ? 'La política global exige el 100% de aprobación unánime de los 4 líderes de seguridad designados antes de su publicación.'
                    : lang === 'fi'
                    ? 'Konsernipolitiikka vaatii kaikkien neljän nimetyn turvallisuusjohtajan 100% yksimielisen hyväksynnän ennen julkaisua.'
                    : lang === 'de'
                    ? 'Konzernrichtlinie erfordert 100% einstimmige Freigabe aller 4 Sicherheitsleiter vor der Veröffentlichung.'
                    : lang === 'pt'
                    ? 'A política global exige 100% de aprovação unânime dos 4 líderes de segurança designados antes da publicação.'
                    : 'Global policy requires 100% unanimous approval from all designated safety leads prior to publication.'}
                </p>
              </div>

              <div className="space-y-3">
                {p.approvers.map((approver, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl border flex items-center justify-between gap-4 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        approver.decision === 'approved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : approver.decision === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {approver.decision === 'approved' ? '✓' : approver.decision === 'rejected' ? '✕' : '?'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{approver.approverName}</p>
                        <p className="text-[11px] text-slate-500">{approver.approverRole}</p>
                        {approver.comments && (
                          <p className="text-xs text-slate-600 mt-1 italic">
                            "{approver.comments}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        approver.decision === 'approved' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : approver.decision === 'rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {translateStatus(approver.decision, lang)}
                      </span>
                      {approver.decisionDate && (
                        <p className="text-[10px] text-slate-400 mt-0.5">{approver.decisionDate}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Reactions Bar */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase">{t.reactions_title}</span>
              <span className="text-xs text-slate-400 font-mono">{p.reactions.length} {t.total_reactions}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onToggleReaction(p.id, 'useful')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  userReactions.includes('useful')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{t.reactions_useful}</span>
                <span className="ml-1 opacity-75">{p.reactions.filter(r => r.type === 'useful').length}</span>
              </button>

              <button
                onClick={() => onToggleReaction(p.id, 'excellent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  userReactions.includes('excellent')
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{t.reactions_excellent}</span>
                <span className="ml-1 opacity-75">{p.reactions.filter(r => r.type === 'excellent').length}</span>
              </button>

              <button
                onClick={() => onToggleReaction(p.id, 'inspiring')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  userReactions.includes('inspiring')
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{t.reactions_inspiring}</span>
                <span className="ml-1 opacity-75">{p.reactions.filter(r => r.type === 'inspiring').length}</span>
              </button>

              <button
                onClick={() => onToggleReaction(p.id, 'replicable')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  userReactions.includes('replicable')
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>{t.reactions_replicable}</span>
                <span className="ml-1 opacity-75">{p.reactions.filter(r => r.type === 'replicable').length}</span>
              </button>
            </div>
          </div>

          {/* Comments & Discussion */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              {t.tech_discussion} ({p.comments.length})
            </h4>

            {p.comments.length > 0 ? (
              <div className="space-y-3">
                {p.comments.map((comment) => (
                  <div key={comment.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{comment.userName}</span>
                      <span className="text-[10px] text-slate-400">{comment.date}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">{comment.userRole}</span>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">{t.no_comments_yet}</p>
            )}

            {/* Post comment input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t.add_comment}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.post_comment}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
