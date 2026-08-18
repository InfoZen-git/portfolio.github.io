import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import SpotlightCard from '../ui/SpotlightCard'
import { getIcon } from '../ui/icons'
import HomelabArchitecture from './visuals/HomelabArchitecture'
import FeatureChecklist from './visuals/FeatureChecklist'
import { easeOut, viewportOnce } from '../../lib/motion'

/** Visuels optionnels, référencés par la clé `visual` d'un projet. */
const visuals = {
  architecture: () => <HomelabArchitecture />,
  checklist: ({ project }) => <FeatureChecklist items={project.features} />,
}

/** Le décalage est calculé par colonne pour que chaque rangée se révèle en cascade. */
const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut, delay: (index % 3) * 0.09 },
  }),
}

function StatusBadge({ status }) {
  if (status === 'soon') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-wider text-slate-500 uppercase">
        <Clock className="size-3" />
        Bientôt
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-mono text-[10px] tracking-wider text-emerald-400 uppercase">
      <span className="size-1.5 rounded-full bg-emerald-400" />
      En ligne
    </span>
  )
}

export default function ProjectCard({ project, index = 0, className = '' }) {
  const Visual = project.visual ? visuals[project.visual] : null
  const isSoon = project.status === 'soon'

  return (
    // Chaque carte pilote sa propre révélation : la grille est plus haute que
    // l'écran, un `staggerChildren` au niveau du conteneur ne se déclencherait
    // jamais entièrement sur mobile.
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={cardVariants}
      className={`h-full ${className}`}
    >
      <SpotlightCard
        className={`flex h-full flex-col p-6 sm:p-7 ${isSoon ? 'border-dashed border-white/8' : ''}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent/70 uppercase">
              {project.kind}
            </p>
            <h3
              className={`mt-2 font-display text-xl font-semibold sm:text-2xl ${
                isSoon ? 'text-slate-500' : 'text-white'
              }`}
            >
              {project.title}
            </h3>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-400 text-pretty">{project.summary}</p>

        {Visual && (
          <div className="mt-6 rounded-xl border border-white/5 bg-void/40 p-4">
            <Visual project={project} />
          </div>
        )}

        {project.highlights && (
          <dl className="mt-6 flex flex-wrap gap-3">
            {project.highlights.map((highlight, index) => (
              <motion.div
                key={highlight.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: easeOut, delay: 0.1 * index }}
                className="min-w-[6.5rem] flex-1 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5"
              >
                <dt className="font-mono text-[10px] tracking-wider text-slate-600 uppercase">
                  {highlight.label}
                </dt>
                <dd className="mt-0.5 font-display text-sm font-semibold text-slate-200">
                  {highlight.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        )}

        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-white/6 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-slate-500"
              >
                {tag}
              </li>
            ))}
          </ul>

          {project.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.links.map((link) => {
                const Icon = getIcon(link.icon)
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    whileHover={{ x: 2 }}
                    className="group/link inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="size-4" />
                    {link.label}
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </motion.a>
                )
              })}
            </div>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}
