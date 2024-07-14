'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Penduduk } from '@prisma/client';
import { formatDate } from '@/lib/utils';
import DeletePenduduk from '@/components/delete-penduduk';

export const columns: ColumnDef<Penduduk>[] = [
  {
    accessorKey: 'nik',
    header: 'NIK',
    cell: ({ row }) => (
      <Link
        href={`/admin/penduduk/${row.original.nik}`}
        className='hover:text-primary'
      >
        {row.original.nik}
      </Link>
    ),
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
    cell: ({ row }) => (
      <Link
        href={`/admin/penduduk/${row.original.nik}`}
        className='hover:text-primary'
      >
        {row.original.nama}
      </Link>
    ),
  },
  {
    accessorKey: 'jenisKelamin',
    header: 'Jenis Kelamin',
    accessorFn: (penduduk) =>
      penduduk.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan',
  },
  {
    accessorKey: 'namaAyah',
    header: 'Nama Ayah',
  },
  {
    accessorKey: 'tanggalLahir',
    header: 'Tanggal Lahir',
    accessorFn: (penduduk) => formatDate(penduduk.tanggalLahir),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const penduduk = row.original;

      return (
        <div className='flex gap-1'>
          <Link
            href={`/admin/penduduk/${penduduk.nik}/edit`}
            className={buttonVariants({ variant: 'outline', size: 'sm' })}
          >
            <Pencil className='h-3 w-3' />
          </Link>
          <DeletePenduduk nik={penduduk.nik} />
        </div>
      );
    },
  },
];
