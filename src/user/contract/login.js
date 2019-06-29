const validation = require('../../validation')
const { objectValidator, stringValidator } = validation

const login = objectValidator.keys({
  email: stringValidator.required(),
  password: stringValidator.required()
})

module.exports = login
