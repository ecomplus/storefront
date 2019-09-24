import $ from './$'

const $wpLinks = $('.whatsapp-link')
for (let i = 0; i < $wpLinks.length; i++) {
  const $link = $wpLinks[i]
  const tel = $link.dataset.tel
  if (tel) {
    let href = 'https://' + (window.screen.width <= 575.98 ? 'api' : 'web') +
      '.whatsapp.com/send?phone=' + encodeURIComponent(tel)
    if ($link.dataset.text) {
      href += '&text=' + encodeURIComponent($link.dataset.text)
    }
    $link.setAttribute('href', href)
  }
}
