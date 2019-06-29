const validation = require('../../validation')
const { objectValidator, arrayValidator, numberValidator } = validation

const move = objectValidator.keys({
  move: arrayValidator.required().length(2).items(numberValidator.required())
})

module.exports = move
