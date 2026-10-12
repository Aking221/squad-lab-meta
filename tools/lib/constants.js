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
};

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
