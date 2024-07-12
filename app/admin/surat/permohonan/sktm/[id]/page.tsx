import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import InputDisabled from '@/components/input-disabled';

import { formatDate } from '@/lib/utils';
import prisma from '@/lib/prisma';
import TextareaDisabled from '@/components/textarea-disabled';
import { Prisma } from '@prisma/client';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const permohonan = await prisma.permohonanSurat.findUnique({
    where: { id },
    include: { penduduk: true },
  });

  if (!permohonan) {
    notFound();
  }

  const penduduk = permohonan?.penduduk;
  const data = permohonan?.data as Prisma.JsonObject;

  return (
    <div className='w-full grid flex-1 auto-rows-max gap-4'>
      <div className='flex items-center gap-4'>
        <Link
          href='/admin/surat/permohonan'
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <ChevronLeft className='h-4 w-4' />
        </Link>
        <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
          Surat Keterangan Tidak Mampu
        </h1>
        {/* <div className='items-center gap-2 ml-auto flex'>
          <Button type='submit' disabled={isPending}>
            {isPending && <RefreshCw className='mr-2 h-4 w-4 animate-spin' />}
            Kirim
          </Button>
        </div> */}
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
    </div>
  );
}
