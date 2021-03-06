/*    env file and path     */
const path = require('path')
require('dotenv').config()
require('app-module-path').addPath(__dirname)

/****** connect db ******/
require('./db')

/****** init express ******/
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const httpLogger = require('morgan')
const app = express()

/******     logger      ******/
app.logger = require('./config/logger')

// ****** session mongodb setup ******
const session = require('express-session')
const MongoStore = require('connect-mongo')

// ****** Cors ******
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, origin)
    },
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
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL
    })
  })
)

/****** passport init ******/
const passportConfig = require('api/passport')
passportConfig()
app.use(passport.initialize())
app.use(passport.session())

// ****** Static Folders ******
app.use(express.static(path.join(__dirname, 'public')))

// ****** loag Router ******
const router = require('./routes/index')

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

const spawn = require('child_process').spawn
const result = spawn('python', ['./py/barix.py'])

result.stdout.on('data', function (data) {
  console.log(data.toString())
})
module.exports = app
