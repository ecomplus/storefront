import * as PhotoSwipe from 'photoswipe'
import * as psUi from 'photoswipe/dist/photoswipe-ui-default'

const $pswp = document.getElementsByClassName('pswp')[0]
if ($pswp) {
  window.storefront.photoswipe = (psImages, index) => {
    const photoswipe = new PhotoSwipe($pswp, psUi, psImages, { index })
    photoswipe.init()
  }
}
