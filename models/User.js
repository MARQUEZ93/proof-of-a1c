import mongoose from 'mongoose';
import { dexcomService, utilsService } from '../services';
import moment from 'moment';
import A1C from './A1C';

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true
  },
  refresh_token_content: {
    type: String,
    required: true
  },
  refresh_token_iv: {
    type: String,
    required: true
  },
  access_token_content: {
    type: String,
    required: true
  },
  access_token_iv: {
    type: String,
    required: true
  },
  contract: {
    type: String,
    unique: true,
    required: true
  }
});

// query all 3-month A1Cs after a user is created
UserSchema.post('save', async function postSave(doc) {

  try {

    const decryptedAccessToken = await utilsService.decryptToken(doc.access_token_content, doc.access_token_iv);
    const { start, end } = await dexcomService.getDataRange(doc, decryptedAccessToken);
  
    const startDate = moment(start.systemTime);
    const threeMonthsFromStartDate = moment(start.systemTime).add(3, 'month');
    const endDate = moment(end.systemTime);
  
    const userId = doc.id;
  
    // record blood sugar value for every 3 months
    while (startDate.isBefore(endDate) && threeMonthsFromStartDate.isBefore(endDate)){
      const {mean} = await dexcomService.getStats(decryptedAccessToken, 
        startDate.toISOString().slice(0, 19), threeMonthsFromStartDate.toISOString().slice(0, 19)
      );
  
      const a1c = await A1C.create({ 
        user: userId, 
        start: startDate.toISOString().slice(0, 19),
        end: threeMonthsFromStartDate.toISOString().slice(0, 19),
        value: parseInt(mean).toString()
      });
      startDate.add(3, 'month');
      threeMonthsFromStartDate.add(3, 'month');
    }

    // send contract 0.1 LINK
    await utilsService.sendChain(doc.contract);
    // get proof of A1C
    await utilsService.requestProofOfA1C(doc.contract, 
      startDate.toISOString().slice(0, 19) + threeMonthsFromStartDate.toISOString().slice(0, 19) );
    // reward diabetic
    await utilsService.rewardDiabetic(doc.contract);
  
    res.status(200).json({ success: true, data: user });
  } catch (err){
    console.log(err);
  }

});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);