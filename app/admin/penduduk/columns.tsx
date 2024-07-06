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

export const columns: ColumnDef<Penduduk>[] = [
  {
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'nik',
    header: 'NIK',
  },
  {
    accessorKey: 'jenisKelamin',
    header: 'Jenis Kelamin',
  },
  {
    accessorKey: 'namaAyah',
    header: 'Nama Ayah',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const penduduk = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
