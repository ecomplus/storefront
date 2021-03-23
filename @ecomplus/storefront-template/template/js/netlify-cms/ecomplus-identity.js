import axios from 'axios'
import * as EventEmitter from 'eventemitter3'

export default (baseURL = 'https://admin.e-com.plus/session/gotrue/v1', canAutoInit = true) => {
  const emitter = new EventEmitter()

  let accessToken
  const store = {
    user: null,
    modal: {
      page: 'login'
    },
    saving: false
  }

  const logout = () => {
    store.user = null
    emitter.emit('logout')
  }

  const init = () => {
    axios.get(`${baseURL}/token`)
      .then(({ data }) => {
        accessToken = data.access_token
        return axios.get(`${baseURL}/token`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
      })

      .then(({ data }) => {
        store.user = data
        store.user.jwt = function () {
          return accessToken
        }
        emitter.emit('login', data)
      })

      .catch(error => {
        if (error.response && error.response.status === 302) {
          const { headers } = error.response
          if (headers.Location) {
            window.location.href = headers.Location
            return
          }
        }
        console.error(error)
        emitter.emit('error', error)
      })

    emitter.emit('init')
    setTimeout(logout, 1000 * 60 * 60 * 4)
  }

  if (canAutoInit) {
    init()
  }
  return {
    init,
    open: init,
    close: () => {},
    currentUser: () => store.user,
    logout,
    store,
    on: emitter.on
  }
}
