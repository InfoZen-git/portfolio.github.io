import { useEffect, useState } from 'react'

/**
 * Renvoie l'id de la section actuellement la plus visible à l'écran.
 * Sert au surlignage actif de la navigation.
 */
export default function useActiveSection(ids, options) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return

    const ratios = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        let best = null
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        if (best) setActive(best)
      },
      {
        threshold: [0.15, 0.35, 0.6, 0.85],
        rootMargin: '-15% 0px -35% 0px',
        ...options,
      },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')])

  return active
}
