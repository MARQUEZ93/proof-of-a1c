import mongoose from 'mongoose';
import { dexcomService, utilsService } from '../services';

const UserSchema = new mongoose.Schema({
  address: String,
  refresh_token_content: String,
  refresh_token_iv: String,
  access_token_content: String,
  access_token_iv: String
});
// query all weekly A1Cs after a user is created
UserSchema.post('save', doc => {
  const decryptedAccessToken = utilsService.decryptToken(doc.access_token_content, doc.access_token_iv);
  // TODO see if user has a1cs yet
  dexcomService.getDataRange(doc, decryptedAccessToken);
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);