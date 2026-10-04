import React from 'react';
import { ArrowRight, ChevronLeft, Sparkles } from 'lucide-react';
import { AssessmentAnswers, AdultProfile, HomeDetails } from '../types';

interface Props {
  answers: AssessmentAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<AssessmentAnswers>>;
  onBack: () => void;
  onGenerate: () => void;
}

type Opt = { id: string; label: string };

const ENNEAGRAM: Opt[] = [
  { id: '1', label: '1 — Reformer' }, { id: '2', label: '2 — Helper' }, { id: '3', label: '3 — Achiever' },
  { id: '4', label: '4 — Individualist' }, { id: '5', label: '5 — Investigator' }, { id: '6', label: '6 — Loyalist' },
  { id: '7', label: '7 — Enthusiast' }, { id: '8', label: '8 — Challenger' }, { id: '9', label: '9 — Peacemaker' },
];
const SLEEP: Opt[] = [
  { id: 'early_riser', label: 'Early (5–7 AM)' }, { id: 'standard', label: 'Standard (7–9 AM)' }, { id: 'late_riser', label: 'Late (9 AM+) / shift work' },
];
const STRESS: Opt[] = [
  { id: 'hyperarousal', label: 'Wired, on edge, easily overwhelmed' }, { id: 'hypoarousal', label: 'Flat, shut down, withdrawn' }, { id: 'optimal', label: 'Generally balanced' },
];
const SPACIOUS: Opt[] = [1, 2, 3, 4, 5].map(n => ({ id: String(n), label: n === 1 ? '1 — little' : n === 5 ? '5 — a lot' : String(n) }));
const PERSON_FLAGS: { key: keyof AdultProfile; label: string }[] = [
  { key: 'sadHistory', label: 'I have a history of seasonal low mood, depression or insomnia' },
  { key: 'creativeHobbies', label: 'I have creative hobbies' },
  { key: 'studentOrSpiritual', label: 'I am a student or a spiritual practitioner' },
  { key: 'designProfession', label: 'I work in design or architecture' },
  { key: 'officeNoDaylight', label: 'My home gets little daylight and my workplace has no windows' },
];
const SITUATION: Opt[] = [
  { id: 'existing_building', label: 'The ceiling height cannot be changed (resale or apartment)' },
  { id: 'limited_natural_light', label: 'The home has a north-facing, basement or windowless space I would use' },
  { id: 'no_water_feature', label: 'There is no pool or water body available' },
  { id: 'quiet_edge_zone_available', label: 'The home has a quieter edge zone away from road noise' },
  { id: 'elderly_or_cognitive_member', label: 'Someone in the household is elderly or has memory / cognitive changes' },
  { id: 'kitchen_position_fixed', label: 'The kitchen position is fixed (structural) and cannot be chosen' },
];
const DOOR_COLORS = ['Brown', 'Yellow', 'Red', 'White', 'Blue', 'Black'];
const DOOR_MATERIALS: Opt[] = [{ id: 'solid_wood', label: 'Solid wood' }, { id: 'glass', label: 'Glass' }, { id: 'metal', label: 'Metal' }, { id: 'other', label: 'Other' }];
const OBSTRUCTIONS: Opt[] = [
  { id: 'tree_trunk', label: 'A tree trunk' }, { id: 'well_pit', label: 'A well, pit or borewell' }, { id: 'pole', label: 'A pillar, electric pole or lamppost' },
  { id: 'shadow', label: 'Another building shades the door most of the day' }, { id: 'corner', label: 'Another building\'s corner points at the door' },
  { id: 'road_head_on', label: 'A road ends head-on at the door' },
];
const NE_CONTAINS: Opt[] = [
  { id: 'toilet', label: 'Toilet or bathroom' }, { id: 'overhead_storage', label: 'Overhead storage or heavy shelving' },
  { id: 'kitchen', label: 'Kitchen or fire zone' }, { id: 'stairs', label: 'Staircase' },
];
const STRUCTURE: Opt[] = [
  { id: 'ne_corner_missing', label: 'The North-East corner of the plot is cut or missing' },
  { id: 'marma_brahmasthan', label: 'A wall, pillar, toilet or stairs sits at the exact centre of the home' },
  { id: 'marma_other', label: 'A wall, pillar, toilet or stairs strikes the diagonal lines of the plan' },
  { id: 'mahadasha_direction_dosha', label: 'I already know of a defect in the direction of my Mahadasha planet' },
];
const PLANTS: Opt[] = [
  { id: 'tulsi', label: 'Tulsi' }, { id: 'neem', label: 'Neem' }, { id: 'fruit', label: 'Fruit-bearing trees' }, { id: 'thorny', label: 'Thorny plants' },
  { id: 'latex', label: 'Milk-sap (latex) trees' }, { id: 'large_tree', label: 'A large tree close to the house' }, { id: 'dead_tree', label: 'A dead or dried-up tree' },
];
const DIRS: Opt[] = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'].map(d => ({ id: d, label: d }));
const PLOT_SHAPE: Opt[] = [
  { id: 'square', label: 'Square' }, { id: 'rectangle', label: 'Rectangle (2:1 or less)' }, { id: 'triangular', label: 'Triangular' },
  { id: 'bow', label: 'Bow-shaped' }, { id: 'drum', label: 'Drum-shaped' }, { id: 'irregular', label: 'Irregular' },
];
const PLOT_EXT: Opt[] = [{ id: 'NE', label: 'North-East' }, { id: 'SW', label: 'South-West' }, { id: 'none', label: 'Neither' }];
const LEVELS: Opt[] = [
  { id: 'best', label: 'Higher land to the South/West, open lower land to the North/East' }, { id: 'average', label: 'Mixed' }, { id: 'adverse', label: 'Higher land to the North/East' },
];
const SOIL: Opt[] = [
  { id: 'surplus', label: 'Pit refilled with surplus soil' }, { id: 'deficit', label: 'Soil fell short' }, { id: 'holds_water', label: 'Pit held water' }, { id: 'not_done', label: 'Not done' },
];
const TERRAIN: Opt[] = [{ id: 'sadharana', label: 'Mixed (Sadharana)' }, { id: 'jangala', label: 'Arid (Jangala)' }, { id: 'anupa', label: 'Marshy (Anupa)' }];
const ADDONS: Opt[] = [
  { id: 'aya_addon', label: 'Strict-tradition add-on: Aya numerology (uses the measured length and breadth of the plot)' },
  { id: 'lagna_third_table', label: 'Show me the alternative Lagna-to-direction table' },
];

const label = 'font-soehne text-xs font-bold text-midnight uppercase tracking-wider block';
const hint = 'font-soehne text-[11px] text-stone';
const toggle = (list: string[], id: string) => (list.includes(id) ? list.filter(i => i !== id) : [...list, id]);

function Choice({ options, value, onPick }: { options: Opt[]; value?: string; onPick: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button
          key={o.id}
          type="button"
          onClick={() => onPick(value === o.id ? '' : o.id)}
          className={`px-3.5 py-2.5 min-h-[40px] text-xs text-left border rounded transition-all cursor-pointer ${
            value === o.id ? 'border-midnight bg-midnight text-off-white font-semibold' : 'border-stone/25 bg-white hover:border-gold text-stone'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Checks({ options, values, onChange }: { options: Opt[]; values: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map(o => (
        <label key={o.id} className="flex items-start gap-2.5 p-3 rounded border border-stone/20 bg-stone/5 text-xs text-midnight cursor-pointer hover:bg-stone/10 transition-colors">
          <input type="checkbox" checked={values.includes(o.id)} onChange={() => onChange(toggle(values, o.id))} className="rounded accent-gold mt-0.5" />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  );
}

export default function MoreDetails({ answers, setAnswers, onBack, onGenerate }: Props) {
  const home = answers.home;
  const setHome = (fields: Partial<HomeDetails>) => setAnswers({ ...answers, home: { ...home, ...fields } });
  const setPlot = (fields: Partial<HomeDetails['plot']>) => setHome({ plot: { ...home.plot, ...fields } });
  const setAdult = (idx: number, fields: Partial<AdultProfile>) =>
    setAnswers({ ...answers, adults: answers.adults.map((a, i) => (i === idx ? { ...a, ...fields } : a)) });

  const anyAnswered =
    answers.adults.some(a => a.enneagram || a.sleepSchedule || a.stressStyle || a.spaciousness || a.sadHistory || a.creativeHobbies || a.studentOrSpiritual || a.designProfession || a.officeNoDaylight) ||
    home.situation.length > 0 || home.floorPlan || home.doorColor || home.doorMaterial || home.doorObstructions.length > 0 || home.neContains.length > 0 ||
    home.structure.length > 0 || home.plants.length > 0 || Object.values(home.plot).some(Boolean) || home.addons.length > 0;

  return (
    <div className="w-full min-h-screen bg-off-white pt-12 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="space-y-3">
          <span className="font-soehne text-xs text-stone uppercase tracking-widest font-bold">OPTIONAL · TELL US MORE</span>
          <h2 className="font-canela text-4xl font-light text-midnight">The more you tell us, the more of the rule book applies to you</h2>
          <p className="font-soehne text-sm text-stone leading-relaxed">
            Everything on this page is optional. Skip anything you do not know. Your profile is complete without it.
          </p>
        </div>

        {/* Per-adult */}
        {answers.adults.map((adult, idx) => (
          <div key={adult.id} className="space-y-5 p-6 bg-white border border-stone/15 rounded-lg">
            <span className="font-soehne text-[11px] text-gold uppercase tracking-[0.15em] font-bold">
              About {adult.name || `Adult ${idx + 1}`}
            </span>
            <div className="space-y-2"><span className={label}>Enneagram type (if you know it)</span><Choice options={ENNEAGRAM} value={adult.enneagram} onPick={v => setAdult(idx, { enneagram: v })} /></div>
            <div className="space-y-2"><span className={label}>When do you usually wake up?</span><Choice options={SLEEP} value={adult.sleepSchedule} onPick={v => setAdult(idx, { sleepSchedule: v })} /></div>
            <div className="space-y-2"><span className={label}>When you are stressed at home, which is closer to you?</span><Choice options={STRESS} value={adult.stressStyle} onPick={v => setAdult(idx, { stressStyle: v })} /></div>
            <div className="space-y-2"><span className={label}>How much does a spacious feeling matter to you?</span><Choice options={SPACIOUS} value={adult.spaciousness} onPick={v => setAdult(idx, { spaciousness: v })} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PERSON_FLAGS.map(f => (
                <label key={String(f.key)} className="flex items-start gap-2.5 p-3 rounded border border-stone/20 bg-stone/5 text-xs text-midnight cursor-pointer hover:bg-stone/10 transition-colors">
                  <input type="checkbox" checked={!!adult[f.key]} onChange={() => setAdult(idx, { [f.key]: !adult[f.key] } as Partial<AdultProfile>)} className="rounded accent-gold mt-0.5" />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Living situation */}
        <div className="space-y-3 p-6 bg-white border border-stone/15 rounded-lg">
          <span className={label}>About your living situation</span>
          <Checks options={SITUATION} values={home.situation} onChange={v => setHome({ situation: v })} />
        </div>

        {/* Specific home */}
        <details className="p-6 bg-white border border-stone/15 rounded-lg">
          <summary className="cursor-pointer font-soehne text-xs font-bold text-midnight uppercase tracking-wider">A specific home you are evaluating</summary>
          <div className="space-y-6 pt-5">
            <div className="space-y-2"><span className={label}>Do you have a floor plan of the home?</span>
              <Choice options={[{ id: 'yes', label: 'Yes' }, { id: 'no', label: 'No' }]} value={home.floorPlan} onPick={v => setHome({ floorPlan: v })} /></div>
            <div className="space-y-2"><span className={label}>Main door colour</span><Choice options={DOOR_COLORS.map(c => ({ id: c, label: c }))} value={home.doorColor} onPick={v => setHome({ doorColor: v })} /></div>
            <div className="space-y-2"><span className={label}>Main door material</span><Choice options={DOOR_MATERIALS} value={home.doorMaterial} onPick={v => setHome({ doorMaterial: v })} /></div>
            <div className="space-y-2"><span className={label}>Is anything directly facing the main door?</span><Checks options={OBSTRUCTIONS} values={home.doorObstructions} onChange={v => setHome({ doorObstructions: v })} /></div>
            <div className="space-y-2"><span className={label}>Anything in the North-East of the home?</span><Checks options={NE_CONTAINS} values={home.neContains} onChange={v => setHome({ neContains: v })} /></div>
            <div className="space-y-2"><span className={label}>Structural checks</span><Checks options={STRUCTURE} values={home.structure} onChange={v => setHome({ structure: v })} /></div>
            <div className="space-y-2"><span className={label}>Plants near the home</span><Checks options={PLANTS} values={home.plants} onChange={v => setHome({ plants: v })} /></div>
          </div>
        </details>

        {/* Plot */}
        <details className="p-6 bg-white border border-stone/15 rounded-lg">
          <summary className="cursor-pointer font-soehne text-xs font-bold text-midnight uppercase tracking-wider">Plot or independent house checks</summary>
          <div className="space-y-6 pt-5">
            <div className="space-y-2"><span className={label}>Plot shape</span><Choice options={PLOT_SHAPE} value={home.plot.shape} onPick={v => setPlot({ shape: v })} /></div>
            <div className="space-y-2"><span className={label}>Plot extends toward</span><Choice options={PLOT_EXT} value={home.plot.extension} onPick={v => setPlot({ extension: v })} /></div>
            <div className="space-y-2"><span className={label}>Ground slopes down toward</span><Choice options={DIRS} value={home.plot.slope} onPick={v => setPlot({ slope: v })} /></div>
            <div className="space-y-2"><span className={label}>Surrounding levels</span><Choice options={LEVELS} value={home.plot.surroundings} onPick={v => setPlot({ surroundings: v })} /></div>
            <div className="space-y-2"><span className={label}>Classical soil test result</span><Choice options={SOIL} value={home.plot.soil} onPick={v => setPlot({ soil: v })} /></div>
            <div className="space-y-2"><span className={label}>Overhead tank direction</span><Choice options={DIRS} value={home.plot.tank} onPick={v => setPlot({ tank: v })} /></div>
            <div className="space-y-2"><span className={label}>Terrain</span><Choice options={TERRAIN} value={home.plot.terrain} onPick={v => setPlot({ terrain: v })} /></div>
            <label className="flex items-start gap-2.5 p-3 rounded border border-stone/20 bg-stone/5 text-xs text-midnight cursor-pointer">
              <input type="checkbox" checked={home.plot.shalya} onChange={() => setPlot({ shalya: !home.plot.shalya })} className="rounded accent-gold mt-0.5" />
              <span>Bones, ash or debris were found during excavation</span>
            </label>
          </div>
        </details>

        {/* Add-ons */}
        <div className="space-y-3 p-6 bg-white border border-stone/15 rounded-lg">
          <span className={label}>Tradition add-ons</span>
          <p className={hint}>For buyers who follow a stricter or alternative tradition.</p>
          <Checks options={ADDONS} values={home.addons} onChange={v => setHome({ addons: v })} />
        </div>

        <div className="pt-6 border-t border-stone/15 flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-stone hover:text-midnight font-soehne text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> BACK
          </button>
          <button
            onClick={onGenerate}
            className="bg-gold hover:bg-gold/90 text-midnight font-soehne text-xs font-bold uppercase tracking-widest py-4 px-10 rounded shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            {anyAnswered ? 'GENERATE WITH THESE DETAILS' : 'SKIP — GENERATE MY PROFILE'} {anyAnswered ? <Sparkles className="w-4 h-4 fill-midnight" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
