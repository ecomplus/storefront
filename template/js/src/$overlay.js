import EventEmitter from 'eventemitter3'

const $overlay = document.getElementById('overlay')
const emitter = new EventEmitter()

let hideTimer
const hide = () => {
  $overlay.classList.remove('show')
  hideTimer = setTimeout(() => {
    $overlay.style['z-index'] = -100
  }, 150)
  emitter.emit('hide')
}

const show = () => {
  $overlay.classList.add('show')
  $overlay.style['z-index'] = 1080
  clearTimeout(hideTimer)
  emitter.emit('show')
}

const methods = { show, hide }
;['on', 'off', 'once'].forEach(ev => {
  methods[ev] = (name, fn) => {
    emitter[ev](name, fn)
  }
})

$overlay.onclick = hide

export default methods
