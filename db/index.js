const mongoose = require('mongoose')
const logger = require('config/logger')

mongoose
  .connect('mongodb://localhost:27017/broadcastserver', {
    useNewUrlParser: true
  })
  .then(() => {
    logger.info('db Connected')
  })
  .catch((e) => {
    logger.error(`db Connection error ${e}`)
  })

module.exports = mongoose.connection
