import mongoose from 'mongoose';
import { dexcomService, utilsService } from '../services';

const UserSchema = new mongoose.Schema({
  address: String,
  refresh_token_content: String,
  refresh_token_iv: String,
  access_token_content: String,
  access_token_iv: String
});
// query all weekly A1Cs
UserSchema.post('save', doc => {
  const accessToken = utilsService.decryptToken(doc.access_token_content, doc.access_token_iv);
  console.log(accessToken);
  dexcomService.getDataRange(accessToken);
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);