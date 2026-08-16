import { useEffect, useMemo, useState } from 'react'

type CountUpValueProps = {
  value: string
  className?: string
}

const numberPattern = /^(-?\d+(?:\.\d+)?)(.*)$/

const formatNumber = (value: number, precision: number) =>
  new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  }).format(value)

export function CountUpValue({ value, className }: CountUpValueProps) {
  const parsedValue = useMemo(() => value.match(numberPattern), [value])
  const target = parsedValue ? Number(parsedValue[1]) : null
  const suffix = parsedValue?.[2] ?? ''
  const precision = parsedValue?.[1].split('.')[1]?.length ?? 0
  const [displayValue, setDisplayValue] = useState(() => (target === null ? value : '0'))

  useEffect(() => {
    if (target === null) {
      setDisplayValue(value)
      return
    }

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reducedMotion) {
      setDisplayValue(`${formatNumber(target, precision)}${suffix}`)
      return
    }

    let frameId = 0
    const startedAt = performance.now()
    const duration = 620

    setDisplayValue(`0${suffix}`)

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplayValue(`${formatNumber(target * eased, precision)}${suffix}`)

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [precision, suffix, target, value])

  return (
    <span className={className} data-testid="count-up-value">
      {displayValue}
    </span>
  )
}
