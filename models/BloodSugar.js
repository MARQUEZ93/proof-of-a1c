import mongoose from 'mongoose';
import User from './User';

const BloodSugarSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  startRange: String,
  endRange: String,
  value: String
});

module.exports = mongoose.models.BloodSugar || mongoose.model('BloodSugar', BloodSugarSchema)