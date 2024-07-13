'use server';

import prisma from '@/lib/prisma';
import { cetakSuratSchema } from '@/schema/cetakSurat';
import { PermohonanSuratWithPenduduk } from '@/types/permohonan';
import { Prisma, StatusPermohonan } from '@prisma/client';
import { z } from 'zod';

export async function cetakSurat(
  values: z.infer<typeof cetakSuratSchema>,
  permohonan: PermohonanSuratWithPenduduk
) {
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
            kodeJenisSurat: permohonan.kodeJenisSurat,
            aparatDesaId: parseInt(values.idPenandatangan),
            tanggalPengajuan: permohonan.tanggalPengajuan,
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
