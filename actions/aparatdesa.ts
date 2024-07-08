'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { aparatDesaSchema } from '@/schema/aparatdesa';
import prisma from '@/lib/prisma';

export async function addAparatDesa(values: z.infer<typeof aparatDesaSchema>) {
  const validatedFields = aparatDesaSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  // Save data to database
  try {
    const existingAparatDesa = await prisma.aparatDesa.findFirst({
      where: {
        nik: values.nik,
      },
    });

    if (existingAparatDesa) {
      return { error: 'NIK sudah terdaftar' };
    }

    if (values.nip) {
      const existingNip = await prisma.aparatDesa.findFirst({
        where: {
          nip: values.nip,
        },
      });

      if (existingNip) {
        return { error: 'NIP sudah terdaftar' };
      }
    }

    // check jabatan are unique except for 'Pelayanan'
    if (values.jabatan !== 'Pelayanan') {
      const existingJabatan = await prisma.aparatDesa.findFirst({
        where: {
          jabatan: values.jabatan,
        },
      });

      if (existingJabatan) {
        return { error: 'Jabatan sudah terdaftar' };
      }
    }

    await prisma.aparatDesa.create({
      data: {
        ...values,
      },
    });

    revalidatePath('/admin/penduduk', 'page');
    return { success: 'Data berhasil disimpan' };
  } catch (error) {
    return { error: String(error) };
  }
}
