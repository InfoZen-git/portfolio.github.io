/**
 * Source de vérité du site.
 * Tout le contenu éditable vit ici, les composants ne font que l'afficher.
 * Pour ajouter un projet, un business ou un réseau : ajoute une entrée dans le tableau.
 *
 * Les `icon` sont des clés du registre défini dans src/components/ui/icons.jsx
 * Les `span` sont exprimés en colonnes sur une grille de 6.
 */

export const profile = {
  firstName: 'Octave',
  brand: 'InfoZen',
  role: 'Créateur tech, développeur & entrepreneur',
  tagline:
    "Je vulgarise la tech, je code des outils open source, je fais tourner mon propre homelab et j'en tire des activités bien réelles. L'idée : rendre la technologie simple, utile et un peu plus zen.",
  location: 'France',
  availability: 'Ouvert aux collaborations',
  email: 'contact.infozen68@gmail.com',
}

export const nav = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'projects', label: 'Projets' },
  { id: 'business', label: 'Business' },
  { id: 'content', label: 'Contenu' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  heading: 'Plusieurs casquettes, une seule obsession',
  paragraphs: [
    "Je m'appelle Octave, et sous le nom d'InfoZen je partage des astuces tech au quotidien : optimisation, sécurité, logiciels, réseau. Le genre de contenu que j'aurais aimé trouver quand j'ai commencé.",
    "En parallèle, je développe. Quand une astuce mérite mieux qu'une vidéo de 60 secondes, j'en fais un outil, et c'est comme ça qu'est né Klyr-optimizer, un optimiseur Windows open source.",
    "Pour comprendre vraiment l'infra, rien ne vaut la pratique : j'auto-héberge un homelab complet, du routeur jusqu'aux conteneurs Docker, en passant par un modèle IA local et un dashboard sur Arduino. Je casse, je répare, j'explique.",
    "Et tout ça finit par servir : dépannage, développement pour des clients, revente de matériel, produits pour les commerçants du coin. La tech, quand elle est bien comprise, ça devient une activité.",
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
        "Des outils open source et des applications sur mesure, publiés et maintenus sur GitHub.",
    },
    {
      icon: 'server',
      title: 'Homelab',
      description:
        'Une infra maison auto-hébergée : Docker, DNS filtrant, supervision, domotique et IA locale.',
    },
    {
      icon: 'briefcase',
      title: 'Entrepreneur',
      description:
        'Des activités concrètes autour de la tech : prestation, développement client, revente, produits locaux.',
    },
  ],
  stack: [
    'React',
    'Tailwind CSS',
    'JavaScript',
    'Python',
    'FastAPI',
    'PowerShell',
    'C#',
    'Windows',
    'Linux',
    'Docker',
    'Réseau',
    'Self-hosting',
    'Ollama',
    'Arduino',
    'Git',
  ],
  terminal: [
    { prompt: '~', command: 'whoami' },
    { output: 'octave, alias infozen' },
    { prompt: '~', command: 'cat roles.txt' },
    { output: 'créateur · développeur · homelabber · entrepreneur' },
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
    span: 6,
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
    span: 6,
    visual: 'architecture',
    summary:
      "Mon terrain de jeu réseau à la maison. Une Livebox 7 en tête de pont, un switch stacké pour la distribution et un TP-Link Archer AX3000 en Wi-Fi 6. Derrière, un Raspberry Pi 4B et un serveur ZimaOS font tourner sept services en Docker : DNS filtrant, supervision, domotique, bot Discord, API de métriques et un modèle IA local sur GPU. Le tout joignable à distance par Tailscale, avec un Arduino Uno R4 WiFi en dashboard physique.",
    tags: ['Docker', 'Réseau', 'Self-hosting', 'Tailscale', 'FastAPI'],
    links: [],
    highlights: [
      { value: '2', label: 'Hôtes Docker' },
      { value: '7', label: 'Services' },
      { value: 'Tailscale', label: 'Accès distant' },
      { value: 'Wi-Fi 6', label: 'Archer AX3000' },
    ],
  },
]

/**
 * Architecture du homelab, rendue par HomelabArchitecture.jsx.
 * `nodes` : coordonnées du centre dans la viewBox 960 × 430 du schéma.
 * `links` : `dashed: true` pour une liaison logique (VPN, HTTP applicatif).
 */
export const homelab = {
  nodes: {
    internet: { x: 250, y: 30, w: 108, h: 34, lines: ['Internet'], tone: 'muted' },
    remote: { x: 706, y: 30, w: 150, h: 34, lines: ['Appareils distants'], tone: 'muted' },
    livebox: { x: 250, y: 114, w: 168, h: 40, lines: ['Livebox 7', 'routeur'], tone: 'accent' },
    zima: { x: 200, y: 208, w: 178, h: 44, lines: ['Serveur ZimaOS', 'Docker'], tone: 'accent' },
    rpi: { x: 664, y: 208, w: 188, h: 44, lines: ['Raspberry Pi 4B', 'Docker'], tone: 'accent' },
    negociateur: {
      x: 66,
      y: 312,
      w: 122,
      h: 44,
      lines: ['Négociateur IA', 'Ollama / GPU'],
      tone: 'electric',
    },
    homeassistant: {
      x: 196,
      y: 312,
      w: 122,
      h: 44,
      lines: ['Home Assistant', 'domotique'],
      tone: 'electric',
    },
    agent: {
      x: 326,
      y: 312,
      w: 122,
      h: 44,
      lines: ['Agent métriques', 'FastAPI'],
      tone: 'electric',
    },
    api: { x: 486, y: 312, w: 122, h: 44, lines: ['API métriques', 'FastAPI'], tone: 'electric' },
    pihole: { x: 616, y: 312, w: 122, h: 44, lines: ['Pi-hole', 'DNS filtrant'], tone: 'electric' },
    lebonbot: {
      x: 746,
      y: 312,
      w: 122,
      h: 44,
      lines: ['LeBonBot', 'bot Discord'],
      tone: 'electric',
    },
    kuma: { x: 876, y: 312, w: 122, h: 44, lines: ['Uptime Kuma', 'supervision'], tone: 'electric' },
    arduino: {
      x: 486,
      y: 400,
      w: 156,
      h: 44,
      lines: ['Arduino Uno R4 WiFi', 'dashboard physique'],
      tone: 'muted',
    },
  },
  links: [
    { from: 'internet', to: 'livebox' },
    { from: 'livebox', to: 'zima' },
    { from: 'livebox', to: 'rpi' },
    { from: 'remote', to: 'rpi', dashed: true, label: 'Tailscale VPN' },
    { from: 'zima', to: 'negociateur' },
    { from: 'zima', to: 'homeassistant' },
    { from: 'zima', to: 'agent' },
    { from: 'rpi', to: 'api' },
    { from: 'rpi', to: 'pihole' },
    { from: 'rpi', to: 'lebonbot' },
    { from: 'rpi', to: 'kuma' },
    { from: 'api', to: 'agent', dashed: true, label: 'HTTP', straight: true },
    { from: 'arduino', to: 'api', dashed: true, label: 'Wi-Fi / HTTP' },
  ],
  /** Même architecture, en liste : c'est cette version qui s'affiche sur mobile. */
  groups: [
    {
      id: 'edge',
      title: 'Entrée réseau',
      subtitle: 'Livebox 7, switch stacké, Archer AX3000',
      items: ['Internet', 'Wi-Fi 6', 'Accès distant par Tailscale'],
    },
    {
      id: 'rpi',
      title: 'Raspberry Pi 4B',
      subtitle: 'Docker',
      items: ['API métriques (FastAPI)', 'Pi-hole (DNS filtrant)', 'LeBonBot (Discord)', 'Uptime Kuma'],
    },
    {
      id: 'zima',
      title: 'Serveur ZimaOS',
      subtitle: 'Docker',
      items: ['Négociateur IA (Ollama / GPU)', 'Home Assistant', 'Agent métriques (FastAPI)'],
    },
    {
      id: 'edge-device',
      title: 'Périphérique',
      subtitle: 'Arduino Uno R4 WiFi',
      items: ['Dashboard physique', 'Remontée Wi-Fi / HTTP'],
    },
  ],
}

/**
 * Activités et business.
 * TODO : ajuste `status` selon la réalité du moment.
 *   'active' = en cours · 'soon' = à venir · 'past' = arrêté
 */
export const ventures = [
  {
    id: 'saas',
    icon: 'rocket',
    title: 'Projet SaaS',
    kind: 'Produit',
    status: 'soon',
    span: 2,
    summary:
      "Le gros morceau du moment. Un SaaS en cours de construction, encore confidentiel, sur lequel passe l'essentiel de mon temps de développement.",
    tags: ['SaaS', 'En construction'],
  },
  {
    id: 'renovatio',
    icon: 'calculator',
    title: 'Application de comptabilité',
    kind: 'Développement client',
    status: 'active',
    span: 2,
    summary:
      "Une application de compta développée sur mesure pour Renovatio68, pensée pour leur façon de travailler plutôt que pour un logiciel générique.",
    tags: ['Client', 'Sur mesure', 'Compta'],
  },
  {
    id: 'depannage',
    icon: 'wrench',
    title: 'Dépannage et assistance informatique',
    kind: 'Prestation',
    status: 'active',
    span: 2,
    summary:
      "Diagnostic, réparation, nettoyage, installation, configuration réseau. J'interviens chez les particuliers et les petites structures, avec l'explication qui va avec.",
    tags: ['Particuliers', 'TPE', 'Réseau'],
  },
  {
    id: 'nfc',
    icon: 'nfc',
    title: 'Cartes NFC avis Google',
    kind: 'Produit local',
    status: 'active',
    span: 3,
    summary:
      "Une carte posée sur le comptoir, le client approche son téléphone et arrive directement sur la page d'avis Google du commerce. Simple, physique, et redoutablement efficace pour les commerçants du coin.",
    tags: ['NFC', 'Commerçants', 'Avis Google'],
  },
  {
    id: 'hardware',
    icon: 'cpu',
    title: 'Achat et revente de PC et composants',
    kind: 'Négoce',
    status: 'active',
    span: 3,
    summary:
      "Sourcing, test, remise en état et revente de machines et de composants. C'est l'activité qui m'a appris à reconnaître une bonne affaire d'un mauvais deal, et à démonter à peu près tout ce qui se démonte.",
    tags: ['Hardware', 'Reconditionné', 'Sourcing'],
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
    "Collaboration, partenariat, prestation, question technique ou simple bonjour : le plus rapide reste le Discord, mais l'e-mail fonctionne très bien aussi.",
}
