const Router = require('koa-router')
const handler = require('./handler')
const { isValid } = require('../validation')

const router = new Router({ prefix: '/game' })

router.get('/start', handler.start)

module.exports = router
