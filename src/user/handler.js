const User = require('../db/services/user')
const appUtil = require('../util')

async function add(ctx) {
  const body = ctx.request.body
  const model = {
    ...body,
    password : appUtil.createHash(body.password)
  }
  const response = await User.add(model)
  if(response) {
    ctx.response.body = { success: true, message: 'signup successfully', response }
  }
  else {
    ctx.response.body = { success: false, message: 'unable to signup successfully', response }
  }
}

async function login(ctx) {
  const body = ctx.request.body
  const user = await User.getByEmail(body.email)
  if(user && user.password === appUtil.createHash(body.password)) {
    ctx.state.user.userId = user['_id']
    ctx.response.body = { success: true, message: 'logged in successfully', response: user}
  }
  else {
    ctx.response.body = { success: false, message: 'Email/Password wrong', response: null}
  }
}

async function getProfile(ctx) {
  const userId = ctx.state.user.userId
  const user = await User.get(userId)
  ctx.response.body = user
}

module.exports = {
  add,
  login,
  getProfile
}
