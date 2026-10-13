# squad-lab-meta

Meta du jour d'EA SPORTS FC 27 Ultimate Team, lu automatiquement par l'extension **Squad Lab**.

L'extension relit `meta.json` toutes les 3 heures. Le fichier est mis à jour chaque matin par une tâche programmée qui lit l'actualité FC 27 : patch notes EA, guides, formations et joueurs les plus utilisés.

## Contenu de `meta.json`

| Champ | Rôle |
|---|---|
| `updated`, `summary`, `sources` | Date, résumé du meta et liens vers les articles utilisés |
| `formations` | Formations meta : 11 postes avec un rôle **et une consigne** par poste (`[poste, rôle, focus]`), un niveau (`tier` 1 à 3), l'usage chez les pros en % (`usage`), le style de construction (`buildUp` : `balanced`, `counter` ou `short`) et la hauteur de ligne (`lineHeight`, 0–100). **Garder ces champs à chaque mise à jour** : l'extension s'en sert pour appliquer la tactique. |
| `roleWeights` | Poids des stats [VIT, TIR, PAS, DRI, DEF, PHY] pour chaque rôle |
| `bonus`, `chemBonus`, `formationTierBonus` | Bonus de gestes techniques, de mauvais pied, de PlayStyles, de taille, de collectif et de formation |
| `playerBoosts` | Joueurs en vogue (de -5 à +5), avec la raison |
| `chem`, `sbcScores` | Facultatif : règles de jeu corrigées par un patch |

Ce fichier ne contient **que des données**. L'extension le valide strictement et garde la version précédente s'il est invalide.

## Sources à croiser chaque matin

Aucune source ne suffit seule : on mélange l'usage réel des pros (FUTSettings, formations et tactiques des joueurs pros), les joueurs les plus utilisés (FUTBIN « popular », FUT.GG), les sélections d'EasySBC et de Paletools, et les patch notes EA. L'ordre des formations suit l'usage chez les pros.

## Vérifier avant de publier

```
node tools/validate.mjs
```

Les règles de validation (`tools/lib/`) sont exactement celles de l'extension.
