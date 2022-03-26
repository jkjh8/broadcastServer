exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).json({ user: null, message: '로그인이 필요합니다.' })
  }
}
