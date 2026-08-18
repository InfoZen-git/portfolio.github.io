/**
 * Source de vérité du site.
 * Tout le contenu éditable vit ici — les composants ne font que l'afficher.
 * Pour ajouter un projet / un réseau : ajoute une entrée dans le tableau.
 *
 * Les `icon` sont des clés du registre défini dans src/components/ui/icons.jsx
 */

export const profile = {
  firstName: 'Octave',
  brand: 'InfoZen',
  role: 'Créateur de contenu tech & développeur',
  tagline:
    "Je vulgarise la tech, je code des outils open source et je fais tourner mon propre homelab. L'idée : rendre la technologie simple, utile et un peu plus zen.",
  location: 'France',
  availability: 'Ouvert aux collaborations',
  // TODO : remplace par ton adresse de contact publique.
  email: 'contact@infozen.fr',
}

export const nav = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'projects', label: 'Projets' },
  { id: 'content', label: 'Contenu' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  heading: 'Trois casquettes, une seule obsession',
  paragraphs: [
    "Je m'appelle Octave, et sous le nom d'InfoZen je partage des astuces tech au quotidien : optimisation, sécurité, logiciels, réseau. Le genre de contenu que j'aurais aimé trouver quand j'ai commencé.",
    "En parallèle, je développe. Quand une astuce mérite mieux qu'une vidéo de 60 secondes, j'en fais un outil — c'est comme ça qu'est né Klyr-optimizer, un optimiseur Windows open source.",
    "Et pour comprendre vraiment l'infra, rien ne vaut la pratique : j'auto-héberge mon propre homelab, du switch stacké jusqu'à la topologie réseau complète. Je casse, je répare, j'explique.",
  ],
  pillars: [
    {
      icon: 'video',
      title: 'Créateur',
      description:
        'Des formats courts et clairs sur TikTok, Instagram et YouTube. Zéro blabla, que du concret.',
    },
    {
      icon: 'code',
      title: 'Développeur',
      description:
        "Des outils open source pensés pour l'utilisateur final, publiés et maintenus sur GitHub.",
    },
    {
      icon: 'server',
      title: 'Homelab',
      description:
        'Une infra maison auto-hébergée : réseau segmenté, services persos, apprentissage permanent.',
    },
  ],
  stack: [
    'React',
    'Tailwind CSS',
    'JavaScript',
    'Python',
    'PowerShell',
    'C#',
    'Windows',
    'Linux',
    'Docker',
    'Réseau',
    'Self-hosting',
    'Git',
  ],
  terminal: [
    { prompt: '~', command: 'whoami' },
    { output: 'octave — alias infozen' },
    { prompt: '~', command: 'cat roles.txt' },
    { output: 'créateur de contenu · développeur · homelabber' },
    { prompt: '~', command: 'uptime --since' },
    { output: 'à fond dans la tech depuis toujours' },
  ],
}

export const projects = [
  {
    id: 'klyr-optimizer',
    title: 'Klyr-optimizer',
    kind: 'Open source',
    status: 'live',
    featured: true,
    visual: 'checklist',
    summary:
      "Un optimiseur PC Windows open source, écrit en C# / WPF : 40 optimisations réparties en 5 modules, du monitoring matériel et 5 outils avancés. 100 % local, sans télémétrie, et disponible en français comme en anglais.",
    tags: ['C#', 'WPF', 'Windows 10 / 11', 'Open source'],
    features: [
      '40 optimisations en 5 modules',
      'Monitoring matériel intégré',
      '5 outils avancés',
      'Aucune télémétrie, 100 % local',
    ],
    links: [
      {
        label: 'Voir sur GitHub',
        href: 'https://github.com/InfoZen-git/Klyr-optimizer',
        icon: 'github',
      },
    ],
    highlights: [
      { value: '40', label: 'Optimisations' },
      { value: '5', label: 'Modules' },
      { value: 'FR / EN', label: 'Langues' },
    ],
  },
  {
    id: 'homelab',
    title: 'Homelab',
    kind: 'Infrastructure',
    status: 'live',
    featured: true,
    visual: 'topology',
    summary:
      "Mon terrain de jeu réseau à la maison : une Livebox 7 en tête de pont, un switch stacké pour la distribution, un TP-Link Archer AX3000 en Wi-Fi 6 et une topologie pensée pour segmenter, mesurer et casser des trucs sans couper Internet à la famille.",
    tags: ['Réseau', 'Self-hosting', 'Wi-Fi 6', 'Switching'],
    links: [],
    highlights: [
      { value: 'Livebox 7', label: 'Passerelle' },
      { value: 'Stack', label: 'Switching' },
      { value: 'AX3000', label: 'Wi-Fi 6' },
    ],
  },
  {
    id: 'soon-1',
    title: 'Prochain outil',
    kind: 'Outil',
    status: 'soon',
    summary:
      "Quelque chose se prépare côté outils. Encore un peu de patience — ça arrive sur cette page dès que c'est prêt.",
    tags: ['À venir'],
    links: [],
  },
  {
    id: 'soon-2',
    title: 'Terrain d\'expérimentation',
    kind: 'Homelab',
    status: 'soon',
    summary:
      'Un emplacement libre pour la prochaine idée. Les meilleures naissent souvent en direct dans le homelab.',
    tags: ['À venir'],
    links: [],
  },
  {
    id: 'soon-3',
    title: 'Ton idée ici',
    kind: 'Communauté',
    status: 'soon',
    summary:
      "Une idée à proposer ? Le Discord est ouvert, et beaucoup de projets démarrent d'un simple message.",
    tags: ['À venir'],
    links: [],
  },
]

export const channels = [
  {
    id: 'youtube',
    icon: 'youtube',
    name: "Les Astuces d'InfoZen",
    handle: 'YouTube',
    description: 'Tutos et astuces tech en format long comme en short.',
    // TODO : vérifie le handle exact de la chaîne YouTube.
    href: 'https://www.youtube.com/@LesAstucesdInfoZen',
    accent: '#ff0033',
  },
  {
    id: 'tiktok',
    icon: 'tiktok',
    name: 'TikTok',
    handle: '@infozen_off',
    description: 'Des astuces tech en moins de 60 secondes, tous les jours.',
    href: 'https://www.tiktok.com/@infozen_off',
    accent: '#25f4ee',
  },
  {
    id: 'instagram',
    icon: 'instagram',
    name: 'Instagram',
    handle: '@infozen_off',
    description: 'Les coulisses, le homelab et les formats courts.',
    href: 'https://www.instagram.com/infozen_off',
    accent: '#e1306c',
  },
  {
    id: 'discord',
    icon: 'discord',
    name: 'Discord',
    handle: 'Communauté InfoZen',
    description: 'Entraide, retours sur les projets et discussions tech.',
    // TODO : remplace par ton lien d'invitation Discord permanent.
    href: 'https://discord.gg/infozen',
    accent: '#5865f2',
  },
]

export const socials = [
  { id: 'github', icon: 'github', label: 'GitHub', href: 'https://github.com/InfoZen-git' },
  {
    id: 'youtube',
    icon: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@LesAstucesdInfoZen',
  },
  { id: 'tiktok', icon: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@infozen_off' },
  {
    id: 'instagram',
    icon: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/infozen_off',
  },
  { id: 'discord', icon: 'discord', label: 'Discord', href: 'https://discord.gg/infozen' },
]

export const contact = {
  heading: 'On construit quelque chose ensemble ?',
  description:
    "Collaboration, partenariat, question technique ou simple bonjour : le plus rapide reste le Discord, mais l'e-mail fonctionne très bien aussi.",
}
