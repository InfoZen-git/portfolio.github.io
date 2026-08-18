/**
 * Défilement infini horizontal.
 * La liste est dupliquée puis translatée de -50% : la boucle est invisible.
 */
export default function Marquee({ items, speed = 38, className = '' }) {
  return (
    <div className={`mask-fade-x group relative overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
            {items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/8 bg-panel/60 px-4 py-2 font-mono text-xs whitespace-nowrap text-slate-400 transition-colors duration-300 hover:border-white/20 hover:text-slate-200"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
