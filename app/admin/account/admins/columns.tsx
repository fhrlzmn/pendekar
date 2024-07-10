'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';

import { Admin } from '@prisma/client';
import { formatDate } from '@/lib/utils';
import ResetAdminAccount from '@/components/reset-admin-account';

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => (
      <Link
        href={`/admin/aparatdesa/${row.original.aparatDesaId}`}
        className='hover:text-primary'
      >
        {row.original.username}
      </Link>
    ),
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
    cell: ({ row }) => (
      <Link
        href={`/admin/aparatdesa/${row.original.aparatDesaId}`}
        className='hover:text-primary'
      >
        {row.original.username}
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
      const admin = row.original;

      return (
        <div className='flex gap-1'>
          <ResetAdminAccount id={String(admin.id)} />
        </div>
      );
    },
  },
];
