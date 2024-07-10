'use server';

import prisma from '@/lib/prisma';
import { generateUserPin } from '@/lib/utils';
import { userAccountSchema } from '@/schema/accounts';
import { z } from 'zod';

export async function generateUserAccount(
  values: z.infer<typeof userAccountSchema>
) {
  const validatedFields = userAccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        nik: values.nik,
      },
    });

    if (user) {
      return { error: 'User sudah terdaftar' };
    }

    const password = await generateUserPin();

    // Save data to database
    await prisma.user.create({
      data: {
        nik: values.nik,
        nama: values.nama,
        pin: password.hashedPin,
      },
    });

    return { success: 'Berhasil generate user account', pin: password.pin };
  } catch (error) {
    return { error: 'Gagal generate user account' };
  }
}
