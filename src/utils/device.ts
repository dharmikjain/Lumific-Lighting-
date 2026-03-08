/**
 * Event and interaction utilities
 */

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return (
    (typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        (navigator as any).maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0)) ||
    false
  )
}

export const getDevicePixelRatio = (): number => {
  if (typeof window === 'undefined') return 1
  return window.devicePixelRatio || 1
}

export const getViewportSize = (): { width: number; height: number } => {
  if (typeof window === 'undefined') {
    return { width: 1024, height: 768 }
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export const requestAnimationFramePolyfill = (
  callback: (time: number) => void
): number => {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback)
  }
  return setTimeout(callback, 16) as unknown as number
}

export const cancelAnimationFramePolyfill = (id: number): void => {
  if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
    window.cancelAnimationFrame(id)
  } else {
    clearTimeout(id)
  }
}
