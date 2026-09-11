import { BriefcaseBusiness, ContactRound, LayoutGrid, Sparkles } from 'lucide-react'
import { AmbientSoundToggle } from './AmbientSoundToggle'

type PortfolioNavProps = {
  onScrollTo: (id: string) => void
}

const navigationItems = [
  { id: 'career-history', label: '职业历程', Icon: BriefcaseBusiness },
  { id: 'operations', label: '运营方案', Icon: LayoutGrid },
  { id: 'activities', label: '活动方案', Icon: Sparkles },
  { id: 'contact', label: '联系合作', Icon: ContactRound },
]

export function PortfolioNav({ onScrollTo }: PortfolioNavProps) {
  return (
    <nav aria-label="主导航" className="portfolio-nav">
      <button aria-label="返回首页" className="portfolio-nav__brand" onClick={() => onScrollTo('top')} type="button">
        <img alt="熊家卫头像" src="/images/portfolio/xiong-avatar.jpg" />
        <div className="portfolio-nav__qr">
          <span className="portfolio-nav__qr-label">微信扫码</span>
          <img alt="微信二维码" src="/images/portfolio/wechat-qr.jpg" />
        </div>
      </button>
      <div className="portfolio-nav__links">
        {navigationItems.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => onScrollTo(id)} type="button">
            <Icon aria-hidden="true" size={17} strokeWidth={1.65} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <AmbientSoundToggle className="portfolio-nav__sound" />
    </nav>
  )
}
