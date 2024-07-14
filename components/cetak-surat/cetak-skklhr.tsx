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

interface CetakSKKLHRProps {
  form: UseFormReturn<z.infer<typeof cetakSuratSchema>>;
  onSubmit: (values: z.infer<typeof cetakSuratSchema>) => void;
  isPending: boolean;
  permohonan: PermohonanSuratWithPenduduk;
  aparatDesa: AparatDesa[];
}

export default function CetakSKKLHR({
  form,
  onSubmit,
  isPending,
  permohonan,
  aparatDesa,
}: CetakSKKLHRProps) {
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
            Surat Keterangan Kelahiran
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
          <div className='grid auto-rows-max items-start gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Identitas Anak</CardTitle>
                <CardDescription>Identitas anak yang lahir</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-3 grid-cols-[1fr_0.3fr]'>
                  <InputDisabled label='Nama' value={data.namaAnak as string} />
                  <InputDisabled
                    label='Jenis Kelamin'
                    value={data.jenisKelaminAnak as string}
                  />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                  <InputDisabled
                    label='Tempat Lahir'
                    value={data.tempatLahirAnak as string}
                  />
                  <InputDisabled
                    label='Tanggal Lahir'
                    value={data.tanggalLahirAnak as string}
                  />
                  <InputDisabled
                    label='Waktu Lahir'
                    value={data.waktuLahirAnak as string}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Identitas Pelapor</CardTitle>
                <CardDescription>
                  Identitas pelapor yang mengajukan surat keterangan kelahiran
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-3'>
                  <InputDisabled
                    label='Nama'
                    value={data.namaPelapor as string}
                  />
                  <InputDisabled
                    label='NIK'
                    value={data.nikPelapor as string}
                  />
                </div>
                <div className='grid gap-3 grid-cols-[1fr_0.3fr]'>
                  <InputDisabled
                    label='Pekerjaan'
                    value={data.pekerjaanPelapor as string}
                  />
                  <InputDisabled
                    label='Umur'
                    value={data.umurPelapor as string}
                  />
                </div>
                <div className='grid gap-3'>
                  <TextareaDisabled
                    label='Alamat Pelapor'
                    value={data.alamatPelapor as string}
                  />
                </div>
                <div className='grid gap-3'>
                  <InputDisabled
                    label='Hubungan Pelapor'
                    value={data.hubunganPelapor as string}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid auto-rows-max items-start gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Identitas Ibu</CardTitle>
                <CardDescription>Identitas ibu yang melahirkan</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-3'>
                  <InputDisabled label='Nama' value={data.namaIbu as string} />
                  <InputDisabled label='NIK' value={data.nikIbu as string} />
                </div>
                <div className='grid gap-3 grid-cols-[1fr_0.3fr]'>
                  <InputDisabled
                    label='Pekerjaan'
                    value={data.pekerjaanIbu as string}
                  />
                  <InputDisabled label='Umur' value={data.umurIbu as string} />
                </div>
                <div className='grid gap-3'>
                  <TextareaDisabled
                    label='Alamat Pelapor'
                    value={data.alamatIbu as string}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Identitas Ayah</CardTitle>
                <CardDescription>
                  Identitas ayah dari anak yang lahir
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-3'>
                  <InputDisabled label='Nama' value={data.namaAyah as string} />
                  <InputDisabled label='NIK' value={data.nikAyah as string} />
                </div>
                <div className='grid gap-3 grid-cols-[1fr_0.3fr]'>
                  <InputDisabled
                    label='Pekerjaan'
                    value={data.pekerjaanAyah as string}
                  />
                  <InputDisabled label='Umur' value={data.umurAyah as string} />
                </div>
                <div className='grid gap-3'>
                  <TextareaDisabled
                    label='Alamat Pelapor'
                    value={data.alamatAyah as string}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
