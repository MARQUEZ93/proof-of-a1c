import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  address: String,
  access_token: String,
  refresh_token: String,
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);