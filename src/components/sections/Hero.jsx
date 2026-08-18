import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import GradientMesh from '../background/GradientMesh'
import GridOverlay from '../background/GridOverlay'
import ParticleField from '../background/ParticleField'
import MagneticButton from '../ui/MagneticButton'
import { getIcon } from '../ui/icons'
import { profile, socials } from '../../data/site'
import { easeOut, stagger } from '../../lib/motion'

const INTRO_DELAY = 0.35

/** Lettres du titre : chaque caractère remonte derrière son propre masque. */
const letterVariants = {
  hidden: { y: '110%' },
  show: (index) => ({
    y: '0%',
    transition: { duration: 0.9, ease: easeOut, delay: INTRO_DELAY + index * 0.055 },
  }),
}

/** Titre révélé lettre par lettre derrière un masque. */
function MaskedTitle({ text, className = '' }) {
  return (
    <span className={`flex flex-wrap justify-center ${className}`}>
      {text.split('').map((char, index) => (
        <span key={index} className="overflow-hidden py-[0.08em]">
          <motion.span custom={index} variants={letterVariants} className="inline-block">
            {char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
    >
      {/* Arrière-plan animé */}
      <motion.div
        style={reduceMotion ? undefined : { y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0"
      >
        <GradientMesh />
        <ParticleField />
        <GridOverlay />
        <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-transparent to-void" />
      </motion.div>

      {/* Contenu */}
      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate="show"
        variants={stagger(0.12, INTRO_DELAY)}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center"
      >
        {/* Badge de disponibilité */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
          }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-success" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <span className="text-xs font-medium tracking-wide text-slate-300">
            {profile.availability}
          </span>
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
          }}
          className="mb-5 font-mono text-xs tracking-[0.3em] text-muted uppercase sm:text-sm"
        >
          {profile.role}
        </motion.p>

        {/* La marque porte le titre, le prénom passe en signature discrète. */}
        <h1 className="font-display text-[clamp(3rem,13vw,8.5rem)] leading-[0.95] font-bold tracking-tight text-white">
          <MaskedTitle text={profile.brand} />
        </h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: easeOut, delay: INTRO_DELAY + 0.55 },
            },
          }}
          className="mt-4 font-mono text-xs tracking-[0.4em] text-muted uppercase"
        >
          by {profile.firstName}
        </motion.p>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: easeOut, delay: INTRO_DELAY + 0.7 },
            },
          }}
          className="mt-8 max-w-xl text-base leading-relaxed text-slate-400 text-pretty sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        {/* Actions */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: easeOut, delay: INTRO_DELAY + 0.85 },
            },
          }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-void transition-colors duration-300 hover:bg-white"
          >
            Voir mes projets
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <MagneticButton
            href="#content"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-medium text-slate-300 transition-colors duration-300 hover:border-white/25 hover:text-white"
          >
            Découvrir mon contenu
          </MagneticButton>
        </motion.div>

        {/* Réseaux */}
        <motion.ul
          variants={stagger(0.07, INTRO_DELAY + 1)}
          className="mt-12 flex items-center gap-3"
        >
          {socials.map((social) => {
            const Icon = getIcon(social.icon)
            return (
              <motion.li
                key={social.id}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.8 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } },
                }}
              >
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="flex size-11 items-center justify-center rounded-full border border-white/8 text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-200"
                >
                  <Icon className="size-4" />
                </motion.a>
              </motion.li>
            )
          })}
        </motion.ul>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          aria-label="Aller à la section À propos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: INTRO_DELAY + 1.5, duration: 0.8 }}
          className="block p-2 text-muted transition-colors duration-300 hover:text-slate-300"
        >
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs tracking-[0.25em] uppercase">Scroll</span>
            <ArrowDown className="size-4" />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
