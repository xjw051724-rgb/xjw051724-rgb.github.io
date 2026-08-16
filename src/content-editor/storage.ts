import { CONTENT_CONFIG_VERSION } from './content-model'
import type { ContentOverrides } from './types'

export const CONTENT_STORAGE_KEY = 'xjw-portfolio:local-content-overrides:v1'

type ExportedContentConfig = {
  version: number
  exportedAt: string
  overrides: ContentOverrides
}

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function parseImportedContentConfig(text: string): ContentOverrides {
  const parsed = JSON.parse(text) as Partial<ExportedContentConfig>

  if (parsed.version !== CONTENT_CONFIG_VERSION) throw new Error('不支持的配置版本')
  if (parsed.overrides == null || typeof parsed.overrides !== 'object' || Array.isArray(parsed.overrides)) {
    throw new Error('配置文件格式无效')
  }

  return parsed.overrides
}

export function readContentOverrides(): ContentOverrides {
  const storage = getStorage()
  const raw = storage?.getItem(CONTENT_STORAGE_KEY)
  if (!raw) return {}

  try {
    return parseImportedContentConfig(raw)
  } catch {
    return {}
  }
}

export function writeContentOverrides(overrides: ContentOverrides) {
  const storage = getStorage()
  if (!storage) return
  storage.setItem(CONTENT_STORAGE_KEY, serializeContentConfig(overrides))
}

export function clearContentOverrides() {
  getStorage()?.removeItem(CONTENT_STORAGE_KEY)
}

export function serializeContentConfig(overrides: ContentOverrides) {
  const config: ExportedContentConfig = {
    version: CONTENT_CONFIG_VERSION,
    exportedAt: new Date().toISOString(),
    overrides,
  }
  return JSON.stringify(config, null, 2)
}
