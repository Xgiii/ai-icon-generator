import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDb } from '../../../utils/db';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const client = await connectToDb();
      const usersCol = client.db().collection('users');

      const userInDb = await usersCol.findOne({ name: user.name });
      if (userInDb) {
        return true;
      }
      await usersCol.insertOne({
        name: user.name,
        email: user.email,
        image: user.image,
      });
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
