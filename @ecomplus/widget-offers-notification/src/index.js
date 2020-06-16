
export default (options = {}) => {
  const $offersBtns = window.document.querySelectorAll('.offers-notification')
  const offerBaseUrl = 'https://us-central1-ecom-offers-notification.cloudfunctions.net/app/offers/notification'

  if ($offersBtns) {
    for (let i = 0; i < $offersBtns.length; i++) {
      const element = $offersBtns[i]
      element.onclick = function () {
        const url = offerBaseUrl + `?store_id=${this.dataset.store_id}&criterias=${this.dataset.criterias}&productId=${this.dataset.product_id}`
        window.open(url, '_blank', 'location=yes,height=280,width=580,scrollbars=yes,status=yes')
      }
    }
  }
}
