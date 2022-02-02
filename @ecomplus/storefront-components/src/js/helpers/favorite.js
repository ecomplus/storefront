const toggleFavorite = (productId, ecomPassport = ecomPassport) => {
  const customer = ecomPassport.getCustomer()
  const favorites = customer.favorites || []

  if (!checkFavorite(productId, ecomPassport)) {
    favorites.push(productId)
  } else {
    const favIndex = favorites.indexOf(productId)
    favorites.splice(favIndex, 1)
  }

  ecomPassport.requestApi('/me.json', 'patch', { favorites })
    .then(({ data }) => {
      console.log(data)
    })
}

const checkFavorite = (productId, ecomPassport) => {
  const { favorites } = ecomPassport.getCustomer()
  return favorites && favorites.includes(productId)
}

export { toggleFavorite, checkFavorite }
