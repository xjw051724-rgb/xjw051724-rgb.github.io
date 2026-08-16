import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PortfolioProject } from '../data/portfolio'

type InteractionPreviewDialogProps = {
  project: PortfolioProject | null
  onClose: () => void
}

export function InteractionPreviewDialog({ project, onClose }: InteractionPreviewDialogProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          animate={{ opacity: 1 }}
          aria-label={`${project.title}交互稿`}
          className="interaction-dialog"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div animate={{ opacity: 1, scale: 1, y: 0 }} className="interaction-dialog__panel" exit={{ opacity: 0, scale: .98, y: 10 }} initial={{ opacity: 0, scale: .98, y: 10 }}>
            <header>
              <div>
                <p>INTERACTION PREVIEW</p>
                <h2>{project.title}</h2>
              </div>
              <button aria-label="关闭交互稿" onClick={onClose} type="button"><X aria-hidden="true" size={20} /></button>
            </header>
            <div className="interaction-dialog__image-wrap">
              <img alt={`${project.title}交互稿`} src={project.interaction} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
