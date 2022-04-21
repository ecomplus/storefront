import { i18n } from '@ecomplus/utils'
import EcomRouter from '@ecomplus/storefront-router'
import Vue from 'vue'
import TheProduct from '#components/TheProduct.vue'
import SearchEngine from '#components/SearchEngine.vue'

const $fallback404 = document.getElementById('fallback-404')
if ($fallback404.length) {
  const urlParams = new URLSearchParams(window.location.search)
  let url = urlParams.get('url')
  if (!url && document.cookie) {
    const referrerCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('referrerUrl='))
    if (referrerCookie) {
      url = referrerCookie.split('=')[1]
    }
  }

  if (url) {
    const router = new EcomRouter()
    $fallback404.innerHTML = '<div class="spinner-border" role="status"></div>'

    const renderNotFound = () => {
      $fallback404.innerHTML = `<h3 class="my-4"><i class="text-muted i-exclamation-triangle mr-3">
      ${
        i18n({
          pt_br: 'Página não encontrada',
          en_us: 'Page not found'
        })
      }</i></h3>`
      router.list()
        .then(routes => {
          $fallback404.append([
            `<p class="lead">
            ${
              i18n({
                pt_br: 'Mapa do site:',
                en_us: 'Sitemap:'
              })
            }</p>`,
            `<ul>${routes.map(({ path }) => {
              return `<li><a href="${path}">${path}</a></li>`
            })}</ul>`
          ])
        })
        .catch(console.error)
    }

    router.map(url)
      .then(route => {
        const { resource, _id } = route
        switch (resource) {
          case 'products':
            return new Vue({
              render: h => h(TheProduct, {
                props: {
                  productId: _id
                }
              })
            })

          case 'brands':
          case 'categories':
            return router.resolve(route)
              .then(({ body }) => {
                return new Vue({
                  render: h => h(SearchEngine, {
                    props: {
                      [resource]: [body.name]
                    }
                  })
                })
              })
        }
      })

      .then(vueInstance => {
        if (vueInstance) {
          vueInstance.$mount($fallback404)
        } else {
          renderNotFound()
        }
      })

      .catch(err => {
        console.error(err)
        renderNotFound()
      })
  }
}
