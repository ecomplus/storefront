import { animateCss } from '@ecomplus/storefront-twbs'
import ecomCart from '@ecomplus/shopping-cart'

const $cartCount = document.getElementById('cart-count')
if ($cartCount) {
  const showItemsCount = () => {
    animateCss($cartCount, 'fadeOut').then(() => {
      $cartCount.innerText = ecomCart.data.items.length
      animateCss($cartCount, 'fadeIn')
    })
  }
  ecomCart.on('change', showItemsCount)
  showItemsCount()
}
