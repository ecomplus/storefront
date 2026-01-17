import widgetInitializer from '../../utils/widget-initializer'
import Component from './Questions.vue'

export default (options = {}, elId = 'questions_widget') => {
  const defaultConfig = {
    widget_questions: null
  }

  return widgetInitializer(options, elId, Component, defaultConfig)
}
