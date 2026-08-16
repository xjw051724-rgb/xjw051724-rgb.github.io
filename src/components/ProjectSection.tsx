import type { PortfolioProject, ProjectGroup } from '../data/portfolio'
import { ProjectCard } from './ProjectCard'

type ProjectSectionProps = {
  group: ProjectGroup
  onOpenProject: (project: PortfolioProject) => void
  onOpenPreview: (project: PortfolioProject) => void
}

export function ProjectSection({ group, onOpenProject, onOpenPreview }: ProjectSectionProps) {
  const subtitle = group.description.replace(/[。！？]+$/u, '')

  return (
    <section className="project-section" id={group.id}>
      <div className="portfolio-shell" data-testid="content-container">
        <header className="project-section__heading">
          <div>
            <p>{group.id === 'operations' ? 'OPERATIONS STRATEGY' : 'INTERACTIVE CAMPAIGNS'}</p>
            <h2>{group.title}</h2>
          </div>
          <span>{subtitle}</span>
        </header>
        <div className="project-section__grid">
          {group.items.map((item) => (
            <ProjectCard item={item} key={item.id} onOpenPreview={onOpenPreview} onOpenProject={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  )
}
