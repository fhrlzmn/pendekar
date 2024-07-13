'use client';

import { AparatDesa, PermohonanSurat } from '@prisma/client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/components/ui/use-toast';

import { cetakSuratSchema } from '@/schema/cetakSurat';
import CetakSKTM from '@/components/cetak-surat/cetak-sktm';
import { PermohonanSuratWithPenduduk } from '@/types/permohonan';
import { cetakSurat } from '@/actions/cetak-surat';
import CetakSKBN from '@/components/cetak-surat/cetak-skbn';
import CetakSKKLHR from '@/components/cetak-surat/cetak-skklhr';
import CetakSKKMTN from '@/components/cetak-surat/cetak-skkmtn';
import CetakSKU from '@/components/cetak-surat/cetak-sku';

export default function CetakForm({
  permohonan,
  aparatDesa,
}: {
  permohonan: PermohonanSuratWithPenduduk;
  aparatDesa: AparatDesa[];
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof cetakSuratSchema>>({
    resolver: zodResolver(cetakSuratSchema),
    defaultValues: {
      nomorSurat: '',
      idPenandatangan: '',
    },
  });

  const onSubmit = (values: z.infer<typeof cetakSuratSchema>) => {
    startTransition(() => {
      cetakSurat(values, permohonan).then((data) => {
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
          router.push('/admin/surat/permohonan');
        }
      });
    });
  };

  return (
    <>
      {permohonan.kodeJenisSurat === 'SKTM' && (
        <CetakSKTM
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          permohonan={permohonan}
          aparatDesa={aparatDesa}
        />
      )}
      {permohonan.kodeJenisSurat === 'SKBN' && (
        <CetakSKBN
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          permohonan={permohonan}
          aparatDesa={aparatDesa}
        />
      )}
      {permohonan.kodeJenisSurat === 'SKKLHR' && (
        <CetakSKKLHR
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          permohonan={permohonan}
          aparatDesa={aparatDesa}
        />
      )}
      {permohonan.kodeJenisSurat === 'SKKMTN' && (
        <CetakSKKMTN
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          permohonan={permohonan}
          aparatDesa={aparatDesa}
        />
      )}
      {permohonan.kodeJenisSurat === 'SKU' && (
        <CetakSKU
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          permohonan={permohonan}
          aparatDesa={aparatDesa}
        />
      )}
      {permohonan.kodeJenisSurat === 'SIK' && <h1>SIK</h1>}
    </>
  );
}
