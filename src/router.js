const Router = require('koa-router')

const userRouter = require('./user/router')

const router = new Router({ prefix: '/api' })

router.use(userRouter.routes(), userRouter.allowedMethods())

module.exports = router
