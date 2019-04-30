'use strict'

/* global localStorage */

// handle search history
const DB_HISTORY = typeof localStorage === 'object' ? 'ecomSeachHistory' : null
let history
if (DB_HISTORY) {
  history = localStorage.getItem(DB_HISTORY)
  if (typeof history === 'string') {
    history = history.split('||')
  }
}
if (!Array.isArray(history)) {
  // return empty array
  history = []
}

export default {
  get () {
    return history
  },

  add (term) {
    // check if term is not on history yet
    let index = history.indexOf(term)
    if (index > -1) {
      // move term to start of list
      history.splice(index, 1)
    }
    history.unshift(term)
    // limit array size
    if (history.length > 20) {
      history.pop()
    }
    if (DB_HISTORY) {
      localStorage.setItem(DB_HISTORY, history.join('||'))
    }
  }
}
