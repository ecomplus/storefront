import {
  i19email,
  i19on,
  i19share
} from '@ecomplus/i18n'

import { i18n } from '@ecomplus/utils'
import { ShareNetwork } from 'vue-social-sharing'

const shareNetworks = [
  {
    network: 'whatsapp',
    name: 'WhatsApp',
    icon: 'fab fa-whatsapp',
    color: '#25d366'
  },
  {
    network: 'facebook',
    name: 'Facebook',
    icon: 'fab fa-facebook',
    color: '#1877f2'
  },
  {
    network: 'twitter',
    name: 'Twitter',
    icon: 'fab fa-twitter',
    color: '#1da1f2'
  },
  {
    network: 'telegram',
    name: 'Telegram',
    icon: 'fab fa-telegram',
    color: '#0088cc'
  },
  {
    network: 'pinterest',
    name: 'Pinterest',
    icon: 'fab fa-pinterest',
    color: '#bd081c'
  },
  {
    network: 'email',
    name: 'Email',
    icon: 'fas fa-envelope',
    color: '#333333'
  },
  {
    network: 'sms',
    name: 'SMS',
    color: '#333333'
  }
]

export default {
  name: 'TheProduct',

  components: {
    ShareNetwork
  },

  props: {
    url: {
      type: String,
      required: true
    },
    title: String,
    description: String
  },

  computed: {
    i19email: () => i18n(i19email),
    i19on: () => i18n(i19on).toLowerCase(),
    i19share: () => i18n(i19share),
    shareNetworks: () => shareNetworks,

    localUrl () {
      if (typeof window === 'object' && !this.url.startsWith('http')) {
        return `https://${window.location.hostname}${this.url}`
      }
      return this.url
    }
  }
}
