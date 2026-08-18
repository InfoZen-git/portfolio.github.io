import { techIcons } from './techIcons'

/**
 * Bande de logos défilant à l'infini.
 * La liste est dupliquée puis translatée de -50% : la boucle est invisible.
 * Les clés inconnues sont ignorées plutôt que de casser le rendu.
 */
export default function Marquee({ items, speed = 38, className = '' }) {
  const logos = items.map((key) => techIcons[key]).filter(Boolean)

  return (
    <div className={`mask-fade-x group relative overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
            {logos.map((logo) => (
              <li
                key={logo.title}
                title={logo.title}
                className="flex size-14 items-center justify-center rounded-xl border border-white/8 bg-panel/60 text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:text-slate-100"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  role="img"
                  aria-label={logo.title}
                  className="size-6"
                >
                  <title>{logo.title}</title>
                  <path d={logo.path} />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
