import { motion, useScroll, useSpring } from 'framer-motion'

/** Fine barre de progression de lecture, fixée en haut de page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent via-accent-soft to-electric shadow-[0_0_12px_rgba(34,211,238,0.6)]"
    />
  )
}
