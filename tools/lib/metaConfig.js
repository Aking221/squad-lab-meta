// Meta « du jour » : fichier meta.json publié en ligne et relu par l'extension.
// Ce fichier ne contient que des données (jamais de code) et il est validé
// strictement : s'il est invalide, l'extension garde la version précédente.
import { META_FORMATIONS, ROLES } from './metaFormations.js';
import { DEFAULT_WEIGHTS } from './meta.js';
import { FORMATIONS, GROUP_OF } from './constants.js';

export const META_SCHEMA = 1;
const POSITIONS = new Set(Object.keys(GROUP_OF));
const GROUPS = new Set(['GK', 'CB', 'FB', 'CDM', 'CM', 'CAM', 'W', 'ST']);
// Un rôle doit appartenir à la même ligne que le poste (ex. sentinelle sur un MC : oui ; sur un DC : non).
const LINE = { GK: 'gk', CB: 'def', FB: 'def', CDM: 'mid', CM: 'mid', CAM: 'mid', W: 'att', ST: 'att' };
const normName = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const isNum = (x, min = -Infinity, max = Infinity) => typeof x === 'number' && Number.isFinite(x) && x >= min && x <= max;
const isStr = (x, max = 500) => typeof x === 'string' && x.length <= max;
const isWeights = (w) => Array.isArray(w) && w.length === 6 && w.every((x) => isNum(x, 0, 1)) && w.some((x) => x > 0);

// Renvoie { ok, errors, config } avec une copie nettoyée (champs inconnus ignorés).
export function validateMetaConfig(raw) {
  const errors = [];
  const err = (m) => errors.push(m);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { ok: false, errors: ['Le fichier n’est pas un objet JSON.'] };
  if (raw.schema !== META_SCHEMA) err(`schema doit valoir ${META_SCHEMA}`);
  if (!isStr(raw.game, 20)) err('game manquant');
  if (!isStr(raw.updated, 30) || Number.isNaN(Date.parse(raw.updated))) err('updated doit être une date (AAAA-MM-JJ)');
  const out = { schema: META_SCHEMA, game: raw.game, updated: raw.updated };
  if (raw.summary != null) { if (isStr(raw.summary, 1500)) out.summary = raw.summary; else err('summary trop long'); }

  // Sources
  out.sources = [];
  for (const s of Array.isArray(raw.sources) ? raw.sources.slice(0, 30) : []) {
    if (s && isStr(s.title, 200) && isStr(s.url, 500) && /^https:\/\//.test(s.url)) out.sources.push({ title: s.title, url: s.url });
    else err('source invalide (title + url https requis)');
  }

  // Rôles supplémentaires éventuels
  const roles = { ...ROLES };
  if (raw.roles != null) {
    if (typeof raw.roles !== 'object') err('roles doit être un objet');
    else {
      out.roles = {};
      for (const [k, r] of Object.entries(raw.roles)) {
        if (!/^[a-zA-Z][a-zA-Z0-9]{1,30}$/.test(k) || !r || !isStr(r.label, 60) || !GROUPS.has(r.group)) { err(`rôle ${k} invalide`); continue; }
        out.roles[k] = { label: r.label, short: isStr(r.short, 20) ? r.short : r.label.slice(0, 20), group: r.group };
        roles[k] = out.roles[k];
      }
    }
  }

  // Formations
  if (!Array.isArray(raw.formations) || !raw.formations.length || raw.formations.length > 15) err('formations : 1 à 15 attendues');
  else {
    out.formations = [];
    const ids = new Set();
    for (const f of raw.formations) {
      if (!f || !isStr(f.id, 30) || !f.id.trim() || ids.has(f.id)) { err('formation sans id ou en double'); continue; }
      if (!isNum(f.tier, 1, 3) || !Number.isInteger(f.tier)) { err(`${f.id} : tier doit valoir 1, 2 ou 3`); continue; }
      if (!Array.isArray(f.slots) || f.slots.length !== 11) { err(`${f.id} : 11 postes requis`); continue; }
      const bad = f.slots.find((s) => !s || !POSITIONS.has(s.pos) || !roles[s.role] || LINE[roles[s.role].group] !== LINE[GROUP_OF[s.pos]]);
      if (bad) { err(`${f.id} : poste ou rôle invalide (${bad && bad.pos}/${bad && bad.role})`); continue; }
      if (f.slots.filter((s) => s.pos === 'GK').length !== 1) { err(`${f.id} : un seul gardien`); continue; }
      ids.add(f.id);
      out.formations.push({ id: f.id, tier: f.tier, slots: f.slots.map((s) => ({ pos: s.pos, role: s.role })), tips: isStr(f.tips, 600) ? f.tips : '' });
    }
    if (!out.formations.length) err('aucune formation valide');
  }

  // Pondérations
  if (raw.roleWeights != null) {
    out.roleWeights = {};
    for (const [k, w] of Object.entries(raw.roleWeights)) {
      if (!roles[k] || !isWeights(w)) { err(`roleWeights.${k} invalide (6 nombres entre 0 et 1)`); continue; }
      out.roleWeights[k] = w.slice();
    }
  }
  for (const k of Object.keys(out.roles || {})) if (!(out.roleWeights && out.roleWeights[k])) err(`rôle ${k} sans pondérations`);
  if (raw.bonus != null) {
    const b = raw.bonus, ok = b && typeof b === 'object'
      && Object.entries(b).every(([k, v]) => ['sm4', 'sm5', 'wf4', 'wf5', 'playStyle', 'playStyleMax', 'heightPerCm', 'heightMax'].includes(k) && isNum(v, 0, 10));
    if (ok) out.bonus = { ...b }; else err('bonus invalide');
  }
  if (raw.chemBonus != null) { if (isNum(raw.chemBonus, 0, 5)) out.chemBonus = raw.chemBonus; else err('chemBonus entre 0 et 5'); }
  if (raw.formationTierBonus != null) {
    const t = raw.formationTierBonus;
    if (t && ['1', '2', '3'].every((k) => t[k] == null || isNum(t[k], 0, 50))) out.formationTierBonus = { 1: t[1] ?? 15, 2: t[2] ?? 7, 3: t[3] ?? 0 };
    else err('formationTierBonus invalide');
  }

  // Joueurs en vogue (très utilisés par les pros / cités par les guides)
  if (raw.playerBoosts != null) {
    out.playerBoosts = [];
    for (const p of Array.isArray(raw.playerBoosts) ? raw.playerBoosts.slice(0, 300) : []) {
      if (!p || !(isStr(p.name, 80) || isNum(p.assetId, 1)) || !isNum(p.bonus, -5, 5)) { err('playerBoosts : name ou assetId + bonus entre -5 et 5'); continue; }
      out.playerBoosts.push({ name: isStr(p.name, 80) ? p.name : null, assetId: isNum(p.assetId, 1) ? p.assetId : null, bonus: p.bonus, reason: isStr(p.reason, 200) ? p.reason : '' });
    }
  }

  // Candidats meta à chercher sur le marché (id = resourceId de la carte EA)
  if (raw.candidates != null) {
    out.candidates = [];
    for (const c of Array.isArray(raw.candidates) ? raw.candidates.slice(0, 800) : []) {
      if (!c || !Number.isInteger(c.id) || c.id <= 0 || !isStr(c.name, 80) || !POSITIONS.has(c.pos) || !isNum(c.meta, 40, 100) || !isNum(c.price, 0, 100000000)) { err('candidat invalide (id, name, pos, meta, price)'); continue; }
      out.candidates.push({ id: c.id, name: c.name, pos: c.pos, meta: c.meta, price: c.price });
    }
  }

  // Règles de jeu éventuellement corrigées par un patch
  if (raw.chem != null) {
    const c = raw.chem;
    const tri = (t) => Array.isArray(t) && t.length === 3 && t.every((x) => Number.isInteger(x) && x >= 1 && x <= 11) && t[0] <= t[1] && t[1] <= t[2];
    if (c && tri(c.club) && tri(c.nation) && tri(c.league)) out.chem = { club: c.club, nation: c.nation, league: c.league };
    else err('chem invalide (club/nation/league = 3 seuils croissants)');
  }
  if (raw.sbcScores != null) {
    const ok = raw.sbcScores && Object.entries(raw.sbcScores).every(([k, v]) => isNum(Number(k), 40, 99) && isNum(v, 1, 10000000));
    if (ok) out.sbcScores = { ...raw.sbcScores }; else err('sbcScores invalide');
  }
  return { ok: errors.length === 0, errors, config: errors.length ? null : out };
}

// Applique le meta du jour aux réglages (qui restent prioritaires pour tout le reste).
export function applyMetaConfig(settings, config) {
  if (!config || settings.metaFollowRemote === false) return { ...settings, formations: META_FORMATIONS, roleDefs: ROLES };
  const w = settings.weights;
  const weights = {
    ...w,
    roles: { ...w.roles, ...(config.roleWeights || {}) },
    bonus: { ...w.bonus, ...(config.bonus || {}) },
    chemBonus: config.chemBonus ?? w.chemBonus,
  };
  const candidateMeta = {};
  for (const c of config.candidates || []) candidateMeta[c.id] = Math.max(candidateMeta[c.id] || 0, c.meta);
  const boosts = { byId: {}, byName: {} };
  for (const p of config.playerBoosts || []) {
    if (p.assetId) boosts.byId[p.assetId] = p.bonus;
    if (p.name) boosts.byName[normName(p.name)] = p.bonus;
  }
  return {
    ...settings,
    weights,
    formationTierBonus: config.formationTierBonus || settings.formationTierBonus,
    chem: config.chem ? { ...settings.chem, ...config.chem } : settings.chem,
    sbcScores: config.sbcScores ? { ...settings.sbcScores, ...config.sbcScores } : settings.sbcScores,
    formations: config.formations || META_FORMATIONS,
    roleDefs: { ...ROLES, ...(config.roles || {}) },
    playerBoosts: boosts,
    candidates: config.candidates || [],
    candidateMeta,
  };
}

// Version embarquée (point de départ du fichier en ligne).
export function defaultMetaConfig(today = new Date().toISOString().slice(0, 10)) {
  return {
    schema: META_SCHEMA,
    game: 'fc27',
    updated: today,
    summary: 'Meta de lancement : 4-2-1-3 en tête, 4-4-1-1 très jouée par les pros, 4-2-3-1 large et 4-3-3 avec MDC ; 4-3-1-2 pour jouer à deux attaquants. Stats brutes avant PlayStyles (affaiblis), accélération avant vitesse de pointe.',
    sources: [],
    formations: META_FORMATIONS.map((f) => ({ id: f.id, tier: f.tier, slots: f.slots, tips: f.tips })),
    roleWeights: { ...DEFAULT_WEIGHTS.roles },
    bonus: { ...DEFAULT_WEIGHTS.bonus },
    chemBonus: DEFAULT_WEIGHTS.chemBonus,
    formationTierBonus: { 1: 15, 2: 7, 3: 0 },
    playerBoosts: [],
  };
}

export const knownFormationIds = () => Object.keys(FORMATIONS);
