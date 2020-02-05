import { modules } from '@ecomplus/client'
import emitter from './emitter'
import utm from './persist-utm'

window._info = window._info || {}
const fetchInfoPromises = []
const modulesToFetch = [
  { endpoint: 'list_payments' },
  { endpoint: 'calculate_shipping' }
]
if (Object.keys(utm).length) {
  modulesToFetch.push({
    endpoint: 'apply_discount',
    reqOptions: {
      method: 'post',
      data: { utm }
    }
  })
}

modulesToFetch.forEach(({ endpoint, reqOptions }) => {
  const modInfo = {}
  window._info[endpoint] = modInfo

  const promise = new Promise(resolve => {
    modules({
      url: `/${endpoint}.json`,
      ...reqOptions
    })

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

                case 'list_payments':
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
                  break

                default:
                  field = 'available_extra_discount'
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
