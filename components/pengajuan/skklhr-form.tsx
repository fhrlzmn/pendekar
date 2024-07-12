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
import { skklhrSchema } from '@/schema/pengajuan';
import { Form } from '@/components/ui/form';
import FormFieldInput from '@/components/form-field/input';
import FormFieldSelect from '@/components/form-field/select';
import FormFieldComboBox from '@/components/form-field/combo-box';
import { JenisKelaminEnum, PekerjaanEnum } from '@/enums/penduduk';
import FormFieldTextarea from '@/components/form-field/text-area';
import TextareaDisabled from '@/components/textarea-disabled';

interface SKKLHRFormProps {
  form: UseFormReturn<z.infer<typeof skklhrSchema>>;
  onSubmit: (values: z.infer<typeof skklhrSchema>) => void;
  isPending: boolean;
  penduduk: Penduduk;
}

export default function SKKLHRForm({
  form,
  onSubmit,
  isPending,
  penduduk,
}: SKKLHRFormProps) {
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
            Surat Keterangan Kelahiran
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
                <CardTitle>Identitas Anak</CardTitle>
                <CardDescription>Identitas anak yang lahir</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid gap-3 grid-cols-[1fr_0.3fr]'>
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='namaAnak'
                    label='Nama Anak'
                    description='Nama anak yang lahir'
                    maxLength={255}
                    placeholder='Masukkan nama anak'
                  />
                  <FormFieldSelect<typeof skklhrSchema>
                    form={form}
                    name='jenisKelaminAnak'
                    label='Jenis Kelamin'
                    placeholder='Pilih Jenis Kelamin'
                    description='Silahkan pilih jenis kelamin'
                    values={[JenisKelaminEnum.enum.L, JenisKelaminEnum.enum.P]}
                  />
                </div>
                <div className='grid grid-cols-3 gap-3'>
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='tempatLahirAnak'
                    label='Tempat Lahir Anak'
                    description='Tempat lahir anak'
                    maxLength={128}
                    placeholder='Masukkan tempat lahir'
                  />
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    type='date'
                    name='tanggalLahirAnak'
                    label='Tanggal Lahir Anak'
                    description='Tanggal lahir anak'
                  />
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    type='time'
                    name='pukulLahirAnak'
                    label='Pukul lahir anak'
                    description='Pukul lahir anak'
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
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='hubunganPelapor'
                    label='Hubungan Pelapor'
                    placeholder='hubungan pelapor'
                    maxLength={255}
                    description='Hubungan pelapor dengan Anak'
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
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='namaIbu'
                    label='Nama Ibu'
                    placeholder='Nama lengkap ibu'
                    maxLength={255}
                    description='Silahkan masukkan nama lengkap ibu'
                  />
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='nikIbu'
                    label='NIK Ibu'
                    placeholder='3201234567890001'
                    maxLength={16}
                    description='Silahkan masukkan NIK Ibu'
                  />
                </div>
                <div className='grid gap-3 grid-cols-[1fr_0.3fr]'>
                  <FormFieldComboBox<typeof skklhrSchema>
                    form={form}
                    name='pekerjaanIbu'
                    label='Pekerjaan Ibu'
                    values={PekerjaanEnum.options}
                    description='Silahkan pilih pekerjaan ibu'
                  />
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='umurIbu'
                    label='Umur Ibu'
                    placeholder='Umur ibu'
                    maxLength={3}
                    description='Silahkan masukkan umur Ibu'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldTextarea<typeof skklhrSchema>
                    form={form}
                    name='alamatIbu'
                    label='Alamat Ibu'
                    placeholder='Alamat lengkap ibu'
                    maxLength={255}
                    description='Alamat lengkap ibu'
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
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='namaAyah'
                    label='Nama Ayah'
                    placeholder='Nama lengkap ayah'
                    maxLength={255}
                    description='Silahkan masukkan nama lengkap ayah'
                  />
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='nikAyah'
                    label='NIK Ayah'
                    placeholder='3201234567890001'
                    maxLength={16}
                    description='Silahkan masukkan NIK ayah'
                  />
                </div>
                <div className='grid gap-3 grid-cols-[1fr_0.3fr]'>
                  <FormFieldComboBox<typeof skklhrSchema>
                    form={form}
                    name='pekerjaanAyah'
                    label='Pekerjaan Ayah'
                    values={PekerjaanEnum.options}
                    description='Silahkan pilih pekerjaan ayah'
                  />
                  <FormFieldInput<typeof skklhrSchema>
                    form={form}
                    name='umurAyah'
                    label='Umur Ayah'
                    placeholder='Umur ayah'
                    maxLength={3}
                    description='Silahkan masukkan umur ayah'
                  />
                </div>
                <div className='grid gap-3'>
                  <FormFieldTextarea<typeof skklhrSchema>
                    form={form}
                    name='alamatAyah'
                    label='Alamat Ayah'
                    placeholder='Alamat lengkap ayah'
                    maxLength={255}
                    description='Alamat lengkap ayah'
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
