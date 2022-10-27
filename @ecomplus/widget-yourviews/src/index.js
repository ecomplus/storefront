export default options => {
  if (options && options.yourviewsStoreId) {
    console.log('Yourviews widget started with EJS appends')
  } else {
    console.error(new Error('Can\'t setup yourviews widget without `yourviewsStoreId` option'))
  }
}
