import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { PortfolioProject } from '../data/portfolio'

type ProjectDetailPageProps = {
  project: PortfolioProject
  onBack: () => void
}

// 高亮正文中的关键数据：约 5 万、150 万、30%、3.2 倍、第 3 名等
function highlightKeyNumbers(text: string): ReactNode[] {
  const regex = /((?:约|超|近|达|共|累计)?\s*\d+(?:\.\d+)?(?:\s*[万亿千百十]?\s*(?:万|亿|千|百|十|个|人次|人|元|天|小时|分钟|秒|%|倍|名|位|款|次|项|页|套|组))?)/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    const [fullMatch] = match
    if (match.index > lastIndex) {
      nodes.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>)
    }
    nodes.push(<strong key={match.index} className="project-detail__highlight">{fullMatch}</strong>)
    lastIndex = match.index + fullMatch.length
  }
  if (lastIndex < text.length) {
    nodes.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>)
  }
  return nodes
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
                <p>{highlightKeyNumbers(section.introduction)}</p>
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{highlightKeyNumbers(bullet)}</li>)}</ul> : null}
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
