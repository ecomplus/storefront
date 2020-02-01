export default page => window.fetch(page).then(response => {
  return response.text()
})
