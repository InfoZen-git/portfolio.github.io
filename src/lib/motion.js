/**
 * Variantes Framer Motion partagées.
 * Centralisées ici pour garder une signature d'animation cohérente sur tout le site.
 */

/** Courbe "expo out" — départ franc, arrivée très douce. */
export const easeOut = [0.16, 1, 0.3, 1]

/**
 * Réglage de viewport par défaut des reveals au scroll.
 * `amount` reste faible volontairement : un conteneur plus haut que l'écran
 * ne pourrait jamais atteindre un seuil élevé, et ses enfants ne s'afficheraient
 * alors jamais.
 */
export const viewportOnce = { once: true, amount: 0.15, margin: '0px 0px -80px 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easeOut } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: easeOut } },
}

export const blurUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: easeOut },
  },
}

/**
 * Conteneur orchestrant ses enfants.
 * @param {number} stagger décalage entre chaque enfant (s)
 * @param {number} delay   délai avant le premier enfant (s)
 */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})
