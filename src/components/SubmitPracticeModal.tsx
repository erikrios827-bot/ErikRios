import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Upload, 
  AlertTriangle, 
  ShieldCheck, 
  Wrench, 
  FileText,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import { GoodPractice, PracticeCategory, SupportedLanguage, UserProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { translateCategory, translateCauseType } from '../utils/localization';

interface SubmitPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (practiceData: Partial<GoodPractice>) => void;
  currentUser: UserProfile;
  lang: SupportedLanguage;
}

const CATEGORIES: PracticeCategory[] = [
  'Safety',
  'Quality',
  'Productivity',
  'Efficiency',
  '5S & Workplace',
  'Environment',
  'Wellbeing & Ergonomics',
  'Maintenance',
  'Digitalisation & Automation',
  'Cost Reduction',
  'Standardisation',
  'Chemical',
  'Logistics',
];

export const SubmitPracticeModal: React.FC<SubmitPracticeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  lang,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<PracticeCategory>('Safety');
  const [country, setCountry] = useState(currentUser.country || 'Finland');
  const [site, setSite] = useState(currentUser.site || 'Kymi Mill');
  const [implementationDate, setImplementationDate] = useState(new Date().toISOString().split('T')[0]);

  // Problem statement
  const [initialSituation, setInitialSituation] = useState('');
  const [hazardIdentified, setHazardIdentified] = useState('');
  const [potentialConsequences, setPotentialConsequences] = useState('');
  const [affectedScope, setAffectedScope] = useState('');

  // Root Cause
  const [rootCauseAnalysis, setRootCauseAnalysis] = useState('');
  const [causeType, setCauseType] = useState<'technical' | 'procedural' | 'organizational' | 'human_factors'>('technical');

  // Solution
  const [solutionDescription, setSolutionDescription] = useState('');
  const [actionDetails, setActionDetails] = useState('');
  const [resourcesUsed, setResourcesUsed] = useState('');
  const [applicabilityNote, setApplicabilityNote] = useState('');
  const [isReplicable, setIsReplicable] = useState(true);

  // Results & Impact
  const [resultsSummary, setResultsSummary] = useState('');
  const [quantitativeImpact, setQuantitativeImpact] = useState('');
  const [qualitativeBenefits, setQualitativeBenefits] = useState('');

  // Evidence
  const [selectedImageOption, setSelectedImageOption] = useState<'blade' | 'warehouse' | 'loto' | 'chemical'>('blade');
  const [includeBeforeImage, setIncludeBeforeImage] = useState(true);
  const [tagsInput, setTagsInput] = useState(lang === 'es' ? 'Resguardo de máquinas, Prevención de cortes, Trabajo estándar' : 'Machine guarding, Cut prevention, Standard work');
  const [confirmedDeclaration, setConfirmedDeclaration] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedDeclaration) {
      const msg = lang === 'es' 
        ? 'Por favor confirma la declaración de veracidad antes de enviar.'
        : lang === 'fi'
        ? 'Vahvista tietojen paikkansapitävyys ennen lähettämistä.'
        : lang === 'de'
        ? 'Bitte bestätigen Sie die Richtigkeit der Angaben vor dem Absenden.'
        : lang === 'pt'
        ? 'Por favor confirme a declaração de veracidade antes de enviar.'
        : 'Please confirm the accuracy declaration before submitting.';
      alert(msg);
      return;
    }

    const imageMap = {
      blade: {
        after: '/src/assets/images/blade_protection_slitter_1792173516267.jpg',
        before: '/src/assets/images/blade_hazard_before_1792173547442.jpg',
      },
      warehouse: {
        after: '/src/assets/images/warehouse_pedestrian_safety_1792173516719.jpg',
        before: undefined,
      },
      loto: {
        after: '/src/assets/images/lockout_tagout_maintenance_1792173517329.jpg',
        before: undefined,
      },
      chemical: {
        after: '/src/assets/images/chemical_handling_safety_1792173517430.jpg',
        before: undefined,
      },
    };

    const chosen = imageMap[selectedImageOption];

    const newPractice: Partial<GoodPractice> = {
      title,
      subtitle: subtitle || solutionDescription.substring(0, 100),
      category,
      country,
      site,
      implementationDate,
      problemStatement: hazardIdentified,
      initialSituation,
      hazardIdentified,
      potentialConsequences,
      affectedScope,
      rootCauseAnalysis,
      causeType,
      solutionDescription,
      actionDetails,
      resourcesUsed,
      applicabilityNote,
      isReplicable,
      resultsSummary,
      quantitativeImpact,
      qualitativeBenefits,
      beforeImage: includeBeforeImage ? chosen.before : undefined,
      afterImage: chosen.after,
      tags: tagsInput.split(',').map(s => s.trim()).filter(Boolean),
      riskType: category === 'Safety' ? 'Operational safety' : category,
      processType: 'Continuous Improvement',
      equipmentType: 'Production machine',
      practiceType: 'good_practice',
    };

    onSubmit(newPractice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block font-mono">
              {t.submit_stepper_tag} · {lang === 'es' ? 'Paso' : 'Step'} {step} {t.step_of} {totalSteps}
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              {step === 1 && t.step_1_title}
              {step === 2 && t.step_2_title}
              {step === 3 && t.step_3_title}
              {step === 4 && t.step_4_title}
              {step === 5 && t.step_5_title}
              {step === 6 && t.step_6_title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="w-full bg-slate-100 h-1.5">
          <div 
            className="bg-emerald-600 h-1.5 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: GENERAL INFO */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_title}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === 'es' ? 'ej. Procedimiento seguro para cambio de cuchillas con dispositivo magnético' : 'e.g. Safe blade change procedure with magnetic guide'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_subtitle}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'es' ? 'Dispositivo de ingeniería para eliminar el contacto directo con filos durante el recambio.' : 'Practical engineering device to eliminate hand contact during changeover.'}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.field_category}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PracticeCategory)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{translateCategory(cat, lang)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.field_date}
                  </label>
                  <input
                    type="date"
                    value={implementationDate}
                    onChange={(e) => setImplementationDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.field_country}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.field_site}
                  </label>
                  <input
                    type="text"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span><strong>{t.author_box_label}:</strong> {currentUser.name}</span>
                <span className="font-mono text-emerald-800">{currentUser.email}</span>
              </div>
            </div>
          )}

          {/* STEP 2: PROBLEM STATEMENT */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_hazard}
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder={lang === 'es' ? 'ej. Cortes en manos durante el recambio de cuchillas en cortadoras de alta velocidad.' : 'e.g. Hand cuts during blade replacement on high-speed slitter machines.'}
                  value={hazardIdentified}
                  onChange={(e) => setHazardIdentified(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_initial_situation}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'es' ? 'Los operarios debían aflojar las cuchillas a mano usando guantes comunes, exponiendo sus dedos.' : 'Operators had to manually hold sharp exposed carbon-steel blades.'}
                  value={initialSituation}
                  onChange={(e) => setInitialSituation(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.field_consequences}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'es' ? 'ej. Laceraciones profundas, cortes tendinosos, tiempo perdido (LTI).' : 'e.g. Deep lacerations, tendon damage, lost-time injury (LTI).'}
                    value={potentialConsequences}
                    onChange={(e) => setPotentialConsequences(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.field_affected_scope}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'es' ? 'ej. Sector de terminación, 24 operarios y 8 mecánicos de turno.' : 'e.g. Finishing department, 24 operators and 8 mechanics.'}
                    value={affectedScope}
                    onChange={(e) => setAffectedScope(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ROOT CAUSE */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_cause_type}
                </label>
                <select
                  value={causeType}
                  onChange={(e) => setCauseType(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  <option value="technical">{translateCauseType('technical', lang)}</option>
                  <option value="procedural">{translateCauseType('procedural', lang)}</option>
                  <option value="organizational">{translateCauseType('organizational', lang)}</option>
                  <option value="human_factors">{translateCauseType('human_factors', lang)}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_root_cause}
                </label>
                <textarea
                  rows={4}
                  placeholder={lang === 'es' ? 'Explica por qué ocurrió el problema: Falta de barrera física de protección entre las manos y el filo cortante durante el traspaso.' : 'Explain why the problem occurred: Lack of physical containment guard between fingers and rotary blade edges.'}
                  value={rootCauseAnalysis}
                  onChange={(e) => setRootCauseAnalysis(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>
          )}

          {/* STEP 4: SOLUTION */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_solution}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={lang === 'es' ? 'Carcasa roja de seguridad con resguardo magnético que bloquea la cuchilla antes de desatornillarla.' : 'Engineered custom red safety shield enclosure with magnetic lock handle.'}
                  value={solutionDescription}
                  onChange={(e) => setSolutionDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_action_details}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'es' ? '1. Diseño en CAD y prototipo 3D. 2. Actualización de instrucción de trabajo. 3. Capacitación a los operarios.' : '1. 3D modeled polymer housing. 2. Updated standard work instruction. 3. Trained operators.'}
                  value={actionDetails}
                  onChange={(e) => setActionDetails(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="replicable-check"
                  checked={isReplicable}
                  onChange={(e) => setIsReplicable(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="replicable-check" className="text-xs font-medium text-slate-800 cursor-pointer">
                  {t.field_replicable_check}
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: RESULTS & IMPACT */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_results_summary}
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder={lang === 'es' ? 'Eliminación del 100% del contacto manual con filos cortantes. Cero incidentes en 14 meses.' : '100% elimination of manual blade contact during changeovers. Zero injuries in 14 months.'}
                  value={resultsSummary}
                  onChange={(e) => setResultsSummary(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_quantitative}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'es' ? 'ej. 0 cortes en 14 meses, 3.5 minutos menos por recambio, $12,000 USD de ahorro anual.' : 'e.g. 0 laceration incidents, 3.5 min faster blade change, $12,000 annual tooling savings.'}
                  value={quantitativeImpact}
                  onChange={(e) => setQuantitativeImpact(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_qualitative}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === 'es' ? 'Mayor confort, confianza total de los operarios y tranquilidad durante recambios nocturnos.' : 'Operators report high confidence and comfort during nocturnal shift changeovers.'}
                  value={qualitativeBenefits}
                  onChange={(e) => setQualitativeBenefits(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>
          )}

          {/* STEP 6: EVIDENCE & CONFIRMATION */}
          {step === 6 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {t.field_select_template}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'blade', label: lang === 'es' ? 'Cuchillas (Antes y Después)' : 'Slitter Guard (Before & After)', img: '/src/assets/images/blade_protection_slitter_1792173516267.jpg' },
                    { id: 'warehouse', label: lang === 'es' ? 'Pasarela de Almacén' : 'Warehouse Walkway', img: '/src/assets/images/warehouse_pedestrian_safety_1792173516719.jpg' },
                    { id: 'loto', label: lang === 'es' ? 'Estación LOTO' : 'LOTO Station', img: '/src/assets/images/lockout_tagout_maintenance_1792173517329.jpg' },
                    { id: 'chemical', label: lang === 'es' ? 'Múltiple Químico' : 'Chemical Manifold', img: '/src/assets/images/chemical_handling_safety_1792173517430.jpg' },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedImageOption(opt.id as any)}
                      className={`rounded-xl border-2 p-1.5 cursor-pointer transition-all ${
                        selectedImageOption === opt.id ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/30' : 'border-slate-200'
                      }`}
                    >
                      <img src={opt.img} alt={opt.label} className="w-full h-16 object-cover rounded-lg" referrerPolicy="no-referrer" />
                      <p className="text-[10px] font-semibold text-slate-800 mt-1 truncate">{opt.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.field_tags}
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              {/* Confidentiality Warning */}
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  {t.warning_confidentiality}
                </div>
              </div>

              {/* Accuracy Confirmation Required */}
              <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="accuracy-declaration"
                  required
                  checked={confirmedDeclaration}
                  onChange={(e) => setConfirmedDeclaration(e.target.checked)}
                  className="w-4 h-4 text-emerald-700 rounded mt-0.5"
                />
                <label htmlFor="accuracy-declaration" className="text-xs text-emerald-950 font-medium cursor-pointer">
                  {t.declaration_text}
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.btn_back}</span>
            </button>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>{t.btn_next}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!confirmedDeclaration}
              className="px-6 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{t.btn_submit_unanimous}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
