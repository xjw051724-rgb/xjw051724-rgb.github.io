import { useEffect, useRef } from 'react'

export function HeroPointer() {
  const pointerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pointer = pointerRef.current
    const hero = pointer?.closest<HTMLElement>('.portfolio-hero')
    const finePointer = window.matchMedia?.('(pointer: fine)')
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')

    if (!pointer || !hero || !finePointer?.matches || reducedMotion?.matches) return

    let frame = 0
    let latestX = -120
    let latestY = -120

    const paint = () => {
      pointer.style.transform = `translate3d(${latestX}px, ${latestY}px, 0)`
      hero.style.setProperty('--pointer-x', `${latestX}px`)
      hero.style.setProperty('--pointer-y', `${latestY}px`)
      frame = 0
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect()
      latestX = event.clientX - bounds.left
      latestY = event.clientY - bounds.top
      if (!frame) frame = window.requestAnimationFrame(paint)
    }

    const hide = () => pointer.classList.add('is-hidden')
    const show = () => pointer.classList.remove('is-hidden')

    hero.addEventListener('pointermove', handlePointerMove, { passive: true })
    hero.addEventListener('pointerleave', hide)
    hero.addEventListener('pointerenter', show)

    return () => {
      window.cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', handlePointerMove)
      hero.removeEventListener('pointerleave', hide)
      hero.removeEventListener('pointerenter', show)
    }
  }, [])

  return (
    <div aria-hidden="true" className="hero-pointer is-hidden" data-testid="hero-pointer" ref={pointerRef}>
      <span />
    </div>
  )
}
