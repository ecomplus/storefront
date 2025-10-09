export const configProp = {
  config: {
    type: Object,
    default: () => ({
      store_id: null,
      web_id: null,
      widget_key: null,
      widget_rating: {
        is_enabled: false,
        font_size: 15,
        star_color: null,
        display: null,
        search_page: true
      },
      widget_review: {
        is_enabled: false,
        title: null,
        star_color: null,
        header_layout: null,
        reviews_layout: null
      }
    })
  }
}
