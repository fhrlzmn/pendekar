'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';

import { adminLoginSchema, userLoginSchema } from '@/schema/login';
import { signIn } from '@/auth';

export async function adminLogin(values: z.infer<typeof adminLoginSchema>) {
  const validatedFields = adminLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Username atau password salah' };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn('admin', {
      username,
      password,
      redirectTo: '/admin/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Username atau password salah' };
        case 'CallbackRouteError':
          return { error: 'Username atau password salah' };
        default:
          return { error: 'Terdapat kesalahan' };
      }
    }

    throw error;
  }

  return { success: 'Login sukses' };
}

export async function userLogin(values: z.infer<typeof userLoginSchema>) {
  const validatedFields = userLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'NIK atau PIN salah' };
  }

  return { success: 'Login sukses' };
}
