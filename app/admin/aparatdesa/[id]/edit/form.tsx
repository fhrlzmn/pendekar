'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { TypeOf, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';
import AparatDesaForm from '@/components/aparat-desa-form';

import { aparatDesaSchema } from '@/schema/aparatdesa';
import { AparatDesa } from '@prisma/client';
import { updateAparatDesa } from '@/actions/aparatdesa';
import { JabatanEnum } from '@/enums/aparatdesa';

interface EditAparatFormProps {
  aparatDesa: AparatDesa;
}

export default function EditAparatForm({ aparatDesa }: EditAparatFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof aparatDesaSchema>>({
    resolver: zodResolver(aparatDesaSchema),
    defaultValues: {
      nik: aparatDesa.nik,
      nama: aparatDesa.nama,
      nip: aparatDesa.nip ? aparatDesa.nip : '',
      jabatan: aparatDesa.jabatan as TypeOf<typeof JabatanEnum>,
    },
  });

  const onSubmit = (values: z.infer<typeof aparatDesaSchema>) => {
    startTransition(() => {
      updateAparatDesa(values).then((data) => {
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
      type='edit'
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
    />
  );
}
