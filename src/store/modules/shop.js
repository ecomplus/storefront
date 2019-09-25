const { name, logo } = window._settings

const state = {
  name,
  logo: {
    url: logo,
    alt: name
  }
}

export default {
  state
}
