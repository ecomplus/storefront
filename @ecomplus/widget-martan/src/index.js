export default options => {
  if (options && options.martanStoreId && options.martanWidgetKey) {
    console.log('Martan widget started with EJS appends')
  } else {
    console.error(new Error('Can\'t setup Martan widget without `martanStoreId` and `martanWidgetKey`'))
  }
}
