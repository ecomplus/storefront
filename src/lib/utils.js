/* Auxiliary functions */

import { DEFAULT_CURRENCY, DEFAULT_LANG, DEFAULT_COUNTRY_CODE } from '@/lib/constants'

// handle form validation rules
export function addRule (label, rule, rules) {
  if (!rules.hasOwnProperty(label)) {
    // preset array
    rules[label] = []
  }
  rules[label].push(rule)
}

// custom validation for masked inputs
export function checkMask (errMsg) {
  return (rule, value, cb) => {
    if (typeof value === 'string' && value.indexOf('_') === -1) {
      // mask matched
      cb()
    } else {
      cb(new Error(errMsg))
    }
  }
}

// custom validation for date input
export function checkDate (errMsg) {
  return (rule, value, cb) => {
    if (typeof value === 'string') {
      // check date
      let date = isoDate(value, true)
      if (!isNaN(date)) {
        let year = date.getFullYear()
        if (year > 1900 && year < new Date().getFullYear()) {
          // valid date string
          cb()
          return
        }
      }
    }
    cb(new Error(errMsg))
  }
}

// parse number to string with money format
export function formatMoney (price, currency = DEFAULT_CURRENCY, lang = DEFAULT_LANG) {
  // format pt-BR, en-US
  lang = lang.replace('_', '-')
  let priceString
  try {
    priceString = price.toLocaleString(lang, { style: 'currency', currency: currency })
  } catch (e) {
    // fallback
    priceString = price
  }
  return priceString
}

// parse date string to ISO format
export function isoDate (dateString, getObject = false) {
  let [ d, m, y ] = dateString.split('/')
  if (d && m && y) {
    // parse to date short format
    // dd/mm/yy(yy)?
    dateString = m + '/' + d + '/' + y
  }
  let date = new Date(dateString)
  if (getObject) {
    return date
  }
  // yyyy-mm-dd
  return date.toISOString().substr(0, 10)
}

// parse ISO date string to country format
export function formatDate (isoDateString, country = DEFAULT_COUNTRY_CODE) {
  isoDateString = isoDateString.split('T')[0]
  if (country === 'br') {
    let [ y, m, d ] = isoDateString.split('-')
    if (d && m && y) {
      // dd/mm/yyy
      return d + '/' + m + '/' + y
    }
  }
  return isoDateString
}

// compare strings without accents
export function compareStrings (base, compare) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  return base.localeCompare(compare, 'en', { sensitivity: 'base' }) === 0
}

// update page title header
export function updateTitle (title, subtitle) {
  // global document
  if (typeof document === 'object' && document !== null) {
    if (!title) {
      // get current title
      title = document.title || ''
    }
    if (subtitle) {
      title += ' · ' + subtitle
    }
    document.title = title
  }
}

// set value of a cookie by name
export function setCookie (name, value, seconds) {
  let d = new Date()
  d.setTime(d.getTime() + 1000 * seconds)
  document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}

// abstraction to read a specific cookie value
export function getCookie (name) {
  let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}
