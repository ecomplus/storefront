const { userAgent } = navigator

export const isSafari = userAgent.includes('Safari') && !userAgent.includes('Chrome')

export const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream

export const isIE = !!document.documentMode

export const isMobile = isIOS || /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

export const isScreenXs = window.screen.width <= 575.98

export const isScreenLg = window.screen.width >= 992
