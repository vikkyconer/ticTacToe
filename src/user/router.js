const Router = require('koa-router')
const handler = require('./handler')
const userContract = require('./contract')
const { isValid } = require('../validation')

const router = new Router({ prefix: '/user' })

router.post('/add', isValid(userContract.add), handler.add)

module.exports = router
