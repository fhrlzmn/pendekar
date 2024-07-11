'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Penduduk } from '@prisma/client';

import { sktmSchema } from '@/schema/pengajuan';
import { useToast } from '@/components/ui/use-toast';
import SKTMForm from '@/components/pengajuan/sktm-form';
import { ajukanSktm } from '@/actions/pengajuan';

export default function AjukanSKTMForm({ penduduk }: { penduduk: Penduduk }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof sktmSchema>>({
    resolver: zodResolver(sktmSchema),
    defaultValues: {
      keperluan: '',
    },
  });

  const onSubmit = (values: z.infer<typeof sktmSchema>) => {
    startTransition(() => {
      ajukanSktm(values, penduduk).then((data) => {
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
    <SKTMForm
      form={form}
      onSubmit={onSubmit}
      penduduk={penduduk}
      isPending={isPending}
    />
  );
}
