const User = require('../db/services/user')

async function add(ctx) {
  const response = await User.add({name: 'Vikas', email: 'vikaschandra893@gmail.com'})
  if(response) {
    ctx.response.body = { success: true, message: 'signup successfully', response }
  }
  else {
    ctx.response.body = { success: false, message: 'unable to signup successfully', response }
  }
}

module.exports = {
  add
}
