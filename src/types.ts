// Shared Types and Models for HomeDNA

export type ActiveView = 'home' | 'how-it-works' | 'science' | 'sample-profile' | 'about' | 'start' | 'result';

export interface AdultProfile {
  id: string;
  name: string;
  role: string; // 'Primary Resident' | 'Partner' | 'Parent' | 'In-law' | 'Other'
  occupation: string;

  // Section 1: Astro-Vastu
  dob: string;
  birthTime?: string;
  birthTimeUnknown: boolean;
  birthPlace?: string;
  nakshatra?: string;
  zodiacSign?: string; // fallback if dob skipped

  // Section 2A: TIPI Scores (1-7 scale)
  tipiExtraverted: number;
  tipiCritical: number;
  tipiDependable: number;
  tipiAnxious: number;
  tipiOpen: number;
  tipiReserved: number;
  tipiSympathetic: number;
  tipiDisorganized: number;
  tipiCalm: number;
  tipiConventional: number;

  // Section 2B: Behavioral Proxy Questions
  proxyGuests: string; // 'A' | 'B' | 'C' | 'D'
  proxyDecompress: string; // 'A' | 'B' | 'C' | 'D'
  proxyStorage: string; // 'A' | 'B' | 'C' | 'D'
  proxyDecor: string; // 'A' | 'B' | 'C' | 'D'

  // Section 2C: Usage and Lifestyle
  wfhStatus: string; // 'full-time' | 'hybrid' | 'occasional' | 'no'
  studyAtHome: string; // 'child' | 'adult' | 'no'
  naturalLightScale: number; // 1-5
  healthConditions: string[]; // e.g. ['stress', 'sleep', 'respiratory', 'vision']
  sensorySensitivity: number; // 1-5
  recoveryFrequency: number; // 1-5
  sunlightSensitivity: number; // 1-5

  // Optional "Tell us more" inputs (all unanswered by default)
  enneagram?: string; // '1'-'9'
  sleepSchedule?: string; // 'early_riser' | 'standard' | 'late_riser'
  stressStyle?: string; // 'hyperarousal' | 'hypoarousal' | 'optimal'
  spaciousness?: string; // '1'-'5'
  sadHistory?: boolean;
  creativeHobbies?: boolean;
  studentOrSpiritual?: boolean;
  designProfession?: boolean;
  officeNoDaylight?: boolean;
}

export interface PlotDetails {
  shape: string;
  extension: string;
  slope: string;
  surroundings: string;
  soil: string;
  tank: string;
  terrain: string;
  shalya: boolean;
}

// Optional details about the home being evaluated and the buyer's tradition add-ons
export interface HomeDetails {
  situation: string[];
  floorPlan: string; // '' | 'yes' | 'no'
  doorColor: string;
  doorMaterial: string;
  doorObstructions: string[];
  neContains: string[];
  structure: string[];
  plants: string[];
  plot: PlotDetails;
  addons: string[];
}

export const createDefaultHomeDetails = (): HomeDetails => ({
  situation: [], floorPlan: '', doorColor: '', doorMaterial: '', doorObstructions: [], neContains: [], structure: [], plants: [],
  plot: { shape: '', extension: '', slope: '', surroundings: '', soil: '', tank: '', terrain: '', shalya: false },
  addons: [],
});

export interface AssessmentAnswers {
  // Section 0: Household Setup
  numAdults: number;
  householdType: string; // 'couple' | 'nuclear' | 'joint' | 'friends'
  primaryResident: string; // 'me' | 'spouse' | 'parent' | 'equal'
  adults: AdultProfile[];
  childrenAges: string; // optional, e.g. "6, 14"

  // Section 3: Vastu and Design Intent
  vastuImportance: string; // 'essential' | 'important' | 'neutral' | 'not-important'
  homeIntent: string;
  propertyType: string; // 'flat' | 'villa' | 'plot' | 'resale'
  householdHealthSupport: string[]; // Q3.4 selection
  lifeSituations: string[]; // Q3.5 selection
  financialSituation: string; // 'growing' | 'stable' | 'pressure' | 'difficulty'
  careerSituation: string; // 'progressing' | 'stable' | 'stagnant' | 'difficult'
  childConcerns: string[]; // Q3.5b (only asked when children are present)
  vastuSchool: string; // Q3.8 'none' | 'nagara' | 'dravida' | 'maharishi' | 'kp' | 'unsure'
  home: HomeDetails;

  // Legacy flat-fields (to maintain seamless compatibility with other screens)
  firstName: string;
  email: string;
  dob: string;
  ceilingPreference: string;
  lightPreference: string;
  entrancePreference: string;
  opennessPreference: string;
  socialStyle: string;
  materialTexture: string;
  workspaceNeed: string;
  householdSize: string;

  // Add extra traits at the root if needed for fallback
  tipiExtraverted: number;
  tipiCritical: number;
  tipiDependable: number;
  tipiAnxious: number;
  tipiOpen: number;
  tipiReserved: number;
  tipiSympathetic: number;
  tipiDisorganized: number;
  tipiCalm: number;
  tipiConventional: number;
}

export interface CompatibilityAttribute {
  id: number;
  name: string;
  cluster: 'Spatial Alignment' | 'Personal Resonance' | 'Elemental Compatibility';
  recommendation: string;
  basis: string;
  toLookFor: string;
  toAvoid: string;
  confidence: 'Absolute' | 'High' | 'Moderate';
}

export interface CompatibilityProfileData {
  archetypeName: string;
  archetypeDescription: string;
  orientationSignature: string;
  attributes: CompatibilityAttribute[];
}

export const createDefaultAdultProfile = (id: string, name = '', role = 'Primary Resident'): AdultProfile => ({
  id,
  name,
  role,
  occupation: 'creative',
  dob: '',
  birthTime: '',
  birthTimeUnknown: false,
  birthPlace: '',
  nakshatra: '',
  zodiacSign: '',
  tipiExtraverted: 4,
  tipiCritical: 4,
  tipiDependable: 4,
  tipiAnxious: 4,
  tipiOpen: 4,
  tipiReserved: 4,
  tipiSympathetic: 4,
  tipiDisorganized: 4,
  tipiCalm: 4,
  tipiConventional: 4,
  proxyGuests: 'B',
  proxyDecompress: 'B',
  proxyStorage: 'B',
  proxyDecor: 'B',
  wfhStatus: 'hybrid',
  studyAtHome: 'no',
  naturalLightScale: 3,
  healthConditions: [],
  sensorySensitivity: 3,
  recoveryFrequency: 3,
  sunlightSensitivity: 3,
});

