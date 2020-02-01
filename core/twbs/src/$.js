import jQuery from './vendor/jquery.min'

jQuery.fn.jquery = jQuery.fn.jquery.replace('4.0.0-pre', '3.x-pre')
window.jQuery = window.$ = jQuery

export default jQuery
