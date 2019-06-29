const validation = require('../../validation')
const { objectValidator, stringValidator } = validation

const add = objectValidator.keys({
  name: stringValidator.required(),
  email: stringValidator.required()
})

module.exports = add
