export default dataLayer => {
  const { storefrontApp } = window
  if (storefrontApp && storefrontApp.router) {
    storefrontApp.router.afterEach(({ name, params }) => {
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
    })
  }
}
