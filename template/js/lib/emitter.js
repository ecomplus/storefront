import EventEmitter from 'eventemitter3'

const emitter = new EventEmitter()
export default emitter

window.EventEmitter = EventEmitter

const events = {}
;['on', 'off', 'once'].forEach(method => {
  events[method] = (ev, fn) => {
    emitter[method](ev, fn)
  }
})
window._events = events

export { events, emitter }
