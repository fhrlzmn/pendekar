'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Penduduk } from '@prisma/client';

import { skuSchema } from '@/schema/pengajuan';
import { useToast } from '@/components/ui/use-toast';
import { ajukanSku } from '@/actions/pengajuan';
import SKUForm from '@/components/pengajuan/sku-form';

export default function AjukanSKUForm({ penduduk }: { penduduk: Penduduk }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof skuSchema>>({
    resolver: zodResolver(skuSchema),
    defaultValues: {
      namaUsaha: '',
      keperluan: '',
    },
  });

  const onSubmit = (values: z.infer<typeof skuSchema>) => {
    startTransition(() => {
      ajukanSku(values, penduduk).then((data) => {
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
    <SKUForm
      form={form}
      onSubmit={onSubmit}
      penduduk={penduduk}
      isPending={isPending}
    />
  );
}
