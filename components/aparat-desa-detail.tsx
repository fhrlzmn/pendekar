import Link from 'next/link';
import { ChevronLeft, UserCog } from 'lucide-react';
import { notFound } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import prisma from '@/lib/prisma';

import InputDisabled from './input-disabled';

export default async function AparatDesaDetail({ id }: { id: string }) {
  if (isNaN(parseInt(id))) {
    notFound();
  }

  const aparatDesa = await prisma.aparatDesa.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!aparatDesa) {
    notFound();
  }

  return (
    <div className='w-full grid flex-1 auto-rows-max gap-4'>
      <div className='flex items-center gap-4'>
        <Link
          href='/admin/aparatdesa'
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <ChevronLeft className='h-4 w-4' />
          <span className='sr-only'>Back</span>
        </Link>
        <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
          Detail Aparat Desa
        </h1>
        <div className='hidden items-center gap-2 md:ml-auto md:flex'>
          <Link
            href={`/admin/aparatdesa/${id}/edit`}
            className={buttonVariants({ variant: 'default' })}
          >
            <UserCog className='h-4 w-4 mr-2' />
            Edit
          </Link>
        </div>
      </div>
      <div className='grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Data Penduduk</CardTitle>
            <CardDescription>
              Silahkan masukkan data penduduk yang akan dijadikan aparat desa
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <div className='grid gap-3'>
              <InputDisabled label='ID' value={String(aparatDesa.id)} />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <InputDisabled label='NIK' value={aparatDesa.nik} />
              <InputDisabled label='Nama' value={aparatDesa.nama} />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <InputDisabled label='Jabatan' value={aparatDesa.jabatan} />
              <InputDisabled
                label='NIP'
                value={aparatDesa.nip ? aparatDesa.nip : '-'}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
