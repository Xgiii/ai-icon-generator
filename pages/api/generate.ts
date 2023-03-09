import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt, n, color, style, shape } = req.body;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const iconPrompt = `icon of ${prompt} in ${color} ${style} iridescent material, ${shape} icon background, 3D render isometric perspective on dark background`;
  try {
    const response = await openai.createImage({
      prompt: iconPrompt,
      n: +n,
      size: '1024x1024',
    });

    res.status(201).json({ data: response.data.data });
  } catch (error: any) {
    res.status(422).json({ message: error.message });
  }
}
