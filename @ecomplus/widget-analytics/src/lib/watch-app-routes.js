import watchAppRoutes from '@ecomplus/widget-tag-manager/src/lib/watch-app-routes'
import { parseUaProduct } from './common'

const { location } = window

export default (gtag, gaTrackingId, googleAdsId) => {
  const emitPageView = () => setTimeout(() => {
    gtag('event', 'page_view', {
      page_title: document.title || 'Checkout',
      page_path: `/${location.hash.split('/')[1]}`,
      send_to: gaTrackingId
    })
  }, 300)

  let isCheckoutSent = false
  watchAppRoutes({
    push: ({ event, ecommerce }) => {
      if (!event) {
        return
      }
      let data, step
      switch (event) {
        case 'eec.checkout':
        case 'eec.checkout_option':
          data = ecommerce && ecommerce.checkout
          if (data) {
            if (!isCheckoutSent) {
              gtag('event', 'begin_checkout', {
                items: data.products.map(parseUaProduct)
              })
              isCheckoutSent = true
            }
            step = data.actionField && data.actionField.step
          }
          gtag('event', 'set_checkout_option', {
            checkout_step: step || (location.hash.startsWith('#/cart') ? 1 : 2)
          })
          break

        case 'eec.purchase':
          emitPageView()
          data = ecommerce && ecommerce.purchase
          if (data && data.actionField) {
            gtag('event', 'purchase', {
              transaction_id: data.actionField.id,
              affiliation: document.querySelector('meta[name="author"]').getAttribute('content') || 'Shop',
              value: Number(data.actionField.revenue),
              currency: ecommerce.currencyCode,
              tax: data.actionField.tax ? Number(data.actionField.tax) : 0,
              shipping: data.actionField.shipping ? Number(data.actionField.shipping) : 0,
              items: data.products.map(parseUaProduct)
            })
            if (googleAdsId) {
              gtag('event', 'conversion', {
                send_to: googleAdsId,
                value: Number(data.actionField.revenue),
                currency: ecommerce.currencyCode,
                transaction_id: data.actionField.id
              })
            }
          }
          break

        default:
          emitPageView()
      }
    }
  })
}
