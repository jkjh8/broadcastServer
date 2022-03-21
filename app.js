const express = require('express')
const cors = require('cors')
const app = express()
app.use(
  cors({
    origin: ['https://locahost:3443', 'http://localhost:3000'],
    credentials: true
  })
)
const router = require('./routes/index')

// redirect to HTTPS
// app.get('*', (req, res, next) => {
//   console.log('req.secure == ' + req.secure)
//   if (req.secure) {
//     next()
//   } else {
//     return res.redirect('https://' + req.headers.host + req.url)
//   }
// })

app.use('/', router)

module.exports = app
