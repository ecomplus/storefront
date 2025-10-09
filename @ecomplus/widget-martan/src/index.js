import Reviews from './widgets/reviews'

export const MARTAN_API = 'https://widgets.martan.app/v1'

export default (options) => {
  if (options && options.store_id && options.web_id) {
    if (options.widget_review && options.widget_review.is_enabled) {
      Reviews(options)
    }
  } else {
    console.error(
      new Error(
        "Can't setup Martan widget without `martanStoreId` and `martanWidgetKey`"
      )
    )
  }
}
