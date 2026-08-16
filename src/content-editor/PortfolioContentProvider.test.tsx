import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { PortfolioContentProvider, usePortfolioContent } from './PortfolioContentProvider'
import { CONTENT_STORAGE_KEY, readContentOverrides } from './storage'

function EditorHarness() {
  const { content, updateHero, updateProject } = usePortfolioContent()

  return (
    <>
      <input aria-label="首屏标题" onChange={(event) => updateHero({ title: event.target.value })} value={content.hero.title} />
      <button onClick={() => updateProject('alipay-nian-beast', { hidden: true })} type="button">隐藏阿里巴巴</button>
      <output data-testid="rendered-hero-title">{content.hero.title}</output>
      <output data-testid="rendered-project-count">{content.projects.length}</output>
    </>
  )
}

describe('PortfolioContentProvider', () => {
  afterEach(() => localStorage.removeItem(CONTENT_STORAGE_KEY))

  it('updates hero copy immediately and persists the sparse override', async () => {
    const user = userEvent.setup()
    render(<PortfolioContentProvider><EditorHarness /></PortfolioContentProvider>)

    await user.clear(screen.getByLabelText('首屏标题'))
    await user.type(screen.getByLabelText('首屏标题'), '我的活动作品集')

    expect(screen.getByTestId('rendered-hero-title')).toHaveTextContent('我的活动作品集')
    await user.click(screen.getByRole('button', { name: '隐藏阿里巴巴' }))
    expect(screen.getByTestId('rendered-project-count')).toHaveTextContent('7')
    await waitFor(() => expect(readContentOverrides().hero?.title).toBe('我的活动作品集'))
    await waitFor(() => expect(readContentOverrides().projects?.['alipay-nian-beast']?.hidden).toBe(true))
  })
})
