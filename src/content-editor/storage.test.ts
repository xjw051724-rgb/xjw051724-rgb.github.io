import { afterEach, describe, expect, it } from 'vitest'
import { CONTENT_STORAGE_KEY, parseImportedContentConfig, readContentOverrides, serializeContentConfig } from './storage'

describe('local editor storage', () => {
  afterEach(() => localStorage.clear())

  it('returns empty overrides when saved JSON is malformed', () => {
    localStorage.setItem(CONTENT_STORAGE_KEY, '{bad json')
    expect(readContentOverrides()).toEqual({})
  })

  it('round-trips a versioned exported configuration', () => {
    const exported = serializeContentConfig({ hero: { title: '本地草稿' } })
    expect(parseImportedContentConfig(exported)).toEqual({ hero: { title: '本地草稿' } })
  })

  it('rejects a configuration with an unsupported version', () => {
    expect(() => parseImportedContentConfig(JSON.stringify({ version: 999, overrides: {} }))).toThrow('不支持的配置版本')
  })
})
