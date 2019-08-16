import Slideout from 'slideout'

// setup touch sandwich menu
const slideout = new Slideout({
  panel: document.getElementById('main'),
  menu: document.getElementById('sidenav'),
  padding: 256,
  tolerance: 70
})
setTimeout(() => slideout.open(), 1000)
