import { motion, useReducedMotion } from 'framer-motion'
import { viewportOnce } from '../../../lib/motion'

/**
 * Schéma animé du homelab : la passerelle alimente le switch stacké,
 * qui distribue le point d'accès Wi-Fi, les serveurs et les postes.
 * Les positions sont en coordonnées viewBox (280 × 160).
 */
const nodes = [
  { id: 'wan', label: 'WAN', x: 24, y: 80, tone: 'muted' },
  { id: 'livebox', label: 'Livebox 7', x: 84, y: 80, tone: 'accent' },
  { id: 'switch', label: 'Switch stack', x: 152, y: 80, tone: 'accent' },
  { id: 'ap', label: 'AX3000', x: 232, y: 30, tone: 'electric' },
  { id: 'lab', label: 'Homelab', x: 232, y: 80, tone: 'electric' },
  { id: 'clients', label: 'Clients', x: 232, y: 130, tone: 'muted' },
]

const links = [
  ['wan', 'livebox'],
  ['livebox', 'switch'],
  ['switch', 'ap'],
  ['switch', 'lab'],
  ['switch', 'clients'],
]

const tones = {
  accent: 'var(--color-accent)',
  electric: 'var(--color-electric)',
  muted: '#64748b',
}

const byId = Object.fromEntries(nodes.map((node) => [node.id, node]))

export default function NetworkTopology() {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 280 160"
      role="img"
      aria-label="Topologie du homelab : WAN, Livebox 7, switch stacké, point d'accès AX3000, serveurs et clients"
      className="h-auto w-full"
    >
      {/* Liaisons */}
      {links.map(([from, to], index) => {
        const a = byId[from]
        const b = byId[to]
        const midX = (a.x + b.x) / 2
        const path = `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`

        return (
          <g key={`${from}-${to}`}>
            <motion.path
              d={path}
              fill="none"
              stroke="rgba(148,163,184,0.28)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, delay: 0.15 * index, ease: 'easeInOut' }}
            />
            {!reduceMotion && (
              <motion.path
                d={path}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="6 78"
                initial={{ strokeDashoffset: 84, opacity: 0 }}
                whileInView={{ strokeDashoffset: -84, opacity: 0.9 }}
                viewport={viewportOnce}
                transition={{
                  strokeDashoffset: {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.9 + index * 0.28,
                  },
                  opacity: { duration: 0.6, delay: 0.9 + index * 0.28 },
                }}
              />
            )}
          </g>
        )
      })}

      {/* Nœuds */}
      {nodes.map((node, index) => (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
            delay: 0.1 + index * 0.09,
          }}
          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
        >
          {node.tone !== 'muted' && !reduceMotion && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="none"
              stroke={tones[node.tone]}
              strokeWidth="1"
              animate={{ r: [6, 13], opacity: [0.55, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeOut',
                delay: index * 0.4,
              }}
            />
          )}
          <circle cx={node.x} cy={node.y} r="5.5" fill="var(--color-abyss)" />
          <circle
            cx={node.x}
            cy={node.y}
            r="5.5"
            fill="none"
            stroke={tones[node.tone]}
            strokeWidth="1.4"
          />
          <circle cx={node.x} cy={node.y} r="2" fill={tones[node.tone]} />
          <text
            x={node.x}
            y={node.y + 18}
            textAnchor="middle"
            className="fill-slate-500 font-mono"
            style={{ fontSize: '7px' }}
          >
            {node.label}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}
