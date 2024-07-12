'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Penduduk } from '@prisma/client';

import { skkmtnSchema } from '@/schema/pengajuan';
import { useToast } from '@/components/ui/use-toast';
import { ajukanSkkmtn } from '@/actions/pengajuan';
import SKKMTNForm from '@/components/pengajuan/skkmtn-form';

export default function AjukanSKKMTNForm({ penduduk }: { penduduk: Penduduk }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof skkmtnSchema>>({
    resolver: zodResolver(skkmtnSchema),
    defaultValues: {
      nama: '',
      nik: '',
      jenisKelamin: undefined,
      tempatLahir: '',
      tanggalLahir: '',
      agama: undefined,
      alamat: '',
      tempatMeninggal: '',
      tanggalMeninggal: '',
      pukulMeninggal: '',
      sebabMeninggal: '',
      hubunganPelapor: '',
    },
  });

  const onSubmit = (values: z.infer<typeof skkmtnSchema>) => {
    startTransition(() => {
      ajukanSkkmtn(values, penduduk).then((data) => {
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
          router.push('/user/permohonan');
        }
      });
    });
  };

  return (
    <SKKMTNForm
      form={form}
      onSubmit={onSubmit}
      penduduk={penduduk}
      isPending={isPending}
    />
  );
}
