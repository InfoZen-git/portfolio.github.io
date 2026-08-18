import Section from '../ui/Section'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/site'

/**
 * Grille de 6 colonnes : les projets mis en avant occupent une demi-largeur,
 * les autres un tiers. Ajouter un projet dans src/data/site.js suffit.
 */
function spanFor(project) {
  return project.featured ? 'lg:col-span-3' : 'lg:col-span-2'
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
            className={spanFor(project)}
          />
        ))}
      </div>
    </Section>
  )
}
