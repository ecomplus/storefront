export default options => {
  if (options && (options.stamp || options.tagJs)) {
    console.log('Opiniões Verificadas widget started with EJS appends')
  } else {
    console.error(new Error('Can\'t setup Opiniões Veirificadas without `stamp` or `tagJs` options'))
  }
}
