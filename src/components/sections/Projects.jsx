import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/site'

/**
 * Grille de 6 colonnes. La largeur de chaque carte vient du champ `span`
 * de src/data/site.js : 6 pour pleine largeur, 3 pour une moitié, 2 pour un tiers.
 */
const spans = {
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  6: 'lg:col-span-6',
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="02"
        eyebrow="Projets"
        title="Ce que je construis quand la caméra est éteinte"
        description="Des outils publics, une infra maison, et de la place pour la suite."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            className={spans[project.span] ?? spans[3]}
          />
        ))}
      </div>
    </Section>
  )
}
