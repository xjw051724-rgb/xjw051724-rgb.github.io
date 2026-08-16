import { useEffect, useState } from 'react'
import type { PortfolioProject } from './data/portfolio'
import { ContactSection } from './components/ContactSection'
import { HeroMouseAura } from './components/HeroMouseAura'
import { InteractionPreviewDialog } from './components/InteractionPreviewDialog'
import { PortfolioHero } from './components/PortfolioHero'
import { ProjectDetailPage } from './components/ProjectDetailPage'
import { ProjectSection } from './components/ProjectSection'
import { PortfolioContentProvider, usePortfolioContent } from './content-editor/PortfolioContentProvider'

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const navigateToProject = (project: PortfolioProject) => {
  window.history.pushState({}, '', `/projects/${project.id}`)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function PortfolioSurface() {
  const { content } = usePortfolioContent()
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [previewedProject, setPreviewedProject] = useState<PortfolioProject | null>(null)
  const detailProject = content.allProjects.find((project) => pathname === `/projects/${project.id}`)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (detailProject) window.scrollTo({ top: 0, behavior: 'auto' })
  }, [detailProject])

  if (detailProject) {
    return (
      <>
        <ProjectDetailPage
          onBack={() => {
            window.history.pushState({}, '', '/')
            window.dispatchEvent(new PopStateEvent('popstate'))
          }}
          project={detailProject}
        />
        <InteractionPreviewDialog onClose={() => setPreviewedProject(null)} project={previewedProject} />
      </>
    )
  }

  return (
    <>
      <main className="portfolio-app">
        <PortfolioHero onScrollTo={scrollToSection} title={content.hero.title} />
        {content.projectGroups.map((group) => (
          <ProjectSection group={group} key={group.id} onOpenPreview={setPreviewedProject} onOpenProject={navigateToProject} />
        ))}
        <ContactSection contact={content.contact} />
      </main>
      <HeroMouseAura />
      <InteractionPreviewDialog onClose={() => setPreviewedProject(null)} project={previewedProject} />
    </>
  )
}

export default function App() {
  return <PortfolioContentProvider><PortfolioSurface /></PortfolioContentProvider>
}
