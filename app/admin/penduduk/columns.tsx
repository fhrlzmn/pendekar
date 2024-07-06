'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Penduduk } from '@prisma/client';
import { formatDate } from '@/lib/utils';

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='w-4 text-end'>
            <Button aria-haspopup='true' size='icon' variant='ghost'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/penduduk/${penduduk.nik}`}>Detail</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Edit ${penduduk.nik}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Delete ${penduduk.nik}`)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
