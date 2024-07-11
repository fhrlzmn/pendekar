'use server';

import { Penduduk, Prisma, StatusPermohonan } from '@prisma/client';
import { z } from 'zod';

import { skbnSchema, sktmSchema } from '@/schema/pengajuan';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function ajukanSktm(
  values: z.infer<typeof sktmSchema>,
  penduduk: Penduduk
) {
  const validatedFields = sktmSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  const data = {
    keperluan: validatedFields.data.keperluan,
  } as Prisma.JsonObject;

  try {
    await prisma.permohonanSurat.create({
      data: {
        status: StatusPermohonan.Dikirim,
        keterangan: 'Pengajuan sudah dikirim',
        nikPemohon: penduduk.nik,
        data,
        kodeJenisSurat: 'SKTM',
      },
    });

    revalidatePath('/user/permohonan', 'page');
    return { success: 'Pengajuan berhasil dikirim' };
  } catch (error) {
    return { error: 'Gagal mengajukan surat' };
  }
}

export async function ajukanSkbn(
  values: z.infer<typeof skbnSchema>,
  penduduk: Penduduk
) {
  const validatedFields = skbnSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  if (!validatedFields.data.keterangan) {
    validatedFields.data.keterangan = '-';
  }

  const data = validatedFields.data as Prisma.JsonObject;

  try {
    await prisma.permohonanSurat.create({
      data: {
        status: StatusPermohonan.Dikirim,
        keterangan: 'Pengajuan sudah dikirim',
        nikPemohon: penduduk.nik,
        data,
        kodeJenisSurat: 'SKBN',
      },
    });

    revalidatePath('/user/permohonan', 'page');
  } catch (error) {
    return { error: 'Gagal mengajukan surat' };
  }

  return { success: 'Pengajuan berhasil dikirim' };
}
