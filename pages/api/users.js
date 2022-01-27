import dbConnect from '../../lib/dbconnect';
import User from '../../models/User';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

export default async function handler (req, res) {
    // todo santize tokens
  const { method } = req;
  const secret = process.env.SECRET;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const session = await getSession({ req });
        if (!session) {
            res.status(400).json({ success: false });
        }
        const token = await getToken({ req, secret });
        const user = await User.create({address: req.body.address, refresh_token: token.refreshToken.content});
        res.status(201).json({ success: true, data: user });
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