import { useEffect, useRef } from 'react'

type CanvasFlake = {
  drift: number
  opacity: number
  phase: number
  size: number
  speed: number
  x: number
  y: number
}

const snowGlyphs = ['❅', '❆', '✻', '✼']
const fullSnowCount = 420
const reducedSnowCount = 220

const createFlakes = (count: number, width: number, height: number): CanvasFlake[] => (
  Array.from({ length: count }, (_, index) => ({
    drift: 8 + ((index * 17) % 25),
    opacity: .36 + ((index * 11) % 40) / 100,
    phase: (index * 1.71) % (Math.PI * 2),
    size: 10 + ((index * 7) % 16),
    speed: 14 + ((index * 13) % 29),
    x: ((index * 61) % Math.max(width, 1)) + 1,
    y: ((index * 83) % Math.max(height, 1)) - height,
  }))
)

export function CanvasSnowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const cores = navigator.hardwareConcurrency ?? 8
    const flakeCount = reducedMotion || cores <= 4 ? reducedSnowCount : fullSnowCount
    let isVisible = true
    let frame = 0
    let lastTime = 0
    let width = 1
    let height = 1
    let flakes: CanvasFlake[] = []

    canvas.dataset.state = reducedMotion ? 'reduced' : 'running'

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = Math.max(1, Math.round(bounds.width))
      height = Math.max(1, Math.round(bounds.height))
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      flakes = createFlakes(flakeCount, width, height)
    }

    const schedule = () => {
      if (!frame && isVisible && !reducedMotion) frame = window.requestAnimationFrame(draw)
    }

    const draw = (time: number) => {
      frame = 0
      if (!isVisible || reducedMotion) return

      const delta = Math.min((time - lastTime) / 1000 || .016, .05)
      lastTime = time
      context.clearRect(0, 0, width, height)
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      flakes.forEach((flake, index) => {
        flake.y += flake.speed * delta
        flake.x += Math.sin(time / 1500 + flake.phase) * flake.drift * delta
        if (flake.y > height + flake.size) {
          flake.y = -flake.size - ((index * 23) % Math.max(height * .4, 1))
          flake.x = (index * 71 + time / 16) % width
        }
        if (flake.x < -flake.size) flake.x = width + flake.size
        if (flake.x > width + flake.size) flake.x = -flake.size

        context.globalAlpha = flake.opacity
        context.fillStyle = '#ffffff'
        context.font = `${flake.size}px Georgia, serif`
        context.fillText(snowGlyphs[index % snowGlyphs.length], flake.x, flake.y)
      })

      context.globalAlpha = 1
      schedule()
    }

    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
        isVisible = entry?.isIntersecting ?? true
        canvas.dataset.state = isVisible ? 'running' : 'paused'
        if (isVisible) {
          lastTime = performance.now()
          schedule()
        }
      }, { threshold: .01 })

    resize()
    observer?.observe(canvas)
    window.addEventListener('resize', resize, { passive: true })
    schedule()

    return () => {
      observer?.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas aria-hidden="true" className="canvas-snowfall" data-testid="canvas-snowfall" ref={canvasRef} />
}
