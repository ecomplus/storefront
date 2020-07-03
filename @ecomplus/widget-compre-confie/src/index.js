import { price as getPrice } from '@ecomplus/utils'
import ecomPassport from '@ecomplus/passport-client'

export default (options = {}) => {
  const { compreConfieStoreId } = options
  if (compreConfieStoreId) {
    const router = window.storefrontApp && window.storefrontApp.router
    if (router) {
      const addConfirmationBanner = ({ name, params }) => {
        if (name === 'confirmation' && params.json) {
          let order
          const orderJson = decodeURIComponent(params.json)
          if (orderJson) {
            try {
              order = JSON.parse(orderJson)
            } catch (e) {}
          }
          if (order) {
            const customer = ecomPassport.getCustomer()
            const buyers = order.buyers[0]
            const transaction = order.transactions[0]
            let consumerFullname
            if (buyers && buyers.name) {
              consumerFullname = buyers.name.given_name + ' ' + buyers.name.family_name
            } else {
              consumerFullname = customer.name.given_name + ' ' + customer.name.family_name
            }
            const createdAt = new Date()
            let compreParam = `orderSellerID=${compreConfieStoreId}&orderPlatform=ecomplus` +
              `&orderTotalSpent=${order.amount.total}` +
              `&orderDeliveryTax=${(order.amount.freight || 0)}` +
              `&orderID=${(order.number || order._id)}` +
              `&consumerEmail=${customer.main_email}` +
              `&billingEmail=${customer.main_email}` +
              `&consumerName=${encodeURIComponent(consumerFullname)}` +
              `&orderDate=${createdAt.getDate() + '/' + (createdAt.getMonth() + 1) + '/' + createdAt.getFullYear() + ' | ' + createdAt.getHours() + ':' + createdAt.getMinutes() + ':' + createdAt.getSeconds()}`
            if (customer.gender === 'm') {
              compreParam += '&consumerGender=Masculino&billingGender=Masculino'
            } else if (customer.gender === 'f') {
              compreParam += '&consumerGender=Feminino&billingGender=Feminino'
            }
            if (customer.registry_type === 'p') {
              compreParam += `&consumerCPF=${customer.doc_number || (transaction.payer && transaction.payer.doc_number)}` +
              `&billingCPF=${transaction.payer ? transaction.payer.doc_number : customer.doc_number}`
            }
            if (customer.birth_date) {
              const { day, month, year } = customer.birth_date
              compreParam += `&consumerBirthDate=${day.toString().padStart(2, '0')}` +
                `/${month.toString().padStart(2, '0')}/${year}`
            }

            const { items } = order
            if (items && items.length) {
              let skus = items[0].sku
              let values = getPrice(items[0])
              let quantities = items[0].quantity
              let names = encodeURIComponent(items[0].name)
              let productMktSaleID = '0'
              for (let i = 1; i < items.length; i++) {
                skus += `|${items[i].sku}`
                values += `|${getPrice(items[i])}`
                quantities += `|${items[i].quantity}`
                names += `|${encodeURIComponent(items[i].name)}`
                productMktSaleID += '|0'
              }
              compreParam += `&productSKU=${skus}&productValue=${values}&productQuantity=${quantities}&ProductName=${names}&ProductMktSaleID=${productMktSaleID}`
            }

            if (order.shipping_lines && order.shipping_lines[0]) {
              const shippingLine = order.shipping_lines[0]
              if (shippingLine.app && shippingLine.app.label) {
                compreParam += '&orderDeliveryType='
                switch (shippingLine.app.label) {
                  case 'PAC':
                  case 'Pac':
                    compreParam += '0'
                    break
                  case 'SEDEX':
                  case 'Sedex':
                    compreParam += '1'
                    break
                  case 'Retirar na loja':
                  case 'retirar na loja':
                    compreParam += '3'
                    break
                  default:
                    compreParam += '4'
                }
              }
              compreParam += `&orderDeliveryTime=${(shippingLine.delivery_time.days || 0)}` +
                `&consumerZipcode=${shippingLine.to.zip}` +
                `&billingZipcode=${shippingLine.to.zip}` +
                `&productDeliveryTime=${(shippingLine.delivery_time.days || 0)}`
            }

            if (order.transactions && transaction) {
              if (transaction.app && transaction.app.intermediator && transaction.app.intermediator.name) {
                compreParam += `&orderPartnerPayment=${transaction.app.intermediator.name}`
              }
              compreParam += `&billingName=${encodeURIComponent(transaction.payer ? transaction.payer.fullname : consumerFullname)}`
              compreParam += `&orderParcels=${((transaction.installments && transaction.installments.number) || 1)}`
              compreParam += '&orderPaymentType='
              switch (transaction.payment_method.code) {
                case 'credit_card':
                  compreParam += '1'
                  break
                case 'banking_billet':
                  compreParam += '2'
                  break
                case 'debit_card':
                case 'online_debit':
                  compreParam += '9'
                  break
                case 'account_deposit':
                  compreParam += '6'
                  break
                case 'loyalty_points':
                  compreParam += '8'
                  break
                default:
                  compreParam += '3'
              }

              if (transaction.credit_card && transaction.credit_card.company) {
                compreParam += '&orderCardFlag='
                switch (transaction.credit_card.company.toLowerCase()) {
                  case 'visa':
                    compreParam += 3
                    break
                  case 'mastercard':
                    compreParam += 2
                    break
                  case 'american express':
                  case 'amex':
                    compreParam += 5
                    break
                  case 'elo':
                    compreParam += 8
                    break
                  case 'aura':
                    compreParam += 7
                    break
                  case 'hipercard':
                    compreParam += 6
                    break
                  case 'diners club':
                    compreParam += 1
                    break
                  default:
                    compreParam += 9
                }
              }
            }

            const appendBanner = () => {
              const $confirmation = document.getElementById('confirmation')
              if ($confirmation) {
                $confirmation.insertAdjacentHTML(
                  'beforeend',
                  `<a id="bannerEconfy"></a> <param id="TagEConfy" value="${compreParam}">`
                )
                const $script = document.createElement('script')
                $script.id = 'getData'
                $script.type = 'text/javascript'
                $script.src = 'https://banner.compreconfie.com.br/scripts/tagBanner.min.js' +
                  `?${compreConfieStoreId}&lightbox=true`
                document.body.appendChild($script)
                clearInterval(tryAppendInterval)
              }
            }
            const tryAppendInterval = setInterval(appendBanner, 200)
          }
        }
      }

      if (router.currentRoute) {
        addConfirmationBanner(router.currentRoute)
      }
      router.afterEach(addConfirmationBanner)
    }
  } else {
    console.error(new Error('Can\'t show lightbox without `compreConfieStoreId` option'))
  }
}
