'use server';

import { z } from 'zod';

import {
  PendidikanDitempuhEnum,
  PendidikanTerakhirEnum,
} from '@/enums/penduduk';

import { pendudukSchema } from '@/schema/penduduk';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addPenduduk(values: z.infer<typeof pendudukSchema>) {
  const validatedFields = pendudukSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  // Validate pendidikanTerakhir and pendidikanDitempuh
  if (
    PendidikanDitempuhEnum.options.indexOf(values.pendidikanDitempuh) <=
    PendidikanTerakhirEnum.options.indexOf(values.pendidikanTerakhir)
  ) {
    return {
      error:
        'Pendidikan ditempuh tidak boleh sebelum atau sama dengan pendidikan terakhir',
    };
  }

  // Save data to database
  try {
    const existingPenduduk = await prisma.penduduk.findFirst({
      where: {
        nik: values.nik,
      },
    });

    if (existingPenduduk) {
      return { error: 'NIK sudah terdaftar' };
    }

    await prisma.penduduk.create({
      data: {
        ...values,
        tanggalLahir: new Date(values.tanggalLahir),
      },
    });

    revalidatePath('/admin/penduduk', 'page');
    return { success: 'Data berhasil disimpan' };
  } catch (error) {
    return { error: 'Gagal menyimpan data' };
  }
}

export async function updatePenduduk(values: z.infer<typeof pendudukSchema>) {
  const validatedFields = pendudukSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  // Validate pendidikanTerakhir and pendidikanDitempuh
  if (
    PendidikanDitempuhEnum.options.indexOf(values.pendidikanDitempuh) <=
    PendidikanTerakhirEnum.options.indexOf(values.pendidikanTerakhir)
  ) {
    return {
      error:
        'Pendidikan ditempuh tidak boleh sebelum atau sama dengan pendidikan terakhir',
    };
  }

  // Save data to database
  try {
    const existingPenduduk = await prisma.penduduk.findFirst({
      where: {
        nik: values.nik,
      },
    });

    if (!existingPenduduk) {
      return { error: 'Penduduk tidak ditemukan' };
    }

    await prisma.penduduk.update({
      data: {
        ...values,
        tanggalLahir: new Date(values.tanggalLahir),
      },
      where: {
        nik: values.nik,
      },
    });

    revalidatePath('/admin/penduduk', 'page');
    return { success: 'Data berhasil disimpan' };
  } catch (error) {
    return { error: 'Gagal menyimpan data' };
  }
}
