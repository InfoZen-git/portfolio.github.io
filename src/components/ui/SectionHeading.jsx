import { motion } from 'framer-motion'
import { easeOut, fadeUp, stagger, viewportOnce } from '../../lib/motion'

/**
 * Titre de section : numéro d'index, libellé, trait qui se dessine, sous-titre.
 */
export default function SectionHeading({ index, eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center'

  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0.09)}
      className={`flex flex-col gap-4 ${centered ? 'items-center text-center' : 'items-start'}`}
    >
      <motion.div variants={fadeUp} className="flex items-center gap-3">
        {index && (
          <span className="font-mono text-xs tracking-[0.25em] text-accent">{index}</span>
        )}
        <span className="text-xs font-medium tracking-[0.25em] text-muted uppercase">
          {eyebrow}
        </span>
        <motion.span
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.15 }}
          className="h-px w-16 origin-left bg-white/15 sm:w-24"
        />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        className="max-w-3xl font-display text-3xl leading-[1.15] font-semibold text-white text-balance sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeUp}
          className={`max-w-2xl text-base leading-relaxed text-slate-400 text-pretty sm:text-lg ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.header>
  )
}
