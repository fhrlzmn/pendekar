'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { User } from '@prisma/client';
import { formatDate } from '@/lib/utils';

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'dibuatPada',
    header: 'Dibuat Pada',
    accessorFn: (user) => formatDate(user.dibuatPada),
  },
  {
    accessorKey: 'diubahPada',
    header: 'Diubah pada',
    accessorFn: (user) => formatDate(user.diubahPada),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className='flex gap-1'>
          <Link
            href={`/admin/account/user/${user.id}/edit`}
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
          >
            <Pencil className='h-4 w-4' />
          </Link>
        </div>
      );
    },
  },
];
