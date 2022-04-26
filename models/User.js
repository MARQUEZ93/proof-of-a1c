import mongoose from 'mongoose';
import { dexcomService, utilsService } from '../services';
import moment from 'moment';
import A1C from './A1C';

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    // TODO: make it unique for production
    // unique: true,
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

// query all 1-month blood-sugar averages after a user is created
UserSchema.post('save', async function postSave(doc) {

  try {

    const userId = doc.id;

    const a1c = await A1C.create({ 
      user: userId, 
      start: "2021-11-21T01:24:49",
      end: "2022-01-21T01:24:49",
      value: "128"
    });

    // const decryptedAccessToken = await utilsService.decryptToken(doc.access_token_content, doc.access_token_iv);
    // const { start, end } = await dexcomService.getDataRange(doc, decryptedAccessToken);

    // const startDate = moment(start.systemTime);
    // const oneMonthFromStartDate = moment(start.systemTime).add(1, 'month');
    // const endDate = moment(end.systemTime);
  
    // let count = 0;
  
    // record blood sugar value for every 1 month
    //TODO error handling on bad request w/ time range (think feb 30 etc - does moment handle that?)
    // while (startDate.isBefore(endDate) && oneMonthFromStartDate.isBefore(endDate) && oneMonthFromStartDate.isAfter(startDate)){
    //   count++;
    //   // prevent too many requests during testing
    //   // if (count > 17){
    //     // const {mean} = await dexcomService.getStats(decryptedAccessToken, 
    //     //   startDate.toISOString().slice(0, 19), oneMonthFromStartDate.toISOString().slice(0, 19)
    //     // );
    
    //     const a1c = await A1C.create({ 
    //       user: userId, 
    //       start: startDate.toISOString().slice(0, 19),
    //       end: oneMonthFromStartDate.toISOString().slice(0, 19),
    //       value: parseInt("128").toString()
    //     });
      // }
      // startDate.add(1, 'month');
      // oneMonthFromStartDate.add(1, 'month');
    // }

    const { web3 } = await utilsService.connectWallet();

    // send contract 0.01 LINK
    const sendChainRes = await utilsService.sendChain(doc.contract, web3);

    const sendEth = await utilsService.sendEth(doc.contract, web3);

    const timeRangeString = "2021-11-21T01:24:492022-01-21T01:24:49";

    // get proof of A1C
    const reqRes = await utilsService.requestProofOfA1C(doc.contract, 
      timeRangeString, web3);

    // reward diabetic
    // const rewardDiaRes = await utilsService.rewardDiabetic(doc.contract, web3);

    // res.status(201).json({ success: true, data: user });
  } catch (err){
  }

});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);