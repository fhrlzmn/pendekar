import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { adminLoginSchema, userLoginSchema } from '@/schema/login';
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
    Credentials({
      id: 'user',
      name: 'User',
      credentials: {
        nik: { label: 'NIK', type: 'text' },
        pin: { label: 'PIN', type: 'password' },
      },
      authorize: async (credentials, _req) => {
        const validatedFields = await userLoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            nik: credentials.nik as string,
          },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          validatedFields.data.pin,
          user.pin
        );

        if (!passwordMatch) return null;

        return {
          id: String(user.id),
          nik: user.nik,
          name: user.nama,
          role: 'USER',
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  callbacks: {
    jwt({ token, user }): JWT {
      if (user) {
        token.id = user.id;
        token.role = user.role;

        switch (user.role) {
          case 'ADMIN':
            token.username = user.username;
            break;
          case 'USER':
            token.nik = user.nik;
            break;
        }
      }
      return token;
    },
    session({ session, token }): DefaultSession {
      session.user.role = token.role;
      switch (token.role) {
        case 'ADMIN':
          session.user.username = token.username;
          break;
        case 'USER':
          session.user.nik = token.nik;
          break;
      }
      return session;
    },
  },
});
