import { ChevronDown, Mouse } from 'lucide-react'

type ScrollPromptProps = {
  onActivate: () => void
}

export function ScrollPrompt({ onActivate }: ScrollPromptProps) {
  return (
    <button aria-label="向下滑动，查看运营方案" className="scroll-prompt" onClick={onActivate} type="button">
      <Mouse aria-hidden="true" size={15} strokeWidth={1.8} />
      <span>向下滑动</span>
      <ChevronDown aria-hidden="true" size={15} strokeWidth={2} />
    </button>
  )
}
