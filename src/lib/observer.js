export default (el, callback) => {
  const config = {
    childList: false,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  }
  const observer = new window.MutationObserver(callback)
  observer.observe(el, config)
}
