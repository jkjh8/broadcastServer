const express = require('express')

const app = express()
const router = require('./routes/index')

app.get('*', (req, res, next) => {
  console.log('req.secure == ' + req.secure)

  if (req.secure) {
    // --- https
    next()
  } else {
    // -- http
    let to = 'https://' + req.headers.host + req.url
    console.log('to ==> ' + to)

    return res.redirect('https://' + req.headers.host + req.url)
  }
})

app.use('/', router)

module.exports = app
