import { Archive, Boxes, Compass, Mail } from 'lucide-react'

type NavBarProps = {
  onArchiveClick: () => void
  onAssetsClick: () => void
  onMethodsClick: () => void
  onContactClick: () => void
}

const items = [
  { key: 'archive', label: '活动档案', icon: Archive },
  { key: 'assets', label: '设计资产', icon: Boxes },
  { key: 'methods', label: '运营方法', icon: Compass },
  { key: 'contact', label: '联系合作', icon: Mail },
] as const

export function NavBar({ onArchiveClick, onAssetsClick, onMethodsClick, onContactClick }: NavBarProps) {
  const actions = {
    archive: onArchiveClick,
    assets: onAssetsClick,
    methods: onMethodsClick,
    contact: onContactClick,
  }

  return (
    <nav aria-label="主导航" className="archive-nav">
      <a className="archive-nav__brand" href="#top" onClick={(event) => event.preventDefault()}>
        XJW / ARCHIVE
      </a>
      <div className="archive-nav__links">
        {items.map(({ key, label, icon: Icon }) => (
          <button className="archive-nav__link" key={key} onClick={actions[key]} type="button">
            <Icon aria-hidden="true" size={15} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
