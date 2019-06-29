const koa = require('koa')
const koaBody = require('koa-body')(({ multipart: true}))
const router = require('./src/router')
const passport = require('koa-passport')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const app = new koa()

app.use(koaBody)
app.proxy = true

app.keys = ['ticTacToeSecret']
app.use(session({
  store: redisStore({
    host: 'localhost',
    port: 6379,
  }),
  key: 'ticTacToeKe',
}, app))

app.use(passport.initialize())
app.use(passport.session())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(1235, () => {
  console.log(`Running server and Listening on port :`, 1235)
})
