import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

/**
 * Carte en verre avec halo qui suit le curseur et léger basculement 3D.
 * Les deux effets sont désactivés si l'utilisateur réduit les animations.
 */
export default function SpotlightCard({
  children,
  className = '',
  accent = 'var(--color-accent)',
  tilt = 6,
  as = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const Component = motion[as] ?? motion.div

  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)
  const glow = useMotionValue(0)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })

  const background = useMotionTemplate`radial-gradient(420px circle at ${mouseX}% ${mouseY}%, color-mix(in oklab, ${accent} 12%, transparent), transparent 70%)`
  const border = useMotionTemplate`radial-gradient(320px circle at ${mouseX}% ${mouseY}%, color-mix(in oklab, ${accent} 45%, transparent), transparent 75%)`

  function handlePointerMove(event) {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    mouseX.set(px * 100)
    mouseY.set(py * 100)
    rotateY.set((px - 0.5) * tilt)
    rotateX.set((0.5 - py) * tilt)
  }

  function handlePointerLeave() {
    glow.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <Component
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => glow.set(1)}
      onPointerLeave={handlePointerLeave}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`group relative isolate overflow-hidden rounded-2xl border border-white/8 bg-panel/40 backdrop-blur-xl ${className}`}
      {...rest}
    >
      {/* Bordure lumineuse suivant le curseur */}
      <motion.span
        aria-hidden="true"
        style={{ background: border, opacity: glow }}
        className="pointer-events-none absolute -inset-px -z-10 rounded-2xl transition-opacity duration-300"
      />
      {/* Halo interne */}
      <motion.span
        aria-hidden="true"
        style={{ background, opacity: glow }}
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300"
      />
      {/* Reflet haut */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      {children}
    </Component>
  )
}
