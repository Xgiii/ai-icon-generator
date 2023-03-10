import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { connectToDb } from '../../utils/db';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'signin required' });
  }
  const { user } = session;

  try {
    const client = await connectToDb();
    const usersCol = client.db().collection('users');
    const foundedUser = await usersCol.findOne({ email: user?.email });

    const icons = foundedUser?.icons.reverse();
    client.close();
    res.status(201).json(icons);
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: 'something went wrong' });
  }
}
