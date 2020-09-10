import watchAppRoutes from '@ecomplus/widget-tag-manager/src/lib/watch-app-routes'

const { location, $ } = window

export default (gtag, gaTrackingId) => {
  const emitPageView = () => setTimeout(() => {
    gtag('event', 'page_view', {
      page_title: document.title || 'Checkout',
      page_path: `/${location.hash.split('/')[1]}`,
      send_to: gaTrackingId
    })
  }, 300)

  watchAppRoutes({
    push: ({ event, ecommerce }) => {
      let data
      switch (event) {
        case 'eec.checkout':
        case 'eec.checkout_option':
          data = ecommerce && ecommerce.checkout
          if (data) {
            gtag('event', 'begin_checkout', {
              items: data.products
            })
          }
          gtag('event', 'set_checkout_option', {
            checkout_step: location.hash.startsWith('#/cart') ? 1 : 2
          })
          break

        case 'eec.purchase':
          emitPageView()
          data = ecommerce && ecommerce.purchase
          if (data && data.actionField) {
            gtag('event', 'purchase', {
              transaction_id: data.actionField.id,
              affiliation: $('meta[name="author"]').attr('content') || 'Shop',
              value: Number(data.actionField.revenue),
              currency: ecommerce.currencyCode,
              tax: data.actionField.tax ? Number(data.actionField.tax) : 0,
              shipping: data.actionField.shipping ? Number(data.actionField.shipping) : 0,
              items: data.products
            })
          }
          break

        default:
          emitPageView()
      }
    }
  })
}
