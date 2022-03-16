import dbConnect from '../../../../lib/dbconnect';
import User from '../../../../models/User';
import A1C from '../../../../models/A1C';

export default async function handler (req, res) {
  const { query: { dateRange, address }, method } = req;
  const start = dateRange.slice(0, 19);
  const end = dateRange.slice(19, 38);
  const lowerCaseAddress = address.toLowerCase(); 
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const user = await User.find({ lowerCaseAddress }).select('_id').exec();
        const a1c = await A1C.find
          ({ user: user[0]._id.toString(), start: start, end: end })
          .select('start end value -_id').exec();
          
        if (a1c && a1c[0]){
          res.status(200).json({ success: true, data: a1c[0] });
        } else {
          res.status(400).json({ success: false });
        }
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