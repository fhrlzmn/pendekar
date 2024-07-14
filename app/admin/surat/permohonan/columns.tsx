'use client';

import Link from 'next/link';
import { PermohonanSurat, StatusPermohonan } from '@prisma/client';
import { Info, Pencil } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';

import { formatDate } from '@/lib/utils';

export interface PermohonanSuratColumn extends PermohonanSurat {
  penduduk: {
    nama: string;
  };
  jenisSurat: {
    nama: string;
  };
}

export const columns: ColumnDef<PermohonanSuratColumn>[] = [
  {
    accessorKey: 'nikPemohon',
    header: 'NIK Pemohon',
  },
  {
    accessorKey: 'namaPemohon',
    header: 'Nama Pemohon',
    accessorFn: (permohonan) => permohonan.penduduk.nama,
  },
  {
    accessorKey: 'kodeJenisSurat',
    header: 'Jenis Surat',
    accessorFn: (permohonan) => permohonan.jenisSurat.nama,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const permohonan = row.original;

      switch (permohonan.status) {
        case StatusPermohonan.Dikirim: {
          return <Badge variant='secondary'>{permohonan.status}</Badge>;
        }
        case StatusPermohonan.Ditolak: {
          return <Badge variant='destructive'>{permohonan.status}</Badge>;
        }
        case StatusPermohonan.Selesai: {
          return <Badge variant='default'>{permohonan.status}</Badge>;
        }
        default: {
          return <Badge variant='outline'>{permohonan.status}</Badge>;
        }
      }
    },
  },
  {
    accessorKey: 'keterangan',
    header: 'Keterangan',
  },
  {
    accessorKey: 'tanggalPengajuan',
    header: 'Tanggal Pengajuan',
    accessorFn: (permohonan) => formatDate(permohonan.tanggalPengajuan),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const permohonanSurat = row.original;

      return (
        <div className='flex gap-1'>
          <Link
            href={`/admin/surat/permohonan/${permohonanSurat.id}`}
            className={buttonVariants({ variant: 'default', size: 'sm' })}
          >
            <Info className='h-4 w-4' />
          </Link>
        </div>
      );
    },
  },
];
