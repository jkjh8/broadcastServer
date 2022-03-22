const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send(
    '<div><span><H1>First Page</H1></span><span>not thing...</span></div>'
  )
})
router.use('/api', require('./api'))
module.exports = router
