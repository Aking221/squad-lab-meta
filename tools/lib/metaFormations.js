// Formations meta FC 27 et rôle conseillé pour chaque poste.
// Synthèse des guides publiés après la sortie (FUT.GG, Dexerto, Prima Games,
// Timesaver, KeenGamer, Red Bull) : 4-2-1-3 en tête des équipes suivies au
// lancement, 4-4-1-1 très jouée par les pros, puis 4-2-3-1 large, 4-3-3 avec
// MDC ; 4-3-1-2 citée comme meilleure formation à deux attaquants. Le 4-4-2 à plat, l'attaque en 4-3-3 avec
// pressing haut et les défenses à 5 sont déconseillés au lancement.
// Postes listés du gardien vers l'attaque, de droite à gauche.

export const ROLES = {
  gk: { label: 'Gardien', short: 'Gardien', group: 'GK' },
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
};

const S = (pos, role) => ({ pos, role });
const BACK4 = [S('GK', 'gk'), S('RB', 'fullback'), S('CB', 'defender'), S('CB', 'defender'), S('LB', 'fullback')];

export const META_FORMATIONS = [
  {
    id: '4-2-1-3', tier: 1,
    slots: [...BACK4, S('CDM', 'holding'), S('CDM', 'boxCrasher'), S('RW', 'insideForward'), S('CAM', 'shadowStriker'), S('LW', 'insideForward'), S('ST', 'advancedForward')],
    tips: 'La plus jouée au lancement. Construction en contre, défense équilibrée, profondeur autour de 50. Il faut des ailiers rapides, un MOC qui se projette et une sentinelle qui reste derrière.',
  },
  {
    id: '4-2-3-1', tier: 1,
    slots: [...BACK4, S('CDM', 'holding'), S('CDM', 'boxCrasher'), S('RM', 'insideForward'), S('CAM', 'shadowStriker'), S('LM', 'insideForward'), S('ST', 'advancedForward')],
    tips: 'Version plus prudente du 4-2-1-3 : milieux excentrés un peu plus bas. Utile pour gérer un score. L’attaquant peut se retrouver isolé.',
  },
  {
    id: '4-3-3 (MDC)', tier: 1,
    slots: [...BACK4, S('CDM', 'holding'), S('CM', 'boxToBox'), S('CM', 'deepPlaymaker'), S('RW', 'insideForward'), S('ST', 'advancedForward'), S('LW', 'insideForward')],
    tips: 'Jeu rapide et appels en profondeur. Plus risqué à la perte de balle : il faut une vraie sentinelle.',
  },
  {
    id: '4-3-1-2', tier: 2,
    slots: [...BACK4, S('CM', 'boxToBox'), S('CM', 'holding'), S('CM', 'boxToBox'), S('CAM', 'shadowStriker'), S('ST', 'advancedForward'), S('ST', 'advancedForward')],
    tips: 'La meilleure à deux attaquants : ils écartent les centraux et le MOC attaque l’espace derrière. Les trois milieux aident au contre-pressing. Point faible : la largeur, surtout contre une défense resserrée.',
  },
  {
    id: '4-4-1-1', tier: 1,
    slots: [...BACK4, S('RM', 'insideForward'), S('CM', 'boxToBox'), S('CM', 'holding'), S('LM', 'insideForward'), S('CAM', 'shadowStriker'), S('ST', 'advancedForward')],
    tips: 'Très jouée par les pros (environ un tiers d’entre eux selon FUT.GG, cité par Red Bull). Solide en défense et efficace en contre avec un bon meneur derrière l’attaquant.',
  },
  {
    id: '4-1-2-1-2', tier: 2,
    slots: [...BACK4, S('CDM', 'holding'), S('CM', 'boxToBox'), S('CM', 'boxToBox'), S('CAM', 'classic10'), S('ST', 'targetForward'), S('ST', 'advancedForward')],
    tips: 'Losange serré, passes courtes. Il faut des milieux qui gardent le ballon, un point d’appui et un attaquant qui prend la profondeur.',
  },
  {
    id: '4-2-2-2', tier: 2,
    slots: [...BACK4, S('CDM', 'holding'), S('CDM', 'boxCrasher'), S('CAM', 'playmaker'), S('CAM', 'shadowStriker'), S('ST', 'targetForward'), S('ST', 'advancedForward')],
    tips: 'Sans ailiers : un MOC décroche sur le côté, l’autre attaque la surface. Idéal quand il faut marquer.',
  },
  {
    id: '4-3-3 (MOC)', tier: 3,
    slots: [...BACK4, S('CM', 'boxToBox'), S('CM', 'holding'), S('RW', 'insideForward'), S('CAM', 'shadowStriker'), S('LW', 'insideForward'), S('ST', 'advancedForward')],
    tips: 'Très offensif : moins de couverture défensive. Garde au moins un milieu en consigne défensive.',
  },
];

export const metaFormation = (id, list = META_FORMATIONS) => (list || META_FORMATIONS).find((f) => f.id === id) || null;
