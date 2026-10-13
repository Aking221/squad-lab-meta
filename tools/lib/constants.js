export const GROUP_OF = {
  GK: 'GK', CB: 'CB', RB: 'FB', LB: 'FB', RWB: 'FB', LWB: 'FB',
  CDM: 'CDM', CM: 'CM', CAM: 'CAM',
  RM: 'W', LM: 'W', RW: 'W', LW: 'W', RF: 'W', LF: 'W',
  CF: 'ST', ST: 'ST',
};
export const groupOf = (pos) => GROUP_OF[pos] || 'CM';

export const GROUP_LABELS = {
  ST: 'Attaquants (BU / AT)',
  W: 'Ailiers (AG / AD / MG / MD)',
  CAM: 'Milieux offensifs (MOC)',
  CM: 'Milieux centraux (MC)',
  CDM: 'Milieux défensifs (MDC)',
  CB: 'Défenseurs centraux (DC)',
  FB: 'Latéraux (DG / DD / DLG / DLD)',
  GK: 'Gardiens (G)',
};

// Postes listés du gardien vers l'attaque.
export const FORMATIONS = {
  '4-2-1-3': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'RW', 'CAM', 'LW', 'ST'],
  '4-4-1-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'LM', 'CAM', 'ST'],
  '4-3-1-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CM', 'CAM', 'ST', 'ST'],
  '4-3-3 (MOC)': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'RW', 'CAM', 'LW', 'ST'],
  '4-4-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'LM', 'ST', 'ST'],
  '4-3-3': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CM', 'RW', 'ST', 'LW'],
  '4-3-3 (MDC)': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CM', 'CM', 'RW', 'ST', 'LW'],
  '4-2-3-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'RM', 'CAM', 'LM', 'ST'],
  '4-2-3-1 (étroit)': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'CAM', 'CAM', 'CAM', 'ST'],
  '4-2-2-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'CAM', 'CAM', 'ST', 'ST'],
  '4-1-2-1-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CM', 'CM', 'CAM', 'ST', 'ST'],
  '4-5-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CDM', 'CM', 'LM', 'ST'],
  '3-5-2': ['GK', 'CB', 'CB', 'CB', 'CDM', 'CDM', 'RM', 'CAM', 'LM', 'ST', 'ST'],
  '3-4-3': ['GK', 'CB', 'CB', 'CB', 'RM', 'CM', 'CM', 'LM', 'RW', 'ST', 'LW'],
  '5-2-1-2': ['GK', 'RWB', 'CB', 'CB', 'CB', 'LWB', 'CM', 'CM', 'CAM', 'ST', 'ST'],
  // Autres formations FC 27 (ordre approché ; remplacé par l'ordre exact dès que la Web App est ouverte)
  '3-1-4-2': ['GK', 'CB', 'CB', 'CB', 'RM', 'CM', 'CDM', 'CM', 'LM', 'ST', 'ST'],
  '3-4-1-2': ['GK', 'CB', 'CB', 'CB', 'RM', 'CM', 'CM', 'LM', 'CAM', 'ST', 'ST'],
  '3-4-2-1': ['GK', 'CB', 'CB', 'CB', 'RM', 'CM', 'CM', 'LM', 'CF', 'ST', 'CF'],
  '3-5-2 (MDC)': ['GK', 'CB', 'CB', 'CB', 'RM', 'CDM', 'CAM', 'CDM', 'LM', 'ST', 'ST'],
  '4-1-2-1-2 (large)': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'RM', 'LM', 'CAM', 'ST', 'ST'],
  '4-1-3-2': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'RM', 'CM', 'LM', 'ST', 'ST'],
  '4-1-4-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'RM', 'CM', 'CM', 'LM', 'ST'],
  '4-2-4': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'RW', 'ST', 'ST', 'LW'],
  '4-3-2-1': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CM', 'CM', 'CF', 'ST', 'CF'],
  '4-3-3 (faux 9)': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CDM', 'CM', 'RW', 'CF', 'LW'],
  '4-3-3 (attaque)': ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'CAM', 'CM', 'RW', 'ST', 'LW'],
  '4-4-2 (MDC)': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CDM', 'CDM', 'LM', 'ST', 'ST'],
  '4-5-1 (attaque)': ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CAM', 'CM', 'CAM', 'LM', 'ST'],
  '5-2-3': ['GK', 'RWB', 'CB', 'CB', 'CB', 'LWB', 'CM', 'CM', 'RW', 'ST', 'LW'],
  '5-3-2': ['GK', 'RWB', 'CB', 'CB', 'CB', 'LWB', 'CM', 'CDM', 'CM', 'ST', 'ST'],
  '5-4-1': ['GK', 'RWB', 'CB', 'CB', 'CB', 'LWB', 'RM', 'CM', 'CM', 'LM', 'ST'],
};

// Formations réelles de la Web App (lues en direct : nom EA « f4213 », postes par emplacement).
export const FORMATION_CODES = {};
const GENERAL_POS = { 0: 'GK', 1: 'CB', 2: 'RWB', 3: 'RB', 4: 'CB', 5: 'CB', 6: 'CB', 7: 'LB', 8: 'LWB', 9: 'CDM', 10: 'CDM', 11: 'CDM', 12: 'RM', 13: 'CM', 14: 'CM', 15: 'CM', 16: 'LM', 17: 'CAM', 18: 'CAM', 19: 'CAM', 20: 'CF', 21: 'CF', 22: 'CF', 23: 'RW', 24: 'ST', 25: 'ST', 26: 'ST', 27: 'LW' };
export function prettyFormation(code) {
  const m = /^f(\d+)([a-z]*)$/i.exec(String(code || ''));
  if (!m) return null;
  const base = m[1].split('').join('-');
  const v = m[2] ? ` (${m[2].toLowerCase().charCodeAt(0) - 95})` : '';
  return base + v;
}
export function registerFormations(list) {
  let n = 0;
  for (const f of list || []) {
    if (!f || !f.name || !Array.isArray(f.positions) || f.positions.length !== 11) continue;
    const slots = f.positions.map((p) => (typeof p === 'number' ? GENERAL_POS[p] : String(p)));
    if (slots.some((x) => !x)) continue;
    const code = String(f.name).toLowerCase();
    const name = prettyFormation(code) || code;
    if (!FORMATIONS[name]) n++;
    FORMATIONS[name] = slots;              // l'ordre exact de la Web App fait foi
    FORMATION_CODES[code] = name;
  }
  return n;
}

export function resolveSlots(formation, custom) {
  if (custom && String(custom).trim()) {
    const s = String(custom).split(/[\s,;]+/).map((x) => x.trim().toUpperCase()).filter(Boolean);
    return s.length === 11 ? s : null;
  }
  return FORMATIONS[formation] ? FORMATIONS[formation].slice() : null;
}

// Identifiants courants (pour l'affichage et les suggestions). À compléter :
// les identifiants réels présents dans ton club sont aussi proposés.
export const LEAGUES = {
  13: 'Premier League', 53: 'LALIGA', 31: 'Serie A', 19: 'Bundesliga', 16: 'Ligue 1',
  10: 'Eredivisie', 308: 'Liga Portugal', 14: 'EFL Championship', 350: 'Saudi Pro League', 39: 'MLS',
};
export const NATIONS = {
  18: 'France', 14: 'Angleterre', 45: 'Espagne', 21: 'Allemagne', 27: 'Italie',
  38: 'Portugal', 34: 'Pays-Bas', 54: 'Brésil', 52: 'Argentine',
};

export const FIELD_LABEL = { club: 'club', league: 'championnat', nation: 'nation', rareflag: 'rareté' };
export const FIELD_PLURAL = { club: 'clubs', league: 'championnats', nation: 'nations' };
