import axios from 'axios'
import * as EventEmitter from 'eventemitter3'

export default (baseURL = 'https://admin.e-com.plus/session/gotrue/v1', canAutoInit = true) => {
  const emitter = new EventEmitter()

  const store = {
    user: null,
    modal: {
      page: 'login'
    },
    saving: false
  }

  const init = () => {
    axios.get(`${baseURL}/token`)
      .then(({ data }) => axios.get(`${baseURL}/token`, {
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      }))
      .then(({ data }) => {
        store.user = data
        emitter.emit('login', data)
      })
      .catch(function (error) {
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
  }

  if (canAutoInit) {
    init()
  }
  return {
    init,
    open: init,
    close: () => {},
    currentUser: () => store.user,
    logout: () => (store.user = null),
    store,
    on: emitter.on
  }
}
