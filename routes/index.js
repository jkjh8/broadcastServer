const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send(200, 'open server!!!')
})

module.exports = router
