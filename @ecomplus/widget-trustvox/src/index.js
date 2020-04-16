export default options => {
  if (options && options.trustvoxStoreId) {
    console.log('Trustvox widget started with EJS appends')
  } else {
    console.error(new Error('Can\'t setup Trustvox widget without `trustvoxStoreId` option'))
  }
}
