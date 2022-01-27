import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  address: String,
  refresh_token: String,
  access_token: String
});
// query all weekly A1Cs
UserSchema.post('save', doc => {
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);