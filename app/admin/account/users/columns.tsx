'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { RefreshCcw } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { User } from '@prisma/client';
import { formatDate } from '@/lib/utils';
import ResetUserAccount from '@/components/reset-user-account';

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
          <ResetUserAccount id={String(user.id)} />
        </div>
      );
    },
  },
];
