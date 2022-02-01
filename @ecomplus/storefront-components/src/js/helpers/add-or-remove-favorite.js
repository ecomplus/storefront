import ecomPassport from '@ecomplus/passport-client'


const customer = ecomPassport.getCustomer()
const favorites = customer.favorites || []

const addToFavorites = (productId) => {
  favorites.push(productId)
  patch(favorites)
}

const removeFromFavorites = (productId) => {
  const favIndex = favorites.indexOf(productId)
  favorites.splice(favIndex, 1)
  patch(favorites)
}

const patch = (favorites) => {
  ecomPassport.requestApi('/me.json', 'patch', { favorites })
    .then(({ data }) => {
      console.log(data)
    })
}

export { addToFavorites, removeFromFavorites }
