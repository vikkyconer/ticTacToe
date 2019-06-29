const Router = require('koa-router')
const handler = require('./handler')
const { isValid } = require('../validation')
const authentication = require('../authentication')

const router = new Router({ prefix: '/game' })

router.get('/start', authentication.isAuth, handler.start)

module.exports = router
