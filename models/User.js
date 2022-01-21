import mongoose from 'mongoose'

const Userchema = new mongoose.Schema({
  name: String
})

module.exports = mongoose.models.User || mongoose.model('User', Userchema)