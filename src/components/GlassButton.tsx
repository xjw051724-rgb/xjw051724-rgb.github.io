import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { motion, type MotionProps } from 'framer-motion'

type GlassButtonProps = PropsWithChildren<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> & {
    className?: string
    variant?: 'glass' | 'primary'
  }
>

export const glassButtonClass =
  'glass-button rounded-full border border-white/20 bg-white/[0.055] px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 ease-in-out focus-visible:outline-none'

export const primaryButtonClass =
  'button-primary rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none'

export function GlassButton({ children, className = '', type = 'button', variant = 'glass', ...props }: GlassButtonProps) {
  const variantClass = variant === 'primary' ? primaryButtonClass : glassButtonClass

  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${variantClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
