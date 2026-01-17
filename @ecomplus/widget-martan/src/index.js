import Reviews from './widgets/reviews'
import Questions from './widgets/questions'
import Ratings from './widgets/ratings'

export const MARTAN_API = 'https://widgets.appmartan.com.br'
export const MARTAN_QUESTIONS_WEBUI = 'https://create-questions.martan.app'

export default (options) => {
  if (!options || !options.store_id || !options.web_id) {
    console.error(
      new Error(
        "Can't setup Martan widget without `martanStoreId` and `martanWebId`"
      )
    )

    return
  }
  if (options.widget_questions && options.widget_questions.is_enabled) {
    Questions(options)
  }
  if (options.widget_review && options.widget_review.is_enabled) {
    Reviews(options)
  }
  if (options.widget_rating && options.widget_rating.is_enabled) {
    new Ratings(options).init()
  }
}
