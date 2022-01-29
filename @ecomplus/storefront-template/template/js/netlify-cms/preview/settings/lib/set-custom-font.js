export default fontFamily => {
  let fontSans = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue"'
  let fontLink = ''
  if (fontFamily && fontFamily !== '_') {
    fontSans = `"${fontFamily}", ${fontSans}`
    const fontUrl = 'https://fonts.googleapis.com/css2' +
      `?family=${fontFamily.replace(/\s+/g, '+')}` +
        ':wght@300;400;700&display=swap'
    fontLink = `<link href="${fontUrl}" rel="stylesheet">`
  }
  return `
<style>
body {
  font-family: ${fontSans};
}
</style>
${fontLink}
`
}
