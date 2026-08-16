import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import type { PortfolioProject } from '../data/portfolio'

type ProjectDetailPageProps = {
  project: PortfolioProject
  onBack: () => void
}

export function ProjectDetailPage({ project, onBack }: ProjectDetailPageProps) {
  const detail = project.detail

  if (!detail) return null

  return (
    <main className="project-detail">
      <div className="portfolio-shell project-detail__shell">
        <button className="project-detail__back" onClick={onBack} type="button"><ArrowLeft aria-hidden="true" size={17} /> 返回作品集</button>
        <section className="project-detail__intro">
          <div>
            <p>{project.type}</p>
            <h1>{project.title}</h1>
            <span>{detail.lead}</span>
          </div>
          <figure>
            <img alt={`${project.title}封面`} decoding="async" fetchPriority="high" src={project.cover} />
          </figure>
        </section>

        <section className="project-detail__metrics-wrap" aria-label="项目核心指标">
          <p className="project-detail__data-disclosure">{detail.dataDisclosure ?? '对外脱敏展示数据'}</p>
          <div className="project-detail__metrics">
            {detail.metrics.map((metric) => (
              <article key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong>{metric.note ? <small>{metric.note}</small> : null}</article>
            ))}
          </div>
        </section>

        <section className="project-detail__sections" aria-label="项目方案内容">
          {detail.sections.map((section, index) => (
            <motion.article animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} key={section.title} transition={{ duration: .4, delay: index * .04 }}>
              <header><span>{section.eyebrow}</span><h2>{section.title}</h2></header>
              <div className="project-detail__section-content">
                <p>{section.introduction}</p>
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                {section.metrics ? (
                  <div className="project-detail__section-metrics">
                    {section.metrics.map((metric) => <div key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}
                  </div>
                ) : null}
                {section.image ? <img alt={section.imageAlt ?? ''} decoding="async" loading="lazy" src={section.image} /> : null}
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  )
}
