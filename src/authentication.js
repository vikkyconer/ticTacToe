const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy

const isAuth = async (ctx, next) => {
  if(ctx.isAuthenticated()) {
    ctx.body = ctx.state.user
    await next()
  } else {
    ctx.body = {
      success: false,
      authenticated: false,
      message: 'User is not authorized',
      errorCode: 102
    }
    ctx.status = 203
  }
}

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
}, (req, email, password, done) => {
  process.nextTick(() => {
    return done(null, {email: req.body.email})
  })
}))

module.exports = {
  isAuth
}
