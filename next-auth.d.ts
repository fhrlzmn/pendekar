import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id?: string;
    name?: string | null;
    username?: string;
    role?: 'ADMIN' | 'USER';
  }
  interface Session {
    user: {
      id?: number | string;
      username?: string;
      name?: string;
      role?: 'ADMIN' | 'USER';
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    name?: string | null;
    username?: string;
    role?: 'ADMIN' | 'USER';
  }
}
