import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'
import { getIcon } from '../ui/icons'
import { channels } from '../../data/site'
import { easeOut, viewportOnce } from '../../lib/motion'

/** Cascade par colonne : chaque carte se révèle pour son propre compte. */
const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: (index % 2) * 0.1 },
  }),
}

export default function Content() {
  return (
    <Section id="content">
      <SectionHeading
        index="03"
        eyebrow="Contenu"
        title="Où me suivre au quotidien"
        description="Des astuces tech courtes, des tutos plus poussés et une communauté pour en discuter."
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2">
        {channels.map((channel, index) => {
          const Icon = getIcon(channel.icon)

          return (
            <motion.li
              key={channel.id}
              custom={index}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={cardVariants}
              className="h-full"
            >
              <SpotlightCard accent={channel.accent} className="h-full">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-full flex-col p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <motion.span
                      whileHover={{ rotate: -6, scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 14 }}
                      className="flex size-12 items-center justify-center rounded-xl border transition-colors duration-500"
                      style={{
                        color: channel.accent,
                        borderColor: `color-mix(in oklab, ${channel.accent} 30%, transparent)`,
                        backgroundColor: `color-mix(in oklab, ${channel.accent} 12%, transparent)`,
                      }}
                    >
                      <Icon className="size-5" />
                    </motion.span>

                    <ArrowUpRight className="size-5 text-slate-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-300" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {channel.name}
                  </h3>
                  <p
                    className="mt-1 font-mono text-xs tracking-wide"
                    style={{ color: channel.accent }}
                  >
                    {channel.handle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {channel.description}
                  </p>
                </a>
              </SpotlightCard>
            </motion.li>
          )
        })}
      </ul>
    </Section>
  )
}
