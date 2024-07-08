'use client';

import Link from 'next/link';
import { AparatDesa } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';

import DeletePenduduk from '@/components/delete-penduduk';
import { buttonVariants } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import DeleteAparatDesa from '@/components/delete-aparat-desa';

export const columns: ColumnDef<AparatDesa>[] = [
  {
    accessorKey: 'nik',
    header: 'NIK',
    cell: ({ row }) => (
      <Link
        href={`/admin/aparatdesa/${row.original.id}`}
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
        href={`/admin/aparatdesa/${row.original.id}`}
        className='hover:text-primary'
      >
        {row.original.nama}
      </Link>
    ),
  },
  {
    accessorKey: 'jabatan',
    header: 'Jabatan',
  },
  {
    accessorKey: 'nip',
    header: 'NIP',
  },
  {
    accessorKey: 'dibuatPada',
    header: 'Dibuat Pada',
    accessorFn: (aparat) => formatDate(aparat.dibuatPada),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const aparat = row.original;

      return (
        <div className='flex gap-1'>
          <Link
            href={`/admin/aparatdesa/${aparat.id}/edit`}
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <Pencil className='h-4 w-4' />
          </Link>
          <DeleteAparatDesa id={aparat.id.toString()} />
        </div>
      );
    },
  },
];
