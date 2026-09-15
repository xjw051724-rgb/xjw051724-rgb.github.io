import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { resolveDeviceRedirect } from './utils/device'
import './styles/index.css'
import './styles/mobile.css'

const search = window.location.search
const params = new URLSearchParams(search)
const effectivePath = params.get('p') ?? window.location.pathname
const redirect = resolveDeviceRedirect(effectivePath, search)

if (redirect) {
  window.location.replace(redirect)
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
