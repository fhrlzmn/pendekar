import { StatusPermohonan } from '@prisma/client';
import prisma from './prisma';

export async function fetchAdminCardData() {
  try {
    const pendudukCount = prisma.penduduk.count();
    const suratCount = prisma.surat.count();
    const permohonanCount = prisma.permohonanSurat.count();
    const pendingPermohonanCount = prisma.permohonanSurat.count({
      where: {
        status: StatusPermohonan.Dikirim,
      },
    });

    const data = await Promise.all([
      pendudukCount,
      suratCount,
      permohonanCount,
      pendingPermohonanCount,
    ]);

    return {
      pendudukCount: data[0],
      suratCount: data[1],
      permohonanCount: data[2],
      pendingPermohonanCount: data[3],
    };
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Database error');
  }
}
