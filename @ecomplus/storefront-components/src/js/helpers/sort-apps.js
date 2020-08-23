export default (results, order) => {
  return results.sort((a, b) => {
    if (a.app_id === b.app_id) {
      return 0
    }
    const indexA = order.indexOf(a.app_id)
    const indexB = order.indexOf(b.app_id)
    return indexA > -1
      ? indexB > -1
        ? indexA < indexB ? -1 : 1
        : indexA > -1 ? -1 : 1
      : indexB > -1 ? 1 : 0
  })
}
