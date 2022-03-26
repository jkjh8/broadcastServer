const express = require('express')
const passport = require('passport')
const router = express.Router()
const logger = require('config/logger')

const User = require('db/models/user')

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user })
  } else {
    res.send({ user: null })
  }
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
  const { name, email, password } = req.body
  const r = await User.findOne({ email: email })
  if (r) {
    return res.status(403).json({ message: '사용중인 이메일 입니다.' })
  }
  const user = new User({ name, email, password })
  try {
    await user.save()
    logger.info(`회원가입: ${email}`)
    return res.status(200).json(user)
  } catch (error) {
    logger.error(`회원가입오류 ${email}`)
    return res.status(500).json({ message: error.message })
  }
})

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ status: false, error: err })
    }
    if (!user) {
      return res.json({ status: false, ...info })
    }
    return req.login(user, (err) => {
      if (err) {
        return res.status(401).json({ status: false, error: err })
      }
      res.json({ status: true, ...info })
    })
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  try {
    req.logout()
    res.status(200).json({ user: null, message: 'logout completed' })
  } catch (error) {
    res.status(500).json({ user: null, message: 'logout failed' })
  }
})

module.exports = router
