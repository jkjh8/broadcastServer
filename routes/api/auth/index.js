const express = require('express')
const router = express.Router()

const User = require('db/models/user')

router.get('/', (req, res, next) => {
  res.send('<h2>API AUTH First Page</h2>')
})

router.get('/checkEmail', async (req, res) => {
  try {
    const { email } = req.query
    // console.log(email)
    const r = await User.findOne({ email: email })
    if (r) {
      res.status(200).json({ user: r, status: true })
    } else {
      res.status(200).json({ user: null, status: false })
    }
  } catch (err) {
    res.status(500).json({ error: err, status: false })
  }
})

router.post('/register', async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body
  const r = await User.findOne({ email: email })
  if (r) {
    return res.status(403).json({ message: '사용중인 이메일 입니다.' })
  }
})

module.exports = router
