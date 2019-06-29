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
        winnerPlayer: null,
        startPlayer: userId,
        currentPlayer: userId,
        currentPiece: 0,
        board: [[-1,-1,-1], [-1,-1,-1], [-1,-1,-1]],
        finished: false
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
  if(game.finished) {
    await User.setAvailablePlayer(game.player1, true)
    await User.setAvailablePlayer(game.player2, true)
    ctx.response.body = { success: false, message: 'game already finished', response: null }
  }
  else {
    if(game.currentPlayer !== userId) {
      ctx.response.body = { success: false, message: 'Not your turn', response: null }
    } else {
      const { board, isValidMove } = getUpdatedBoard(game.board, body.move, game.currentPiece)
      if(!isValidMove) {
        ctx.response.body = { success: false, message: 'Wrong move', response: game.board }
      }
      else {
        const { winner, winnerPlayer, finished } = checkWinner(board, game.currentPlayer)
        const isPlayer1 = game.player1 === userId ? true : false
        var player1Moves = game.player1Moves
        var player2Moves = game.player2Moves
        if(isPlayer1) {
          player1Moves.push(JSON.stringify(body.move))
        }
        else {
          player2Moves.push(JSON.stringify(body.move))
        }
        const response = await Game.update(gameId, 
          { '$set': {
            player1Moves, 
            player2Moves,
            currentPlayer: isPlayer1 ? game.player2 : game.player1,
            currentPiece: game.currentPiece === 0 ? 1 : 0,
            board,
            winner,
            winnerPlayer,
            finished
          }})
        console.log('response: ', response)
        ctx.response.body = { success: true, message: 'Successfully played your move', response: response.board }
      }
    }
  }
}

function checkWinner(board, currentPlayer) {
  var response = checkVertical(board, currentPlayer)
  if(response.isWin) {
    return { winner: response.winner, winnerPlayer: response.winnerPlayer, finished: true }
  }
  response = checkHorizontal(board, currentPlayer)
  if(response.isWin) {
    return { winner: response.winner, winnerPlayer: response.winnerPlayer, finished: true }
  }
  response = checkDiagonal(board, currentPlayer)
  if(response.isWin) {
    return { winner: response.winner, winnerPlayer: response.winnerPlayer, finished: true }
  }
  const finished = isFinished(board)
  return { winner: 0, winnerPlayer: null, finished }
}

function checkVertical(board, currentPlayer) {
  var winner = 0
  var winnerPlayer = null
  var isWin = false
  for(var i = 0; i < 3; i++) {
    if(board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== -1) {
      winner = board[i][i]
      winnerPlayer = currentPlayer
      isWin = true
    }
  }
  return { winner, winnerPlayer, isWin }
}

function checkHorizontal(board, currentPlayer) {
  var winner = 0
  var winnerPlayer = null
  var isWin = false
  for(var i = 0; i < 3; i++) {
    if(board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== -1) {
      winner = board[i][i]
      winnerPlayer = currentPlayer
      isWin = true
    }
  }
  return { winner, winnerPlayer, isWin }
}

function checkDiagonal(board, currentPlayer) {
  var winner = 0
  var winnerPlayer = null
  var isWin = false
  if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== -1) {
    winner = board[0][0]
    winnerPlayer = currentPlayer
    isWin = true
  }
  else if(board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== -1) {
    winner = board[0][2]
    winnerPlayer = currentPlayer
    isWin = true
  }
  return { winner, winnerPlayer, isWin }
}

function isFinished(board) {
  var finished = true
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      if(board[i][j] === -1) {
        finished = false
      }
    }
  }
  return finished
}

function getUpdatedBoard(currentBoard, move, piece) {
  if(currentBoard[move[0]][move[1]] !== -1) {
    return { board: currentBoard, isValidMove: false }
  }
  currentBoard[move[0]][move[1]] = piece
  return { board: currentBoard, isValidMove: true }
}

async function status(ctx) {
  const userId = ctx.state.user.userId
  const user = await User.get(userId)
  const gameId = user.currentGameId
  const game = await Game.get(gameId)
  ctx.response.body = game
}

module.exports = {
  start,
  move,
  status
}
