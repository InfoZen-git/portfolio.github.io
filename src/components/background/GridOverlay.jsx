/** Grille technique estompée sur les bords, posée au-dessus des dégradés. */
export default function GridOverlay({ size = 56, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 opacity-60 ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px),' +
          'linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)',
        backgroundSize: `${size}px ${size}px`,
        maskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 40%, black 20%, transparent 100%)',
      }}
    />
  )
}
