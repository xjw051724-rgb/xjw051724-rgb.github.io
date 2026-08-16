import type { PortfolioProject, ProjectGroup } from '../data/portfolio'

export type HeroContent = {
  title: string
}

export type ContactContent = {
  heading: string
  description: string
  email: string
  phone: string
}

export type EditablePortfolioProject = PortfolioProject & {
  hidden?: boolean
}

export type ProjectOverride = Partial<Pick<EditablePortfolioProject, 'hidden' | 'type' | 'title' | 'summary' | 'tags'>>

export type ContentOverrides = {
  hero?: Partial<HeroContent>
  contact?: Partial<ContactContent>
  projects?: Record<string, ProjectOverride>
}

export type EditableSiteContent = {
  hero: HeroContent
  contact: ContactContent
  allProjects: EditablePortfolioProject[]
  projects: EditablePortfolioProject[]
  projectGroups: ProjectGroup[]
}
