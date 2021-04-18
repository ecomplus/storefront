import axios from 'axios'
import * as EventEmitter from 'eventemitter3'
import { $ecomConfig } from '@ecomplus/utils'

const { location, localStorage } = window
const storageKey = 'admin:token'

export default (baseURL = 'https://admin.e-com.plus/session/gotrue/v1', canAutoInit = true) => {
  const emitter = new EventEmitter()

  const store = {
    user: null,
    modal: {
      page: 'login'
    },
    saving: false
  }

  const logout = () => {
    store.user = null
    localStorage.removeItem(storageKey)
    emitter.emit('logout')
  }

  const init = () => {
    const urlParams = new URLSearchParams(location.search)
    const accessToken = urlParams.get('token') || localStorage.getItem(storageKey)
    if (!accessToken) {
      location.href = `${baseURL}/?store_id=${$ecomConfig.get('store_id')}`
      return
    }

    axios.get(`${baseURL}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(({ data }) => {
        store.user = data
        store.user.jwt = function () {
          return localStorage.getItem(storageKey)
        }
        localStorage.setItem(storageKey, accessToken)
        emitter.emit('login', data)
      })

      .catch(error => {
        if (error.response) {
          const { status, data } = error
          if (status === 401) {
            localStorage.removeItem(storageKey)
          }
          if (data && data.login_url) {
            location.href = data.login_url
            return
          }
        }
        console.error(error)
        emitter.emit('error', error)
      })

      .finally(() => {
        if (window.history) {
          window.history.pushState('hide-token', document.title, `/admin/${location.hash}`)
        }
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
