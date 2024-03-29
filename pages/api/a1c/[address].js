import dbConnect from '../../../lib/dbconnect';
import A1C from '../../../models/A1C';
import User from '../../../models/User';

export default async function handler (req, res) {
  const { query: { address }, method } = req;
  const lowerCaseAddress = address.toLowerCase(); 
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.find({ lowerCaseAddress }).select('_id').exec();
        const a1cs = await A1C.find
          ({ user: user[0]._id.toString() })
          .select('start end value -_id').exec();
        res.status(200).json({ success: true, data: a1cs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}