import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ScrollPrompt } from './ScrollPrompt'

describe('ScrollPrompt', () => {
  it('offers an accessible control that forwards the scroll action', () => {
    const onActivate = vi.fn()
    render(<ScrollPrompt onActivate={onActivate} />)

    fireEvent.click(screen.getByRole('button', { name: '向下滑动，查看运营方案' }))

    expect(onActivate).toHaveBeenCalledOnce()
  })
})
