const HomePreview = createClass({
  render: function () {
    return h('div', null,
      // main
      h('main', { role: 'admin', id: 'admin' },
        // header
        h('header', { className: 'header', id: 'header' },
          // d-none d-sm-block
          h('div', { className: 'd-none d-sm-block' },
            h('a', { className: 'header__countdown' }, 'Enjoy our discounts of up to 40%')
          ),
          // header__bar d-none d-md-block
          h('div', { className: 'header__bar' },
            h('div', { className: 'container-fluid' },
              h('div', { className: 'row' },
                h('div', { className: 'header__bar__left col' },
                  h('a', null, 'Sobre nós'),
                  h('a', null, 'Esta loja é um PWA'),
                  h('a', { className: 'whatsapp-link font-weight-normal' },
                    h('i', { className: 'fab fa-whatsapp' }), '(31) 9 8272-1558'
                  ),
                  h('a', { className: 'font-weight-normal' },
                    h('i', { className: 'fab fa-phone' }), '(31) 9 8272-1558'
                  ),
                ),
                h('div', { className: 'col-auto' },
                  h('a', null,
                    h('i', { className: 'fab fa-facebook' })
                  ),
                  h('a', null,
                    h('i', { className: 'fab fa-youtube' })
                  ),
                  h('a', null,
                    h('i', { className: 'fab fa-instagram' })
                  )
                )
              )
            )
          ),
          // header__container
          h('div', { className: 'header__container' },
            h('div', { className: 'container-fluid' },
              h('div', { className: 'row align-items-center' },
                //
                h('div', { className: 'header__col col-auto' },
                  h('button', { className: 'btn header__toggler', type: 'button' },
                    h('i', { className: 'header__toggler__icon fas fa-bars' }),
                    h('span', { className: 'd-none d-lg-inline' }, 'Menu')
                  )
                ),
                //
                h('div', { className: 'header__col col col-lg-3' },
                  h('a', null,
                    h('img', { id: 'logo', className: 'header__logo', src: '/img/uploads/logo.png' })
                  )
                ),
                //
                h('div', { className: 'header__col order-lg-last col-auto' },
                  h('div', { className: 'header__buttons' },
                    h('button', { className: 'd-lg-none btn btn-lg btn-light', id: 'mobile-search-btn', type: 'button' }, h('i', { className: 'fas fa-search' })),
                    h('a', { className: 'btn btn-lg btn-light', id: 'user-button' }, h('i', { className: 'fas fa-user' })),
                    h('a', { className: 'btn btn-lg btn-light', id: 'cart-button' }, h('i', { className: 'fa-shopping-bag' }))
                  )
                ),
                //
                h('div', { className: 'header__col d-none d-lg-block col-12 col-lg mt-2 mt-md-3 mt-lg-0 collapse show', id: 'search-bar' },
                  h('form', { id: 'search-form' },
                    h('input', { className: 'header__search form-control form-control-lg', id: 'search-input', placeholder: 'Buscar Produtos' }),
                    h('button', { className: 'header__search-btn' }, h('i', { className: 'fas fa-search' }))
                  )
                )
              )
            )
          )
        ),
        // article
        h('article', { id: 'content' },
          // banner 
          h('section', { className: 'banner-slider' },
            h('div', { className: 'glide' },
              h('div', { className: 'glide__track' },
                h('ul', { className: 'glide__slides banner-slider__slides' },
                  h('li', { className: 'glide__slide' },
                    h('a', { className: 'd-block' }, h('img', { className: 'lozad fade img-fluid', src: '/img/uploads/rect89.png' }))
                  )
                ),
                h('div', { className: 'glide__arrows d-none d-md-block' },
                  h('button', { className: 'btn glide__arrow glide__arrow--left' }, h('i', { className: 'fas fa-chevron-left' })),
                  h('button', { className: 'btn glide__arrow glide__arrow--right' }, h('i', { className: 'fas fa-chevron-right' }))
                ),
                h('div', { className: 'glide__bullets' },
                  h('button', { className: 'glide__bullet' }),
                  h('button', { className: 'glide__bullet' })
                )
              )
            )
          ),
          // pitbar
          h('section', { className: 'pitbar' },
            h('div', { className: 'container' },
              h('div', { className: 'row align-items-center pitbar__nav' },
                h('div', { className: 'col-auto col-sm-6 col-lg' },
                  h('a', { className: 'pitbar__item' },
                    h('span', { className: 'rounded-icon' }, h('i', { className: 'fas fa-shipping-fast' })),
                    h('div', { className: 'ml-2 ml-md-3' }, 'Entregamos para todo o Brasil')
                  )
                ),
                h('div', { className: 'col-auto col-sm-6 col-lg' },
                  h('a', { className: 'pitbar__item' },
                    h('span', { className: 'rounded-icon' }, h('i', { className: 'fas fa-credit-card' })),
                    h('div', { className: 'ml-2 ml-md-3' }, 'Parcele sem juros')
                  )
                ),
                h('div', { className: 'col-auto col-sm-6 col-lg' },
                  h('a', { className: 'pitbar__item' },
                    h('span', { className: 'rounded-icon' }, h('i', { className: 'fas fa-exchange-alt' })),
                    h('div', { className: 'ml-2 ml-md-3' }, 'Não gostou? A primeira troca é gratuita')
                  )
                ),
                h('div', { className: 'col-auto col-sm-6 col-lg' },
                  h('a', { className: 'pitbar__item' },
                    h('span', { className: 'rounded-icon' }, h('i', { className: 'fas fa-percent' })),
                    h('div', { className: 'ml-2 ml-md-3' }, 'Diferentes promoções ao longo do ano!')
                  )
                )
              )
            )
          ),
          // home
          h('div', { className: 'home container py-1 py-sm-2 py-lg-4' },
            h('section', { className: 'products-carousel' },
              h('h4', { className: 'products-carousel__title' }, h('a', null, 'Produtos populares')),
              h('div', { className: 'glide' },
                h('div', { className: 'glide__track' },
                  h('ul', { className: 'glide__slides products-carousel__list' },
                    h('li', { className: 'glide__slide products-carousel__item' },
                      h('div', { className: 'product-card' },
                        h('a', { className: 'product-card__link' },
                          h('div', { className: 'product-card__picture' }, h('img', { className: 'product-card__picture fade lozad img-fluid', src: 'https://ecom-ptqgjveg.nyc3.digitaloceanspaces.com/imgs/400px/@1550858157657-notebook-d-ell-i5577-7152.jpg' })),
                          h('h3', { className: 'product-card__name' }, 'Notebook Gaming Dell I5577-7152 15.6&#34; I7 2.8GHZ 4GB 1TB Preto')
                        ),
                        h('div', { className: 'product-card__info' },
                          h('div', { className: 'spinner-border spinner-border-sm' },
                            h('span', { className: 'sr-only' }, 'Loading...')
                          )
                        )
                      )
                    )
                  ),
                  h('div', { className: 'glide__arrows glide__arrows--outer' },
                    h('button', { className: 'btn glide__arrow glide__arrow--left' }, h('i', { className: 'fas fa-chevron-left' })),
                    h('button', { className: 'btn glide__arrow glide__arrow--right' }, h('i', { className: 'fas fa-chevron-right' }))
                  )
                )
              )
            )
          )
        )
      )
    );
  }
});

export default HomePreview
