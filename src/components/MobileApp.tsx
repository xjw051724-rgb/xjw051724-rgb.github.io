import { useEffect, useState } from 'react'
import type { PortfolioProject } from '../data/portfolio'
import { ProjectDetailPage } from './ProjectDetailPage'
import { ContactSection } from './ContactSection'
import { CareerHistory } from './CareerHistory'
import { usePortfolioContent } from '../content-editor/PortfolioContentProvider'

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const goMobile = (path: string) => {
  window.history.pushState({}, '', '/m' + path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function MobileApp() {
  const { content } = usePortfolioContent()
  const [pathname, setPathname] = useState(() => {
    const redirect = new URLSearchParams(window.location.search).get('p')
    if (redirect) {
      window.history.replaceState({}, '', redirect)
      return redirect
    }
    return window.location.pathname
  })

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const cleanPath = pathname.replace(/^\/m/, '') || '/'
  const detailProject = content.allProjects.find((project) => cleanPath === `/projects/${project.id}`)

  if (detailProject) {
    return (
      <div className="mobile-app">
        <ProjectDetailPage project={detailProject} onBack={() => goMobile('/')} />
      </div>
    )
  }

  return (
    <div className="mobile-app">
      <header className="mobile-topbar">
        <img className="mobile-topbar__avatar" alt="熊家卫头像" src="/images/portfolio/xiong-avatar.jpg" />
        <div className="mobile-topbar__meta">
          <span className="mobile-topbar__name">熊家卫</span>
          <span className="mobile-topbar__role">游戏活动运营</span>
        </div>
      </header>

      <section className="mobile-hero">
        <p className="mobile-hero__eyebrow">PORTFOLIO · 作品集</p>
        <h1 className="mobile-hero__title">{content.hero.title}</h1>
        <p className="mobile-hero__sub">5 年游戏与社交产品运营经验，以策略、内容和数据协同推进用户增长与商业化转化</p>
        <button className="mobile-hero__cta" onClick={() => scrollToId('projects')} type="button">查看作品 ↓</button>
      </section>

      <CareerHistory />

      <section className="mobile-projects" id="projects">
        <div className="mobile-projects__head">
          <p className="mobile-section__eyebrow">SELECTED WORKS</p>
          <h2 className="mobile-section__title">项目作品</h2>
        </div>
        {content.projectGroups.map((group) => (
          <div className="mobile-projects__group" key={group.id}>
            <p className="mobile-projects__group-title">{group.title}</p>
            {group.items.map((item) => {
              if (item.kind === 'placeholder') return null
              const project = item as PortfolioProject
              return (
                <article
                  className="mobile-card"
                  key={project.id}
                  onClick={() => goMobile(`/projects/${project.id}`)}
                >
                  <img
                    alt=""
                    className="mobile-card__cover"
                    decoding="async"
                    loading="lazy"
                    src={project.cover}
                  />
                  <div className="mobile-card__body">
                    <p className="mobile-card__type">{project.type}</p>
                    <h3 className="mobile-card__title">{project.title}</h3>
                    <p className="mobile-card__summary">{project.summary}</p>
                    <div className="mobile-card__tags">
                      {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="mobile-card__actions">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          goMobile(`/projects/${project.id}`)
                        }}
                      >
                        查看详情
                      </button>
                      {project.externalUrl ? (
                        <a
                          href={project.externalUrl}
                          onClick={(event) => event.stopPropagation()}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {project.externalLabel ?? '查看官网'}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ))}
      </section>

      <ContactSection contact={content.contact} />

      <nav className="mobile-tabbar">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} type="button">首页</button>
        <button onClick={() => scrollToId('projects')} type="button">作品</button>
        <button onClick={() => scrollToId('contact')} type="button">联系</button>
      </nav>
    </div>
  )
}
