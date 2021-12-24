export const getColorYiq = (colorHex) => {
  const r = parseInt(colorHex.substr(1, 2), 16)
  const g = parseInt(colorHex.substr(3, 2), 16)
  const b = parseInt(colorHex.substr(5, 2), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? 'var(--gray-dark)' : 'var(--white)'
}

export const getColorRgb = (colorHex) => {
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  colorHex = colorHex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex)
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : null
}

export const darkenColor = (color, percent) => {
  // https://css-tricks.com/snippets/javascript/lighten-darken-color/#comment-1754753
  let usePound = false
  const amt = -percent
  if (color[0] === '#') {
    color = color.slice(1)
    usePound = true
  }
  const num = parseInt(color, 16)
  let r = (num >> 16) + amt
  if (r > 255) r = 255
  else if (r < 0) r = 0
  let b = ((num >> 8) & 0x00FF) + amt
  if (b > 255) b = 255
  else if (b < 0) b = 0
  let g = (num & 0x0000FF) + amt
  if (g > 255) g = 255
  else if (g < 0) g = 0
  ;[r, g, b] = [r, g, b].map(color => color <= 15 ? `0${color.toString(16)}` : color.toString(16))
  return (usePound ? '#' : '') + r + b + g
}
