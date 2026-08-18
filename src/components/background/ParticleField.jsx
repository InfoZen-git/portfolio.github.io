import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Champ de particules sur <canvas> : dérive lente, liens de proximité
 * et légère répulsion autour du curseur.
 *
 * - se met en pause quand l'onglet est en arrière-plan
 * - rendu statique si l'utilisateur réduit les animations
 */
export default function ParticleField({ density = 0.00009, className = '' }) {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    const pointer = { x: -9999, y: -9999 }
    let particles = []
    let frame = 0
    let width = 0
    let height = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(130, Math.max(28, Math.round(width * height * density)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.6,
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        if (!reduceMotion) {
          particle.x += particle.vx
          particle.y += particle.vy

          // Répulsion douce autour du curseur
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < 120 && distance > 0.001) {
            const push = (120 - distance) / 120
            particle.x += (dx / distance) * push * 1.4
            particle.y += (dy / distance) * push * 1.4
          }

          // Rebouclage sur les bords
          if (particle.x < -20) particle.x = width + 20
          if (particle.x > width + 20) particle.x = -20
          if (particle.y < -20) particle.y = height + 20
          if (particle.y > height + 20) particle.y = -20
        }

        context.beginPath()
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        context.fillStyle = 'rgba(148, 163, 184, 0.32)'
        context.fill()
      }

      // Liens de proximité
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distanceSquared = dx * dx + dy * dy
          if (distanceSquared > 130 * 130) continue

          const alpha = (1 - Math.sqrt(distanceSquared) / 130) * 0.1
          context.beginPath()
          context.moveTo(particles[i].x, particles[i].y)
          context.lineTo(particles[j].x, particles[j].y)
          context.strokeStyle = `rgba(148, 163, 184, ${alpha})`
          context.lineWidth = 0.6
          context.stroke()
        }
      }
    }

    const loop = () => {
      draw()
      frame = requestAnimationFrame(loop)
    }

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const handlePointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const handleVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(loop)
    }

    build()

    if (reduceMotion) {
      draw()
    } else {
      frame = requestAnimationFrame(loop)
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('pointerleave', handlePointerLeave)
      document.addEventListener('visibilitychange', handleVisibility)
    }

    const observer = new ResizeObserver(() => {
      build()
      if (reduceMotion) draw()
    })
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [density, reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
    />
  )
}
