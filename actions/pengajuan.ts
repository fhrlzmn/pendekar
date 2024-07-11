'use server';

import { Penduduk, Prisma, StatusPermohonan } from '@prisma/client';
import { z } from 'zod';

import { sktmSchema } from '@/schema/pengajuan';
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
    console.log(error);
    return { error: 'Gagal mengajukan surat' };
  }
}
