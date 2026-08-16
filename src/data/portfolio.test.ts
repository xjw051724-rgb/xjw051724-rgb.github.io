import { describe, expect, it } from 'vitest'
import { careerExperiences, getProjectFromPath, projectGroups } from './portfolio'

describe('source-backed portfolio data', () => {
  it('uses the three verified work-history records from the earlier site', () => {
    expect(careerExperiences.map((item) => item.company)).toEqual([
      '广州虎牙科技',
      '盛天网络',
      '幸运坐标',
    ])
    expect(careerExperiences[0].period).toBe('2026.05 - 至今')
    expect(careerExperiences[1].description).toContain('随乐游')
    expect(careerExperiences[2].description).toContain('让内容连接用户')
  })

  it('fills all four cards in each group with sourced projects', () => {
    expect(projectGroups).toHaveLength(2)

    projectGroups.forEach((group) => {
      expect(group.items).toHaveLength(4)
      expect(group.items.filter((item) => item.kind === 'project')).toHaveLength(4)
      expect(group.items.filter((item) => item.kind === 'placeholder')).toHaveLength(0)
    })
  })

  it('uses local, card-ready cover assets for every source-backed project', () => {
    const sourcedProjects = projectGroups.flatMap((group) => group.items).filter((item) => item.kind === 'project')

    sourcedProjects.forEach((project) => expect(project.cover).toMatch(/^\/images\/portfolio\/.+-cover-v3-optimized\.jpg$/))
  })

  it('keeps project summaries balanced for a consistent card layout', () => {
    const sourcedProjects = projectGroups.flatMap((group) => group.items).filter((item) => item.kind === 'project')

    sourcedProjects.forEach((project) => {
      expect(project.summary.length).toBeGreaterThanOrEqual(48)
      expect(project.summary.length).toBeLessThanOrEqual(78)
    })
  })

  it('keeps every project detail page complete and presentation-safe', () => {
    const sourcedProjects = projectGroups.flatMap((group) => group.items).filter((item) => item.kind === 'project')

    sourcedProjects.forEach((project) => {
      expect(project.detail).toBeDefined()
      expect(project.detail?.dataDisclosure).toBeTruthy()
      expect(project.detail?.lead.length).toBeGreaterThan(36)
      expect(project.detail?.metrics.length).toBeGreaterThanOrEqual(4)
      expect(project.detail?.sections.length).toBeGreaterThanOrEqual(3)
      expect(project.detail?.sections.every((section, index) => section.eyebrow.startsWith(`${String(index + 1).padStart(2, '0')} /`))).toBe(true)
    })

    const allVisibleCopy = JSON.stringify(sourcedProjects)
    expect(allVisibleCopy).not.toContain('月活千万')
    expect(allVisibleCopy).not.toContain('1,286,400')
  })

  it('maps detail paths to source-backed projects', () => {
    expect(getProjectFromPath('/projects/mengniu-worldcup')?.title).toContain('蒙牛低温')
    expect(getProjectFromPath('/projects/honor-value-site')?.interactionMode).toBe('modal')
    expect(getProjectFromPath('/projects/suileyou-module-system')?.detail?.metrics).toHaveLength(4)
    expect(getProjectFromPath('/projects/cloud-gaming-benchmark')?.title).toContain('竞品测评')
    expect(getProjectFromPath('/projects/suileyou-new-year-fun')?.title).toBe('随乐游｜新年乐翻天')
    expect(getProjectFromPath('/projects/code-break-concept-site')?.showInteractionCta).toBe(true)
    expect(getProjectFromPath('/projects/suileyou-new-year-fun')?.detail?.sections).toHaveLength(5)
  })
})
