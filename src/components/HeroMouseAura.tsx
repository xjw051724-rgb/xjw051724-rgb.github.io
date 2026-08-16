import { useEffect, useRef } from 'react'
import { Snowflake } from 'lucide-react'

export function HeroMouseAura() {
  const auraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const aura = auraRef.current
    const finePointer = window.matchMedia?.('(pointer: fine)')
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!aura || !finePointer?.matches || reducedMotion?.matches) return

    let animationFrame = 0
    let x = -480
    let y = -480
    const paint = () => {
      aura.style.transform = `translate3d(${x - 19}px, ${y - 19}px, 0)`
      animationFrame = 0
    }
    const move = (event: PointerEvent) => {
      aura.classList.remove('is-idle')
      x = event.clientX
      y = event.clientY
      if (!animationFrame) animationFrame = window.requestAnimationFrame(paint)
    }
    const leave = () => aura.classList.add('is-idle')

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('blur', leave)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('blur', leave)
    }
  }, [])

  return (
    <div aria-hidden="true" className="hero-mouse-aura is-idle" data-testid="hero-snow-cursor" ref={auraRef}>
      <Snowflake size={16} strokeWidth={1.8} />
    </div>
  )
}
