const mongo = require('../../services/mongo')
const Game = require('../model/game')

function add(gameData) {
  const game = new Game(gameData)
  return new Promise((resolve, reject) => {
    game.save((error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

function get(gameId) {
  return new Promise((resolve, reject) => {
    Game.findById(gameId,
      (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

async function update(userId, model) {
  return new Promise((resolve, reject) => {
    Game.findOneAndUpdate({
      '_id': userId
    }
    , model, {new: true}, (error, result) => {
      if (error) {
        reject(error)
      }
      resolve(result)
    })
  })
}

module.exports = {
  add,
  get,
  update
}

