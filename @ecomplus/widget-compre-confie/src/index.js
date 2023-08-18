import {
  price as getPrice,
  fullName as getFullName
} from '@ecomplus/utils'

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
            } catch (e) {
            }
          }

          if (order) {
            const customer = ecomPassport.getCustomer()
            const transaction = order.transactions && order.transactions[0]
            const payer = transaction && transaction.payer
            const customerName = getFullName(customer)
            const date = new Date()

            let ccParam = `orderSellerID=${compreConfieStoreId}` +
              `&orderTotalSpent=${order.amount.total}` +
              `&orderDeliveryTax=${(order.amount.freight || 0)}` +
              `&orderID=${(order.number || order._id)}` +
              `&consumerEmail=${customer.main_email}` +
              `&billingEmail=${customer.main_email}` +
              `&consumerName=${encodeURIComponent(customerName)}` +
              `&orderDate=${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`
            if (customer.gender === 'm') {
              ccParam += '&consumerGender=Masculino&billingGender=Masculino'
            } else if (customer.gender === 'f') {
              ccParam += '&consumerGender=Feminino&billingGender=Feminino'
            }
            if (customer.registry_type === 'p' && customer.doc_number) {
              ccParam += `&consumerCPF=${customer.doc_number}` +
                `&billingCPF=${((payer && payer.doc_number) || customer.doc_number)}`
            }
            if (customer.birth_date) {
              console.log(customer)
              const { day, month, year } = customer.birth_date
              if (day && month && year) {
                ccParam += `&consumerBirthDate=${day.toString().padStart(2, '0')}` +
                `/${month.toString().padStart(2, '0')}/${year}`
              }
            }
            if (navigator && navigator.userAgent.includes('Mobile')) {
              ccParam += '&orderPlatform=1'
            } else {
              ccParam += '&orderPlatform=0'
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
              ccParam += `&productSKU=${skus}&productValue=${values}&productQuantity=${quantities}` +
                `&ProductName=${names}&ProductMktSaleID=${productMktSaleID}`
            }

            if (order.shipping_lines && order.shipping_lines[0]) {
              const shippingLine = order.shipping_lines[0]
              if (shippingLine.app && shippingLine.app.label) {
                ccParam += '&orderDeliveryType='
                switch (shippingLine.app.label.toLowerCase()) {
                  case 'pac':
                    ccParam += '0'
                    break
                  case 'sedex':
                    ccParam += '1'
                    break
                  case 'retirar na loja':
                    ccParam += '3'
                    break
                  default:
                    ccParam += '4'
                }
              }
              if (shippingLine.delivery_time && shippingLine.delivery_time.days) {
                ccParam += `&orderDeliveryTime=${shippingLine.delivery_time.days}` +
                  `&productDeliveryTime=${shippingLine.delivery_time.days}`
              }
              ccParam += `&consumerZipcode=${shippingLine.to.zip}` +
                `&billingZipcode=${shippingLine.to.zip}`
            }

            if (transaction) {
              if (transaction.app && transaction.app.intermediator && transaction.app.intermediator.code) {
                ccParam += `&orderPartnerPayment=`
                switch (transaction.app.intermediator.code.toLowerCase()) {
                  case 'mercadopago':
                    ccParam += '1'
                    break
                  case 'paypal':
                    ccParam += '2'
                    break
                  case 'pagseguro':
                    ccParam += '4'
                    break
                  case 'pagarme':
                    ccParam += '7'
                    break
                  case 'wirecard':
                    ccParam += '8'
                    break
                  case 'vindi':
                    ccParam += '12'
                    break
                  default:
                    ccParam += '17'
                }
              }
              ccParam += `&billingName=${encodeURIComponent((payer && payer.fullname) || customerName)}`
              ccParam += `&orderParcels=${((transaction.installments && transaction.installments.number) || 1)}`
              ccParam += '&orderPaymentType='
              switch (transaction.payment_method.code) {
                case 'credit_card':
                  ccParam += '1'
                  break
                case 'banking_billet':
                  ccParam += '2'
                  break
                case 'debit_card':
                case 'online_debit':
                  ccParam += '9'
                  break
                case 'account_deposit':
                  ccParam += '6'
                  break
                case 'loyalty_points':
                  ccParam += '8'
                  break
                default:
                  ccParam += '3'
              }

              if (transaction.credit_card && transaction.credit_card.company) {
                ccParam += '&orderCardFlag='
                switch (transaction.credit_card.company.toLowerCase()) {
                  case 'visa':
                    ccParam += 3
                    break
                  case 'mastercard':
                    ccParam += 2
                    break
                  case 'american express':
                  case 'amex':
                    ccParam += 5
                    break
                  case 'elo':
                    ccParam += 8
                    break
                  case 'aura':
                    ccParam += 7
                    break
                  case 'hipercard':
                    ccParam += 6
                    break
                  case 'diners club':
                    ccParam += 1
                    break
                  default:
                    ccParam += 9
                }
              }
            }

            const appendBanner = () => {
              const $confirmation = document.getElementById('confirmation')
              if ($confirmation) {
                $confirmation.insertAdjacentHTML(
                  'beforeend',
                  `<a id="bannerEconfy"></a> <param id="TagEConfy" value="${ccParam}">`
                )
                const $script = document.createElement('script')
                $script.id = 'getData'
                $script.type = 'text/javascript'
                $script.src = 'https://cdn.confi.com.vc/scripts/tagBanner.min.js' +
                  `?sellerId=${compreConfieStoreId}&lightbox=true`
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
