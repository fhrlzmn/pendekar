'use client';

import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import { ChevronLeft, RefreshCw } from 'lucide-react';
import { Penduduk } from '@prisma/client';
import { z } from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import InputDisabled from '@/components/input-disabled';

import { getUmur } from '@/lib/utils';
import { skkmtnSchema } from '@/schema/pengajuan';
import { Form } from '@/components/ui/form';
import FormFieldInput from '@/components/form-field/input';
import FormFieldSelect from '@/components/form-field/select';
import { AgamaEnum, JenisKelaminEnum } from '@/enums/penduduk';
import FormFieldTextarea from '@/components/form-field/text-area';
import TextareaDisabled from '@/components/textarea-disabled';

interface SKKMTNFormProps {
  form: UseFormReturn<z.infer<typeof skkmtnSchema>>;
  onSubmit: (values: z.infer<typeof skkmtnSchema>) => void;
  isPending: boolean;
  penduduk: Penduduk;
}

export default function SKKMTNForm({
  form,
  onSubmit,
  isPending,
  penduduk,
}: SKKMTNFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full grid flex-1 auto-rows-max gap-4'
      >
        <div className='flex items-center gap-4'>
          <Link
            href='/user/ajukan'
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronLeft className='h-4 w-4' />
          </Link>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            Surat Keterangan Kematian
          </h1>
          <div className='items-center gap-2 ml-auto flex'>
            <Button type='submit' disabled={isPending}>
              {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
              Kirim
            </Button>
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='grid auto-rows-max items-start gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Identitas Orang Meninggal</CardTitle>
                <CardDescription>
                  Identitas orang yang meninggal
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-3 grid-cols-2'>
                  <FormFieldInput<typeof skkmtnSchema>
                    form={form}
                    name='nama'
                    label='Nama'
                    description='Nama lengkap orang yang meninggal'
                    maxLength={255}
                    placeholder='Masukkan nama lengkap'
                  />
                  <FormFieldInput<typeof skkmtnSchema>
                    form={form}
                    name='nik'
                    label='NIK'
                    description='NIK orang yang meninggal'
                    maxLength={16}
                    placeholder='Masukkan NIK'
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <FormFieldInput<typeof skkmtnSchema>
                    form={form}
                    name='tempatLahir'
                    label='Tempat Lahir'
                    description='Tempat lahir orang yang meninggal'
                    maxLength={128}
                    placeholder='Masukkan tempat lahir'
                  />
                  <FormFieldInput<typeof skkmtnSchema>
                    form={form}
                    type='date'
                    name='tanggalLahir'
                    label='Tanggal Lahir'
                    description='Tanggal lahir orang yang meninggal'
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <FormFieldSelect<typeof skkmtnSchema>
                    form={form}
                    name='jenisKelamin'
                    label='Jenis Kelamin'
                    placeholder='Pilih Jenis Kelamin'
                    description='Silahkan pilih jenis kelamin'
                    values={[JenisKelaminEnum.enum.L, JenisKelaminEnum.enum.P]}
                  />
                  <FormFieldSelect<typeof skkmtnSchema>
                    form={form}
                    name='agama'
                    label='Agama'
                    values={AgamaEnum.options}
                    placeholder='Pilih Agama'
                    description='Agama'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldTextarea<typeof skkmtnSchema>
                    form={form}
                    name='alamat'
                    label='Alamat'
                    maxLength={255}
                    placeholder='Masukkan alamat lengkap'
                    description='Alamat lengkap'
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kematian</CardTitle>
                <CardDescription>
                  Informasi telah meninggal dunia
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-3 grid-cols-2'>
                  <FormFieldInput<typeof skkmtnSchema>
                    form={form}
                    type='date'
                    name='tanggalMeninggal'
                    label='Tanggal Meninggal'
                    description='Tanggal meninggal orang tersebut'
                  />

                  <FormFieldInput<typeof skkmtnSchema>
                    form={form}
                    type='time'
                    name='pukulMeninggal'
                    label='Pukul Meninggal'
                    description='Pukul meninggal'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldInput<typeof skkmtnSchema>
                    form={form}
                    name='tempatMeninggal'
                    label='Tempat Meninggal'
                    description='Meninggal bertempat di'
                    maxLength={128}
                    placeholder='Masukkan tempat meninggal'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldTextarea<typeof skkmtnSchema>
                    form={form}
                    name='sebabMeninggal'
                    label='Penyebab Kematian'
                    description='Penyebab kematian orang tersebut'
                    maxLength={255}
                    placeholder='Masukkan penyebab kematian'
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid auto-rows-max items-start gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Identitas Pelapor</CardTitle>
                <CardDescription>
                  Identitas pelapor yang mengajukan surat keterangan kematian
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-3'>
                  <InputDisabled
                    label='Nama Pelapor'
                    value={penduduk.nama}
                    description='Nama lengkap pelapor'
                  />
                  <InputDisabled
                    label='NIK Pelapor'
                    value={penduduk.nik}
                    description='NIK pelapor'
                  />
                </div>
                <div className='grid gap-3 grid-cols-[1fr_0.3fr]'>
                  <InputDisabled
                    label='Pekerjaan Pelapor'
                    value={penduduk.pekerjaan}
                    description='Pekerjaan pelapor'
                  />
                  <InputDisabled
                    label='Umur Pelapor'
                    value={String(getUmur(penduduk.tanggalLahir))}
                    description='Umur pelapor'
                  />
                </div>
                <div className='grid gap-3'>
                  <TextareaDisabled
                    label='Alamat Pelapor'
                    value={`${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`}
                    description='Alamat lengkap pelapor'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldInput<typeof skkmtnSchema>
                    form={form}
                    name='hubunganPelapor'
                    label='Hubungan Pelapor'
                    placeholder='Hubungan pelapor'
                    maxLength={255}
                    description='Hubungan pelapor dengan Orang meninggal'
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
