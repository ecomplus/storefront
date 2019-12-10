export default (options = {}) => {
  const x = import(/* webpackChunkName: "debug" */ './debug.js')
  console.log(x)
}
