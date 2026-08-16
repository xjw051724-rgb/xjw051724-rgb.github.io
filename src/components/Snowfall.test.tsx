import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { CanvasSnowfall } from './CanvasSnowfall'

describe('CanvasSnowfall', () => {
  it('renders a non-interactive canvas layer', () => {
    render(<CanvasSnowfall />)

    expect(screen.getByTestId('canvas-snowfall')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByTestId('canvas-snowfall').tagName).toBe('CANVAS')
  })
})
