'use client';

import Link from 'next/link';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { ChevronLeft, RefreshCw } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import FormFieldInput from '@/components/form-field/input';
import FormFieldComboBox from '@/components/form-field/combo-box';
import FormFieldSelect from '@/components/form-field/select';

import {
  AgamaEnum,
  JenisKelaminEnum,
  KewarganegaraanEnum,
  PekerjaanEnum,
  PendidikanDitempuhEnum,
  PendidikanTerakhirEnum,
  StatusDalamKeluargaEnum,
  StatusPerkawinanEnum,
} from '@/enums/penduduk';

import { pendudukSchema } from '@/schema/penduduk';

interface PendudukFormProps {
  type: 'add' | 'edit';
  form: UseFormReturn<z.infer<typeof pendudukSchema>>;
  onSubmit: (values: z.infer<typeof pendudukSchema>) => void;
  isPending: boolean;
}

export default function PendudukForm({
  type,
  form,
  onSubmit,
  isPending,
}: PendudukFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full grid flex-1 auto-rows-max gap-4'
      >
        <div className='flex items-center gap-4'>
          <Link
            href='/admin/penduduk'
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronLeft className='h-4 w-4' />
            <span className='sr-only'>Back</span>
          </Link>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            {type === 'add' ? 'Tambah Penduduk' : 'Edit Penduduk'}
          </h1>
          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Link
              href='/admin/penduduk'
              className={buttonVariants({ variant: 'outline' })}
            >
              Batal
            </Link>
            <Button type='submit' disabled={isPending}>
              {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
              Simpan
            </Button>
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr_0.7fr]'>
          <div className='grid auto-rows-max items-start gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Data Diri</CardTitle>
                <CardDescription>
                  Informasi data diri penduduk yang bersangkutan
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-3'>
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='nik'
                    label='NIK'
                    placeholder='3201234567890001'
                    maxLength={16}
                    description='Silahkan masukkan NIK'
                    disabled={type === 'edit'}
                  />
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='noKK'
                    label='No. KK'
                    placeholder='3201234567890001'
                    maxLength={16}
                    description='Silahkan masukkan No. KK'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='nama'
                    label='Nama'
                    placeholder='Nama lengkap'
                    maxLength={255}
                    description='Silahkan masukkan nama lengkap penduduk'
                  />
                </div>
                <div className='grid  grid-cols-[1fr_0.5fr] gap-3'>
                  <FormFieldSelect<typeof pendudukSchema>
                    form={form}
                    name='agama'
                    label='Agama'
                    placeholder='Pilih Agama'
                    description='Silahkan pilih agama'
                    values={AgamaEnum.options}
                  />
                  <FormFieldSelect<typeof pendudukSchema>
                    form={form}
                    name='jenisKelamin'
                    label='Jenis Kelamin'
                    placeholder='Pilih Jenis Kelamin'
                    description='Silahkan pilih jenis kelamin'
                    values={[JenisKelaminEnum.enum.L, JenisKelaminEnum.enum.P]}
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='tempatLahir'
                    label='Tempat Lahir'
                    placeholder='Tempat lahir'
                    maxLength={128}
                    description='Silahkan masukkan tempat lahir'
                  />
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='tanggalLahir'
                    label='Tanggal Lahir'
                    type='date'
                    description='Silahkan masukkan tanggal lahir'
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pendidikan dan Pekerjaan</CardTitle>
                <CardDescription>
                  Informasi pendidikan dan pekerjaan penduduk yang bersangkutan
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-3'>
                  <FormFieldComboBox<typeof pendudukSchema>
                    form={form}
                    name='pendidikanTerakhir'
                    label='Pendidikan Terakhir'
                    values={PendidikanTerakhirEnum.options}
                    description='Silahkan pilih pendidikan terakhir'
                  />
                  <FormFieldComboBox<typeof pendudukSchema>
                    form={form}
                    name='pendidikanDitempuh'
                    label='Pendidikan Ditempuh'
                    values={PendidikanDitempuhEnum.options}
                    description='Silahkan pilih pendidikan terakhir'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldComboBox<typeof pendudukSchema>
                    form={form}
                    name='pekerjaan'
                    label='Pekerjaan'
                    values={PekerjaanEnum.options}
                    description='Silahkan pilih pekerjaan'
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid auto-rows-max items-start gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Alamat</CardTitle>
                <CardDescription>
                  Informasi alamat penduduk yang bersangkutan
                </CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-3'>
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='alamat'
                    label='Alamat'
                    placeholder='Alamat'
                    maxLength={128}
                    description='Silahkan masukkan alamat'
                  />
                </div>
                <div className='grid grid-cols-[0.3fr_0.3fr_1fr] gap-3'>
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='rt'
                    label='RT'
                    placeholder='001'
                    maxLength={3}
                    description='No. RT'
                  />
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='rw'
                    label='RW'
                    placeholder='002'
                    maxLength={3}
                    description='No. RW'
                  />
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='desa'
                    label='Desa'
                    placeholder='Desa'
                    maxLength={128}
                    description='Silahkan masukkan Desa'
                  />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='kecamatan'
                    label='Kecamatan'
                    placeholder='Kecamatan'
                    maxLength={128}
                    description='Silahkan masukkan Kecamatan'
                  />
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='kotaKabupaten'
                    label='Kab/Kota'
                    placeholder='Kab/Kota'
                    maxLength={128}
                    description='Silahkan masukkan Kabupaten/Kota'
                  />
                </div>
                <div className='grid grid-cols-[1fr_0.9fr] gap-3'>
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='provinsi'
                    label='Provinsi'
                    placeholder='Provinsi'
                    maxLength={128}
                    description='Silahkan masukkan provinsi'
                  />
                  <FormFieldSelect<typeof pendudukSchema>
                    form={form}
                    name='kewarganegaraan'
                    label='Kewarganegaraan'
                    placeholder='Pilih Kewarganegaraan'
                    description='Silahkan pilih kewarganegaraan'
                    values={KewarganegaraanEnum.options}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Status dan Keluarga</CardTitle>
                <CardDescription>Informasi status dan keluarga</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-3'>
                  <FormFieldComboBox<typeof pendudukSchema>
                    form={form}
                    name='statusPerkawinan'
                    label='Status Perkawinan'
                    values={StatusPerkawinanEnum.options}
                    description='Silahkan pilih status perkawinan'
                  />
                  <FormFieldComboBox<typeof pendudukSchema>
                    form={form}
                    name='statusDalamKeluarga'
                    label='Status dalam Keluarga'
                    values={StatusDalamKeluargaEnum.options}
                    description='Silahkan pilih status dalam keluarga'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='namaAyah'
                    label='Nama Ayah'
                    placeholder='Nama Ayah'
                    maxLength={255}
                    description='Silahkan masukkan nama ayah'
                  />
                  <FormFieldInput<typeof pendudukSchema>
                    form={form}
                    name='namaIbu'
                    label='Nama Ibu'
                    placeholder='Nama Ibu'
                    maxLength={255}
                    description='Silahkan masukkan nama ibu'
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
