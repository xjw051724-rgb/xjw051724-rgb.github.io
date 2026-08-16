import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CanvasSnowfall } from './CanvasSnowfall'

describe('CanvasSnowfall', () => {
  it('renders one non-interactive canvas instead of a DOM list of snowflakes', () => {
    render(<CanvasSnowfall />)

    const snowfall = screen.getByTestId('canvas-snowfall')
    expect(snowfall).toHaveAttribute('aria-hidden', 'true')
    expect(snowfall.tagName).toBe('CANVAS')
    expect(document.querySelectorAll('.snowfall__flake')).toHaveLength(0)
  })
})
