import { motion } from 'framer-motion'
import { CanvasSnowfall } from './CanvasSnowfall'
import { CareerHistory } from './CareerHistory'
import { PortfolioNav } from './PortfolioNav'
import { ScrollPrompt } from './ScrollPrompt'

type PortfolioHeroProps = {
  onScrollTo: (id: string) => void
  title: string
}

export function PortfolioHero({ onScrollTo, title }: PortfolioHeroProps) {
  return (
    <section className="portfolio-hero" id="top">
      <div aria-hidden="true" className="portfolio-hero__mesh" />
      <div aria-hidden="true" className="portfolio-hero__noise" />
      <CanvasSnowfall />
      <PortfolioNav onScrollTo={onScrollTo} />

      <div className="portfolio-shell portfolio-hero__content" data-testid="content-container">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.62, delay: 0.05, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="portfolio-hero__subtitle"
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: .56, delay: .16, ease: 'easeOut' }}
        >
          5 年游戏与社交产品运营经验，以策略、内容和数据协同推进用户增长与商业化转化
        </motion.p>
      </div>

      <CareerHistory />
      <ScrollPrompt onActivate={() => onScrollTo('operations')} />
    </section>
  )
}
