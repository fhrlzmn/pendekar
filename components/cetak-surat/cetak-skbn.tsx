'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { AparatDesa, Prisma } from '@prisma/client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import InputDisabled from '@/components/input-disabled';
import { Form } from '@/components/ui/form';
import TextareaDisabled from '@/components/textarea-disabled';

import { cetakSuratSchema } from '@/schema/cetakSurat';
import { PermohonanSuratWithPenduduk } from '@/types/permohonan';
import FormFieldCetakSurat from './form-field-cetak-surat';
import TolakPermohonan from './tolak-permohonan';

interface CetakSKBNProps {
  form: UseFormReturn<z.infer<typeof cetakSuratSchema>>;
  onSubmit: (values: z.infer<typeof cetakSuratSchema>) => void;
  isPending: boolean;
  permohonan: PermohonanSuratWithPenduduk;
  aparatDesa: AparatDesa[];
}

export default function CetakSKBN({
  form,
  onSubmit,
  isPending,
  permohonan,
  aparatDesa,
}: CetakSKBNProps) {
  const router = useRouter();
  if (permohonan.status === 'Selesai' || permohonan.status === 'Ditolak') {
    router.push('/admin/permohonan/list');
  }

  const data = permohonan.data as Prisma.JsonObject;

  const aparatDesaSelect = aparatDesa.map((aparat) => ({
    value: aparat.id,
    label: `${aparat.jabatan} - ${aparat.nama}`,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full grid flex-1 auto-rows-max gap-4'
      >
        <div className='flex items-center gap-4'>
          <Link
            href='/admin/permohonan/list'
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronLeft className='h-4 w-4' />
          </Link>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            Surat Keterangan Beda Nama
          </h1>
          <div className='items-center gap-2 ml-auto flex'>
            <TolakPermohonan id={permohonan.id} />
            <Button type='submit' disabled={isPending}>
              {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
              Cetak
            </Button>
          </div>
        </div>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Data Surat</CardTitle>
            <CardDescription>
              Informasi surat yang akan dibuat untuk penduduk yang bersangkutan
            </CardDescription>
          </CardHeader>
          <CardContent className='grid md:grid-cols-2 gap-4'>
            <FormFieldCetakSurat
              form={form}
              aparatDesaSelect={aparatDesaSelect}
            />
          </CardContent>
        </Card>
        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Identitas dalam KK</CardTitle>
              <CardDescription>
                Identitas asli dalam Kartu Keluarga
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid gap-3'>
                <InputDisabled
                  label='Nama'
                  value={data.namaDalamKk as string}
                />
              </div>
              <div className='grid gap-3'>
                <InputDisabled
                  label='Tempat, Tanggal Lahir'
                  value={data.ttlDalamKk as string}
                />
              </div>
              <div className='grid grid-cols-[1fr_0.5fr] gap-3'>
                <InputDisabled
                  label='Agama'
                  value={data.agamaDalamKk as string}
                />
                <InputDisabled
                  label='Jenis Kelamin'
                  value={data.jenisKelaminDalamKk as string}
                />
              </div>
              <div className='grid gap-3'>
                <TextareaDisabled
                  label='Alamat'
                  value={data.alamatDalamKk as string}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Identitas dalam Kartu/Surat lain</CardTitle>
              <CardDescription>
                Identitas yang tercantum dalam Kartu Identitas lain
              </CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
              <div className='grid grid-cols-2 gap-3'>
                <InputDisabled
                  label='Kartu Identitas Lain'
                  value={data.kartuIdentitasLain as string}
                />
                <InputDisabled
                  label='No. Identitas'
                  value={data.noIdentitas as string}
                />
              </div>
              <div className='grid gap-3'>
                <InputDisabled label='Nama' value={data.nama as string} />
              </div>
              <div className='grid gap-3'>
                <InputDisabled
                  label='Tempat, Tanggal Lahir'
                  value={data.ttl as string}
                />
              </div>
              <div className='grid grid-cols-[1fr_0.5fr] gap-3'>
                <InputDisabled label='Agama' value={data.agama as string} />
                <InputDisabled
                  label='Jenis Kelamin'
                  value={data.jenisKelamin as string}
                />
              </div>
              <div className='grid gap-3'>
                <TextareaDisabled
                  label='Alamat'
                  value={data.alamat as string}
                />
              </div>
              <div className='grid gap-3'>
                <InputDisabled
                  label='Pekerjaan'
                  value={data.pekerjaan as string}
                />
              </div>
              <div className='grid gap-3'>
                <InputDisabled
                  label='Keterangan'
                  value={data.keterangan as string}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
