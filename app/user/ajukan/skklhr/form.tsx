'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Penduduk } from '@prisma/client';

import { skklhrSchema } from '@/schema/pengajuan';
import { useToast } from '@/components/ui/use-toast';
import { ajukanSkklhr } from '@/actions/pengajuan';
import SKKLHRForm from '@/components/pengajuan/skklhr-form';

export default function AjukanSKKLHRForm({ penduduk }: { penduduk: Penduduk }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof skklhrSchema>>({
    resolver: zodResolver(skklhrSchema),
    defaultValues: {
      namaAnak: '',
      tanggalLahirAnak: '',
      pukulLahirAnak: '',
      tempatLahirAnak: '',
      jenisKelaminAnak: undefined,
      namaIbu: '',
      nikIbu: '',
      umurIbu: '',
      pekerjaanIbu: undefined,
      alamatIbu: '',
      namaAyah: '',
      nikAyah: '',
      umurAyah: '',
      pekerjaanAyah: undefined,
      alamatAyah: '',
      hubunganPelapor: '',
    },
  });

  const onSubmit = (values: z.infer<typeof skklhrSchema>) => {
    startTransition(() => {
      ajukanSkklhr(values, penduduk).then((data) => {
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
    <SKKLHRForm
      form={form}
      onSubmit={onSubmit}
      penduduk={penduduk}
      isPending={isPending}
    />
  );
}
