import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { easeOut } from '../../lib/motion'
import { profile } from '../../data/site'

/**
 * Rideau d'entrée : voile plein écran qui se lève au chargement.
 * Ignoré si l'utilisateur a demandé à réduire les animations.
 */
export default function PageIntro() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(!reduceMotion)

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false)
      return
    }
    const timeout = setTimeout(() => setVisible(false), 1100)
    return () => clearTimeout(timeout)
  }, [reduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          aria-hidden="true"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-void"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex flex-col items-center gap-4"
          >
            <span className="font-display text-2xl font-semibold tracking-tight text-white">
              Info<span className="text-accent">{profile.brand.slice(4)}</span>
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
              className="h-px w-16 origin-center bg-white/20"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
