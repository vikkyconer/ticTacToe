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

module.exports = {
  add
}

