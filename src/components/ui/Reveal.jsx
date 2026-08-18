import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../lib/motion'

/**
 * Enveloppe de révélation au scroll.
 * Utilisée partout pour garder un timing homogène.
 *
 *   <Reveal delay={0.1}>…</Reveal>
 *   <Reveal as="li" variants={scaleIn}>…</Reveal>
 */
export default function Reveal({
  as = 'div',
  children,
  className,
  delay = 0,
  variants = fadeUp,
  ...rest
}) {
  const Component = motion[as] ?? motion.div

  // Les variantes portent leur propre `transition`, qui l'emporte sur la prop
  // `transition` : on injecte donc le delay directement dedans.
  const delayed = useMemo(() => {
    if (!delay) return variants
    return {
      ...variants,
      show: {
        ...variants.show,
        transition: { ...(variants.show?.transition ?? {}), delay },
      },
    }
  }, [variants, delay])

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={delayed}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}
