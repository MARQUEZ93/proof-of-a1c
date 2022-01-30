import mongoose from 'mongoose';
import { dexcomService, utilsService } from '../services';
import moment from 'moment';

const UserSchema = new mongoose.Schema({
  address: String,
  refresh_token_content: String,
  refresh_token_iv: String,
  access_token_content: String,
  access_token_iv: String
});
// query all weekly A1Cs after a user is created
UserSchema.post('save', async function postSave(doc) {
  const decryptedAccessToken = await utilsService.decryptToken(doc.access_token_content, doc.access_token_iv);
  // TODO see if user has a1cs yet
  const { start, end } = await dexcomService.getDataRange(doc, decryptedAccessToken);

  let startTime = moment(start.systemTime);
  const endTime = moment(end.systemTime);
  

  while (startTime.isBefore(endTime) && startTime.add(1, 'week').isBefore(endTime)){

    const oneWeekAfter = startTime.add(1, 'week');

    // get value from startTime + 1 week

    // save Blood Sugar w/ value, user, start, end

    // iterate startTime by 1 week 

    // compare new starTime to endTime to end the loop


  }




  console.log(start);
  console.log(end);
});

// Will not execute until the first middleware calls `next()`
// UserSchema.post('save', function(doc, next) {
//   dexcomService.getDataRange(doc, decryptedAccessToken);
// });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);