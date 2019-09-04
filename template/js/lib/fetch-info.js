import emitter from './emitter'
import { modules } from '@ecomplus/client'

window._info = window._info || {}
const fetchInfoPromises = []

;[
  'list_payments',
  'calculate_shipping'
].forEach(endpoint => {
  const modInfo = {}
  window._info[endpoint] = modInfo

  const promise = new Promise(resolve => {
    modules({ url: `/${endpoint}.json` })

      .then(({ data }) => {
        const { result } = data
        if (Array.isArray(result)) {
          result.forEach(({ error, response }) => {
            if (!error) {
              let field, val

              switch (endpoint) {
                case 'calculate_shipping':
                  field = 'free_shipping_from_value'
                  val = response[field]
                  if (typeof val === 'number' && (modInfo[field] === undefined || val < modInfo[field])) {
                    modInfo[field] = val
                  }
                  break

                default:
                  field = 'installments_option'
                  val = response[field]
                  if (val && (!modInfo[field] ||
                    val.monthly_interest < modInfo[field].monthly_interest ||
                    val.max_number > modInfo[field].max_number)) {
                    modInfo[field] = val
                  }
                  field = 'discount_option'
                  val = response[field]
                  if (val && (!modInfo[field] || val.value > modInfo[field].value)) {
                    modInfo[field] = val
                  }
              }
            }
          })
        }
        emitter.emit(`info:${endpoint}`, modInfo)
      })

      .catch(err => {
        console.error(err)
        emitter.emit(`info:${endpoint}`, err)
      })

      .finally(resolve)
  })

  fetchInfoPromises.push(promise)
})

Promise.all(fetchInfoPromises)
  .then(() => emitter.emit('info', window._info))
