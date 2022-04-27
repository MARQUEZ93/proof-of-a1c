import dbConnect from '../../lib/dbconnect';
import User from '../../models/User';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export default async function handler (req, res) {
  const { method } = req;
  const secret = process.env.SECRET;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const session = await getSession({ req });
        if (!session) {
            res.status(402).json({ success: false });
        }
        const token = await getToken({ req, secret });
        const user = await User.create({ 
            address: req.body.address, 
            refresh_token_content: token.refreshToken.content, 
            refresh_token_iv: token.refreshToken.iv, 
            access_token_content: token.accessToken.content,
            access_token_iv: token.accessToken.iv,
            contract: req.body.contract
        });
        res.status(200).json({ success: true, data: { 
          address: user.address, 
          contract: user.contract
        }});
      } catch (error) {
        res.status(401).json({ success: false });
      }
      break;
    case 'GET':
      try {
        const session = await getSession({ req });
        if (!session) {
            res.status(402).json({ success: false });
        }
        let { address } = req.body; 
        address = address.toLowerCase();
        const user = await User.find({ address }).select('_id').exec();
        res.status(200).json({ success: true, data: { 
          contract: user.contract
        }});
      } catch (error) {
        res.status(401).json({ success: false });
      }
    break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}