import { motion } from 'framer-motion'
import { easeOut, viewportOnce } from '../../../lib/motion'

/** Coche qui se dessine au scroll. */
function AnimatedCheck({ delay }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="none" stroke="var(--color-accent)" strokeOpacity="0.3" />
      <motion.path
        d="M4.6 8.2 L7 10.5 L11.4 5.6"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.4, ease: easeOut, delay }}
      />
    </svg>
  )
}

/** Liste de caractéristiques révélée en cascade. */
export default function FeatureChecklist({ items = [] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item, index) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, ease: easeOut, delay: 0.08 * index }}
          className="flex items-center gap-2.5 text-[13px] text-slate-400"
        >
          <AnimatedCheck delay={0.08 * index + 0.15} />
          {item}
        </motion.li>
      ))}
    </ul>
  )
}
