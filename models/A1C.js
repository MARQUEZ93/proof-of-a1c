import mongoose from 'mongoose';

const A1CSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  start: String,
  end: String,
  value: String
});

module.exports = mongoose.models.A1C || mongoose.model('A1C', A1CSchema)