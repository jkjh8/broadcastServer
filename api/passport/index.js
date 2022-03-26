const passport = require('passport')
const local = require('./localStrategy')
const User = require('db/models/user')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findOne({ id: id }, { password: 0 }, (err, user) => {
      done(err, user)
    })
  })
  local()
}
