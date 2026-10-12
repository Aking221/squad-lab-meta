// Score « meta » FC 27.
//
// Ce que disent les changements FC 27 (pitch notes EA et guides) :
// - les PlayStyles ont été affaiblis (Finesse Shot, Low Driven, Rapid, Quick
//   Step, Tiki Taka, Pinged Pass) : les stats brutes comptent davantage ;
// - l'AcceleRATE pèse moins : l'accélération et la vitesse de pointe elles-mêmes
//   comptent plus, l'accélération en premier ;
// - le dribble « déséquilibré » récompense agilité et équilibre ;
// - les tirs dépendent davantage des stats de tir ;
// - la défense manuelle est renforcée, la défense automatique affaiblie.
//
// Score = moyenne pondérée des stats selon le RÔLE du joueur (pas seulement le
// poste), + petits bonus (gestes techniques, mauvais pied, PlayStyles, taille).
// Quand les stats détaillées sont disponibles, elles remplacent les stats de face.
//
// Stats de face joueurs : [VIT, TIR, PAS, DRI, DEF, PHY]
// Gardiens : [PLO, JEU MAIN, DÉG, RÉF, VIT, PLA]

import { ROLES } from './metaFormations.js';

export const DEFAULT_WEIGHTS = {
  // par groupe de postes (utilisé quand le rôle est inconnu)
  ST: [0.36, 0.34, 0.04, 0.16, 0.00, 0.10],
  W: [0.38, 0.18, 0.12, 0.28, 0.00, 0.04],
  CAM: [0.26, 0.22, 0.20, 0.28, 0.00, 0.04],
  CM: [0.18, 0.06, 0.28, 0.22, 0.14, 0.12],
  CDM: [0.16, 0.00, 0.22, 0.10, 0.30, 0.22],
  CB: [0.30, 0.00, 0.06, 0.04, 0.38, 0.22],
  FB: [0.36, 0.00, 0.16, 0.16, 0.22, 0.10],
  GK: [0.26, 0.12, 0.04, 0.34, 0.02, 0.22],
  // par rôle (FC 27)
  roles: {
    gk: [0.26, 0.12, 0.04, 0.34, 0.02, 0.22],
    fullback: [0.38, 0.00, 0.16, 0.16, 0.20, 0.10],
    defender: [0.30, 0.00, 0.06, 0.04, 0.38, 0.22],
    holding: [0.12, 0.00, 0.20, 0.06, 0.36, 0.26],
    boxCrasher: [0.24, 0.12, 0.20, 0.18, 0.12, 0.14],
    boxToBox: [0.20, 0.08, 0.24, 0.18, 0.14, 0.16],
    deepPlaymaker: [0.12, 0.04, 0.38, 0.22, 0.14, 0.10],
    playmaker: [0.20, 0.10, 0.34, 0.32, 0.00, 0.04],
    shadowStriker: [0.30, 0.30, 0.10, 0.26, 0.00, 0.04],
    classic10: [0.18, 0.18, 0.30, 0.32, 0.00, 0.02],
    insideForward: [0.38, 0.22, 0.08, 0.30, 0.00, 0.02],
    winger: [0.42, 0.08, 0.20, 0.28, 0.00, 0.02],
    advancedForward: [0.40, 0.36, 0.02, 0.14, 0.00, 0.08],
    targetForward: [0.16, 0.36, 0.06, 0.10, 0.00, 0.32],
  },
  // PlayStyles moins décisifs sur FC 27 : bonus réduit
  bonus: { sm4: 0.8, sm5: 2, wf4: 1, wf5: 2.5, playStyle: 0.25, playStyleMax: 1.5, heightPerCm: 0.15, heightMax: 2 },
  // poids du collectif dans l'équipe : points meta par point de collectif
  // (un style de collectif à 3 points renforce nettement les stats)
  chemBonus: 1.2,
};

export function smStars(item, zeroBased = true) {
  if (item.sm == null) return null;
  return zeroBased ? Number(item.sm) + 1 : Number(item.sm);
}

// Stats effectives : stats détaillées si connues, sinon stats de face.
export function effectiveStats(item) {
  const s = Array.isArray(item.stats) && item.stats.length >= 6 ? item.stats.slice(0, 6) : null;
  const d = item.detail;
  if (!s || !d || item.pos === 'GK') return s;
  const avg = (pairs) => {
    let t = 0, w = 0;
    for (const [v, k] of pairs) if (v != null && !Number.isNaN(v)) { t += v * k; w += k; }
    return w ? t / w : null;
  };
  const out = s.slice();
  // FC 27 : l'accélération compte plus que la vitesse de pointe
  const pac = avg([[d.acceleration, 0.6], [d.sprintSpeed, 0.4]]);
  if (pac != null) out[0] = pac;
  // Dribble déséquilibré : agilité et équilibre
  const dri = avg([[d.dribbling, 0.4], [d.ballControl, 0.2], [d.agility, 0.2], [d.balance, 0.2]]);
  if (dri != null) out[3] = dri;
  const sho = avg([[d.finishing, 0.35], [d.shotPower, 0.25], [d.longShots, 0.15], [d.positioning, 0.25]]);
  if (sho != null) out[1] = sho;
  return out;
}

const HEIGHT_MATTERS = { CB: 1, GK: 1, ST: 0.5, CDM: 0.5 };
const TARGET_HEIGHT = 183;

export function metaScore(item, group, settings, role) {
  const W = (settings && settings.weights) || DEFAULT_WEIGHTS;
  const roleW = role && ((W.roles && W.roles[role]) || DEFAULT_WEIGHTS.roles[role]);
  const roleDefs = (settings && settings.roleDefs) || ROLES;
  const g = role && roleDefs[role] ? roleDefs[role].group : group;
  const w = roleW || W[g] || DEFAULT_WEIGHTS[g];
  const b = { ...DEFAULT_WEIGHTS.bonus, ...(W.bonus || {}) };
  const stats = effectiveStats(item);
  if (!w || !stats) return item.rating;
  let s = 0, tw = 0;
  for (let i = 0; i < 6; i++) { s += (w[i] || 0) * (stats[i] || 0); tw += w[i] || 0; }
  let score = tw ? s / tw : item.rating;
  if (g !== 'GK') {
    const sm = smStars(item, settings ? settings.skillMovesZeroBased !== false : true);
    const wf = Number(item.wf);
    if (g === 'ST' || g === 'W' || g === 'CAM') {
      if (sm >= 5) score += b.sm5; else if (sm >= 4) score += b.sm4;
    }
    if (wf >= 5) score += b.wf5; else if (wf >= 4) score += b.wf4;
  }
  if (item.playStyles) score += Math.min(b.playStyleMax, item.playStyles * b.playStyle);
  const hm = HEIGHT_MATTERS[g] || (role === 'targetForward' ? 1 : 0);
  if (item.height && hm) {
    score += hm * Math.max(-b.heightMax, Math.min(b.heightMax, (item.height - TARGET_HEIGHT) * b.heightPerCm));
  }
  // Joueurs en vogue selon le meta du jour (très utilisés, cités par les guides)
  if (item.metaBoost) score += Math.max(-5, Math.min(5, item.metaBoost));
  if (item.extMeta) {
    const k = settings && settings.extMetaWeight != null ? settings.extMetaWeight : 0.5;
    score = (1 - k) * score + k * item.extMeta;
  }
  return Math.round(score * 10) / 10;
}
