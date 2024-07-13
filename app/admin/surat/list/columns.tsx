'use client';

import { Printer } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import { formatDate } from '@/lib/utils';
import { SuratWithRelations } from '@/types/surat';

export const columns: ColumnDef<SuratWithRelations>[] = [
  {
    accessorKey: 'nomorSurat',
    header: 'Nomor Surat',
  },
  {
    accessorKey: 'penduduk',
    header: 'Nama Pemohon',
    accessorFn: (surat) => surat.penduduk.nama,
  },
  {
    accessorKey: 'jenisSurat',
    header: 'Jenis Surat',
    accessorFn: (surat) => surat.jenisSurat.nama,
  },
  {
    accessorKey: 'tanggalPengajuan',
    header: 'Tanggal Pengajuan',
    accessorFn: (permohonan) => formatDate(permohonan.tanggalPengajuan),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const surat = row.original;

      return (
        <div className='flex gap-1'>
          <Button onClick={() => console.log(surat)}>
            <Printer className='h-4 w-4 mr-2' />
            Cetak
          </Button>
        </div>
      );
    },
  },
];
