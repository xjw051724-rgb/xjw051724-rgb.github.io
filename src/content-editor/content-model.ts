import { projectGroups } from '../data/portfolio'
import type { PortfolioPlaceholder, PortfolioProject, ProjectGroup } from '../data/portfolio'
import type { ContentOverrides, EditablePortfolioProject, EditableSiteContent } from './types'

export const CONTENT_CONFIG_VERSION = 2

const defaultHero = { title: '熊家卫' }

const defaultContact = {
  heading: '让增长有路径 让创意能落地',
  description: '围绕游戏联运、节点活动、互动机制与用户转化，沟通可执行、可验证的运营方案',
  email: '1539924986@qq.com',
  phone: '18627716986',
}

const cloneProject = (project: EditablePortfolioProject): EditablePortfolioProject => ({
  ...project,
  tags: [...project.tags],
  detail: project.detail ? {
    ...project.detail,
    metrics: project.detail.metrics.map((metric) => ({ ...metric })),
    sections: project.detail.sections.map((section) => ({
      ...section,
      bullets: section.bullets ? [...section.bullets] : undefined,
      metrics: section.metrics?.map((metric) => ({ ...metric })),
    })),
  } : undefined,
})

function isPortfolioProject(item: PortfolioProject | PortfolioPlaceholder): item is PortfolioProject {
  return item.kind === 'project'
}

export function createDefaultSiteContent(): EditableSiteContent {
  const allProjects = projectGroups.flatMap((group) => group.items.filter(isPortfolioProject).map((item) => cloneProject(item)))

  return {
    hero: { ...defaultHero },
    contact: { ...defaultContact },
    allProjects,
    projects: allProjects,
    projectGroups: projectGroups.map((group) => ({ ...group, items: [...group.items] })),
  }
}

export function mergeContentOverrides(defaults: EditableSiteContent, overrides: ContentOverrides): EditableSiteContent {
  const allProjects = defaults.allProjects.map((project) => ({ ...cloneProject(project), ...overrides.projects?.[project.id] }))
  const projects = allProjects.filter((project) => !project.hidden)
  const projectsById = new Map(projects.map((project) => [project.id, project]))
  const mergedGroups: ProjectGroup[] = defaults.projectGroups.map((group) => ({
    ...group,
    items: group.items.flatMap((item): Array<PortfolioProject | PortfolioPlaceholder> => {
      if (item.kind === 'placeholder') return [item]
      const project = projectsById.get(item.id)
      return project ? [project] : []
    }),
  }))

  return {
    hero: { ...defaults.hero, ...overrides.hero },
    contact: { ...defaults.contact, ...overrides.contact },
    allProjects,
    projects,
    projectGroups: mergedGroups,
  }
}
