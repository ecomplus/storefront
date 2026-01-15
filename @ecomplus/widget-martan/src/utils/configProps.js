export const configProp = {
  config: {
    type: Object,
    default: () => ({
      store_id: null,
      web_id: null,
      widget_rating: {
        is_enabled: false,
        font_size: 15,
        star_color: null,
        display: null,
        search_page: true,
        theme: null
      },
      widget_review: {
        is_enabled: false,
        title: null,
        star_color: null,
        header_layout: null,
        reviews_layout: null
      },
      widget_questions: {
        is_enabled: false,
        title: null,
        enable_new_questions: false
      }
    })
  }
}
