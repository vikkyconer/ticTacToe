const Router = require('koa-router')
const handler = require('./handler')
const { isValid } = require('../validation')
const authentication = require('../authentication')
const gameContract = require('./contract')

const router = new Router({ prefix: '/game' })

router.get('/start', authentication.isAuth, handler.start)
router.post('/move', authentication.isAuth, isValid(gameContract.move), handler.move)
router.get('/status', authentication.isAuth, handler.status)

module.exports = router
