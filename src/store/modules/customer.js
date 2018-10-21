const module = 'customer'
// initial state
// https://developers.e-com.plus/docs/api/#/store/customers
const state = {
  body: {
    _id: null,
    locale: null,
    main_email: null,
    accepts_marketing: false,
    display_name: null,
    name: {},
    birth_date: {},
    gender: null,
    photos: [],
    phones: [],
    // default physical
    registry_type: 'p',
    doc_country: null,
    doc_number: null,
    inscription_type: null,
    inscription_number: null,
    corporate_name: null,
    addresses: [],
    orders: []
  }
}

const mutations = {
  // reset customer body object
  editCustomer (state, payload) {
    state.body = {
      ...state.body,
      ...payload.body
    }
  }
}

const getters = {
  customer: state => state.body,
  customerEmail: state => state.body.main_email,
  isCustomerLogged: state => !!(state.body._id),

  // get customer full name
  customerName (state) {
    let nameObj = state.body.name
    let name = ''
    if (nameObj && nameObj.given_name) {
      // first name is the only required
      name += nameObj.given_name
      if (nameObj.hasOwnProperty('middle_name')) {
        name += ' ' + nameObj.middle_name
      }
      if (nameObj.hasOwnProperty('family_name')) {
        // last name
        name += ' ' + nameObj.family_name
      }
    }
    // return concatenated string
    return name
  },

  // parse full name string to name object
  parseCustomerName: () => (nameString) => {
    let names = nameString.split(/\s+/)
    let nameObj = {}
    if (names.length) {
      // first name
      nameObj.given_name = names.shift()
      if (names.length) {
        // last name from last array element
        nameObj.family_name = names.pop()
        if (names.length) {
          // rest of names on middle
          nameObj.middle_name = names[0]
          for (let i = 1; i < names.length; i++) {
            nameObj.middle_name += ' ' + names[i]
          }
        }
      }
    }
    // returns name object valid for customer body
    return { name: nameObj }
  },

  // get customer birth date string
  customerBirth (state) {
    let birthObj = state.body.birth_date
    if (birthObj) {
      let { day, month, year } = birthObj
      if (day && month && year) {
        // default UTC format
        // yyyy-mm-dd
        // return concatenated string
        return year + '-' +
          month.toString().padStart(2, '0') + '-' +
          day.toString().padStart(2, '0')
      }
    }
    // empty or invalid birth date object
    return ''
  },

  // parse birth date string to object
  parseCustomerBirth: () => (dateString) => {
    if (typeof dateString === 'string') {
      let dates = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/)
      if (Array.isArray(dates)) {
        // returns complete birth date object
        return {
          birth_date: {
            // yyyy-mm-dd
            // parse strings to numbers
            year: parseInt(dates[1], 10),
            month: parseInt(dates[2], 10),
            day: parseInt(dates[3], 10)
          }
        }
      }
    }
    // returns empty birth date
    return { birth_date: {} }
  },

  // get customer array of phones string
  customerPhones (state) {
    let phoneObjs = state.body.phones
    let phones = []
    // parse each phone object to string
    phoneObjs.forEach((obj) => {
      // formated phone number string
      let phone = ''
      if (obj.country_code) {
        phone += '+' + obj.country_code + ' '
      }
      phone += obj.number
      phones.push(phone)
    })
    // no phones
    // returns empty array
    return phones
  },

  // parse phones array of strings to array of objects
  parseCustomerPhones: () => (phones) => {
    let phoneObjs = []
    // parse each string to object
    phones.forEach((phoneString) => {
      // skip null or undefined
      if (phoneString) {
        let obj = {}
        let phoneNumber = ''
        if (phoneString.charAt(0) === '+') {
          // international phone
          let parts = phoneString.split(' ')
          // save integer country code
          obj.country_code = parseInt(parts[0].substr(1, 3), 10)
          // set phone number without country code
          if (parts.length > 1) {
            for (let i = 1; i < parts.length; i++) {
              phoneNumber += parts[i]
            }
          } else {
            phoneNumber = parts[0].substr(4)
          }
        } else {
          // no country code
          phoneNumber = phoneString
        }

        if (phoneNumber !== '') {
          // save number string with digits only
          obj.number = phoneNumber.replace(/[\D]/g, '')
          phoneObjs.push(obj)
        }
      }
    })

    // returns phones array ready for customer body
    return { phones: phoneObjs }
  }
}

const actions = {
  // update customer object
  editCustomer ({ state, commit, dispatch }, payload) {
    commit('editCustomer', { body: payload })
    if (state.body._id) {
      // API request
      // send customer body object
      return dispatch('api', [ 'set', module, payload ], { root: true })
    } else {
      return Promise.resolve()
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
