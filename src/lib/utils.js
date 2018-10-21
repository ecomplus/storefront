/* Auxiliary functions */

import { DEFAULT_CURRENCY, DEFAULT_LANG } from '@/lib/constants'

// handle form validation rules
export function addRule (label, rule, rules) {
  if (!rules.hasOwnProperty(label)) {
    // preset array
    rules[label] = []
  }
  rules[label].push(rule)
}

// custom validation for masked inputs
export function checkMask (rule, value, cb) {
  if (value.indexOf('_') === -1) {
    // mask matched
    cb()
  } else {
    cb(new Error(this.$t('validate.mask')))
  }
}

// parse number to string with money format
export function formatMoney (price, currency = DEFAULT_CURRENCY, lang = DEFAULT_LANG) {
  // format pt-BR, en-US
  lang = lang.replace('_', '-')
  var priceString
  try {
    priceString = price.toLocaleString(lang, { style: 'currency', currency: currency })
  } catch (e) {
    // fallback
    priceString = price
  }
  return priceString
}
