export default (resource, field) => new Promise(resolve => {
  const storefront = typeof window === 'object' && window.storefront
  if (storefront) {
    const getStorefrontInfo = () => {
      const info = storefront.info && storefront.info[resource]
      if (info && info[field] && Object.keys(info[field]).length) {
        resolve(info[field])
        return true
      }
      return false
    }
    if (!getStorefrontInfo()) {
      storefront.on(`info:${resource}`, getStorefrontInfo)
    }
  }
})
