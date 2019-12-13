const isCheckout = window.location.pathname.startsWith('/app/')
const isMobile = window.screen.width < 768

export default pkg => {
  const widget = window._widgets[pkg]
  if (widget) {
    const { active, started, options, desktopOnly, enableCheckout, disablePages } = widget
    if (
      active && !started &&
      (!desktopOnly || !isMobile) &&
      (isCheckout ? enableCheckout : !disablePages)
    ) {
      return options || {}
    }
  }
  return false
}
