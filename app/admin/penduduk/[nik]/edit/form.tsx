'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z, TypeOf } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Penduduk } from '@prisma/client';

import { useToast } from '@/components/ui/use-toast';
import PendudukForm from '@/components/penduduk-form';

import { pendudukSchema } from '@/schema/penduduk';

import { updatePenduduk } from '@/actions/penduduk';

import {
  AgamaEnum,
  JenisKelaminEnum,
  KewarganegaraanEnum,
  PekerjaanEnum,
  PendidikanDitempuhEnum,
  PendidikanTerakhirEnum,
  StatusDalamKeluargaEnum,
  StatusPerkawinanEnum,
} from '@/enums/penduduk';
import { formatDateToInputDate } from '@/lib/utils';

export default function EditPendudukForm({ penduduk }: { penduduk: Penduduk }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof pendudukSchema>>({
    resolver: zodResolver(pendudukSchema),
    defaultValues: {
      nik: penduduk.nik,
      noKK: penduduk.noKK,
      nama: penduduk.nama,
      tempatLahir: penduduk.tempatLahir,
      tanggalLahir: formatDateToInputDate(penduduk.tanggalLahir),
      jenisKelamin: penduduk.jenisKelamin as TypeOf<typeof JenisKelaminEnum>,
      agama: penduduk.agama as TypeOf<typeof AgamaEnum>,
      alamat: penduduk.alamat,
      rt: penduduk.rt,
      rw: penduduk.rw,
      desa: penduduk.desa,
      kecamatan: penduduk.kecamatan,
      kotaKabupaten: penduduk.kotaKabupaten,
      provinsi: penduduk.provinsi,
      pendidikanTerakhir: penduduk.pendidikanTerakhir as TypeOf<
        typeof PendidikanTerakhirEnum
      >,
      pendidikanDitempuh: penduduk.pendidikanDitempuh as TypeOf<
        typeof PendidikanDitempuhEnum
      >,
      pekerjaan: penduduk.pekerjaan as TypeOf<typeof PekerjaanEnum>,
      statusPerkawinan: penduduk.statusPerkawinan as TypeOf<
        typeof StatusPerkawinanEnum
      >,
      statusDalamKeluarga: penduduk.statusDalamKeluarga as TypeOf<
        typeof StatusDalamKeluargaEnum
      >,
      kewarganegaraan: penduduk.kewarganegaraan as TypeOf<
        typeof KewarganegaraanEnum
      >,
      namaAyah: penduduk.namaAyah,
      namaIbu: penduduk.namaIbu,
    },
  });

  const onSubmit = (values: z.infer<typeof pendudukSchema>) => {
    startTransition(() => {
      updatePenduduk(values).then((data) => {
        if (data.error) {
          toast({
            variant: 'destructive',
            title: 'Oops! Ada kesalahan',
            description: data.error,
          });
        }

        if (data.success) {
          toast({
            variant: 'success',
            title: 'Berhasil',
            description: data.success,
          });
          router.push('/admin/penduduk');
        }
      });
    });
  };

  return (
    <PendudukForm
      type='edit'
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
