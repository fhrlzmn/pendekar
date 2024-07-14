import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchRecentPendingPermohonan, fetchUserPermohonan } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Badge } from '../ui/badge';

export async function RecentPendingPermohonan() {
  const recentPermohonan = await fetchRecentPendingPermohonan();

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='grid gap-2'>
          <CardTitle className='text-sm font-medium'>
            Permohonan Surat Terbaru
          </CardTitle>
          <CardDescription>Beberapa permohonan surat terbaru</CardDescription>
        </div>
        <Link
          href='/admin/permohonan/list'
          className={buttonVariants({ variant: 'default', size: 'sm' })}
        >
          Lihat Semua
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Jenis Surat</TableHead>
              <TableHead>Pemohon</TableHead>
              <TableHead className='text-right'>Tanggal Pengajuan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPermohonan.length > 0 ? (
              recentPermohonan.map((permohonan) => (
                <TableRow key={permohonan.id}>
                  <TableCell>{permohonan.jenisSurat.nama}</TableCell>
                  <TableCell>{permohonan.penduduk.nama}</TableCell>
                  <TableCell className='text-right'>
                    {formatDate(permohonan.tanggalPengajuan)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className='h-24 text-center'>
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export async function RecentUserPermohonan({ nik }: { nik: string }) {
  const recentPermohonan = await fetchUserPermohonan(nik);

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='grid gap-2'>
          <CardTitle className='text-sm font-medium'>
            Permohonan Surat Terbaru
          </CardTitle>
          <CardDescription>Beberapa permohonan surat terbaru</CardDescription>
        </div>
        <Link
          href='/user/permohonan'
          className={buttonVariants({ variant: 'default', size: 'sm' })}
        >
          Lihat Semua
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Jenis Surat</TableHead>
              <TableHead className='hidden md:table-cell'>Keterangan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Tanggal Pengajuan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPermohonan.length > 0 ? (
              recentPermohonan.map((permohonan) => (
                <TableRow key={permohonan.id}>
                  <TableCell>{permohonan.jenisSurat.nama}</TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {permohonan.keterangan}
                  </TableCell>
                  <TableCell>
                    {permohonan.status === 'Dikirim' && (
                      <Badge variant='secondary'>{permohonan.status}</Badge>
                    )}
                    {permohonan.status === 'Ditolak' && (
                      <Badge variant='destructive'>{permohonan.status}</Badge>
                    )}
                    {permohonan.status === 'Selesai' && (
                      <Badge variant='default'>{permohonan.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    {formatDate(permohonan.tanggalPengajuan)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className='h-24 text-center'>
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
