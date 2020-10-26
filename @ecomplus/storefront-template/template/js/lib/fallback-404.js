import { i18n } from '@ecomplus/utils'
import EcomRouter from '@ecomplus/storefront-router'
import { $ } from '@ecomplus/storefront-twbs'
import Vue from 'vue'
import TheProduct from '#components/TheProduct.vue'
import SearchEngine from '#components/SearchEngine.vue'

const $fallback404 = $('#fallback-404')
if ($fallback404.length) {
  const urlParams = new URLSearchParams(window.location.search)
  const url = urlParams.get('url')
  if (url) {
    const router = new EcomRouter()
    $fallback404.html('<div class="spinner-border" role="status"></div>')

    const renderNotFound = () => {
      $fallback404.html($('<h3>', {
        class: 'my-4',
        html: [
          '<i class="text-muted fas fa-exclamation-triangle mr-3"></i>',
          i18n({
            pt_br: 'Página não encontrada',
            en_us: 'Page not found'
          })
        ]
      }))

      router.list()
        .then(routes => {
          $fallback404.append([
            $('<p>', {
              class: 'lead',
              html: i18n({
                pt_br: 'Mapa do site:',
                en_us: 'Sitemap:'
              })
            }),
            $('<ul>', {
              html: routes.map(({ path }) => {
                return `<li><a href="${path}">${path}</a></li>`
              })
            })
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
          vueInstance.$mount($fallback404[0])
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
