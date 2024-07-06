'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import { pendudukSchema } from '@/schema/penduduk';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AgamaEnum,
  JenisKelaminEnum,
  PekerjaanEnum,
  PendidikanDitempuhEnum,
  PendidikanTerakhirEnum,
} from '@/enums/penduduk';

import FormFieldInput from '@/components/form-field/input';
import FormFieldComboBox from '@/components/form-field/combo-box';
import FormFieldSelect from '@/components/form-field/select';

export default function PendudukForm() {
  const form = useForm<z.infer<typeof pendudukSchema>>({
    resolver: zodResolver(pendudukSchema),
    defaultValues: {
      nik: '',
      noKK: '',
      nama: '',
      tempatLahir: '',
      jenisKelamin: undefined,
      agama: undefined,
      alamat: '',
      rt: '',
      rw: '',
      desa: '',
      kecamatan: '',
      kotaKabupaten: '',
      provinsi: '',
      pendidikanTerakhir: undefined,
      pendidikanDitempuh: undefined,
      pekerjaan: undefined,
      statusPerkawinan: undefined,
      statusDalamKeluarga: undefined,
      kewarganegaraan: undefined,
      namaAyah: '',
      namaIbu: '',
    },
  });

  const onSubmit = (values: z.infer<typeof pendudukSchema>) => {
    alert(values.jenisKelamin);
  };

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
            Tambah Penduduk
          </h1>
          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Link
              href='/admin/penduduk'
              className={buttonVariants({ variant: 'outline' })}
            >
              Batal
            </Link>
            <Button type='submit'>Simpan</Button>
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr_0.7fr]'>
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
                  maxLength={3}
                  description='Silahkan masukkan Desa'
                />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <FormFieldInput<typeof pendudukSchema>
                  form={form}
                  name='kecamatan'
                  label='Kecamatan'
                  placeholder='Kecamatan'
                  maxLength={3}
                  description='Silahkan masukkan Kecamatan'
                />
                <FormFieldInput<typeof pendudukSchema>
                  form={form}
                  name='kotaKabupaten'
                  label='Kab/Kota'
                  placeholder='Kab/Kota'
                  maxLength={3}
                  description='Silahkan masukkan Kabupaten/Kota'
                />
              </div>
              <div className='grid gap-3'>
                <FormFieldInput<typeof pendudukSchema>
                  form={form}
                  name='provinsi'
                  label='Provinsi'
                  placeholder='Provinsi'
                  maxLength={128}
                  description='Silahkan masukkan provinsi'
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
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
