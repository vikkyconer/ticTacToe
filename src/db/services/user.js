const mongo = require('../../services/mongo')
const User = require('../model/user')

function add(userData) {
  const user = new User(userData)
  return new Promise((resolve, reject) => {
    user.save((error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

module.exports = {
  add
}
