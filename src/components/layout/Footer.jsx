import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { getIcon } from '../ui/icons'
import { profile, socials } from '../../data/site'
import { viewportOnce } from '../../lib/motion'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-10 sm:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row"
      >
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-display text-sm font-semibold text-slate-300">
            {profile.firstName} · {profile.brand}
          </span>
          <span className="font-mono text-xs text-slate-600">
            © {new Date().getFullYear()} · Conçu et développé en {profile.location}
          </span>
        </div>

        <ul className="flex items-center gap-2">
          {socials.map((social) => {
            const Icon = getIcon(social.icon)
            return (
              <li key={social.id}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  className="flex size-9 items-center justify-center rounded-lg text-slate-600 transition-colors duration-300 hover:text-accent"
                >
                  <Icon className="size-4" />
                </motion.a>
              </li>
            )
          })}

          <li>
            <motion.a
              href="#hero"
              aria-label="Remonter en haut de page"
              whileHover={{ y: -3 }}
              className="ml-2 flex size-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition-colors duration-300 hover:border-accent/40 hover:text-accent"
            >
              <ArrowUp className="size-4" />
            </motion.a>
          </li>
        </ul>
      </motion.div>
    </footer>
  )
}
