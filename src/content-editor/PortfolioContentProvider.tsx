import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { createDefaultSiteContent, mergeContentOverrides } from './content-model'
import { clearContentOverrides, readContentOverrides, serializeContentConfig, writeContentOverrides } from './storage'
import type { ContactContent, ContentOverrides, EditableSiteContent, HeroContent, ProjectOverride } from './types'

type SaveState = 'saved' | 'saving'

type PortfolioContentContextValue = {
  content: EditableSiteContent
  overrides: ContentOverrides
  saveState: SaveState
  updateHero: (patch: Partial<HeroContent>) => void
  updateContact: (patch: Partial<ContactContent>) => void
  updateProject: (id: string, patch: ProjectOverride) => void
  resetProject: (id: string) => void
  resetAll: () => void
  importOverrides: (overrides: ContentOverrides) => void
  exportOverrides: () => string
}

const PortfolioContentContext = createContext<PortfolioContentContextValue | null>(null)

function removeRecordEntry<T>(record: Record<string, T> | undefined, id: string) {
  if (!record?.[id]) return record
  const { [id]: _, ...remaining } = record
  return Object.keys(remaining).length > 0 ? remaining : undefined
}

export function PortfolioContentProvider({ children }: PropsWithChildren) {
  const defaults = useMemo(createDefaultSiteContent, [])
  const [overrides, setOverrides] = useState<ContentOverrides>(readContentOverrides)
  const [saveState, setSaveState] = useState<SaveState>('saved')

  const content = useMemo(() => mergeContentOverrides(defaults, overrides), [defaults, overrides])

  useEffect(() => {
    setSaveState('saving')
    const timeout = window.setTimeout(() => {
      writeContentOverrides(overrides)
      setSaveState('saved')
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [overrides])

  const updateHero = useCallback((patch: Partial<HeroContent>) => {
    setOverrides((current) => ({ ...current, hero: { ...current.hero, ...patch } }))
  }, [])

  const updateContact = useCallback((patch: Partial<ContactContent>) => {
    setOverrides((current) => ({ ...current, contact: { ...current.contact, ...patch } }))
  }, [])

  const updateProject = useCallback((id: string, patch: ProjectOverride) => {
    setOverrides((current) => ({
      ...current,
      projects: { ...current.projects, [id]: { ...current.projects?.[id], ...patch } },
    }))
  }, [])

  const resetProject = useCallback((id: string) => {
    setOverrides((current) => ({ ...current, projects: removeRecordEntry(current.projects, id) }))
  }, [])

  const resetAll = useCallback(() => {
    clearContentOverrides()
    setOverrides({})
  }, [])

  const importOverrides = useCallback((imported: ContentOverrides) => {
    setOverrides(imported)
  }, [])

  const exportOverrides = useCallback(() => serializeContentConfig(overrides), [overrides])

  const value = useMemo<PortfolioContentContextValue>(() => ({
    content,
    overrides,
    saveState,
    updateHero,
    updateContact,
    updateProject,
    resetProject,
    resetAll,
    importOverrides,
    exportOverrides,
  }), [content, exportOverrides, importOverrides, overrides, resetAll, resetProject, saveState, updateProject, updateContact, updateHero])

  return <PortfolioContentContext.Provider value={value}>{children}</PortfolioContentContext.Provider>
}

export function usePortfolioContent() {
  const context = useContext(PortfolioContentContext)
  if (!context) throw new Error('usePortfolioContent 必须在 PortfolioContentProvider 内使用')
  return context
}
