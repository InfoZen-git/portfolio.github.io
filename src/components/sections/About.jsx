import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Marquee from '../ui/Marquee'
import Terminal from '../ui/Terminal'
import { getIcon } from '../ui/icons'
import { about, profile } from '../../data/site'
import { blurUp, easeOut, fadeUp, scaleIn, stagger, viewportOnce } from '../../lib/motion'

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        eyebrow="À propos"
        title={about.heading}
        description="Créer, coder, héberger, entreprendre : quatre façons de faire la même chose, comprendre la tech et la rendre accessible."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Bio */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger(0.14)}
          className="flex flex-col gap-5 lg:col-span-7"
        >
          {about.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={blurUp}
              className="text-base leading-relaxed text-slate-400 text-pretty sm:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}

          <Reveal
            variants={fadeUp}
            delay={0.1}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-slate-400"
          >
            <MapPin className="size-4 text-accent" />
            Basé en {profile.location}
          </Reveal>
        </motion.div>

        {/* Terminal */}
        <Reveal variants={scaleIn} className="lg:col-span-5">
          <Terminal lines={about.terminal} />
        </Reveal>
      </div>

      {/* Piliers d'identité */}
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={stagger(0.12, 0.05)}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {about.pillars.map((pillar) => {
          const Icon = getIcon(pillar.icon)
          return (
            <motion.li
              key={pillar.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-panel/40 p-6 backdrop-blur-xl"
            >
              <span className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-white/6 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <motion.span
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="mb-5 flex size-11 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-accent"
              >
                <Icon className="size-5" />
              </motion.span>

              <h3 className="font-display text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{pillar.description}</p>

              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
                className="absolute inset-x-6 bottom-0 h-px origin-left bg-white/10"
              />
            </motion.li>
          )
        })}
      </motion.ul>

      {/* Stack */}
      <Reveal delay={0.1} className="mt-10">
        <p className="mb-4 font-mono text-xs tracking-[0.25em] text-muted uppercase">
          Ce que j'utilise
        </p>
        <Marquee items={about.stack} />
      </Reveal>
    </Section>
  )
}
