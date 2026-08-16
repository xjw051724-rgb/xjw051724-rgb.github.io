import { Check, Copy, Download, Mail, Phone } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { ContactContent } from '../content-editor/types'

export function ContactSection({ contact }: { contact: ContactContent }) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null)
  const subtitle = contact.description.replace(/[。！？]+$/u, '')
  const contactItems = [
    { icon: Mail, label: '邮箱', value: contact.email },
    { icon: Phone, label: '电话', value: contact.phone },
  ]

  const copyContact = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedValue(value)
      window.setTimeout(() => setCopiedValue(null), 1800)
    } catch {
      setCopiedValue(null)
    }
  }

  return (
    <section className="portfolio-contact" id="contact">
      <div className="portfolio-shell portfolio-contact__shell" data-testid="content-container">
        <div className="portfolio-contact__copy">
          <p>CONTACT / COLLABORATION</p>
          <h2>{contact.heading}</h2>
          <span>{subtitle}</span>
        </div>
        <div className="portfolio-contact__panel">
          <div className="portfolio-contact__wechat">
            <img alt="熊家卫微信二维码" className="portfolio-contact__qr" src="/images/portfolio/wechat-qr.jpg" />
          </div>
          <div className="portfolio-contact__info">
            <div className="portfolio-contact__wechat-copy"><strong>微信联系</strong><span>扫码添加微信，方便沟通项目合作</span></div>
            <div className="portfolio-contact__items">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <button aria-label={`复制${label}`} key={label} onClick={() => void copyContact(value)} type="button">
                  <Icon aria-hidden="true" size={17} strokeWidth={1.7} />
                  <span><small>{label}</small><strong>{value}</strong></span>
                  {copiedValue === value ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={15} />}
                </button>
              ))}
            </div>
            <a className="portfolio-contact__download" download="熊家卫-游戏活动运营-1862771698.pdf" href="./resume.pdf">
              <Download aria-hidden="true" size={16} strokeWidth={1.7} /> 下载简历
            </a>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {copiedValue ? <motion.div animate={{ opacity: 1, y: 0 }} className="portfolio-toast" exit={{ opacity: 0, y: 8 }} initial={{ opacity: 0, y: 8 }} role="status">复制成功</motion.div> : null}
      </AnimatePresence>
    </section>
  )
}
