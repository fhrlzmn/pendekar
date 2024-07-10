import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { adminLoginSchema } from '@/schema/login';
import prisma from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: 'admin',
      name: 'Admin',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, _req) => {
        const validatedFields = await adminLoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const admin = await prisma.admin.findFirst({
          where: {
            username: credentials.username as string,
          },
        });

        if (!admin) return null;

        const passwordMatch = await bcrypt.compare(
          validatedFields.data.password,
          admin.password
        );

        if (!passwordMatch) return null;

        return {
          id: String(admin.id),
          username: admin.username,
          name: admin.nama,
          role: 'ADMIN',
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  callbacks: {
    redirect({ url, baseUrl }): string {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    jwt({ token, user }): JWT {
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }): DefaultSession {
      session.user.username = token.username as string;
      session.user.role = token.role;
      return session;
    },
  },
});
