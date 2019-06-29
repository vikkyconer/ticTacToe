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
        startPlayer: userId
      })
      await User.setAvailablePlayer(userId, false)
      await User.setAvailablePlayer(availablePlayer['_id'], false)
      ctx.response.body = { success: true, message: `${availablePlayer.name} Ready to play`, response: availablePlayer }
    }
  }
}

module.exports = {
  start
}
