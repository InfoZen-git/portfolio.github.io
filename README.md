# Portfolio — Octave / InfoZen

Site portfolio personnel d'Octave (**InfoZen**) : créateur de contenu tech, développeur
et passionné de homelab.

Thème sombre, accent cyan / bleu électrique, animations Framer Motion partout
(entrée de page, révélations au scroll, halo qui suit le curseur, cascades).

## Stack

| Outil                  | Rôle                                       |
| ---------------------- | ------------------------------------------ |
| React 19               | Composants                                 |
| Vite 8                 | Dev server et build                        |
| Tailwind CSS 4         | Styles, via le plugin `@tailwindcss/vite`  |
| Framer Motion 13       | Toutes les animations                      |
| lucide-react           | Icônes d'interface                         |

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build
```

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
    ├── sections/             ← Hero, About, Projects, Content, Contact
    │   └── visuals/          ← illustrations animées des cartes projet
    └── ui/                   ← Section, Reveal, SpotlightCard, Terminal…
```

## Modifier le contenu

Tout passe par **`src/data/site.js`** — aucun texte n'est écrit en dur dans les
composants.

- **Ajouter un projet** : une entrée dans `projects`.
  `featured: true` lui donne une demi-largeur sur grand écran, sinon un tiers.
  `status: 'soon'` affiche la carte en pointillés avec le badge « Bientôt ».
- **Ajouter un réseau** : une entrée dans `channels` (section Contenu) et/ou
  `socials` (hero, contact, footer).
- **Icônes** : les champs `icon` sont des clés du registre
  `src/components/ui/icons.jsx`. Pour en ajouter une, complète l'objet `icons`.

### Illustrations des cartes projet

Le champ `visual` d'un projet référence un composant de
`src/components/sections/visuals/`, enregistré dans l'objet `visuals` de
`ProjectCard.jsx` :

- `checklist` — liste à cocher animée, alimentée par le tableau `features`
- `topology` — schéma réseau animé du homelab

## Personnaliser le thème

Les jetons de design (couleurs, polices, animations) sont regroupés dans le bloc
`@theme` en haut de `src/index.css`. Changer `--color-accent` suffit à re-teinter
tout le site.

## Accessibilité et performance

- `prefers-reduced-motion` est respecté partout : le rideau d'entrée est ignoré,
  les particules deviennent statiques et les boucles infinies sont coupées.
- Le canvas de particules se met en pause quand l'onglet passe en arrière-plan.
- Navigation au clavier avec anneaux de focus visibles.

## À compléter

Quelques valeurs sont des espaces réservés, marquées `TODO` dans
`src/data/site.js` :

- `profile.email` — adresse de contact publique
- le lien d'invitation Discord
- le handle exact de la chaîne YouTube
