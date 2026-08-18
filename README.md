# Portfolio · Octave / InfoZen

Site portfolio personnel d'Octave (**InfoZen**) : créateur de contenu tech,
développeur, passionné de homelab et entrepreneur.

Thème sombre neutre, un seul accent bleu acier employé par petites touches,
animations Framer Motion partout (entrée de page, révélations au scroll, halo
qui suit le curseur, cascades).

## Stack

| Outil                  | Rôle                                       |
| ---------------------- | ------------------------------------------ |
| React 19               | Composants                                 |
| Vite 8                 | Dev server et build                        |
| Tailwind CSS 4         | Styles, via le plugin `@tailwindcss/vite`  |
| Framer Motion 13       | Toutes les animations                      |
| lucide-react           | Icônes d'interface                         |

## Voir le site

Le dépôt ne contient que le code source : rien n'est visible tant que le site
n'est pas lancé ou déployé.

**En local :**

```bash
npm install
npm run dev      # serveur de développement, http://localhost:5173
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build
```

**En ligne :** le workflow `.github/workflows/deploy.yml` publie le site sur
GitHub Pages à chaque push. Pour l'activer, une seule chose à faire dans
l'interface GitHub : `Settings` › `Pages` › `Source` › **GitHub Actions**.
Le site est ensuite servi sur `https://infozen-git.github.io/Portfolio/`.

## Structure

```
src/
├── data/site.js              ← tout le contenu du site
├── lib/motion.js             ← variantes Framer Motion partagées
├── hooks/
│   └── useActiveSection.js   ← surlignage actif de la navigation
└── components/
    ├── background/           ← particules, dégradés animés, grille
    ├── layout/               ← navbar, footer, barre de progression, rideau d'entrée
    ├── sections/             ← Hero, About, Projects, Business, Content, Contact
    │   └── visuals/          ← illustrations animées des cartes projet
    └── ui/                   ← Section, Reveal, SpotlightCard, Terminal…
```

## Modifier le contenu

Tout passe par **`src/data/site.js`**, aucun texte n'est écrit en dur dans les
composants.

- **Ajouter un projet** : une entrée dans `projects`.
  Le champ `span` fixe sa largeur sur la grille de 6 colonnes : `6` pleine
  largeur, `3` une moitié, `2` un tiers.
  `status: 'soon'` affiche la carte en pointillés avec le badge « Bientôt ».
- **Ajouter un business** : une entrée dans `ventures`, avec son `status`
  (`active`, `soon` ou `past`) et son `span`.
- **Ajouter un réseau** : une entrée dans `channels` (section Contenu) et/ou
  `socials` (hero, contact, footer).
- **Icônes** : les champs `icon` sont des clés du registre
  `src/components/ui/icons.jsx`. Pour en ajouter une, complète l'objet `icons`.

### Illustrations des cartes projet

Le champ `visual` d'un projet référence un composant de
`src/components/sections/visuals/`, enregistré dans l'objet `visuals` de
`ProjectCard.jsx` :

- `checklist` : liste à cocher animée, alimentée par le tableau `features`
- `architecture` : schéma animé du homelab (SVG sur desktop, liste sur mobile)

## Personnaliser le thème

Les jetons de design (couleurs, polices, animations) sont regroupés dans le bloc
`@theme` en haut de `src/index.css`. Changer `--color-accent` suffit à re-teinter
tout le site.

La palette suit une règle simple : les surfaces sont neutres, un seul accent
existe, et il ne sert que par petites touches (numéros de section, quelques
icônes, la marque). Les boutons principaux sont des aplats clairs, pas des
dégradés colorés, et aucune ombre n'est teintée. C'est ce qui distingue un
rendu sobre d'un rendu criard.

| Jeton                 | Rôle                                    |
| --------------------- | --------------------------------------- |
| `--color-void`        | Fond de page                            |
| `--color-abyss`       | Surfaces surélevées                     |
| `--color-panel`       | Cartes                                  |
| `--color-hairline`    | Séparateurs                             |
| `--color-accent`      | Accent, par petites touches uniquement  |
| `--color-accent-deep` | Variante sombre du même bleu            |
| `--color-success`     | Statut « en ligne » et « en cours »     |

## Accessibilité et performance

- `prefers-reduced-motion` est respecté partout : le rideau d'entrée est ignoré,
  les particules deviennent statiques et les boucles infinies sont coupées.
- Le canvas de particules se met en pause quand l'onglet passe en arrière-plan.
- Navigation au clavier avec anneaux de focus visibles.

## À compléter

Deux valeurs restent des espaces réservés, marquées `TODO` dans
`src/data/site.js` :

- le lien d'invitation Discord
- le handle exact de la chaîne YouTube

Le champ `status` de chaque entrée du tableau `ventures` est à ajuster selon la
réalité du moment : `active`, `soon` ou `past`.
