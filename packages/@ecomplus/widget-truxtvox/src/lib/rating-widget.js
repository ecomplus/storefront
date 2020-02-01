export default productId => {
  const $div = document.createElement('div')
  $div.setAttribute('data-trustvox-product-code', productId)
  return $div
}
