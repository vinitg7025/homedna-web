import { CompatibilityProfileData } from '../types';

export const CITATIONS = [
  {
    source: 'ENVIRONMENTAL PSYCHOLOGY',
    year: '1999',
    finding: '+26% performance difference',
    detail: 'Measured difference between daylit and windowless environments.',
    implication: 'Natural light direction is a measurable productivity variable, not a preference.'
  },
  {
    source: 'COGNITIVE SCIENCE',
    year: '2007',
    finding: 'Ceiling height changes cognition',
    detail: 'High ceilings activate abstract thinking; low ceilings focus attention.',
    implication: 'Ceiling height recommendation is derived from how you work, not aesthetics.'
  },
  {
    source: 'PERSONALITY SCIENCE',
    year: '2002',
    finding: 'Personality predicts space',
    detail: 'Big Five personality traits measurably predict how a person arranges and responds to their living environment.',
    implication: 'Who you are determines what kind of space works for you — with measurable accuracy.'
  },
  {
    source: 'PERSONALITY SCIENCE',
    year: '2002',
    finding: 'Introversion predicts spatial preference',
    detail: 'Introversion and openness to experience are the two strongest predictors of spatial preference in residential environments.',
    implication: 'The same home will satisfy one personality type and frustrate another.'
  },
  {
    source: 'ENVIRONMENTAL MEDICINE',
    year: '1984',
    finding: 'Light affects biological recovery',
    detail: 'Natural light access measurably affects biological recovery, cognitive performance, and sleep quality.',
    implication: 'Orientation and light direction are health variables, not aesthetic ones.'
  }
];

// Sample Profile Data remains intact for reference
export const SAMPLE_PROFILE_DATA: CompatibilityProfileData = {
  archetypeName: 'The Inner Sanctuary',
  archetypeDescription: 'You need a home that protects your inner world. Quiet zones, controlled light, spaces that close. Not a show home — a refuge.',
  orientationSignature: 'South-West Primary · North-East Workspace · Morning Light Essential',
  attributes: [
    {
      id: 1,
      name: 'Entrance Direction',
      cluster: 'Spatial Alignment',
      recommendation: 'South-West, South, or West primary entrance is highly contraindicated. Target East or North-East entrances only.',
      basis: "Guided by Arjun's strong Virgo solar orientation and high OCEAN introversion scores. A non-compatible entrance triggers cognitive depletion during transitional periods.",
      toLookFor: 'Entrance doors facing between 0° (North) and 90° (East). True compass readings only.',
      toAvoid: 'Main entry doors opening to the South or South-West sectors. These trigger fatigue.',
      confidence: 'Absolute'
    },
    {
      id: 2,
      name: 'Ceiling Height',
      cluster: 'Spatial Alignment',
      recommendation: 'Multi-level spatial volumes. High ceilings (12ft+) for focus workspaces, standard cozy height (9ft) for retreat quarters.',
      basis: 'High volumes enhance abstract and holistic problem solving, matching his design profession. Standard volumes enhance focal execution and promote physical recovery.',
      toLookFor: 'A home with varied roof lines or dynamic mezzanine volumes.',
      toAvoid: 'Uniform low ceilings across all rooms. These suppress broad creative cognition.',
      confidence: 'High'
    },
    {
      id: 3,
      name: 'Natural Light Direction',
      cluster: 'Spatial Alignment',
      recommendation: 'Strong morning light access in living zones. High afternoon shaded orientation in the home office.',
      basis: 'Circadian rhythms require early light to arrest melatonin production. Mid-day intense west exposure triggers sensory overload for high-sensitivity personalities.',
      toLookFor: 'East-facing windows in the master suite and breakfast nook.',
      toAvoid: 'West-facing uncovered floor-to-ceiling glass in the primary study.',
      confidence: 'High'
    },
    {
      id: 4,
      name: 'Floor Plan Openness',
      cluster: 'Spatial Alignment',
      recommendation: 'Semi-private cellular floor plan with heavy acoustic division. Defined, load-bearing visual thresholds.',
      basis: 'High introversion demands spatial boundaries to feel secure. Open floor plans force continuous surveillance and social scanning.',
      toLookFor: 'Traditional nested rooms with doors and thick plaster partitions.',
      toAvoid: 'Column-only warehouse lofts with zero visual separation or private nooks.',
      confidence: 'High'
    },
    {
      id: 5,
      name: 'Social Space Configuration',
      cluster: 'Personal Resonance',
      recommendation: 'Centripetal layout. Cozy hearth or circular seating facing inward rather than open vistas.',
      basis: 'Inward-focused seating layouts promote deeper conversational intimacy and lower autonomic stress responses in high-empathy buyers.',
      toLookFor: 'Deep living rooms designed around a central anchor or fire.',
      toAvoid: 'Long, linear seating arrangements facing giant television screens.',
      confidence: 'Moderate'
    },
    {
      id: 6,
      name: 'Private Retreat Quality',
      cluster: 'Personal Resonance',
      recommendation: 'A dedicated, sound-insulated retreat room. Under-scaled cozy dimensions with low sills.',
      basis: 'A sanctuary zone is critical for nervous system recovery. Low sills create a protective posture while allowing ground views.',
      toLookFor: 'A room with a single entry point, small proportions, and thick walls.',
      toAvoid: 'Retreat spaces with dual-entry doors or high overhead glass.',
      confidence: 'Absolute'
    },
    {
      id: 7,
      name: 'Workspace Orientation',
      cluster: 'Personal Resonance',
      recommendation: 'Desk placed in the North-East sector, facing North. Solid wall behind the chair.',
      basis: 'North orientation provides uniform, glare-free light quality. A secure back wall activates the parasympathetic system, enhancing deep focus.',
      toLookFor: 'A room in the North-East corner of the floor plan.',
      toAvoid: 'Desks positioned with backs directly to open doorways or windows.',
      confidence: 'High'
    },
    {
      id: 8,
      name: 'Material and Texture Preference',
      cluster: 'Personal Resonance',
      recommendation: 'Raw, organic, tactile materials. Clay plaster, unvarnished oak, textured stone surfaces.',
      basis: 'Biophilic materials lower cortisol levels. Synthetic materials or glossy chrome surfaces trigger tactile rejection in high-sensitivity buyers.',
      toLookFor: 'Matte finishes, timber, clay, lime washes, and brickwork.',
      toAvoid: 'Highly polished lacquer, heavy plastic, or cold chrome finishes.',
      confidence: 'Moderate'
    },
    {
      id: 9,
      name: 'Elemental Zone Alignment',
      cluster: 'Elemental Compatibility',
      recommendation: 'Water and air element zone dominance in personal workspace. Earth element in bedroom.',
      basis: "Derived from Arjun's Mercury chart positions. Air zones support analytical processing. Earth zones stabilize physical restoration during sleep cycles.",
      toLookFor: 'Bedroom positioned in the South-West (Earth) sector of the home.',
      toAvoid: 'Water features, bathrooms, or drainage in the South-West sector.',
      confidence: 'High'
    },
    {
      id: 10,
      name: 'Vedic Room Placement',
      cluster: 'Elemental Compatibility',
      recommendation: 'Kitchen positioned in the South-East (Fire) sector. Worship or quiet study in North-East.',
      basis: 'Aligns elemental metabolic heat of food preparation with solar rays. Enhances digestive energy and spiritual mental clarity.',
      toLookFor: 'A house where the kitchen sits strictly in the South-East quadrant.',
      toAvoid: 'Kitchen sitting in the North-East sector, which pollutes spiritual quietness.',
      confidence: 'High'
    },
    {
      id: 11,
      name: 'Planetary Period Compatibility',
      cluster: 'Elemental Compatibility',
      recommendation: 'Accentuate Jupiter-governed spaces (North-East, libraries) during his current Mahadasha.',
      basis: "Arjun's current Jupiter planetary period demands spatial expansion for learning. Activating the Jupiter sector of the house matches current life goals.",
      toLookFor: 'A prominent, spacious study or meditation room in the North-East.',
      toAvoid: 'Storing heavy waste or utility items in the North-East sector.',
      confidence: 'Moderate'
    },
    {
      id: 12,
      name: 'Household Composition Fit',
      cluster: 'Elemental Compatibility',
      recommendation: 'Highly compatible with joint-buyer. Clear spatial separation of workspace and shared sanctuary.',
      basis: 'The household combines an extrovert partner and an introvert buyer. Shared spaces must converge, but workspaces must sit in separate hemispheres.',
      toLookFor: 'Dual-wing homes or houses with clear multi-floor separation.',
      toAvoid: 'Single-room open loft apartments where separation is impossible.',
      confidence: 'Absolute'
    }
  ]
};

// Vedic Sidereal Sun Sign calculation helper
export function getVedicZodiacSign(dobString: string): string {
  if (!dobString) return '';
  const date = new Date(dobString);
  if (isNaN(date.getTime())) return '';
  
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 4 && day >= 14) || (month === 5 && day <= 14)) return 'Aries (Mesha)';
  if ((month === 5 && day >= 15) || (month === 6 && day <= 14)) return 'Taurus (Vrishabha)';
  if ((month === 6 && day >= 15) || (month === 7 && day <= 15)) return 'Gemini (Mithuna)';
  if ((month === 7 && day >= 16) || (month === 8 && day <= 16)) return 'Cancer (Karka)';
  if ((month === 8 && day >= 17) || (month === 9 && day <= 16)) return 'Leo (Simha)';
  if ((month === 9 && day >= 17) || (month === 10 && day <= 16)) return 'Virgo (Kanya)';
  if ((month === 10 && day >= 17) || (month === 11 && day <= 15)) return 'Libra (Tula)';
  if ((month === 11 && day >= 16) || (month === 12 && day <= 15)) return 'Scorpio (Vrishchika)';
  if ((month === 12 && day >= 16) || (month === 1 && day <= 13)) return 'Sagittarius (Dhanu)';
  if ((month === 1 && day >= 14) || (month === 2 && day <= 12)) return 'Capricorn (Makara)';
  if ((month === 2 && day >= 13) || (month === 3 && day <= 13)) return 'Aquarius (Kumbha)';
  if ((month === 3 && day >= 14) || (month === 4 && day <= 13)) return 'Pisces (Meena)';
  
  return 'Aries (Mesha)';
}
