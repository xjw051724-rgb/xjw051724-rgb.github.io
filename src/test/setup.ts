import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class TestIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly thresholds: ReadonlyArray<number> = []

  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  unobserve() {}
}

Object.defineProperty(globalThis, 'IntersectionObserver', {
  configurable: true,
  value: TestIntersectionObserver,
})

Object.defineProperty(window, 'scrollTo', {
  configurable: true,
  value: () => undefined,
})

const canvasContext = {
  clearRect: vi.fn(),
  fillText: vi.fn(),
  setTransform: vi.fn(),
}

Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  configurable: true,
  value: vi.fn(() => canvasContext),
})
