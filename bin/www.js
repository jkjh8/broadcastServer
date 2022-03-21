const logger = require('../config/logger')
const fs = require('fs')
const app = require('../app')
const https = require('https')
const http = require('http')

// make HTTPS Server
const httpsServer = https.createServer(
  {
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.pem')
  },
  app
)

httpsServer.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  switch (error.code) {
    case 'EACCES':
      logger.error(3443 + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      logger.error(3443 + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
})

httpsServer.on('listening', () => {
  logger.info('Listening HTTPS on ' + 3443)
})

httpsServer.listen(3443)

//make http Server
const httpServer = http.createServer(app)
httpsServer.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  switch (error.code) {
    case 'EACCES':
      logger.error(3000 + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      logger.error(3000 + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
})

httpServer.on('listening', () => {
  logger.info('Listening HTTP on ' + 3000)
})

httpServer.listen(3000)
