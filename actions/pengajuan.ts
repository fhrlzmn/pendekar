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
import {
  formatDate,
  getHari,
  getUmur,
  isDateAfterToday,
  isDateBeforeToday,
} from '@/lib/utils';

export async function ajukanSktm(
  values: z.infer<typeof sktmSchema>,
  penduduk: Penduduk
) {
  const validatedFields = sktmSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Data tidak valid' };
  }

  const data = {
    nama: penduduk.nama,
    nik: penduduk.nik,
    ttl: `${penduduk.tempatLahir}, ${formatDate(
      new Date(penduduk.tanggalLahir)
    )}`,
    jenisKelamin: penduduk.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
    kewarganegaraan: penduduk.kewarganegaraan,
    agama: penduduk.agama,
    pekerjaan: penduduk.pekerjaan,
    alamat: `${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`,
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

  const data = {
    namaDalamKk: penduduk.nama,
    ttlDalamKk: `${penduduk.tempatLahir}, ${formatDate(
      new Date(penduduk.tanggalLahir)
    )}`,
    agamaDalamKk: penduduk.agama,
    jenisKelaminDalamKk:
      penduduk.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
    pekerjaanDalamKk: penduduk.pekerjaan,
    alamatDalamKk: `${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`,

    kartuIdentiasLain: validatedFields.data.kartuIdentitasLain,
    noIdentitas: validatedFields.data.noIdentitas,
    nama: validatedFields.data.nama,
    ttl: `${validatedFields.data.tempatLahir}, ${formatDate(
      new Date(validatedFields.data.tanggalLahir)
    )}`,
    jenisKelamin:
      validatedFields.data.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
    alamat: validatedFields.data.alamat,
    agama: validatedFields.data.agama,
    pekerjaan: validatedFields.data.pekerjaan,
    keterangan: validatedFields.data.keterangan,
  } as Prisma.JsonObject;

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

  if (isDateAfterToday(new Date(validatedFields.data.tanggalLahirAnak))) {
    return { error: 'Tanggal lahir anak tidak boleh lebih dari hari ini' };
  }

  const data = {
    hariLahirAnak: getHari(new Date(validatedFields.data.tanggalLahirAnak)),
    tanggalLahirAnak: formatDate(
      new Date(validatedFields.data.tanggalLahirAnak)
    ),
    waktuLahirAnak: validatedFields.data.pukulLahirAnak,
    tempatLahirAnak: validatedFields.data.tempatLahirAnak,
    jenisKelaminAnak:
      validatedFields.data.jenisKelaminAnak === 'L' ? 'Laki-laki' : 'Perempuan',
    namaAnak: validatedFields.data.namaAnak,
    namaIbu: validatedFields.data.namaIbu,
    nikIbu: validatedFields.data.nikIbu,
    umurIbu: validatedFields.data.umurIbu,
    pekerjaanIbu: validatedFields.data.pekerjaanIbu,
    alamatIbu: validatedFields.data.alamatIbu,
    namaAyah: validatedFields.data.namaAyah,
    nikAyah: validatedFields.data.nikAyah,
    umurAyah: validatedFields.data.umurAyah,
    pekerjaanAyah: validatedFields.data.pekerjaanAyah,
    alamatAyah: validatedFields.data.alamatAyah,
    namaPelapor: penduduk.nama,
    nikPelapor: penduduk.nik,
    pekerjaanPelapor: penduduk.pekerjaan,
    umurPelapor: String(getUmur(penduduk.tanggalLahir)),
    alamatPelapor: `${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`,
    hubunganPelapor: validatedFields.data.hubunganPelapor,
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
    nama: validatedFields.data.nama,
    nik: validatedFields.data.nik,
    jenisKelamin:
      validatedFields.data.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
    ttl: `${validatedFields.data.tempatLahir}, ${formatDate(
      new Date(validatedFields.data.tanggalLahir)
    )}`,
    agama: validatedFields.data.agama,
    alamat: validatedFields.data.alamat,
    hariMeninggal: getHari(new Date(validatedFields.data.tanggalMeninggal)),
    tanggalMeninggal: formatDate(
      new Date(validatedFields.data.tanggalMeninggal)
    ),
    waktuMeninggal: validatedFields.data.pukulMeninggal,
    tempatMeninggal: validatedFields.data.tempatMeninggal,
    sebabMeninggal: validatedFields.data.sebabMeninggal,
    namaPelapor: penduduk.nama,
    nikPelapor: penduduk.nik,
    umurPelapor: String(getUmur(penduduk.tanggalLahir)),
    pekerjaanPelapor: penduduk.pekerjaan,
    alamatPelapor: `${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`,
    hubunganPelapor: validatedFields.data.hubunganPelapor,
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
