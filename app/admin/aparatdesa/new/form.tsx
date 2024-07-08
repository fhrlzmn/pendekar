'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';
import AparatDesaForm from '@/components/aparat-desa-form';

import { aparatDesaSchema } from '@/schema/aparatdesa';
import { Penduduk } from '@prisma/client';
import { addAparatDesa } from '@/actions/aparatdesa';

interface AparatDesaFormProps {
  penduduk: Penduduk[];
}

export default function AddAparatForm({ penduduk }: AparatDesaFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const pendudukList = penduduk.map((value) => `${value.nik} - ${value.nama}`);

  const form = useForm<z.infer<typeof aparatDesaSchema>>({
    resolver: zodResolver(aparatDesaSchema),
    defaultValues: {
      nik: '',
      nama: '',
      nip: '',
      jabatan: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof aparatDesaSchema>) => {
    startTransition(() => {
      addAparatDesa(values).then((data) => {
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
          router.push('/admin/aparatdesa');
        }
      });
    });
  };

  return (
    <AparatDesaForm
      type='add'
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      pendudukList={pendudukList}
    />
  );
}
