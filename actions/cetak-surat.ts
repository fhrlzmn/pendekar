'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { cetakSuratSchema } from '@/schema/cetakSurat';
import { PermohonanSuratWithPenduduk } from '@/types/permohonan';
import { Prisma, StatusPermohonan } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function cetakSurat(
  values: z.infer<typeof cetakSuratSchema>,
  permohonan: PermohonanSuratWithPenduduk
) {
  const session = await auth();
  const adminName = session?.user.name;

  const validatedFields = cetakSuratSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  const data = permohonan.data as Prisma.JsonObject;

  try {
    const existingSurat = await prisma.surat.findFirst({
      where: {
        permohonanId: permohonan.id,
      },
    });

    if (existingSurat) {
      return { error: 'Surat sudah pernah dicetak' };
    }

    await prisma
      .$transaction([
        prisma.surat.create({
          data: {
            nomorSurat: values.nomorSurat,
            nikPemohon: permohonan.penduduk.nik,
            permohonanId: permohonan.id,
            data,
            keterangan: 'Surat sudah dicetak',
            kodeJenisSurat: permohonan.kodeJenisSurat,
            aparatDesaId: parseInt(values.idPenandatangan),
            dicetakOleh: adminName,
          },
        }),
        prisma.permohonanSurat.update({
          where: {
            id: permohonan.id,
          },
          data: {
            status: StatusPermohonan.Selesai,
            keterangan: 'Surat sudah dicetak',
          },
        }),
      ])
      .catch(() => {
        return { error: 'Gagal input data' };
      });

    return { success: 'Berhasil cetak surat' };
  } catch (error) {
    console.log(error);
    return { error: 'Gagal cetak surat' };
  }
}

export async function tolakPermohonan(id: number, keterangan: string) {
  if (!keterangan) {
    return { error: 'Keterangan harus diisi' };
  }

  try {
    const permohonan = await prisma.permohonanSurat.findUnique({
      where: {
        id,
      },
    });

    if (permohonan?.status === StatusPermohonan.Selesai) {
      return { error: 'Permohonan sudah dicetak' };
    }

    await prisma.permohonanSurat.update({
      where: {
        id,
      },
      data: {
        status: StatusPermohonan.Ditolak,
        keterangan: keterangan,
      },
    });

    revalidatePath('/admin/permohonan/list');
    return { success: 'Berhasil tolak permohonan' };
  } catch (error) {
    return { error: 'Gagal tolak permohonan' };
  }
}
