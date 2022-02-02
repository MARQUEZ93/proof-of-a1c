import mongoose from 'mongoose';
import { dexcomService, utilsService } from '../services';
import moment from 'moment';
import A1C from './A1C';

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    unique: true
  },
  refresh_token_content: String,
  refresh_token_iv: String,
  access_token_content: String,
  access_token_iv: String
});
// query all weekly A1Cs after a user is created
UserSchema.post('save', async function postSave(doc) {

  try {

    const decryptedAccessToken = await utilsService.decryptToken(doc.access_token_content, doc.access_token_iv);
    // TODO see if user has a1cs yet
    const { start, end } = await dexcomService.getDataRange(doc, decryptedAccessToken);
  
    const startDate = moment(start.systemTime);
    const oneWeekFromStartDate = moment(start.systemTime).add(1, 'week');
    const endDate = moment(end.systemTime);
  
    const userId = doc.id;
    let count = 0;
  
    // record blood sugar value for every week
    while (startDate.isBefore(endDate) && oneWeekFromStartDate.isBefore(endDate)){
      const {mean} = await dexcomService.getStats(decryptedAccessToken, 
        startDate.toISOString().slice(0, 19), oneWeekFromStartDate.toISOString().slice(0, 19)
      );
  
      const a1c = await A1C.create({ 
        user: userId, 
        start: startDate.toISOString().slice(0, 19),
        end: oneWeekFromStartDate.toISOString().slice(0, 19),
        value: mean
      });
      startDate.add(1, 'week');
      oneWeekFromStartDate.add(1, 'week');
      // don't wanna make too many request(s) ATM
      count++;
      if (count > 3){
        return;
      }
    }
  
    // TODO hide data:user ???
    res.status(201).json({ success: true, data: user });
  } catch (err){
    console.log(err);
  }


    // get value from startTime + 1 week

    // save Blood Sugar w/ value, user, start, end

    // iterate startTime by 1 week 

    // compare new starTime to endTime to end the loop

});

// Will not execute until the first middleware calls `next()`
// UserSchema.post('save', function(doc, next) {
//   dexcomService.getDataRange(doc, decryptedAccessToken);
// });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);