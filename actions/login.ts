'use server';

import { z } from 'zod';

import { adminLoginSchema } from '@/schema/login';

export async function adminLogin(values: z.infer<typeof adminLoginSchema>) {
  const validatedFields = adminLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Username atau password salah' };
  }

  return { success: 'Login success' };
}
