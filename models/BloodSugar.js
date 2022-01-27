import mongoose from 'mongoose';
const UserId = Schema.UserId;

const BloodSugarSchema = new mongoose.Schema({
  user: UserId,
  startRange: String,
  endRange: String,
  value: String
})

module.exports = mongoose.models.A1C || mongoose.model('BloodSugar', BloodSugarSchema)