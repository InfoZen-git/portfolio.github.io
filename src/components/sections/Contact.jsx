import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import MagneticButton from '../ui/MagneticButton'
import GradientMesh from '../background/GradientMesh'
import { getIcon } from '../ui/icons'
import { contact, profile, socials } from '../../data/site'
import { easeOut, fadeUp, stagger, viewportOnce } from '../../lib/motion'

export default function Contact() {
  return (
    <Section id="contact" className="overflow-hidden">
      <div className="relative">
        <GradientMesh className="opacity-40" />

        <div className="relative">
          <SectionHeading
            index="05"
            eyebrow="Contact"
            title={contact.heading}
            description={contact.description}
            align="center"
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={stagger(0.1, 0.15)}
            className="mt-12 flex flex-col items-center gap-8"
          >
            <motion.div variants={fadeUp}>
              <MagneticButton
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-slate-100 px-7 py-3.5 text-sm font-semibold text-void transition-colors duration-300 hover:bg-white"
              >
                <Mail className="size-4" />
                {profile.email}
              </MagneticButton>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-gradient-to-r from-transparent to-white/15"
              />
              <span className="font-mono text-[11px] tracking-[0.25em] text-slate-600 uppercase">
                ou ailleurs
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-gradient-to-l from-transparent to-white/15"
              />
            </motion.div>

            <motion.ul variants={stagger(0.08)} className="flex flex-wrap justify-center gap-3">
              {socials.map((social) => {
                const Icon = getIcon(social.icon)
                return (
                  <motion.li
                    key={social.id}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.85 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.5, ease: easeOut },
                      },
                    }}
                  >
                    <MagneticButton
                      href={social.href}
                      strength={0.25}
                      className="group inline-flex items-center gap-2.5 rounded-full border border-white/8 px-5 py-2.5 text-sm text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-100"
                    >
                      <Icon className="size-4" />
                      {social.label}
                    </MagneticButton>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
