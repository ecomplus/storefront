const { name, logo } = window._settings

const state = {
  body: {
    name,
    logo: {
      url: logo,
      alt: name
    }
  }
}

const getters = {
  shop: state => state.body
}

export default {
  state,
  getters
}
