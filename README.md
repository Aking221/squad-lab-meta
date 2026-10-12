# squad-lab-meta

Meta du jour d'EA SPORTS FC 27 Ultimate Team, lu automatiquement par l'extension **Squad Lab**.

L'extension relit `meta.json` toutes les 3 heures. Le fichier est mis à jour chaque matin par une tâche programmée qui lit l'actualité FC 27 : patch notes EA, guides, formations et joueurs les plus utilisés.

## Contenu de `meta.json`

| Champ | Rôle |
|---|---|
| `updated`, `summary`, `sources` | Date, résumé du meta et liens vers les articles utilisés |
| `formations` | Formations meta : 11 postes, un rôle par poste, un niveau (`tier` 1 à 3) et un conseil de tactique |
| `roleWeights` | Poids des stats [VIT, TIR, PAS, DRI, DEF, PHY] pour chaque rôle |
| `bonus`, `chemBonus`, `formationTierBonus` | Bonus de gestes techniques, de mauvais pied, de PlayStyles, de taille, de collectif et de formation |
| `playerBoosts` | Joueurs en vogue (de -5 à +5), avec la raison |
| `chem`, `sbcScores` | Facultatif : règles de jeu corrigées par un patch |

Ce fichier ne contient **que des données**. L'extension le valide strictement et garde la version précédente s'il est invalide.

## Vérifier avant de publier

```
node tools/validate.mjs
```

Les règles de validation (`tools/lib/`) sont exactement celles de l'extension.
