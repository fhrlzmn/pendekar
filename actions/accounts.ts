'use server';

import prisma from '@/lib/prisma';
import { generateAdminPassword, generateUserPin } from '@/lib/utils';
import { adminAccountSchema, userAccountSchema } from '@/schema/accounts';
import { revalidatePath } from 'next/cache';
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

    revalidatePath('/admin/account/users', 'page');
    return { success: 'Berhasil generate user account', pin: password.pin };
  } catch (error) {
    return { error: 'Gagal generate user account' };
  }
}

export async function resetUserAccount(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return { error: 'User tidak ditemukan' };
    }

    const password = await generateUserPin();

    // Save data to database
    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        pin: password.hashedPin,
      },
    });

    revalidatePath('/admin/account/users', 'page');
    return { success: 'Berhasil reset password', pin: password.pin };
  } catch (error) {
    return { error: 'Gagal melakukan reset password' };
  }
}

export async function generateAdminAccount(
  values: z.infer<typeof adminAccountSchema>
) {
  const validatedFields = adminAccountSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: {
        aparatDesaId: parseInt(values.aparatDesaId),
      },
    });

    if (existingAdmin) {
      return { error: 'Admin sudah terdaftar' };
    }

    const existingUsername = await prisma.admin.findUnique({
      where: {
        username: values.username,
      },
    });

    if (existingUsername) {
      return { error: 'Username sudah ada' };
    }

    const password = await generateAdminPassword();

    await prisma.admin.create({
      data: {
        nama: values.nama,
        username: values.username,
        password: password.hashedPassword,
        aparatDesaId: parseInt(values.aparatDesaId),
      },
    });

    revalidatePath('/admin/account/users', 'page');
    return {
      success: 'Berhasil membuat akun Admin',
      password: password.password,
    };
  } catch (error) {
    return { error: 'Gagal membuat akun Admin' };
  }
}
