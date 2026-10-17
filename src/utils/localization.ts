import { GoodPractice, SupportedLanguage, PracticeCategory, ApproverDecision, PracticeComment } from '../types';
import { TRANSLATIONS } from '../data/translations';

// Taxonomy translation dictionaries
export const TAXONOMY_TRANSLATIONS: Record<SupportedLanguage, {
  categories: Record<string, string>;
  risks: Record<string, string>;
  processes: Record<string, string>;
  equipments: Record<string, string>;
  countries: Record<string, string>;
  roles: Record<string, string>;
  departments: Record<string, string>;
  causeTypes: Record<string, string>;
  practiceTypes: Record<string, string>;
  tags: Record<string, string>;
}> = {
  es: {
    categories: {
      'Safety': 'Seguridad',
      'Quality': 'Calidad',
      'Productivity': 'Productividad',
      'Efficiency': 'Eficiencia',
      '5S & Workplace': '5S y Organización',
      'Environment': 'Medio Ambiente',
      'Wellbeing & Ergonomics': 'Bienestar y Ergonomía',
      'Maintenance': 'Mantenimiento',
      'Digitalisation & Automation': 'Digitalización y Automatización',
      'Cost Reduction': 'Reducción de Costos',
      'Standardisation': 'Estandarización',
      'Chemical': 'Química',
      'Logistics': 'Logística',
    },
    risks: {
      'Sharp edges / Cuts': 'Bordes afilados / Cortes',
      'Mobile equipment / Vehicles': 'Equipos móviles / Vehículos',
      'Hazardous energy / Electrical': 'Energías peligrosas / Eléctrico',
      'Chemical / Toxic': 'Sustancias químicas / Tóxico',
      'Work at heights': 'Trabajo en altura',
      'Confined spaces': 'Espacios confinados',
      'Ergonomics / Manual handling': 'Ergonomía / Manipulación manual',
      'Operational safety': 'Seguridad operacional',
      'Fire & explosion': 'Fuego y explosión',
      'Pressure systems': 'Sistemas presurizados',
      'Slips, trips & falls': 'Resbalones, tropiezos y caídas',
    },
    processes: {
      'Paper slitting & rewinding': 'Corte longitudinal y rebobinado de papel',
      'Warehousing & internal transport': 'Almacenamiento y transporte interno',
      'Preventive plant shutdowns': 'Paradas preventivas de planta',
      'Bleaching & pH adjustment': 'Blanqueo y ajuste de pH',
      'Tool storage & preparation': 'Almacenamiento y preparación de herramientas',
      'Roll clamp transport': 'Transporte de bobinas con pinza',
      'Operations': 'Operaciones generales',
      'Timber harvesting & debarking': 'Cosecha forestal y descortezado',
      'Boiler & steam production': 'Calderas y generación de vapor',
    },
    equipments: {
      'Slitter arbor': 'Eje de cuchillas de cortadora (slitter)',
      'Counterbalance forklifts': 'Autoelevadores contrabalanceados',
      'Main pump motor breakers': 'Interruptores de motor de bomba principal',
      'Dosing pumps and manifold': 'Bombas dosificadoras y múltiple de válvulas',
      'Tooling shadow cart': 'Carro móvil 5S con siluetas de herramientas',
      'Linde clamp truck': 'Autoelevador con pinza para bobinas',
      'Standard machinery': 'Maquinaria estándar de planta',
      'Overhead crane': 'Puente grúa',
    },
    countries: {
      'Finland': 'Finlandia',
      'Germany': 'Alemania',
      'Argentina': 'Argentina',
      'Uruguay': 'Uruguay',
      'United States': 'Estados Unidos',
      'Brazil': 'Brasil',
      'China': 'China',
      'Global': 'Global',
    },
    roles: {
      'employee': 'Colaborador',
      'safety_expert': 'Experto en Seguridad',
      'approver': 'Revisor Titular',
      'admin': 'Administrador Global',
      'guest': 'Visitante Público',
      'Maintenance Specialist': 'Especialista en Mantenimiento',
      'Safety Director': 'Director de Seguridad',
      'Chemical Safety Lead': 'Líder de Seguridad en Procesos Químicos',
      'Continuous Improvement Champion': 'Campeón de Mejora Continua',
      'Global Safety Lead': 'Líder Global de Seguridad',
      'Process Safety Lead': 'Líder de Seguridad en Procesos',
      'Continuous Improvement Lead': 'Líder de Mejora Continua',
      'VP Health & Safety': 'Vicepresidenta de Salud, Seguridad y Medio Ambiente',
      'Global Admin': 'Administrador Global',
      'Public Guest': 'Visitante Público',
      'Production Supervisor': 'Supervisor de Producción',
    },
    departments: {
      'Mantenimiento Mecánico y Confiabilidad': 'Mantenimiento Mecánico y Confiabilidad',
      'Mechanical Maintenance & Reliability': 'Mantenimiento Mecánico y Confiabilidad',
      'Seguridad Global y Excelencia Operacional': 'Seguridad Global y Excelencia Operacional',
      'Global Safety & Operational Excellence': 'Seguridad Global y Excelencia Operacional',
      'Líder de Seguridad en Procesos Químicos': 'Líder de Seguridad en Procesos Químicos',
      'Process Safety & Chemical Lead': 'Líder de Seguridad en Procesos Químicos',
      'Campeón de Mejora Continua y 5S': 'Campeón de Mejora Continua y 5S',
      'Continuous Improvement & 5S Champion': 'Campeón de Mejora Continua y 5S',
      'Vicepresidenta de Salud, Seguridad y Medio Ambiente': 'Vicepresidenta de Salud, Seguridad y Medio Ambiente',
      'VP Health, Safety & Environment': 'Vicepresidenta de Salud, Seguridad y Medio Ambiente',
      'Gobernanza del Conocimiento Corporativo': 'Gobernanza del Conocimiento Corporativo',
      'Corporate Knowledge Governance': 'Gobernanza del Conocimiento Corporativo',
      'Observador de la Industria': 'Observador de la Industria',
      'Industry Observer': 'Observador de la Industria',
      'Corporate Operations': 'Operaciones Corporativas',
    },
    causeTypes: {
      'technical': 'Técnica',
      'procedural': 'Procedimental',
      'organizational': 'Organizacional',
      'human_factors': 'Factores humanos',
      'equipment': 'Falla de equipo',
    },
    practiceTypes: {
      'good_practice': 'Buena práctica',
      'lesson_learned': 'Lección aprendida',
      'standard_procedure': 'Procedimiento estándar',
    },
    tags: {
      'Machine guarding': 'Protección de maquinaria',
      'Slitter': 'Cortadora (slitter)',
      'Cut prevention': 'Prevención de cortes',
      'Maintenance': 'Mantenimiento',
      'Safety device': 'Dispositivo de seguridad',
      'LOTO': 'Bloqueo LOTO',
      'Forklift safety': 'Seguridad en autoelevadores',
      'Pedestrian separation': 'Segregación peatonal',
      'Warehouse': 'Almacén',
      'Logistics': 'Logística',
      'Barriers': 'Barreras de impacto',
      'Lockout/tagout': 'Bloqueo y etiquetado',
      'Electrical safety': 'Seguridad eléctrica',
      'Zero energy': 'Energía cero',
      'Chemical handling': 'Manipulación de químicos',
      'Chemical': 'Química',
      'PPE': 'EPP',
      'Acid dosing': 'Dosificación de ácido',
      'Containment': 'Contención de derrames',
      '5S': '5S',
      'Storage': 'Almacenamiento',
      'Sharp edges': 'Bordes afilados',
      'Productivity': 'Productividad',
      'Shadow board': 'Tablero de sombras',
      'Optical laser': 'Láser óptico',
      'Blind spot': 'Punto ciego',
      'Warning systems': 'Sistemas de advertencia',
    }
  },

  en: {
    categories: {
      'Safety': 'Safety',
      'Quality': 'Quality',
      'Productivity': 'Productivity',
      'Efficiency': 'Efficiency',
      '5S & Workplace': '5S & Workplace',
      'Environment': 'Environment',
      'Wellbeing & Ergonomics': 'Wellbeing & Ergonomics',
      'Maintenance': 'Maintenance',
      'Digitalisation & Automation': 'Digitalisation & Automation',
      'Cost Reduction': 'Cost Reduction',
      'Standardisation': 'Standardisation',
      'Chemical': 'Chemical',
      'Logistics': 'Logistics',
    },
    risks: {
      'Sharp edges / Cuts': 'Sharp edges / Cuts',
      'Mobile equipment / Vehicles': 'Mobile equipment / Vehicles',
      'Hazardous energy / Electrical': 'Hazardous energy / Electrical',
      'Chemical / Toxic': 'Chemical / Toxic',
      'Work at heights': 'Work at heights',
      'Confined spaces': 'Confined spaces',
      'Ergonomics / Manual handling': 'Ergonomics / Manual handling',
      'Operational safety': 'Operational safety',
      'Fire & explosion': 'Fire & explosion',
      'Pressure systems': 'Pressure systems',
      'Slips, trips & falls': 'Slips, trips & falls',
    },
    processes: {
      'Paper slitting & rewinding': 'Paper slitting & rewinding',
      'Warehousing & internal transport': 'Warehousing & internal transport',
      'Preventive plant shutdowns': 'Preventive plant shutdowns',
      'Bleaching & pH adjustment': 'Bleaching & pH adjustment',
      'Tool storage & preparation': 'Tool storage & preparation',
      'Roll clamp transport': 'Roll clamp transport',
      'Operations': 'Operations',
      'Timber harvesting & debarking': 'Timber harvesting & debarking',
      'Boiler & steam production': 'Boiler & steam production',
    },
    equipments: {
      'Slitter arbor': 'Slitter arbor',
      'Counterbalance forklifts': 'Counterbalance forklifts',
      'Main pump motor breakers': 'Main pump motor breakers',
      'Dosing pumps and manifold': 'Dosing pumps and manifold',
      'Tooling shadow cart': 'Tooling shadow cart',
      'Linde clamp truck': 'Linde clamp truck',
      'Standard machinery': 'Standard machinery',
      'Overhead crane': 'Overhead crane',
    },
    countries: {
      'Finland': 'Finland',
      'Germany': 'Germany',
      'Argentina': 'Argentina',
      'Uruguay': 'Uruguay',
      'United States': 'United States',
      'Brazil': 'Brazil',
      'China': 'China',
      'Global': 'Global',
    },
    roles: {
      'employee': 'Contributor',
      'safety_expert': 'Safety Expert',
      'approver': 'Safety Lead Reviewer',
      'admin': 'Global Admin',
      'guest': 'Public Guest',
      'Maintenance Specialist': 'Maintenance Specialist',
      'Safety Director': 'Safety Director',
      'Chemical Safety Lead': 'Chemical Safety Lead',
      'Continuous Improvement Champion': 'Continuous Improvement Champion',
      'Global Safety Lead': 'Global Safety Lead',
      'Process Safety Lead': 'Process Safety Lead',
      'Continuous Improvement Lead': 'Continuous Improvement Lead',
      'VP Health & Safety': 'VP Health & Safety',
      'Global Admin': 'Global Admin',
      'Public Guest': 'Public Guest',
      'Production Supervisor': 'Production Supervisor',
    },
    departments: {
      'Mantenimiento Mecánico y Confiabilidad': 'Mechanical Maintenance & Reliability',
      'Mechanical Maintenance & Reliability': 'Mechanical Maintenance & Reliability',
      'Seguridad Global y Excelencia Operacional': 'Global Safety & Operational Excellence',
      'Global Safety & Operational Excellence': 'Global Safety & Operational Excellence',
      'Líder de Seguridad en Procesos Químicos': 'Process Safety & Chemical Lead',
      'Process Safety & Chemical Lead': 'Process Safety & Chemical Lead',
      'Campeón de Mejora Continua y 5S': 'Continuous Improvement & 5S Champion',
      'Continuous Improvement & 5S Champion': 'Continuous Improvement & 5S Champion',
      'Vicepresidenta de Salud, Seguridad y Medio Ambiente': 'VP Health, Safety & Environment',
      'VP Health, Safety & Environment': 'VP Health, Safety & Environment',
      'Gobernanza del Conocimiento Corporativo': 'Corporate Knowledge Governance',
      'Corporate Knowledge Governance': 'Corporate Knowledge Governance',
      'Observador de la Industria': 'Industry Observer',
      'Industry Observer': 'Industry Observer',
      'Corporate Operations': 'Corporate Operations',
    },
    causeTypes: {
      'technical': 'Technical',
      'procedural': 'Procedural',
      'organizational': 'Organizational',
      'human_factors': 'Human factors',
      'equipment': 'Equipment failure',
    },
    practiceTypes: {
      'good_practice': 'Good practice',
      'lesson_learned': 'Lesson learned',
      'standard_procedure': 'Standard procedure',
    },
    tags: {
      'Machine guarding': 'Machine guarding',
      'Slitter': 'Slitter',
      'Cut prevention': 'Cut prevention',
      'Maintenance': 'Maintenance',
      'Safety device': 'Safety device',
      'LOTO': 'LOTO',
      'Forklift safety': 'Forklift safety',
      'Pedestrian separation': 'Pedestrian separation',
      'Warehouse': 'Warehouse',
      'Logistics': 'Logistics',
      'Barriers': 'Barriers',
      'Lockout/tagout': 'Lockout/tagout',
      'Electrical safety': 'Electrical safety',
      'Zero energy': 'Zero energy',
      'Chemical handling': 'Chemical handling',
      'Chemical': 'Chemical',
      'PPE': 'PPE',
      'Acid dosing': 'Acid dosing',
      'Containment': 'Containment',
      '5S': '5S',
      'Storage': 'Storage',
      'Sharp edges': 'Sharp edges',
      'Productivity': 'Productivity',
      'Shadow board': 'Shadow board',
      'Optical laser': 'Optical laser',
      'Blind spot': 'Blind spot',
      'Warning systems': 'Warning systems',
    }
  },

  fi: {
    categories: {
      'Safety': 'Turvallisuus',
      'Quality': 'Laatu',
      'Productivity': 'Tuottavuus',
      'Efficiency': 'Tehokkuus',
      '5S & Workplace': '5S ja Työympäristö',
      'Environment': 'Ympäristö',
      'Wellbeing & Ergonomics': 'Hyvinvointi ja Ergonomia',
      'Maintenance': 'Kunnossapito',
      'Digitalisation & Automation': 'Digitalisaatio ja Automaatio',
      'Cost Reduction': 'Kustannussäästöt',
      'Standardisation': 'Standardointi',
      'Chemical': 'Kemikaaliturvallisuus',
      'Logistics': 'Logistiikka',
    },
    risks: {
      'Sharp edges / Cuts': 'Terävät reunat / Viiltohaavat',
      'Mobile equipment / Vehicles': 'Liikkuva kalusto / Trukit',
      'Hazardous energy / Electrical': 'Vaarallinen energia / Sähkö',
      'Chemical / Toxic': 'Kemikaalit / Myrkylliset aineet',
      'Work at heights': 'Korkealla työskentely',
      'Confined spaces': 'Ahtaat tilat',
      'Ergonomics / Manual handling': 'Ergonomia / Taakkojen käsittely',
      'Operational safety': 'Operatiivinen turvallisuus',
      'Fire & explosion': 'Tulipalo ja räjähdysvaara',
      'Pressure systems': 'Painelaitteet',
      'Slips, trips & falls': 'Liukastumiset ja kaatumiset',
    },
    processes: {
      'Paper slitting & rewinding': 'Paperin pituusleikkaus ja pituusleikkurit',
      'Warehousing & internal transport': 'Varastointi ja sisäinen logistiikka',
      'Preventive plant shutdowns': 'Ennakkohuoltoseisokit',
      'Bleaching & pH adjustment': 'Valkaisu ja pH:n säätö',
      'Tool storage & preparation': 'Työkalujen varastointi ja valmistelu',
      'Roll clamp transport': 'Rullapihtikuljetus',
      'Operations': 'Tuotantotoiminnot',
      'Timber harvesting & debarking': 'Puunhankinta ja kuorinta',
      'Boiler & steam production': 'Kattilat ja höyryntuotanto',
    },
    equipments: {
      'Slitter arbor': 'Pituusleikkurin teräakseli',
      'Counterbalance forklifts': 'Vastapainotrukit',
      'Main pump motor breakers': 'Pääpumppujen moottorikytkimet',
      'Dosing pumps and manifold': 'Annostelupumput ja venttiilistöt',
      'Tooling shadow cart': '5S-työkalujen siluettivaunu',
      'Linde clamp truck': 'Rullapihtitrukki',
      'Standard machinery': 'Vakiokoneisto',
      'Overhead crane': 'Siltanosturi',
    },
    countries: {
      'Finland': 'Suomi',
      'Germany': 'Saksa',
      'Argentina': 'Argentiina',
      'Uruguay': 'Uruguay',
      'United States': 'Yhdysvallat',
      'Brazil': 'Brasilia',
      'China': 'Kiina',
      'Global': 'Globaali',
    },
    roles: {
      'employee': 'Osallistuja',
      'safety_expert': 'Turvallisuusasiantuntija',
      'approver': 'Johtava arvioija',
      'admin': 'Pääkäyttäjä',
      'guest': 'Julkinen vieras',
      'Maintenance Specialist': 'Kunnossapidon asiantuntija',
      'Safety Director': 'Turvallisuusjohtaja',
      'Chemical Safety Lead': 'Prosessikemikaalien turvallisuuspäällikkö',
      'Continuous Improvement Champion': 'Jatkuvan parantamisen vastuuhenkilö',
      'Global Safety Lead': 'Globaali turvallisuusjohtaja',
      'Process Safety Lead': 'Prosessiturvallisuuden johtaja',
      'Continuous Improvement Lead': 'Jatkuvan parantamisen johtaja',
      'VP Health & Safety': 'Työturvallisuus- ja ympäristöjohtaja',
      'Global Admin': 'Globaali pääkäyttäjä',
      'Public Guest': 'Julkinen vieras',
      'Production Supervisor': 'Tuotannon vuoromestari',
    },
    departments: {
      'Mantenimiento Mecánico y Confiabilidad': 'Mekaaninen kunnossapito ja luotettavuus',
      'Mechanical Maintenance & Reliability': 'Mekaaninen kunnossapito ja luotettavuus',
      'Seguridad Global y Excelencia Operacional': 'Globaali turvallisuus ja toiminnallinen laatu',
      'Global Safety & Operational Excellence': 'Globaali turvallisuus ja toiminnallinen laatu',
      'Líder de Seguridad en Procesos Químicos': 'Kemikaaliprosessien turvallisuusyksikkö',
      'Process Safety & Chemical Lead': 'Kemikaaliprosessien turvallisuusyksikkö',
      'Campeón de Mejora Continua y 5S': 'Jatkuvan parantamisen ja 5S-toiminnan tiimi',
      'Continuous Improvement & 5S Champion': 'Jatkuvan parantamisen ja 5S-toiminnan tiimi',
      'Vicepresidenta de Salud, Seguridad y Medio Ambiente': 'Työterveys-, turvallisuus- ja ympäristöjohto',
      'VP Health, Safety & Environment': 'Työterveys-, turvallisuus- ja ympäristöjohto',
      'Gobernanza del Conocimiento Corporativo': 'Konsernin tiedonhallinta',
      'Corporate Knowledge Governance': 'Konsernin tiedonhallinta',
      'Observador de la Industria': 'Teollisuuden tarkkailija',
      'Industry Observer': 'Teollisuuden tarkkailija',
      'Corporate Operations': 'Konsernitoiminnot',
    },
    causeTypes: {
      'technical': 'Tekninen syy',
      'procedural': 'Menetelmällinen puute',
      'organizational': 'Organisatorinen syy',
      'human_factors': 'Inhimilliset tekijät',
      'equipment': 'Laitevika',
    },
    practiceTypes: {
      'good_practice': 'Hyvä käytäntö',
      'lesson_learned': 'Opittu asia',
      'standard_procedure': 'Vakioitu toimintamalli',
    },
    tags: {
      'Machine guarding': 'Konesuojaus',
      'Slitter': 'Pituusleikkuri',
      'Cut prevention': 'Viiltosuojus',
      'Maintenance': 'Kunnossapito',
      'Safety device': 'Turvalaite',
      'LOTO': 'LOTO-lukitus',
      'Forklift safety': 'Trukkiturvallisuus',
      'Pedestrian separation': 'Jalankulun erottelu',
      'Warehouse': 'Varasto',
      'Logistics': 'Logistiikka',
      'Barriers': 'Törmäyssuojat',
      'Lockout/tagout': 'Lukitseminen ja merkintä',
      'Electrical safety': 'Sähköturvallisuus',
      'Zero energy': 'Nollaenergia',
      'Chemical handling': 'Kemikaalien käsittely',
      'Chemical': 'Kemikaalit',
      'PPE': 'Henkilönsuojaimet',
      'Acid dosing': 'Hapon annostelu',
      'Containment': 'Valuma-allas',
      '5S': '5S',
      'Storage': 'Varastointi',
      'Sharp edges': 'Terävät reunat',
      'Productivity': 'Tuottavuus',
      'Shadow board': 'Varjotaulu',
      'Optical laser': 'Optinen laser',
      'Blind spot': 'Katvealue',
      'Warning systems': 'Varoitusjärjestelmät',
    }
  },

  de: {
    categories: {
      'Safety': 'Arbeitssicherheit',
      'Quality': 'Qualität',
      'Productivity': 'Produktivität',
      'Efficiency': 'Effizienz',
      '5S & Workplace': '5S & Arbeitsplatz',
      'Environment': 'Umweltschutz',
      'Wellbeing & Ergonomics': 'Ergonomie & Gesundheit',
      'Maintenance': 'Instandhaltung',
      'Digitalisation & Automation': 'Digitalisierung & Automation',
      'Cost Reduction': 'Kostensenkung',
      'Standardisation': 'Standardisierung',
      'Chemical': 'Chemiesicherheit',
      'Logistics': 'Logistik',
    },
    risks: {
      'Sharp edges / Cuts': 'Scharfe Kanten / Schnittgefahr',
      'Mobile equipment / Vehicles': 'Flurförderzeuge / Staplerverkehr',
      'Hazardous energy / Electrical': 'Gefährliche Energien / Elektrik',
      'Chemical / Toxic': 'Gefahrstoffe / Ätzende Chemikalien',
      'Work at heights': 'Arbeiten in der Höhe',
      'Confined spaces': 'Beengte Räume',
      'Ergonomics / Manual handling': 'Ergonomie / Manuelle Lastenhandhabung',
      'Operational safety': 'Betriebliche Sicherheit',
      'Fire & explosion': 'Brand- & Explosionsschutz',
      'Pressure systems': 'Druckbehälter & Rohrleitungen',
      'Slips, trips & falls': 'Stolpern, Rutschen & Stürzen',
    },
    processes: {
      'Paper slitting & rewinding': 'Längsschneiden und Umrollen von Papier',
      'Warehousing & internal transport': 'Lagerhaltung und Werkslogistik',
      'Preventive plant shutdowns': 'Vorbeugende Anlagenstillstände',
      'Bleaching & pH adjustment': 'Bleicherei und pH-Konditionierung',
      'Tool storage & preparation': 'Werkzeuglagerung & 5S-Rüstplatz',
      'Roll clamp transport': 'Rollenklammerstapler-Transport',
      'Operations': 'Produktionsbetrieb',
      'Timber harvesting & debarking': 'Holzeinschlag und Entrindung',
      'Boiler & steam production': 'Kesselanlage und Dampferzeugung',
    },
    equipments: {
      'Slitter arbor': 'Rollenschneidermesser-Welle',
      'Counterbalance forklifts': 'Gegengewichtsstapler',
      'Main pump motor breakers': 'Hauptschalter für Pumpenantriebe',
      'Dosing pumps and manifold': 'Dosierpumpen & Ventilknoten',
      'Tooling shadow cart': 'Fahrbarer 5S-Schattenwagen',
      'Linde clamp truck': 'Linde Papierrollenklammer-Stapler',
      'Standard machinery': 'Standard-Produktionsanlagen',
      'Overhead crane': 'Brückenkran',
    },
    countries: {
      'Finland': 'Finnland',
      'Germany': 'Deutschland',
      'Argentina': 'Argentinien',
      'Uruguay': 'Uruguay',
      'United States': 'Vereinigte Staaten',
      'Brazil': 'Brasilien',
      'China': 'China',
      'Global': 'Global',
    },
    roles: {
      'employee': 'Mitarbeiter',
      'safety_expert': 'Sicherheitsingenieur',
      'approver': 'Zertifizierter Gutachter',
      'admin': 'Globaler Administrator',
      'guest': 'Öffentlicher Gast',
      'Maintenance Specialist': 'Instandhaltungs-Spezialist',
      'Safety Director': 'Direktor Arbeitssicherheit',
      'Chemical Safety Lead': 'Leiter Chemiesicherheit & Prozessrisiken',
      'Continuous Improvement Champion': 'KVP- und 5S-Beauftragter',
      'Global Safety Lead': 'Globaler Sicherheitsleiter',
      'Process Safety Lead': 'Leiter Anlagensicherheit',
      'Continuous Improvement Lead': 'Leiter KVP & operative Exzellenz',
      'VP Health & Safety': 'Vizepräsidentin HSE & Arbeitsschutz',
      'Global Admin': 'Globaler Systemadministrator',
      'Public Guest': 'Öffentlicher Besucher',
      'Production Supervisor': 'Schichtleiter Produktion',
    },
    departments: {
      'Mantenimiento Mecánico y Confiabilidad': 'Mechanische Instandhaltung & Zuverlässigkeit',
      'Mechanical Maintenance & Reliability': 'Mechanische Instandhaltung & Zuverlässigkeit',
      'Seguridad Global y Excelencia Operacional': 'Globale Arbeitssicherheit & Operative Exzellenz',
      'Global Safety & Operational Excellence': 'Globale Arbeitssicherheit & Operative Exzellenz',
      'Líder de Seguridad en Procesos Químicos': 'Prozess- und Chemiesicherheit',
      'Process Safety & Chemical Lead': 'Prozess- und Chemiesicherheit',
      'Campeón de Mejora Continua y 5S': 'Kontinuierlicher Verbesserungsprozess & 5S',
      'Continuous Improvement & 5S Champion': 'Kontinuierlicher Verbesserungsprozess & 5S',
      'Vicepresidenta de Salud, Seguridad y Medio Ambiente': 'Vizepräsidentschaft HSE & Arbeitsschutz',
      'VP Health, Safety & Environment': 'Vizepräsidentschaft HSE & Arbeitsschutz',
      'Gobernanza del Conocimiento Corporativo': 'Konzernweites Wissensmanagement',
      'Corporate Knowledge Governance': 'Konzernweites Wissensmanagement',
      'Observador de la Industria': 'Industrie-Beobachter',
      'Industry Observer': 'Industrie-Beobachter',
      'Corporate Operations': 'Konzernweite Operationen',
    },
    causeTypes: {
      'technical': 'Technischer Grund',
      'procedural': 'Verfahrensbezogene Ursache',
      'organizational': 'Organisatorischer Mangel',
      'human_factors': 'Menschliche Faktoren',
      'equipment': 'Anlagenausfall',
    },
    practiceTypes: {
      'good_practice': 'Gute Praxis',
      'lesson_learned': 'Gelehrte Lektion',
      'standard_procedure': 'Standardarbeitsanweisung',
    },
    tags: {
      'Machine guarding': 'Maschinenschutz',
      'Slitter': 'Rollenschneider',
      'Cut prevention': 'Schnittschutz',
      'Maintenance': 'Instandhaltung',
      'Safety device': 'Sicherheitsvorrichtung',
      'LOTO': 'LOTO-Freischaltung',
      'Forklift safety': 'Staplersicherheit',
      'Pedestrian separation': 'Fußgänger-Trennung',
      'Warehouse': 'Lager',
      'Logistics': 'Logistik',
      'Barriers': 'Schutzplanken',
      'Lockout/tagout': 'Lockout / Tagout',
      'Electrical safety': 'Elektrische Sicherheit',
      'Zero energy': 'Energiefreiheit',
      'Chemical handling': 'Gefahrstoffhandling',
      'Chemical': 'Chemikalien',
      'PPE': 'PSA',
      'Acid dosing': 'Säuredosierung',
      'Containment': 'Auffangwanne',
      '5S': '5S',
      'Storage': 'Werkzeuglagerung',
      'Sharp edges': 'Scharfe Kanten',
      'Productivity': 'Produktivität',
      'Shadow board': 'Schattenwand',
      'Optical laser': 'Optischer Laser',
      'Blind spot': 'Toter Winkel',
      'Warning systems': 'Warnsysteme',
    }
  },

  pt: {
    categories: {
      'Safety': 'Segurança',
      'Quality': 'Qualidade',
      'Productivity': 'Produtividade',
      'Efficiency': 'Eficiência',
      '5S & Workplace': '5S e Ambiente de Trabalho',
      'Environment': 'Meio Ambiente',
      'Wellbeing & Ergonomics': 'Bem-estar e Ergonomia',
      'Maintenance': 'Manutenção',
      'Digitalisation & Automation': 'Digitalização e Automação',
      'Cost Reduction': 'Redução de Custos',
      'Standardisation': 'Padronização',
      'Chemical': 'Segurança Química',
      'Logistics': 'Logística',
    },
    risks: {
      'Sharp edges / Cuts': 'Bordas afiadas / Cortes',
      'Mobile equipment / Vehicles': 'Equipamentos móveis / Empilhadeiras',
      'Hazardous energy / Electrical': 'Energias perigosas / Elétrico',
      'Chemical / Toxic': 'Substâncias químicas / Tóxico',
      'Work at heights': 'Trabalho em altura',
      'Confined spaces': 'Espaços confinados',
      'Ergonomics / Manual handling': 'Ergonomia / Movimentação manual',
      'Operational safety': 'Segurança operacional',
      'Fire & explosion': 'Incêndio e explosão',
      'Pressure systems': 'Sistemas pressurizados',
      'Slips, trips & falls': 'Escorregões, tropeços e quedas',
    },
    processes: {
      'Paper slitting & rewinding': 'Corte longitudinal e rebobinamento de papel',
      'Warehousing & internal transport': 'Armazenamento e logística interna',
      'Preventive plant shutdowns': 'Paradas programadas de manutenção',
      'Bleaching & pH adjustment': 'Branqueamento e controle de pH',
      'Tool storage & preparation': 'Armazenamento e preparação de ferramentas',
      'Roll clamp transport': 'Transporte de bobinas com garra',
      'Operations': 'Operações industriais',
      'Timber harvesting & debarking': 'Colheita florestal e descascamento',
      'Boiler & steam production': 'Caldeiras e geração de vapor',
    },
    equipments: {
      'Slitter arbor': 'Eixo porta-facas da cortadeira',
      'Counterbalance forklifts': 'Empilhadeiras a contrapeso',
      'Main pump motor breakers': 'Disjuntores principais de bombas',
      'Dosing pumps and manifold': 'Bombas dosadoras e manifold de tubulações',
      'Tooling shadow cart': 'Carrinho organizador 5S com sombras',
      'Linde clamp truck': 'Empilhadeira com garra giratória',
      'Standard machinery': 'Maquinário padrão da planta',
      'Overhead crane': 'Ponte rolante',
    },
    countries: {
      'Finland': 'Finlândia',
      'Germany': 'Alemanha',
      'Argentina': 'Argentina',
      'Uruguay': 'Uruguai',
      'United States': 'Estados Unidos',
      'Brazil': 'Brasil',
      'China': 'China',
      'Global': 'Global',
    },
    roles: {
      'employee': 'Colaborador',
      'safety_expert': 'Especialista em Segurança',
      'approver': 'Avaliador Titular',
      'admin': 'Administrador Global',
      'guest': 'Visitante Público',
      'Maintenance Specialist': 'Especialista em Manutenção',
      'Safety Director': 'Diretor de Segurança',
      'Chemical Safety Lead': 'Líder de Segurança em Processos Químicos',
      'Continuous Improvement Champion': 'Líder de Melhoria Contínua e 5S',
      'Global Safety Lead': 'Líder Global de Segurança',
      'Process Safety Lead': 'Líder de Segurança de Processos',
      'Continuous Improvement Lead': 'Líder de Melhoria Contínua',
      'VP Health & Safety': 'Vice-Presidente de Saúde, Segurança e Meio Ambiente',
      'Global Admin': 'Administrador Global',
      'Public Guest': 'Visitante Público',
      'Production Supervisor': 'Supervisor de Produção',
    },
    departments: {
      'Mantenimiento Mecánico y Confiabilidad': 'Manutenção Mecânica e Confiabilidade',
      'Mechanical Maintenance & Reliability': 'Manutenção Mecânica e Confiabilidade',
      'Seguridad Global y Excelencia Operacional': 'Segurança Global e Excelência Operacional',
      'Global Safety & Operational Excellence': 'Segurança Global e Excelência Operacional',
      'Líder de Seguridad en Procesos Químicos': 'Segurança Química e de Processos',
      'Process Safety & Chemical Lead': 'Segurança Química e de Processos',
      'Campeón de Mejora Continua y 5S': 'Melhoria Contínua e Programa 5S',
      'Continuous Improvement & 5S Champion': 'Melhoria Contínua e Programa 5S',
      'Vicepresidenta de Salud, Seguridad y Medio Ambiente': 'Vice-Presidência de Saúde, Segurança e Meio Ambiente',
      'VP Health, Safety & Environment': 'Vice-Presidência de Saúde, Segurança e Meio Ambiente',
      'Gobernanza del Conocimiento Corporativo': 'Governança do Conhecimento Corporativo',
      'Corporate Knowledge Governance': 'Governança do Conhecimento Corporativo',
      'Observador de la Industria': 'Observador da Indústria',
      'Industry Observer': 'Observador da Indústria',
      'Corporate Operations': 'Operações Corporativas',
    },
    causeTypes: {
      'technical': 'Causa técnica',
      'procedural': 'Procedimento operacional',
      'organizational': 'Organizacional',
      'human_factors': 'Fatores humanos',
      'equipment': 'Falha de equipamento',
    },
    practiceTypes: {
      'good_practice': 'Boa prática',
      'lesson_learned': 'Lição aprendida',
      'standard_procedure': 'Procedimento padrão',
    },
    tags: {
      'Machine guarding': 'Proteção de máquinas',
      'Slitter': 'Cortadeira',
      'Cut prevention': 'Prevenção de cortes',
      'Maintenance': 'Manutenção',
      'Safety device': 'Dispositivo de segurança',
      'LOTO': 'Bloqueio LOTO',
      'Forklift safety': 'Segurança com empilhadeiras',
      'Pedestrian separation': 'Segregação de pedestres',
      'Warehouse': 'Almoxarifado',
      'Logistics': 'Logística',
      'Barriers': 'Barreiras de proteção',
      'Lockout/tagout': 'Bloqueio e etiquetagem',
      'Electrical safety': 'Segurança elétrica',
      'Zero energy': 'Energia zero',
      'Chemical handling': 'Manuseio de químicos',
      'Chemical': 'Químicos',
      'PPE': 'EPI',
      'Acid dosing': 'Dosagem de ácido',
      'Containment': 'Contenção de vazamentos',
      '5S': '5S',
      'Storage': 'Armazenamento',
      'Sharp edges': 'Bordas cortantes',
      'Productivity': 'Produtividade',
      'Shadow board': 'Painel de sombras',
      'Optical laser': 'Laser óptico',
      'Blind spot': 'Ponto cego',
      'Warning systems': 'Sistemas de alerta',
    }
  }
};

export function translateCategory(category: string, lang: SupportedLanguage): string {
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  if (dict.categories[category]) return dict.categories[category];
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const key = `cat_${category.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  return t[key] || category;
}

export function translateStatus(status: string, lang: SupportedLanguage): string {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const key = `status_${status}`;
  return t[key] || status.replace('_', ' ');
}

export function translateRiskType(riskType: string, lang: SupportedLanguage): string {
  if (!riskType) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  return dict.risks[riskType] || riskType;
}

export function translateProcessType(processType: string, lang: SupportedLanguage): string {
  if (!processType) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  return dict.processes[processType] || processType;
}

export function translateEquipmentType(equipmentType: string, lang: SupportedLanguage): string {
  if (!equipmentType) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  return dict.equipments[equipmentType] || equipmentType;
}

export function translateCountry(country: string, lang: SupportedLanguage): string {
  if (!country) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  return dict.countries[country] || country;
}

export function translateRole(role: string, lang: SupportedLanguage): string {
  if (!role) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  if (dict.roles[role]) return dict.roles[role];
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const key = `role_${role}`;
  return t[key] || role;
}

export function translateDepartment(department: string, lang: SupportedLanguage): string {
  if (!department) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  return dict.departments[department] || department;
}

export function translateCauseType(causeType: string, lang: SupportedLanguage): string {
  if (!causeType) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  return dict.causeTypes[causeType] || causeType;
}

export function translatePracticeType(type: string, lang: SupportedLanguage): string {
  if (!type) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  return dict.practiceTypes[type] || type;
}

export function translateTag(tag: string, lang: SupportedLanguage): string {
  if (!tag) return '';
  const dict = TAXONOMY_TRANSLATIONS[lang] || TAXONOMY_TRANSLATIONS.en;
  return dict.tags[tag] || tag;
}

// Localized approvers helper
function getLocalizedApprovers(approvers: ApproverDecision[], lang: SupportedLanguage): ApproverDecision[] {
  return approvers.map(a => {
    let comment = a.comments;
    if (comment) {
      if (lang === 'es') {
        if (comment.includes('ISO 12100')) comment = 'Totalmente conforme con normas de seguridad en maquinaria ISO 12100.';
        else if (comment.includes('ergonomic') || comment.includes('magnético')) comment = 'Excelente diseño ergonómico y encastre magnético seguro.';
        else if (comment.includes('South America') || comment.includes('Sudamérica') || comment.includes('Fray Bentos')) comment = 'Excelente potencial de réplica en plantas de Sudamérica.';
        else if (comment.includes('Unanimous approval') || comment.includes('Aprobación unánime')) comment = 'Aprobación unánime concedida para publicación global.';
        else if (comment.includes('light levels') || comment.includes('lumínicos')) comment = 'Excelente concepto técnico. Los niveles lumínicos cumplen con normas de ergonomía visual.';
      } else if (lang === 'en') {
        if (comment.includes('ISO 12100')) comment = 'Fully compliant with machinery safety standards ISO 12100.';
        else if (comment.includes('ergonómico') || comment.includes('magnetic')) comment = 'Outstanding ergonomic design with secure magnetic interlock.';
        else if (comment.includes('Sudamérica') || comment.includes('South America') || comment.includes('Fray Bentos')) comment = 'High replication potential for pulp and packaging lines globally.';
        else if (comment.includes('unánime') || comment.includes('Unanimous')) comment = 'Unanimous approval granted for global publication.';
        else if (comment.includes('lumínicos') || comment.includes('light levels')) comment = 'Solid technical concept; optical projections meet visual ergonomics standards.';
      } else if (lang === 'fi') {
        if (comment.includes('ISO 12100')) comment = 'Täysin ISO 12100 -koneturvallisuusstandardin mukainen.';
        else if (comment.includes('ergonómico') || comment.includes('magnetic') || comment.includes('magnético')) comment = 'Erinomainen ergonominen rakenne ja luotettava magneettikiinnitys.';
        else if (comment.includes('Sudamérica') || comment.includes('South America')) comment = 'Erinomainen monistuspotentiaali UPM:n muissa tuotantoyksiköissä.';
        else if (comment.includes('unánime') || comment.includes('Unanimous')) comment = 'Yksimielinen hyväksyntä myönnetty maailmanlaajuiseen julkaisuun.';
        else if (comment.includes('lumínicos') || comment.includes('light levels')) comment = 'Vankka tekninen toteutus; optinen heijastus vastaa teollisuuden ergonomiaohjeita.';
      } else if (lang === 'de') {
        if (comment.includes('ISO 12100')) comment = 'Vollkommen konform mit der Maschinenrichtlinie und Norm ISO 12100.';
        else if (comment.includes('ergonómico') || comment.includes('magnetic') || comment.includes('magnético')) comment = 'Hervorragendes ergonomisches Design und sichere magnetische Verriegelung.';
        else if (comment.includes('Sudamérica') || comment.includes('South America')) comment = 'Hohes Replikationspotenzial für weitere Papier- und Zellstoffwerke.';
        else if (comment.includes('unánime') || comment.includes('Unanimous')) comment = 'Einstimmige Freigabe für globale Veröffentlichung erteilt.';
        else if (comment.includes('lumínicos') || comment.includes('light levels')) comment = 'Überzeugendes technisches Konzept; Laser-Projektion erfüllt optische Normen.';
      } else if (lang === 'pt') {
        if (comment.includes('ISO 12100')) comment = 'Totalmente em conformidade com as normas de segurança de máquinas ISO 12100.';
        else if (comment.includes('ergonómico') || comment.includes('magnetic') || comment.includes('magnético')) comment = 'Excelente projeto ergonômico e encaixe magnético seguro.';
        else if (comment.includes('Sudamérica') || comment.includes('South America')) comment = 'Excelente potencial de replicação para as fábricas da América do Sul e Europa.';
        else if (comment.includes('unánime') || comment.includes('Unanimous')) comment = 'Aprovação unânime concedida para publicação corporativa.';
        else if (comment.includes('lumínicos') || comment.includes('light levels')) comment = 'Conceito técnico consistente; níveis luminosos atendem às normas ergonômicas.';
      }
    }
    return {
      ...a,
      approverRole: translateRole(a.approverRole, lang),
      comments: comment,
    };
  });
}

// Localized comments helper
function getLocalizedComments(comments: PracticeComment[], lang: SupportedLanguage): PracticeComment[] {
  return (comments || []).map(c => {
    let text = c.text;
    if (lang === 'es') {
      if (text.includes('CAD') || text.includes('bobinadora')) {
        text = 'Ya estamos adaptando este modelo CAD para la bobinadora en Fray Bentos. ¡Nos ahorró meses de pruebas!';
      } else if (text.includes('visibilidad') || text.includes('visibility') || text.includes('Diseño visual')) {
        text = 'Diseño visual sobresaliente. El color rojo de alta visibilidad facilita la inspección inmediata.';
      } else if (text.includes('amarillo') || text.includes('yellow') || text.includes('tránsito')) {
        text = 'El recubrimiento amarillo de alta resistencia soporta perfectamente el tránsito constante.';
      }
    } else if (lang === 'en') {
      if (text.includes('CAD') || text.includes('bobinadora')) {
        text = 'We are already adapting this CAD file for the winder at Fray Bentos. Saved our engineering team months of prototyping!';
      } else if (text.includes('visibilidad') || text.includes('visibility') || text.includes('Diseño visual')) {
        text = 'Outstanding visual design. The high-visibility red shade facilitates immediate safety inspection.';
      } else if (text.includes('amarillo') || text.includes('yellow') || text.includes('tránsito')) {
        text = 'The heavy-duty yellow polymer coating holds up perfectly under continuous industrial traffic.';
      }
    } else if (lang === 'fi') {
      if (text.includes('CAD') || text.includes('bobinadora')) {
        text = 'Olemme jo ottamassa tämän CAD-mallin käyttöön pituusleikkurillemme. Säästi meiltä kuukausien työn!';
      } else if (text.includes('visibilidad') || text.includes('visibility') || text.includes('Diseño visual')) {
        text = 'Erinomainen visuaalinen toteutus. Hyvin näkyvä punainen väri tekee tarkastuksesta helppoa.';
      } else if (text.includes('amarillo') || text.includes('yellow') || text.includes('tránsito')) {
        text = 'Kestävä keltainen polymeeripinnoite kestää jatkuvaa trukkiliikennettä erinomaisesti.';
      }
    } else if (lang === 'de') {
      if (text.includes('CAD') || text.includes('bobinadora')) {
        text = 'Wir adaptieren dieses CAD-Modell bereits für unsere Rollenschneider. Hat uns monatelange Tests erspart!';
      } else if (text.includes('visibilidad') || text.includes('visibility') || text.includes('Diseño visual')) {
        text = 'Hervorragendes Design. Die signalrote Farbe gewährleistet eine sofortige visuelle Überprüfung.';
      } else if (text.includes('amarillo') || text.includes('yellow') || text.includes('tránsito')) {
        text = 'Die hochbelastbare gelbe Schutzbeschichtung hält dem ständigen Staplerverkehr optimal stand.';
      }
    } else if (lang === 'pt') {
      if (text.includes('CAD') || text.includes('bobinadora')) {
        text = 'Já estamos adaptando este modelo CAD para a rebobinadeira em Fray Bentos. Poupou meses de desenvolvimento!';
      } else if (text.includes('visibilidad') || text.includes('visibility') || text.includes('Diseño visual')) {
        text = 'Excelente padrão visual. A cor vermelha de alta visibilidade agiliza a inspeção de segurança.';
      } else if (text.includes('amarillo') || text.includes('yellow') || text.includes('tránsito')) {
        text = 'O revestimento amarelo de alta resistência suporta o tráfego pesado contínuo sem desgaste.';
      }
    }
    return {
      ...c,
      userRole: translateRole(c.userRole, lang),
      text,
    };
  });
}

// Master function to localize all fields of a good practice
export function getLocalizedPractice(practice: GoodPractice, lang: SupportedLanguage): GoodPractice {
  if (!practice) return practice;

  const overrides = practice.localized?.[lang];

  // Base localized practice
  const localizedTitle = overrides?.title || (lang === 'es' && practice.localized?.es?.title) || practice.title;
  const localizedSubtitle = overrides?.subtitle || (lang === 'es' && practice.localized?.es?.subtitle) || practice.subtitle;
  const localizedProblem = overrides?.problemStatement || (lang === 'es' && practice.localized?.es?.problemStatement) || practice.problemStatement;
  const localizedInitial = overrides?.initialSituation || (lang === 'es' && practice.localized?.es?.initialSituation) || practice.initialSituation;
  const localizedHazard = overrides?.hazardIdentified || (lang === 'es' && practice.localized?.es?.hazardIdentified) || practice.hazardIdentified;
  const localizedConsequences = overrides?.potentialConsequences || (lang === 'es' && practice.localized?.es?.potentialConsequences) || practice.potentialConsequences;
  const localizedRootCause = overrides?.rootCauseAnalysis || (lang === 'es' && practice.localized?.es?.rootCauseAnalysis) || practice.rootCauseAnalysis;
  const localizedSolution = overrides?.solutionDescription || (lang === 'es' && practice.localized?.es?.solutionDescription) || practice.solutionDescription;
  const localizedAction = overrides?.actionDetails || (lang === 'es' && practice.localized?.es?.actionDetails) || practice.actionDetails;
  const localizedResults = overrides?.resultsSummary || (lang === 'es' && practice.localized?.es?.resultsSummary) || practice.resultsSummary;
  const localizedQuantitative = overrides?.quantitativeImpact || (lang === 'es' && practice.localized?.es?.quantitativeImpact) || practice.quantitativeImpact;
  const localizedQualitative = overrides?.qualitativeBenefits || (lang === 'es' && practice.localized?.es?.qualitativeBenefits) || practice.qualitativeBenefits;
  const localizedApplicability = overrides?.applicabilityNote || (lang === 'es' && practice.localized?.es?.applicabilityNote) || practice.applicabilityNote;
  const localizedResources = overrides?.resourcesUsed || practice.resourcesUsed;

  // Localize tags
  const baseTags = overrides?.tags || practice.tags || [];
  const localizedTags = baseTags.map(t => translateTag(t, lang));

  // Localize approvers and comments
  const localizedApprovers = getLocalizedApprovers(practice.approvers || [], lang);
  const localizedComments = getLocalizedComments(practice.comments || [], lang);

  // Localize documents
  const localizedDocuments = (practice.documents || []).map(doc => {
    let name = doc.name;
    if (lang === 'es' && doc.name.toLowerCase().includes('blade')) {
      name = 'Procedimiento_cambio_cuchillas_seguro.pdf';
    } else if (lang === 'es' && doc.name.toLowerCase().includes('cad')) {
      name = 'Plano_CAD_Protector_Slitter.dwg';
    }
    return { ...doc, name };
  });

  return {
    ...practice,
    title: localizedTitle,
    subtitle: localizedSubtitle,
    problemStatement: localizedProblem,
    initialSituation: localizedInitial,
    hazardIdentified: localizedHazard,
    potentialConsequences: localizedConsequences,
    rootCauseAnalysis: localizedRootCause,
    solutionDescription: localizedSolution,
    actionDetails: localizedAction,
    resourcesUsed: localizedResources,
    resultsSummary: localizedResults,
    quantitativeImpact: localizedQuantitative,
    qualitativeBenefits: localizedQualitative,
    applicabilityNote: localizedApplicability,
    tags: localizedTags,
    category: practice.category,
    riskType: translateRiskType(practice.riskType, lang),
    processType: translateProcessType(practice.processType, lang),
    equipmentType: translateEquipmentType(practice.equipmentType, lang),
    country: translateCountry(practice.country, lang),
    authorRole: translateRole(practice.authorRole, lang),
    causeType: practice.causeType,
    practiceType: practice.practiceType,
    approvers: localizedApprovers,
    comments: localizedComments,
    documents: localizedDocuments,
  };
}
