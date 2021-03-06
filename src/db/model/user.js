const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  availability: Boolean,
  currentGameId: String
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
