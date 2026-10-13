// Formations meta FC 27 et rôle conseillé pour chaque poste (mise à jour 13/10/2026 :
// FUTSettings — usage des setups pros —, EasySBC, Red Bull/Tekkz-RedLac, KeenGamer).
// Formations meta FC 27 et rôle conseillé pour chaque poste.
// Synthèse des guides publiés après la sortie (FUT.GG, Dexerto, Prima Games,
// Timesaver, KeenGamer, Red Bull) : 4-2-1-3 en tête des équipes suivies au
// lancement, 4-4-1-1 très jouée par les pros, puis 4-2-3-1 large, 4-3-3 avec
// MDC ; 4-3-1-2 citée comme meilleure formation à deux attaquants. Le 4-4-2 à plat, l'attaque en 4-3-3 avec
// pressing haut et les défenses à 5 sont déconseillés au lancement.
// Postes listés du gardien vers l'attaque, de droite à gauche.

export const ROLES = {
  gk: { label: 'Gardien', short: 'Gardien', group: 'GK' },
  sweeperKeeper: { label: 'Gardien libéro (Sweeper Keeper)', short: 'Gardien libéro', group: 'GK' },
  fullback: { label: 'Latéral', short: 'Latéral', group: 'FB' },
  defender: { label: 'Défenseur central', short: 'DC', group: 'CB' },
  holding: { label: 'Sentinelle (Holding)', short: 'Sentinelle', group: 'CDM' },
  boxCrasher: { label: 'Box Crasher', short: 'Box crasher', group: 'CDM' },
  boxToBox: { label: 'Box-to-Box', short: 'Box-to-box', group: 'CM' },
  deepPlaymaker: { label: 'Meneur reculé', short: 'Meneur reculé', group: 'CM' },
  playmaker: { label: 'Meneur (Playmaker)', short: 'Meneur', group: 'CAM' },
  shadowStriker: { label: 'Second attaquant (Shadow Striker)', short: '2e attaquant', group: 'CAM' },
  classic10: { label: 'Numéro 10 classique', short: 'N°10', group: 'CAM' },
  insideForward: { label: 'Ailier rentrant (Inside Forward)', short: 'Ailier rentrant', group: 'W' },
  winger: { label: 'Ailier de couloir', short: 'Ailier', group: 'W' },
  advancedForward: { label: 'Attaquant avancé', short: 'Att. avancé', group: 'ST' },
  targetForward: { label: 'Point d’appui (Target Forward)', short: 'Point d’appui', group: 'ST' },
  false9: { label: 'Faux 9', short: 'Faux 9', group: 'ST' },
};

const S = (pos, role, focus) => (focus ? { pos, role, focus } : { pos, role });
const BACK4 = [S('GK', 'gk', 'defend'), S('RB', 'fullback', 'balanced'), S('CB', 'defender', 'defend'), S('CB', 'defender', 'defend'), S('LB', 'fullback', 'balanced')];

export const META_FORMATIONS = [
  {
    id: '4-3-1-2', tier: 1, usage: 55, buildUp: 'balanced', lineHeight: 62,
    slots: [S('GK', 'sweeperKeeper', 'balanced'), S('RB', 'fullback', 'balanced'), S('CB', 'defender', 'defend'), S('CB', 'defender', 'defend'), S('LB', 'fullback', 'balanced'),
      S('CM', 'boxToBox', 'ballWinning'), S('CM', 'holding', 'defend'), S('CM', 'boxToBox', 'ballWinning'), S('CAM', 'shadowStriker', 'attack'), S('ST', 'advancedForward', 'attack'), S('ST', 'advancedForward', 'attack')],
    tips: 'La formation la plus jouée par les pros en ce moment (environ 55 % des setups suivis par FUTSettings, utilisée par Tekkz, RedLac…). Trois milieux solides, un MOC qui attaque l’espace et deux attaquants rapides. Construction équilibrée, ligne autour de 60-65.',
  },
  {
    id: '4-4-1-1', tier: 1, usage: 21, buildUp: 'balanced', lineHeight: 62,
    slots: [S('GK', 'gk', 'defend'), S('RB', 'fullback', 'balanced'), S('CB', 'defender', 'defend'), S('CB', 'defender', 'defend'), S('LB', 'fullback', 'balanced'),
      S('RM', 'insideForward', 'balanced'), S('CM', 'deepPlaymaker', 'buildUp'), S('CM', 'deepPlaymaker', 'buildUp'), S('LM', 'insideForward', 'balanced'), S('CAM', 'playmaker', 'balanced'), S('ST', 'advancedForward', 'attack')],
    tips: 'Deuxième formation des pros (≈ 21 %). Jeu dans l’axe, deux meneurs reculés au milieu, ailiers rentrants et un meneur derrière l’attaquant.',
  },
  {
    id: '4-2-1-3', tier: 2, usage: 11, buildUp: 'balanced', lineHeight: 60,
    slots: [...BACK4, S('CDM', 'deepPlaymaker', 'buildUp'), S('CDM', 'holding', 'defend'), S('RW', 'insideForward', 'balanced'), S('CAM', 'shadowStriker', 'attack'), S('LW', 'insideForward', 'balanced'), S('ST', 'advancedForward', 'attack')],
    tips: 'Bonne formation polyvalente : deux MDC protègent des contres, ailiers rentrants rapides.',
  },
  {
    id: '4-1-2-1-2', tier: 2, usage: 5, buildUp: 'balanced', lineHeight: 60,
    slots: [...BACK4, S('CDM', 'deepPlaymaker', 'buildUp'), S('CM', 'boxToBox', 'balanced'), S('CM', 'boxToBox', 'balanced'), S('CAM', 'playmaker', 'balanced'), S('ST', 'advancedForward', 'attack'), S('ST', 'advancedForward', 'attack')],
    tips: 'Losange serré, passes courtes dans l’axe. Peu de couverture sur les côtés.',
  },
  {
    id: '4-3-2-1', tier: 3, usage: 3, buildUp: 'balanced', lineHeight: 60,
    slots: [...BACK4, S('CM', 'boxToBox', 'balanced'), S('CM', 'holding', 'defend'), S('CM', 'boxToBox', 'balanced'), S('CF', 'false9', 'attack'), S('ST', 'advancedForward', 'attack'), S('CF', 'false9', 'attack')],
    tips: 'Variante du 4-3-1-2 avec deux attaquants de soutien autour de l’avant-centre.',
  },
  {
    id: '4-3-3', tier: 3, usage: 3, buildUp: 'balanced', lineHeight: 60,
    slots: [...BACK4, S('CM', 'boxToBox', 'balanced'), S('CM', 'holding', 'defend'), S('CM', 'boxToBox', 'balanced'), S('RW', 'insideForward', 'balanced'), S('ST', 'advancedForward', 'attack'), S('LW', 'insideForward', 'balanced')],
    tips: 'Jeu rapide sur les ailes ; plus exposé en défense.',
  },
  {
    id: '4-4-2', tier: 3, usage: 3, buildUp: 'balanced', lineHeight: 60,
    slots: [...BACK4, S('RM', 'insideForward', 'balanced'), S('CM', 'boxToBox', 'balanced'), S('CM', 'boxToBox', 'balanced'), S('LM', 'insideForward', 'balanced'), S('ST', 'advancedForward', 'attack'), S('ST', 'advancedForward', 'attack')],
    tips: 'Tactique de secours offensive de Tekkz : deux box-to-box, deux attaquants.',
  },
];

export const metaFormation = (id, list = META_FORMATIONS) => (list || META_FORMATIONS).find((f) => f.id === id) || null;
