import { store } from '@ecomplus/client'
import ecomPassport from '@ecomplus/passport-client'

export default options => {
  if (options && options.ebitStoreId) {
    const router = window.storefrontApp && window.storefrontApp.router
    const addRouteToData = ({ name, params }) => {
      if (name === 'confirmation') {
        const client = ecomPassport.getCustomer()
        const dataOrder = function (params) {
          const url = '/orders/' + params.id + '.json'
          const request = ecomPassport.checkLogin()
            ? ecomPassport.requestApi(url)
            : store({ url })
          request.then(({ data }) => {
            const orderData = data
            const gender = orderData.buyers[0].gender ? '&gender=' + orderData.buyers[0].gender.toUpperCase() : ''
            const birthday = client.birth_date ? '&birthday=' + client.birth_date.day + '-' + (client.birth_date.month.length === 1 ? '0' + client.birth_date.month : client.birth_date.month) + '-' + client.birth_date.year : ''
            const parcel = orderData.transactions[0].installments ? '&parcels=' + orderData.transactions[0].installments.number : '&parcels=1'
            const freight = orderData.amount.freight ? '&deliveryTax=' + orderData.amount.freight : '&deliveryTax=' + 0
            const deliveryTime = orderData.shipping_lines[0].delivery_time ? '&deliveryTime=' + orderData.shipping_lines[0].delivery_time.days : '&deliveryTime=0'
            const valueItems = orderData.items.map(e => (e.final_price || e.price)).join('|')
            const unitItems = orderData.items.map(e => e.quantity).join('|')
            const nameItems = encodeURI(orderData.items.map(e => e.name).join('|'))
            const skuItems = orderData.items.map(e => e.sku).join('|')
            const cardTestFlag = (orderData) => {
              switch (orderData.transactions[0].credit_card.company) {
                case 'visa':
                  return 6
                case 'mastercard':
                  return 5
                case 'american express':
                  return 1
                case 'elo':
                  return 8
                case 'aura':
                  return 2
                case 'hipercard':
                  return 4
                case 'diners club':
                  return 3
                case 'outros':
                  return 7
              }
            }
            const cardFlag = orderData.transactions[0].credit_card ? '&cardFlag=' + cardTestFlag(orderData) : ''
            const paymentType = (orderData) => {
              switch (orderData.transactions[0].payment_method.code) {
                case 'credit_card':
                  return '0' + 5
                case 'banking_billet':
                  return '0' + 8
                case 'debit_card':
                  return 28
                case 'account_deposit':
                  return 28
                case 'online_debit':
                  return 28
                case 'balance_on_intermediary':
                  return 14
                case 'loyalty_points':
                  return 24
                case 'other':
                  return 14
              }
            }
            var banner = '<div> ' +
            ' <param id="ebitParam" value="storeId=' + options.ebitStoreId + '&platform=ecomplus&email=' + orderData.buyers[0].main_email + gender + birthday + '&zipCode=' + orderData.shipping_lines[0].to.zip + parcel + freight + deliveryTime + '&mktSaleId=0&totalSpent=' + orderData.amount.total + '&value=' + valueItems + '&quantity=' + unitItems + '&productName=' + nameItems + '&transactionId=' + orderData.number + '&paymentType=' + paymentType(orderData) + cardFlag + '&sku=' + skuItems + '"> ' +
            ' <a id="bannerEbit"></a>' +
            ' <script type="text/javascript" id="getSelo" src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?' + options.ebitStoreId + '&lightbox=true"></script>' +
            '</div>'
            $('body').append(banner)
          })
        }
        console.log(dataOrder(params))
      }
    }
    router.afterEach(addRouteToData)
  } else {
    console.error(new Error('Can\'t setup Ebit widget without `ebitStoreId` option'))
  }
}
