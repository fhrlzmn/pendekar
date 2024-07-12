'use server';

import { Penduduk, Prisma, StatusPermohonan } from '@prisma/client';
import { z } from 'zod';

import {
  sikSchema,
  skbnSchema,
  skklhrSchema,
  skkmtnSchema,
  sktmSchema,
  skuSchema,
} from '@/schema/pengajuan';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { getUmur, isDateBeforeToday } from '@/lib/utils';

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
    return { success: 'Pengajuan berhasil dikirim' };
  } catch (error) {
    return { error: 'Gagal mengajukan surat' };
  }
}

export async function ajukanSkklhr(
  values: z.infer<typeof skklhrSchema>,
  penduduk: Penduduk
) {
  const validatedFields = skklhrSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  const data = {
    ...validatedFields.data,
    namaPelapor: penduduk.nama,
    nikPelapor: penduduk.nik,
    pekerjaanPelapor: penduduk.pekerjaan,
    umurPelapor: String(getUmur(penduduk.tanggalLahir)),
    alamatPelapor: `${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`,
  } as Prisma.JsonObject;

  try {
    await prisma.permohonanSurat.create({
      data: {
        status: StatusPermohonan.Dikirim,
        keterangan: 'Pengajuan sudah dikirim',
        nikPemohon: penduduk.nik,
        data,
        kodeJenisSurat: 'SKKLHR',
      },
    });

    revalidatePath('/user/permohonan', 'page');
    return { success: 'Pengajuan berhasil dikirim' };
  } catch (error) {
    return { error: 'Gagal mengajukan surat' };
  }
}

export async function ajukanSkkmtn(
  values: z.infer<typeof skkmtnSchema>,
  penduduk: Penduduk
) {
  const validatedFields = skkmtnSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  const data = {
    ...validatedFields.data,
    namaPelapor: penduduk.nama,
    nikPelapor: penduduk.nik,
    pekerjaanPelapor: penduduk.pekerjaan,
    umurPelapor: String(getUmur(penduduk.tanggalLahir)),
    alamatPelapor: `${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`,
  } as Prisma.JsonObject;

  try {
    await prisma.permohonanSurat.create({
      data: {
        status: StatusPermohonan.Dikirim,
        keterangan: 'Pengajuan sudah dikirim',
        nikPemohon: penduduk.nik,
        data,
        kodeJenisSurat: 'SKKMTN',
      },
    });

    revalidatePath('/user/permohonan', 'page');
    return { success: 'Pengajuan berhasil dikirim' };
  } catch (error) {
    return { error: 'Gagal mengajukan surat' };
  }
}

export async function ajukanSku(
  values: z.infer<typeof skuSchema>,
  penduduk: Penduduk
) {
  const validatedFields = skuSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  const data = {
    nama: penduduk.nama,
    nik: penduduk.nik,
    noKk: penduduk.noKK,
    ttl: `${penduduk.tempatLahir}, ${penduduk.tanggalLahir}`,
    jenisKelamin: penduduk.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
    alamat: `${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`,
    agama: penduduk.agama,
    status: penduduk.statusPerkawinan,
    pendidikan: penduduk.pendidikanTerakhir,
    pekerjaan: penduduk.pekerjaan,
    kewarganegaraan: penduduk.kewarganegaraan,
    ...validatedFields.data,
  } as Prisma.JsonObject;

  try {
    await prisma.permohonanSurat.create({
      data: {
        status: StatusPermohonan.Dikirim,
        keterangan: 'Pengajuan sudah dikirim',
        nikPemohon: penduduk.nik,
        data,
        kodeJenisSurat: 'SKU',
      },
    });

    revalidatePath('/user/permohonan', 'page');
    return { success: 'Pengajuan berhasil dikirim' };
  } catch (error) {
    return { error: 'Gagal mengajukan surat' };
  }
}

export async function ajukanSik(
  values: z.infer<typeof sikSchema>,
  penduduk: Penduduk
) {
  const validatedFields = sikSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  if (isDateBeforeToday(new Date(validatedFields.data.tanggalMulaiKeramaian))) {
    return {
      error: 'Tanggal mulai keramaian tidak boleh kurang dari hari ini',
    };
  }

  if (
    new Date(validatedFields.data.tanggalSelesaiKeramaian) <
    new Date(validatedFields.data.tanggalMulaiKeramaian)
  ) {
    return {
      error: 'Tanggal selesai keramaian tidak boleh kurang dari tanggal mulai',
    };
  }

  const data = {
    nama: penduduk.nama,
    nik: penduduk.nik,
    noKk: penduduk.noKK,
    ttl: `${penduduk.tempatLahir}, ${penduduk.tanggalLahir}`,
    jenisKelamin: penduduk.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
    alamat: `${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`,
    agama: penduduk.agama,
    status: penduduk.statusPerkawinan,
    pendidikan: penduduk.pendidikanTerakhir,
    pekerjaan: penduduk.pekerjaan,
    kewarganegaraan: penduduk.kewarganegaraan,
    ...validatedFields.data,
  } as Prisma.JsonObject;

  try {
    await prisma.permohonanSurat.create({
      data: {
        status: StatusPermohonan.Dikirim,
        keterangan: 'Pengajuan sudah dikirim',
        nikPemohon: penduduk.nik,
        data,
        kodeJenisSurat: 'SIK',
      },
    });

    revalidatePath('/user/permohonan', 'page');
    return { success: 'Pengajuan berhasil dikirim' };
  } catch (error) {
    return { error: 'Gagal mengajukan surat' };
  }
}
