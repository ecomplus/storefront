import Reviews from './widgets/reviews'
import Snippets from './widgets/snippets'

export const MARTAN_API = 'https://widgets.martan.app/v1'

export default (options) => {
  if (options && options.store_id && options.web_id) {
    console.log('Martan widget started with EJS appends')
    if (options.widget_snippet && options.widget_snippet.is_enabled) {
      Snippets(options)
    }

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
