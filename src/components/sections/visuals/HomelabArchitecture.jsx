import { motion, useReducedMotion } from 'framer-motion'
import { homelab } from '../../../data/site'
import { easeOut, viewportOnce } from '../../../lib/motion'

const tones = {
  accent: 'var(--color-accent)',
  electric: 'var(--color-electric)',
  muted: '#64748b',
}

const { nodes, links, groups } = homelab

/** Bord d'un nœud dans la direction d'un autre, pour ne pas partir du centre. */
function anchor(node, towards) {
  const half = node.h / 2 + 4
  return { x: node.x, y: towards.y > node.y ? node.y + half : node.y - half }
}

/** Chemin d'une liaison : droit à l'horizontale, en S à la verticale. */
function pathFor(link) {
  const from = nodes[link.from]
  const to = nodes[link.to]

  if (link.straight) {
    const leftFirst = from.x < to.x
    const x1 = from.x + (leftFirst ? from.w / 2 + 4 : -(from.w / 2 + 4))
    const x2 = to.x + (leftFirst ? -(to.w / 2 + 4) : to.w / 2 + 4)
    return `M ${x1} ${from.y} L ${x2} ${to.y}`
  }

  const a = anchor(from, to)
  const b = anchor(to, from)
  const midY = (a.y + b.y) / 2
  return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`
}

/**
 * Point médian d'une liaison, pour y poser son étiquette.
 * Une liaison horizontale voit son étiquette remonter, sinon elle se pose
 * exactement sur le trait.
 */
function labelPosition(link) {
  const from = nodes[link.from]
  const to = nodes[link.to]
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - (link.straight ? 6 : 0),
  }
}

function Diagram() {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 960 430"
      role="img"
      aria-label="Architecture du homelab : Internet vers la Livebox, qui alimente un serveur ZimaOS et un Raspberry Pi 4B sous Docker, hébergeant sept services, plus un Arduino Uno R4 WiFi et un accès distant Tailscale"
      className="h-auto w-full"
    >
      {links.map((link, index) => {
        const d = pathFor(link)
        const delay = 0.12 * index

        return (
          <g key={`${link.from}-${link.to}`}>
            <motion.path
              d={d}
              fill="none"
              stroke="rgba(148,163,184,0.3)"
              strokeWidth="1"
              strokeDasharray={link.dashed ? '4 4' : undefined}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay, ease: 'easeInOut' }}
            />

            {!reduceMotion && (
              <motion.path
                d={d}
                fill="none"
                stroke={link.dashed ? 'var(--color-electric)' : 'var(--color-accent)'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="7 110"
                initial={{ strokeDashoffset: 117, opacity: 0 }}
                whileInView={{ strokeDashoffset: -117, opacity: 0.9 }}
                viewport={viewportOnce}
                transition={{
                  strokeDashoffset: {
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.8 + index * 0.16,
                  },
                  opacity: { duration: 0.5, delay: 0.8 + index * 0.16 },
                }}
              />
            )}

            {link.label && (
              <motion.text
                x={labelPosition(link).x}
                y={labelPosition(link).y}
                textAnchor="middle"
                className="fill-slate-500 font-mono"
                style={{ fontSize: '8px' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: delay + 0.4 }}
              >
                {link.label}
              </motion.text>
            )}
          </g>
        )
      })}

      {Object.entries(nodes).map(([id, node], index) => (
        <motion.g
          key={id}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ type: 'spring', stiffness: 240, damping: 20, delay: 0.05 * index }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          <rect
            x={node.x - node.w / 2}
            y={node.y - node.h / 2}
            width={node.w}
            height={node.h}
            rx="8"
            fill="var(--color-abyss)"
            stroke={tones[node.tone]}
            strokeOpacity={node.tone === 'muted' ? 0.35 : 0.55}
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.lines.length > 1 ? node.y - 1 : node.y + 3.5}
            textAnchor="middle"
            className="fill-slate-200"
            style={{ fontSize: '10px', fontWeight: 500 }}
          >
            {node.lines[0]}
          </text>
          {node.lines[1] && (
            <text
              x={node.x}
              y={node.y + 11}
              textAnchor="middle"
              className="fill-slate-500 font-mono"
              style={{ fontSize: '8px' }}
            >
              {node.lines[1]}
            </text>
          )}
        </motion.g>
      ))}
    </svg>
  )
}

function GroupList() {
  return (
    <ul className="flex flex-col gap-3">
      {groups.map((group, index) => (
        <motion.li
          key={group.id}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.1 * index }}
          className="rounded-xl border border-white/6 bg-white/[0.02] p-4"
        >
          <p className="font-display text-sm font-semibold text-slate-200">{group.title}</p>
          <p className="mt-0.5 font-mono text-[11px] text-accent/70">{group.subtitle}</p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {group.items.map((item, itemIndex) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.35, ease: easeOut, delay: 0.1 * index + 0.05 * itemIndex }}
                className="rounded-md border border-white/6 bg-panel/60 px-2 py-1 font-mono text-[11px] text-slate-400"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.li>
      ))}
    </ul>
  )
}

/**
 * Architecture du homelab.
 * Le schéma vectoriel demande de la largeur : sur mobile on bascule sur la même
 * information présentée en liste, plutôt que sur un SVG illisible.
 */
export default function HomelabArchitecture() {
  return (
    <>
      <div className="hidden md:block">
        <Diagram />
      </div>
      <div className="md:hidden">
        <GroupList />
      </div>
    </>
  )
}
