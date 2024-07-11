'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Penduduk } from '@prisma/client';

import { skbnSchema } from '@/schema/pengajuan';
import { useToast } from '@/components/ui/use-toast';
import { ajukanSkbn } from '@/actions/pengajuan';
import SKBNForm from '@/components/pengajuan/skbn-form';

export default function AjukanSKBNForm({ penduduk }: { penduduk: Penduduk }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof skbnSchema>>({
    resolver: zodResolver(skbnSchema),
    defaultValues: {
      kartuIdentitasLain: '',
      noIdentitas: '',
      nama: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: undefined,
      agama: undefined,
      pekerjaan: undefined,
      alamat: '',
      keterangan: '',
    },
  });

  const onSubmit = (values: z.infer<typeof skbnSchema>) => {
    startTransition(() => {
      ajukanSkbn(values, penduduk).then((data) => {
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
    <SKBNForm
      form={form}
      onSubmit={onSubmit}
      penduduk={penduduk}
      isPending={isPending}
    />
  );
}
