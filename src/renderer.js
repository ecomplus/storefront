module.exports = (req, res, next) => {
  if (req.url === '/') {
    res.write(req.url + Math.random())
    res.end()
  } else {
    next()
  }
}
