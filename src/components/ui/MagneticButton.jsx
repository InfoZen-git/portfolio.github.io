import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Élément "magnétique" : suit légèrement le curseur puis revient en place.
 * Rend un <a> ou un <button> selon la présence de `href`.
 */
export default function MagneticButton({
  children,
  href,
  className = '',
  strength = 0.35,
  ...rest
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const springConfig = { stiffness: 260, damping: 18, mass: 0.6 }
  const x = useSpring(useMotionValue(0), springConfig)
  const y = useSpring(useMotionValue(0), springConfig)

  function handlePointerMove(event) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  const Component = href ? motion.a : motion.button
  const linkProps = href
    ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer noopener' }
    : { type: 'button' }

  return (
    <Component
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ x, y }}
      whileHover={{ scale: reduceMotion ? 1 : 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      className={className}
      {...linkProps}
      {...rest}
    >
      {children}
    </Component>
  )
}
