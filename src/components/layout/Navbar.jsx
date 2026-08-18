import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav, profile } from '../../data/site'
import useActiveSection from '../../hooks/useActiveSection'
import { easeOut } from '../../lib/motion'

const sectionIds = nav.map((item) => item.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const active = useActiveSection(sectionIds)

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 40))

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? 'border-white/10 bg-abyss/70 shadow-lg shadow-black/40 backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a
            href="#hero"
            className="group flex items-center gap-2.5 font-display text-sm font-semibold tracking-tight text-white"
          >
            <span className="relative flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-electric text-void">
              <span className="font-display text-sm font-bold">Z</span>
              <span className="absolute inset-0 rounded-lg bg-accent/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            </span>
            {profile.brand}
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                    active === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-full border border-accent/25 bg-accent/10"
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-colors duration-300 hover:bg-accent/20 sm:block"
            >
              Me contacter
            </motion.a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void/90 backdrop-blur-xl md:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
              }}
              className="flex h-full flex-col items-center justify-center gap-2 px-8"
            >
              {nav.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
                  }}
                  className="w-full max-w-xs"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full rounded-xl border border-white/5 px-6 py-4 text-center font-display text-2xl font-medium text-slate-200 transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
