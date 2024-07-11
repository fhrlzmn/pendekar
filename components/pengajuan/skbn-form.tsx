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

import { formatDate } from '@/lib/utils';
import { skbnSchema } from '@/schema/pengajuan';
import { Form } from '@/components/ui/form';
import FormFieldInput from '@/components/form-field/input';
import FormFieldSelect from '@/components/form-field/select';
import FormFieldComboBox from '@/components/form-field/combo-box';
import { AgamaEnum, JenisKelaminEnum, PekerjaanEnum } from '@/enums/penduduk';
import FormFieldTextarea from '@/components/form-field/text-area';
import TextareaDisabled from '@/components/textarea-disabled';

interface SKBNFormProps {
  form: UseFormReturn<z.infer<typeof skbnSchema>>;
  onSubmit: (values: z.infer<typeof skbnSchema>) => void;
  isPending: boolean;
  penduduk: Penduduk;
}

export default function SKBNForm({
  form,
  onSubmit,
  isPending,
  penduduk,
}: SKBNFormProps) {
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
            Surat Keterangan Beda Nama
          </h1>
          <div className='items-center gap-2 ml-auto flex'>
            <Button type='submit' disabled={isPending}>
              {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
              Kirim
            </Button>
          </div>
        </div>
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
                <InputDisabled label='Nama' value={penduduk.nama} />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <InputDisabled
                  label='Tempat Lahir'
                  value={penduduk.tempatLahir}
                />
                <InputDisabled
                  label='Tanggal Lahir'
                  value={formatDate(penduduk.tanggalLahir)}
                />
              </div>
              <div className='grid grid-cols-[1fr_0.5fr] gap-3'>
                <InputDisabled label='Agama' value={penduduk.agama} />
                <InputDisabled
                  label='Jenis Kelamin'
                  value={penduduk.jenisKelamin}
                />
              </div>
              <div className='grid gap-3'>
                <TextareaDisabled
                  label='Alamat'
                  value={`${penduduk.alamat} RT ${penduduk.rt} RW ${penduduk.rw} Desa ${penduduk.desa} Kec. ${penduduk.kecamatan} ${penduduk.kotaKabupaten} ${penduduk.provinsi}`}
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
                <FormFieldInput<typeof skbnSchema>
                  form={form}
                  name='kartuIdentitasLain'
                  label='Kartu Identitas lain'
                  description='Ijazah, Akta, atau identitas lain'
                  maxLength={255}
                  placeholder='Kartu identitas lain'
                />
                <FormFieldInput<typeof skbnSchema>
                  form={form}
                  name='noIdentitas'
                  label='No. Identitas'
                  description='Nomor Identitas tersebut'
                  maxLength={255}
                  placeholder='Nomor Identitas'
                />
              </div>
              <div className='grid gap-3'>
                <FormFieldInput<typeof skbnSchema>
                  form={form}
                  name='nama'
                  label='Nama'
                  placeholder='Nama lengkap'
                  maxLength={255}
                  description='Silahkan masukkan nama lengkap penduduk'
                />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <FormFieldInput<typeof skbnSchema>
                  form={form}
                  name='tempatLahir'
                  label='Tempat Lahir'
                  placeholder='Tempat lahir'
                  maxLength={128}
                  description='Silahkan masukkan tempat lahir'
                />
                <FormFieldInput<typeof skbnSchema>
                  form={form}
                  name='tanggalLahir'
                  label='Tanggal Lahir'
                  type='date'
                  description='Silahkan masukkan tanggal lahir'
                />
              </div>
              <div className='grid grid-cols-[1fr_0.5fr] gap-3'>
                <FormFieldSelect<typeof skbnSchema>
                  form={form}
                  name='agama'
                  label='Agama'
                  placeholder='Pilih Agama'
                  description='Silahkan pilih agama'
                  values={AgamaEnum.options}
                />
                <FormFieldSelect<typeof skbnSchema>
                  form={form}
                  name='jenisKelamin'
                  label='Jenis Kelamin'
                  placeholder='Pilih Jenis Kelamin'
                  description='Silahkan pilih jenis kelamin'
                  values={[JenisKelaminEnum.enum.L, JenisKelaminEnum.enum.P]}
                />
              </div>
              <div className='grid gap-3'>
                <FormFieldTextarea<typeof skbnSchema>
                  form={form}
                  name='alamat'
                  label='Alamat'
                  placeholder='Alamat lengkap'
                  maxLength={255}
                  description='Alamat lengkap'
                />
              </div>
              <div className='grid gap-3'>
                <FormFieldComboBox<typeof skbnSchema>
                  form={form}
                  name='pekerjaan'
                  label='Pekerjaan'
                  values={PekerjaanEnum.options}
                  description='Silahkan pilih pekerjaan'
                />
              </div>
              <div className='grid gap-3'>
                <FormFieldTextarea<typeof skbnSchema>
                  form={form}
                  name='keterangan'
                  label='Keterangan'
                  placeholder='Silahkan tulis keterangan'
                  maxLength={255}
                  description='Tulis -, jika tidak ada keterangan'
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
}
