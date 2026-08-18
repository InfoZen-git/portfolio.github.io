import { motion, useReducedMotion } from 'framer-motion'

const blobs = [
  {
    className: 'left-[-14%] top-[-18%] size-[46rem] bg-accent/22',
    animate: { x: [0, 90, -40, 0], y: [0, 60, -30, 0], scale: [1, 1.12, 0.95, 1] },
    duration: 22,
  },
  {
    className: 'right-[-16%] top-[6%] size-[40rem] bg-electric/22',
    animate: { x: [0, -80, 50, 0], y: [0, 70, -20, 0], scale: [1, 0.92, 1.1, 1] },
    duration: 26,
  },
  {
    className: 'bottom-[-24%] left-[24%] size-[36rem] bg-indigo-500/18',
    animate: { x: [0, 60, -70, 0], y: [0, -50, 30, 0], scale: [1, 1.08, 0.94, 1] },
    duration: 30,
  },
]

/** Nappe de dégradés animés (blobs flous) en arrière-plan. */
export default function GradientMesh({ className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-[110px] ${blob.className}`}
          animate={reduceMotion ? undefined : blob.animate}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
