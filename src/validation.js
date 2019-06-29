const validator = require('joi')

function isValid(contract) {
  return async (ctx, next) => {
    const result = validator.validate(ctx.request.body, contract, {
      abortEarly: true
    })
    if (result.error) {
      ctx.body = result.error
      ctx.status = 400
    } else {
      ctx.body = result.value
      await next()
    }
  }
}

module.exports = {
  isValid,
  objectValidator: validator.object(),
  stringValidator: validator.string(),
  numberValidator: validator.number(),
  booleanValidator: validator.boolean(),
  arrayValidator: validator.array(),
  anyValidator: validator.any(),
  dateValidator: validator.date()
}
