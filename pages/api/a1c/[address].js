import dbConnect from '../../../lib/dbconnect';

import A1C from '../../../models/A1C';
import User from '../../../models/User';

export default async function handler (req, res) {
    // TODO santize user input ???
  const { query: { address }, method } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // get user
        const user = await User.find({ address }).select('_id').exec();
        // get all a1cs that belong to the address
        const a1cs = await A1C.find({ user: user[0]._id.toString() }).select('start end value -_id').exec();
        res.status(200).json({ success: true, data: a1cs });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}