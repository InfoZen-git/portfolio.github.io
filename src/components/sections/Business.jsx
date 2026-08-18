import { motion } from 'framer-motion'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'
import { getIcon } from '../ui/icons'
import { ventures } from '../../data/site'
import { easeOut, viewportOnce } from '../../lib/motion'

const spans = {
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  6: 'lg:col-span-6',
}

const statuses = {
  active: {
    label: 'En cours',
    className: 'border-white/8 text-slate-400',
    dot: 'bg-success',
  },
  soon: {
    label: 'À venir',
    className: 'border-white/8 text-slate-400',
    dot: 'bg-accent',
  },
  past: {
    label: 'Terminé',
    className: 'border-white/8 text-muted',
    dot: 'bg-slate-600',
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: (index % 3) * 0.09 },
  }),
}

function VentureCard({ venture, index }) {
  const Icon = getIcon(venture.icon)
  const status = statuses[venture.status] ?? statuses.active

  return (
    <motion.li
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={cardVariants}
      className={`h-full ${spans[venture.span] ?? spans[2]}`}
    >
      <SpotlightCard className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="flex size-11 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-accent"
          >
            <Icon className="size-5" />
          </motion.span>

          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs tracking-wider uppercase ${status.className}`}
          >
            <span className={`size-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        <p className="mt-5 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          {venture.kind}
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold text-white text-balance sm:text-xl">
          {venture.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400 text-pretty">{venture.summary}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {venture.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-white/6 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </SpotlightCard>
    </motion.li>
  )
}

export default function Business() {
  return (
    <Section id="business">
      <SectionHeading
        index="03"
        eyebrow="Business"
        title="Quand la tech devient une activité"
        description="Ce que j'ai lancé, testé et fais tourner aujourd'hui, de la prestation locale au développement pour des clients."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {ventures.map((venture, index) => (
          <VentureCard key={venture.id} venture={venture} index={index} />
        ))}
      </ul>
    </Section>
  )
}
