'use client';

import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
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

import { formatDate } from '@/lib/utils';
import { cetakSuratSchema } from '@/schema/cetakSurat';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import TextareaDisabled from '../textarea-disabled';
import { PermohonanSuratWithPenduduk } from '@/types/permohonan';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import FormFieldInput from '../form-field/input';

interface CetakSKTMProps {
  form: UseFormReturn<z.infer<typeof cetakSuratSchema>>;
  onSubmit: (values: z.infer<typeof cetakSuratSchema>) => void;
  isPending: boolean;
  permohonan: PermohonanSuratWithPenduduk;
  aparatDesa: AparatDesa[];
}

export default function CetakSKTM({
  form,
  onSubmit,
  isPending,
  permohonan,
  aparatDesa,
}: CetakSKTMProps) {
  const penduduk = permohonan.penduduk;
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
            href='/user/ajukan'
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <ChevronLeft className='h-4 w-4' />
          </Link>
          <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
            Surat Keterangan Tidak Mampu
          </h1>
          <div className='items-center gap-2 ml-auto flex'>
            <Button type='submit' disabled={isPending}>
              {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
              Kirim
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
            <FormField
              control={form.control}
              name='idPenandatangan'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ditandatangani oleh</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Pilih' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {aparatDesaSelect.map((aparat) => (
                        <SelectItem
                          key={aparat.value}
                          value={aparat.value.toString()}
                        >
                          {aparat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Surat ditandatangani oleh</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormFieldInput<typeof cetakSuratSchema>
              form={form}
              name='nomorSurat'
              label='Nomor Surat'
              placeholder='Nomor Surat'
              maxLength={32}
              description='Nomor surat yang akan digunakan'
            />
          </CardContent>
        </Card>
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
                  <InputDisabled label='NIK' value={penduduk.nik} />
                  <InputDisabled label='No. KK' value={penduduk.noKK} />
                </div>
                <div className='grid gap-3'>
                  <InputDisabled label='Nama' value={penduduk.nama} />
                </div>
                <div className='grid  grid-cols-[1fr_0.5fr] gap-3'>
                  <InputDisabled label='Agama' value={penduduk.agama} />
                  <InputDisabled
                    label='Jenis Kelamin'
                    value={penduduk.jenisKelamin}
                  />
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
                  <InputDisabled
                    label='Pendidikan Terakhir'
                    value={penduduk.pendidikanTerakhir}
                  />
                  <InputDisabled
                    label='Pendidikan Ditempuh'
                    value={penduduk.pendidikanDitempuh!}
                  />
                </div>
                <div className='grid gap-3'>
                  <InputDisabled label='Pekerjaan' value={penduduk.pekerjaan} />
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
                  <InputDisabled label='Alamat' value={penduduk.alamat} />
                </div>
                <div className='grid grid-cols-[0.3fr_0.3fr_1fr] gap-3'>
                  <InputDisabled label='RT' value={penduduk.rt} />
                  <InputDisabled label='RW' value={penduduk.rw} />
                  <InputDisabled label='Desa' value={penduduk.desa} />
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <InputDisabled label='Kecamatan' value={penduduk.kecamatan} />
                  <InputDisabled
                    label='Kab/Kota'
                    value={penduduk.kotaKabupaten}
                  />
                </div>
                <div className='grid grid-cols-[1fr_0.9fr] gap-3'>
                  <InputDisabled label='Provinsi' value={penduduk.provinsi} />
                  <InputDisabled
                    label='Kewarganegaraan'
                    value={penduduk.kewarganegaraan}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Keperluan</CardTitle>
                <CardDescription>Untuk keperluan apa?</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <TextareaDisabled
                  label='Keperluan'
                  value={data.keperluan as string}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
