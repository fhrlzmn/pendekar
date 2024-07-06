'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';

import { pendudukSchema } from '@/schema/penduduk';

import { addPenduduk } from '@/actions/penduduk';

import PendudukForm from '@/components/penduduk-form';

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof pendudukSchema>>({
    resolver: zodResolver(pendudukSchema),
    defaultValues: {
      nik: '',
      noKK: '',
      nama: '',
      tempatLahir: '',
      jenisKelamin: undefined,
      agama: undefined,
      alamat: '',
      rt: '',
      rw: '',
      desa: '',
      kecamatan: '',
      kotaKabupaten: '',
      provinsi: '',
      pendidikanTerakhir: undefined,
      pendidikanDitempuh: undefined,
      pekerjaan: undefined,
      statusPerkawinan: undefined,
      statusDalamKeluarga: undefined,
      kewarganegaraan: undefined,
      namaAyah: '',
      namaIbu: '',
    },
  });

  const onSubmit = (values: z.infer<typeof pendudukSchema>) => {
    startTransition(() => {
      addPenduduk(values).then((data) => {
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

  return <PendudukForm form={form} onSubmit={onSubmit} isPending={isPending} />;
}
