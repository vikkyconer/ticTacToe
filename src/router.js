const Router = require('koa-router')

const userRouter = require('./user/router')
const gameRouter = require('./game/router')

const router = new Router({ prefix: '/api' })

router.use(userRouter.routes(), userRouter.allowedMethods())
router.use(gameRouter.routes(), gameRouter.allowedMethods())

module.exports = router
