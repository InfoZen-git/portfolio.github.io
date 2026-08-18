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
Tant que ce réglage n'est pas exactement sur « GitHub Actions », l'étape de
déploiement échoue avec une erreur 404, même si le build a réussi.

Le workflow déduit tout seul le chemin de base à partir du nom du dépôt, donc
un renommage ne casse rien :

| Nom du dépôt              | URL du site                                        |
| ------------------------- | -------------------------------------------------- |
| `infozen-git.github.io`   | `https://infozen-git.github.io/`                     |
| n'importe quel autre nom  | `https://infozen-git.github.io/<nom-du-depot>/`      |

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
- **Icônes d'interface** : les champs `icon` sont des clés du registre
  `src/components/ui/icons.jsx`. Pour en ajouter une, complète l'objet `icons`.
- **Logos de la bande « Ce que j'utilise »** : le tableau `about.stack` contient
  des clés du registre `src/components/ui/techIcons.js`. Pour ajouter une
  technologie, copie son champ `path` depuis simpleicons.org dans `techIcons`,
  puis référence sa clé dans `about.stack`.

  Les tracés viennent de simple-icons (licence CC0). Le paquet ne distribue plus
  les marques Microsoft : Windows est donc un glyphe géométrique dessiné à la
  main, et C# est représenté par le logo .NET.

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
| `--color-muted`       | Texte tertiaire (le plus sombre lisible) |
| `--color-success`     | Statut « en ligne » et « en cours »     |

Échelle de texte, du plus fort au plus discret : `text-white`, `text-slate-300`,
`text-slate-400`, `text-muted`. Ne pas descendre sous `text-muted` pour du
texte : `slate-500` tombe à 4,11:1 et `slate-600` à 2,58:1 sur le fond de page,
tous deux sous le seuil de 4,5:1.

## Accessibilité et performance

Mesuré dans Chromium à 1440px et 390px, après déroulement complet de la page :

| Contrôle                          | Résultat            |
| --------------------------------- | ------------------- |
| Contraste du texte (seuil 4,5:1)  | 0 échec             |
| Cibles tactiles (seuil 44×44)     | 0 échec             |
| Contrôles sans nom accessible     | 0                   |
| Texte sous 12px                   | 0                   |
| Défilement horizontal             | 0px                 |
| CLS (seuil 0,1)                   | 0,000               |
| Animations infinies en `reduce`   | 0                   |

- `prefers-reduced-motion` est respecté partout : le rideau d'entrée est ignoré,
  les particules deviennent statiques et les boucles infinies sont coupées.
- Le canvas de particules se met en pause quand l'onglet passe en arrière-plan.
- Navigation au clavier avec anneaux de focus visibles.
- Toute la palette Tailwind est servie en `oklch` : un contrôle de contraste
  écrit avec une regex `rgb()` ignore silencieusement la quasi-totalité des
  couleurs. Résoudre la couleur via un canvas avant de calculer un ratio.

## À compléter

Deux valeurs restent des espaces réservés, marquées `TODO` dans
`src/data/site.js` :

- le lien d'invitation Discord
- le handle exact de la chaîne YouTube

Le champ `status` de chaque entrée du tableau `ventures` est à ajuster selon la
réalité du moment : `active`, `soon` ou `past`.
