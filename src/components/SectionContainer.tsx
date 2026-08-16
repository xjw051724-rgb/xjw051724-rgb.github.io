import type { PropsWithChildren } from 'react'

type SectionContainerProps = PropsWithChildren<{
  className?: string
  testId?: string
}>

export function SectionContainer({ children, className = '', testId }: SectionContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1700px] px-4 md:px-8 ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  )
}
