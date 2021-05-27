export default (resource, field) => new Promise(resolve => {
  const storefront = typeof window === 'object' && window.storefront
  if (storefront) {
    const getStorefrontInfo = () => {
      let data = storefront.info && storefront.info[resource]
      if (data) {
        if (field) {
          data = data[field]
        }
        if (data && Object.keys(data).length) {
          resolve(data)
          return true
        }
      }
      return false
    }
    if (!getStorefrontInfo()) {
      storefront.on(`info:${resource}`, getStorefrontInfo)
    }
  }
})
