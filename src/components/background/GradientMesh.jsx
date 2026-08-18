import { motion, useReducedMotion } from 'framer-motion'

/**
 * Voiles lumineux très discrets en arrière-plan.
 * Opacité volontairement basse et teinte unique : ils doivent donner de la
 * profondeur, pas colorer la page.
 */
const veils = [
  {
    className: 'left-[-12%] top-[-16%] size-[46rem] bg-accent/8',
    animate: { x: [0, 70, -30, 0], y: [0, 45, -25, 0], scale: [1, 1.08, 0.96, 1] },
    duration: 30,
  },
  {
    className: 'right-[-14%] top-[10%] size-[38rem] bg-accent-deep/10',
    animate: { x: [0, -60, 40, 0], y: [0, 55, -15, 0], scale: [1, 0.94, 1.07, 1] },
    duration: 36,
  },
  {
    className: 'bottom-[-22%] left-[26%] size-[34rem] bg-white/4',
    animate: { x: [0, 45, -55, 0], y: [0, -40, 25, 0], scale: [1, 1.06, 0.95, 1] },
    duration: 42,
  },
]

export default function GradientMesh({ className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {veils.map((veil, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-[130px] ${veil.className}`}
          animate={reduceMotion ? undefined : veil.animate}
          transition={{
            duration: veil.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
