import mongoose from 'mongoose';

const A1CSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.models.A1C || mongoose.model('A1C', A1CSchema)