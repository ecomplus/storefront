export default page => fetch(page).then(response => {
  return response.text()
})
