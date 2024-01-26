import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { mongooseConnect } from '@/lib/mongoose';

async function isAdminEmail(email) {
  mongooseConnect();
  return !!(await Admin.findOne({ email }));
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, token, user }) {
      console.log("Session:", session);
      console.log("Token:", token);
      console.log("User:", user);

      if (user && user.email) {
        const isAdmin = await isAdminEmail(user.email);
        if (isAdmin) {
          return session;
        } else {
          console.log("User is not an admin:", user.email);
          return false;
        }
      } else {
        console.log("No user or email found in session.");
        return false;
      }
    },
  },

};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!(await isAdminEmail(session?.user?.email))) {
    res.status(401);
    res.end();
    throw 'not an admin';
  }
}
