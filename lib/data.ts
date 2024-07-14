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

export async function fetchRecentPendingPermohonan() {
  try {
    const recentPermohonan = await prisma.permohonanSurat.findMany({
      where: {
        status: StatusPermohonan.Dikirim,
      },
      take: 7,
      orderBy: {
        id: 'desc',
      },
      include: {
        jenisSurat: true,
        penduduk: true,
      },
    });

    return recentPermohonan;
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Database error');
  }
}

export async function fetchRecentSurat() {
  try {
    const recentSurat = await prisma.surat.findMany({
      take: 7,
      orderBy: {
        id: 'desc',
      },
      include: {
        jenisSurat: true,
      },
    });

    return recentSurat;
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Database error');
  }
}

export async function fetchUserCardData(nik: string) {
  try {
    const totalPermohonanCount = prisma.permohonanSurat.count({
      where: {
        nikPemohon: nik,
      },
    });

    const pendingPermohonanCount = prisma.permohonanSurat.count({
      where: {
        nikPemohon: nik,
        status: StatusPermohonan.Dikirim,
      },
    });

    const approvedPermohonanCount = prisma.permohonanSurat.count({
      where: {
        nikPemohon: nik,
        status: StatusPermohonan.Selesai,
      },
    });

    const rejectedPermohonanCount = prisma.permohonanSurat.count({
      where: {
        nikPemohon: nik,
        status: StatusPermohonan.Ditolak,
      },
    });

    const data = await Promise.all([
      totalPermohonanCount,
      pendingPermohonanCount,
      approvedPermohonanCount,
      rejectedPermohonanCount,
    ]);

    return {
      totalPermohonanCount: data[0],
      pendingPermohonanCount: data[1],
      approvedPermohonanCount: data[2],
      rejectedPermohonanCount: data[3],
    };
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Database error');
  }
}
