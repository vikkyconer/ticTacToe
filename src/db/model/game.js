const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
  player1: String,
  player2: String,
  player1Moves: Array,
  player2Moves: Array,
  winner: Number,
  winnerPlayer: String,
  startPlayer: String,
  currentPlayer: String,
  currentPiece: Number,
  board: Array,
  finished: Boolean
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game
