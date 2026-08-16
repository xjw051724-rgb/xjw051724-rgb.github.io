import { useEffect, useRef } from 'react'

function HeroMouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const pointerQuery = window.matchMedia?.('(pointer: fine)')
    const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)')

    if (!glow || !pointerQuery?.matches || reducedMotionQuery?.matches) return

    let frame = 0
    let hideTimer = 0
    let latestPosition = { x: 0, y: 0 }

    const applyPosition = () => {
      glow.style.setProperty('--hero-pointer-x', `${latestPosition.x}px`)
      glow.style.setProperty('--hero-pointer-y', `${latestPosition.y}px`)
      glow.classList.add('is-active')
      frame = 0
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = glow.parentElement?.getBoundingClientRect()
      if (!bounds) return

      latestPosition = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      if (!frame) frame = window.requestAnimationFrame(applyPosition)
      window.clearTimeout(hideTimer)
      hideTimer = window.setTimeout(() => glow.classList.remove('is-active'), 900)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.clearTimeout(hideTimer)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return <div aria-hidden="true" className="hero-mouse-glow pointer-events-none" data-testid="hero-mouse-glow" ref={glowRef} />
}

export function HeroAtmosphere() {
  return (
    <>
      <div aria-hidden="true" className="hero-streams pointer-events-none" data-testid="hero-streams">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="-12" x2="82" y1="12" y2="8" />
          <line x1="-8" x2="92" y1="31" y2="36" />
          <line x1="5" x2="105" y1="63" y2="57" />
          <line x1="-5" x2="76" y1="84" y2="91" />
        </svg>
      </div>

      <div aria-hidden="true" className="hero-shapes pointer-events-none" data-testid="hero-shapes">
        <svg className="hero-shape hero-shape--hex" viewBox="0 0 100 100" fill="none">
          <path d="m50 5 39 22v46L50 95 11 73V27L50 5Z" />
          <path d="m50 20 26 15v30L50 80 24 65V35l26-15Z" opacity="0.48" />
        </svg>
        <svg className="hero-shape hero-shape--ring" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="92" />
          <circle cx="100" cy="100" r="66" opacity="0.48" />
          <circle cx="100" cy="100" r="40" opacity="0.25" />
        </svg>
        <svg className="hero-shape hero-shape--triangle" viewBox="0 0 100 100" fill="none">
          <path d="m50 10 42 74H8L50 10Z" />
          <circle cx="50" cy="62" r="3" fill="currentColor" stroke="none" opacity="0.68" />
        </svg>
        <svg className="hero-shape hero-shape--grid" viewBox="0 0 140 100" fill="none">
          <path d="M0 20h140M0 40h140M0 60h140M0 80h140M20 0v100M50 0v100M80 0v100M110 0v100" />
        </svg>
      </div>

      <HeroMouseGlow />
    </>
  )
}
