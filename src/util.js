const uuid = require('uuid/v4')
const crypto = require('crypto')

const createHash = (hashKey) => crypto.createHash('sha512').update(hashKey).digest('hex')

const randomString = () => uuid()

module.exports = {
  createHash,
  randomString
}
