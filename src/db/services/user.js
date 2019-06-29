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

function getAvailablePlayer(userId) {
  return new Promise((resolve, reject) => {
    User.findOne({availability: true, '_id': { $ne: userId }},
      (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

async function setAvailablePlayer(userId, availability) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({
      '_id': userId
    }
    , {
      $set: {
        availability
      }
    }, (error, result) => {
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
  get,
  getAvailablePlayer,
  setAvailablePlayer
}
