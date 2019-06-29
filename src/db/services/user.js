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

function getByEmail(email) {
  return new Promise((resolve, reject) => {
    User.findOne({email},
      (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

function get(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId,
      (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

module.exports = {
  add,
  getByEmail,
  get
}
