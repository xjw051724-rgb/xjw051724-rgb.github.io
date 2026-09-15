const MOBILE_UA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Windows Phone/i

export function isMobile(search: string = typeof window !== 'undefined' ? window.location.search : ''): boolean {
  const params = new URLSearchParams(search)
  if (params.get('desktop') === '1') return false
  if (params.get('m') === '1') return true
  if (typeof navigator === 'undefined') return false
  return MOBILE_UA.test(navigator.userAgent || '')
}

// Returns the path the user should be redirected to based on device, or null if already correct.
// Mobile users land under /m; desktop users stay on the root routes.
export function resolveDeviceRedirect(
  pathname: string,
  search: string = typeof window !== 'undefined' ? window.location.search : '',
): string | null {
  const params = new URLSearchParams(search)
  if (params.has('desktop') || params.has('m')) return null
  const mobile = isMobile(search)
  const onMobileRoute = pathname.startsWith('/m')
  if (mobile && !onMobileRoute) {
    return '/m' + (pathname === '/' ? '' : pathname)
  }
  if (!mobile && onMobileRoute) {
    const desktop = pathname.replace(/^\/m/, '')
    return desktop === '' ? '/' : desktop
  }
  return null
}
