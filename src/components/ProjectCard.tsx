import { ArrowUpRight, Eye } from 'lucide-react'
import type { PortfolioPlaceholder, PortfolioProject } from '../data/portfolio'

type ProjectCardProps = {
  item: PortfolioProject | PortfolioPlaceholder
  onOpenProject: (project: PortfolioProject) => void
  onOpenPreview: (project: PortfolioProject) => void
}

export function ProjectCard({ item, onOpenProject, onOpenPreview }: ProjectCardProps) {
  if (item.kind === 'placeholder') {
    return (
      <article className="project-card project-card--placeholder" data-testid="project-placeholder">
        <span className="project-card__number">{item.number}</span>
        <div className="project-card__placeholder-copy">
          <span className="project-card__placeholder-orbit" />
          <h3>{item.label}</h3>
          <p>{item.description}</p>
        </div>
      </article>
    )
  }

  const canPreviewInteraction = item.interactionMode === 'modal'
  const showInteractionCta = canPreviewInteraction && item.showInteractionCta
  const openProject = () => onOpenProject(item)

  return (
    <article
      aria-label={`打开 ${item.title} 详情`}
      className="project-card"
      data-testid={`project-card-${item.id}`}
      onClick={openProject}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openProject()
        }
      }}
      tabIndex={0}
    >
      <button aria-label={`打开 ${item.title}`} className="project-card__cover-button" onClick={(event) => { event.stopPropagation(); openProject() }} type="button">
        <img alt="" className="project-card__cover" decoding="async" loading="lazy" src={item.cover} />
        <span className="project-card__number">{item.number}</span>
        <span className="project-card__cover-scrim" />
      </button>
      <div className="project-card__body">
        <p className="project-card__type">{item.type}</p>
        <h3>{item.title}</h3>
        <p className="project-card__summary">{item.summary}</p>
        <div className="project-card__bottom">
          <div className="project-card__tags">
            {item.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="project-card__actions">
            {showInteractionCta ? (
              <button aria-label={`查看 ${item.title} 交互稿`} className="project-card__interaction-button" onClick={(event) => { event.stopPropagation(); onOpenPreview(item) }} type="button">
                <Eye aria-hidden="true" size={15} strokeWidth={1.8} /> 查看交互稿
              </button>
            ) : null}
            <button aria-label={`查看详情 ${item.title}`} onClick={(event) => { event.stopPropagation(); openProject() }} type="button">
                {item.ctaLabel}
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
