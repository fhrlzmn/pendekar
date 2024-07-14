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
import { fetchRecentPendingPermohonan } from '@/lib/data';
import { formatDate } from '@/lib/utils';

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
          href='/admin/surat/permohonan'
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
            {recentPermohonan.map((permohonan) => (
              <TableRow key={permohonan.id}>
                <TableCell>{permohonan.jenisSurat.nama}</TableCell>
                <TableCell>{permohonan.penduduk.nama}</TableCell>
                <TableCell className='text-right'>
                  {formatDate(permohonan.tanggalPengajuan)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
