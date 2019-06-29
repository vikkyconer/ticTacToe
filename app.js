const koa = require('koa')
const koaBody = require('koa-body')(({ multipart: true}))
const router = require('./src/router')

const app = new koa()

app.use(koaBody)
app.proxy = true

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(1235, () => {
  console.log(`Running server and Listening on port :`, 1235)
})
