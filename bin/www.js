const fs = require('fs')
const app = require('../app')
const https = require('https')
const http = require('http')

/***** make HTTPS Server ******/
const httpsServer = https.createServer(
  {
    key: fs.readFileSync('ssl/key.pem'),
    cert: fs.readFileSync('ssl/server.pem')
  },
  app
)

httpsServer.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  app.logger.error('HTTPS server start' + error)
  throw error
})

httpsServer.on('listening', () => {
  app.logger.info('Listening HTTPS on ' + 3443)
})

httpsServer.listen(3443)

/****** make http Server ******/
const httpServer = http.createServer(app)
httpServer.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  app.logger.error('HTTP server start' + error)
  throw error
})

httpServer.on('listening', () => {
  app.logger.info('Listening HTTP on ' + 3000)
})

httpServer.listen(3000)
