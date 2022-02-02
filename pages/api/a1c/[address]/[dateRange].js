import dbConnect from '../../../../lib/dbconnect';
import User from '../../../../models/User';
import A1C from '../../../../models/A1C';

export default async function handler (req, res) {
  const { query: {dateRange, address}, method } = req;
  const start = dateRange.slice(0, 19);
  const end = dateRange.slice(19, 38);
  await dbConnect();

  //TODO Sanitize

  switch (method) {
    case 'GET':
      try {
      // get user
        const user = await User.find({ address }).select('_id').exec();
       // get the a1c that belong to the address at that particular date range
        const a1c = await A1C.find({ user: user[0]._id.toString(), start: start, end: end }).select('start end value -_id').exec();
        res.status(200).json({ success: true, data: a1c });
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