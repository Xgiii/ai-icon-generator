import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { Configuration, OpenAIApi } from 'openai';
import { connectToDb } from '../../utils/db';
import cloudinary from 'cloudinary';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'signin required' });
  }

  const { user } = session;

  const { prompt, n, color, style } = req.body;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const iconPrompt = `icon of ${prompt} in ${color} ${style} iridescent material, 3D render isometric perspective on dark background`;
  try {
    const response = await openai.createImage({
      prompt: iconPrompt,
      n: +n,
      size: '1024x1024',
    });

    const client = await connectToDb();
    const usersCol = client.db().collection('users');

    for (let i = 0; i < response.data.data.length; i++) {
      const cloudinaryUrl = await cloudinary.v2.uploader.upload(
        response.data.data[i].url!
      );
      await usersCol.updateOne(
        { email: user?.email },
        { $push: { icons: cloudinaryUrl.url } }
      );
    }

    client.close();

    res.status(201).json({ data: response.data.data });
  } catch (error: any) {
    res.status(422).json({ message: error.message });
  }
}
