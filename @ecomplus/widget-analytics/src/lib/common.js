export const parseUaProduct = (product) => {
  const gtagItem = {
    item_id: product.id,
    item_name: product.name,
    price: product.price,
    quantity: Math.abs(product.quantity || 1)
  }
  if (product.category) {
    gtagItem.item_category = product.category
  }
  if (product.brand) {
    gtagItem.item_brand = product.brand
  }
  return gtagItem
}
