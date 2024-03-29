import { MongoClient } from 'mongodb';

export async function connectToDb() {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  return client;
}
