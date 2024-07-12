'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Penduduk } from '@prisma/client';

import { sikSchema } from '@/schema/pengajuan';
import { useToast } from '@/components/ui/use-toast';
import { ajukanSik } from '@/actions/pengajuan';
import SIKForm from '@/components/pengajuan/sik-form';

export default function AjukanSIKForm({ penduduk }: { penduduk: Penduduk }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof sikSchema>>({
    resolver: zodResolver(sikSchema),
    defaultValues: {
      jenisKeramaian: '',
      tanggalMulaiKeramaian: '',
      tanggalSelesaiKeramaian: '',
      keperluan: '',
    },
  });

  const onSubmit = (values: z.infer<typeof sikSchema>) => {
    startTransition(() => {
      ajukanSik(values, penduduk).then((data) => {
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
    <SIKForm
      form={form}
      onSubmit={onSubmit}
      penduduk={penduduk}
      isPending={isPending}
    />
  );
}
