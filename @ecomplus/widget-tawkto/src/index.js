export default options => {
  if (options && options.tawktoPropertyId) {
    console.log('Tawk.to widget started with EJS appends')
  } else {
    console.error(new Error('Can\'t setup Tawk.to widget without `tawktoPropertyId` option'))
  }
}
