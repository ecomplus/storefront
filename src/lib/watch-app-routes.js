export default dataLayer => {
  const router = window.storefrontApp && window.storefrontApp.router
  if (router) {
    const addRouteToData = ({ name, params }) => {
      if (name) {
        const data = {
          name,
          event: `goto:${name}`
        }
        if (params) {
          for (const field in params) {
            if (params[field]) {
              data[field] = params[field]
            }
          }
        }
        dataLayer.push(data)
      }
    }
    if (router.currentRoute) {
      addRouteToData(router.currentRoute)
    }
    router.afterEach(addRouteToData)
  }
}
