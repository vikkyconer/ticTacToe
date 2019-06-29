const User = require('../db/services/user')
const Game = require('../db/services/game')

async function start(ctx) {
  const userId = ctx.state.user.userId
  const user = await User.get(userId)
  if(!user.availability) {
    ctx.response.body = { success: false, message: 'You are already in a game' , response: null}
  } 
  else {
    const availablePlayer = await User.getAvailablePlayer(userId)
    if(!availablePlayer) {
      ctx.response.body = { success: false, message: 'No Available Player', response : null }
    }
    else {
      const response = await Game.add({
        player1: userId,
        player2: availablePlayer['_id'],
        player1Moves: [],
        player2Moves: [],
        winner: 0,
        startPlayer: userId,
        currentPlayer: userId,
        currentPiece: 0,
        board: [[-1,-1,-1], [-1,-1,-1], [-1,-1,-1]]
      })
      await User.update(userId, {
        '$set': { availability: false, currentGameId: response['_id']}
      })
      await User.update(availablePlayer['_id'], {
        '$set': { availability: false, currentGameId: response['_id'] }
      })
      ctx.response.body = { success: true, message: `${availablePlayer.name} Ready to play`, response: availablePlayer }
    }
  }
}

async function move(ctx) {
  const userId = ctx.state.user.userId
  const body = ctx.request.body
  const user = await User.get(userId)
  const gameId = user.currentGameId
  const game = await Game.get(gameId)
  if(game.currentPlayer !== userId) {
    ctx.response.body = { success: false, message: 'Not your turn', response: null }
  } else {
    const { board, isValidMove } = getUpdatedBoard(game.board, body.move, game.currentPiece)
    if(!isValidMove) {
      ctx.response.body = { success: false, message: 'Wrong move', response: game.board }
    }
    else {
      const isPlayer1 = game.player1 === userId ? true : false
      const response = await Game.update(gameId, 
        { '$set': {
          player1Moves: isPlayer1 ? game.player1Moves.push(JSON.stringify(body.move)) : game.player1Moves,
          player2Moves: !isPlayer1 ? game.player2Moves.push(JSON.stringify(body.move)) : game.player2Moves,
          currentPlayer: isPlayer1 ? game.player2 : game.player1,
          currentPiece: game.currentPiece === 0 ? 1 : 0,
          board
        }})
      console.log('response: ', response)
      ctx.response.body = { success: true, message: 'Successfully played your move', response: response.board }
    }
  }
}

function getUpdatedBoard(currentBoard, move, piece) {
  if(currentBoard[move[0]][move[1]] !== -1) {
    return { board: currentBoard, isValidMove: false }
  }
  currentBoard[move[0]][move[1]] = piece
  return { board: currentBoard, isValidMove: true }
}

module.exports = {
  start,
  move
}
