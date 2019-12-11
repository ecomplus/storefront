export default dataLayer => {
  const { storefrontApp } = window
  if (storefrontApp && storefrontApp.router) {
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
    const { currentRoute, afterEach } = storefrontApp.router
    if (currentRoute) {
      addRouteToData(currentRoute)
    }
    afterEach(addRouteToData)
  }
}
