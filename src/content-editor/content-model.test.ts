import { describe, expect, it } from 'vitest'
import { createDefaultSiteContent, mergeContentOverrides } from './content-model'

describe('local editor content model', () => {
  it('overlays changed project copy and removes hidden projects from their displayed group', () => {
    const defaults = createDefaultSiteContent()
    const content = mergeContentOverrides(defaults, {
      projects: {
        'alipay-nian-beast': { hidden: true, title: '临时标题' },
      },
    })

    expect(content.projects.find((item) => item.id === 'alipay-nian-beast')).toBeUndefined()
    expect(content.allProjects.find((item) => item.id === 'alipay-nian-beast')?.title).toBe('临时标题')
    expect(content.projectGroups[0].items.find((item) => item.id === 'alipay-nian-beast')).toBeUndefined()
  })

  it('keeps the default contact copy when only the hero title is changed', () => {
    const defaults = createDefaultSiteContent()
    const content = mergeContentOverrides(defaults, {
      hero: { title: '新的首屏标题' },
    })

    expect(content.hero.title).toBe('新的首屏标题')
    expect(content.contact.description).toBe(defaults.contact.description)
  })
})
