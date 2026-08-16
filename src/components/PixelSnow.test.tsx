import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PixelSnow } from './PixelSnow'

describe('PixelSnow', () => {
  it('renders a non-interactive background container', () => {
    render(<PixelSnow color="#99bdf6" density={0.16} />)

    expect(screen.getByTestId('pixel-snow')).toHaveClass('pixel-snow-container')
    expect(screen.getByTestId('pixel-snow')).toHaveAttribute('aria-hidden', 'true')
  })
})
