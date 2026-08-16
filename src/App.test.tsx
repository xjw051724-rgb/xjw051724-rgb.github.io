import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => {
  window.history.replaceState({}, '', '/')
  window.localStorage.clear()
})

describe('source-backed portfolio home', () => {
  it('renders the revised navigation, real work history and project groups', () => {
    render(<App />)

    expect(screen.getByRole('navigation', { name: '主导航' })).toHaveTextContent('职业历程')
    expect(screen.getByRole('navigation', { name: '主导航' })).toHaveTextContent('运营方案')
    expect(screen.getByRole('navigation', { name: '主导航' })).toHaveTextContent('活动方案')
    expect(screen.getByText('广州虎牙科技')).toBeInTheDocument()
    expect(screen.getByText('盛天网络')).toBeInTheDocument()
    expect(screen.getByText('幸运坐标')).toBeInTheDocument()
    expect(screen.getByText('蒙牛低温 × 2026世界杯｜全域私域运营方案')).toBeInTheDocument()
    expect(screen.getByText('剑网3 × 陈露｜冬奥科普集卡联动')).toBeInTheDocument()
    expect(screen.getByText('随乐游｜活动模组化配置体系')).toBeInTheDocument()
    expect(screen.getByText('随乐游｜云游戏平台竞品测评报告')).toBeInTheDocument()
    expect(screen.getByText('西山居｜Code B.R.E.A.K. 概念站首曝运营')).toBeInTheDocument()
    expect(screen.getByText('随乐游｜新年乐翻天')).toBeInTheDocument()
    expect(screen.queryByText('待补充')).not.toBeInTheDocument()
  })

  it('uses the same container class for hero, career history, two project groups and contact', () => {
    render(<App />)

    const containers = screen.getAllByTestId('content-container')
    expect(containers).toHaveLength(5)
    containers.forEach((container) => expect(container).toHaveClass('portfolio-shell'))
  })

  it('uses local company marks with accessible alternatives', () => {
    render(<App />)

    expect(screen.getByAltText('广州虎牙科技标识')).toHaveAttribute('src', '/images/portfolio/huya-logo.webp')
    expect(screen.getByAltText('盛天网络标识')).toHaveAttribute('src', '/images/portfolio/shengtian-logo.png')
    expect(screen.getByAltText('幸运坐标标识')).toHaveAttribute('src', '/images/portfolio/lucky-coordinates-logo.png')
    expect(screen.getByAltText('熊家卫头像')).toHaveAttribute('src', '/images/portfolio/xiong-avatar.jpg')
  })

  it('keeps the hero focused on the name and career history', async () => {
    const { container } = render(<App />)

    expect(screen.getByRole('heading', { name: '熊家卫' })).toBeInTheDocument()
    expect(screen.getByText('5 年游戏与社交产品运营经验，以策略、内容和数据协同推进用户增长与商业化转化')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '查看作品' })).not.toBeInTheDocument()
    expect(screen.queryByText('Game Growth & Interactive Operations')).not.toBeInTheDocument()
    expect(screen.queryByText('用一次次真实业务，持续训练增长、内容与转化之间的判断。')).not.toBeInTheDocument()
    expect(await screen.findByTestId('canvas-snowfall')).toBeInTheDocument()
    expect(screen.getByTestId('hero-snow-cursor')).toBeInTheDocument()
    expect(container.querySelector('.career-history__heading')).not.toBeInTheDocument()
    expect(screen.queryByText('工作重点')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '编辑网站' })).not.toBeInTheDocument()
  })

  it('shows interaction-preview actions for projects that provide a sourced interaction draft', () => {
    render(<App />)

    expect(screen.getAllByRole('button', { name: /交互稿/ })).toHaveLength(2)
    expect(screen.getByRole('button', { name: '查看 王者向上官网｜双端高保真交互设计 交互稿' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '查看 西山居｜Code B.R.E.A.K. 概念站首曝运营 交互稿' })).toBeInTheDocument()
  })

  it('uses the full project card as a detail-page entry while keeping the interaction action separate', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByTestId('project-card-code-break-concept-site'))
    expect(screen.getByRole('heading', { name: '西山居｜Code B.R.E.A.K. 概念站首曝运营' })).toBeInTheDocument()
    expect(screen.getByText(/把首曝兴趣沉淀为可触达的种子用户/)).toBeInTheDocument()
  })

  it('lets a visitor opt into the original ambient sound', async () => {
    const user = userEvent.setup()
    render(<App />)

    const audio = screen.getByTestId('portfolio-ambient-audio') as HTMLAudioElement
    const play = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(audio, 'play', { configurable: true, value: play })

    const toggle = screen.getByRole('button', { name: '打开环境音' })
    await user.click(toggle)

    expect(audio).toHaveAttribute('src', '/assets/portfolio-ambient.mp4')
    expect(audio.loop).toBe(true)
    expect(audio.volume).toBeCloseTo(.12)
    expect(audio.playbackRate).toBeCloseTo(.8)
    expect(play).toHaveBeenCalledOnce()
    expect(screen.getByRole('button', { name: '关闭环境音' })).toBeInTheDocument()
  })

  it('opens an interaction preview independently from the detail page', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '查看 王者向上官网｜双端高保真交互设计 交互稿' }))
    expect(screen.getByRole('dialog', { name: '王者向上官网｜双端高保真交互设计交互稿' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '关闭交互稿' }))
    await waitFor(() => expect(screen.queryByRole('dialog', { name: '王者向上官网｜双端高保真交互设计交互稿' })).not.toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: '查看详情 阿里巴巴｜新春互动玩法创意方案' }))
    expect(screen.getByRole('heading', { name: '阿里巴巴｜新春互动玩法创意方案' })).toBeInTheDocument()
    expect(screen.getByText('四类互动玩法')).toBeInTheDocument()
  })

  it('opens a source-backed detail page for the JX3 activity', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '查看详情 剑网3 × 陈露｜冬奥科普集卡联动' }))

    expect(screen.getByRole('heading', { name: '剑网3 × 陈露｜冬奥科普集卡联动' })).toBeInTheDocument()
    expect(screen.getByText('15 + 1 集卡玩法')).toBeInTheDocument()
    expect(screen.getByText('156,302')).toBeInTheDocument()
  })

  it('keeps the new-year case study focused on the gameplay flow instead of a tall design-board section', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '查看详情 随乐游｜新年乐翻天' }))

    expect(screen.getByText('四层玩法，覆盖参与到转化')).toBeInTheDocument()
    expect(screen.queryByText('一张长页串起节日体验')).not.toBeInTheDocument()
    expect(screen.getByText('分享—裂变—集福合成')).toBeInTheDocument()
    expect(screen.getByText('28,600')).toBeInTheDocument()
    expect(screen.getByText('对外脱敏展示数据')).toBeInTheDocument()
  })

  it('returns a project detail view to the top of the page', async () => {
    const user = userEvent.setup()
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    render(<App />)

    await user.click(screen.getByRole('button', { name: '查看详情 剑网3 × 陈露｜冬奥科普集卡联动' }))

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
    scrollTo.mockRestore()
  })

  it('offers a scroll prompt on the first screen', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: '向下滑动，查看运营方案' })).toBeInTheDocument()
  })
})
