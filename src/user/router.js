const Router = require('koa-router')
const handler = require('./handler')
const userContract = require('./contract')
const { isValid } = require('../validation')
const passport = require('koa-passport')
const authentication = require('../authentication')

const router = new Router({ prefix: '/user' })

router.post('/add', isValid(userContract.add), handler.add)
router.post('/login', isValid(userContract.login), passport.authenticate('local'), handler.login)
router.get('/profile', authentication.isAuth, handler.getProfile)

module.exports = router
