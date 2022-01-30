import mongoose from 'mongoose';
import { dexcomService, utilsService } from '../services';
import moment from 'moment';
import BloodSugar from './BloodSugar';

const UserSchema = new mongoose.Schema({
  address: String,
  refresh_token_content: String,
  refresh_token_iv: String,
  access_token_content: String,
  access_token_iv: String,
  bloodsugars : [
    { type: mongoose.Schema.Types.ObjectId, ref: 'BloodSugar' }
  ]
});
// query all weekly A1Cs after a user is created
UserSchema.post('save', async function postSave(doc) {
  const decryptedAccessToken = await utilsService.decryptToken(doc.access_token_content, doc.access_token_iv);
  // TODO see if user has a1cs yet
  const { start, end } = await dexcomService.getDataRange(doc, decryptedAccessToken);

  const startDate = moment(start.systemTime);
  const oneWeekFromStartDate = moment(start.systemTime).add(1, 'week');
  const endDate = moment(end.systemTime);

  const userId = doc.id;

  // record blood sugar value for every week
  while (startDate.isBefore(endDate) && oneWeekFromStartDate.isBefore(endDate)){
    console.log(startDate.toISOString().slice(0, 19));
    const bloodSugarResult = await dexcomService.getBloodSugar(decryptedAccessToken, 
      startDate.toISOString().slice(0, 19), oneWeekFromStartDate.toISOString().slice(0, 19)
    );

    const bloodSugar = await BloodSugar.create({ 
      user: userId, 
      start: startDate.toISOString(),
      end: oneWeekFromStartDate.toISOString()
    });
    console.log(bloodSugar);
    startDate.add(1, 'week');
    oneWeekFromStartDate.add(1, 'week');

  return;
  // TODO hide data:user ???
  res.status(201).json({ success: true, data: user });


    // get value from startTime + 1 week

    // save Blood Sugar w/ value, user, start, end

    // iterate startTime by 1 week 

    // compare new starTime to endTime to end the loop


  }

});

// Will not execute until the first middleware calls `next()`
// UserSchema.post('save', function(doc, next) {
//   dexcomService.getDataRange(doc, decryptedAccessToken);
// });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);