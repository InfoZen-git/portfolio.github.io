import { motion, useReducedMotion } from 'framer-motion'
import { easeOut, viewportOnce } from '../../lib/motion'

const shellVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.38, delayChildren: 0.15 } },
}

const lineVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.022 } },
}

const charVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.01 } },
}

const outputVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
}

/** Frappe caractère par caractère, orchestrée par Framer Motion. */
function TypedText({ text, className }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return <span className={className}>{text}</span>

  return (
    <motion.span variants={lineVariants} className={className}>
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * Fausse fenêtre de terminal.
 * `lines` : `{ prompt, command }` pour une commande, `{ output }` pour un retour.
 */
export default function Terminal({ title = 'octave@infozen', lines = [], className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/8 bg-abyss/80 shadow-2xl shadow-black/50 backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
        <span className="size-3 rounded-full bg-red-500/70" />
        <span className="size-3 rounded-full bg-amber-400/70" />
        <span className="size-3 rounded-full bg-emerald-400/70" />
        <span className="ml-2 font-mono text-xs text-slate-500">{title}</span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={shellVariants}
        className="space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm"
      >
        {lines.map((line, index) =>
          line.command ? (
            <motion.p
              key={index}
              variants={lineVariants}
              className="flex flex-wrap items-baseline gap-x-2"
            >
              <span className="text-accent">➜</span>
              <span className="text-electric">{line.prompt}</span>
              <TypedText text={line.command} className="text-slate-200" />
            </motion.p>
          ) : (
            <motion.p key={index} variants={outputVariants} className="pl-6 text-slate-500">
              {line.output}
            </motion.p>
          ),
        )}

        <motion.span
          variants={outputVariants}
          className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  )
}
