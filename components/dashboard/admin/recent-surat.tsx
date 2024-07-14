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
import { fetchRecentSurat } from '@/lib/data';

export default async function RecentSurat() {
  const recentSurat = await fetchRecentSurat();

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <div className='grid gap-2'>
          <CardTitle className='text-sm font-medium'>Surat Disetujui</CardTitle>
          <CardDescription>Beberapa surat terbaru</CardDescription>
        </div>
        <Link
          href='/admin/surat/list'
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
              <TableHead className='text-right'>No. Surat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSurat.map((surat) => (
              <TableRow key={surat.id}>
                <TableCell>{surat.jenisSurat.nama}</TableCell>
                <TableCell className='text-right'>{surat.nomorSurat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
