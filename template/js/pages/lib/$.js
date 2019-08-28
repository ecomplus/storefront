export default selector => {
  if (selector.indexOf(' ') === -1) {
    switch (selector.charAt(0)) {
      case '#':
        return document.getElementById(selector.slice(1))
      case '.':
        return document.getElementsByClassName(selector.slice(1))
    }
  }
  return document.querySelector(selector)
}
