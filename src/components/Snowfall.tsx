import { useEffect, useRef, useState, type CSSProperties } from 'react'

type Snowflake = {
  delay: number
  drift: number
  glyph: string
  id: number
  opacity: number
  size: number
  speed: number
  x: number
}

const glyphs = ['❅', '❆', '✻', '✼']

const flakes: Snowflake[] = Array.from({ length: 160 }, (_, index) => ({
  id: index,
  glyph: glyphs[index % glyphs.length],
  x: (index * 37 + 11) % 101,
  size: 10 + ((index * 7) % 15),
  opacity: .42 + ((index * 13) % 39) / 100,
  speed: 11 + ((index * 11) % 14),
  delay: -((index * 2.9) % 22),
  drift: -34 + ((index * 19) % 69),
}))

const lowPowerFlakes = flakes.slice(0, 96)

export function Snowfall() {
  const snowfallRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const isLowPowerDevice = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency ?? 8) <= 4
  const activeFlakes = isLowPowerDevice ? lowPowerFlakes : flakes

  useEffect(() => {
    const element = snowfallRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry?.isIntersecting ?? true), { threshold: .01 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div aria-hidden="true" className={`snowfall${isVisible ? '' : ' snowfall--paused'}`} data-testid="snowfall" ref={snowfallRef}>
      {activeFlakes.map((flake) => (
        <span
          className="snowfall__flake"
          key={flake.id}
          style={{
            '--snow-delay': `${flake.delay}s`,
            '--snow-drift': `${flake.drift}px`,
            '--snow-opacity': flake.opacity,
            '--snow-size': `${flake.size}px`,
            '--snow-speed': `${flake.speed}s`,
            '--snow-x': `${flake.x}%`,
          } as CSSProperties}
        >
          {flake.glyph}
        </span>
      ))}
    </div>
  )
}
