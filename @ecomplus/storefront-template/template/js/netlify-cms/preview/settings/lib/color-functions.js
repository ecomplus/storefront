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
  const amt = percent < 0 ? percent * -5.25 : percent * -4
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
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

const bootswatchColors = {
  cerulean: {
    primary: '#2fa4e7',
    secondary: '#e9ecef'
  },
  cosmo: {
    primary: '#2780e3',
    secondary: '#373a3c'
  },
  cyborg: {
    primary: '#2a9fd6',
    secondary: '#555'
  },
  darkly: {
    primary: '#375a7f',
    secondary: '#444'
  },
  flatly: {
    primary: '#2c3e50',
    secondary: '#95a5a6'
  },
  journal: {
    primary: '#eb6864',
    secondary: '#aaa'
  },
  litera: {
    primary: '#4582ec',
    secondary: '#adb5bd'
  },
  lumen: {
    primary: '#158cba',
    secondary: '#f0f0f0'
  },
  lux: {
    primary: '#1a1a1a',
    secondary: '#919aa1'
  },
  materia: {
    primary: '#2196f3',
    secondary: '#666'
  },
  minty: {
    primary: '#78c2ad',
    secondary: '#f3969a'
  },
  pulse: {
    primary: '#593196',
    secondary: '#a991d4'
  },
  sandstone: {
    primary: '#325d88',
    secondary: '#8e8c84'
  },
  simplex: {
    primary: '#d9230f',
    secondary: '#777'
  },
  sketchy: {
    primary: '#333',
    secondary: '#555'
  },
  slate: {
    primary: '#3a3f44',
    secondary: '#7a8288'
  },
  solar: {
    primary: '#b58900',
    secondary: '#839496'
  },
  spacelab: {
    primary: '#446e9b',
    secondary: '#999'
  },
  united: {
    primary: '#e95420',
    secondary: '#aea79f'
  },
  yeti: {
    primary: '#008cba',
    secondary: '#adb5bd'
  }
}

const customThemesColors = {
  'clean-dark': {
    secondary: '#fff'
  },
  'clean-gray': {
    secondary: '#343a40'
  },
  'clean-white': {
    secondary: '#383d44'
  }
}

export const getThemeColors = (bootswatchTheme, customTheme, brandColors = {}) => {
  if (bootswatchTheme) {
    const bootswatchThemeColors = bootswatchColors[bootswatchTheme]
    if (bootswatchThemeColors) {
      brandColors = Object.assign(bootswatchThemeColors, brandColors)
    }
  }
  if (customTheme) {
    const customThemeColors = customThemesColors[customTheme]
    if (customThemeColors) {
      Object.assign(brandColors, customThemeColors)
    }
  }
  return brandColors
}
