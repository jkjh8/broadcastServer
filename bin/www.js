const logger = require('../config/logger')

const path = require('path')
const fs = require('fs')
const app = require('../app')
const https = require('https')
const http = require('http')
const port = process.env.PORT || 443

const options = {
  key: fs.readFileSync('ssl/server.key'),
  cert: fs.readFileSync('ssl/server.pem')
}
const httpsServer = https.createServer(options, app)
const httpServer = http.createServer(app)

httpsServer.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
})

httpsServer.on('listening', () => {
  const addr = httpsServer.address()
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  logger.info('Listening on ' + bind)
})

httpsServer.listen(port)
httpServer.listen(80)
