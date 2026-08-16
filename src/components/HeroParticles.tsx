import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

const PARTICLE_COUNT = 14
const CONNECTION_DISTANCE = 118
const POINTER_RADIUS = 120

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const pointerQuery = window.matchMedia?.('(pointer: fine)')
    const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')

    if (!canvas || !pointerQuery?.matches || reducedMotionQuery?.matches) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    let animationFrame = 0
    let width = 0
    let height = 0
    let lastPointerMove = 0
    let pointer = { x: -1000, y: -1000 }
    let particles: Particle[] = []

    const createParticles = () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        x: ((index * 83) % Math.max(width, 1)) + 0.5,
        y: ((index * 137) % Math.max(height, 1)) + 0.5,
        vx: ((index % 3) - 1) * 0.1,
        vy: (((index + 1) % 3) - 1) * 0.1,
        size: 0.9 + (index % 4) * 0.22,
      }))

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)

      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * pixelRatio))
      canvas.height = Math.max(1, Math.round(height * pixelRatio))
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      particles = createParticles()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.hypot(dx, dy)

        if (distance > 0 && distance < POINTER_RADIUS) {
          const force = (1 - distance / POINTER_RADIUS) * 0.7
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.986
        particle.vy *= 0.986

        if (particle.x < -8 || particle.x > width + 8) particle.vx *= -1
        if (particle.y < -8 || particle.y > height + 8) particle.vy *= -1

        particle.x = Math.max(0, Math.min(width, particle.x))
        particle.y = Math.max(0, Math.min(height, particle.y))
      }

      for (let first = 0; first < particles.length; first += 1) {
        const source = particles[first]

        for (let second = first + 1; second < particles.length; second += 1) {
          const target = particles[second]
          const distance = Math.hypot(source.x - target.x, source.y - target.y)
          if (distance >= CONNECTION_DISTANCE) continue

          context.beginPath()
          context.moveTo(source.x, source.y)
          context.lineTo(target.x, target.y)
          context.strokeStyle = `rgba(49, 120, 230, ${0.12 * (1 - distance / CONNECTION_DISTANCE)})`
          context.lineWidth = 0.5
          context.stroke()
        }
      }

      for (const particle of particles) {
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = 'rgba(49, 120, 230, 0.45)'
        context.fill()
      }
    }

    const animate = (timestamp: number) => {
      draw()

      if (timestamp - lastPointerMove < 700) {
        animationFrame = window.requestAnimationFrame(animate)
      } else {
        animationFrame = 0
        context.clearRect(0, 0, width, height)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      lastPointerMove = window.performance.now()

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return <canvas aria-hidden="true" className="hero-particles pointer-events-none" data-testid="hero-particles" ref={canvasRef} />
}
