'use server';

import { z } from 'zod';

import { adminLoginSchema, userLoginSchema } from '@/schema/login';

export async function adminLogin(values: z.infer<typeof adminLoginSchema>) {
  const validatedFields = adminLoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Username atau password salah' };
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
