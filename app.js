require('dotenv').config()
require('app-module-path').addPath(__dirname)
const logger = require('./config/logger')
const path = require('path')

// ****** connect db ******
require('./db')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const httpLogger = require('morgan')

// ****** session mongodb setup ******
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')

// ****** Cors ******
app.use(
  cors({
    origin: ['https://locahost:3443', 'http://localhost:3000'],
    credentials: true
  })
)

// ****** server middleware ******
app.use(express.json())
app.use(httpLogger('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/broadcastserver'
    })
  })
)

// ****** Static Folders ******
app.use(express.static(path.join(__dirname, 'public')))

// ****** loag Router ******
const router = require('./routes/index')
const { default: mongoose } = require('mongoose')

// ****** redirect to HTTPS ******
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
