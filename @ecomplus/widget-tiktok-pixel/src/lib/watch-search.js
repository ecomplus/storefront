export default ttq => {
  setTimeout(() => {
    const $products = document.querySelectorAll('[data-sku]')
    if ($products.length) {
      const isSearchPage = window.location.pathname === '/search'
      if (isSearchPage) {
        const params = new URLSearchParams(document.location.search)
        ttq.track('Search', params.get('term'))
      }
    }
  }, 300)
}
