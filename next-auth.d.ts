import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id?: string;
    name?: string | null;
    nik?: string;
    username?: string;
    role?: 'ADMIN' | 'USER';
  }
  interface Session {
    user: {
      id?: number | string;
      name?: string;
      nik?: string;
      username?: string;
      role?: 'ADMIN' | 'USER';
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    name?: string | null;
    nik?: string;
    username?: string;
    role?: 'ADMIN' | 'USER';
  }
}
